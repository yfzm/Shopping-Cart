let add = require('./../src/add_for_init_mochaTest.js');
let expect = require('chai').expect;

describe('加法函数测试', function() {
    it('1 + 1应该等于2', function() {
        expect(add(1,1)).to.be.equal(2);
    });
});