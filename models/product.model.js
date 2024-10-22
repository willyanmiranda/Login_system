const { DataTypes } = require('sequelize');
const sequelize = require('../db/dbConnection');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  brand: {
    type: DataTypes.STRING,
  },
  discount: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0.00,
  },
  weight: {
    type: DataTypes.DECIMAL(10, 2),
  },
  dimensions: {
    type: DataTypes.JSON, // Ex: { length: 10, width: 5, height: 3 }
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
});

module.exports = Product;