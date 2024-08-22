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

async function updateClient(clientId, updateFields) {
  try {
    const result = await Clients.updateOne(
      { _id: clientId },
      { $set: updateFields }
    );
    // Verificar si se encontró y actualizó el cliente
    if (result.nModified === 0) {
      throw new Error("No se encontró el cliente para actualizar");
    }
    return result;
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
  let client = await Clients.find({
    $or: [
      { name: { $regex: new RegExp(name, "i") } },
      { lastname: { $regex: new RegExp(name, "i") } },
    ],
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
