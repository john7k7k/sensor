<template>
  <div class="home">
    <div class="item1">
      <Navbar></Navbar>
    </div>
    <div class="item2">
      <div class="titalbox">
        <div class="tital font-weight-medium">Sensor connection Adaptor</div>
        <v-text-field
            v-model="searchId"
            label="Search Number"
            prepend-inner-icon="mdi-magnify"
            class="searchnum"
            density="compact"
            variant="solo-filled"
            rounded="xl"
            bg-color="#EEEEEE"
          ></v-text-field>
      </div>
      <div class="titalword">Click on the following buttons to view the information you requeted</div>
      <div class="box">
        <DataCards v-for="(num,index) in filteredData" :key="num" :chartId="'myChart' + num" :secondId="'secondChart' + num" 
                    :sensornum="num" :totalTime="totalTime[index]" :sensorTem="sensorTem[index]" :sensorHum="sensorHum[index]"></DataCards>
      </div>
    </div>
  </div>
</template>
<style scoped>
.home{
  display:flex ;
  width: 100%;
  height: 100%;
}
.item1{
  width: 15%;
  position: fixed;
}
.item2{
  width: 85%;
  margin-left: 15%;
}
.tital{
  font-size: 40px;
  letter-spacing: 1px;
  margin-top: 4%;
}
.titalword{
  color: #757575;
  font-size: 16px;
  margin-top: 0.5%;
  margin-bottom: 1%;
}
.titalbox{
  display: flex;
  width: 95%;
  justify-content: space-between;
}
.searchnum{
  max-width: 20%;
  max-height: 20px;
  border-radius: 50px;
  margin-right: 4%;
  margin-top: 3%;
}
.box{
  display: flex;
  width: 95%;
  justify-content: start;
  flex-wrap: wrap;
}
</style>

<script>
import DataCards from '@/components/DataCards.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'HomeView',
  components: {
    DataCards,Navbar
  },
  data: () => ({
    sensorNumber:[],
    totalTime:[],
    sensorTem:[],
    sensorHum:[],
    searchId:"",
    receivedData:'',
    data:[
        {
            ID: 'X1',
            totalTime: '00:30:00',
            data: [
                {
                    temperature: 30,
                    humidity: 60,
                    air: 'U',
                    time: '2024/3/4 20:00:06'
                },
                {
                    temperature: 30.1,
                    humidity: 64,
                    air: 'U',
                    time: '2024/3/4 20:00:12'
                },
                {
                    temperature: 30.4,
                    humidity: 64.4,
                    air: 'U',
                    time: '2024/3/4 20:00:18'
                },
                {
                    temperature: 30.1,
                    humidity: 62,
                    air: 'U',
                    time: '2024/3/4 20:00:24'
                },
                {
                    temperature: 31.1,
                    humidity: 67,
                    air: 'U',
                    time: '2024/3/4 20:00:30'
                }
            ]
        },
        {
            ID: 'X2',
            totalTime: '00:30:00',
            data: [
                {
                    temperature: 30,
                    humidity: 60,
                    air: 'U',
                    time: '2024/3/4 20:00:06'
                },
                {
                    temperature: 30.1,
                    humidity: 64,
                    air: 'U',
                    time: '2024/3/4 20:00:12'
                },
                {
                    temperature: 30.4,
                    humidity: 64.4,
                    air: 'U',
                    time: '2024/3/4 20:00:18'
                },
                {
                    temperature: 30.1,
                    humidity: 62,
                    air: 'U',
                    time: '2024/3/4 20:00:24'
                },
                {
                    temperature: 31.1,
                    humidity: 67,
                    air: 'U',
                    time: '2024/3/4 20:00:30'
                }
            ]
        },
    ]
  }),
  mounted() {
    this.handleData(this.data);
    /*window.electronApi.on('init', (e, data) => {
    this.handleReceivedData(JSON.parse(data));
  });
  window.electronApi.send('init', JSON.stringify({}));*/
},
  computed: {
        filteredData() {
            if (!this.searchId) {
              return this.sensorNumber;
            } else if(this.sensorNumber){
              return this.sensorNumber.filter(item => {
                return item.includes(this.searchId.toLowerCase());
              });
            }else{
              return [];
            }
        },
  },
  methods: {
  handleReceivedData(data) {
    console.log('Received data from main process:', data);
    alert(data[0].ID);
    this.receivedData = data; 
  },
  handleData(data){
    for (var i = 0; i < data.length;i++){
      this.sensorNumber.push(this.data[i].ID);
      this.totalTime.push(this.data[i].totalTime);
      let Temperatures = [];
      let Humidity = [];
      for(var j = 0; j < data[i].data.length;j++){
        Temperatures.push(this.data[i].data[j].temperature);
        Humidity.push(this.data[i].data[j].humidity);
      }
      this.sensorTem.push(Temperatures);
      this.sensorHum.push(Humidity);
    }
  }
},
}
</script>

