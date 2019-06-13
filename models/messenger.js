module.exports = function (sequelize, DataTypes) {
    var Messenger = sequelize.define("Messenger", {
        friend_id: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },  
        message_1: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        message_2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_3: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_4: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_5: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_6: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_7: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_8: {
            type: DataTypes.TEXT,
            allowNull: true
        },       
        message_9: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_10: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_11: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_12: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_13: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_14: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_15: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_16: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_17: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_18: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_19: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message_20: {
            type: DataTypes.TEXT,
            allowNull: true
        }
        
    });

    Messenger.associate = function (models) {
        models.Messenger.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Messenger;
};