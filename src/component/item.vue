<template>
  <div class="tab">
    <div class="col col1">
      <a href="#"><img :src="singleItem.pic" alt="" width="100" height="100"></a>
    </div>
    <div class="col col2">
      <p>{{ singleItem.name }}</p>
      <p>{{ singleItem.description }} </p>
    </div>
    <div class="col col3">
      <p>{{ singleItem.price }}</p>
    </div>
    <div class="col col4">
      <p @click="addToCart">加入购物车</p>
    </div>
  </div>
</template>

<script>
  export default{
    props:['singleItem'],
    methods:{
      convertCad(){
        this.$emit('convert', this.singleItem)
      },
      addToCart() {
        this.$emit('addItem', this.singleItem);
      }
    }
  }
</script>

<style>

</style>
