import express from "express";
import mongoose from "mongoose";
import MainTable from "./routes/main_table.js";
import Modules from "./routes/modules.js";
import Pieces from "./routes/pieces.js";
import cors from "cors";
import "dotenv/config";

mongoose
  .connect(process.env.CONNECT /* "mongodb://127.0.0.1:27017/ventradb" */, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch(() => {
    console.log("Error al conectarse a la base de datos");
  });

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/main-table", MainTable);
app.use("/modules", Modules);
app.use("/pieces", Pieces);
app.get("/", function (req, res) {
  res.send("API CORRIENDO");
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log("Server running...");
});