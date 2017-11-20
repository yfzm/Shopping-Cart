<template>
    <div class="page-shopping-cart" id="shopping-cart" v-bind:style="{ height: d_height, top: d_top}">
        <div @click="min_max" id="cart-navbar" title="点我显示/隐藏购物车">
            <nav class="navbar navbar-default">
                <div class="container-fluid"></div>
                <div class="navbar-brand"><img class="pull-left" src="../assets/cart.png" alt="" width="20" height="20">&nbsp;&nbsp;购物车
                </div>
                <a class="pull-right"><img :src="this.d_icon_path" class="up-down" alt="隐藏"></a>
            </nav>
        </div>
        <div v-if="p_show" class="cart-product-title container-fluid">
            <div class="row cart-item-title">
                <div class="col-sm-2">
                    <div class="checkbox">
                        <label for="select_all"><input type="checkbox" id="select_all" v-model="isSelectedAll">全选</label>
                    </div>
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
        <div v-if="p_show" class="cart-product">
            <div class="cart-item container-fluid" v-for="(item, index) in bookList">
                <div class="row item-row" v-bind:style="{ 'background-color': (index === d_index) ? '#ebebeb' : '#f8f8f8' }" v-on:mouseover="chosen(index)" v-on:mouseleave="quit">
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
                                                min="1" max="1000" step="1"
                                                onkeyup="this.value=this.value.replace(/\D/g,'')"
                                                onafterpaste="this.value=this.value.replace(/\D/g,'')"
                                                v-model="item.num"></label>
                        <!--<div class="td-num">{{ item.num }}</div>-->
                    </div>
                    <div class="col-sm-2">
                        <p class="form-control-static">{{ (item.num * item.price).toFixed(2) }}</p>
                    </div>
                    <div class="col-sm-2">
                        <a href="javascript:;" class="btn btn-warning btn-sm " @click="deleteOneProduct(index)"
                           role='button'>删除</a>
                    </div>
                </div>

                <!--<div class="cart-spacing"></div>-->
            </div>

        </div>
        <div v-if="p_show" class="cart-product-info">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <a class="btn btn-danger btn-sm" href="javascript:;" @click="deleteProducts()" role="button">删除所选商品</a>
                    </div>
                    <div class="col-md-6 col-md-offset-1">
                        <p class="form-control-static"><span class="total-num">{{ getTotal.totalNum }}</span>&nbsp;&nbsp;&nbsp;种商品总计（不含运费）：<span class="lead total-price">￥&nbsp;{{ getTotal.totalPrice }}</span></p>
                    </div>
                    <div class="col-md-2">
                        <a class="btn btn-success" href="javascript:;" role="button" @click="purchase">去结算</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: ['bookList'],
        data: function () {
            return {
                p_show: true,
                d_height: "60%",
                d_top: "40%",
                d_icon_path: '/src/assets/down.png',
                d_index: undefined,
                bg_color: '#f8f8f8'
            }
        },
        computed: {
            //检测是否全选
            isSelectedAll: {
                get: function () {
                    //如果productList中每一条数据的select都为true，返回true，否则返回false;
                    for (let i = 0, len = this.bookList.length; i < len; i++) {
                        if (!this.bookList[i].isSelected) {
                            return false;
                        }
                    }
                    return true;
                },
                set: function (pSelected) {
                    for (let i = 0, len = this.bookList.length; i < len; i++) {
                        this.bookList[i].isSelected = pSelected;
                    }
                }
            },
            //获取总价和产品总件数
            getTotal: function () {
//                alert("getTotal");
                let selected_books = this.bookList.filter(function (val) {
                    return val.isSelected
                });
                let totalPrice = 0;
                for (let i = 0, len = selected_books.length; i < len; i++) {

                    totalPrice += selected_books[i].num * selected_books[i].price;
                }
                return {
                    totalNum: selected_books.length,
                    totalPrice: totalPrice.toFixed(2)
                }
            }
        },
        methods: {
            // 删除已经选中(isSelected=true)的产品
            deleteProducts: function () {
                console.log(this.bookList);
                // 子模块中不允许修改props，故使用emit移交父模块处理
                this.$emit('update');
            },
            // 删除单条产品
            deleteOneProduct: function (index) {
                //根据索引删除productList的记录
                this.bookList.splice(index, 1);
            },
            // 付款
            purchase: function () {
                alert("共需付款 " + this.getTotal.totalPrice + " 元");
            },
            chosen(index) {
                this.d_index = index;
            },
            quit() {
                this.d_index = undefined;
            },
            // 显示或隐藏
            min_max: function () {
                if (this.p_show) {
                    this.p_show = !this.p_show;
                    this.d_height = "8%";
                    this.d_top = "92%";
                    this.d_icon_path = '/src/assets/up.png'

                } else {
                    this.p_show = !this.p_show;
                    this.d_height = "60%";
                    this.d_top = "40%";
                    this.d_icon_path = '/src/assets/down.png'
                }
            }
        }
    }
</script>

<style type="text/css" resource="/src/assets/style/bootstrap.css"></style>

<style>
    #shopping-cart {
        position: fixed;
        right: 0;
        overflow: hidden;
        z-index: 99;
        background: #f8f8f8;
        width: 40%;
        font-size: 12px;
        margin: 0;
        display: block;
        visibility: visible;
        opacity: 1;
    }

    .cart-product {
        width: 100%;
        height: 65%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .cart-item-title {
        margin-top: 0
    }

    .up-down {
        margin-top: 10px;
        margin-right: 30px;
        width: 25px;
        height: 25px;
    }

    .total-price {
        font: bold 20px 'impact';
    }

    .total-num {
        font: italic 13px 'arial';
    }

</style>


