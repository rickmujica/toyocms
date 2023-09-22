import Link from 'next/link';
import sequelize from '@/database/config/connect'
import initModels from '@/database/models/init-models'
// import ContactForm from "@/app/components/ContactForm"
// import LocationMap from "@/app/components/LocationMap"
// import RelatedCars from './RelatedCars';
// import Gallery from './Gallery';
import Image from 'next/image';
import ImgListLook from './ImgListLook';
import { Box, Typography } from '@mui/material';

export default async function CarLook({ id }) {
    // const id = JSON.parse(params.id);
    const db = initModels(sequelize);

  const car = await db.cars.findOne({
    where: { id: id },
    include: ['brand', 'color', 'category', 'location']
  });

  const kms = Intl.NumberFormat('es-PY', { style: 'decimal'}).format(car.kilometers);
  const price = Intl.NumberFormat('es-PY', { style: 'decimal'}).format(car.price);
  // const imgSrc = car.images ? process.env.NEXT_PUBLIC_PATH_IMG + car.images[0].thumbnail : '/img/noimage.jpg';

  return (
      <Box>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 col-md-8 order-2 order-md-1">
                <h3 className='mb-5'>{car.name}</h3>
              <div id="features">
                <h5>Especificaciones</h5>
                <div className="line"></div>
                <div className="row py-4">
                  <div className="col-6 col-md-3">
                    <div className="spec-item type">
                      <p>Tipo de vehiculo</p>
                      <p><strong>{car.category.name}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item brand">
                      <p>Marca</p>
                      <p><strong>{car.brand.name}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item fuel">
                      <p>Combustible</p>
                      <p><strong>{car.fuel || 'No disponible'}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item transmision">
                      <p>Transmisión</p>
                      <p><strong>{car.transmision}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item plate">
                      <p>Chapa</p>
                      <p><strong>{car.plate}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item seats">
                      <p>Pasajeros</p>
                      <p><strong>{car.seats}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item color">
                      <p>Color</p>
                      <p><strong>{car.color.name}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item location">
                      <p>Sede</p>
                      <p><strong>{car.location.name}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item location">
                      <p>Kilometraje</p>
                      <p><strong>{kms}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item location">
                      <p>Año</p>
                      <p><strong>{car.year}</strong></p>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="spec-item location">
                      <p>Precio</p>
                      <p className="price"><strong>$ {price}</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {car?.images?.length > 0 ? (
          <Box>
          <Typography variant="h6">Fotos</Typography>
              <ImgListLook images={JSON.stringify(car?.images)}/>
          </Box>
        ):
        (
          <></>
        )
        }
     
        </Box>

  )
}