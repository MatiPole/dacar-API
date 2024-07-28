import SuppliesCategories from "../models/supplies_categories_models.js";

async function categoriesList() {
  let category = await SuppliesCategories.find({ status: true }).sort({
    name: 1,
  });
  return category;
}

async function findCategory(id) {
  let category = await SuppliesCategories.find({ _id: id });
  return category;
}

async function createCategory(body) {
  console.log(body.name);
  let category = new SuppliesCategories({
    name: body.name,
    status: body.status,
  });
  return await category.save();
}

async function updateSuppliesCategories(body, id) {
  let category = await SuppliesCategories.updateOne(
    { _id: id },
    {
      $set: {
        name: body.name,
        status: body.status,
      },
    }
  );
  return category;
}

async function deleteCategory(id) {
  let category = await SuppliesCategories.deleteOne({ _id: id });
  return category;
}

export {
  categoriesList,
  findCategory,
  createCategory,
  updateSuppliesCategories,
  deleteCategory,
};
