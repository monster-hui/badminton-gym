/**
 * Created by wangxiaohui on 2017/9/10.
 */
var dateTimeFactory = require('../../src/service/dateTimeFactory.js');
var priceForm = require('../../src/util/price.js');
var incomeService = function () {
    var self = {};
    //计算单个预约收益
    self.getOrderIncome = function (subscription) {
        if (!subscription) return -1;
        var date = dateTimeFactory().stringToDate(subscription.date);
        var day = dateTimeFactory().getDay(date);
        var start = subscription.start;
        var end = subscription.end;
        var pri = priceForm.order[day + ""];
        var len = pri.length;
        var money = 0;
        for (var i = 0; i < len; i++) {
            var it = pri[i];
            if (start >= it.start && start < it.end) {
                if (end <= it.end) {
                    money += (end - start) * it.price;
                    break;
                } else {
                    money += (it.end - start) * it.price;
                    start = it.end;
                }
            }
        }
        if (subscription.cancel) {
            money = money * priceForm.penalty[day + ''] * 0.01;
        }
        return money;
    };
    return self;
};
module.exports = incomeService;