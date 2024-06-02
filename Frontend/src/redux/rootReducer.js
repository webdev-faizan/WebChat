import { combineReducers } from "redux";
import appReducer from "./app";
import storage from "redux-persist/lib/storage";
import authReducer from "./silice/auth";
import convsersionReducer from "./silice/conversions";
import videoReducer from "./silice/videocall";
const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "reducer",
};
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversions: convsersionReducer,
  video: videoReducer,
});
export { rootPersistConfig, rootReducer };
