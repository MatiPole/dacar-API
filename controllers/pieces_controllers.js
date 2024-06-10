import Pieces from "../models/pieces_models.js";

//Se buscan todas las bandas con status true.
async function piecesList() {
  let piece = await Pieces.find({ status: true });
  return piece;
}

async function createPiece(req) {
  let piece = new Piece({
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    category: req.body.category,
    material: req.body.material,
    edge: req.body.edge,
  });

  return await piece.save();
}

async function updatePiece(req, id) {
  try {
    let updateFields = {};

    // Agregar campos no nulos a updateFields
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.length) updateFields.length = req.body.length;
    if (req.body.width) updateFields.width = req.body.width;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.material) updateFields.material = req.body.material;
    if (req.body.edge) updateFields.edge = req.body.edge;

    let piece = await Pieces.updateOne({ _id: id }, { $set: updateFields });
    return piece;
  } catch (error) {
    throw error;
  }
}

async function deletePiece(id) {
  try {
    const piece = await Pieces.findById(id);
    if (piece) {
      await Pieces.deleteOne({ _id: id });
    }
    return piece;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar la pieza");
  }
}

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let piece = await Pieces.find({
    name: { $regex: nameInsensitive },
  });
  return piece;
}

export { piecesList, createPiece, updatePiece, deletePiece, findByName };
