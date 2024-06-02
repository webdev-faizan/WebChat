import { Router } from "express";
import unconnectedUsersController from "../controller/userManagement/unconnectedUsersController.js";
import ProtectRoutes from "../middlewares/ProtectRoutes.js";
import friendConnectedUsersController from "../controller/userManagement/friendConnectedUsersController.js";
import requestConnectedUsersController from "../controller/userManagement/requestConnectedUsersController.js";
import userProfileUpdateController, {
  userProfileGetController,
} from "../controller/userManagement/userProileController.js";
const userRoutes = Router();
userRoutes.get("/unconnectedusers", ProtectRoutes, unconnectedUsersController);
userRoutes.get(
  "/connectedusers",
  ProtectRoutes,
  friendConnectedUsersController
);
userRoutes.get(
  "/requestconnectedusers",
  ProtectRoutes,
  requestConnectedUsersController
);
userRoutes.get("/update-profile", ProtectRoutes, userProfileUpdateController);
userRoutes.get("/get-profile", ProtectRoutes, userProfileGetController);
export default userRoutes;
