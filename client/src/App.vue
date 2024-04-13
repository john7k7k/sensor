<template>
  <v-app class="App">
    <v-main class="main">
      
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  mounted() {

  this.$router.push('/home');
  /*window.electronApi.send('configure', JSON.stringify({
    mode: "check", //"anyway"
    ConfigurepassData:{
        description: "33-44",
        beeper: true,
        newbattery: true,
        minimum: "",
        maximum: "",
        increment: "",
        duration: "1",
        intervalread: "1days2h3m4s",
        starttrip: "wait1h2m",
        finishtrip: "after1h",
        alerm: [true, true, false, false, true, true, 0, 0]
    }
  }));*/
  window.electronApi.on('search', (e, data) => { //data為回傳資料\
    console.log(data)
  })
  window.electronApi.send('search', JSON.stringify([
    {   
        ID: '39-10',
        startTime: '2024/3/14 10:07:09',
        quantity: 4
    },
    {   
        ID: '39-78',
        endTime: '2024/3/14 09:07:48',
        quantity: 12
    }
]));
},

  components: {  },
  data: () => ({
    
  }),
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&family=Source+Sans+Pro&display=swap');
.main, .App {
  margin: 0;
  padding: 0;
  background-color: rgb(242, 241, 241);
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  font-family: 'Source Sans Pro', 'Roboto', sans-serif; 
}
</style>

