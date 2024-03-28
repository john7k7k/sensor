<template>
  <v-app   class="App">
    
    <v-main class="main">
      
      <meta name=”viewport” content="width=device-width, initial-scale=1.0">
      <router-view/>
    </v-main >
  </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted() {
  this.$router.push('/home');
  // window.electronApi.send('init', JSON.stringify({}));

  window.electronApi.send('search', JSON.stringify([
    {   //開始到結束時間的所有資料，包含頭尾
        ID: '39-78',
        startTime: '2024/3/11 23:59:54',
        endTime: '2024/3/12 00:00:06'
    },
    {   //從開始時間查詢後4筆資料，包含開頭
        ID: '39-78',
        startTime: '2024/3/4 23:20:47',
        quantity: 4
    },
    {   //從結束時間查詢前2筆資料，包含結尾
        ID: '39-78',
        endTime: '2024/3/12 23:20:48',
        quantity: 2
    },
  ]));

  window.electronApi.on('search', (e, data) => {
    console.log(data);
  });
},

  components: {  },
  data: () => ({
    
  }),

}
</script>

<style>
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);
.main{
  margin: 0;
  padding: 0;
  background-color: rgb(242, 241, 241);
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: PingFangTC-Semibold, sans-serif !important;
}
</style>
