import io from "socket.io-client";
import { Cookies } from "react-cookie";
const cookie = new Cookies();
let socket;
const token = cookie.get("auth");
const connectSocket = () => {
  socket = io(process.env.REACT_APP_BASE_URL_SOCET_SERVER, {
    query: `user_token=${token}`,
  });
};
export { connectSocket, socket, token };
