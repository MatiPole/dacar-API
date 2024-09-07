import Modules from "../models/modules_models.js";
import Pieces from "../models/pieces_models.js";

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
    material: req.body.material,
    pieces_number: req.body.pieces_number,
    supplies_module: req.body.supplies_module,
  });

  return await Module.save();
}

async function cloneModule(moduleId) {
  // Buscar el módulo original por su ID
  const originalModule = await Modules.findById(moduleId);

  if (!originalModule) {
    throw new Error("Módulo no encontrado");
  }

  // Duplicar el módulo, excluyendo el _id para que se genere uno nuevo
  const clonedModule = new Modules({
    ...originalModule.toObject(),
    _id: undefined, // Para que MongoDB genere un nuevo ObjectId
    name: `${originalModule.name} (copia)`,
    createdAt: new Date(), // Actualizar la fecha de creación
    updatedAt: new Date(), // Actualizar la fecha de actualización
  });

  // Guardar el módulo duplicado en la base de datos
  const newModule = await clonedModule.save();

  // Buscar todas las piezas relacionadas con el módulo original
  const originalPieces = await Pieces.find({ module_id: moduleId });

  // Duplicar cada pieza y asignarle el nuevo module_id
  const clonedPieces = originalPieces.map((piece) => {
    const newPiece = new Pieces({
      ...piece.toObject(),
      _id: undefined, // Generar un nuevo ObjectId para cada pieza
      module_id: newModule._id, // Asignar el nuevo module_id
      createdAt: new Date(), // Actualizar la fecha de creación
      updatedAt: new Date(), // Actualizar la fecha de actualización
    });
    return newPiece.save(); // Guardar cada pieza duplicada
  });

  // Esperar a que todas las piezas se guarden
  await Promise.all(clonedPieces);

  return newModule; // Retornar el nuevo módulo duplicado
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

async function updateModulePiecesNumber(moduleId, piecesNumber) {
  try {
    const updatedModule = await Modules.findByIdAndUpdate(moduleId, {
      pieces_number: piecesNumber,
    });

    if (!updatedModule) {
      throw new Error("Módulo no encontrado");
    }

    return updatedModule;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteModule(moduleId) {
  try {
    // Eliminar el módulo con el ID proporcionado
    const deletedModule = await Modules.findByIdAndDelete(moduleId);

    if (!deletedModule) {
      throw new Error("Módulo no encontrado");
    }

    // Eliminar todas las piezas asociadas al módulo
    await Pieces.deleteMany({ module_id: moduleId });

    return { message: "Módulo y piezas eliminados correctamente" };
  } catch (err) {
    throw new Error(err.message || "Error al eliminar el módulo y sus piezas");
  }
}

async function findByName(name) {
  let supplie = await Modules.find({
    name: { $regex: new RegExp(name, "i") },
  });
  return supplie;
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
  cloneModule,
  updateModule,
  updateModulePiecesNumber,
  deleteModule,
  findByName,
  findById,
};
