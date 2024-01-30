module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contact", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    cityState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activeContact: {
      type: DataTypes.BOOLEAN,
      defaultValue: true, // Setting the default value to true
    },
  });

  Contact.associate = (models) => {
    Contact.hasMany(models.Notes, {
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };
  return Contact;
};
