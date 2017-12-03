<template>
  <div id="tmpl">
    <!-- 导航栏 -->
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a>
        <a href="/goods/42/1.html">商品详情</a>

      </div>
    </div>

    <!-- 商品详情 -->
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <!--页面左边-->
          <div class="left-925">
            <div class="goods-box clearfix">
              <!--商品图片-->
              <div class="pic-box">
                <div class="magnifier" id="magnifier1">
                  <div class="magnifier-container">
                    <div class="images-cover"></div>
                    <!--当前图片显示容器-->
                    <div class="move-view"></div>
                    <!--跟随鼠标移动的盒子-->
                  </div>
                  <div class="magnifier-assembly">
                    <div class="magnifier-btn">
                      <span class="magnifier-btn-left">&lt;</span>
                      <span class="magnifier-btn-right">&gt;</span>
                    </div>
                    <!--按钮组-->
                    <div class="magnifier-line">
                      <ul class="clearfix animation03">
                        <li v-for='item in imglist'>
                          <div class="small-img">
                            <img :src="item.original_path" />
                          </div>
                        </li>

                      </ul>
                    </div>
                    <!--缩略图-->
                  </div>
                  <div class="magnifier-view"></div>
                  <!--经过放大的图片显示容器-->
                </div>

              </div>
              <!--/商品图片-->

              <!--商品信息-->
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle" v-text="goodsinfo.sub_title"></p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo" v-text='goodsinfo.goods_no'></dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em class="price" id="commoditySellPrice">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>

                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity"></el-input-number>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum" v-text='goodsinfo.stock_quantity'></em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div class="btn-buy" id="buyButton">
                        <button class="buy">立即购买</button>
                        <button class="add" @click='addCart'>加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>

              </div>
              <!--/商品信息-->
            </div>

            <div id="goodsTabs" class="goods-tab bg-wrap">
              <!--选项卡-->
              <Affix>
                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                  <ul>
                    <li @click="commentS = true">
                      <a v-bind='{class:(commentS?"selected":"")}' href="javascript:;">商品介绍</a>
                    </li>
                    <li @click="commentS = false">
                      <a v-bind='{class:(!commentS?"selected":"")}' href="javascript:;" @click='getplCha'>商品评论</a>
                    </li>
                  </ul>
                </div>
              </Affix>
              <!--/选项卡-->

              <!--选项内容-->
              <div class="tab-content entry" v-show='commentS' v-html='goodsinfo.content'>

              </div>

              <div class="tab-content" v-show='!commentS'>
                <!--网友评论-->
                <div class="comment-box">
                  <!--取得评论总数-->
                  <form id="commentForm" name="commentForm" class="form-box">
                    <div class="avatar-box">
                      <i class="iconfont icon-user-full"></i>
                    </div>
                    <div class="conn-box">
                      <div class="editor">
                        <textarea id="txtContent" name="txtContent" v-model='contentText' sucmsg="contentText" datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                        <span class="Validform_checktip"></span>
                      </div>
                      <div class="subcon">
                        <input id="btnSubmit" name="submit" type="button" value="提交评论" @click='addpl' class="submit">
                        <span class="Validform_checktip"></span>
                      </div>
                    </div>
                  </form>
                  <ul id="commentList" class="list-box">
                    <p v-if="comment.length==0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                    <li v-for="item in comment">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="inner-box">
                        <div class="info">
                          <span v-text="item.user_name"></span>
                          <span>{{item.add_time | DatetimeES(item.add_time)}}</span>
                        </div>
                        <p v-text="item.content"></p>
                      </div>
                    </li>
                  </ul>
                  <!--放置页码-->
                  <div class="page-box" style="margin:5px 0 0 62px">
                    <div id="pagination" class="digg">
                      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[2, 4, 6, 8]"
                        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                      </el-pagination>
                    </div>
                  </div>
                  <!--/放置页码-->
                </div>

                <!--/网友评论-->
              </div>

            </div>

          </div>
          <!--/页面左边-->

          <!--页面右边-->
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">

                  <li v-for='item in hotgoodslist'>
                    <div class="img-box">
                      <router-link v-bind="{to:'/seit/goodsinfo/'+item.id}">
                        <img :src="item.img_url">
                      </router-link>
                    </div>
                    <div class="txt-box">
                      <router-link v-bind="{to:'/seit/goodsinfo/'+item.id}">
                        {{item.title}}
                      </router-link>
                      <span>{{item.add_time | Datetime(item.add_time)}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--/页面右边-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '../../../statics/jqFaDA/js/magnifier.js' //商品图片展示功能的js文件导入

  import {
    vueGlobal,
    vm
  } from '../../globalCommunication/bus.js'
  // import {setItem} from '../../globalCommunication/local132.js'

  // console.log(setItem(),1);

  export default {
    data() {
      return {
        buycont: 1,
        contentText: '', //评论
        num1: 1, //购买数量
        commentS: true, //控制评论 和商品介绍 tap栏切换
        goodsinfo: [], //商品详情页商品数据
        hotgoodslist: [], //右边商品数据
        imglist: [], //左边商品展示图
        comment: [], //评论数据
        pageIndex: 1, //页码
        pageSize: 2, //每页显示条数
        totalcount: 0 //总共几页

      }
    },
    mounted() {

      this.getCha()

    },
    watch: { //因为  利用路由监听this.getCha()中 id值的变化
      '$route': function () {
        this.getCha()
      }
    },
    methods: {
      addpl() { //评论提交

        if (this.contentText.length == 0) {
          this.$message.error('评论不能为空')
          return;
        }
        this.$ajax.post('/site/validate/comment/post/goods/' + this.$route.params.goodsId, {
            commenttxt: this.contentText
          })
          .then(res => {
            if (res.data.status == 1) {
              this.$message.error('评论失败')
              return
            }
            this.$message.success('评论成功')
            this.getplCha()
            this.contentText = []
          })
        // 
      },
      handleChange(val) {
        this.buycont = val



      },
      handleSizeChange(val) { //每页条数
        this.pageSize = val
        this.getplCha()
      },
      handleCurrentChange(val) { //当前页
        this.pageIndex = val
        this.getplCha()
      },
      getCha() {
        this.$ajax.get('/site/goods/getgoodsinfo/' + this.$route.params.goodsId)
          .then(res => {
            if (res.data.status == 1) {
              return;
            }
            var rdm = res.data.message
            this.goodsinfo = rdm.goodsinfo
            this.hotgoodslist = rdm.hotgoodslist
            this.imglist = rdm.imglist
            setTimeout(() => { //因为这js 解析太快  页面还没有渲染完就加载完了 所以加定时器让他在ajax请求的数据渲染完在加载
              $('#magnifier1').imgzoon({
                magnifier: '#magnifier1'
              });
            }, 200);
          })
      },
      getplCha() { //请求评论的数据
        this.$ajax('/site/comment/getbypage/goods/' + this.$route.params.goodsId + '?pageIndex=' + this.pageIndex +
            '&pageSize=' + this.pageSize)
          .then(res => {
            this.totalcount = res.data.totalcount
            this.comment = res.data.message

          })
      },
      addCart() {
        if (this.buycont.length == 0) {
          this.$message.error('加入失败')
          return;
        }
        // vueGlobal.$emit(vm, this.buycont) //触发事件传值
        var id = this.$route.params.goodsId
        // console.log(id)
        var goodSobj = {
          gid: id,
          add: this.buycont
        }
        this.$store.dispatch('changeCount',goodSobj)
        
        // console.log(goodSobj);
        // localStorage.setItem('goodSobj',1) //往localStorage加东西
        //按key清除所有localStorage里的东西
        // localStorage.clear();//清除所有localStorage里的东西
        // localStorage.removeItem("buyGoods");

      }
    }
  }
</script>
<style scoped>
  @import url('../../../statics/jqFaDA/css/magnifier.css');
</style>