import Link from 'next/link';
import sequelize from '@/database/config/connect'
import initModels from '@/database/models/init-models'
// import ContactForm from "@/app/components/ContactForm"
// import LocationMap from "@/app/components/LocationMap"
// import RelatedCars from './RelatedCars';
// import Gallery from './Gallery';
import Image from 'next/image';

export default async function CarView({ searchParams }) {
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
    <main className="main-single-car">
      <section id="car-detail">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12 col-md-8 order-2 order-md-1">

                <h3>{car.name}</h3>
              {/* <Gallery images={JSON.stringify(car.images)} /> */}

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
                </div>
              </div>

              <div id="location">
                <h5>Encontranos en:</h5>
                <div className="line"></div>
                <div className="row py-4">
                  <div className="col-12 col-md-4">
                    <div className="location-item address">
                      <p>Dirección</p>
                      <a href='https://goo.gl/maps/74TZPSeivPxfAudg8' target='_blank'><strong>{car.location.address || 'No disponible'}</strong></a>
                    </div>
                    <div className="location-item phone">
                      <p>Teléfono</p>
                      <a href="tel:+595216190000"><strong>{`${car.location.phone}0` || 'No disponible'}</strong></a>
                    </div>
                    {/* <div className="location-item whatsapp">
                      <p>Whatsapp</p>
                      <a href='https://wa.me/595216190000'><strong>{`${car.location.whatsapp}0`|| 'No disponible'}
                      </strong></a>
                    </div> */}
                    <div className="location-item whatsapp">
                      <p>Whatsapp</p>
                      <a href='https://wa.me/595986663989'><strong>{car.location.whatsapp.substring(0, 4) + ' ' + car.location.whatsapp.substring(4) || 'No disponible'}
                      </strong></a>
                    </div>
                  </div>
                  {/* <div className="col-12 col-md-8">
                    <div className="map-wrap">
                      <LocationMap lat={car.location.latitude} lon={car.location.longitude}/>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 order-1 order-md-2">
              <span className={`badge rounded-pill text-bg-${car.badgedClass}`}>{car.status}</span>
              <h1>{car.name}</h1>
              <p className="featured-specs">
                <span className="km">Kilometraje <strong>{kms}</strong></span>
                {/* <Image src='/img/icons/separador.png' width={2} height={20} alt=""/> */}
                <span className="ano">Año <strong>{car.year}</strong></span>
              </p>
              <p className="price">$ {price}</p>
              <div className='d-none d-md-block'>
               {/* <ContactForm car = {JSON.stringify(car)} /> */}
              </div>
            </div>
          </div>
          <div className="col-12 mb-5 d-md-none">
          {/* <ContactForm car = {JSON.stringify(car)} /> */}
          </div>
          {/* <RelatedCars car = {car}/>  */}
          
        </div>
      </section>
    </main>

  )
}