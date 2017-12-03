<template>
  <div class="subtmpl">
    <div class="buttons">
      <button type="button" class="buttonone" @click='subtract'>-</button>
      <button type="text" class="buttontwo">{{count}}</button>
      <button type="button" class="buttonthree" @click='add'>+</button>
    </div>


  </div>
</template>
<script>
  export default {
    data() {
      return {
        count: 1
      }
    },
    props: ['obj'],
    mounted() {
      // console.log(this.obj);
      
    this.count = this.obj.count
    },
    methods: {
      subtract() {
        if (this.count <=1) {
          this.count=1
          return
        }
        this.count--
        this.notice()//将最新的数据传回父组件
      },
      add() {
        this.count++
        this.notice() //将最新的数据传回父组件
      },
      notice(){
        this.$emit('msg',{
          gid:this.obj.gid,add:this.count
        })
      }
    }
  }
</script>
<style scoped>
  .buttons {
    width: 120px;
  }

  button {
    list-style: none;
    display: inline-block;
    width: 30px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 2px;
    cursor: pointer;
    background-color: #fff
  }
</style>