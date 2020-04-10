const model = require('../infrastructure/model');


var fn_hello = async (ctx, next) => {
    let User = model.user;
    User.findAndCountAll({  //count  findAll  findOne
        where: {
          name: 'joy'
        },
        //order: [],  //排序
        limit: 10,  //分页查找条数
        offset: 0,   //分页查找第几条开始
        raw:true,  // 查询结果sequelize模型转成数组
        attributes:["id", "name"]    //  需要查询出的字段   attributes:{exclude: ['id'] },剔除不想要的属性
      }).then(users => {
        console.log(users);
      })

    var name = ctx.params.name;
    ctx.response.body = `<h1>User, ${name}!</h1>`;
};

module.exports = {
    'GET /user/:name': fn_hello
};