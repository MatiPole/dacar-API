import express from "express";
import verifyToken from "../middlewares/auth.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import {
  categoriesList,
  findCategory,
  createCategory,
  updateSuppliesCategories,
  deleteCategory,
} from "../controllers/supplies_categories_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda eventos para adminsitrador
route.get("/", (req, res) => {
  let result = categoriesList();
  result
    .then((category) => {
      res.json(category);
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

//Crear categoria
route.post("/", async (req, res) => {
  try {
    const category = await createCategory(req.body);
    res.json({ category });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Error al crear la categoria" });
  }
});

//Eliminar un insumo
route.delete(
  "/:id",
  /* verifyToken, */ (req, res) => {
    let result = deleteCategory(req.params.id);
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
  let result = findCategory(req.params.supplieId);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
