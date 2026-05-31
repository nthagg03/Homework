import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/students";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Student Management API");
});

app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});