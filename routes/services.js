import express from "express";
import verifyToken from "../middlewares/auth.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";
import {
  sirvicesList,
  createService,
  updateService,
  deleteService,
  suppliesTablesList,
  suppliesExceptTablesList,
  findByName,
  serviceById,
} from "../controllers/services_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda eventos para adminsitrador
route.get("/", (req, res) => {
  let result = sirvicesList();
  result
    .then((service) => {
      res.json(service);
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

//Crear servicio
route.post("/", async (req, res) => {
  try {
    const service = await createService(req);
    res.json({ service });
  } catch (err) {
    res.status(400).json({ error: err.message || "Error al crear servicio" });
  }
});

//Eliminar un insumo
route.delete(
  "/:id",
  /* verifyToken, */ (req, res) => {
    let result = deleteService(req.params.id);
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

//Buscar por nombre los servicios
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

route.put("/edit-service/:serviceId", async (req, res) => {
  try {
    const updateFields = req.body;
    let result = await updateService(req.params.serviceId, updateFields);

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

route.get("/:serviceId", (req, res) => {
  let result = serviceById(req.params.serviceId);
  result
    .then((value) => {
      res.json(value);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

export default route;
