<template>
  <div class="tmpl">
    <div id="header" class="header">
      <div class="head-top">
        <div class="section">
          <div class="left-box">
            <span>vue2.0单页应用</span>
            <a target="_blank" href="#"></a>
            <a target="_blank" href="#"></a>
          </div>
          <div id="menu" class="right-box">
            
            <router-link v-if='!loggingStatus' to="/seit/login">
              登录
            </router-link>
            <router-link v-if='!loggingStatus' to="/site/account/logout">
              注册
            </router-link>
            <router-link v-if='loggingStatus' to="/seit/memberCenter">
              会员中心
            </router-link>
            
            <router-link v-if='loggingStatus' @click.native="quit" to="javascript:void(0)">
              退出
            </router-link>
            <router-link to="/seit/goodscar">
              <i class="iconfont icon-cart"></i>购物车(
              <span id="shoppingCartCount">{{msg}}</span>)
            </router-link>
            <strong>|</strong>
            <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                             <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a>-->
          </div>
        </div>
      </div>
      <div class="head-nav">
        <div class="section">
          <!-- <div class="logo">
                             <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                         </div>-->
          <div id="menu2" class="nav-box menuhd">
            <ul>
              <li class="index">
                <a href="/index.html">
                  首页
                </a>
              </li>
              <li class="news">
                <a href="/news.html">
                  学员问题汇总
                </a>
              </li>
              <li class="photo">
                <a href="/photo.html">
                  重难点专区
                </a>
              </li>
              <!--<li class="goods"><a href="">就业阶段</a></li>-->
              <li class="video">
                <a href="/video.html">
                  前端常用功能
                </a>
              </li>
              <li class="down">
                <a href="/down.html">
                  资源下载
                </a>
              </li>
              <li>
                <a target="_blank" href="/admin/index.aspx">
                  问题提交
                </a>
              </li>
            </ul>
          </div>
          <div class="search-box">
            <div class="input-box">
              <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                placeholder="输入关健字" x-webkit-speech="">
            </div>
            <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
              <i class="iconfont icon-search"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 占位 -->
    <router-view></router-view>

  </div>

</template>

<script>
  import {
    vueGlobal,
    vm
  } from '../globalCommunication/bus.js'
  import {
    qiuhe
  } from '../globalCommunication/localStorageBaseDao.js'
  export default {
    data() {
      return {
        msg: 0,
        loggingStatus:false
      }
    },
    methods: {},
    mounted() {
      $("#menu2 li a").wrapInner('<span class="out"></span>');
      $("#menu2 li a").each(function () {
        $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
      });

      $("#menu2 li a").hover(function () {
        $(".out", this).stop().animate({
          'top': '48px'
        }, 300); // move down - hide
        $(".over", this).stop().animate({
          'top': '0px'
        }, 300); // move down - show

      }, function () {
        $(".out", this).stop().animate({
          'top': '0px'
        }, 300); // move up - show
        $(".over", this).stop().animate({
          'top': '-48px'
        }, 300); // move up - hide
      });
      this.loggingStatus=(localStorage.getItem('loggingStatus')=='true'?true:false)
      
      var countStr = localStorage.getItem('btntop')
      if (countStr && countStr != "NaN") {
        this.msg = parseInt(countStr);
      }
      vueGlobal.$on('loggingStatus',buycont=>{
        this.loggingStatus = Boolean(localStorage.getItem('loggingStatus'))
      })
      vueGlobal.$on(vm, buycont => { //通过回调函数获取到添加到购物车的
        if (this.msg <= 0) {
          this.msg = 0
        } else if (typeof (buycont) == "object") {

          this.msg = qiuhe(buycont)
        } else {
          this.msg += buycont
        }

        localStorage.setItem('btntop', this.msg);
      })


    },
    computed: {
      fullName: function (val) {
        return this.msg = val + localStorage.getItem('btntop');
      }
    },
    methods:{
      quit(){

        this.$ajax.get('/site/account/logout')
        .then(res=>{
          if (res.data.status==1) {
            return
          }
        localStorage.setItem('loggingStatus',false)
        this.loggingStatus=false
        
        this.$router.push({name:'goodslist'})
        })
        
      }
    }
  }
</script>
<style scoped>
  @import url('../../statics/jqhovernav/jqhoverNav.css');
</style>