<template xmlns:v="http://www.w3.org/1999/xhtml">
    <div class="container">
        <div class="row" v-bind:style="{'background-color': this.bg_color}" v-on:mouseover="chosen"
             v-on:mouseleave="quit">
            <div class="col-md-2">
                <a class="pull-left" href="javascript:;"><img :src="singleItem.pic" alt="" width="150" height="150"></a>
            </div>
            <div class="col-md-2">
                <div>
                    <strong>{{ singleItem.name }}</strong>
                    <p></p>
                    <p>作者：{{ singleItem.author }}</p>
                    <p>出版日期：{{ singleItem.date }}</p>
                </div>
            </div>
            <div class="col-md-3">
                <p>{{ singleItem.description }} </p>
            </div>
            <div class="col-md-1">
                <p>{{ singleItem.price }}</p>
            </div>
            <div class="col-md-4">

                <div class="form-inline">
                    <input type="number" class="form-control input-sm" v-model="itemNum" title="购买数量">
                    <!--<input type="number" class="span80" value="1" title="购买数量">-->
                    <a class="btn btn-default btn-sm" @click="addToCart"><i class="icon-shopping-cart"></i> 加入购物车</a>
                </div>

            </div>
            <!--<div class="clearfix"></div>-->
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
            convertCad() {
                this.$emit('convert', this.singleItem)
            },
            addToCart() {
                this.singleItem.num = parseInt(this.itemNum);
                this.$emit('addItem', this.singleItem);
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
    .span80 {
        width: 80px
    }

    .spacing {
        margin-top: 30px;
    }

    .hei150 {
        height: 150px;
        vertical-align: center;
    }

</style>

