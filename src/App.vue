<template>
    <div id="app">
        <page @addToCart="addToCart"></page>
        <cart v-bind:bookList="cartItems" v-on:update="update()"></cart>
    </div>
</template>

<script>
    import page from './component/index.vue'
    import cart from './component/cart.vue'

    export default {
        name: 'app',
        data() {
            return {
                'cartItems': []
            }
        },
        methods: {
            addToCart: function (singleItem, add_num) {
                singleItem.num = add_num;
                let hasIt = false;
                this.cartItems.map(item => {
                    if (item.name === singleItem.name) {
                        item.num = parseInt(item.num) + parseInt(singleItem.num);
                        item.isSelected = true;
                        hasIt = true;
                    }
                });
                if (!hasIt) {
                    this.cartItems.push(JSON.parse(JSON.stringify(singleItem)));
                }
            },
            update: function () {
                this.cartItems = this.cartItems.filter((item) => !item.isSelected);
            }
        },
        components: {
            page,
            cart
        }
    }
</script>

<style type="text/css" resource="/src/assets/style/bootstrap.css">
</style>
