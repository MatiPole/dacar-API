import Clients from "../models/clients_models.js";

//Se buscan todas las tablas.
async function clientsList() {
  let client = await Clients.find();
  return client;
}

async function createClient(req) {
  let client = new Clients({
    name: req.body.name,
    lastname: req.body.lastname,
    phone: req.body.phone,
    address: req.body.address,
    dni: req.body.dni,
    cuil_cuit: req.body.cuil_cuit,
    email: req.body.email,
    client_type: req.body.client_type,
    tag: req.body.tag,
    status: true,
  });

  return await client.save();
}

async function updateClient(req, id) {
  try {
    let updateFields = {};
    // Agregar campos no nulos a updateFields
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.length) updateFields.length = req.body.length;
    if (req.body.width) updateFields.width = req.body.width;
    if (req.body.thickness) updateFields.thickness = req.body.thickness;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.material) updateFields.material = req.body.material;

    let client = await Clients.updateOne({ _id: id }, { $set: updateFields });
    return client;
  } catch (error) {
    throw error;
  }
}

async function deleteClient(id) {
  try {
    const client = await Clients.findById(id);
    if (client) {
      await Clients.deleteOne({ _id: id });
    }
    return client;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar el cliente");
  }
}

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let client = await Clients.find({
    name: { $regex: nameInsensitive },
  });
  return client;
}
async function clientById(id) {
  try {
    const client = await Clients.findById(id);
    return client;
  } catch (err) {
    throw err;
  }
}

export {
  clientsList,
  createClient,
  updateClient,
  deleteClient,
  findByName,
  clientById,
};
