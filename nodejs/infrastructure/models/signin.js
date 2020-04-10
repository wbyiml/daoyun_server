/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('signin', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    class_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    experience_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creator: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'signin'
  });
};
