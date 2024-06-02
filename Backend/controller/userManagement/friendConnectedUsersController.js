import userModels from "../../models/userModels.js";
const friendConnectedUsersController = async (req, resp) => {
  try {
    const userFriend = await userModels
      .findById(req.user)
      .populate("friends", "_id email fullname status avatar");
    return resp.json({
      message: "successfully found friends",
      data: userFriend.friends,
    });
  } catch (error) {
    return resp.json({ message: "internal server error" }).status(500);
  }
};

export default friendConnectedUsersController;
