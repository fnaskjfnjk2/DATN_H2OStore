module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      
    },
    { paranoid: true, timestamps: true }
  );

  return Client;
};
