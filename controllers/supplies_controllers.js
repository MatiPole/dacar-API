import Supplies from "../models/supplies_models.js";

//Se buscan todas los insumos.
async function suppliesList() {
  let supplie = await Supplies.find();
  return supplie;
}

//Se buscan todas las placas.
async function suppliesTablesList() {
  let supplie = await Supplies.find({ category: "Placa" });
  return supplie;
}

//Se buscan todos los filos.
async function suppliesEdgesList() {
  let supplie = await Supplies.find({ category: "Filo" });
  return supplie;
}

//Se buscan todos las chapa.
async function suppliesVeneerList() {
  let supplie = await Supplies.find({ category: "Chapa" });
  return supplie;
}

//Se buscan todos insumos menos las placas, ni filos, ni chapa.
const suppliesExceptTablesList = async () => {
  try {
    return await Supplies.find({
      category: { $nin: ["Placa", "Filo", "Chapa"] },
    });
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

async function updateSupplie(supplieId, updateFields) {
  try {
    // console.log(pieceId);
    // Actualizar la pieza con el ID dado y los campos de actualización
    const result = await Supplies.updateOne(
      { _id: supplieId },
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

async function deleteSupplie(id) {
  try {
    const supplie = await Supplies.findById(id);
    if (supplie) {
      await Supplies.deleteOne({ _id: id });
    }
    return supplie;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar el insumo");
  }
}

async function findByName(name) {
  let supplie = await Supplies.find({
    name: { $regex: new RegExp(name, "i") },
  });
  return supplie;
}

async function supplieById(id) {
  try {
    const supplie = await Supplies.findById(id);
    return supplie;
  } catch (err) {
    throw err;
  }
}

export {
  suppliesList,
  createSupplie,
  updateSupplie,
  deleteSupplie,
  suppliesTablesList,
  suppliesEdgesList,
  suppliesVeneerList,
  suppliesExceptTablesList,
  findByName,
  supplieById,
};
