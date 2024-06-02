import Jwt from "jsonwebtoken";
import "dotenv/config";

const sessionTokenGenerator = (id) => {
  const token = Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

export default sessionTokenGenerator;
