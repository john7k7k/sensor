<template>
    <div class="pageTital">Startup</div>
    <div class="InputDatacard">
        <div class="inputItem1">
          <div>
            <div class="dataTital">Duration of a trip<p class="starSymbol ml-5">∗</p></div>
            <div class="warmTital" v-if="durationWarm">Please provide the required information.</div>
            <div class="combinBox mb-15">
              <div class="selectbox ">
                <v-select v-model="duration" :items="items" density="compact"  class="selecttime" rounded="xl"  
                bg-color="white"  flat variant="solo" ></v-select>
              </div>
              <div class="ml-5 unitWord">Days</div>
            </div>
          </div>
          <div>
            <div class="dataTital">Interval between each reading<p class="starSymbol ml-5">∗</p></div>
            <div class="warmTital" v-if="intervalWarm">Please provide the required information.</div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="intervalreadDays" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="intervalreadHours" :border="false" size="small" />
              <div class="ml-5 unitWord">h</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="intervalreadMinutes" :border="false" size="small" />
              <div class="ml-5 unitWord">m</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="intervalreadSeconds" :border="false" size="small" />
              <div class="ml-5 unitWord">s</div>
            </div>
            
          </div>
        </div>
        <div class="inputItem2">
          <div class="dataTital2">Start new log trip <p class="starSymbol ml-5">∗</p></div>
          <div class="warmTital" v-if="startTripWarm">Please provide the required information.</div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="startTrip" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="1" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">Wait</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="start1Hour" :border="false" size="small" />
              <div class="ml-5 unitWord">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="start1Minute" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
              <div class="ml-5 unitWord">after a magnetic start</div>
            </div>
          </div>
          <div class="chooseLogtripBox ">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="startTrip" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="2" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">In</div>
            </div>
            <div class="chooseLogtripBoxitem2 ">
              <Input class="ml-7 smallinputCss2" v-model="start2Days" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
              <Input class="ml-5 smallinputCss2 " v-model="start2Hour" :border="false" size="small" />
              <div class="ml-5 unitWord ">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="start2Minute" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
            </div>
          </div>
          <div class="chooseLogtripBox ">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="startTrip" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="3" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">At</div>
            </div>
            <div class="chooseLogtripBoxitem2 ">
              <Input class="ml-7 smallinputCss2" v-model="start3Date" :border="false" size="small" />
            </div>
          </div>
          <div class="dataTital">Finish log trip<p class="starSymbol ml-5">∗</p></div>
          <div class="warmTital" v-if="finishTripWarm">Please provide the required information.</div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="finishTrip" @click="toggleRadio2" hide-details>
                <v-radio class="checkboxWord"  value="1" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">After</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="finish1Read" :border="false" size="small" />
              <div class="ml-5 unitWord">readings</div>
            </div>
          </div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="finishTrip" @click="toggleRadio2" hide-details>
                <v-radio class="checkboxWord"  value="2" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">After</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="finish2Days" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
              <Input class="ml-5 smallinputCss2 " v-model="finish2Hour" :border="false" size="small" />
              <div class="ml-5 unitWord ">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="finish2Minute" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
            </div>
          </div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="finishTrip" @click="toggleRadio2" hide-details>
                <v-radio class="checkboxWord"  value="3" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">At</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="finish3Date" :border="false" size="small" />
            </div>
          </div>
        </div>
    </div>
  </template>
    
  <style scoped>
  .pageTital{
    font-size: 35px;
    letter-spacing: 0.5px;
    font-weight: 500;
  }
  .dataTital{
    font-size: 20px;
    letter-spacing: 0.1px;
    color: #757575;
    margin: 1% 0;
    display: flex;
  }
  .dataTital2{
    font-size: 20px;
    letter-spacing: 0.1px;
    color: #757575;
    margin: 1.5% 0;
    display: flex;
  }
  .warmTital{
    color: red;
  }
  .starSymbol{
    color: red;
    font-size: 20px;
  }
  .InputDatacard{
    width: 100%;
    height: 55%;
    display: flex;
    position: relative;
    bottom: 5px;
  }
  .inputItem1{
    width: 35%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .inputItem2{
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    bottom: 6px;
  }
  .selectbox{
    max-width: 50%;
    padding:0 5px;
  max-height: 40px;
  border: 1px solid #BDBDBD;
  border-radius: 20px;
  }
  .selecttime{
    position: relative;
    bottom: 4px;
    transform: scale(0.88);
}
.inputCss{
    width: 40%;
    padding: 5px;
    border: 1px solid #BDBDBD;
    border-radius: 25px;
  }
.smallinputCss{
    width: 30%;
    padding: 5px;
    border: 1px solid #BDBDBD;
    border-radius: 25px;
  }
.chooseLogtripBox{
  display: flex;
  width: 100%;
  height: 20%;
  margin-bottom: 0.5%;
  align-items: center;
  position: relative;
  right: 10px;

}
.chooseLogtripBoxitem1{
  width: 14%;
  height: 100%;
  display: flex;
  align-items: center;
}
.chooseLogtripBoxitem2{
  width: 86%;
  height: 100%;
  display: flex;
  align-items: center;
}
.smallinputCss2{
    width: 20%;
    padding: 5px;
    border: 1px solid #BDBDBD;
    border-radius: 25px;
}
.combinBox{
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  margin: 2% 0;
}
.unitWord{
  font-size: 17px;
  font-weight: bolder;
}
.checkboxWord{
  width: 2%;
  }
  </style>
  
  <script>
  export default {
    props: {
    },
      data() {
      return {
          items:["1day", "2days", "3days", "4days", "5days", "6days", "7days"],
          duration:"",
          intervalreadDays:"",
          intervalreadHours:"",
          intervalreadMinutes:"",
          intervalreadSeconds:"",
          startTrip: "",
          finishTrip: "",
          start1Hour: "",
          start1Minute: "",
          start2Days: "",
          start2Hour: "",
          start2Minute: "",
          start3Date: "",
          finish1Read: "",
          finish2Days: "",
          finish2Hour: "",
          finish2Minute: "",
          finish3Date: "",
          startTripWarm:false,
          finishTripWarm:false,
          durationWarm:false,
          intervalWarm:false,




       }
      },
      mounted() {
      },
      methods: {
        toggleRadio() {
          if (this.startTrip === '1') {
            this.startTrip = '';
          } else if (this.startTrip === '2') {
            this.startTrip = '';
          } else if (this.startTrip === '3') {
            this.startTrip = '';
          }
      },
      toggleRadio2() {
        if (this.finishTrip === '1') {
            this.finishTrip = '';
          } else if (this.finishTrip === '2') {
            this.finishTrip = '';
          } else if (this.finishTrip === '3') {
            this.finishTrip = '';
          }
      },
      PassData() {
        let passData ={};
        let startTripData = "";
        let finishTripData = "";
        if(this.duration == ""){
          this.durationWarm = true;
        }else{
          this.durationWarm = false;
        }
        if(this.intervalreadDays == "" ||this.intervalreadHours == "" ||this.intervalreadMinutes == "" ||this.intervalreadSeconds == ""){
          this.intervalWarm = true;
        }else{
          this.intervalWarm = false;
        }
        if(this.startTrip == '1' && this.start1Hour !== "" && this.start1Minute !== ""){
          this.startTripWarm = false;
          startTripData = this.startTrip+" "+this.start1Hour+"h"+this.start1Minute+"m";
        }else if (this.startTrip == '2' && this.start2Days !== "" && this.start2Hour !== "" && this.start2Minute !== ""){
          this.startTripWarm = false;
          startTripData = this.startTrip+" "+this.start2Days+"days"+this.start2Hour+"h"+this.start2Minute+"m";
        }else if (this.startTrip == '3' && this.start3Date !== ""){
          this.startTripWarm = false;
          startTripData = this.startTrip+" "+this.start3Date;
        }else {
          this.startTripWarm = true;
        }
        if(this.finishTrip == '1' && this.finish1Read !== ""){
          this.finishTripWarm = false;
          finishTripData = this.finishTrip+" "+this.finish1Read+"readings";
        }else if (this.finishTrip == '2' && this.finish2Days !== "" && this.finish2Hour !== "" && this.finish2Minute !== ""){
          this.finishTripWarm = false;
          finishTripData = this.finishTrip+" "+this.finish2Days+"days"+this.finish2Hour+"h"+this.finish2Minute+"m";
        }else if (this.finishTrip == '3' && this.finish3Date !== ""){
          this.finishTripWarm = false;
          finishTripData = this.finishTrip+" "+this.finish3Date;
        }else {
          this.finishTripWarm = true;
        }
        if(this.durationWarm == false && this.intervalWarm == false && this.startTripWarm == false && this.finishTripWarm == false){
          passData = {
            duration: this.duration,
            intervalread:this.intervalreadDays+"days"+this.intervalreadHours+"h"+this.intervalreadMinutes+"m"+this.intervalreadSeconds+"s",
            starttrip:startTripData,
            finishtrip:finishTripData
          };
        }else{
          passData = "false"
        }
        
        this.$emit('dataToParent', passData);
      }
      }
  }
  </script>