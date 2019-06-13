module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1]
        }
      }
    }, {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.Plants);
        }
      }
    });
    return User;
  };

