import express from "express";
import cors from "cors";
import PersonaRouter from "./src/controllers/personaController.js";


const app  = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/personas", PersonaRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});