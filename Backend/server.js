import "dotenv/config";
import http from "http";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { xss } from "express-xss-sanitizer";
import mongoose from "mongoose";
import { Server } from "socket.io";
import Jwt from "jsonwebtoken";
import userModels from "./models/userModels.js";
import jwtDecodes from "./utils/jwtDecode.js";
import friendModel from "./models/friendRequestModel.js";
import OnetoOneMessageModel from "./models/oneToOneMessages.js";
import { CheckValidObjectId } from "./utils/objectIdValidator.js";
import app from "./app.js";
process.on("uncaughtException", (error) => {
  process.exit(0);
});
const server = http.createServer(app);
const Port = process.env.PORT || 8000;
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL,
  },
});
mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    console.log("successfully connected to the database");
  })
  .catch(() => {
    console.log("unable to establish connection to database");
  });
server.listen(Port, () => {
  console.log(`port is lissing ${Port}`);
});
// Listen for when the client connects via socket.io-client
io.use(async (socket, next) => {
  try {
    if (socket.handshake.query["user_token"]) {
      const authToken = socket.handshake.query["user_token"];
      const userInfo = await Jwt.verify(authToken, process.env.JWT_SECRET);
      if (CheckValidObjectId(userInfo?.id)) {
        const existing_user = await userModels.findById({ _id: userInfo.id });
        if (existing_user) {
          socket.userId = existing_user.id;
          next();
        } else {
          const err = new Error("not authorized");
          err.data = { content: "Please retry later" };
          next(err);
        }
      }
    }
    return;
  } catch {
    const err = new Error("InterNal Server Error");
    err.data = { content: "Please retry later" };
    next(err);
  }
});
io.engine.use(helmet());
io.engine.use(mongoSanitize());
io.engine.use(xss());
io.on("connection", async (socket) => {
  const socketId = socket.id;
  await userModels.findByIdAndUpdate(
    { _id: socket.userId },
    { socketId, status: "online" }
  );
  //! create friend request
  socket.on("friendRequest", async (data) => {
    const { to, from } = data;
    const userInfo = await jwtDecodes(from);
    const friendRequestAccept = await userModels.findById({ _id: to });
    const friendRequestSender = await userModels.findById({ _id: userInfo.id });
    await new friendModel({
      sender: friendRequestSender._id,
      recipeint: friendRequestAccept._id,
    }).save();
    //!send confrimation notification to user friend request sent
    io.to(friendRequestSender.socketId).emit("friend_request_sent", {
      message: "friend request send",
    });
  });
  //!friend request accepted
  socket.on("friend_request_accept", async (data) => {
    const { _id } = data;
    const isAlreadyUserFriend = await userModels
      .findOne({ _id })
      .select("fullname");
    if (!isAlreadyUserFriend) {
      socket.to(isAlreadyUserFriend?.socketId).emit("friend_request_accepted", {
        message: `${reciver?.fullname} has accepted your friend request.`,
      });
      return;
    }
    const request_doc = await friendModel.findOne({ sender: _id });
    const reciver = await userModels.findById(request_doc.recipeint);
    const sender = await userModels.findById(request_doc.sender);
    //! add friends
    reciver.friends.push(sender._id);
    sender.friends.push(reciver._id);
    reciver.save();
    sender.save();

    //! Infom sender to xyz have friend request accepted
    socket.to(sender?.socketId).emit("friend_request_accepted", {
      message: `${reciver?.fullname} has accepted your friend request.`,
    });

    io.to(reciver?.socketId).emit("friend_request_accepted", {
      message: `🎉 You have a new friend: ${sender?.fullname}! Welcome them with open arms!`,
    });
    const res = await friendModel.deleteMany({ recipeint: reciver._id });
  });
  //!get all chatlist
  socket.on("get_direct_conversions", async (data, callback) => {
    const { token } = data;
    const to = jwtDecodes(token).id;
    const diretConversions = await OnetoOneMessageModel.find({
      participants: { $all: [to] },
    })
      .populate(
        "participants",
        "fullname status email  _id lastMessage lastMessageTime unread lastMessageTimeSort status avatar"
      )
      .select("-message");
    callback(diretConversions, to);
  });
  //! start_conversion

  socket.on("start_conversion", async (data, callback) => {
    const { token, from } = data;
    const to = await jwtDecodes(token).id;
    const existing_conversations = await OnetoOneMessageModel.find({
      participants: { $size: 2, $all: [to, from] },
    }).populate("participants", "fullname");
    if (existing_conversations.length == 0) {
      let new_chat = await OnetoOneMessageModel.create({
        participants: [to, from],
      });
      new_chat.save();

      new_chat = OnetoOneMessageModel.find({
        participants: { $size: 2, all: [to, from] },
      });

      socket.emit("start_chat", new_chat);

      callback(new_chat._id, from);
    } else {
      await OnetoOneMessageModel.updateOne(
        {
          _id: existing_conversations[0]._id,
          "status.id": to,
        },
        {
          $set: { "status.$.delete": false, lastMessageTimeSort: Date.now() },
        }
      );
      socket.emit("start_chat", existing_conversations[0]);
      callback(existing_conversations[0]._id, from);
    }
  });
  //!send user message when click on chat list
  socket.on("get_message", async (data, callback) => {
    const { conversions_id, token } = data;
    const to = await jwtDecodes(token).id;
    const chats = await OnetoOneMessageModel.findById(conversions_id);
    const result = await OnetoOneMessageModel.updateOne(
      { _id: conversions_id, "unread.id": to },
      { $set: { "unread.$.unread": 0 } }
    );
    callback(chats.message);
  });
  //!send text message
  socket.on("text_message", async (data) => {
    const { token, from, message, conversation_id } = data;
    const currentDate = new Date();
    const formattedTime = await currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const chat = await OnetoOneMessageModel.findById(conversation_id);
    const to = jwtDecodes(token).id;
    const to_user = await userModels.findById(to);
    const from_user = await userModels.findById(from);
    chat.lastMessageTime = formattedTime;
    chat.lastMessageTimeSort = Date.now();

    //!user update last message and time and unread messages
    //* what is $ on here it can update fast matching value
    chat.lastMessageTime = formattedTime;
    chat.lastMessage = message;
    const result = await OnetoOneMessageModel.updateOne(
      { _id: conversation_id, "unread.id": from },
      { $inc: { "unread.$.unread": 1 } }
    );

    //! unread message

    const new_message = {
      to,
      from,
      type: "msg",
      message: message,
      created_at: `${Date()} + ${formattedTime}`,
    };
    chat.message.push(new_message);
    await chat.save();

    io.to(to_user?.socketId).emit("new_message", {
      message: new_message,
      conversation_id,
      token,
    });
    io.to(from_user?.socketId).emit("new_message", {
      message: new_message,
      conversation_id,
      token,
    });
  });
  //!link message

  socket.on("link_message", async (data) => {
    const {
      token,
      from,
      subType,
      type,
      message,
      conversation_id,
      link,
      fileName,
    } = data;
    const chat = await OnetoOneMessageModel.findById(conversation_id);
    const to = jwtDecodes(token).id;
    const to_user = await userModels.findById(to);

    const from_user = await userModels.findById(from);
    const currentDate = new Date();

    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Set to true to include AM/PM
    });
    const new_message = {
      to,
      from,
      type,
      subType: subType,
      fileName,
      link,
      message: message,
      created_at: `${Date()} + ${formattedTime}`,
    };
    if (subType === "Media") {
      chat.lastMessage = "🖼️  🖼️";
    } else if (subType === "Document") {
      chat.lastMessage = "📋  📋";
    }
    chat.message.push(new_message);
    await chat.save();

    io.to(to_user?.socketId).emit("new_message", {
      message: new_message,
      conversation_id,
    });
    io.to(from_user?.socketId).emit("new_message", {
      message: new_message,
      conversation_id,
    });
  });
  socket.on("read_message", async (data) => {
    const { conversions_id, token } = data;
    const to = await jwtDecodes(token).id;
    const result = await OnetoOneMessageModel.updateOne(
      { _id: conversions_id, "unread.id": to },
      { $set: { "unread.$.unread": 0 } }
    );
  });
  socket.on("delete_chatlist", async (data) => {
    const { conversions_id, token } = data;
    const to = await jwtDecodes(token).id;
    await OnetoOneMessageModel.updateOne(
      { _id: conversions_id, "status.id": to },
      { $set: { "status.$.delete": true } }
    );
  });
  //! video calling && audio call
  //* check user is buy or not
  //* check user is online or not
  //* check user dined call
  //! call user for video
  socket.on("calluser", async (data) => {
    const { signalData, userToCall, token } = data;
    const to = await jwtDecodes(token).id;
    const user = await userModels
      .findById(userToCall)
      .select("socketId status");

    if (user.status == "online") {
      io.to(user?.socketId).emit("calluser", { signal: signalData, to: to });
    } else {
      const user = await userModels.findById(to).select("socketId");

      io.to(user?.socketId).emit("user_offline", {
        message: "The user is currently unavailable",
      });
    }
  });
  //! audio call
  socket.on("calluser_audio", async (data) => {
    const { signalData, userToCall, token, avatar, fullname } = data;
    const to = await jwtDecodes(token).id;
    const user = await userModels
      .findById(userToCall)
      .select("socketId status");
    if (user.status == "online") {
      io.to(user.socketId).emit("calluser_audio", {
        signal: signalData,
        to: to,
        avatar,
        fullname,
      });
    } else {
      const user = await userModels.findById(to).select("socketId");
      io.to(user.socketId).emit("user_offline", {
        message: "The user is currently unavailable",
      });
    }
  });
  // ! call info
  //!//!busy user with another call
  socket.on("busy_another_call", async ({ id }) => {
    const user = await userModels.findById(id).select("socketId");
    io.to(user.socketId).emit("busy_another_call", {
      message: "busy_another_call",
    });
  });
  //!call denied
  socket.on("call_denied", async ({ id }) => {
    const user = await userModels.findById(id).select("socketId");
    io.to(user?.socketId).emit("call_denied", { message: "Call Denied" });
  });
  //! call end
  socket.on("call_end", async ({ id }) => {
    const user = await userModels.findById(id).select("socketId");
    io.to(user.socketId).emit("call_end", { message: "Call End" });
  });
  //!answer call
  socket.on("answerCall", async (data) => {
    const { signal, caluserinfo } = data;
    const user = await userModels.findById(caluserinfo).select("socketId");
    io.to(user.socketId).emit("callAccepted", signal);
  });
  //! infom user user call end the cal
  socket.on("audio_call_end", async ({ id }) => {
    const user = await userModels.findById(id).select("socketId");
    io.to(user?.socketId).emit("audio_call_end", {
      message: "use have end the call",
    });
  });

  socket.on("Video_call_end", async ({ id }) => {
    const user = await userModels.findById(id).select("socketId");
    io.to(user?.socketId).emit("Video_call_end", {
      message: "use have end the call",
    });
  });
  socket.on("disconnect", async () => {
    await userModels.updateOne(
      { socketId: socket.id },
      { $set: { status: "offline" } }
    );
  });
});

process.on("unhandledRejection", (error) => {
  server.close(() => {
    process.exit(1);
  });
});
