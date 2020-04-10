/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('signin_setting', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    level: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rate: {
      type: "DOUBLE",
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'signin_setting'
  });
};
