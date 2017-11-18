<template>
  <div class="page-shopping-cart" id="shopping-cart">
    <div class="cart-title">
      <h4 class="cart-title">购物车</h4>
      <div class="mini">最小化</div>
    </div>
    <div class="cart-product-title clearfix">
      <div class="td-check fl"><span class="check-span fl check-all" :class="{'check-true':isSelectAll}" @click="selectProduct(isSelectAll)"></span>全选</div>
      <div class="td-product fl">商品</div>
      <div class="td-num fl">数量</div>
      <div class="td-price fl">单价(元)</div>
      <div class="td-total fl">金额(元)</div>
      <div class="td-do fl">操作</div>
    </div>
    <div class="cart-product clearfix">
      <table>
        <tbody>
        <!--遍历的时候带上索引-->
        <tr v-for="(item, index) in bookList">
          <td class="td-check"><span class="check-span" @click="item.select=!item.select" :class="{'check-true':item.select}"></span></td>
          <td class="td-product"><img :src="item.pic" width="50" height="50">
            <div class="product-info">
              <h6>{{item.name}}</h6>
              <p>{{item.description}}</p>
              <p>作者:{{item.author}}&nbsp;&nbsp;出版日期：{{item.date}}</p>
            </div>
            <div class="clearfix"></div>
          </td>
          <td class="td-num">
            <div class="product-num">
              <a href="javascript:;" class="num-reduce num-do fl" @click="item.pro_num>0?item.pro_num--:''"><span></span></a>
              <input type="text" class="num-input" v-model="item.pro_num">
              <a href="javascript:;" class="num-add num-do fr" @click="item.num++"><span></span></a>
            </div>
          </td>
          <td class="td-price">
            <p class="red-text">￥<span class="price-text">{{item.price}}</span></p>
          </td>
          <td class="td-total">
            <p class="red-text">￥<span class="total-text">{{item.price*item.num}}</span>.00</p>
          </td>
          <td class="td-do"><a href="javascript:;" class="product-delect" @click="deleteOneProduct(index)">删除</a></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="cart-product-info">
      <a class="delect-product" href="javascript:;" @click="deleteProduct"><span></span>删除所选商品</a>
      <a class="keep-shopping" href="#"><span></span>继续购物</a>
      <a class="btn-buy fr" href="javascript:;">去结算</a>
      <p class="fr product-total">￥<span>{{getTotal.totalPrice}}</span></p>
      <p class="fr check-num"><span>{{getTotal.totalNum}}</span>件商品总计（不含运费）：</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['bookList'],
//    data: function() {
//      return {
//        bookList: [
//          {
//            name: 'C++ Primer Plus(第6版)',
//            price: '99.00',
//            description: '经典C++教程十年新版再现，众多C++高手和读者好评如潮',
//            author: 'Stephen Prata',
//            date: '2016',
//            pic: '',
//            num: 1
//          }
//        ]
//      }
//    },
    computed: {
      //检测是否全选
      isSelectAll:function(){
        //如果productList中每一条数据的select都为true，返回true，否则返回false;
        return this.bookList.every(function (val) { return val.select});
      },
      //获取总价和产品总件数
      getTotal:function(){
        //获取productList中select为true的数据。
        var _proList=this.bookList.filter(function (val) { return val.select}),totalPrice=0;
        for(var i=0,len=_proList.length;i<len;i++){
          //总价累加
          totalPrice+=_proList[i].pro_num*_proList[i].pro_price;
        }
        //选择产品的件数就是_proList.length，总价就是totalPrice
        return {totalNum:_proList.length,totalPrice:totalPrice}
      }
    },
    methods: {
      //全选与取消全选
      selectProduct:function(_isSelect){
        //遍历productList，全部取反
        for (var i = 0, len = this.bookList.length; i < len; i++) {
          this.bookList[i].select = !_isSelect;
        }
      },
      //删除已经选中(select=true)的产品
      deleteProduct:function () {
        this.bookList=this.bookList.filter(function (item) {return !item.select})
      },
      //删除单条产品
      deleteOneProduct:function (index) {
        //根据索引删除productList的记录
        this.bookList.splice(index,1);
      },
    },
    mounted: function () {
      var _this=this;
      //为productList添加select（是否选中）字段，初始值为true
      this.bookList.map(function (item) {
        _this.$set(item, 'select', true);
      })
    }

  }
</script>

<style>
  #shopping-cart {
    position: fixed;
    right: 0;
    overflow: hidden;
    z-index: 99;
    border: 1px solid #c00;
    background: #F9EFFC;
    width: 40%;
    height: 50%;
    font-size: 12px;
    margin: 0;
    display: block;
    top: 50%;
    visibility: visible;
    opacity: 1;
  }
  .cart-product {
    width: 100%;
    height: 80%;
    overflow: scroll;
  }
</style>
