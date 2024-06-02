import { isValidObjectId } from "mongoose";
export const CheckValidObjectId = (id) => {
  return isValidObjectId(id);
};
