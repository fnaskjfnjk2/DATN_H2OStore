module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      address: {
        // địa chỉ mặc định
        type: DataTypes.STRING,
        allowNull: false,
      },
      province: {
        // tỉnh
        type: DataTypes.STRING,
        allowNull: false,
      },
      district: {
        // huyện
        type: DataTypes.STRING,
        allowNull: false,
      },
      commune: {
        // xã
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCustom: {
        // id khách hàng
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      creator: {
        // người cập nhật
        type: DataTypes.STRING,
        allowNull: false,
      },
      
    },
    
  );

  return Address;
};
