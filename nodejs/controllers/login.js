const loginService = require('../application/loginService');
const userService = require('../application/userService');

var login = async (ctx, next) => {
    let way = ctx.request.body.way;
    let account = ctx.request.body.account;
    let password = ctx.request.body.password;

    user_id = '';
    if(way == 'phone'){
        await loginService.getLoginByPhone(account)
        .then(function(data){
            console.log('phone login success:');
            console.log(data);
            if(data.length == 0){
                // account error
                user_id = -1
            }else if(data[0].phone_password != password){
                // password error
                user_id = -2
            }else{
                user_id =  data[0].user_id;
            }
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }else if(way == 'email'){
        await loginService.getLoginByEmail(account)
        .then(function(data){
            console.log('email login success:');
            console.log(data);
            if(data.length == 0){
                // account error
                console.log('account error');
                user_id = -1
            }else if(data[0].email_password != password){
                // password error
                console.log('password error');
                user_id = -2
            }else{
                user_id =  data[0].user_id;
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
        'user_id': user_id
    };
};

var sinup = async (ctx, next) => {
    let phone = ctx.request.body.phone;
    let phone_password = ctx.request.body.phone_password;
    let create_time = ctx.request.body.create_time;
    user_id = '';

    await loginService.getLoginByPhone(phone)
    .then(function(data){
        console.log(data);
        if(data.length != 0){
            // phone already exist
            console.log('phone already exist');
            user_id = -1
        }
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
    if(user_id == ''){
        await userService.insertUser(phone)
        .then(function(data){
            console.log(data);
            return loginService.insertLogin(data.id,phone,phone_password,create_time);
        })
        .then(function(data){
            console.log(data);
            user_id = data.user_id;
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'user_id': user_id
    };
};


// 绑定邮箱 更改邮箱
var updateEmail = async (ctx, next) => {
    let user_id = 9;
    let email = '111111@qq.com';
    let email_password = '111111';
    state = '';

    await loginService.getLoginByEmail(email)
    .then(function(data){
        console.log(data);
        if(data.length != 0){
            // email already exist
            console.log('email already exist');
            state = -1;
        }
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
    if(state == ''){
        await loginService.updateLoginEmail(user_id,email,email_password)
        .then(function(data){
            console.log(data);
            state = data.length;
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state
    };
};
//更改邮箱密码  
var updateEmailPassword = async (ctx, next) => {
    let user_id = 1;
    let email = '111111@qq.com';
    let email_password = '222222';
    state = '';

    await loginService.updateLoginEmail(user_id,email,email_password)
    .then(function(data){
        console.log(data);
        state = data.length;
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

// 更改手机  更改手机密码
var updatePhone = async (ctx, next) => {
    let user_id = 1;
    let phone = '13111111111';
    let phone_password = 'admin';
    state = '';

    await loginService.getLoginByPhone(phone)
    .then(function(data){
        console.log(data);
        if(data.length != 0){
            // phone already exist
            console.log('phone already exist');
            state = -1;
        }
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
    if(state == ''){
        await loginService.updateLoginPhone(user_id,phone,phone_password)
        .then(function(data){
            console.log(data);
            state = data.length;
        })
        .catch(function(err){
            console.log('catch:'+err);
        })
    }

    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'state': state
    };
};
//更改手机密码  
var updatePhonePassword = async (ctx, next) => {
    let user_id = 9;
    let phone = '12345678912';
    let phone_password = '111111';
    state = '';

    await loginService.updateLoginPhone(user_id,phone,phone_password)
    .then(function(data){
        console.log(data);
        state = data.length;
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

module.exports = {
    // 'GET /api/login': login,
    // 'GET /api/sinup': sinup,
    // 'GET /api/updateEmail': updateEmail,
    // 'GET /api/updateEmailPassword': updateEmailPassword,
    // 'GET /api/updatePhone': updatePhone,
    // 'GET /api/updatePhonePassword': updatePhonePassword,
    'POST /api/login': login,
    'POST /api/sinup': sinup,
    'POST /api/updateEmail': updateEmail,
    'POST /api/updateEmailPassword': updateEmailPassword,
    'POST /api/updatePhone': updatePhone,
    'POST /api/updatePhonePassword': updatePhonePassword,
};