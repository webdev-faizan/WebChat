import { createSlice, current } from "@reduxjs/toolkit";
import { socket, token } from "../../socket";
const initialState = {
  newConversion: true,
  direct_chat: {
    convsersions: [],
    current_messages: [],
    current_conversion: null,
  },
  group_chat: {},
  userInfo: { name: "", online: "", avatar: "" },
};
const slice = createSlice({
  name: "conversions",
  initialState,
  reducers: {
    newConversion(state, action) {
      state.newConversion = action.payload;
    },
    fetchDirectConversion(state, actions) {
      const userId = actions.payload.userId;
      let users = actions.payload.directConversions.map((el) => {
        const {
          lastMessage,
          lastMessageTime,
          unread,
          lastMessageTimeSort,
          status,
        } = el;
        let user = el.participants.find((ele) => ele._id !== userId);
        const window_url = window.location.href;
        const open_conversion = window_url.split("/").at(-1).split("#").at(0);
        if (user._id.toString() === open_conversion) {
          const directConversionsUser = {
            conversation_id: el._id,
            userId: user?._id,
            avatar: user?.avatar || "",
            name: user?.fullname,
            lastMsg: lastMessage,
            time: lastMessageTime,
            unread: 0,
            online: user?.status === "online",
            sort: lastMessageTimeSort,
            status,
          };
          socket.emit("read_message", { conversions_id: el._id, token });
          return directConversionsUser;
        }

        const unreadMsg = unread.find((ele) => ele.id === userId);
        const directConversionsUser = {
          conversation_id: el._id,
          userId: user?._id,
          avatar: user?.avatar || "",
          name: user?.fullname,
          lastMsg: lastMessage,
          time: lastMessageTime,
          unread: unreadMsg.unread,
          online: user?.status === "online",
          sort: lastMessageTimeSort,
          status,
        };

        return directConversionsUser;
      });

      //remove delet user
      const removeDeleteUser = users.filter((ele) => {
        const { status } = ele;

        return status.some((ele) => ele.id === userId && !ele.delete);
      });
      //! sort user base on the last message
      const sortUserChatList = removeDeleteUser.sort((a, b) => {
        return Date.parse(b.sort) - Date.parse(a.sort);
      });
      state.direct_chat.convsersions = sortUserChatList;
    },
    CurrentConversation(state, actions) {
      state.direct_chat.current_conversion = actions.payload;
    },
    CurrentMessages(state, action) {
      state.direct_chat.current_messages = action.payload;
    },
    updateCurrentMessage(state, action) {
      if (state.newConversion) return;
      state.direct_chat.current_messages.push(action.payload);
    },
    removeCurrentMessages(state) {
      state.direct_chat.current_messages = [];
    },
    userInfo(state, action) {
      const this_user = current(state.direct_chat.convsersions).find(
        (ele) => ele.userId === action.payload.userId
      );
      state.userInfo.name = this_user?.name;
      state.userInfo.online = this_user?.online;
      state.userInfo.avatar = this_user?.avatar;
    },
    removeUserInfo(state) {
      state.userInfo.name = "";
      state.userInfo.online = "";
      state.userInfo.avatar = "";
    },
  },
});

export default slice.reducer;

export function FetchDirectConversion(directConversions, userId) {
  return async (disptach) => {
    disptach(
      slice.actions.fetchDirectConversion({ directConversions, userId })
    );
  };
}
export function FetchCurrentMessages(messages) {
  return async (disptach) => {
    disptach(slice.actions.CurrentMessages(messages));
  };
}

export function UpdateCurrentMessage(messages) {
  return async (disptach) => {
    disptach(slice.actions.updateCurrentMessage(messages.message));
  };
}
export function CurrentConversation(conversation_id) {
  return (disptach) => {
    disptach(slice.actions.CurrentConversation(conversation_id));
  };
}
export function RemoveCurrentMessages() {
  return (disptach) => {
    disptach(slice.actions.removeCurrentMessages());
  };
}
export function UserInfo(userId) {
  return async (disptach) => {
    setTimeout(() => {
      disptach(slice.actions.userInfo({ userId }));
    }, 500);
  };
}
export function RemoveUserInfo() {
  return async (disptach) => {
    disptach(slice.actions.removeUserInfo());
  };
}
export function NewConversion(value) {
  return async (dispatch) => {
    dispatch(slice.actions.newConversion(value));
  };
}
