const emailVerification = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is missing or invalid" });
    }
    const tokenInfo = Jwt.verify(token, process.env.JWT_SECRET);
    if (!tokenInfo || !tokenInfo?.id) {
      return res.status(400).json({ message: "Token is invalid" });
    }
    const id = tokenInfo.id;
    const date = Date.now();
    const this_user = await userModels
      .findById(id)
      .where("optExpiryToken")
      .gt(date)
      .select("emailVerified optExpiryToken");
    if (!this_user?.optExpiryToken) {
      return res
        .status(401)
        .json({ message: "Token has expired or is invalid" });
    }
    this_user.emailVerified = true;
    this_user.optExpiryToken = undefined;
    await this_user.save();
    return res
      .status(200)
      .json({ message: "Email verification completed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default emailVerification;
