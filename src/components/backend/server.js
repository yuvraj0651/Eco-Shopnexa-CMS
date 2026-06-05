import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

const DB_PATH = "./db.json";

/*
|--------------------------------------------------------------------------
| Read DB
|--------------------------------------------------------------------------
*/

const getDB = () => {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
};

/*
|--------------------------------------------------------------------------
| Auth Data
|--------------------------------------------------------------------------
*/

app.get("/api/auth", (req, res) => {
  const db = getDB();

  res.status(200).json(db.auth);
});

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running Successfully",
  });
});

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});