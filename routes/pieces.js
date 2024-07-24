import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  piecesList,
  createPiece,
  updatePiece,
  deletePiece,
  findByModuleId,
  getModuleAndPiecesByModuleId,
  findByName,
} from "../controllers/pieces_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda  para adminsitrador
route.get("/", (req, res) => {
  let result = piecesList();
  result
    .then((piece) => {
      res.json(piece);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//Crear pieza
route.post("/", async (req, res) => {
  try {
    const module = await createPiece(req);
    res.json({ module });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error al crear modulo" });
  }
});

//Eliminar un pieza
route.delete(
  "/:id",
  /* verifyToken, */ (req, res) => {
    let result = deletePiece(req.params.id);
    result
      .then((value) => {
        res.json({
          value,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

//Buscar por nombre los piezas
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

//Buscar piezas por moduleId
route.get("/find-by-moduleId/:moduleId", (req, res) => {
  let result = findByModuleId(req.params.moduleId);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Buscar módulo y piezas por moduleId
route.get("/find-module-and-pieces-by-moduleId/:moduleId", async (req, res) => {
  try {
    const result = await getModuleAndPiecesByModuleId(req.params.moduleId);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Paginado ejemplo: localhost:3000/events/limit-events?page=1&limit=2
route.get("/limit-pieces", (req, res) => {
  let result = limitPieces(req.query.page, req.query.limit);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

route.put("/edit-piece/:pieceId", async (req, res) => {
  try {
    const pieceId = req.params.pieceId;
    const updateFields = req.body;

    let result = await updatePiece(pieceId, updateFields);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default route;
