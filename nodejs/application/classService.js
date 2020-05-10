const model = require('../infrastructure/model');


function getClassById(id) {
    return new Promise(function(resolve,reject){
        let Class = model.class;
        Class.findAnd({  //count  findAll  findOne
            where: {
                id: id
            },
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
    
};
// 教师创建的班课
function getClassByUserId(user_id) {
    return new Promise(function(resolve,reject){
        let Class = model.class;
        Class.findAndCountAll({  //count  findAll  findOne
            where: {
                user_id: user_id
            },
            order: [],  //排序
            raw:true,  // 查询结果sequelize模型转成数组
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
    
};
// 学生加入的班课
function getUserClassByUserId(user_id) {
    return new Promise(function(resolve,reject){
        let Class = model.class;
        let UserClass = model.user_class;
        UserClass.findAndCountAll({  //count  findAll  findOne
            where: {
                user_id: user_id
            },
            order: [],  
            raw:true,  
        }).then(function(result) {
            resolve(result);
        }).catch(function(error) {
            console.log(error)
        });
    });
};

module.exports = {
    'getClassById': getClassById,
    'getClassByUserId': getClassByUserId,
    'getUserClassByUserId': getUserClassByUserId
};

