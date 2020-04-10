/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('homework', {
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
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(3000),
      allowNull: false
    },
    file: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    creator: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    experience_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'homework'
  });
};
