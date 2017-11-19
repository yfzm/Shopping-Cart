<template>
    <div id="index">
        <!--head-->
        <div class="list-head">
            <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-brand navbar-left">迷你书城</div>
                    <div class="navbar-text navbar-center">期待与你的每一次邂逅</div>
                    <form class="navbar-form navbar-right" role="search">
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search">
                        </div>
                        <button type="submit" class="btn btn-default">搜索</button>
                    </form>
                </div>
            </nav>

        </div>

        <!--body-->
        <div class="text-center">
            <s-item v-for="item in items" v-bind:single-item="item" v-on:addItem="addToCart"></s-item>
            <!--<s-item v-for="item in items" v-bind:single-item="item" v-on:convert="convertCad"></s-item>-->
        </div>

    </div>

</template>

<script>
    import item from './item.vue'

    export default {
        methods: {
            addToCart: function (singleItem, add_num) {
                this.$emit('addToCart', singleItem, add_num);
            },
//            convertCad: function (singleItem) {
//                if (singleItem.CAD) {
//                    singleItem.price = (singleItem.price * 0.9132).toFixed(2);
//                    singleItem.priceSign = "USD";
//                    singleItem.convertPrice = "CAD";
//                } else {
//                    singleItem.price = (singleItem.price / 0.9132).toFixed(2);
//                    singleItem.priceSign = "CAD";
//                    singleItem.convertPrice = "USD";
//                }
//                singleItem.CAD = !singleItem.CAD;
//            }
        },
        data: function () {
            return {
                items: [
                    {
                        name: '罪与罚',
                        price: '18.10',
                        description: '一部浸透着血和泪的社会悲剧，一部酣畅淋漓地剖析一个罪犯内心世界的心理小说，一部举世公认的、震撼灵魂的世界文学名著。',
                        author: '【俄】费奥多尔·陀思妥耶夫斯基',
                        date: '2003',
                        pic: '/src/assets/zyf.jpg',
                        num: 0,
                        isSelected: true
                    },
                    {
                        name: 'C++ Primer Plus(第6版)',
                        price: '99.00',
                        description: '经典C++教程十年新版再现，众多C++高手和读者好评如潮',
                        author: 'Stephen Prata',
                        date: '2016',
                        pic: '/src/assets/c++.jpg',
                        num: 0,
                        isSelected: true
                    },
                    {
                        name: '第一行代码 Android(第2版)',
                        price: '79.00',
                        description: '基于Android 7.0 难点、疑点透彻讲解 通俗易懂无废话 入门到上架一本通',
                        author: '郭霖',
                        date: '2016',
                        pic: '/src/assets/android.jpg',
                        num: 0,
                        isSelected: true
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
                        isSelected: true
                    },
                    {
                        name: 'The Great Gatsby',
                        price: '32.00',
                        description: '看一颗赤子之心，在镀金时代的浮华与虚无里，如何璀璨，又如何幻灭',
                        author: "F. Scott Fitzgerald",
                        date: '2013',
                        pic: '/src/assets/tgg.jpg',
                        num: 0,
                        isSelected: true
                    },
                    {
                        name: 'Qt5开发实战',
                        price: '99.00',
                        description: '基于多平台框架的应用程序开发实例详解',
                        author: "【韩】金大臣",
                        date: '2015',
                        pic: '/src/assets/qt.jpg',
                        num: 0,
                        isSelected: true
                    }
                ]
            }
        },
        components: {
            's-item': item
        }
    }
</script>

<style type="text/css" src="../assets/style/bootstrap.css"></style>

<style>
    #index {
        text-align: center;
    }

    body {
        padding-top: 70px;
    }

</style>
