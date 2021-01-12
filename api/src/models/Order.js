const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Order = sequelize.define('order', {
    dateA: {
      type: DataTypes.DATE,
      allowNull: false,
        },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
        },
    tool: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commentA: {
      type: DataTypes.STRING,
    },     
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cant: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
  });
};
