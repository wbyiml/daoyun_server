const userService = require('../application/userService');
const roleService = require('../application/roleService');

var initializeUser = async (ctx, next) => {
  let user_id = ctx.request.body.user_id;
  let identity = ctx.request.body.identity;
  let name = ctx.request.body.name;
  let student_number = ctx.request.body.student_number;

  state = '';



  await userService.getUserById(user_id)
  .then(function(data){
      console.log(data[0]);
      let user = data[0];
      user.identity = identity;
      user.name = name;
      user.student_number = student_number;
      return userService.updateUser(user);
  })
  .then(function(data){
    state = data;
    if(identity == 'student'){
        roleService.getRoleByName('student')
        .then(function(data){
            userService.updateUserRole(user_id, data[0].id, data[0].name);
        })
    }
  })
  .catch(function(err){
      console.log('catch:'+err);
  })

  // 设置Content-Type:
  ctx.response.type = 'application/json';
  // 设置Response Body:
  ctx.response.body = {
      'state':state
  };
};

var getAllUsers = async (ctx, next) => {
  users = ''
  await userService.getAllUsers()
  .then(function(data){
      console.log('getAllUsers');
      console.log(data);
      users = data
  })
  .catch(function(err){
      console.log('catch:'+err);
  })

  // 设置Content-Type:
  ctx.response.type = 'application/json';
  // 设置Response Body:
  ctx.response.body = {
      'users': users
  };
}



var getUserPermissions = async (ctx, next) => {
    let user_id = ctx.request.body.user_id;
    // let user_id = 14;

    permissions = []
    await userService.getUserRolesByUserId(user_id)
    .then(function(data){
        let userRoles = data.rows;
        return new Promise(function(resolve,reject){
            for(let i=0; i<userRoles.length;i++){
                roleService.getRolePermissionByRoleId(userRoles[i].role_id)
                .then(function(data){
                    let j=0;
                    for(; j<data.length;j++){
                        if(permissions.indexOf(data[j].permission_id)==-1){
                            permissions.push(data[j].permission_id);
                        }
                    }
                    if(j == data.length){
                        resolve(permissions)
                    }
                })
            }
        })
    })
    .then(function(data){
        console.log('data')
        console.log(data)
        console.log(permissions)
    })
    .catch(function(err){
        console.log('catch:'+err);
    })
  
    // 设置Content-Type:
    ctx.response.type = 'application/json';
    // 设置Response Body:
    ctx.response.body = {
        'permissions': permissions
    };
}
var getAllUserRoles = async (ctx, next) => {
  userRoles = ''
  await userService.getAllUserRoles()
  .then(function(data){
      console.log('getAllUsers');
      console.log(data);
      userRoles = data
  })
  .catch(function(err){
      console.log('catch:'+err);
  })

  // 设置Content-Type:
  ctx.response.type = 'application/json';
  // 设置Response Body:
  ctx.response.body = {
      'userRoles': userRoles
  };
}


var updateAllUserRole = async (ctx, next) => {
  //user_id  role_id  role_name
  let pairs = ctx.request.body.pairs;

  state = '';
  await userService.updateAllUserRole(pairs)
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

//修改用户信息
var updateUser = async (ctx, next) => {
    let user = ctx.request.body.user;
  
    state = '';
    await userService.updateUser(user)
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

module.exports = {
    'POST /api/initializeUser': initializeUser,
    'GET /api/getAllUsers': getAllUsers,
    'POST /api/getUserPermissions': getUserPermissions,
    'GET /api/getAllUserRoles': getAllUserRoles,
    'POST /api/updateAllUserRole': updateAllUserRole,
    'POST /api/updateUser': updateUser,
};