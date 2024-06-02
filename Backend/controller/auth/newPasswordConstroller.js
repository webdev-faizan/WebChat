import crypto from "crypto";
import userModels from "../../models/userModels.js";
const newPassword = async (req, res) => {
  try {
    const { password, token } = await req.body;
    const otpy = token.trim();
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(otpy)
      .digest("hex");
    const this_user = await userModels.findOne({
      passwordResetToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (this_user) {
      this_user.password = password;
      this_user.passwordResetExpires = undefined;
      this_user.passwordResetToken = undefined;
      this_user.lastPasswordChangeAt = Date.now();
      await this_user.save();
      return res.status(200).json({ message: "Password Successfully Changed" });
    } else {
      return res.status(401).json({ message: "Invalid token or expiry" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal sever error" });
  }
};
export default newPassword;
