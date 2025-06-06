module.exports = (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      colorCode: {
        // mã màu
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      creator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updater: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Colors",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      paranoid: true,
      timestamps: true,
    }
  );

  return Color;
};


// module.exports = (sequelize, DataTypes) => {
//   const Color = sequelize.define(
//     "Color",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       colorCode: {
//         // mã màu
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       creator: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       updater: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     },
//     {
//       tableName: "Colors",
//       charset: "utf8mb4",
//       collate: "utf8mb4_general_ci",
//       paranoid: true,
//       timestamps: true,
//     }
//   );

//   return Color;
// };
