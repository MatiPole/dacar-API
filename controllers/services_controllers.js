import Services from "../models/services_models.js";

//Se buscan todos los servicio.
async function sirvicesAll() {
  let service = await Services.find();
  return service;
}

//Se buscan todos los servicio.
async function sirvicesList(page = 1, limit = 10, searchTerm = "") {
  const skip = (page - 1) * limit; // Calcula los documentos a omitir

  // Preparamos la consulta de búsqueda
  const query = searchTerm
    ? { name: { $regex: searchTerm, $options: "i" } }
    : {}; // Suponiendo que el campo a buscar se llama 'name'

  const services = await Services.find(query)
    .sort({ name: 1 })
    .skip(skip)
    .limit(limit)
    .lean(); // .lean() para mejorar el rendimiento

  const totalServices = await Services.countDocuments(query); // Total de servicios que coinciden con la búsqueda

  return {
    data: services,
    currentPage: page,
    totalPages: Math.ceil(totalServices / limit),
    totalServices,
  };
}

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
    const service = await Services.findById(id);
    if (service) {
      await Services.deleteOne({ _id: id });
    }
    return service;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar el servicio");
  }
}

async function findByName(name) {
  let service = await Services.find({
    name: { $regex: new RegExp(name, "i") },
  });
  return service;
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
  sirvicesAll,
  sirvicesList,
  createService,
  updateService,
  deleteService,
  findByName,
  serviceById,
};
