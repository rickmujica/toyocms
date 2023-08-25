
"use client"
import Image from 'next/image';
import * as React from 'react';
import Box from '@mui/material/Box';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextField, Typography } from '@mui/material';



export default function CarEditForm(props) {

    let car = JSON.parse(props.car)
    
  const [formData, setFormData] = React.useState({
    name: car.name,
    brand: car.brand.name,
    plate: car.plate
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >

                <Typography align='center'>Editar {car.name}</Typography>
              {/* <Gallery images={JSON.stringify(car.images)} /> */}

             
                <h5>Especificaciones</h5>

                {/* <FormControl>
                <InputLabel htmlFor="name">Nombre</InputLabel>
                    <OutlinedInput
                        id="name"
                        defaultValue={car.name}
                        label="Nombre"
                        />
                 </FormControl> */}

                 <TextField
                    fullWidth
                    label="Nombre"
                    id="Nombre"
                    value={car.name}
                    name='name'
                    onChange={handleInputChange}
                    color='error'
                 />


                 
                      <p>Tipo de vehiculo</p>

                      <p>{car.category.name}</p>
                 
                
                      <p>Marca</p>

                      <p>{car.brand.name}</p>
                    
                 
                      <p>Combustible</p>

                      <p>{car.fuel || 'No disponible'}</p>
                   
                  
                      <p>Transmisión</p>

                      <p>{car.transmision}</p>
                   
                  
                      <p>Chapa</p>

                      <p>{car.plate}</p>
                    
                 
                      <p>Pasajeros</p>

                      <p>{car.seats}</p>
                    
                 
                      <p>Color</p>

                      <p>{car.color.name}</p>
                    
                 
                      <p>Sede</p>

                      <p>{car.location.name}</p>
                    
              

              
                <h5>Encontranos en:</h5>
            
                
            
                      <p>Dirección</p>

                      <a href='https://goo.gl/maps/74TZPSeivPxfAudg8' target='_blank'>{car.location.address || 'No disponible'}
                      </a>
                 
                    
                      <p>Teléfono</p>
                      <a href="tel:+595216190000">{`${car.location.phone}0` || 'No disponible'}</a>
                 
              
                      <p>Whatsapp</p>

                      <a href='https://wa.me/595986663989'>
                      {car.location.whatsapp.substring(0, 4) + ' ' + car.location.whatsapp.substring(4) || 'No disponible'}
                      
                      </a>
                   

           
              {/* <p className="featured-specs">
              <span className="status"> Estado{car.status}</span>
                <span className="km">Kilometraje {kms}</span>
                <span className="ano">Año {car.year}</span>
              </p>
              <p className="price">$ {price}</p> */}
             
          </Box>

  )
}