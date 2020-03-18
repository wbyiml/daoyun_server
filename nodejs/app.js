//每收到一个http请求，koa就会调用通过app.use()注册的async函数
const Koa = require('koa');
//解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中
const bodyParser = require('koa-bodyparser');
// 导入controller middleware:
const controller = require('./controller');


const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

//koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());

app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');

//所有处理URL的函数按功能组存放在controllers目录，今后我们也只需要不断往这个目录下加东西就可以了，app.js保持不变。