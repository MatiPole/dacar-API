import express from "express";
import verifyToken from "../middlewares/auth.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import {
  suppliesList,
  createSupplie,
  updateSupplie,
  deleteSupplie,
  suppliesTablesList,
  suppliesExceptTablesList,
  findByName,
} from "../controllers/supplies_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda eventos para adminsitrador
route.get("/", (req, res) => {
  let result = suppliesList();
  result
    .then((supplie) => {
      res.json(supplie);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.get("/tables", (req, res) => {
  let result = suppliesTablesList();
  result
    .then((supplie) => {
      res.json(supplie);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.get("/supplies-not-tables", (req, res) => {
  let result = suppliesExceptTablesList();
  result
    .then((supplie) => {
      res.json(supplie);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Crear insumo
route.post("/", async (req, res) => {
  try {
    const supplie = await createSupplie(req);
    res.json({ supplie });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error al crear main table" });
  }
});

//Eliminar un insumo
route.delete("/:id", verifyToken, (req, res) => {
  let result = deleteSupplie(req.params.id);
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

//Buscar por nombre los insumos
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

//Paginado ejemplo: localhost:3000/events/limit-events?page=1&limit=2
route.get("/limit-events", (req, res) => {
  let result = limitEvents(req.query.page, req.query.limit);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.patch("/removeResell/:eventId", (req, res) => {
  let result = updateSupplie(req.params.eventId);
  result
    .then((numberOfTicketsModified) => {
      res.json({ success: true, numberOfTicketsModified });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err.message });
    });
});

export default route;
