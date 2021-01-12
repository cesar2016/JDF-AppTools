const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define('user', {
  username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
