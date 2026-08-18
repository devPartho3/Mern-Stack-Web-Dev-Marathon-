import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import healthcheck from "./routes/healthcheck.route.js";

const app = express();

// middlewares
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser());
app.use(express.static("public"));

// test route (VERY useful)
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// routes
app.use("/api/v1/healthcheck", healthcheck);
app.use("/api/v1/user", userRouter);

// export app
export default app;