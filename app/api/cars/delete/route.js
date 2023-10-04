import { unlink } from "fs/promises";
import path from "path";
import sequelize from "@/database/config/connect";
import initModels from "@/database/models/init-models";
import { NextResponse } from "next/server";

const db = initModels(sequelize);

export async function DELETE(req, res) {
  // Leer el cuerpo de la solicitud como un ReadableStream
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf8");

  // Analizar el cuerpo de la solicitud como JSON
  const car = JSON.parse(body);
  
// Obtener el listado de imágenes y eliminarlas para cada ID de vehículo
for (const carId of car) {
  const carImages = await db.cars.findByPk(carId);
  
  // Verificar si carImages.images es null
  if (carImages.images) {
    
    // Eliminar cada imagen del vehículo
    for (const image of carImages.images) {
      const imagePath = path.join(process.cwd(), "public", image.name);
      await unlink(imagePath);
    }
  }
}

  try {
    const deletedCar = await db.cars.destroy({
      where: {
        id: car,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Vehiculo con id ${car} eliminado existosamente !`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error eliminando vehiculor", error: error },
      { status: 500 }
    );
  }
}
