import userModels from "../../models/userModels.js";
const userProfileUpdateController = async (req, resp) => {
  try {
    const id = await req.user;
    await userModels.findByIdAndUpdate(id, {
      $set: { avatar: req.query.profileUrl },
    });
    return resp.status(200).json({ message: "Successfull change profile" });
  } catch (error) {
    return resp.status(500).json({ message: "Internal server error" });
  }
};
export default userProfileUpdateController;
export const userProfileGetController = async (req, resp) => {
  try {
    const id = await req.user;
    const user = await userModels
      .findById(id)
      .select("fullname email avatar createdAt");
    return resp.status(200).json(user);
  } catch (error) {
    return resp.status(500).json({ message: "Internal server error" });
  }
};
