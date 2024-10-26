import Budgets from "../models/budgets_models.js";

//Se buscan todos los presupuestos.
async function budgetsList(page = 1, limit = 10, searchTerm = "") {
  const skip = (page - 1) * limit; // Calcula los documentos a omitir

  // Preparamos la consulta de búsqueda
  const query = {
    status: true, // Solo documentos con status en true
    ...(searchTerm
      ? {
          client: {
            $elemMatch: {
              $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { lastname: { $regex: searchTerm, $options: "i" } },
              ],
            },
          },
        }
      : {}),
  };
  const budgets = await Budgets.find(query)
    .sort({ budget_number: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // .lean() para mejorar el rendimiento

  const totalBudgets = await Budgets.countDocuments(query); // Total de servicios que coinciden con la búsqueda

  return {
    data: budgets,
    currentPage: page,
    totalPages: Math.ceil(totalBudgets / limit),
    totalBudgets,
  };
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
    lacqueredOpen: req.body.lacqueredOpen,
    lacquered: req.body.lacquered,
    pantographed: req.body.pantographed,
    edge_lacquered: req.body.edge_lacquered,
    edge_polished: req.body.edge_polished,
    edge_no_lacquered: req.body.edge_no_lacquered,
    supplies: req.body.supplies,
    materials: req.body.materials,
    extra_items: req.body.extra_items,
    adjustment_reason: req.body.adjustment_reason,
    adjustment_price: req.body.adjustment_price,
    username: req.body.username,
    total_price: req.body.total_price,
    deliver_date: req.body.deliver_date,
    comments: req.body.comments,
    client: req.body.client,
    placement: req.body.placement,
    placement_price: req.body.placement_price,
    placement_days: req.body.placement_days,
    shipment: req.body.shipment,
    shipment_price: req.body.shipment_price,
    show_modules: req.body.show_modules,
    status: true,
  });

  return await budget.save();
}

async function updateBudget(budgetId, updateFields) {
  try {
    // Busca y actualiza el presupuesto por su ID, usando los campos proporcionados
    const updatedBudget = await Budgets.findByIdAndUpdate(
      budgetId,
      { $set: updateFields }, // Actualiza solo los campos proporcionados
      { new: true, runValidators: true } // Retorna el documento actualizado y valida los campos
    );

    if (!updatedBudget) {
      throw new Error("Presupuesto no encontrado");
    }

    return updatedBudget;
  } catch (error) {
    console.error("Error actualizando presupuesto API:", error);
    throw new Error("Error actualizando presupuesto", error);
  }
}

async function deleteBudget(budgetId) {
  try {
    // Buscar el presupuesto por ID
    const budget = await Budgets.findById(budgetId);

    if (budget) {
      // Actualizar el campo status a "deleted" en lugar de eliminar
      await Budgets.updateOne(
        { _id: budgetId },
        { $set: { status: "deleted" } }
      );
    }

    return budget;
  } catch (err) {
    // Enviar error con el mensaje adecuado
    res.status(400).send(err + "Error al cambiar el estado del presupuesto");
  }
}

async function findByClientName(searchTerm) {
  let searchRegex = new RegExp(searchTerm, "i"); // Expresión regular insensible a mayúsculas/minúsculas
  let budgets = await Budgets.find({
    $or: [
      { "client.name": { $regex: searchRegex } },
      { "client.lastname": { $regex: searchRegex } },
    ],
  });
  return budgets;
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
  findByClientName,
  budgetById,
  getLastBudgetNum,
};
