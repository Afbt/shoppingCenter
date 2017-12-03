<template>
  <div class="tmpl">
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
                <li class="active">
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
          <el-form :model="form1" :rules="rules" ref="formes" label-width="100px" class="demo-ruleForm">
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <form id="orderForm" name="orderForm" >
              <div class="form-box address-info">
                <dl class="form-group">
                <el-row>
                  <el-col :span='12' :offset='4'> <!-- 收货人地址 -->
                  <el-form-item label="收货人地址" prop="accept_name">
                    <el-input v-model="form1.accept_name"></el-input>
                  </el-form-item>
                  </el-col>
                </el-row>
                </dl>
                <dl class="form-group">
                    <el-row><!-- 所属地区 -->
                        <el-col :span='12' :offset='4'>
                            <el-form-item label="所属地区:">
                          <v-distpicker  @selected="onSelected" ></v-distpicker>
                        </el-form-item>
                        </el-col>  
                      </el-row>
                </dl>
                <dl class="form-group"> <!-- 详细地址 -->
                    <el-row>
                        <el-col :span='12' :offset='4'>
                        <el-form-item label="详细地址:" prop="address">
                          <el-input v-model="form1.address"></el-input>
                        </el-form-item>
                        </el-col>
                      </el-row>
                </dl>
                <dl class="form-group"> <!-- 手机号码 -->
                    <el-row> 
                        <el-col :span='12' :offset='4'>
                        <el-form-item label="手机号码:" prop="mobile">
                          <el-input v-model="form1.mobile"></el-input>
                        </el-form-item>
                        </el-col>
                      </el-row>
                </dl>
                <dl class="form-group"><!-- 邮政编码 -->
                    <el-row>
                        <el-col :span='12' :offset='4'>
                        <el-form-item label="电子邮件:" prop="email">
                          <el-input v-model="form1.email"></el-input>
                        </el-form-item>
                        </el-col>
                      </el-row>
                </dl>
                <dl class="form-group">  <!-- 邮政编码 -->
                    <el-row>
                        <el-col :span='12' :offset='4'>
                        <el-form-item label="邮政编码:" prop="post_code">
                          <el-input v-model="form1.post_code"></el-input>
                        </el-form-item>
                        </el-col>
                      </el-row>
                </dl>
              </div>
              <h2 class="slide-tit">
                <span>2、支付方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>  <!-- 在线支付 -->
                  <label>
                      <el-radio v-model="form1.payment_id" label="6">在线支付</el-radio>
                    <em>手续费：{{form1.expressMoment}}元</em>
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>3、配送方式</span>
              </h2>
              <ul class="item-box clearfix">
                <!--取得一个DataTable-->
                <li>  <!-- 选择快递 -->
                  <label>
                      <el-radio-group v-model="form1.express_id" @change='expressFee'>
                          <el-radio :label="1" >顺丰</el-radio>
                          <el-radio :label="2" >圆通</el-radio>
                          <el-radio :label="3" >韵达</el-radio>
                        </el-radio-group>
                    
                  </label>
                </li>
              </ul>
              <h2 class="slide-tit">
                <span>4、商品清单</span>
              </h2>
              <div class="line15"></div>
              <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                <tbody>
                  <tr>
                    <th colspan="2" align="left">商品信息</th>
                    <th width="84" align="left">单价</th>
                    <th width="84" align="center">购买数量</th>
                    <th width="104" align="left">金额(元)</th>
                  </tr>
                  <tr v-for='item in message'>
                    <td width="68">
                      <a target="_blank" href="javascript:;">
                        <img :src="item.img_url" class="img">
                      </a>
                    </td>
                    <td>
                      <a target="_blank" href="javascript:;">{{item.title}}</a>
                    </td>
                    <td>
                      <span class="red">
                        ￥{{item.sell_price}}
                      </span>
                    </td>
                    <td align="center">{{item.buycount}}</td>
                    <td>
                      <span class="red">
                        ￥{{item.sell_price*item.buycount}}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="line15"></div>
              <h2 class="slide-tit">
                <span>5、结算信息</span>
              </h2>
              <div class="buy-foot clearfix">
                <div class="left-box">
                      <el-form-item label="活动形式" prop="message">
                          <el-input type="textarea" v-model="form1.message"></el-input>
                        </el-form-item> 
                  </dl>
                </div>
                <div class="right-box">
                  <p>
                    商品
                    <label class="price">{{sumUp.sum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                    <label id="goodsAmount" class="price">{{form1.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    运费：￥
                    <label id="expressFee" class="price">{{form1.expressMoment}}</label> 元
                  </p>
                  <p class="txt-box">
                    应付总金额：￥
                    <label id="totalAmount" class="price">{{ultimatePrice}}</label>
                  </p>
                  <p class="btn-box">
                    <a class="btn button" href="javascript:;">返回购物车</a>
                    <input id="btnSubmit" name="btnSubmit" type="button" @click ="submitForm('formes')" value="确认提交" class="btn submit">
                  </p>
                </div>
              </div>
            </form>
          
          
          </div>
        </el-form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import {getItem} from '../../globalCommunication/localStorageBaseDao.js'
  import VDistpicker from 'v-distpicker' //第三方 vue 省市区选择插件
  
  export default {
    components: { VDistpicker },//注册下组件   
    data() {
      return {
        message:[],
        sumUp:{
          sum:0,
        },
        form1:{
        "goodsAmount":0   //商品总额
        ,"expressMoment":0  //快递费
        ,"accept_name":"骁骁" //收货人
        ,"area":{  //收货人地区
          "province":{"code":"140000","value":"山西省"}
          ,"city":{"code":"140100","value":"太原市"}
          ,"area":{"code":"140106","value":"迎泽区"}
          }
          ,"address":"城区"  //收获地址
          ,"mobile":"18667654355"  //收货人手机号码
          ,"email":"ivanyb1@qq.com" //收货人邮箱地址
          ,"post_code":"516000"  //收货人邮编
          ,"payment_id":"6" //支付方式 6:在线支付
          ,"express_id":0  //运送方式 1：顺丰 2：圆通 3：韵达
          ,"message":"4K,白色"  //订单备注信息
          ,"goodsids":""  //购买商品的id，多个之间用逗号隔开
          ,"cargoodsobj":{} //购买商品对象，商品id为key，购买数量为值
        },
        rules:{ //验证
          accept_name:{ required: true, message: '*收货人姓名', trigger: 'blur' },
          address:{required: true, message: '*除上面所属地区外的详细地址', trigger: 'blur'},
          mobile:{required: true, message: '*收货人的手机号码', trigger: 'blur'}
        }
      }
    },
    mounted(){
      this.Select()
    },
    computed:{  //监听 (多对一)
      ultimatePrice:function(){ //监听快递费数据的变化从而改变最终价格
        return this.form1.goodsAmount+this.form1.expressMoment
      }
    },
    
    methods:{
      submitForm(formName){ //提交表单
        this.form1.express_id =  String(this.form1.express_id)
        console.log(this.form1);
        
        this.$refs[formName].validate((valid)=>{
          if (valid) {
            this.$ajax.post('/site/validate/order/setorder',this.form1)
            .then(res=>{
              console.log(res);
              if (res.data.status==1) {
                this.$message.error("订单添加失败")
                return
              }
              this.$message.success({
                message: '订单添加成功'
              })      
              // 提交成功后会返回一个订单号 通过路由把它携带过去 (编程式导航  )
              this.$router.push({path:'/seit/gay/'+res.data.message.orderid})
            })
          }else{
            console.log('error submit!!');
          }
        })
      },
      onSelected(data){  //省市区选择插件
        this.form1.area = data
      },
      expressFee(val){
      var expressFee = {
        "1":30,
        "2":15,
        "3":5
      }[val]||0  //用对象做了个判断
      this.form1.expressMoment=expressFee //把判断得到的值赋值在data数据模型里的数据上 
    },


      Select(){  //根据商品id字符串，获取商品数据
        this.$ajax.get('/site/validate/order/getgoodslist/'+this.$route.params.goodsId).then(res=>{
          if (res.data.status==1) {
            console.log('请求失败Select没有输出数据');
            return;
          }
          this.message=res.data.message //渲染商品清单所需要的数据
          var sum = 0
          var totalValue = 0
          var goodsids=[]
          
          for (let i = 0; i < this.message.length; i++) {
            //通过获取locaStorage中的数据{是对象}在用循环得到索引  根据得到对应对象索引 从对象里拿到对应的商品件数
            this.message[i].buycount =  getItem()[res.data.message[i].id]||0   
            // 得到购买商品对象 {key:val}  数据以这个形式存储
            this.form1.cargoodsobj[res.data.message[i].id] = getItem()[res.data.message[i].id]||0 
            //得到购买的商品id（该数据为数组）
            goodsids.push(res.data.message[i].id)
            //商品数量
            sum += this.message[i].buycount
            //商品总价
            totalValue += this.message[i].buycount*this.message[i].sell_price
          } 
          //得到购买的商品id（该数据为字符串）因为接口文档写了的数据需要字符串
          this.form1.goodsids=goodsids.join(',') 
          //商品数量
          this.sumUp.sum =sum
          //商品总价
          this.form1.goodsAmount =totalValue
          // //将得到的购买商品转json格式
          // this.form1.cargoodsobj=JSON.stringify(this.form1.cargoodsobj);
          
          console.log(this.form1);
          
        })

        
      }
    }
  }
</script>
<style scoped>
.left-box{
  width: 600px;
}
.right-box{
  margin-right: 30px;
}
</style>