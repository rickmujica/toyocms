import CarGrid from "./CarGrid";
import sequelize from '@/database/config/connect'
import initModels from '@/database/models/init-models'
import { Box } from "@mui/material";
import { Op } from 'sequelize'


/**
 * Posibles parametros recibidos como queryString
 * category INT[] ID de la categoria (TIPO)
 * brand INT[] ID de la marca
 * color INT[] ID del color
 * status String[] Estado (available, reserved, selled)
 * transmision[] String Transmision (manual, automatico)
 * year STRING RANGO de Año de fabricación. ej: 2018-2020
 * price STRING RANGO de precio. ej: 1000-20000
 * kilometers STRING RANGO de kilometraje. ej: 7000-1500000
 * page INT Numero de pagina para el paginador. Default 1.
 * 
 */
function makeWhere(params = null){
  let where = {};
  const FROM = 0;
  const TO = 1;

  if(params){

    if(params.search){
      where.name = {
        // [Op.or] : typeof params.search == 'string' ? [params.search] : params.search,
        [Op.like]: `%${params.search}%`
      }        
    }
    if(params.category){
      where.category_id = {
        [Op.or] : typeof params.category == 'string' ? [params.category] : params.category
      }
    }

    if(params.brand){
      where.brand_id = {
        [Op.or] : typeof params.brand == 'string' ? [params.brand] : params.brand
      }
    }

    if(params.color){
      where.color_id = {
        [Op.or] : typeof params.color == 'string' ? [params.color] : params.color
      }
    }

    if(params.status){
      where.status = {
        [Op.or] : typeof params.status == 'string' ? [params.status] : params.status
      }
    }

    if(params.transmision){
      where.transmision = {
        [Op.or] : typeof params.transmision == 'string' ? [params.transmision] : params.transmision
      }
    }

    if(params.year){
      let values = params.year.split('-')
      where.year = {
        [Op.gte] : values[FROM],
        [Op.lte] : values[TO],
      }
    }

    if(params.price){
      let values = params.price.split('-')
      where.price = {
        [Op.gte] : values[FROM],
        [Op.lte] : values[TO],
      }
    }

    if(params.kilometers){
      let values = params.kilometers.split('-')
      where.kilometers = {
        [Op.gte] : values[FROM],
        [Op.lte] : values[TO],
      }
    }
  }

  return where;
}


export default async function CarTable({ searchParams }) {
  const db = initModels(sequelize);
  const pageSize = 12;
  const currentPage = searchParams.page == 1 ? 0 : searchParams.page;
  let offset = Number((currentPage * pageSize) - pageSize);

  if(!offset || offset <= 0) offset = 0 ;

  const { count, rows } = await db.cars.findAndCountAll({
  
    include: ['brand', 'color', 'category', 'location'],
    where: makeWhere(searchParams),
    order: [
      ['status', 'ASC'],
      ['id', 'DESC']
    ]
  });

  const cars = rows;
//   console.log(cars)
    return (
      <Box sx={{ width: '100%'}}>
        <CarGrid cars={JSON.stringify(cars)}/>
      </Box>

    )
}