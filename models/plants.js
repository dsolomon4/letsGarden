module.exports = function (sequelize, DataTypes) {
    var Plant = sequelize.define("Plant", {
        plant_name: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },  
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        optimal_sun: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        when_to_plant: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        growing_from_seed: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        spacing: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        transplanting: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        watering: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        pests: {
            type: DataTypes.TEXT,
            allowNull: true
        },       
         harvesting: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        garden: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        request: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        swap: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
        
    });

    Plant.associate = function (models) {
        models.Plant.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Plant;
};