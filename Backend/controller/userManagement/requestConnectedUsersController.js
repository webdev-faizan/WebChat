import friendModel from "../../models/friendRequestModel.js";
const requestConnectedUsersController = async (req, resp) => {
  try {
    const userId = req.user;
    const requestToConnected = await friendModel
      .find({ recipeint: userId })
      .populate("sender", "_id fullname status avatar");
    return resp.status(200).json({
      message: "successfully found request users",
      data: requestToConnected,
    });
  } catch (error) {
    return resp.status(500).json({ message: "internal server error" });
  }
};
export default requestConnectedUsersController;
