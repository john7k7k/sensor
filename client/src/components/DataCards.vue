<template>
  <v-card class="cardbg">
    <div class="box1">
      <div class="circle"><span class="mdi mdi-alpha-s-circle-outline icon"></span></div>
      <div class="sensornum font-weight-bold">{{ sensornum }}</div>
    </div>
    <v-tabs v-model="tab" class="tabsbg">
      <v-tab value="one" class="tabsSet" :class="{ activeTab: tab === 'one' }"><div class="wordcss">Temperature</div></v-tab>
      <v-tab value="two" class="tabsSet" :class="{ activeTab: tab === 'two' }"><div class="wordcss">Humidity</div></v-tab>
    </v-tabs>
    <v-window v-model="tab" class="tabwindow">
      <v-window-item value="one">
        <div class="box2">
          <div class="circle"><span class="mdi mdi-clock-outline icon"></span></div>
          <div>
            <div class="box2tital">Total Work</div>
            <div class="box2word font-weight-bold">00:03:45:16</div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
        <div class="bigbox">
          <div class="box3">
          <div class="circle"><span class="mdi mdi-thermometer-low icon"></span></div>
          <div>
            <div class="box3tital">Current Temperature</div>
            <div class="box4">
              <div class="box2word font-weight-bold">23</div>
              <div class="box4unit font-weight-bold">°C</div>
              <div class="box2word font-weight-bold">|</div>
              <div class="box2word font-weight-bold">73</div>
              <div class="box4unit font-weight-bold">°F</div>
            </div>
          </div>
          </div>
          <v-select :items="items" density="compact" label="Time" class="selecttime" rounded="xl" variant="solo-filled"></v-select>
        </div>
      </v-window-item>
      <v-window-item value="two">
        <div class="box2">
          <div class="circle"><span class="mdi mdi-clock-outline icon"></span></div>
          <div>
            <div class="box2tital">Total Work</div>
            <div class="box2word font-weight-bold">00:03:45:16</div>
          </div>
        </div>
        <canvas :id="chartId"></canvas>
        <div class="bigbox">
          <div class="box3">
          <div class="circle"><span class="mdi mdi-water-outline icon"></span></div>
          <div>
            <div class="box3tital">Current Humidity</div>
            <div class="box4">
              <div class="box2word font-weight-bold">23</div>
              <div class="box4unit font-weight-bold">%RH</div>
            </div>
          </div>
          </div>
          <v-select :items="items" density="compact" label="Time" class="selecttime" rounded="xl" variant="solo-filled"></v-select>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<style scoped>
.cardbg{
    width: 30%;
    height: 500px;
    border-radius: 20px;
    background-color: wihte; 
    padding: 2% 3%;
    margin-right: 3%;
    margin-top: 2%;
    }
.box1{
  display: flex;
  width: 100%;
  height: 12%;
  align-items: center;
}
.sensornum{
  font-size: 20px;
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
  top:5px;
}
.box2word , .box3word{
  font-size: 20px;
}
.bigbox{
  display: flex;
  width: 100%;
  height: 40%;
  align-items: center;
  justify-content: space-between;
}
.box3{
  display: flex;
  width: 50%;
  height: 30%;
  align-items: center;
  margin-top: 5%;
}
.box4{
  display: flex;
  letter-spacing: 2px;
  align-items: center;
  width: 100%;
}
.box4unit{
  font-size: 12px;
  position: relative;
  bottom:3px;
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
  height: 11.5%;
  border-radius: 40px;
  margin: auto;
}
.tabsSet{
  width: 40%;
  margin: auto;
  color: transparent;
}
.tabwindow{
  height: 100%;
}
.activeTab {
  background-color: white;
  transform: scale(0.85);
  border-radius: 20px;
  text-decoration-line: none;
  
}
.wordcss{
  color: black;
}
.selecttime{
  max-width: 150px;
  max-height: 30px;
  transform: scale(0.8);
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
    sensornum:{
      type: String,
      required: true
    },
  },
  data() {
    return {
      tab: 'one', // 設置默認的選項卡值
      chartInstance: null, // 添加一個用於存儲圖表實例的屬性
      items: [
          '00:00', '06:00', '12:00', '18:00', '23:59'
        ],
    }
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const chartElement = document.getElementById(this.chartId); // 使用传入的chartId获取元素
      const data = {
        labels: [
          '00:00', '06:00', '12:00', '18:00', '23:59'
        ],
        datasets: [{
          label: 'Temperature',
          data: [20,30,32,25,18],
          backgroundColor: '#E53935', // 设置背景色
          borderColor: '#E53935', // 设置边框色
          borderWidth: 1 // 设置边框宽度
        }]
      };
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      // 創建新的圖表實例
      this.chartInstance = new Chart(chartElement, {
        type: 'line',
        data: data,
      });
    },
  }
}
</script>