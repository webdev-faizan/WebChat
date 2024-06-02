import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import userModels from "../../models/userModels.js";
const unconnectedUsersController = async (req, resp) => {
  try {
    const userId = await req.user;
    const userinfo = await userModels.findById(userId);
    //! traditional js
    // const allUsers = await userModels
    //   .find({ emailVerified: true })
    //   .select("friends fullname _id email status avatar");
    // const remaining_users = await allUsers.filter((user) => {
    //   return (
    //     userId != user._id &&
    //     !userinfo.friends.some(
    //       (allFriends) => allFriends._id.toString() == user._id.toString()
    //     )
    //   );
    // });
    //!aggregation mongodb
    const remaining_users = await userModels.aggregate([
      {
        $match: {
          emailVerified: true,
          $and: [
            { _id: { $ne: new ObjectId(userId) } },
            {
              _id: {
                $nin: userinfo.friends,
              },
            },
          ],
        },
      },
      {
        $project: {
          fullname: 1,
          _id: 1,
          email: 1,
          status: 1,
          avatar: 1,
        },
      },
    ]);
    return resp.json({
      message: "successfully found users",
      data: remaining_users,
    });
  } catch (error) {
    resp.status(500).json({ message: "Internal server error" });
  }
};
export default unconnectedUsersController;
