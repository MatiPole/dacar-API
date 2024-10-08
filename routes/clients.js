import express from "express";
import verifyToken from "../middlewares/auth.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import {
  clientsList,
  createClient,
  updateClient,
  deleteClient,
  findByName,
  clientById,
} from "../controllers/clients_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda eventos para adminsitrador
route.get("/", (req, res) => {
  let result = clientsList();
  result
    .then((client) => {
      res.json(client);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Crear cliente
route.post("/", async (req, res) => {
  try {
    const client = await createClient(req);
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message || "Error al crear cliente" });
  }
});

//Eliminar un cliente
route.delete("/:id", (req, res) => {
  let result = deleteClient(req.params.id);
  result
    .then((value) => {
      res.json({
        value,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Buscar por nombre
route.get("/find-by-name/:name", (req, res) => {
  let result = findByName(req.params.name);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Buscar por nombre
route.get("/:clientId", (req, res) => {
  let result = clientById(req.params.clientId);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.put("/edit-client/:clientId", async (req, res) => {
  try {
    const updateFields = req.body;
    let result = await updateClient(req.params.clientId, updateFields);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default route;
