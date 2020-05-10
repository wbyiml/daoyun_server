const classService = require('../application/classService');

// 教师创建的班课
var getClassByUserId = async (ctx, next) => {
    let user_id = ctx.request.body.user_id;
    
    let classes = '';
    await classService.getClassByUserId(user_id)
    .then(function(data){
        console.log('success:'+data);
        classes = data;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })


    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'classes': classes
    };
};

// 学生加入的班课
var getUserClassByUserId = async (ctx, next) => {
    let user_id = ctx.request.body.user_id;
    
    let classes = '';
    await classService.getUserClassByUserId(user_id)
    .then(function(data){
        console.log('success:'+data);
        for(let i=0;i<data.length;i++){
            classService.getClassById(data[i].rows.id)
            .then(function(data){
                classes.push(data[0]);
            }
        }
    })
    .catch(function(err){
        console.log('catch:'+err);
    })


    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'classes': classes
    };
};



module.exports = {
    'POST /api/getClassByUserId': getClassByUserId,
    'POST /api/getUserClassByUserId': getUserClassByUserId
};