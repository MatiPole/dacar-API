import express from "express";
import verifyToken from "../middlewares/auth.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import {
  budgetsList,
  createBudget,
  updateBudget,
  deleteBudget,
  findByClientName,
  budgetById,
  getLastBudgetNum,
} from "../controllers/budget_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda eventos para adminsitrador
route.get("/", (req, res) => {
  let result = budgetsList();
  result
    .then((budget) => {
      res.json(budget);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

//traer el ultimo numero de presupuesto
route.get("/last-number", async (req, res) => {
  try {
    const lastNumber = await getLastBudgetNum();
    res.json({ budget_number: lastNumber });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

route.get("/find-by-id/:budgetId", (req, res) => {
  let result = budgetById(req.params.budgetId);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//Crear presupuesto
route.post("/", async (req, res) => {
  try {
    const budget = await createBudget(req);
    res.json({ budget });
  } catch (err) {
    res
      .status(400)
      .json({ error: err.message || "Error al crear el presupuesto" });
  }
});

//Buscar presupuesto por nombre de cliente
route.get("/find-by-client-name/:name", async (req, res) => {
  try {
    let result = await findByClientName(req.params.name);
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Eliminar un presupuesto
route.patch(
  "/delete-budget/:budgetId",
  /* verifyToken, */ (req, res) => {
    let result = deleteBudget(req.params.budgetId);
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

export default route;
