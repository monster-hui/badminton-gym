/**
 * Created by wangxiaohui on 2017/9/10.
 */
var factory = require('../../src/service/subscriptFactory.js');
var Subscription = require('../../src/models/subscription.js');

describe('factory', function () {
    var obj = factory();
    var subscription1 = new Subscription('U002', '2018-08-01', 19, 22, 'A', false);
    var subscription2 = new Subscription('U002', '2018-08-01', 19, 22, 'A', true);
    it('rerutn object', function () {
        expect(typeof obj).toBe('object');
    });
    describe('have a cutSubscriptionString function,', function () {
        it('it can get a Subscription object ,when the string is valid', function () {
            var cut1 = obj.cutSubscriptionString("U002 2018-08-01 19:00~22:00 A");
            var cut2 = obj.cutSubscriptionString("U002 2018-08-01 19:00~22:00 A C");
            expect(cut1).toEqual(subscription1);
            //    expect(cut1.sayTime()).toEqual(subscription1.sayTime());
            expect(cut2).toEqual(subscription2);
        });
        it('it can get null,when the string is invalid ', function () {
            var cut1 = obj.cutSubscriptionString("U002 2017-08-01 19:00~22:00 K");
            var cut2 = obj.cutSubscriptionString("U002 2017-08-01 19:00~22:00 ");
            var cut3 = obj.cutSubscriptionString("U002f 2017-08-01 19:00~23:00 A");
            var cut4 = obj.cutSubscriptionString("U002 2017-08-01 19:00~23:00 A A");
            var cut5 = obj.cutSubscriptionString("U002 2017/08/01 19:00~22:00 A");
            expect(cut1).toBeNull();
            expect(cut2).toBeNull();
            expect(cut3).toBeNull();
            expect(cut4).toBeNull();
            expect(cut5).toBeNull();
        });

    });
    describe('have a findSites function,', function () {
        var findSites = obj.findSites;
        it('can get a sites Array  ', function () {
            expect(findSites()).toEqual(["A", "B", "C", "D"]);
        })
    });
    describe('have a findSubscriptionsBySite function,', function () {
        var find = obj.findSubscriptionsBySite;
        it('can get a Array about subscriptions in the site ', function () {
            expect(find("A")).toContain({
                userId: 'U002',
                date: '2018-08-01',
                start: 19,
                end: 22,
                site: 'A',
                cancel: false
            });
        });
        it("it can return  null,when site is not saved", function () {
            var a = obj.findSubscriptionsBySite('E');
            expect(a).toBeNull();
        })
    });

    describe('have a isExistBookInTime function,', function () {
        var isExist = obj.isExistBookInTime;
        it("it judge whether  the booking conflicts with existing bookings!", function () {
            var subscription3 = new Subscription('U002', '2018-08-01', 19, 10, 'A', false);
            var subscription4 = new Subscription('U002', '2018-08-01', 18, 20, 'A', false);
            var subscription5 = new Subscription('U002', '2018-08-01', 18, 19, 'A', false);
            expect(isExist(subscription1)).toBeTruthy();
            expect(isExist(subscription3)).toBeTruthy();
            expect(isExist(subscription4)).toBeTruthy();
            expect(isExist(subscription5)).toBeFalsy();
        });
        it("it can return  -1 ,when input is invalid", function () {
            var subscription6 = new Subscription();
            expect(isExist(subscription6)).toBe(-1);
        })
    });

    describe('have a cancelSubscription function,', function () {
        var cl = obj.cancelSubscription;
        it("it can cancel a subscription,when input a subscription is saved", function () {
            expect(cl(subscription1)).toBeTruthy();
        });
        it("it can return  -1,when input a subscription isnot saved or invalid", function () {
            var subscription6 = new Subscription();
            var subscription3 = new Subscription('U002', '2017-08-01', 19, 10, 'A', true);
            expect(cl(subscription6)).toBe(-1);
            expect(cl(subscription3)).toBe(-1);
        })
    });

    describe('have a addSubscription function,', function () {
        var add = obj.addSubscription;
        it("it can add a subscription,when input a subscription with time is not booking", function () {
            expect(add(subscription2)).toBeTruthy();
        });
        it("it can return false,when input a subscription is invalid", function () {
            var sub = new Subscription();
            expect(add(sub)).toBeFalsy();
        })
    })
});