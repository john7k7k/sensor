<template>
  <v-card class="cardbg">
    <div class="box1">
      <div class="imagebox">
        <v-img src="../assets/溫度器圖標1.png"  alt="logo"  class="sensorimage" ></v-img>
      </div>
      <div class="sensornum font-weight-bold">{{ sensornum }}</div>
    </div>
    <v-tabs v-model="tab" class="tabsbg" @click="createChart">
      <v-tab value="one" class="tabsSet" :class="{ activeTab: tab === 'one' }" density="compact"><div class="wordcss">Temperature</div></v-tab>
      <v-tab value="two" class="tabsSet" :class="{ activeTab: tab === 'two' }" density="compact"><div class="wordcss">Humidity</div></v-tab>
    </v-tabs>
    <v-window v-model="tab" class="tabwindow">
      <v-window-item value="one">
        <div class="box2">
          <div class="circle"><span class="mdi mdi-clock-time-four-outline circleword"></span></div>
          <div>
            <div class="box2tital">Total Work</div>
            <div class="box2word font-weight-bold">{{ totalTime }}</div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
        <div class="bigbox">
          
          <div class="box3">
            <div class="circle"><span class="mdi mdi-thermometer-low icon"></span></div>
          <div>
            <div class="box3tital">Current Temperature</div>
            <div class="box4">
              <div class="box2word font-weight-bold">{{ displayTemData }}</div>
              <div class="box4unit font-weight-bold">°C</div>
              <div class="box2word font-weight-bold">|</div>
              <div class="box2word font-weight-bold">{{ Number((displayTemData * 9/5 + 32).toFixed(1)) }}</div>
              <div class="box4unit font-weight-bold">°F</div>
            </div>
          </div>
          </div>
          <v-select v-model="selectedTemtime" :items="sensorTime" density="compact"  class="selecttime" rounded="xl" variant="solo-filled" ></v-select>
        </div>
      </v-window-item>
      <v-window-item value="two">
        <div class="box2">
          <div class="circle"><span class="mdi mdi-clock-time-four-outline circleword"></span></div>
          <div>
            <div class="box2tital">Total Work</div>
            <div class="box2word font-weight-bold">{{ totalTime }}</div>
          </div>
        </div>
        <canvas :id="secondId"></canvas>
        <div class="bigbox">
          <div class="box3">
          <div class="circle"><span class="mdi mdi-water-outline icon"></span></div>
          <div>
            <div class="box3tital">Current Humidity</div>
            <div class="box4">
              <div class="box4word font-weight-bold">{{ displayHumData }}</div>
              <div class="box4unit font-weight-bold">%RH</div>
            </div>
          </div>
          </div>
          <v-select v-model="selectedHumtime" :items="sensorTime" density="compact"  class="selecttime" rounded="xl" variant="solo-filled"></v-select>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style scoped>
.sensorimage{
  position: relative;
  bottom: 4px;
}
.cardbg{
    width: 30%;
    height: 490px;
    border-radius: 20px;
    background-color: wihte; 
    padding: 2% 3%;
    margin-right: 3%;
    margin-top: 3%;
    }
.imagebox{
  width: 35px;
  height: 35px;
  border-radius: 50%; 
  margin-right: 5%;
}
.box1{
  display: flex;
  width: 100%;
  height: 12%;
  align-items: center;
  position: relative;
  bottom: 1px;
}
.sensornum{
  font-size: 22px;
}
.box2{
  display: flex;
  width: 100%;
  height: 30%;
  align-items: center;
  margin-bottom: 4%;
}
.box2tital , .box3tital{
  font-size: 10px;
  color: #757575;
  position: relative;
  top: 4px;
}
.box2word , .box3word,.box4word{
  font-size: 19.7px;
  position: relative;
  top: 1.5px;
}
.bigbox{
  display: flex;
  width: 100%;
  height: 45%;
  align-items: center;
}
.box3{
  display: flex;
  width: 65%;
  height: 30%;
  align-items: center;
  margin-top: 5%;
}
.box4{
  display: flex;
  letter-spacing: 2px;
  align-items: center;
  width: 100%;
  height: 100%;
}

.box4unit{
  font-size: 12px;
  position: relative;
  bottom:1.5px;
}
.circleword{
  transform: scale(1.5);
  color: white;
}
.circle {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 35px;
  height: 35px;
  border-radius: 50%; 
  background-color: #757575;
  margin-right: 5%;
}

.icon {
  font-size: 25px;
  color: white;
}
.tabsbg{
  background-color: rgb(242, 241, 241);
  width: 100%;
  height: 11%;
  border-radius: 40px;
  margin: auto;
  position: relative;
  top: 3.5px;
  display: flex;
  align-items: center;
}
.tabsSet{
  width: 43%;
  margin: auto;
  color: transparent;
  font-size: small;
}
.tabwindow{
  height: 100%;
}
.activeTab {
  background-color: white;
  transform: scale(1);
  width: 45%;
  border-radius: 20px;
  font-size: small;
  text-decoration-line: none;
  
}
.wordcss{
  color: black;
}
.selecttime{
  width: 45%;
  max-height: 30px;
  position: relative;
  top: 1px;

}
</style>

<script>
import Chart from 'chart.js/auto';

export default {
  props: {
    chartId: {
      type: String,
      required: true
    },
    secondId: {
      type: String,
      required: true
    },
    sensornum:{
      type: String,
      required: true
    },
    totalTime:{
      type: String,
      required: true
    },
    sensorTem:{
      type: Array,
      required: true
    },
    sensorHum:{
      type: Array,
      required: true
    },
    sensorTime:{
      type: Array,
      required: true
    },
    sensorDate:{
      type: String,
      required: true
    },
    
  },
  data() {
    return {
      tab: 'one', 
      chartInstance: null, 
      selectedTemtime:'Now',
      selectedHumtime:'Now',
    }
  },
  mounted() {
    this.createChart();
  },
  computed: {
    displayTemData() {
      if (this.selectedTemtime !== 'Now') {
        const index = this.sensorTime.indexOf(this.selectedTemtime);
        if (index !== -1) {
          return this.sensorTem[index];
        } else {
          return [];
        }
      } else {
        return this.sensorTem[this.sensorTem.length - 1];
      }
    },
    displayHumData() {
      if (this.selectedHumtime !== 'Now') {
        const index = this.sensorTime.indexOf(this.selectedHumtime);
        if (index !== -1) {
          return this.sensorHum[index];
        } else {
          return [];
        }
      } else {
        return this.sensorHum[this.sensorHum.length - 1];
      }
    }
  },
  methods: {
    createChart() {
      let chartId = this.tab === 'one' ? this.chartId : this.secondId;
      const chartElement = document.getElementById(chartId);
      const data = {
        labels: this.sensorTime,
        datasets: [{
          label: this.sensorDate,
          data: this.tab === 'one' ? this.sensorTem : this.sensorHum,
          backgroundColor: this.tab === 'one' ? '#E53935' : '#2196F3',
          borderColor: this.tab === 'one' ? '#E53935' : '#2196F3',
          borderWidth: 1
        }]
      };
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }
      this.chartInstance = new Chart(chartElement, {
        type: 'line',
        data: data,
        options: {
          layout: {
            padding: {
              top: -10
            }
          }
        }
      });
    },
  }
}
</script>