// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 导入app.vue组件对象
import App from './App.vue'; //当前目录下面查找app.vue这个组件



import VueRouter from 'vue-router';

// 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);
// 路由规则


import layout from './components/layout.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodscar from './components/goods/goodscar.vue'
import shoppings from './components/goods/shoppings.vue'
import login from './components/account/login.vue'
import gay from './components/goods/gay.vue'
import payamount from './components/account/payamount.vue'
import paymentSuccess from './components/account/paymentSuccess.vue'
import memberCenter from './components/account/memberCenter.vue'
import memberOrderlist from './components/account/memberOrderlist.vue'
import getorderdetial from './components/account/getorderdetial.vue'
// 路由规则
var router = new VueRouter({
    routes: [
        //默认跳转规则
        {
            name: 'default',
            path: '/',
            redirect: '/seit/goodslist'
        },
        { //模拟手机支付页面
            name: 'payamount',
            path: '/payamount/:id',
            component: payamount
        },
        { //支付成功提示页面
            name: 'paymentSuccess',
            path: '/paymentSuccess',
            component: paymentSuccess
        },
        //布局                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        {
            name: 'layout',
            path: '/seit',
            component: layout,
            children: [{ //登录页面
                    name: 'login',
                    path: 'login',
                    component: login,
                    meta: {
                        nosave: true
                    }
                },
                {
                    name: 'goodslist',
                    path: 'goodslist',
                    component: goodslist
                }, {
                    name: 'goodsinfo',
                    path: 'goodsinfo/:goodsId',
                    component: goodsinfo
                },
                { //购物车
                    name: 'goodscar',
                    path: 'goodscar',
                    component: goodscar
                },
                { //提交订单页面
                    name: 'shoppings',
                    path: 'shoppings/:goodsId',
                    component: shoppings,
                    meta: {
                        checklogin: true
                    }
                },
                { //支付页面
                    name: 'gay',
                    path: 'gay/:id',
                    component: gay,
                    meta: {
                        checklogin: true
                    }
                }, { //支付成功提示页面
                    name: 'paymentSuccess',
                    path: 'paymentSuccess',
                    component: paymentSuccess,
                    meta: {
                        checklogin: true
                    }
                }, { //会员中心主页面
                    name: 'memberCenter',
                    path: 'memberCenter',
                    component: memberCenter,
                    meta: {
                        checklogin: true
                    }
                }, { //订单页面
                    name: 'memberOrderlist',
                    path: 'memberOrderlist',
                    component: memberOrderlist,
                    meta: {
                        checklogin: true
                    }
                }, {//订单详情
                    name: 'getorderdetial',
                    path: 'getorderdetial/:ids',
                    component: getorderdetial,
                    meta: {
                        checklogin: true
                    }
                }


            ]
        },


    ]
})



import {
    Affix
} from 'iview'; //
Vue.component('Affix', Affix);
import 'iview/dist/styles/iview.css'

Vue.filter('Datetime', (dates) => {
    var date = new Date(dates);
    return date.toLocaleDateString()

})
Vue.filter('DatetimeES', (dates) => {
    var date = new Date(dates);
    return date.toLocaleString()

})


// 导入element-ui模块
import elementUI from 'element-ui'

import '../statics/elementuiCss/index.css'

import '../statics/site/css/style.css'



import axios from 'axios'
// 设定axios的默认请求域名，将来在真正调用get,post方法的时候传入的url中就不需要带域名的
axios.defaults.baseURL = 'http://127.0.0.1:8899/'
// 配置axios在请求数据服务接口的时候，允许带cookie(凭证)

//配置axios在请求数据服务接口的时候，允许带cookie(凭证)
axios.defaults.withCredentials = true;

// 将axios对象绑定到vue的原型上  后面的组件都能使用
Vue.prototype.$ajax = axios
Vue.use(elementUI)

// 检查登录
router.beforeEach((to, from, next) => {
    // console.log(to.meta.nosave);
    //往localStorage里添加一条最后访问的页面登录信息
    // console.log(to);

    if (to.meta.nosave != true) { //
        localStorage.setItem('currentPath', to.path)
    }
    if (to.meta.checklogin) { //进行是否登录的例行 检查
        axios.get('/site/account/islogin').then(res => {
            //响应正确时的JSON返回结果：{ "code":"logined"}
            if (res.data.code == 'logined') {
                next()
            } else {
                router.push({
                    name: 'login'
                }) //未等录 跳到登录页面
            }
        })
    } else {

        next()
    }
})
// vuex的定义和集成
import vuex from 'vuex'
Vue.use(vuex)

import {
    setItem
} from './globalCommunication/localStorageBaseDao.js'
// 定义四个核心对象
// 1.定义个全局属性
// this.$store.state.buyCount
var state = {
    buyCount: 0
}
// 这个里面的方法要通过actions中的方法来触发
var mutations = {
    //     // 2.定义changeCount方法来改变state中buyCount的值
    //     // 两个参数  1：state:代表上面定义好的state对象 2.goodSobj:代表程序员调用时传入的 
    changeCount(state, goodSobj) {
        state.buyCount += goodSobj
        setItem(goodSobj);
    }
}
// actions外部编写方式 this.$store.dispatch('actions定义好的方法',传入的参数)
var actions = {
    //     // 定义changeCount方法用来触发mutations中的某个方法

    changeCount({
        commit
    }, goodSobj) {
        commit('changeCount', goodSobj)
    }
}

var getters = {}

// 上面四个对象 利用new vuex.Store()进行实例化
var store = new vuex.Store({
    state,
    mutations,
    actions,
    getters
})


//实例化vue对象
new Vue({
    el: '#app',
    router, //绑定路由对象使其生效
    store,
    // render:function(create){create(App)}
    render: create => create(App)
});