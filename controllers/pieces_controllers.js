import Pieces from "../models/pieces_models.js";
import Modules from "../models/modules_models.js";

//Se buscan todas las piezas.
async function piecesList() {
  let piece = await Pieces.find();
  return piece;
}

async function createPiece(req) {
  let piece = new Pieces({
    name: req.body.name,
    length: req.body.length,
    width: req.body.width,
    qty: req.body.qty,
    comment: req.body.comment,
    material: req.body.material,
    orientation: req.body.orientation,
    edgeLength: req.body.edgeLength,
    edgeLengthSides: req.body.edgeLengthSides,
    edgeWidth: req.body.edgeWidth,
    edgeWidthSides: req.body.edgeWidthSides,
    lacqueredEdge: req.body.lacqueredEdge,
    polishedEdge: req.body.polishedEdge,
    lacqueredPiece: req.body.lacqueredPiece,
    lacqueredPieceSides: req.body.lacqueredPieceSides,
    veneer: req.body.veneer,
    veneerFinishing: req.body.veneerFinishing,
    veneerLacqueredPieceSides: req.body.veneerLacqueredPieceSides,
    veneerLacqueredOpen: req.body.veneerLacqueredOpen,
    veneer2: req.body.veneer2,
    veneer2Finishing: req.body.veneer2Finishing,
    veneer2LacqueredPieceSides: req.body.veneer2LacqueredPieceSides,
    veneer2LacqueredOpen: req.body.veneer2LacqueredOpen,
    melamine: req.body.melamine,
    melamineLacquered: req.body.melamineLacquered,
    melamineLacqueredPieceSides: req.body.melamineLacqueredPieceSides,
    pantographed: req.body.pantographed,
    loose_piece: req.body.loose_piece,
    module_id: req.body.moduleId,
  });

  return await piece.save();
}

async function updatePiece(pieceId, updateFields) {
  try {
    // console.log(pieceId);
    // Actualizar la pieza con el ID dado y los campos de actualización
    const result = await Pieces.updateOne(
      { _id: pieceId },
      { $set: updateFields }
    );

    // Verificar si se encontró y actualizó la pieza
    if (result.nModified === 0) {
      throw new Error("No se encontró la pieza para actualizar");
    }

    return result;
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
async function findByModuleId(moduleId) {
  try {
    const pieces = await Pieces.find({ module_id: moduleId }).exec();
    return pieces;
  } catch (err) {
    throw err;
  }
}
async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let piece = await Pieces.find({
    name: { $regex: nameInsensitive },
  });
  return piece;
}
async function getModuleAndPiecesByModuleId(moduleId) {
  try {
    const module = await Modules.findById(moduleId).exec(); // Asegúrate de tener el modelo de Modules importado
    if (!module) {
      throw new Error("Module not found");
    }
    const pieces = await Pieces.find({ module_id: moduleId }).exec();
    return { ...module.toObject(), pieces }; // Combina el módulo con las piezas en un solo objeto
  } catch (err) {
    throw err;
  }
}

export {
  piecesList,
  createPiece,
  updatePiece,
  deletePiece,
  findByModuleId,
  getModuleAndPiecesByModuleId,
  findByName,
};
