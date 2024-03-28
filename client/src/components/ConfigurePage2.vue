<template>
    <div class="pageTital">Startup</div>
    <div class="InputDatacard">
        <div class="inputItem1">
          <div>
            <div class="dataTital">localduration of a trip<p class="starSymbol ml-5">∗</p></div>
            <div class="warmTital" v-if="localdurationWarm">Please provide the required information.</div>
            <div class="combinBox mb-15">
              <div class="selectbox ">
                <v-select v-model="localduration" :items="localitems" density="compact"  class="selecttime" rounded="xl"  
                bg-color="white"  flat variant="solo" ></v-select>
              </div>
              <div class="ml-5 unitWord">Days</div>
            </div>
          </div>
          <div>
            <div class="dataTital">Interval between each reading<p class="starSymbol ml-5">∗</p></div>
            <div class="warmTital" v-if="localintervalWarm">Please provide the required information.</div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="localintervalreadDays" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="localintervalreadHours" :border="false" size="small" />
              <div class="ml-5 unitWord">h</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="intervalreadMinutes" :border="false" size="small" />
              <div class="ml-5 unitWord">m</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="localintervalreadSeconds" :border="false" size="small" />
              <div class="ml-5 unitWord">s</div>
            </div>
            
          </div>
        </div>
        <div class="inputItem2">
          <div class="dataTital2">Start new log trip <p class="starSymbol ml-5">∗</p></div>
          <div class="warmTital" v-if="localstartTripWarm">Please provide the required information.</div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="localstartTrip" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="1" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">Wait</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="localstart1Hour" :border="false" size="small" />
              <div class="ml-5 unitWord">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="localstart1Minute" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
              <div class="ml-5 unitWord">after a magnetic start</div>
            </div>
          </div>
          <div class="chooseLogtripBox ">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="localstartTrip" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="2" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">In</div>
            </div>
            <div class="chooseLogtripBoxitem2 ">
              <Input class="ml-7 smallinputCss2" v-model="localstart2Days" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
              <Input class="ml-5 smallinputCss2 " v-model="localstart2Hour" :border="false" size="small" />
              <div class="ml-5 unitWord ">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="localstart2Minute" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
            </div>
          </div>
          <div class="chooseLogtripBox ">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="localstartTrip" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="3" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">At</div>
            </div>
            <div class="chooseLogtripBoxitem2 ">
              <Input class="ml-7 smallinputCss2" v-model="localstart3Date" :border="false" size="small" />
            </div>
          </div>
          <div class="dataTital">Finish log trip<p class="starSymbol ml-5">∗</p></div>
          <div class="warmTital" v-if="localfinishTripWarm">Please provide the required information.</div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="localfinishTrip" @click="toggleRadio2" hide-details>
                <v-radio class="checkboxWord"  value="1" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">After</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="localfinish1Read" :border="false" size="small" />
              <div class="ml-5 unitWord">readings</div>
            </div>
          </div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="localfinishTrip" @click="toggleRadio2" hide-details>
                <v-radio class="checkboxWord"  value="2" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">After</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="localfinish2Days" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
              <Input class="ml-5 smallinputCss2 " v-model="localfinish2Hour" :border="false" size="small" />
              <div class="ml-5 unitWord ">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="localfinish2Minute" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
            </div>
          </div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="localfinishTrip" @click="toggleRadio2" hide-details>
                <v-radio class="checkboxWord"  value="3" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">At</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="localfinish3Date" :border="false" size="small" />
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
      duration: {
        type: String,
        required: true
      },
    },
      data() {
      return {
          localitems:["1day", "2days", "3days", "4days", "5days", "6days", "7days"],
          localduration:this.duration,
          localintervalreadDays:"",
          localintervalreadHours:"",
          intervalreadMinutes:"",
          localintervalreadSeconds:"",
          localstartTrip: "",
          localfinishTrip: "",
          localstart1Hour: "",
          localstart1Minute: "",
          localstart2Days: "",
          localstart2Hour: "",
          localstart2Minute: "",
          localstart3Date: "",
          localfinish1Read: "",
          localfinish2Days: "",
          localfinish2Hour: "",
          localfinish2Minute: "",
          localfinish3Date: "",
          localstartTripWarm:false,
          localfinishTripWarm:false,
          localdurationWarm:false,
          localintervalWarm:false,




       }
      },
      mounted() {
      },
      methods: {
        toggleRadio() {
          if (this.localstartTrip === '1') {
            this.localstartTrip = '';
          } else if (this.localstartTrip === '2') {
            this.localstartTrip = '';
          } else if (this.localstartTrip === '3') {
            this.localstartTrip = '';
          }
      },
      toggleRadio2() {
        if (this.localfinishTrip === '1') {
            this.localfinishTrip = '';
          } else if (this.localfinishTrip === '2') {
            this.localfinishTrip = '';
          } else if (this.localfinishTrip === '3') {
            this.localfinishTrip = '';
          }
      },
      PassData() {
        let passData ={};
        let localstartTripData = "";
        let localfinishTripData = "";
        if(this.localduration == ""){
          this.localdurationWarm = true;
        }else{
          this.localdurationWarm = false;
        }
        if(this.localintervalreadDays == "" ||this.localintervalreadHours == "" ||this.intervalreadMinutes == "" ||this.localintervalreadSeconds == ""){
          this.localintervalWarm = true;
        }else{
          this.localintervalWarm = false;
        }
        if(this.localstartTrip == '1' && this.localstart1Hour !== "" && this.localstart1Minute !== ""){
          this.localstartTripWarm = false;
          localstartTripData = this.localstartTrip+" "+this.localstart1Hour+"h"+this.localstart1Minute+"m";
        }else if (this.localstartTrip == '2' && this.localstart2Days !== "" && this.localstart2Hour !== "" && this.localstart2Minute !== ""){
          this.localstartTripWarm = false;
          localstartTripData = this.localstartTrip+" "+this.localstart2Days+"days"+this.localstart2Hour+"h"+this.localstart2Minute+"m";
        }else if (this.localstartTrip == '3' && this.localstart3Date !== ""){
          this.localstartTripWarm = false;
          localstartTripData = this.localstartTrip+" "+this.localstart3Date;
        }else {
          this.localstartTripWarm = true;
        }
        if(this.localfinishTrip == '1' && this.localfinish1Read !== ""){
          this.localfinishTripWarm = false;
          localfinishTripData = this.localfinishTrip+" "+this.localfinish1Read;
        }else if (this.localfinishTrip == '2' && this.localfinish2Days !== "" && this.localfinish2Hour !== "" && this.localfinish2Minute !== ""){
          this.localfinishTripWarm = false;
          localfinishTripData = this.localfinishTrip+" "+this.localfinish2Days+"days"+this.localfinish2Hour+"h"+this.localfinish2Minute+"m";
        }else if (this.localfinishTrip == '3' && this.localfinish3Date !== ""){
          this.localfinishTripWarm = false;
          localfinishTripData = this.localfinishTrip+" "+this.localfinish3Date;
        }else {
          this.localfinishTripWarm = true;
        }
        if(this.localdurationWarm == false && this.localintervalWarm == false && this.localstartTripWarm == false && this.localfinishTripWarm == false){
          passData = {
            localduration: this.localduration == "1day" ? this.localduration.replace("day", ""):this.localduration.replace("days", ""),
            intervalread:this.localintervalreadDays+"days"+this.localintervalreadHours+"h"+this.intervalreadMinutes+"m"+this.localintervalreadSeconds+"s",
            localstartTrip:localstartTripData,
            localfinishTrip:localfinishTripData
          };
        }else{
          passData = "false"
        }
        
        this.$emit('dataToParent', passData);
      }
      }
  }
  </script>