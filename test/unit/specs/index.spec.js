import Vue from 'vue'
import index from '@/component/index'

describe('index.vue', () => {
    it("DOM加载正常", () => {
        const vm = new Vue(index).$mount();
        expect(vm.$el.querySelector("#index-title").innerText).to.be.equal("迷你书城");
        expect(vm.$el.querySelector("#index-description").innerText).to.be.equal("期待与你的每一次邂逅");
    });

    it("methods域正常", () => {
        expect(typeof index.methods).to.be.equal("object");
        expect(typeof index.methods.addToCart).to.be.equal("function");
    })
});
