import Jwt from "jsonwebtoken";

const jwtDecodes = (token) => {
  const userinfo = Jwt.verify(token, process.env.JWT_SECRET);
  return userinfo;
};

export default jwtDecodes;
