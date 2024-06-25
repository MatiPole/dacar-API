import Supplies from "../models/supplies_models.js";

//Se buscan todas los insumos.
async function suppliesList() {
  let supplie = await Supplies.find();
  return supplie;
}

//Se buscan todas las placas.
async function suppliesTablesList() {
  let supplie = await Supplies.find({ category: "PLACA" });
  return supplie;
}

//Se buscan todos insumos menos las placas.
const suppliesExceptTablesList = async () => {
  try {
    return await Supplies.find({ category: { $ne: "PLACA" } });
  } catch (error) {
    console.error("Error fetching supplies:", error);
    throw error;
  }
};

async function createSupplie(req) {
  let supplie = new Supplies({
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    thickness: req.body.thickness,
    category: req.body.category,
    material: req.body.material,
    price: req.body.price,
    supplier_id: 1,
    status: true,
  });

  return await supplie.save();
}

async function updateSupplie(req, id) {
  try {
    let updateFields = {};
    // Agregar campos no nulos a updateFields
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.length) updateFields.length = req.body.length;
    if (req.body.width) updateFields.width = req.body.width;
    if (req.body.thickness) updateFields.thickness = req.body.thickness;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.material) updateFields.material = req.body.material;

    let supplie = await Supplies.updateOne({ _id: id }, { $set: updateFields });
    return supplie;
  } catch (error) {
    throw error;
  }
}

async function deleteSupplie(id) {
  try {
    const supplie = await Supplies.findById(id);
    if (supplie) {
      await Supplies.deleteOne({ _id: id });
    }
    return supplie;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar la tabla");
  }
}

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let supplie = await Supplies.find({
    name: { $regex: nameInsensitive },
  });
  return supplie;
}

export {
  suppliesList,
  createSupplie,
  updateSupplie,
  deleteSupplie,
  suppliesTablesList,
  suppliesExceptTablesList,
  findByName,
};
