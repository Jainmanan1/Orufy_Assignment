
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";



const app = express();

app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
res.send("server has been started")
});

import router from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js"

app.use("/api/products", productRouter);
app.use("/api/auth",router);
const PORT = process.env.PORT || 5000;




export default app;

