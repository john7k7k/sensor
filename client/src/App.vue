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
  window.electronApi.send('init', JSON.stringify({}));
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
