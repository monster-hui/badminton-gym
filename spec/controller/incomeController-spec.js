var incomeController = require('../../src/controller/incomeController.js');
describe("incomeController", function () {
    it("can return incomes", function () {
        var st = "收入汇总\n---\n场地:A\n2018-08-01 19~22 200元\n小计:200元\n\n"
            + "场地:B\n小计:0元\n\n场地:C\n小计:0元\n\n场地:D\n小计:0元\n---\n总计:200元";
        expect(incomeController()).toBe(st);
    })
});