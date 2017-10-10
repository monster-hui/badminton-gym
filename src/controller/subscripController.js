/**
 * Created by wangxiaohui on 2017/9/10.
 */
var subscriptFactory = require('../service/subscriptFactory.js');
var ExceptionMessages = require("../../src/util/exceptionMessages.js");
var dateTimeFactory = require('../service/dateTimeFactory.js');

/*预定录入，并返回提示语*/
function subscripController(str) {
    var subscription = subscriptFactory().cutSubscriptionString(str);
    if (subscription == null) {
        return ExceptionMessages.ERR_INPUT_INVALID;
    }
    var date = dateTimeFactory().stringToDate(subscription.date + " " + subscription.end + ":00");
    if (!dateTimeFactory().isfuture(date)) {
        return ExceptionMessages.ERR_POST_TIME;
    }
    if (subscription.cancel) {
        var resCl = subscriptFactory().cancelSubscription(subscription);
        if (resCl === true) {
            return ExceptionMessages.SUCCESS;
        }
        return ExceptionMessages.ERR_NOT_EXIST;
    }
    var isExist = subscriptFactory().isExistBookInTime(subscription);
    if (isExist) {
        return ExceptionMessages.ERR_TIME_CONFLICTS;
    }
    var resAdd = subscriptFactory().addSubscription(subscription);
    if (resAdd) {
        return ExceptionMessages.SUCCESS;
    }
    return ExceptionMessages.ERR_ABNORML;
}
module.exports = subscripController;