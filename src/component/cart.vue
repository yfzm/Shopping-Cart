<template>
    <div class="page-shopping-cart" id="shopping-cart" v-bind:style="{ height: d_height, top: d_top}">
        <div @click="min_max">
            <nav class="navbar navbar-default">
                <div class="container-fluid"></div>
                <div class="navbar-brand"><img class="pull-left" src="../assets/cart.png" alt="" width="20" height="20">&nbsp;&nbsp;购物车
                </div>
                <a class="pull-right"><img :src="this.d_icon_path" class="up-down" alt="隐藏"></a>
            </nav>
        </div>
        <!--<div v-if="p_show" class="clearfix"></div>-->
        <div v-if="p_show" class="cart-product-title container-fluid">
            <div class="row cart-item-title">
                <div class="col-sm-2">
                    <div class="checkbox">
                        <label for="select_all"><input type="checkbox" id="select_all">全选</label>
                    </div>
                    <!--<div class="td-check fl"><span class="check-span fl check-all" :class="{'check-true':isSelectAll}" @click="selectProduct(isSelectAll)"></span>全选</div>-->
                </div>
                <div class="col-sm-2">
                    <p class="form-control-static">商品</p>
                </div>
                <div class="col-sm-2">
                    <p class="form-control-static">单价(元)</p>
                </div>
                <div class="col-sm-2">
                    <p class="form-control-static">数量</p>
                </div>
                <div class="col-sm-2">
                    <p class="form-control-static">金额(元)</p>
                </div>
                <div class="col-sm-2">
                    <p class="form-control-static">操作</p>
                </div>
            </div>
        </div>
        <div v-if="p_show" class="cart-product container-fluid">
            <div class="row cart-item" v-for="(item, index) in bookList">
                <div class="col-sm-2">
                    <div class="checkbox">
                        <label for="check_item">
                            <input type="checkbox" id="check_item" v-model="item.isSelected">
                            <a class="td-product"><img :src="item.pic" width="50" height="50"></a>
                        </label>
                    </div>
                </div>
                <div class="col-sm-2">
                    <p class="form-control-static">{{ item.name }}</p>
                </div>
                <div class="col-sm-2">
                    <p class="form-control-static">{{ item.price }}</p>
                </div>
                <div class="col-sm-2">
                    <label for="num"><input id="num" class="form-control input-sm" type="number" title="num"
                                            v-model="item.num"></label>
                    <!--<div class="td-num">{{ item.num }}</div>-->
                </div>
                <div class="col-sm-2">
                    <p class="form-control-static">{{ item.num * item.price }}</p>
                </div>
                <div class="col-sm-2">
                    <a href="javascript:;" class="btn btn-warning btn-sm " @click="deleteOneProduct(index)"
                       role='button'>删除</a>
                </div>
                <!--<div class="cart-spacing"></div>-->
            </div>

        </div>
        <div v-if="p_show" class="cart-product-info">
            <a class="btn btn-danger btn-sm" href="javascript:;" @click="deleteProduct" role="button"><span></span>删除所选商品</a>
            <p class="form-control-static"><span>{{getTotal.totalNum}}</span>件商品总计（不含运费）：</p>
            <p class="form-control-static">￥<span>{{getTotal.totalPrice}}</span></p>
            <a class="btn btn-success" href="javascript:;" role="button">去结算</a>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['bookList'],
        data: function () {
            return {
                p_show: true,
                d_height: "50%",
                d_top: "50%",
                d_icon_path: '/src/assets/down.png'
//        bookList: [
//          {
//            name: 'C++ Primer Plus(第6版)',
//            price: '99.00',
//            description: '经典C++教程十年新版再现，众多C++高手和读者好评如潮',
//            author: 'Stephen Prata',
//            date: '2016',
//            pic: '',
//            num: 1,
//            isSelected: true
//          }
//        ]
            }
        },
        computed: {
            //检测是否全选
            isSelectAll: function () {
                //如果productList中每一条数据的select都为true，返回true，否则返回false;
                return this.bookList.every(function (val) {
                    return val.select
                });
            },
            //获取总价和产品总件数
            getTotal: function () {
                //获取productList中select为true的数据。
                var _proList = this.bookList.filter(function (val) {
                    return val.select
                }), totalPrice = 0;
                for (var i = 0, len = _proList.length; i < len; i++) {
                    //总价累加
                    totalPrice += _proList[i].pro_num * _proList[i].pro_price;
                }
                //选择产品的件数就是_proList.length，总价就是totalPrice
                return {totalNum: _proList.length, totalPrice: totalPrice}
            }
        },
        methods: {
            //全选与取消全选
            selectProduct: function (_isSelect) {
                //遍历productList，全部取反
                for (var i = 0, len = this.bookList.length; i < len; i++) {
                    this.bookList[i].select = !_isSelect;
                }
            },
            //删除已经选中(select=true)的产品
            deleteProduct: function () {
                this.bookList = this.bookList.filter(function (item) {
                    return !item.select
                })
            },
            //删除单条产品
            deleteOneProduct: function (index) {
                //根据索引删除productList的记录
                this.bookList.splice(index, 1);
            },
            min_max: function () {
                if (this.p_show) {
                    this.p_show = !this.p_show;
                    this.d_height = "8%";
                    this.d_top = "92%";
                    this.d_icon_path = '/src/assets/up.png'

                } else {
                    this.p_show = !this.p_show;
                    this.d_height = "50%";
                    this.d_top = "50%";
                    this.d_icon_path = '/src/assets/down.png'
                }
            }
        },
//        mounted: function () {
//            var _this = this;
//            //为productList添加select（是否选中）字段，初始值为true
//            this.bookList.map(function (item) {
//                _this.$set(item, 'select', true);
//            })
//        }

    }
</script>

<style type="text/css" resource="/src/assets/style/bootstrap.css"></style>

<style>
    #shopping-cart {
        position: fixed;
        right: 0;
        overflow: hidden;
        z-index: 99;
        /*border: 1px solid #c00;*/
        background: #ebebeb;
        /*background: #F9EFFC;*/
        width: 40%;
        /*height: 50%;*/
        font-size: 12px;
        margin: 0;
        display: block;
        /*top: 50%;*/
        visibility: visible;
        opacity: 1;
    }

    .cart-product {
        width: 100%;
        height: 60%;
        overflow: scroll;
    }

    .cart-item-title {
        margin-top: 0
    }

    /*.cart-item {*/
        /*margin-top: 20px;*/
    /*}*/

    .up-down {
        margin-top: 10px;
        margin-right: 30px;
        width: 25px;
        height: 25px;
    }

</style>


