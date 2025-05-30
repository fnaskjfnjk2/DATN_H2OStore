module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      employeeCode: {
        // mã nhân viên
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
<<<<<<< HEAD
      
=======
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        // chức vụ
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      creator: {
        // người tạo
        type: DataTypes.STRING,
        allowNull: false,
      },
      updater: {
        // người chỉnh sửa
        type: DataTypes.STRING,
        allowNull: false,
      },
>>>>>>> 37eb1e84b666142d8b3170e47830f8fc359f1384
    },
    { paranoid: true, timestamps: true }
  );

  return Admin;
};
