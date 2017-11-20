<template xmlns:v="http://www.w3.org/1999/xhtml">
    <div class="container">
        <div class="row" v-bind:style="{'background-color': this.bg_color}" v-on:mouseover="chosen"
             v-on:mouseleave="quit">
            <div class="col-md-2">
                <a class="pull-left" href="javascript:;"><img :src="singleItem.pic" alt="" width="120" height="120"></a>
            </div>
            <div class="col-md-2">
                <div>
                    <strong>{{ singleItem.name }}</strong>
                    <p></p>
                    <p class="item-author">作者：{{ singleItem.author }}</p>
                    <p class="item-date">出版日期：{{ singleItem.date }}</p>
                </div>
            </div>
            <div class="col-md-3">
                <p class="item-description">{{ singleItem.description }}</p>
            </div>
            <div class="col-md-1">
                <p class="item-price">￥{{ singleItem.price }}</p>
            </div>
            <div class="col-md-4">

                <div class="form-inline">
                    <input type="number" min="1" max="1000" step="1"
                           onkeyup="this.value=this.value.replace(/\D/g,'')"
                           onafterpaste="this.value=this.value.replace(/\D/g,'')"
                           class="form-control input-sm item-num" v-model="itemNum" title="购买数量">
                    <a class="btn btn-default btn-sm item-button" @click="addToCart"><img src="../assets/cart_mini.png" alt=""> 加入购物车</a>
                </div>

            </div>
        </div>
        <div class="spacing"></div>
    </div>
</template>

<script>
    export default {
        props: ['singleItem'],
        data: function () {
            return {
                itemNum: 1,
                bg_color: '#ffffff'
            }
        },
        methods: {
            addToCart() {
                this.$emit('addItem', this.singleItem, this.itemNum);
            },
            chosen() {
                this.bg_color = "#ebebeb";
            },
            quit() {
                this.bg_color = "#ffffff";
            }
        }
    }
</script>

<style type="text/css" src="../assets/style/bootstrap.css"></style>

<style>

    .spacing {
        margin-top: 30px;
    }

    .item-price {
        color: #ff4500;
        font-size: 15px;
    }

    .item-author, .item-date {
        color: #808080
    }

    .item-description {
        color: #606060
    }

</style>

