<template>
  <div class="home">
    <div class="configureBackdrop" v-show="configureModal || downloadModal || getMapmodal || downloadResultmodal"></div>
    <div class="configureBox" v-show="configureModal">
      <Configure @close-modal="closeConfigureModal"></Configure>
    </div>
    <div class="resultBox" v-show="downloadResultmodal">
      <loading v-if="Downloading"></loading>
      <div class="resultTital" v-if="!Downloading">Download results data sheet</div>
      <div class="ResultTableBox" v-if="!Downloading">
        <Table  border v-for="(num,index) in Downloaddata" :key="num" :columns="Resultcolumns" :data="Downloaddata[index]"></Table>
      </div>
      <v-btn class="dowloadFinishBtn"  @click="downloadResultmodal = false" flat v-if="!Downloading">Confirm</v-btn>
    </div>
    <div class="downloadBox" v-show="downloadModal">
      <div class="downloadTital">Select the pin you want to download</div>
      <v-btn class="closedownloadBtn" density="comfortable" icon="$close" variant="plain" @click="downloadModal = false"></v-btn>
      
      <div class="choosePinBox">
        <v-radio-group @click="toggleRadio(name)"  v-for="(name,index) in chooseDownloadPinName" :key="name" v-model="chooseDownloadPin[index]"  hide-details>
          <v-radio class="checkboxWord" :label="name" :value="(index+1).toString()" color="#E57373" :input-value="chooseDownloadPin[index] === index+1"></v-radio>
        </v-radio-group>
        <v-radio-group  v-model="chooseDownloadPin[16]" @click="toggleRadio(17)"  hide-details>
          <v-radio class="checkboxWord" label="All" value="17" color="#E57373"></v-radio>
        </v-radio-group>
      </div>
        <v-btn class="dowloadFinishBtn"  @click="Startdownload" flat>Download</v-btn>
    </div>
    <div class="getMapBox" v-show="getMapmodal">
      <div class="downloadTital ">Foot position and description comparison table</div>
      <v-btn class="closedownloadBtn" density="comfortable" icon="$close" variant="plain" @click="getMapmodal = false"></v-btn>
      
      <div class="tableBox">
        <Table border v-for="(num,index) in Mapdata" :key="num" :columns="columns" :data="Mapdata[index]"></Table>
      </div>

    </div>
    <div class="item1">
      <v-img src="../assets/sgslogo去背.png" alt="logo" width="150" class="logoimage" ></v-img>
      <v-btn class="btnword" size="50" icon="mdi mdi-download" @click="downloadModal = true"></v-btn>
      <v-btn class="btnword" size="50" icon="mdi mdi-file-cog" @click="configureModal = true"></v-btn>
      <v-btn class="btnword" size="50" icon="mdi mdi-map-search" @click="Getmap"></v-btn>
      <v-btn class="btnword" size="50" icon="mdi mdi-clipboard-text-search" ></v-btn>
      
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
          :sensornum="num" :totalTime="totalTime[index]" :sensorTem="sensorTem[index]" :sensorHum="sensorHum[index]" :sensorTime="sensorTime[index]" :sensorDate="sensorDate[index]"></DataCards>
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
  display: flex;
  flex-direction: column;
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
.configureBox{
  width: 70%;
  height: 80%;
  border-radius: 30px;
  background-color: white;
  position: absolute;
  top: 15%;
  left: 0;
  right:0;
  margin: auto;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.configureBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1; 
}
.downloadBox{
  width: 55%;
  height: 45%;
  border-radius: 30px;
  background-color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 2%;
}
.downloadtitalBox{
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.downloadTital{
  font-size: 22px;
  letter-spacing: 0.1px;
  font-weight: bold;
  margin: auto;
}
.closedownloadBtn{
  position: absolute;
  right: 5%;
  font-size: 20px;
  font-weight: bold;
}
.choosePinBox{
  display: flex;
  width: 100%;
  height: 75%;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  right: 10px;
  margin: 1.5% 0 ;
}
.checkboxWord{
  width: 160px;
  height: 25px;
  color: black;
  }
.dowloadFinishBtn{
  width: 40%;
  margin: auto;
  border-radius: 20px;
  background-color: #E57373;
  color: white;
}
.getMapBox{
  width: 65%;
  height: 75%;
  border-radius: 30px;
  background-color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 2%;
}
.tableBox{
  width: 100%;
  height: 92%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.resultBox{
  width: 65%;
  height: 75%;
  border-radius: 30px;
  background-color: white;
  position: absolute;
  top: 5%;
  bottom: 0;
  left: 0;
  right:0;
  margin: auto;
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 2%;
}
.ResultTableBox{
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.resultTital{
  font-size: 22px;
  letter-spacing: 0.1px;
  font-weight: bold;
  position: relative;
  top:2%;
  margin: auto;
}

</style>

<script>
import DataCards from '@/components/DataCards.vue'
import Configure from '@/components/Configure.vue'
import loading from '@/components/loading.vue'
export default {
  name: 'HomeView',
  components: {
    DataCards,Configure,loading
  },
  data: () => ({
    sensorNumber:[],
    totalTime:[],
    sensorTem:[],
    sensorHum:[],
    sensorTime:[],
    sensorDate:[],
    searchId:"",
    receivedData:'',
    configureModal:false,
    downloadModal:false,
    getMapmodal:false,
    data:[
      {
        ID: "39-78",
        data: [
          { temperature: 22.1, humidity: 67.7, air: 'W', time: '2024/3/18 10:48:24' },
          { temperature: 22, humidity: 67.5, air: 'W', time: '2024/3/18 10:48:30' },
          { temperature: 22.1, humidity: 68.1, air: 'W', time: '2024/3/18 10:48:36' },
          { temperature: 22.1, humidity: 68, air: 'W', time: '2024/3/18 10:48:42' },
          { temperature: 22.1, humidity: 68, air: 'W', time: '2024/3/18 10:48:48' },
        ],
        totalTime: "00:00:48"
      }
    ],
    chooseDownloadPinName:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12","13","14","15","16"],
    chooseDownloadPin:["", "", "", "", "", "", "", "", "", "", "", "","","","","",""],
    columns: [
                    {
                        title: 'Pin',
                        key: 'pin',
                        width:"150"
                    },
                    {
                        title: 'Description',
                        key: 'mapID',
                        width:"150"
                    },
                ],
    Resultcolumns: [
                    {
                        title: 'Pin',
                        key: 'pin',
                        width:"150"
                    },
                    {
                        title: 'Description',
                        key: 'description',
                        width:"150"
                    },
                    {
                        title: 'State',
                        key: 'state',
                        width:"150"
                    },
                ],
    Downloaddata:[],
    Mapdata:[],
    downloadResultmodal:false,
    Downloading:true,
    ConfigurepassData:{
      description: "",
      beeper: true,
      newbattery:true,
      minimum: "",
      maximum: "",
      increment: "",
      duration: "1",
      intervalread: "1days2h3m4s",
      starttrip: "wait1h2m 或 in1days2h3m 或 at2003/3/24/13:00",
      finishtrip: "after1h 或 after1days2h3m 或 at2003/3/24/13:00",
      alerm:[true,true,false,true,true,0,0],
    }
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
    this.handleData(data);
  },
  handleData(data) {
    for (var i = 0; i < data.length; i++) {
      this.sensorNumber.push(data[i].ID);
      this.totalTime.push(data[i].totalTime);
      let latestDayData = {
        temperatures: [],
        humidity: [],
        time: [],
        yearMonthDay: ""
      };
      let latestDate = new Date(0); 
      for (var j = 0; j < data[i].data.length; j++) {
        const currentDate = new Date(data[i].data[j].time);
        if (currentDate > latestDate) {
          latestDate = currentDate;
          latestDayData.yearMonthDay = currentDate.toLocaleDateString();
        }

        latestDayData.temperatures.push(data[i].data[j].temperature);
        latestDayData.humidity.push(data[i].data[j].humidity);
        const timeParts = data[i].data[j].time.split(' ')[1].split(':');
        const hourMinuteSecond = timeParts[0] + ':' + timeParts[1] + ':' + timeParts[2];
        latestDayData.time.push(hourMinuteSecond);
      }
      this.sensorTem.push(latestDayData.temperatures);
      this.sensorHum.push(latestDayData.humidity);
      this.sensorTime.push(latestDayData.time);
      this.sensorDate.push(latestDayData.yearMonthDay);
    }
  },

  closeConfigureModal() {
    this.configureModal = false;
  },
  toggleRadio(PinNum) {
  PinNum = parseInt(PinNum) - 1;
  if (PinNum === 16) {
    if (this.chooseDownloadPin[PinNum] === "") {
      this.chooseDownloadPin = Array.from({length: 17}, (_, index) => (index + 1).toString());
    } else {
      this.chooseDownloadPin = Array.from({length: 17}, () => "");
    }
  } else {
    if (this.chooseDownloadPin[PinNum] !== "") {
      this.chooseDownloadPin[PinNum] = "";
    } else {
      this.chooseDownloadPin[PinNum] = (PinNum + 1).toString();
    }
  }
},
updateChooseDownloadPin(index, value) {
        this.chooseDownloadPin[index] = value ? (index + 1).toString() : "";
    },
  Startdownload(){
    this.downloadModal = false;
    this.downloadResultmodal = true;
    this.Downloading = true;
    let downloadPin = [];
    for(let i=0; i<16; i++) {
      if(this.chooseDownloadPin[i] !== "") downloadPin.push(this.chooseDownloadPin[i]);
    }
    window.electronApi.send('download', JSON.stringify({
        selects: downloadPin,
        mode: "anyway" 
    }));
    const processData = (data) => {
      console.log('Received data from main process:', data);
      if (Object.prototype.hasOwnProperty.call(data, 'descriptionMap')) {
        delete data.descriptionMap;
      }
      const formattedData = Object.entries(data).map(([pin, item]) => ({
        pin,
        state: item.state || 'MCU not ack', 
        description: item.description || 'Null', 
      }));
      if (formattedData.length > 8) {
        this.Downloaddata = [formattedData.slice(0, 8), formattedData.slice(8)];
      } else {
        this.Downloaddata = [formattedData];
      }
      this.Downloading = false;
    };
    /*processData({
        "1": { description: '39-24', state: 'download succfully' },
        "3": { description: '', state: 'failed' },
        "descriptionMap":{"1":"39-24","2":"","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":"","16":""}
    });*/
    window.electronApi.on('download', (e, data) => {
      processData(JSON.parse(data));
    });
    
},

  Getmap() {
    this.getMapmodal = true;
    let ret = null;
    window.electronApi.send('getMap', JSON.stringify({}));
    
    window.electronApi.on('getMap', (e, data) => { 
        console.log('Received data from main process:', JSON.parse(data));
        ret = JSON.parse(data);
        this.processMapData(ret);
    });
    /*let ret = {"1":"39-24","2":"39-79","3":"","4":"","5":"","6":"","7":"","8":"","9":"","10":"","11":"","12":"","13":"","14":"","15":"","16":""};
    this.processMapData(ret);*/
},

processMapData(ret) {
    this.Mapdata = [];

    let data = [];
    for (let key in ret) {
        if (Object.prototype.hasOwnProperty.call(ret, key)) {
            let value = ret[key] !== "" ? ret[key] : "Null";
            data.push({
                pin: key,
                mapID: value
            });
        }
        if(data.length == 8) {
          this.Mapdata.push(data);
          data = [];
        }
    }
}
}
}
</script>

