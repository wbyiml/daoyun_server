const fs = require('fs');

//自动扫描controllers目录，找到所有js文件，导入，然后注册每个URL

// 处理每个js文件:
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
function addControllers(router,controllers_dir) {
    // 用readdirSync列出文件
    var path = require('path');
    var controllersPath = path.join(__dirname, controllers_dir);
    var files = fs.readdirSync(controllersPath);
    // 过滤出.js文件:
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let
        controllers_dir = dir || 'controllers', // 如果不传参数，扫描目录默认为'controllers'
        //koa-router这个middleware，让它负责处理URL映射
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};