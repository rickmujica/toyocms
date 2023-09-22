import Link from 'next/link';
import sequelize from '@/database/config/connect'
import initModels from '@/database/models/init-models'
import { Op } from "sequelize";
// import ContactForm from "@/app/components/ContactForm"
// import LocationMap from "@/app/components/LocationMap"
// import RelatedCars from './RelatedCars';
// import Gallery from './Gallery';
import Image from 'next/image';
import Box from '@mui/material/Box';
import CarEditForm from '@/app/components/CarEditForm';


export default async function CarEdit({ id }) {
    
    let idCar = parseInt(id);
    const db = initModels(sequelize);

  /** datos del auto */
  const car = await db.cars.findOne({
    where: { id: idCar },
    include: ['brand', 'color', 'category', 'location'],
  });

  /** obtener valores enum de combustible */
  let fuels = db.cars.getAttributes('fuel')
  let fuelValues = fuels.fuel.values

  /** datos del auto */
  let transmisions = db.cars.getAttributes('transmision')
  let transmisionValues = transmisions.transmision.values

  /** datos del auto */
  let status = db.cars.getAttributes('status')
  let statusValues = status.status.values

  /** marcas */
  const brands = await db.brands.findAll({
    order: [["name", "ASC"]],
  });

  /** colores */
  const colors = await db.colors.findAll({
    order: [["name", "ASC"]],
  });

  /** sedes */
  const locations = await db.locations.findAll({
    order: [["name", "ASC"]],
  });

  /** categorias */
  const categories = await db.categories.findAll({
    order: [["name", "ASC"]],
  });


  // const kms = Intl.NumberFormat('es-PY', { style: 'decimal'}).format(car.kilometers);
  // const price = Intl.NumberFormat('es-PY', { style: 'decimal'}).format(car.price);
  // const imgSrc = car.images ? process.env.NEXT_PUBLIC_PATH_IMG + car.images[0].thumbnail : '/img/noimage.jpg';
  let rawFuel= car.getDataValue('fuel')
  let rawTransmision= car.getDataValue('transmision')
  let rawStatus= car.getDataValue('status')
  
  return (
    <Box>
        <CarEditForm
          car={JSON.stringify(car)}
          brands={JSON.stringify(brands)}
          categories={JSON.stringify(categories)}
          colors={JSON.stringify(colors)}
          locations={JSON.stringify(locations)}
          transmisionValues={JSON.stringify(transmisionValues)}
          fuelValues={JSON.stringify(fuelValues)}
          statusValues={JSON.stringify(statusValues)}
          rawFuel={JSON.stringify(rawFuel)}
          rawTransmision={JSON.stringify(rawTransmision)}
          rawStatus={JSON.stringify(rawStatus)}
        />             
    </Box>

  )
}