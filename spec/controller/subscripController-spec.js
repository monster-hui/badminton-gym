var subscrip = require("../../src/controller/subscripController.js");
var ExceptionMessages = require("../../src/util/exceptionMessages.js");
describe('subscripController', function () {
    var str1 = "abcdefghijklmnopqrst1234567890";
    var str2 = "U003 2018-08-01 19:00~22:00 B";
    var str3 = "U003 2018-08-01 19:00~22:00 B C";
    var str4 = "U002 2018-08-01 19:00~22:00 5";
    subscrip("U002 2018-08-01 19:00~22:00 A");
    it("return 'the booking is invalid!',when input a invaild string", function () {
        expect(subscrip(str1)).toBe(ExceptionMessages.ERR_INPUT_INVALID);
        expect(subscrip(str4)).toBe(ExceptionMessages.ERR_INPUT_INVALID);
    });
    it("return 'Error:the booking being cancelled does not exist!',when  input a cancel booking does not exist", function () {
        var cl1 = "U002 2018-08-02 19:00~22:00 C C";
        var cl2 = "U005 2018-08-02 19:00~22:00 A C";
        var cl3 = "U002 2018-08-02 19:00~22:00 B C";
        expect(subscrip(cl1)).toBe(ExceptionMessages.ERR_NOT_EXIST);
        expect(subscrip(cl2)).toBe(ExceptionMessages.ERR_NOT_EXIST);
        expect(subscrip(cl3)).toBe(ExceptionMessages.ERR_NOT_EXIST);
    });
    it("return 'Error: the booking conflicts with existing bookings!',when the time conflicts ", function () {
        var conflict1 = "U002 2018-08-01 19:00~22:00 A";
        var conflict2 = "U002 2018-08-01 18:00~20:00 A";
        var conflict3 = "U002 2018-08-01 20:00~22:00 A";
        var conflict4 = "U002 2018-08-01 20:00~22:00 A";
        expect(subscrip(conflict1)).toBe(ExceptionMessages.ERR_TIME_CONFLICTS);
        expect(subscrip(conflict2)).toBe(ExceptionMessages.ERR_TIME_CONFLICTS);
        expect(subscrip(conflict3)).toBe(ExceptionMessages.ERR_TIME_CONFLICTS);
        expect(subscrip(conflict4)).toBe(ExceptionMessages.ERR_TIME_CONFLICTS);
    });
    it("return 'Error: the booking has a past time',when this is past time", function () {
        var pass = "U002 2017-08-01 19:00~22:00 A";
        expect(subscrip(pass)).toBe(ExceptionMessages.ERR_POST_TIME);
    });
    it("return 'Success: the booking is accepted!',when success cancel  or add booking", function () {
        expect(subscrip(str2)).toBe(ExceptionMessages.SUCCESS);
        expect(subscrip(str3)).toBe(ExceptionMessages.SUCCESS);
    })
});