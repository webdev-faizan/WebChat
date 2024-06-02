import Jwt from "jsonwebtoken";
import userModels from "../models/userModels.js";
import { CheckValidObjectId } from "../utils/objectIdValidator.js";
const ProtectRoutes = async (req, resp, next) => {
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      const userInfo = Jwt.verify(token, process.env.JWT_SECRET);
      if (CheckValidObjectId(userInfo?.id)) {
        const existing_user = await userModels.findById({ _id: userInfo.id });
        if (existing_user) {
          if (existing_user?.passwordChangeAt > Date.now()) {
            req.user = existing_user.id;
            next();
          } else {
            req.user = existing_user.id;
            next();
          }
        } else {
          return resp.status(404).json({ message: "User not found" });
        }
      } else {
        return resp.status(403).json({ message: "invalid token or expire" });
      }
    } else {
      return resp.status(403).json({ message: "invalid token or expire" });
    }
  } catch (error) {
    return resp.status(500).json({ message: "Internal server error" });
  }
};
export default ProtectRoutes;
