import Vue from 'vue'
import cart from '@/component/cart'

let mBookList = [
    {
        name: '罪与罚',
        price: '18.10',
        description: '一部浸透着血和泪的社会悲剧，一部酣畅淋漓地剖析一个罪犯内心世界的心理小说，一部举世公认的、震撼灵魂的世界文学名著。',
        author: '【俄】费奥多尔·陀思妥耶夫斯基',
        date: '2003',
        pic: '/src/assets/zyf.jpg',
        num: 1,
        isSelected: false
    },
    {
        name: 'C++ Primer Plus(第6版)',
        price: '99.00',
        description: '经典C++教程十年新版再现，众多C++高手和读者好评如潮',
        author: 'Stephen Prata',
        date: '2016',
        pic: '/src/assets/c++.jpg',
        num: 2,
        isSelected: true
    },
    {
        name: '第一行代码 Android(第2版)',
        price: '79.00',
        description: '基于Android 7.0 难点、疑点透彻讲解 通俗易懂无废话 入门到上架一本通',
        author: '郭霖',
        date: '2016',
        pic: '/src/assets/android.jpg',
        num: 1,
        isSelected: false
    },
    {
        name: '深入理解计算机系统(第3版)',
        price: '239.00',
        description: '一本将计算机软件和硬件结合讲述的经典教材',
        author: "Randal E. Bryant   David R. O'Hallaron",
        date: '2017',
        pic: '/src/assets/ics.jpg',
        num: 0,
        isSelected: true
    },
    {
        name: 'And Then There Were None',
        price: '70.00',
        description: 'One of the very best, most genuinely bewildering Christies',
        author: "Agatha Christie",
        date: '2015',
        pic: '/src/assets/attwn.jpg',
        num: 0,
        isSelected: false
    }
];

function getRendered (Component, propsData) {
    const Ctor = Vue.extend(Component);
    return new Ctor({ propsData: propsData }).$mount();
    // console.log(vm);
    // console.log(vm.$el);
}

describe('cart.vue', () => {

    it('data域正常', () => {
        expect(typeof cart.data).to.be.equal('function');
        const defaultData = cart.data();
        expect(defaultData.p_show).to.be.equal(true);
        expect(defaultData.d_height).to.be.equal("60%");
        expect(defaultData.d_top).to.be.equal("40%");
        expect(defaultData.d_icon_path).to.be.equal('/src/assets/down.png');
        expect(defaultData.d_index).to.be.equal(undefined);
        expect(defaultData.bg_color).to.be.equal('#f8f8f8');
    });

    it('methods域正常', () => {
        expect(typeof cart.methods).to.be.equal('object');
        const defaultMethods = cart.methods;
        expect(typeof defaultMethods.deleteProducts).to.be.equal('function');
        expect(typeof defaultMethods.deleteOneProduct).to.be.equal('function');
        expect(typeof defaultMethods.purchase).to.be.equal('function');
        expect(typeof defaultMethods.chosen).to.be.equal('function');
        expect(typeof defaultMethods.quit).to.be.equal('function');
        expect(typeof defaultMethods.min_max).to.be.equal('function');
    });

    it('methods和computed正常工作', () => {
        let vm = getRendered(cart, {
            bookList: mBookList
        });

        expect(vm.bookList.length).to.be.equal(5);

        expect(vm.isSelectedAll).to.be.equal(false);
        expect(vm.getTotal.totalNum).to.be.equal(2);
        expect(vm.getTotal.totalPrice).to.be.equal('198.00');

    });

    it('DOM中各元素内容正确', () => {
        let ele = getRendered(cart, {
            bookList: mBookList
        }).$el;
        let nums = ele.querySelectorAll("#num");
        expect(nums[0].value).to.be.equal('1');
        expect(nums[1].value).to.be.equal('2');
        expect(nums[2].value).to.be.equal('1');
        expect(nums[3].value).to.be.equal('0');
        expect(nums[4].value).to.be.equal('0');

        expect(ele.querySelector(".total-num").innerText).to.be.equal("2");
        expect(ele.querySelector(".total-price").innerText).to.be.equal("￥ 198.00");
    });

});
