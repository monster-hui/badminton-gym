/**
 * Created by wangxiaohui on 2017/9/10.
 */
var incomeService = require('../../src/service/incomeService.js');
var Subscription = require('../../src/models/subscription.js');
describe("incomeService", function () {
    var income = incomeService();
    it('is function  return a Object', function () {
        expect(typeof income).toBe('object');
    });
    describe('have a getOrderIncome function,', function () {
        var getOrderIncome = income.getOrderIncome;
        it('it can return -1,if input is null', function () {
            var subscription = Subscription();
            // expect(subscription).toBeNull();
            expect(getOrderIncome(subscription)).toEqual(-1);
        });

        it("it can return rental income,if input a vaild subscription", function () {
            var subscription = new Subscription('U002', '2017-08-01', 19, 22, 'A', false);
            expect(getOrderIncome(subscription)).toEqual(200);
        });
        it("it can return penalty income,if input a vaild canel subscription", function () {
            var subscription = new Subscription('U002', '2017-08-01', 19, 22, 'A', true);
            expect(getOrderIncome(subscription)).toEqual(100);
        });
    })

});