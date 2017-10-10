/**
 * Created by wangxiaohui on 2017/9/9.
 */
var subscripController = require("./controller/subscripController.js");
var incomeController = require('./controller/incomeController.js');
var readline = require('readline');

/*控制台输入输出控制*/
console.log("请输入预定信息或其他操作（输入空格显示收入，输入‘close’退出操作），按回车执行操作");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var inputArr = [];
rl.on('line', function (input) {
    if (input == "close") {
        rl.close();
    }
    var regex = /^\s+$/;
    if (regex.test(input)) {
        console.log(incomeController());
    } else {
        var tip = subscripController(input);
        console.log(tip);
    }

});
rl.on('close', function () {
    console.log('程序结束');
    process.exit(0);
});