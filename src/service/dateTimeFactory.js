/**
 * Created by wangxiaohui on 2017/9/10.
 */

var dateTimeFactory = function () {
    var self = {};
    //将字符串转换为date
    self.stringToDate = function (str) {
        var date = new Date(str);
        if (isNaN(date)) {
            return null;
        }
        return date;
    };
    //是否未来时间
    self.isfuture = function (date) {
        return date.getTime() > Date.now();
    };
    //获取星期  （周天为7）
    self.getDay = function (date) {
        var day = date.getDay();
        if (day > 0) {
            return day;
        }
        return 7;
    };
    //是否为正确时间段
    self.isTimeFrame = function (start, end, openTime, closeTime) {
        if (openTime === undefined) {
            openTime = 9;
        }
        if (closeTime === undefined) {
            closeTime = 22;
        }
        if (start < end && start >= openTime && end <= closeTime) {
            return true;
        }
        return false;
    };
    return self;
};
module.exports = dateTimeFactory;