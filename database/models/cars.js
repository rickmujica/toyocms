import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class cars extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      seats: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fuel: {
        type: DataTypes.ENUM('diesel', 'flex', 'hibrido', 'nafta'),
        allowNull: false,
        get() {
          /** convierte a mayuscula la primera letra antes de retornar */
          const lower = this.getDataValue('fuel');
          if (lower) {
            const ucfirst = lower.charAt(0).toUpperCase() + lower.slice(1);
            return ucfirst;
          }
          return lower;
        }
      },
      transmision: {
        type: DataTypes.ENUM('manual', 'automatico'),
        allowNull: false,
        get() {
          const labelMap = {
            'manual': 'Manual',
            'automatico': 'Automático'
          }
          return labelMap[this.getDataValue('transmision')];
        }
      },
      kilometers: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      plate: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: "plate_UNIQUE"
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'categories',
          key: 'id'
        }
      },
      brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'brands',
          key: 'id'
        }
      },
      color_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'colors',
          key: 'id'
        }
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'locations',
          key: 'id'
        }
      },
      images: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const images = this.getDataValue('images');
          return (images) ? JSON.parse(this.getDataValue('images')) : null
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('available', 'reserved', 'selled'),
        allowNull: true,
        defaultValue: "available",
        get() {
          const statusMap = {
            'available': 'Disponible',
            'reserved': 'Señado',
            'selled': 'Vendido'
          }
          return statusMap[this.getDataValue('status')];
        }
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },
      badgedClass: {
        type: DataTypes.VIRTUAL,
        get() {
          const classMap = {
            'available': 'success',
            'reserved': 'info',
            'selled': 'danger'
          }
          return classMap[this.getDataValue('status')]
        }
      },
      partial_price: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'cars',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "id" },
          ]
        },
        {
          name: "plate_UNIQUE",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "plate" },
          ]
        },
        {
          name: "fk_cars_categories_idx",
          using: "BTREE",
          fields: [
            { name: "category_id" },
          ]
        },
        {
          name: "fk_cars_brands1_idx",
          using: "BTREE",
          fields: [
            { name: "brand_id" },
          ]
        },
        {
          name: "fk_cars_colors1_idx",
          using: "BTREE",
          fields: [
            { name: "color_id" },
          ]
        },
        {
          name: "fk_cars_locations1_idx",
          using: "BTREE",
          fields: [
            { name: "location_id" },
          ]
        },
      ]
    });
  }
}
