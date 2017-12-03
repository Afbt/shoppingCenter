<template>
  <div id="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车</h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          {{values}}
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <el-button type="primary">全选</el-button>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-if='chaCar.length==0'>
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-for='(item,index) in chaCar' :key="item.id">
                  <th width="48" align="center">
                    <el-switch v-model="values[index]" @change='goods(index,item.id)' on-text='确认' off-text='取消' on-color="#13ce66" off-color="#ff4949">
                    </el-switch>

                  </th>
                  <th align="left" colspan="2">
                    <img width="60px" height="60px" :src="item.img_url" alt="">{{item.title}}</th>
                  <th width="84" align="left">{{item.sell_price}}</th>
                  <th width="104" align="center">
                    <!-- {{item.buycount}} -->
                    <inputnmber v-bind:obj="{gid:item.id,count:item.buycount}" @msg="getinputnumber">

                    </inputnmber>

                  </th>
                  <th width="104" align="lseft">{{item.sell_price*item.buycount}}</th>
                  <th width="54" align="center">
                    <a href="javascript:;" @click='delEte(index,item.id)'>删除</a>
                  </th>
                </tr>
                <tr>
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">{{num}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">{{tota}}</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" >继续购物</button>
              <button class="submit" @click='shopping'>立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getItem,
    delItem,
    setItemes,
    qiuhe
  } from '../../globalCommunication/localStorageBaseDao.js'
  import {
    vueGlobal,
    vm
  } from '../../globalCommunication/bus.js'
  import inputnmber from '../subcom/inputnmber.vue'


  export default {
    components: {
      inputnmber
    }, //注册子组件
    data() {
      return {
        chaCar: [],
        id: [],
        layout: 0,
        tota: 0,
        num: 0,
        values: [],
        boolea: false
      }
    },
    mounted() {
      this.getCar()

    },
    watch: {

    },  
    methods: {
      shopping(){
        this.$router.push({name:'shoppings',params:{goodsId:'103,90'}})//通过点击事件里的路由跳转到订单页面
      },
      inception() {
        // var objs =[]
        // for (let i = 0; i < this.chaCar.length; i++) {
        //   objs.push(false)
        // }
        // this.values=objs
      },
      goods(val, va2) {
        this.boolea = !this.boolea
        var objs = []
        for (let i = 0; i < this.chaCar.length; i++) {
          if (i == val) {
            this.values[i] = this.boolea
            }
          }
            var sell_price = []
            var buycount = []
            var tota = 0
            var num = 0
            for (let j = 0; j < this.chaCar.length; j++) {
              if (j == val&&this.boolea==true ) {
                sell_price.push(this.chaCar[j].sell_price)
                buycount.push(this.chaCar[j].buycount)

                tota += (sell_price[0] - 0) * (buycount[0] - 0)
                num += ((buycount[0] - 0))
                console.log(tota,num );
              }
          }
            this.num = num
            this.tota = tota
        // this.values=objs
      },
      alLnumber() { //计算商品总数
        console.log(this.chaCar);
        var sell_price = []
        var buycount = []
        var tota = 0
        var num = 0
        for (let i = 0; i < this.chaCar.length; i++) {
          sell_price.push(this.chaCar[i].sell_price)
          buycount.push(this.chaCar[i].buycount)
          tota += (sell_price[i] - 0) * (buycount[i] - 0)
          num += ((buycount[i] - 0))
        }
        this.num = num
        this.tota = tota
      },
      getinputnumber(val) { //添加和减少商品数量  按钮
        vueGlobal.$emit(vm, val) //触发事件传值
        for (let i = 0; i < this.chaCar.length; i++) {
          if (this.chaCar[i].id == val.gid) {
            this.chaCar[i].buycount = val.add
          }
        }
        this.alLnumber()
      },
      cha() { //查询数据的封装
        var obj = getItem()
        var idObj = []
        var zhiObj = []
        for (var key in obj) {
          idObj.push(key) //请求数据需要的id
          zhiObj.push(obj[key]) //每件商品在购物车的数量
        }
        this.id = idObj
        this.$ajax.get('/site/comment/getshopcargoods/' + this.id)
          .then(res => {
            for (var i = 0; i < zhiObj.length; i++) {
              res.data.message[i].buycount = zhiObj[i]
            }
            this.chaCar = res.data.message
          })
      },
      delEte(index, inID) {
        this.id.splice(index, 1) //删除数据模型数组里用于ajax请求中的某个数据
        this.layout = delItem(inID) //删除的locaStorage里的数据 buyGoods中的某条数据 并返回一个值（这个值是删除数据的值就是该商品的购物车件数） 
        this.values.splice(index, 1)
        this.cha()
        vueGlobal.$emit(vm, (-this.layout))
      },
      getCar() {
        this.cha()
      }
    }
  }
</script>
<style>

</style>