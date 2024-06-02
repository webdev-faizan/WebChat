import mongoose from "mongoose";
const oneToOneMessagesSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  lastMessage: {
    type: String,
  },
  lastMessageTime: {
    type: String,
  },
  unread: [
    {
      _id: false,
      id: String,
      unread: Number,
    },
  ],
  status: [
    {
      _id: false,
      id: String,
      delete: {
        default: false,
        type: Boolean,
      },
    },
  ],
  lastMessageTimeSort: {
    type: Date,
    default: Date.now,
  },
  message: [
    {
      to: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
      from: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
      type: {
        type: String,
        enum: ["msg", "divider"],
      },
      subType: {
        type: String,
        enum: ["Text", "Media", "Link", "Document"],
      },
      fileName: {
        type: String,
      },
      link: {
        type: String,
      },
      created_at: {
        type: String,
      },
      message: {
        type: String,
      },
      file: {
        type: String,
      },
    },
  ],
});
//! to it later

oneToOneMessagesSchema.pre("save", function (next) {
  if (this?.isModified("participants")) {
    this.unread = [
      {
        id: this.participants[0],
        unread: 0,
      },
      {
        id: this.participants[1],
        unread: 0,
      },
    ];
    this.status = [
      {
        id: this.participants[0],
        delete: false,
      },
      {
        id: this.participants[1],
        delete: false,
      },
    ];
  }

  if (this?.isModified("message")) {
    this.status = [
      {
        id: this.participants[0],
        delete: false,
      },
      {
        id: this.participants[1],
        delete: false,
      },
    ];
  }

  next();
});

const OnetoOneMessageModel = new mongoose.model(
  "OneToOneMessage",
  oneToOneMessagesSchema
);

export default OnetoOneMessageModel;
