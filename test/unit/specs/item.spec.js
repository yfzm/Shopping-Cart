import Vue from 'vue'
import item from '@/component/item'

function getRendered (Component, propsData) {
    const Ctor = Vue.extend(Component);
    return new Ctor({ propsData: propsData }).$mount();
    // console.log(vm);
    // console.log(vm.$el);
}

describe('item.vue', () => {

    it('data域正常', () => {
        expect(typeof item.data).to.be.equal('function');
        const defaultData = item.data();
        expect(defaultData.itemNum).to.be.equal(1);
        expect(defaultData.bg_color).to.be.equal('#ffffff');
    });

    it('methods域正常', () => {
        expect(typeof item.methods).to.be.equal('object');
        const defaultMethods = item.methods;
        expect(typeof defaultMethods.addToCart).to.be.equal('function');
        expect(typeof defaultMethods.chosen).to.be.equal('function');
        expect(typeof defaultMethods.quit).to.be.equal('function');
        let vm = getRendered(item, {
            singleItem: {
                name: '罪与罚',
                price: '18.10',
                description: '一部浸透着血和泪的社会悲剧，一部酣畅淋漓地剖析一个罪犯内心世界的心理小说，一部举世公认的、震撼灵魂的世界文学名著。',
                author: '【俄】费奥多尔·陀思妥耶夫斯基',
                date: '2003',
                pic: '/src/assets/zyf.jpg',
                num: 0,
                isSelected: true
            }
        });
        expect(vm.singleItem.num).to.be.equal(0);
        vm.addToCart();
        expect(vm.itemNum).to.be.equal(1);
        expect(vm.singleItem.num).to.be.equal(0);
        vm.chosen();
        expect(vm.bg_color).to.be.equal('#ebebeb');
        vm.quit();
        expect(vm.bg_color).to.be.equal('#ffffff');
    });

    it('DOM中各元素内容正确', () => {
        let ele = getRendered(item, {
            singleItem: {
                name: '罪与罚',
                price: '18.10',
                description: '一部浸透着血和泪的社会悲剧，一部酣畅淋漓地剖析一个罪犯内心世界的心理小说，一部举世公认的、震撼灵魂的世界文学名著。',
                author: '【俄】费奥多尔·陀思妥耶夫斯基',
                date: '2003',
                pic: '/src/assets/zyf.jpg',
                num: 0,
                isSelected: true
            }
        }).$el;
        expect(ele.querySelector("strong").innerText).to.be.equal('罪与罚');
        expect(ele.querySelector(".item-author").innerText).to.be.equal('作者：【俄】费奥多尔·陀思妥耶夫斯基');
        expect(ele.querySelector(".item-price").innerText).to.be.equal('18.10');
        expect(ele.querySelector(".item-description").innerText).to.be.equal('一部浸透着血和泪的社会悲剧，一部酣畅淋漓地剖析一个罪犯内心世界的心理小说，一部举世公认的、震撼灵魂的世界文学名著。');
        expect(ele.querySelector(".item-date").innerText).to.be.equal('出版日期：2003');
    });

});
