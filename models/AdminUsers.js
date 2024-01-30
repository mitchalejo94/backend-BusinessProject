module.exports = (sequelize, DataTypes) => {
  const AdminUsers = sequelize.define("AdminUsers", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return AdminUsers;
};
