/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dictionary', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'dictionary'
  });
};
