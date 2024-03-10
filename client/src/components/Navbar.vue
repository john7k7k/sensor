<template>
    <div class="box">
        <v-img src="../assets/sgslogo去背.png" alt="logo" width="150" class="logoimage" ></v-img>
        <v-btn class="btnword" size="50" icon="mdi mdi-download"></v-btn>
        <v-btn class="btnword" size="50" icon="mdi mdi-file-cog"></v-btn>
    </div>
</template>
  
<style scoped>
.box{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    align-items: center;
}
.logoimage{
    margin-top: 5%;
    margin-bottom: 30%;
}
.btnword{
    font-size: 20px;
    margin-top: 15%;
}
</style>

<script>
  
  export default {
    data() {
      return {
        tab: 'one', // 設置默認的選項卡值
        chartInstance: null // 添加一個用於存儲圖表實例的屬性
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>