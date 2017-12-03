<template>
  <div class="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="javascript:;">支付中心</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit pay">
            <a href="javascript:;" class="selected">支付中心</a>
          </div>
          <div class="form-box payment">
            <div class="el-row">
              <div class="el-col el-col-16">
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>订 单 号：</dt>
                      <dd>{{payments.order_no}}</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>收货人姓名：</dt>
                      <dd>{{payments.accept_name}}</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>送货地址：</dt>
                      <dd>{{payments.area}}
                      </dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>手机号码：</dt>
                      <dd>暂无手机号数据</dd>
                    </dl>
                  </div>
                </div>
                <div class="el-row">
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付金额：</dt>
                      <dd>{{payments.order_amount}} 元</dd>
                    </dl>
                  </div>
                  <div class="el-col el-col-12">
                    <dl class="form-group">
                      <dt>支付方式：</dt>
                      <dd>在线支付</dd>
                    </dl>
                  </div>
                </div>
                <div class="message">
                  <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                  <span>{{payments.message}}</span>
                </div>
              </div>
              <div class="el-col el-col-8">
                <div id="container">
                  <span @click='onlinePayment'>支付二维码</span>
                  <vue-qart :config="config" :downloadButton="downloadButton"></vue-qart>
                  <canvas width="300" height="300"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
  import VueQart from 'vue-qart'
  export default {
    components: {
      VueQart
    }, //注册下二维码的组件
    data() {
      return {
        payments: [],
        config: {
          value: 'https://www.baidu.com',
          imagePath: '../../../statics/vue img/logo.png',
          filter: 'color'
        },
        downloadButton: false
      }
    },
    mounted() {
      this.payment()
      // setInterval(()=>{
      this.$ajax.get('/site/validate/order/getorder/' + this.$route.params.id)
        .then(res => {


          // if ( res.data.message[0].status == 2) {
          //   clearInterval()
          // }
          // this.$router.push({path:'/seit/paymentSuccess'})
        })
      // },300)
    },
    methods: {
      payment() { //通过get请求查询到要支付的订单信息
        this.$ajax.get('/site/validate/order/getorder/' + this.$route.params.id)
          .then(res => {
            if (res.data.status == 1) {
              return
            }
            this.payments = res.data.message[0]
          })
      },
      onlinePayment() { //跳转到模拟的手机支付页面
        this.$router.push({
          path: "/payamount/" + this.$route.params.id
        })
      }
    }
  }
</script>
<style scoped>

</style>