import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import http from "http";
import https from "https";
import nestedRouter from "./routers/nested.js";
import userRouter from "./routers/userRoutes.js";
import authRouter from "./routers/authRouter.js";
import devRouter from "./routers/developerRouter.js";
import projectRouter from "./routers/projectRouter.js";
import roleRouter from "./routers/roleRouter.js";
import swaggerController from "../controllers/swaggerController.js";
import chatRoutes from "./routers/chatRouter.js";
import invoiceRouter from "./routers/invoiceRouter.js";
import setupSockets from "../sockets/index.js";
import eventRouter from "./routers/eventRouter.js";
import developerClientsRouter from "./routers/developerClientsRouter.js";
import subscribeEmailRouter from "./routers/suscribeEmailRouter.js";

const app = express();
const server = http.createServer(app);
setupSockets(server);

app.use(
  cors({
    // origin: process.env.NEXT_PUBLIC_CLIENT_URL,
    // credentials: true,
    origin: "*", // Allow any origin (use for testing only)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

const apiRouter = express.Router();

apiRouter.use("/", authRouter);
apiRouter.use("/", userRouter);
apiRouter.use("/", roleRouter);
apiRouter.use("/", subscribeEmailRouter);

apiRouter.use("/nested", nestedRouter);
apiRouter.use("/developer", devRouter);
apiRouter.use("/developer", developerClientsRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/projects", invoiceRouter);
apiRouter.use("/chat", chatRoutes);
apiRouter.use("/events", eventRouter);

app.use("/api", apiRouter);

app.use("/docs", swaggerController);

app.get("/", (req, res) => {
  res.json({ message: "Hello, this API works" });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
