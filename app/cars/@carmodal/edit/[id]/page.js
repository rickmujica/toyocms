import Link from 'next/link';
import sequelize from '@/database/config/connect'
import initModels from '@/database/models/init-models'
// import ContactForm from "@/app/components/ContactForm"
// import LocationMap from "@/app/components/LocationMap"
// import RelatedCars from './RelatedCars';
// import Gallery from './Gallery';
import Image from 'next/image';
import Box from '@mui/material/Box';
import CarEditForm from './CarEditForm';


export default async function CarEdit({ searchParams }) {
    
    const id = JSON.parse(searchParams);
    const db = initModels(sequelize);

  const car = await db.cars.findOne({
    where: { id: id },
    include: ['brand', 'color', 'category', 'location']
  });

  const kms = Intl.NumberFormat('es-PY', { style: 'decimal'}).format(car.kilometers);
  const price = Intl.NumberFormat('es-PY', { style: 'decimal'}).format(car.price);
  const imgSrc = car.images ? process.env.NEXT_PUBLIC_PATH_IMG + car.images[0].thumbnail : '/img/noimage.jpg';


  return (
    <Box>
        <CarEditForm car={JSON.stringify(car)}/>             
    </Box>

  )
}