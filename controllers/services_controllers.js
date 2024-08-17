import Services from "../models/services_models.js";

//Se buscan todas los insumos.
async function sirvicesList() {
  let service = await Services.find();
  return service;
}

//Se buscan todas las placas.
async function suppliesTablesList() {
  let service = await Services.find({ category: "PLACA" });
  return service;
}

//Se buscan todos insumos menos las placas.
const suppliesExceptTablesList = async () => {
  try {
    return await Services.find({ category: { $ne: "PLACA" } });
  } catch (error) {
    console.error("Error fetching supplies:", error);
    throw error;
  }
};

async function createService(req) {
  let service = new Services({
    name: req.body.name,
    price: req.body.price,
    status: true,
  });

  return await service.save();
}

async function updateService(serviceId, updateFields) {
  try {
    // console.log(pieceId);
    // Actualizar la pieza con el ID dado y los campos de actualización
    const result = await Services.updateOne(
      { _id: serviceId },
      { $set: updateFields }
    );
    // Verificar si se encontró y actualizó el insumo
    if (result.nModified === 0) {
      throw new Error("No se encontró el insumo para actualizar");
    }
    return result;
  } catch (error) {
    throw error;
  }
}

async function deleteService(id) {
  try {
    const supplie = await Services.findById(id);
    if (supplie) {
      await Services.deleteOne({ _id: id });
    }
    return supplie;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar el servicio");
  }
}

async function findByName(name) {
  let supplie = await Services.find({
    name: { $regex: new RegExp(name, "i") },
  });
  return supplie;
}

async function serviceById(serviceId) {
  try {
    const service = await Services.findById(serviceId);
    return service;
  } catch (err) {
    throw err;
  }
}

export {
  sirvicesList,
  createService,
  updateService,
  deleteService,
  suppliesTablesList,
  suppliesExceptTablesList,
  findByName,
  serviceById,
};
