import userModels from "../../models/userModels.js";
import sessionTokenGenerator from "../../utils/jwtUtils.js";

const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;
    const user = await userModels
      .findOne({ email })
      .select("_id email firstName lastName password emailVerified");
    const hashPassword = await user?.correctPassword(password, user?.password);
    if (hashPassword) {
      if (!user?.emailVerified) {
        resp.status(400).json({ message: "Please verify your email" });
      } else {
        const token = await sessionTokenGenerator(user._id);
        return resp.json({
          message: "Logged in successfully! ",
          token,
          status: "success",
          id: user._id,
        });
      }
    } else {
      return resp
        .status(400)
        .json({ message: "Email or password is incorrect", status: "error" });
    }
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

export default loginController;
