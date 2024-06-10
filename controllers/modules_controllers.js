import Modules from "../models/modules_models.js";

//Se buscan todas las bandas con status true.
async function moduleList() {
  let Module = await Modules.find({ status: true });
  return Module;
}

async function createModule(req) {
  let Module = new Modules({
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    category: req.body.category,
    pieces_number: req.body.pieces_number,
  });

  return await Modules.save();
}

async function updateModule(req, id) {
  try {
    let updateFields = {};
    // Agregar campos no nulos a updateFields
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.length) updateFields.length = req.body.length;
    if (req.body.width) updateFields.width = req.body.width;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.pieces_number)
      updateFields.pieces_number = req.body.pieces_number;

    let Module = await Modules.updateOne({ _id: id }, { $set: updateFields });
    return Module;
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

export { moduleList, createModule, updateModule, deleteModule, findByName };
