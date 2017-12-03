<template>
    <div class="templ">
   
      <el-row>  
        <el-col :span='8' :offset='5'>
          请支付{{jage}}$
            <el-input v-model="input" placeholder="请输入内容"></el-input>
            <el-button type="primary" @click ='paymentSuccess' plain>主要按钮</el-button>
        </el-col>
          
      </el-row>
        
    </div>
    
</template>
<script>
  export default {
    data() {
      return {
        input:'',
        jage:0
      }
    },
    mounted(){
      this.cha()
    },
    methods:{
      cha(){
        this.$ajax.get('/site/validate/order/getorder/'+this.$route.params.id)
        .then(res=>{
          if (res.data.status == 1) {
            return
          }
          this.jage=res.data.message[0].order_amount
          this.input=this.jage
        })
      },
      paymentSuccess(){
        this.$ajax.get('/site/validate/order/pay/'+this.$route.params.id)
        .then(res=>{
          if (res.data.status == 1) {
            return
          }
          this.$message.success("支付成功")
          this.$router.push({path:'/paymentSuccess'})
        })
      }
    }
  }
  
</script>
<style scoped>

</style>