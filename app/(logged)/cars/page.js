import Filters from "@/app/components/Filters";
import CarTable from "./CarTable";
import RestartButton from "@/app/components/RestartButton";
import sequelize from "@/database/config/connect";
import initModels from "@/database/models/init-models";
// import FiltroMobile from "@/app/components/FiltroMobile";
import { Op } from "sequelize";
import Link from "next/link";
import DrawerFiltros from "@/app/components/DrawerFiltros";
import { Box } from "@mui/material";

export default async function Vehiculos({ params, searchParams }) {
  const db = initModels(sequelize);

  /** marcas */
  const brands = await db.brands.findAll({
    order: [["name", "ASC"]],
  });

  /** categorias */
  const categories = await db.categories.findAll({
    where: {
      order: {
        [Op.gt]: 0,
      },
    },
    order: [["order", "ASC"]],
  });

  /** Rangos */
  const ranges = await db.cars.findOne({
    attributes: [
      [sequelize.fn("min", sequelize.col("price")), "min_price"],
      [sequelize.fn("max", sequelize.col("price")), "max_price"],
      [sequelize.fn("min", sequelize.col("year")), "min_year"],
      [sequelize.fn("max", sequelize.col("year")), "max_year"],
      [sequelize.fn("min", sequelize.col("kilometers")), "min_kms"],
      [sequelize.fn("max", sequelize.col("kilometers")), "max_kms"],
    ],
    raw: true,
  });

  const data = {
    ranges,
    categories,
    brands,
  };

  return (
    <Box>
      <DrawerFiltros data={JSON.stringify(data)}>
        <CarTable searchParams={searchParams} />
      </DrawerFiltros>
    </Box>
  );
}
