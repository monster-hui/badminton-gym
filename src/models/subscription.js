/**
 * Created by wangxiaohui on 2017/9/9.
 * subscription model
 */
var Subscription = function (userId, date, start, end, site, cancel) {
    if (!(userId && date && start && end && site)) {
        return null;
    }
    var self = {};
    self.userId = userId;
    self.date = date;
    self.start = start;
    self.end = end;
    self.site = site;
    self.cancel = cancel ? true : false;
    return self;
};

module.exports = Subscription;
