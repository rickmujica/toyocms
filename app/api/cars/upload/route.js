import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import sequelize from "@/database/config/connect";
import initModels from "@/database/models/init-models";
const db = initModels(sequelize);

export async function POST(request) {

  const data = await request.formData();

  const image = data.get("image");
  const carId = data.get("carId");
  const carImages = data.get("carImages");

  const parsedCarImages = JSON.parse(carImages)

  if (!image) {
    return NextResponse.json("no se ha subido ninguna imagen", { status: 400 });
  }

  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //guardar en un archivo
  const filePath = path.join(process.cwd(), "public/images/fotos", image.name);
  const publicIndex = filePath.indexOf("public/");
  const imgRelativePath = filePath.substring(publicIndex + "public/".length);

  await writeFile(filePath, buffer);


  const updatedImages = [
      ...parsedCarImages, {
        name: imgRelativePath,
        usrName: image.name,
        size: image.size,
        type: image.type,
        thumbnail: "",
        thumbnail_type: "",
        thumbnail_size: 0,
        searchStr: ""
      }
    ];

    // console.log("ACA VIENE updatedImages", updatedImages)

  // actualizar la el campo imagenes en la base datos
  const [updatedRows] =  await db.cars.update(
    {
     
      images: JSON.stringify(updatedImages),
  
    },
    {
      where: {
        id: carId,
      },
    }
  );


  if (updatedRows) {

    return NextResponse.json({
      status: 200,
      msg: `Imagen subida, Vehiculo actualizado: ${updatedRows}`,
    });
    
  } else {

    return NextResponse.json({status: 404, msg: "No se subio nueva imagen"})
  }
}

  export async function DELETE(request) {
   
    const data = await request.formData();

    const imageName = data.get("imageName");
    const carId = data.get("carId");
    const carImages = data.get("images");
  
    try {
      const car = await db.cars.findByPk(carId);
  
      if (!car) {
        return NextResponse.json({ status: 404, msg: "Vehículo no encontrado" });
      }
  
      const carImagesParsed = JSON.parse(carImages);
  
      const updatedImages = carImagesParsed.filter((image) => image.name !== imageName);
  
      await db.cars.update(
        {
          images: JSON.stringify(updatedImages),
        },
        {
          where: {
            id: carId,
          },
        }
      );
      // Eliminar el archivo de la imagen
      try {
        const imagePath = path.join(process.cwd(), "public/", imageName);
        await unlink(imagePath);
      } catch (error) {
        console.error("Error al eliminar la imagen", error);
        return NextResponse.json({ status: 500, msg: "Error al eliminar la imagen", error: String(error) });
      }
      
  
      return NextResponse.json({ status: 200, msg: "Imagen eliminada" });
    } catch (error) {
      console.error("ACA ESTA EL ERROR", error);
      return NextResponse.json({ status: 500, msg: "Error al eliminar la imagen", error: String(error) });
    }
  }
