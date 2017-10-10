/**
 * Created by wangxiaohui on 2017/9/9.
 */

var Subscription = require('../../src/models/subscription.js');

describe('Subscription', function () {


    it('is null if Subscription do not set ‘ userId, date,start,end, site,day’ ', function () {
        var firstSubscription = Subscription();
        expect(firstSubscription).toBeNull();

    });
    describe("is not null ,it", function () {
        var secondSubscription = new Subscription("U002", "2016-05-07", "20", "22", "A");

        it('has a userId', function () {

            expect(secondSubscription.userId).toEqual('U002');
        });

        it('has a date', function () {
            expect(secondSubscription.date).toEqual('2016-05-07');
        });

        it('has a start', function () {
            expect(secondSubscription.start).toEqual('20');
        });
        it('has a end', function () {
            expect(secondSubscription.end).toEqual('22');
        });
        /* it('has a day', function () {
         expect(secondSubscription.day).toEqual('6');
         });*/

        it('has a site', function () {
            expect(secondSubscription.site).toEqual('A');
        });
        it('has cancel is false if cancel is undefined', function () {
            expect(secondSubscription.cancel).toBeFalsy();
        });

        it('has a cancel is true,if input cancel is true', function () {
            var thridSubscription = new Subscription("U002", "2016-05-07", "20", "22", "A", true);
            expect(thridSubscription.cancel).toBeTruthy();
        });
        /*
         it('has a sayTime function ', function () {
         expect(secondSubscription.sayTime()).toEqual('2016-05-07 20:00~22:00');
         });*/
    })


});