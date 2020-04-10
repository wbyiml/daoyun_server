/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('dictionary_detail', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dictionary_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    keyword: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    is_default: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    sort: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'dictionary_detail'
  });
};
