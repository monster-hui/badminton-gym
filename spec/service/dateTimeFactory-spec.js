/**
 * Created by wangxiaohui on 2017/9/10.
 */
var dateTimeFactory = require('../../src/service/dateTimeFactory.js');

describe('dateTimeFactory', function () {
    var obj = dateTimeFactory();
    it('is function  return a Object', function () {
        expect(typeof obj).toBe('object');
    });
    describe('have a stringToDate function,', function () {

        it('it can return null,if input is not date', function () {
            expect(obj.stringToDate('kkkk')).toBeNull();
            expect(obj.stringToDate('1999-12-33 12:10')).toBeNull();
        });
        it('it can return dateObject,if input is  date', function () {
            expect(obj.stringToDate('2017-09-10 10:20')).toEqual(new Date('2017-09-10 10:20'));
        });
    });
    describe('have a isfuture function,', function () {
        it('it can judge  whether is funture time', function () {
            expect(obj.isfuture(new Date(Date.now() + 100))).toBeTruthy();
            expect(obj.isfuture(new Date(Date.now()))).toBeFalsy();
        })
    });
    describe('have a getDay function,', function () {
        it('it can return number of weekDay', function () {
            expect(obj.getDay(new Date('2017-09-10'))).toBe(7);
            expect(obj.getDay(new Date('2017-09-11'))).toBe(1);
        })
    });
    describe('have a isTimeFrame function,', function () {
        it('it can  judge  whether is open timeFrame', function () {
            expect(obj.isTimeFrame(11, 15)).toBeTruthy();
            expect(obj.isTimeFrame(9, 19)).toBeTruthy();
            expect(obj.isTimeFrame(8, 11)).toBeFalsy();
            expect(obj.isTimeFrame(13, 23)).toBeFalsy();
        })
    })
});