// Backend Entry Point
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const SERVER = createServer(app);
const io = new Server(SERVER);

config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` });

const port = process.env.PORT;
const host = process.env.HOST;

//*Importing routes
import { getProductDataRoute } from "./routes/getProductData.route.js";
import { getUserDataRoute } from "./routes/getUserData.route.js";
import { signInRoute, signUpRoute } from "./routes/auth.route.js";
import { addToBasketRoute } from "./routes/basket.route.js"
import { checkoutRoute } from "./routes/checkout.route.js";
import { orderRouter } from "./routes/order.route.js";
import { validateUser } from "./middlewares/glossbox.validation.js";

const databaseConnect = async () => {
    console.log("connecting to mongo...");
    await mongoose.connect(process.env.DB_URI);
    console.log(`connected to db: ${process.env.DB_URI}`);
};

databaseConnect().catch((err) => console.log(err));

app.use(cors({ origin: process.env.WEB_APP_URL }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", getProductDataRoute);
app.use("/", getUserDataRoute);
app.use("/auth/signIn", validateUser, signInRoute);
app.use("/auth/signUp", validateUser, signUpRoute);
app.use("/api/basket", addToBasketRoute);
app.use("/create-checkout-session", checkoutRoute);
app.use("/", orderRouter);

// Listen for WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start listening on the specified port and host
SERVER.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});

export { SERVER, io };