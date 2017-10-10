/**
 * Created by wangxiaohui on 2017/9/11.
 */
var subscriptFactory = require('../service/subscriptFactory.js');
var incomeService = require('../../src/service/incomeService.js');
/*排序规则*/
function compare() {
    return function (a, b) {
        var value1 = new Date(a.date + " " + a.start + ":00").getTime();
        var value2 = new Date(b.date + " " + b.start + ":00").getTime();
        return value1 - value2;
    }
}
/*收入汇总表*/
function incomeController() {
    var incomeForm = "收入汇总" + "\n" + "---" + "\n";
    var sum = 0;
    var sites = subscriptFactory().findSites();
    for (var i = 0; i < sites.length; i++) {
        var st = "场地:" + sites[i] + "\n", add = 0;
        var subscriptions = subscriptFactory().findSubscriptionsBySite(sites[i]);
        subscriptions = subscriptions.sort(compare());
        var len = subscriptions.length;
        for (var j = 0; j < len; j++) {
            var it = subscriptions[j];
            st += it.date + " " + it.start + "~" + it.end + " ";
            if (it.cancel) {
                st += "违约金" + " ";
            }
            add += incomeService().getOrderIncome(it);
            st += incomeService().getOrderIncome(it) + "元\n";
        }
        st += "小计:" + add + "元\n";
        sum += add;

        if (i < sites.length - 1) {
            st += "\n";
        }
        incomeForm += st;
    }
    incomeForm += "---\n" + "总计:" + sum + "元";
    return incomeForm;
}
module.exports = incomeController;