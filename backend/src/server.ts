import express from "express";
import cors from "cors";
import collegeRoutes from "./routes/college.routes";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/colleges", collegeRoutes);

app.get("/", (req, res) => {
  console.log("ROOT HIT");
  res.send("OK");
});

app.listen(3001, () => {
  console.log("RUNNING");
});