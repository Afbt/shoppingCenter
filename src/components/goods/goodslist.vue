<template>
  <div id="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <!--类别菜单-->
          <div class="left-220" style="margin:0;">
            <div class="banner-nav">
              <ul>
                <!--此处声明下面可重复循环-->
                <li v-for='item  in catelist' :key="item.id">
                  <!-- left一级分类 -->
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for='item1 in item.subcates'>&nbsp;&nbsp;{{item1.title}}</span>
                      <!-- left二级分类 -->
                    </p>
                  </h3>
                  <div class="item-box">
                    <!--如有三级分类，此处可循环-->
                    <dl>
                      <dt>
                        <a href="javascript:;">{{item.title}}</a>
                      </dt>
                      <dd v-for='item2 in item.subcates' :key="item2.id">
                        <a href="javascript:;">{{item2.title}}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--/类别菜单-->

          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <div id="focus-box" class="focus-box fr">
                <el-carousel :interval="5000">
                  <el-carousel-item v-for="item in sliderlist" :key="item.id">
                    <img width="100%" height="100%" :src="item.img_url" alt="">
                    <h3 style=" color: #000" class="sliderfont">{{ item.title }}</h3>

                  </el-carousel-item>
                </el-carousel>
              </div>

            </div>
          </div>
          <!--/幻灯片-->

          <!--推荐商品-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for='(item,index) in toplist' :key="item.id">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="javascript:;">{{item.title}}</a>
                  <span>{{item.add_time |Datetime(item.add_time)}}</span>
                </div>
              </li>


            </ul>
          </div>
          <!--/推荐商品-->
        </div>
      </div>
    </div>

    <div class="section" v-for='item in datas' :key="item.level1cateid">

      <!--子类-->
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a href="javascript:;" v-for='item2 in item.level2catelist' :key="item2.subcateid">
            {{item2.subcatetitle}}</a>

          <a href="javascript:;">更多
            <i>+</i>
          </a>
        </p>
      </div>
      <!--/子类-->
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for='item3 in item.datas' :key="item3.artID">
                <router-link v-bind='{to:"/seit/goodsinfo/"+item3.artID}'>
                <div class="img-box">
                  <img :src="item3.img_url">
                </div>
                <div class="info">
                  <h3>{{item3.artTitle}}</h3>
                  <p class="price">
                    <b>¥{{item3.sell_price}}</b>元</p>
                  <p>
                    <strong>库存 {{item3.stock_quantity}}</strong>
                    <span>市场价：
                      <s>{{item3.market_price}}</s>
                    </span>
                  </p>
                </div>
              </router-link>
            </li>


          </ul>
        </div>
      </div>
    </div >
  </div>
</template>


<script>
  export default {
    data() { //数据模型
      return {
        catelist: [], //top栏
        sliderlist: [], //轮播图
        toplist: [], //推荐商品
        datas:[]
      }
    },
    mounted() { //生命周期
      this.messageTopContent();
      this.messageClass();
    },
    methods: { //自定义函数
      messageTopContent() {
        this.$ajax.get('/site/goods/gettopdata/goods')
          .then(res => {
            if (res.data.status == 1) {
              alert('数据出错了骚年')
              return;
            }
            this.toplist = res.data.message.toplist; //top栏
            this.sliderlist = res.data.message.sliderlist; //轮播图
            this.catelist = res.data.message.catelist; //推荐商品

          })
      },

      messageClass(){
        this.$ajax.get('/site/goods/getgoodsgroup')
        .then(res=>{
          if (res.data.status == 1) {
            return;
          }
          this.datas = res.data.message;
        })
      }
    }
  }
</script>


<style>
  .el-carousel__container {
    height: 380px;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    /* line-height: 300px; */
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .sliderfont {
    position: absolute;
    bottom: 5%;
    font-weight: 1000;
  }

  .fr {
    position: relative;
  }
</style>