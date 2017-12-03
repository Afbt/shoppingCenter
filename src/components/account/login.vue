<template>
  <div id="tmpl">
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/login.html">会员登录</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <div class="nav-tit">
            <a class="selected" href="javascript:;">账户登录</a>
            <i>|</i>
            <a href="/register.html">免费注册</a>
          </div>
          <el-form :model='form' ref='form'>
            <form id="loginform" name="loginform" class="login-box">
              <div class="input-box">
                <input id="txtUserName" v-model='form.user_name' name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
              </div>
              <div class="input-box">
                <input id="txtPassword" v-model='form.password' name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
              </div>
              <div class="btn-box">
                <input id="btnSubmit" name="btnSubmit" type="button" @click='submitForm("form")' value="立即登录">
              </div>
              <div id="msgtips" class="tip-box"></div>
              <input id="turl" name="turl" type="hidden" value="http://localhost:8020/cart.html">
              <!--记住上一页网址-->
            </form>
          </el-form>


        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
  import {vueGlobal} from '../../globalCommunication/bus.js'
  export default {
    data() {
      return {
        form: {
          "user_name": "ivanyb3",
          "password": "123"
        },
        rules: {
          user_name: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {

          if (valid) {
            this.$ajax.post('/site/account/login', this.form)
              .then(res => {
                if (res.data.status == 1) {
                  this.$message.error(res.data.message) //失败
                  return
                }
                this.$message.success(res.data.message) //成功
                localStorage.setItem('loggingStatus',true)
                vueGlobal.$emit('loggingStatus',true)
                //获取通过全局守卫到往localStorage里添加一条最后访问的页面登录信息
                var http = localStorage.getItem('currentPath')
                this.$router.push({
                  path: http
                }) //通过路由来跳转  


              })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>
<style scoped>

</style>