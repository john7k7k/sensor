<template>
    
    <div class="InputDatacard">
      <div class="circleNum" ><span class="mdi mdi-check"></span></div>
      <div class="pageTital">Summary</div>
      <div class="mt-5 resultWord">Logger {{ configureID }} will start in {{ starttrip }}</div>
      <div class="resultWord">recording a reading every 6 Seconds</div>
      <div class="resultWord">and will finish logging {{ finishtrip }}</div>
      <div class="resultWord">When 60 readings have been taken</div>
    </div>
  </template>
    
  <style scoped>
  .pageTital{
    font-size: 35px;
    letter-spacing: 0.5px;
    font-weight: 500;
  }
  .InputDatacard{
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .circleNum {
  width: 70px;
  height: 70px;
  font-size: 50px;
  color: white;
  background-color: #E57373;
  border: 1.6px solid #E57373;
  border-radius: 50%; 
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 6%;
}
.resultWord{
  font-size: 20px;
  font-weight: bold;
}
  
  </style>
  
  <script>
    
  export default {
    props: {
      totalPassdata: {
        type:Object,
        required: true
      },
      configureID: {
        type:String,
        required: true
      },
    },
      data() {
      return {
          starttrip: "",
          finishtrip: "",
       }
      },
      mounted() {
        this.updateStartTripValue(this.totalPassdata.startTrip);
        this.updateFinishTripValue(this.totalPassdata.finishTrip);
      },
      methods: {
        parseStartTrip(starttrip) {
          var match1 = starttrip.match(/^1 (\d+)h(\d+)m$/);
          if (match1 !== null) {
              var hour = parseInt(match1[1], 10);
              var minute = parseInt(match1[2], 10);
              return hour + " hour " + minute + " minute";
          }

          var match2 = starttrip.match(/^2 (\d+)days(\d+)h(\d+)m$/);
          if (match2 !== null) {
              var day = parseInt(match2[1], 10);
              hour = parseInt(match2[2], 10);
              minute = parseInt(match2[3], 10);
              return day + " day " + hour + " hour " + minute + " minute";
          }

          var match3 = starttrip.match(/^3 (\d{4}\/\d{2}\/\d{2})\s+(上|下)\s+(\d+:\d+)$/);
          if (match3 !== null) {
              return match3[1] + " " + match3[3];
          }

          return starttrip;
      },
      updateStartTripValue(starttrip) {
          this.starttrip = this.parseStartTrip(starttrip);
      },
      updateFinishTripValue(finishtrip){
        this.finishtrip = this.parseStartTrip(finishtrip);
      }
      }
  }
  </script>