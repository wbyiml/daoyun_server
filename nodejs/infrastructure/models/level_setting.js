/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('level_setting', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    level: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'level_setting'
  });
};
