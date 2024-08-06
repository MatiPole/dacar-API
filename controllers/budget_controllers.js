import Budgets from "../models/budgets_models.js";

//Se buscan todos los presupuestos.
async function budgetsList() {
  let budget = await Budgets.find();
  return budget;
}

async function createBudget(req) {
  let budget = new Budgets({
    budget_number: req.body.budget_number,
    furniture_name: req.body.furniture_name,
    length: req.body.length,
    width: req.body.width,
    height: req.body.height,
    category: req.body.category,
    furniture: req.body.furniture,
    veneer: req.body.veneer,
    veneerPolished: req.body.veneerPolished,
    chapa: req.body.chapa,
    lacquered: req.body.lacquered,
    pantographed: req.body.pantographed,
    edge_lacquered: req.body.edge_lacquered,
    edge_no_lacquered: req.body.edge_no_lacquered,
    supplies: req.body.supplies,
    material: req.body.material,
    extra_items: req.body.extra_items,
    adjustment_reason: req.body.adjustment_reason,
    adjustment_price: req.body.adjustment_price,
    username: req.body.username,
    total_price: req.body.total_price,
    deliver_date: req.body.deliver_date,
    comments: req.body.comments,
    client: req.body.client,
    status: true,
  });

  return await budget.save();
}

async function updateBudget(supplieId, updateFields) {
  try {
    // console.log(pieceId);
    // Actualizar la pieza con el ID dado y los campos de actualización
    const result = await Budgets.updateOne(
      { _id: supplieId },
      { $set: updateFields }
    );
    // Verificar si se encontró y actualizó el presupuesto
    if (result.nModified === 0) {
      throw new Error("No se encontró el presupuesto para actualizar");
    }
    return result;
  } catch (error) {
    throw error;
  }
}

async function deleteBudget(id) {
  try {
    const budget = await Budgets.findById(id);
    if (budget) {
      await Budgets.deleteOne({ _id: id });
    }
    return budget;
  } catch (err) {
    res.status(400).send(err + "Error al eliminar el presupuesto");
  }
}

async function findByName(name) {
  let nameInsensitive = "(?i)" + name;
  let budget = await Budgets.find({
    name: { $regex: nameInsensitive },
  });
  return budget;
}
async function budgetById(id) {
  try {
    const budget = await Budgets.findById(id);
    return budget;
  } catch (err) {
    throw err;
  }
}

async function getLastBudgetNum() {
  try {
    const budgetLast = await Budgets.findOne()
      .sort({ budget_number: -1 })
      .exec();
    return budgetLast ? budgetLast.budget_number : null; // Devuelve el número de presupuesto o null si no hay presupuestos
  } catch (err) {
    throw err;
  }
}

export {
  budgetsList,
  createBudget,
  updateBudget,
  deleteBudget,
  findByName,
  budgetById,
  getLastBudgetNum,
};
