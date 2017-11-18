<template>
  <div id="app">
    <page @addToCart="addToCart"></page>
    <cart v-bind:bookList="cartItems"></cart>
  </div>
</template>

<script>
import page from './component/index.vue'
import cart from './component/cart.vue'

export default {
  name: 'app',
  data () {
    return {
      'cartItems': [
//        {
//          name: 'C++ Primer Plus(第6版)',
//          price: '99.00',
//          description: '经典C++教程十年新版再现，众多C++高手和读者好评如潮',
//          author: 'Stephen Prata',
//          date: '2016',
//          pic: '',
//          num: 1
//        }
      ]
    }
  },
  methods: {
    addToCart: function (singleItem) {
      let hasIt = false;
      this.cartItems.map(item => {
        if (item.name === singleItem.name) {
//          alert("App.vue: " + singleItem.num)
          item.num = parseInt(item.num) + parseInt(singleItem.num);
          hasIt = true;
        }
      });
      if (!hasIt) {
          this.cartItems.push(JSON.parse(JSON.stringify(singleItem)));
//          this.cartItems.push(singleItem);
      }
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
