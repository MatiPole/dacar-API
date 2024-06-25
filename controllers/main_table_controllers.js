import MainTable from "../models/main_table_models.js";

//Se buscan todas las tablas.
async function mainTableList() {
  let table = await MainTable.find();
  return table;
}

async function createMainTable(req) {
  let table = new MainTable({
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    thickness: req.body.thickness,
    category: req.body.category,
    material: req.body.material,
  });

  return await table.save();
}

async function updateMainTable(req, id) {
  try {
    let updateFields = {};
    // Agregar campos no nulos a updateFields
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.length) updateFields.length = req.body.length;
    if (req.body.width) updateFields.width = req.body.width;
    if (req.body.thickness) updateFields.thickness = req.body.thickness;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.material) updateFields.material = req.body.material;

    let table = await MainTable.updateOne({ _id: id }, { $set: updateFields });
    return table;
  } catch (error) {
    throw error;
  }
}

async function deleteMainTable(id) {
  try {
    const table = await MainTable.findById(id);
    if (table) {
      await MainTable.deleteOne({ _id: id });
    }
    return table;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar la tabla");
  }
}

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let table = await MainTable.find({
    name: { $regex: nameInsensitive },
  });
  return table;
}

export {
  mainTableList,
  createMainTable,
  updateMainTable,
  deleteMainTable,
  findByName,
};
