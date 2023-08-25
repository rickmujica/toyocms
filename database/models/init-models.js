import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _brands from  "./brands.js";
import _cars from  "./cars.js";
import _categories from  "./categories.js";
import _colors from  "./colors.js";
import _locations from  "./locations.js";
import _users from  "./users.js";

export default function initModels(sequelize) {
  const brands = _brands.init(sequelize, DataTypes);
  const cars = _cars.init(sequelize, DataTypes);
  const categories = _categories.init(sequelize, DataTypes);
  const colors = _colors.init(sequelize, DataTypes);
  const locations = _locations.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);

  cars.belongsTo(brands, { as: "brand", foreignKey: "brand_id"});
  brands.hasMany(cars, { as: "cars", foreignKey: "brand_id"});
  cars.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(cars, { as: "cars", foreignKey: "category_id"});
  cars.belongsTo(colors, { as: "color", foreignKey: "color_id"});
  colors.hasMany(cars, { as: "cars", foreignKey: "color_id"});
  cars.belongsTo(locations, { as: "location", foreignKey: "location_id"});
  locations.hasMany(cars, { as: "cars", foreignKey: "location_id"});

  return {
    brands,
    cars,
    categories,
    colors,
    locations,
    users,
  };
}
