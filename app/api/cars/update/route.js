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
console.log("ACA ESTA EL CAAAAAARRR", car)
  const [updatedRows] =  await db.cars.update(
    {
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
      images: car.images,
      price: car.price,
      status: car.status,
      deleted: car.deleted,
      partial_price: car.partial_price,
    },
    {
      where: {
        id: car.id,
      },
    }
  );

  if (updatedRows) {

    return NextResponse.json({ success: true, message: `Vehiculo actualizado: ${updatedRows}`}, {status: 200})
    
  } else {

    return NextResponse.json({ success: false, message: "Vehiculo no encontrado"}, {status: 404})
  }
}