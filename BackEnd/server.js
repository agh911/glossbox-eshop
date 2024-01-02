// Backend Entry Point
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

const app = express();

config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` });

const port = process.env.PORT;
const host = process.env.HOST;

//*Importing routes
import { getProductDataRoute } from "./routes/getProductData.route.js";
import { getUserDataRoute } from "./routes/getUserData.route.js";
import { signInRoute, signUpRoute } from "./routes/auth.route.js";
import { addToBasketRoute } from "./routes/basket.route.js"

const databaseConnect = async () => {
    console.log("connecting to mongo...");
    await mongoose.connect(process.env.DB_URI);
    console.log(`connected to db: ${process.env.DB_URI}`);
};

databaseConnect().catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", getProductDataRoute);
app.use("/", getUserDataRoute);
app.use("/auth/signIn", signInRoute);
app.use("/auth/signUp", signUpRoute);
app.use("/api/basket", addToBasketRoute);

const SERVER = app.listen(port, host, () => {
    console.log(`server running on https://${host}:${port}`);
});

export default SERVER;