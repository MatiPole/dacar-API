import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  moduleAll,
  moduleList,
  createModule,
  cloneModule,
  updateModule,
  updateModulePiecesNumber,
  deleteModule,
  findByName,
  findById,
} from "../controllers/modules_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda todos los módulos
route.get("/", (req, res) => {
  let result = moduleAll();
  result
    .then((module) => {
      res.json(module);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.get("/list", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page)) || 1; // Aseguramos que sea al menos 1
  const limit = Math.min(Math.max(1, parseInt(req.query.limit)) || 10, 100); // Máximo 100 por ejemplo
  const searchTerm = req.query.search || ""; // Captura el término de búsqueda

  moduleList(page, limit, searchTerm)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err); // Log del error en el servidor
      res
        .status(500)
        .json({ error: "Ocurrió un error al obtener los módulos." });
    });
});

//Crear module
route.post("/", async (req, res) => {
  try {
    const module = await createModule(req);
    res.json(module);
  } catch (err) {
    res.status(400).json({ error: err.message || "Error al crear modulo" });
  }
});

//Clonar module
route.get("/clone-module/:moduleId", async (req, res) => {
  try {
    const module = await cloneModule(req.params.moduleId);
    res.json(module);
  } catch (err) {
    res.status(400).json({ error: err.message || "Error al clonar modulo" });
  }
});

//Eliminar un modulo
route.delete("/delete-module/:moduleid" /* , verifyToken */, (req, res) => {
  let result = deleteModule(req.params.moduleid);
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
route.get("/find-by-name/:name", async (req, res) => {
  try {
    let result = await findByName(req.params.name);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
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

route.put("/edit-module/:moduleId", async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const updateFields = req.body;

    let result = await updateModule(moduleId, updateFields);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

route.patch("/edit-module-pieces/:moduleId", async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const { pieces_number } = req.body;

    let result = await updateModulePiecesNumber(moduleId, pieces_number);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default route;
