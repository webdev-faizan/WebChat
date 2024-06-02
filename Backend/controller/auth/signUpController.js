import Jwt from "jsonwebtoken";
import VerifedEmailMail from "../../templates/mail/VerifedEmailMail.js";
import userModels from "../../models/userModels.js";
import sendNodemailerMail from "../../services/mail.js";
const signUpController = async (req, resp) => {
  try {
    const { fullname, email, password } = req.body;
    const existing_user = await userModels.findOne({ email });
    if (!existing_user) {
      const this_user = await new userModels({
        fullname,
        email,
        password,
        optExpiryToken: Date.now() + 10 * 60 * 1000,
      });
      const token = Jwt.sign({ id: this_user._id }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      });
      const link = `${process.env.BASE_URL}/verify-email?token=${token}`;
      if (process.env.NODE_ENV === "production") {
        const html = VerifedEmailMail(this_user.fullname, link);
        await sendNodemailerMail({
          to: email,
          subject: "Email Verified",
          html,
        });
      }
      await this_user.save();
      return resp.status(201).json({
        message: "Sigup successfully Plase verfiy your email ",
        status: "success",
      });
    } else {
      return resp.status(401).json({
        message: "email is already in use please login",
        status: "error",
      });
    }
  } catch (error) {
    return resp.status(500).json({ message: "Internal server Error" });
  }
};

export default signUpController;

