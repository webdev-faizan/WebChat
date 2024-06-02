import mongoose from "mongoose";
const FriendSehma = mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  recipeint: {
    type: mongoose.Schema.ObjectId,

    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const friendModel = mongoose.model("friendRequest", FriendSehma);
export default friendModel;
