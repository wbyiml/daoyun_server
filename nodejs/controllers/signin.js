const signinService = require('../application/signinService');

// 班课里教师发起的的签到
var getSigninByClassId = async (ctx, next) => {
    let class_id = ctx.request.body.class_id;
    
    let signins = '';
    await signinService.getSigninByClassId(class_id)
    .then(function(data){
        console.log('success:'+data);
        signins = data;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'signins': signins
    };
};

//学生在该班课参与的所有签到签到
var getExperienceLogByUserIdClassId = async (ctx, next) => {
    let user_id = ctx.request.body.user_id;
    let class_id = ctx.request.body.class_id;
    
    let signins = '';
    await signinService.getExperienceLogByUserIdClassId(user_id, class_id)
    .then(function(data){
        console.log('success:'+data);
        signins = data;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'signins': signins
    };
};

// 创建签到  位置经度纬度longitude latitude
var createSign = async (ctx, next) => {
    let signin = ctx.request.body.signin;

    let sign_id = '';
    await signinService.insertSignin(signin)
    .then(function(data){
        console.log(data);
        sign_id = data.id;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'sign_id': sign_id
    };
};

// 提前结束签到 update
var updateSignin = async (ctx, next) => {
    let sign_id = ctx.request.body.sign_id;
    let deadline = ctx.request.body.deadline;

    state = '';
    await signinService.updateSignin(sign_id, deadline)
    .then(function(data){
        console.log(data);
        state = data;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state
    };
};

// 参与签到
var joinSignin = async (ctx, next) => {
    let user_id = ctx.request.body.user_id;
    let class_id = ctx.request.body.class_id;
    let signin_time = ctx.request.body.signin_time;
    // let class_id = 17;

    // 查看最新签到是否过期，若还没过期，查看学生最新签到是否已签到
    let create_time = '';
    let deadline = '';
    let state = '';
    await signinService.getOneSigninByClassId(class_id)
    .then(function(data){
        console.log(data);
        create_time = data.create_time;
        deadline = data.deadline;
    })
    .catch(function(err){
        console.log('catch:'+err);
    })

    if(new Date(deadline).getTime() < new Date(signin_time).getTime()){
        //签到过期
        state = -1;
    }else{
        await signinService.getOneExperienceLogByUserIdClassId(user_id,class_id)
        .then(function(data){
            console.log(data);
            if(new Date(create_time).getTime() < new Date(data.time).getTime()){
                //已签到
                state = -2;
            }else{
                signinService.insertExperienceLog(class_id,user_id,data.experience,signin_time);
            }
        })
        .catch(function(err){
            console.log('catch:'+err);
        })

    }
   
   // 设置Content-Type:
   ctx.response.type = 'application/json';
   // 设置Response Body:
   ctx.response.body = {
       'state': state,
   };
};


module.exports = {
    'POST /api/getSigninByClassId': getSigninByClassId,
    'POST /api/getExperienceLogByUserIdClassId': getExperienceLogByUserIdClassId,
    'POST /api/createSign': createSign,
    'POST /api/updateSignin': updateSignin,
    'POST /api/joinSignin': joinSignin,
};