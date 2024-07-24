import Modules from "../models/modules_models.js";

//Se traen todos los modulos
async function moduleList() {
  let Module = await Modules.find().sort({ name: 1 });
  return Module;
}

async function createModule(req) {
  // console.log(req.body);
  let Module = new Modules({
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    category: req.body.category,
    pieces_number: req.body.pieces_number,
    supplies_module: req.body.supplies_module,
  });

  return await Module.save();
}

async function updateModule(moduleId, updateFields) {
  try {
    // console.log(moduleId);
    // Actualizar el módulo con el ID dado y los campos de actualización
    const result = await Modules.updateOne(
      { _id: moduleId },
      { $set: updateFields }
    );

    // Verificar si se encontró y actualizó el módulo
    if (result.nModified === 0) {
      throw new Error("No se encontró el módulo para actualizar");
    }

    return result;
  } catch (error) {
    throw error;
  }
}

async function deleteModule(id) {
  try {
    const Module = await Modules.findById(id);
    if (Module) {
      await Modules.deleteOne({ _id: id });
    }
    return Module;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar la tabla");
  }
}

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let Module = await Modules.find({
    name: { $regex: nameInsensitive },
  });
  return Module;
}

async function findById(id) {
  try {
    const module = await Modules.findById(id);
    return module;
  } catch (err) {
    throw err;
  }
}

export {
  moduleList,
  createModule,
  updateModule,
  deleteModule,
  findByName,
  findById,
};
