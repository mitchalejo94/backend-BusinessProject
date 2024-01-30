module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define("Notes", {
    noteBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ContactId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  return Notes;
};
