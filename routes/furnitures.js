import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  furnitureList,
  createFurniture,
  updateFurniture,
  deleteFurniture,
  findByName,
  findById,
  updateModuleOfFurniture,
} from "../controllers/furniture_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda  para adminsitrador
route.get("/", (req, res) => {
  let result = furnitureList();
  result
    .then((furniture) => {
      res.json(furniture);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Crear furniture
route.post("/", async (req, res) => {
  try {
    const furniture = await createFurniture(req);
    res.json(furniture);
  } catch (err) {
    res.status(400).json({ error: err.message || "Error al crear mueble" });
  }
});

//Eliminar un furniture
route.delete("/:id", verifyToken, (req, res) => {
  let result = deleteFurniture(req.params.id);
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

//Buscar por nombre los furniture
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

//Buscar por ID los muebles
route.get("/find-by-id/:id", (req, res) => {
  let result = findById(req.params.id);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Paginado ejemplo: localhost:3000/events/limit-events?page=1&limit=2
route.get("/limit-modules", (req, res) => {
  let result = limitFurnitures(req.query.page, req.query.limit);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.patch("/:furnitureId", (req, res) => {
  let result = updateFurniture(req.params.eventId);
  result
    .then((numberOfTicketsModified) => {
      res.json({ success: true, numberOfTicketsModified });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err.message });
    });
});

// Ruta para actualizar un módulo específico dentro de un mueble
route.put("/:furnitureId/ver-modulos/:moduleId", async (req, res) => {
  try {
    let result = await updateModuleOfFurniture(req, res);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default route;
