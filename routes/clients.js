import express from "express";
import verifyToken from "../middlewares/auth.js";
import {
  clientsAll,
  clientsList,
  createClient,
  updateClient,
  deleteClient,
  findByName,
  clientById,
} from "../controllers/clients_controllers.js";

const route = express.Router();

//En todas las rutas aplicamos autenticación por medio de nuestro middleware verifyToken
//Búsqueda todos los clientes
route.get("/", (req, res) => {
  let result = clientsAll();
  result
    .then((client) => {
      res.json(client);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

route.get("/list", (req, res) => {
  const page = Math.max(1, parseInt(req.query.page)) || 1; // Aseguramos que sea al menos 1
  const limit = Math.min(Math.max(1, parseInt(req.query.limit)) || 10, 100); // Máximo 100 por ejemplo
  const searchTerm = req.query.search || ""; // Captura el término de búsqueda

  clientsList(page, limit, searchTerm)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err); // Log del error en el servidor
      res
        .status(500)
        .json({ error: "Ocurrió un error al obtener los clientes." });
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
