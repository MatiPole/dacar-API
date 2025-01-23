import Furnitures from "../models/furnitures_models.js";

// Se traen todos los muebles
async function furnitureAll() {
  let Furniture = await Furnitures.find()
    .populate("modules_furniture", "name")
    .sort({ name: 1 });
  return Furniture;
}

async function furnitureList(page = 1, limit = 10, searchTerm = "") {
  const skip = (page - 1) * limit; // Calcula los documentos a omitir

  // Preparamos la consulta de búsqueda
  const query = searchTerm
    ? { name: { $regex: searchTerm, $options: "i" } }
    : {}; // Suponiendo que el campo a buscar se llama 'name'

  const furnitures = await Furnitures.find(query)
    .populate("modules_furniture", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean(); // .lean() para mejorar el rendimiento

  const totalFurnitures = await Furnitures.countDocuments(query); // Total de servicios que coinciden con la búsqueda

  return {
    data: furnitures,
    currentPage: page,
    totalPages: Math.ceil(totalFurnitures / limit),
    totalFurnitures,
  };
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

async function updateFurniture(req, res) {
  const { furnitureId } = req.params;
  const updateData = req.body;

  try {
    const updatedFurniture = await Furnitures.findByIdAndUpdate(
      furnitureId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedFurniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }

    return updatedFurniture;
  } catch (error) {
    throw error;
  }
}
//eliminar mueble completo
async function deleteFurniture(id) {
  try {
    const Furniture = await Furnitures.findById(id);
    if (Furniture) {
      await Furnitures.deleteOne({ _id: id });
    }
    return Furniture;
  } catch (err) {
    throw err;
  }
}

async function deleteModuleOnFurniture(furnitureId, moduleId) {
  try {
    // Encuentra el mueble por furnitureId
    const furniture = await Furnitures.findById(furnitureId);
    if (!furniture) {
      throw new Error("Furniture not found");
    }
    // Encuentra el índice del módulo con el moduleId correspondiente
    const moduleIndex = furniture.modules_furniture.findIndex(
      (module) => module._id.toString() === moduleId
    );

    // Si se encuentra el módulo, elimínalo del array
    if (moduleIndex !== -1) {
      furniture.modules_furniture.splice(moduleIndex, 1);
    } else {
      throw new Error("Module not found");
    }

    // Guarda el mueble actualizado en la base de datos
    await furniture.save();

    return furniture;
  } catch (err) {
    throw err;
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

// Función para actualizar un módulo específico dentro de un mueble
async function updateModuleOfFurniture(req, res) {
  try {
    const { furnitureId, moduleId } = req.params;
    const updatedModule = req.body;
    // Buscar el mueble por su ID
    let furniture = await Furnitures.findById(furnitureId);
    if (!furniture) {
      return res.status(404).json({ message: "Furniture not found" });
    }

    // Encontrar el índice del módulo dentro de modules_furniture
    const moduleIndex = furniture.modules_furniture.findIndex(
      (mod) => mod._id.toString() === moduleId.toString()
    );

    if (moduleIndex > -1) {
      // Reemplazar el módulo encontrado con los datos actualizados
      furniture.modules_furniture[moduleIndex] = {
        ...furniture.modules_furniture[moduleIndex],
        ...updatedModule,
      };

      // Guardar los cambios en la base de datos
      await furniture.save();

      return furniture;
    } else {
      return res.status(404).json({ message: "Module not found in furniture" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

//obtener las piezas sueltas para el excel
const getLoosePiecesByFurnitureId = async (furnitureId) => {
  try {
    // Encuentra el mueble por su ID y trae los módulos relacionados
    const furniture = await Furnitures.findById(furnitureId);

    if (!furniture) {
      throw new Error("Mueble no encontrado");
    }

    // Mapea los módulos con sus detalles y piezas sueltas si existen
    const modulesWithLoosePieces = furniture.modules_furniture.map((module) => {
      // Filtra las piezas sueltas en el módulo
      const loosePieces = module.pieces.filter((piece) => piece.loose_piece);

      // Retorna un objeto con los detalles del módulo y las piezas sueltas
      return {
        moduleName: module.name,
        moduleLength: module.length,
        moduleWidth: module.width,
        moduleHeight: module.height,
        loosePieces, // Incluye las piezas sueltas asociadas al módulo
      };
    });

    return modulesWithLoosePieces;
  } catch (error) {
    throw new Error(
      "Error al obtener los módulos y piezas sueltas: " + error.message
    );
  }
};

// Función para obtener todas las piezas de un mueble
async function getAllPiecesByFurnitureId(furnitureId) {
  try {
    // Obtener el mueble por su ID
    const furniture = await Furnitures.findById(furnitureId).populate(
      "modules_furniture.pieces"
    );

    if (!furniture) {
      throw new Error("Mueble no encontrado");
    }

    // Extraer todas las piezas de todos los módulos
    let allPieces = [];
    furniture.modules_furniture.forEach((module) => {
      allPieces = allPieces.concat(module.pieces);
    });

    return allPieces;
  } catch (error) {
    console.error("Error al obtener todas las piezas:", error);
    throw error;
  }
}

export {
  furnitureAll,
  furnitureList,
  createFurniture,
  updateFurniture,
  updateModuleOfFurniture,
  deleteFurniture,
  deleteModuleOnFurniture,
  findByName,
  findById,
  getLoosePiecesByFurnitureId,
  getAllPiecesByFurnitureId,
};
