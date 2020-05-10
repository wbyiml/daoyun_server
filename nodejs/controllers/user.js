const userService = require('../application/userService');

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



module.exports = {
    'POST /api/initializeUser': initializeUser,
    'GET /api/getAllUsers': getAllUsers,
    'GET /api/getAllUserRoles': getAllUserRoles,
    'POST /api/updateAllUserRole': updateAllUserRole,
};