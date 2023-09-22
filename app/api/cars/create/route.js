import sequelize from "@/database/config/connect";
import initModels from "@/database/models/init-models";
import { NextResponse } from "next/server";

const db = initModels(sequelize);

export async function POST(req, res) {
  // Leer el cuerpo de la solicitud como un ReadableStream
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString('utf8');

  // Analizar el cuerpo de la solicitud como JSON
  const car = JSON.parse(body);

  //      images: car.images, SE DEBE AGREGAR
  try {
    
    const createdCar = await db.cars.create({
      name: car.name,
      year: car.year,
      seats: car.seats,
      fuel: car.fuel,
      transmision: car.transmision,
      kilometers: car.kilometers,
      plate: car.plate,
      category_id: car.category_id,
      brand_id: car.brand_id,
      color_id: car.color_id,
      location_id: car.location_id,
      price: car.price,
      status: car.status,
      deleted: car.deleted,
      partial_price: car.partial_price,
    });

    const createdCarId = createdCar.id;

    return NextResponse.json({ success: true, data: { id: createdCarId } }, { status: 200 });
    
  } catch (error) { 
    console.error(error);
    return NextResponse.json({ success: false, message: "Error creating car", error: error }, { status: 500 });
  }
}