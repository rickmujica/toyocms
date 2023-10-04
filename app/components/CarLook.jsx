import Link from "next/link";
import sequelize from "@/database/config/connect";
import initModels from "@/database/models/init-models";
// import ContactForm from "@/app/components/ContactForm"
// import LocationMap from "@/app/components/LocationMap"
// import RelatedCars from './RelatedCars';
// import Gallery from './Gallery';
import Image from "next/image";
import ImgListLook from "./ImgListLook";
import { Box, Typography } from "@mui/material";

export default async function CarLook({ id }) {
  // const id = JSON.parse(params.id);
  const db = initModels(sequelize);

  const car = await db.cars.findOne({
    where: { id: id },
    include: ["brand", "color", "category", "location"],
  });

  const kms = Intl.NumberFormat("es-PY", { style: "decimal" }).format(
    car.kilometers
  );
  const price = Intl.NumberFormat("es-PY", { style: "decimal" }).format(
    car.price
  );
  // const imgSrc = car.images ? process.env.NEXT_PUBLIC_PATH_IMG + car.images[0].thumbnail : '/img/noimage.jpg';

  return (
    <Box>
      {/* <h3 className='mb-5'>{car.name}</h3> */}
      <Typography align="center" mb={4} variant="h3" color="crimson">
        {car.name}
      </Typography>
      <Typography mb={2} variant="h5">
        Especificaciones
      </Typography>

      <div className="row py-4">

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Tipo de vehiculo
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.category.name}
        </Typography>
        </div>

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Marca
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.brand.name}
        </Typography>
        </div>

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Combustible
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.fuel || "No disponible"}
        </Typography>
        </div>

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Transmisión
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.transmision}
        </Typography>
        </div>

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Chapa
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.plate}
        </Typography>
        </div>

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Pasajeros
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.seats}
        </Typography>
        </div>

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Color
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.color.name}
        </Typography>
        </div>

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Sede
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.location.name}
        </Typography>
        </div>
        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Kilometraje
        </Typography>
        <Typography variant="h6" mb={2}>
           {kms}
        </Typography>
        </div>

        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Año
        </Typography>
        <Typography variant="h6" mb={2}>
           {car.year}
        </Typography>
        </div>
        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Precio
        </Typography>
        <Typography variant="h6" mb={2}>
           $ {price}
        </Typography>
        </div>
        <div className="col-6 col-md-3">
        <Typography variant="body1" mb={2} color="crimson">
          Cuota
        </Typography>
        <Typography variant="h6" mb={2}>
           $ {car.partial_price}
        </Typography>
        </div>
      </div>

      {car?.images?.length > 0 ? (
        <Box>
          <Typography variant="h6">Fotos</Typography>
          <ImgListLook images={JSON.stringify(car?.images)} />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
