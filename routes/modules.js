import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  moduleList,
  createModule,
  updateModule,
  deleteModule,
  findByName,
  findById,
} from "../controllers/modules_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda  para adminsitrador
route.get("/", (req, res) => {
  let result = moduleList();
  result
    .then((module) => {
      res.json({
        module,
      });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Crear module
route.post("/", async (req, res) => {
  try {
    const module = await createModule(req);
    res.json({ module });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error al crear modulo" });
  }
});

//Eliminar un modulo
route.delete("/:id", verifyToken, (req, res) => {
  let result = deleteModule(req.params.id);
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

//Buscar por nombre los modulos
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

//Buscar por ID los modulos
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
  let result = limitModules(req.query.page, req.query.limit);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.patch("/:moduleId", (req, res) => {
  let result = updateModule(req.params.eventId);
  result
    .then((numberOfTicketsModified) => {
      res.json({ success: true, numberOfTicketsModified });
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err.message });
    });
});

export default route;
