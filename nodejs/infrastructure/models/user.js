/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    identity: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    shcool_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    faculty_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    major_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    head_image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    experience: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    extend_json: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    tableName: 'user'
  });
};


// 初始化表
// force: true 如果表已经存在，将会丢弃表
// alter: true 如果表已存在，不过丢弃，如果不存在会直接创建表
// User.sync({ alter: true })