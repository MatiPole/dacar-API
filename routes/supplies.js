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
  suppliesEdgesList,
  suppliesVeneerList,
  suppliesExceptTablesList,
  findByName,
  supplieById,
} from "../controllers/supplies_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda de todos los insumos
route.get("/", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page)) || 1; // Aseguramos que sea al menos 1
  const limit = Math.min(Math.max(1, parseInt(req.query.limit)) || 10, 100); // Máximo 100 por ejemplo
  const searchTerm = req.query.search || ""; // Captura el término de búsqueda

  suppliesList(page, limit, searchTerm)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err); // Log del error en el servidor
      res
        .status(500)
        .json({ error: "Ocurrió un error al obtener los insumos." });
    });
});

//traer solo placas
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

//traer solo filos
route.get("/edges", (req, res) => {
  let result = suppliesEdgesList();
  result
    .then((supplie) => {
      res.json(supplie);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//traer solo chapa
route.get("/veneer", (req, res) => {
  let result = suppliesVeneerList();
  result
    .then((supplie) => {
      res.json(supplie);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//traer todo excepto placas y filos
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
    res.status(400).json({ error: err.message || "Error al crear el insumo" });
  }
});

//Eliminar un insumo
route.delete(
  "/:id",
  /* verifyToken, */ (req, res) => {
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
  }
);

//Buscar por nombre los insumos
route.get("/find-by-name/:name", async (req, res) => {
  try {
    let result = await findByName(req.params.name);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
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

route.put("/edit-supplie/:supplieId", async (req, res) => {
  try {
    const updateFields = req.body;
    let result = await updateSupplie(req.params.supplieId, updateFields);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

route.get("/:supplieId", (req, res) => {
  let result = supplieById(req.params.supplieId);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
