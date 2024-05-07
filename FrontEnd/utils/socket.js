import { io } from "socket.io-client";

export const socket = io(`https://glossbox-eshop.onrender.com`, { transports: ['websocket'] });
// export const socket = io(`http://localhost:3000`, { transports: ['websocket'] });
