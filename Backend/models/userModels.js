import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  avatar: { type: String, default: "" },
  email: { type: String },
  password: { type: String },
  passwordChangeAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  optExpiryToken: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpiryTime: Date,
  friends: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
  ],
  socketId: {
    type: String,
  },
  status: {
    type: String,
    default: "offline",
    enum: ["online", "offline"],
  },
});

userSchema.pre("save", function (next) {
  if (!this?.isModified("otp")) next();
  this.otp = bcrypt.hashSync(this.otp, 8);
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = bcrypt.hashSync(this.password);
  next();
});

userSchema.methods.correctPassword = async function (
  canditatepassword,
  userpassword
) {
  return bcrypt.compareSync(canditatepassword, userpassword);
};
userSchema.methods.PasswordResetToken = async function () {
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  const resetToken = await crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = await crypto
    .createHash("sha256")
    .update(`${resetToken}`)
    .digest("hex");
  return resetToken;
};
const userModels = new mongoose.model("user", userSchema);
export default userModels;
