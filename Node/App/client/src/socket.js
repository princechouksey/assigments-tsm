import { io } from "socket.io-client";
import Cookies from "js-cookie";


const socket = io("http://localhost:3000", {
  auth: {
    token : Cookies.get("token")
    
  },
  transports: ["websocket"],
});

export default socket;
