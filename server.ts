require("dotenv").config();
import express, { Request, Response } from "express";
const app = express();
import { connectoDB } from "./config/mongoDB";
import { task } from "./routes/taskRoutes";
import { auth } from "./routes/authRoutes";
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Server up and running");
});

const PORT = process.env.PORT || 8000;

app.use("/api/task", task);
app.use("/api/auth", auth);
app.listen(PORT, () => {
  connectoDB();
  console.log(`Server up and running on http://localhost:${PORT}`);
});
