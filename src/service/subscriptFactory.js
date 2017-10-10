/**
 * Created by wangxiaohui on 2017/9/10.
 */
var dateTimeFactory = require('../../src/service/dateTimeFactory.js');
var Subscription = require('../../src/models/subscription.js');
var api = require("../../data/data.js");

/*实现将预定转换为对象*/
var subscriptFactory = function () {
    var self = {};

    self.cutSubscriptionString = function (str) {
        var regexp = /^(\w{4})\s+(\d{4}-\d{2}-\d{2})\s+(\d{2})[:|：]00~(\d{2})[:|：]00\s+([A-D])\s*(C)?$/g;
        var strArray = regexp.exec(str);
        if ((!!strArray) && strArray.length > 5) {
            var dateTime = dateTimeFactory().stringToDate(strArray[2] + " " + strArray[3] + ":00");
            if (dateTime) {
                var start = parseInt(strArray[3]);
                var end = parseInt(strArray[4]);
                if (dateTimeFactory().isTimeFrame(start, end)) {
                    // var day=dateTimeFactory().getDay(dateTime);
                    var cancel = false;
                    if (strArray[6]) {
                        if (strArray[6] === 'C') {
                            cancel = true;
                        } else {
                            return null;
                        }

                    }
                    return new Subscription(strArray[1], strArray[2], start, end, strArray[5], /*day,*/cancel)
                }
            }
        }
        return null;
    };
    //通过场地，获取所有预定场地名
    self.findSites = function () {
        var res = api().findSites();
        if (res.errCode == 0) {
            return res.data;
        }
        return null;
    };
    //通过场地，获取所有预定
    self.findSubscriptionsBySite = function (site) {
        var res = api().findSubscriptionsBySite(site);
        if (res.errCode == 0) {
            return res.data;
        }
        return null;
    };

    // 查询时间是否已经被预定
    self.isExistBookInTime = function (subscription) {
        var res = api().isExistBookInTime(subscription);
        if (res.errCode == 0) {
            return res.data;
        }
        return -1;

    };
    //取消预约单
    self.cancelSubscription = function (subscription) {
        var res = api().cancelSubscription(subscription);
        if (res.errCode == 0) {
            return true;
        }
        return -1;
    };
    //添加预约单
    self.addSubscription = function (subscription) {
        var res = api().postSubscription(subscription);
        if (res.errCode ===0) {
            return true;
        }
        return false;
    };
    return self;
};
module.exports = subscriptFactory;