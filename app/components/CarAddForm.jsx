"use client";

import Box from "@mui/material/Box";
import { Alert, Button, InputAdornment, MenuItem, TextField, Typography } from "@mui/material";
import ImgList from "./ImgList";
import { useState, Suspense } from "react";
import { useRouter } from 'next/navigation'

const noArrow = {
  
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                             display: "none",
                           },
   "& input[type=number]": {
                             MozAppearance: "textfield",
                           },
   
}

export default function CarAddForm(props) {
//   let car = JSON.parse(props.car);
  let brands = JSON.parse(props.brands);
  let categories = JSON.parse(props.categories);
  let colors = JSON.parse(props.colors);
  let locations = JSON.parse(props.locations);
  let fuelValues = JSON.parse(props.fuelValues);
  let transmisionValues = JSON.parse(props.transmisionValues);
  let statusValues = JSON.parse(props.statusValues);
//   let rawFuel = JSON.parse(props.rawFuel);
//   let rawTransmision = JSON.parse(props.rawTransmision);
//   let rawStatus = JSON.parse(props.rawStatus);
  const firstLetterLowercase = (data) => data?.charAt(0).toLowerCase() + data?.slice(1);

  const router = useRouter();
  
  const statusMap = {
    'Disponible': 'available',
    'Señado': 'reserved',
    'Vendido': 'selled'
  };

//   const [formData, setFormData] = useState({
//     id: car.id,
//     name: car.name,
//     year: car.year,
//     seats: car.seats,
//     fuel: firstLetterLowercase(car.fuel),
//     transmision: firstLetterLowercase(car.transmision),
//     kilometers: car.kilometers,
//     plate: car.plate,
//     category_id: car.category_id,
//     brand_id: car.brand_id,
//     color_id: car.color_id,
//     location_id: car.location_id,
//     images: JSON.stringify(car.images),
//     price: car.price,
//     status: statusMap[car.status],
//     deleted: car.deleted,
//     partial_price: car.partial_price,
//   });
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    seats: '',
    fuel: '',
    transmision: '',
    kilometers: '',
    plate: '',
    category_id: '',
    brand_id: '',
    color_id: '',
    location_id: '',
    images: JSON.stringify([]),    
    price: '',
    status: '',
    deleted: false,
    partial_price: '',
  });
 
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    // Verificar si el campo es de tipo número y está vacío
    if (type === "number" && value === "") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: 0,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    setTimeout(() => {
      setShowErrorAlert(false);
    }, "1000");
  };

  const handleUpdate = async () => {
    // Verificar si los campos están vacíos
    // console.log("ACA ESTA EL FORMDATA", formData)
    if (Object.values(formData).some((value) => value === "")) {
      setShowErrorAlert(true);
      return;
    }

    // Realizar la petición fetch y el resto de la lógica de actualización
    try {
      const response = await fetch('/api/cars/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      console.log("ACA VIENE LA DATA", data);

      if (data.success) {
        setShowAlert(true);

        setTimeout(() => {

          setShowAlert(false);

          router.push(`/cars/edit/${data?.data?.id}`);

          }, "1500");
        }

        // // Verificar si el ID del nuevo auto existe en la respuesta
        // if (data?.data?.id) {
        //   console.log("El ID del nuevo auto existe:", data?.data?.id);
        //   router.push(`/cars/edit/${data?.data?.id}`);
        // } else {
        //   console.log("El ID del nuevo auto no existe en la respuesta");
        // }

    } catch (error) {

      console.error(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" align="center">Agregar Vehiculo</Typography>

      <Typography variant="h6">Detalles</Typography>

        <TextField
        fullWidth
        id="name"
        name="name"
        label="Nombre"
        // defaultValue={car.name}
        onChange={handleInputChange}
        color="error"
      />

      <TextField
        id="category_id"
        name="category_id"
        select
        label="Categoría"
        // defaultValue={car.category.id}
        helperText="Seleccione Tipo de vehiculo"
        onChange={handleInputChange}
        color="error"
      >
        {categories.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="brand_id"
        name="brand_id"
        select
        label="Marca"
        // defaultValue={car.brand.id}
        helperText="Seleccione la marca del vehiculo"
        onChange={handleInputChange}
        color="error"
      >
        {brands.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="color_id"
        name="color_id"
        select
        label="Color"
        // defaultValue={car.color.id}
        helperText="Seleccione el color del vehiculo"
        onChange={handleInputChange}
        color="error"
      >
        {colors.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="fuel"
        name="fuel"
        select
        label="Combustible"
        // defaultValue={rawFuel}
        helperText="Seleccione el combustible del vehiculo"
        onChange={handleInputChange}
        color="error"
      >
        {fuelValues.map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="transmision"
        name="transmision"
        select
        label="Transmisión"
        // defaultValue={rawTransmision}
        helperText="Seleccione la transmisión del vehiculo"
        onChange={handleInputChange}
        color="error"
      >
      {transmisionValues.map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        id="plate"
        name="plate"
        label="Chapa"
        // defaultValue={car.plate}
        onChange={handleInputChange}
        color="error"
        inputProps={{
            maxLength: 7,
            pattern: "[A-Za-z0-9]{1,7}",
          }}
      />

      <TextField
        id="seats"
        name="seats"
        label="Asientos"
        // defaultValue={car.seats}
        onChange={handleInputChange}
        color="error"
        type="number"
        sx={noArrow}
      />

      <TextField
        id="price"
        name="price"
        label="Precio"
        InputProps={{
            startAdornment: <InputAdornment position="start">USD</InputAdornment>,
          }}
        // defaultValue={car.price}
        onChange={handleInputChange}
        color="error"
        type="number"
        sx={noArrow}
      />
      <TextField
        id="partial_price"
        name="partial_price"
        label="Cuota"
        InputProps={{
            startAdornment: <InputAdornment position="start">USD</InputAdornment>,
          }}
        // defaultValue={car.partial_price}
        onChange={handleInputChange}
        color="error"
        type="number"
        sx={noArrow}
      />

      <TextField
        id="kilometers"
        name="kilometers"
        label="Kilometraje"
        InputProps={{
            startAdornment: <InputAdornment position="start">KM</InputAdornment>,
          }}
        // defaultValue={car.kilometers}
        onChange={handleInputChange}
        color="error"
        type="number"
        sx={noArrow}
      />

      <TextField
        id="year"
        name="year"
        label="Año"
        // defaultValue={car.year}
        onChange={handleInputChange}
        color="error"
        type="number"
        sx={noArrow}
      />

      <TextField
        id="status"
        name="status"
        label="Estado"
        select
        // defaultValue={rawStatus}
        helperText="Seleccione la transmisión del vehiculo"
        onChange={handleInputChange}
        color="error"
      >
      {statusValues.map((option) => (
          <MenuItem key={option} value={option}>
            {option == 'available' ? 'Disponible' : option == 'reserved' ? 'Señado' : 'Vendido'}
          </MenuItem>
        ))}
      </TextField>

        <TextField
        id="location_id"
        name="location_id"
        label="Sede"
        select
        // defaultValue={car.location.id}
        helperText="Seleccione el color del vehiculo"
        onChange={handleInputChange}
        color="error"
      >
        {locations.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>

      <Alert variant="outlined" severity="success" style={{display: showAlert ? 'flex' : 'none'}}>
  Vehículo creado con éxito!
</Alert>
      <Alert variant="outlined" severity="error" style={{display: showErrorAlert ? 'flex' : 'none'}}>
  Debe completar todos los campos!
</Alert>

      <Button
  variant="contained"
  color="error"
  style={{display: 'block', marginBottom: 20}}
  onClick={handleUpdate}>
  Crear
</Button>
        
      <Typography variant="caption">* Una vez creado el vehículo sera redirigido al formulario de edición para agregar las fotos.</Typography>
        {/* <ImgList images={car.images}/> */}
    
    </Box>
  );
}
