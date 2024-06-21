import Furnitures from "../models/furnitures_models.js";

//Se traen todos los muebles
async function furnitureList() {
  let Furniture = await Furnitures.find()
    .populate("modules_furniture", "name")
    .sort({ name: 1 });
  return Furniture;
}

async function createFurniture(req, res) {
  try {
    let Furniture = new Furnitures({
      name: req.body.name,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      category: req.body.category,
      modules_furniture: req.body.modules_furniture,
    });

    const savedFurniture = await Furniture.save();
    return savedFurniture;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

async function updateFurniture(req, id) {
  try {
    let updateFields = {};
    // Agregar campos no nulos a updateFields
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.length) updateFields.length = req.body.length;
    if (req.body.width) updateFields.width = req.body.width;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.pieces_number)
      updateFields.pieces_number = req.body.pieces_number;

    let Furniture = await Furnitures.updateOne(
      { _id: id },
      { $set: updateFields }
    );
    return Furniture;
  } catch (error) {
    throw error;
  }
}

async function deleteFurniture(id) {
  try {
    const Furniture = await Furnitures.findById(id);
    if (Furniture) {
      await Furnitures.deleteOne({ _id: id });
    }
    return Furniture;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar la tabla");
  }
}

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let Furniture = await Furnitures.find({
    name: { $regex: nameInsensitive },
  });
  return Furniture;
}

async function findById(id) {
  try {
    const furniture = await Furnitures.findById(id);
    return furniture;
  } catch (err) {
    throw err;
  }
}

export {
  furnitureList,
  createFurniture,
  updateFurniture,
  deleteFurniture,
  findByName,
  findById,
};
