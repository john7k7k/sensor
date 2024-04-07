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
            <div class="warmTital" v-if="intervalNumberWarm">Fields can only be filled with numbers</div>
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
          <div class="warmTital" v-if="StartNumberWarm">Fields can only be filled with numbers</div>
          <div class="warmTital" v-if="StarttimeNumberalerm">Please enter a normal 24-hour time value.</div>
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
              <!-- <Input class="ml-7 smallinputCss2" v-model="localstart3Date" :border="false" size="small" /> -->
              <Input class="ml-7 DateinputCss" v-model="localstart3Date" :border="false" size="small" @click="showDatePicker(1)" readonly />
              <v-date-picker v-model="originStartdate" v-if="isDatePickerVisible" class="ml-7 DateinputCss " style="background-color: #ECEFF1;"></v-date-picker>
              <div class="ml-5 unitWord ">Time</div>
              <Input class="ml-5 smallinputCss2 " v-model="localstart3Hour" :border="false" size="small" />
              <div class="ml-5 unitWord ">:</div>
              <Input class="ml-5 smallinputCss2 " v-model="localstart3Minute" :border="false" size="small" />
            </div>
          </div>
          <div class="dataTital">Finish log trip<p class="starSymbol ml-5">∗</p></div>
          <div class="warmTital" v-if="localfinishTripWarm">Please provide the required information.</div>
          <div class="warmTital" v-if="FinishNumberWarm">Fields can only be filled with numbers</div>
          <div class="warmTital" v-if="FinishtimeNumberalerm">Please enter a normal 24-hour time value.</div>
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
              <!-- <Input class="ml-7 smallinputCss2" v-model="localfinish3Date" :border="false" size="small" /> -->
              <Input class="ml-7 DateinputCss" v-model="localfinish3Date" :border="false" size="small" @click="showDatePicker(2)"/>
              <v-date-picker v-model="originFinishdate" v-if="isfinishDatePickerVisible" class="ml-7 DateinputCss " style="background-color: #ECEFF1;"></v-date-picker>
              <div class="ml-5 unitWord ">Time</div>
              <Input class="ml-5 smallinputCss2 " v-model="localfinish3Hour" :border="false" size="small" />
              <div class="ml-5 unitWord ">:</div>
              <Input class="ml-5 smallinputCss2 " v-model="localfinish3Minute" :border="false" size="small" />
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
.DateinputCss{
  width: 18%;
  padding: 5px;
  border: 1px solid #BDBDBD;
  border-radius: 25px;
  text-align: center;
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
      intervalread: {
        type: String,
        required: true
      },
      startTrip: {
        type: String,
        required: true
      },
      finishTrip: {
        type: String,
        required: true
      },
    },
      data() {
      return {
          localitems:["User Defined","1day", "2days", "3days", "4days", "5days", "6days", "7days"],
          localduration:this.duration == "" ? "":this.duration == "U" ? "User Defined":this.duration == "1" ? this.duration + "day":this.duration + "days",
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
          localstart3Hour:"12",
          localstart3Minute:"00",
          localfinish3Hour:"12",
          localfinish3Minute:"00",
          localfinish1Read: "",
          localfinish2Days: "",
          localfinish2Hour: "",
          localfinish2Minute: "",
          localfinish3Date: "",
          localstartTripWarm:false,
          localfinishTripWarm:false,
          localdurationWarm:false,
          localintervalWarm:false,
          intervalNumberWarm:false,
          StartNumberWarm:false,
          FinishNumberWarm:false,
          isDatePickerVisible: false,
          isfinishDatePickerVisible:false,
          originStartdate:"",
          originFinishdate:"",
          StarttimeNumberalerm:false,
          FinishtimeNumberalerm:false,  


       }
      },
      mounted() {
        if (this.intervalread) {
            var matches = this.intervalread.match(/(\d+)days(\d+)h(\d+)m(\d+)s/);
            if (matches) {
                this.localintervalreadDays = parseInt(matches[1]);
                this.localintervalreadHours = parseInt(matches[2]);
                this.intervalreadMinutes = parseInt(matches[3]);
                this.localintervalreadSeconds = parseInt(matches[4]);
            }
        }
        if (this.startTrip) {
            var startmatches = this.startTrip.match(/^(\d+)\s(.+)$/);
            var parts = "";
            if (startmatches) {
                var type = parseInt(startmatches[1]);
                var value = startmatches[2];
                this.localstartTrip = type.toString();
                switch (type) {
                    case 1:
                        parts = value.match(/(\d+)h(\d+)m/);
                        if (parts) {
                            this.localstart1Hour = parts[1];
                            this.localstart1Minute = parts[2];
                        }
                        break;
                    case 2:
                        parts = value.match(/(\d+)days(\d+)h(\d+)m/);
                        if (parts) {
                            this.localstart2Days = parts[1];
                            this.localstart2Hour = parts[2];
                            this.localstart2Minute = parts[3];
                        }
                        break;
                    case 3:
                        parts = value.match(/(\d+\/\d+\/\d+)\s+(上|下)\s+(\d+):(\d+)/);
                        this.localstart3Date = parts[1];
                        this.localstart3Hour = parts[3];
                        this.localstart3Minute = parts[4];
                        break;
                    default:
                        console.log("Invalid input type for interval");
                }
            }
          }
          if (this.finishTrip) {
            var finishmatches = this.finishTrip.match(/^(\d+)\s(.+)$/);
            var finishparts = "";
            if (finishmatches) {
                var finishtype = parseInt(finishmatches[1]);
                var finishvalue = finishmatches[2];
                this.localfinishTrip = finishtype.toString();
                switch (finishtype) {
                    case 1:
                      this.localfinish1Read = finishvalue.trim();
                      break;
                    case 2:
                      finishparts = finishvalue.match(/(\d+)days(\d+)h(\d+)m/);
                        if (finishparts) {
                            this.localfinish2Days = value.trim();
                            this.localfinish2Hour = finishparts[2];
                            this.localfinish2Minute = finishparts[3];
                        }
                        break;
                    case 3:
                        finishparts = finishvalue.match(/(\d+\/\d+\/\d+)\s+(上|下)\s+(\d+):(\d+)/);
                        this.localfinish3Date = finishparts[1];
                        this.localfinish3Hour = finishparts[3];
                        this.localfinish3Minute = finishparts[4];
                        break;
                    default:
                        console.log("Invalid input type for finishTrip");
                }
            }
          }
      },
      watch: {
        originStartdate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.localstart3Date = this.formatDate(newValue);
        this.hideDatePicker(1);
      }
    },
    originFinishdate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.localfinish3Date = this.formatDate(newValue);
        this.hideDatePicker(2);
      }
    },
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
        let timeUporDown = " 上 ";
        let finishtimeUporDown = " 上 ";
        if ((this.localstart3Hour !== "" && (parseInt(this.localstart3Hour) > 24 || parseInt(this.localstart3Hour) <= 0)) || (this.localstart3Minute !== "" && (parseInt(this.localstart3Minute) > 60 || parseInt(this.localstart3Minute) < 0))) {
          this.StarttimeNumberalerm = true;
        } else {
          this.StarttimeNumberalerm = false;
        }
        if ((this.localfinish3Hour !== "" && (parseInt(this.localfinish3Hour) > 24 || parseInt(this.localfinish3Hour) <= 0)) || (this.localfinish3Minute !== "" && (parseInt(this.localfinish3Minute) > 60 || parseInt(this.localfinish3Minute) < 0))) {
          this.FinishtimeNumberalerm = true;
        } else {
          this.FinishtimeNumberalerm = false;
        }
        let localstart3Time = this.localstart3Hour+":"+this.localstart3Minute;
        let localfinish3Time = this.localfinish3Hour+":"+this.localfinish3Minute;
        if(this.localduration == ""){
          this.localdurationWarm = true;
        }else{
          this.localdurationWarm = false;
        }
        if(this.localintervalreadDays == "" ||this.localintervalreadHours == "" ||this.intervalreadMinutes == "" ||this.localintervalreadSeconds == ""){
          this.localintervalWarm = true;
          this.intervalNumberWarm = false;
        }else if(!/^\d+$/.test(this.localintervalreadDays) || !/^\d+$/.test(this.localintervalreadHours) || !/^\d+$/.test(this.intervalreadMinutes) || !/^\d+$/.test(this.localintervalreadSeconds)) {
          this.intervalNumberWarm = true;
          this.localintervalWarm = false;
        } else{
          this.localintervalWarm = false;
          this.intervalNumberWarm = false;
        }
        if(this.localstartTrip == '1' && this.localstart1Hour !== "" && this.localstart1Minute !== ""){
          this.localstartTripWarm = false;
          if(!/^\d+$/.test(this.localstart1Hour) || !/^\d+$/.test(this.localstart1Minute)) this.StartNumberWarm = true;
          else{
            this.StartNumberWarm = false;
            localstartTripData = this.localstartTrip+" "+this.localstart1Hour+"h"+this.localstart1Minute+"m";
          }
        }else if (this.localstartTrip == '2' && this.localstart2Days !== "" && this.localstart2Hour !== "" && this.localstart2Minute !== ""){
          this.localstartTripWarm = false;
          if(!/^\d+$/.test(this.localstart2Days) || !/^\d+$/.test(this.localstart2Hour) || !/^\d+$/.test(this.localstart2Minute)) this.StartNumberWarm = true;
          else{
            this.StartNumberWarm = false;
            localstartTripData = this.localstartTrip+" "+this.localstart2Days+"days"+this.localstart2Hour+"h"+this.localstart2Minute+"m";
          }
        }else if (this.localstartTrip == '3' && this.localstart3Date !== "" && this.localstart3Hour !== "" && this.localstart3Minute !== ""){
          this.localstartTripWarm = false;
            this.StartNumberWarm = false;
            const [hoursStr] = localstart3Time.split(':');
            const hours = parseInt(hoursStr);
            if (hours >= 0 && hours < 12) {
              timeUporDown = ' 上 ';
            } else {
              timeUporDown = ' 下 ';
            }
            localstartTripData = this.localstartTrip+" "+this.localstart3Date+timeUporDown+localstart3Time;
        }else {
          this.localstartTripWarm = true;
        }
        if(this.localfinishTrip == '1' && this.localfinish1Read !== ""){
          this.localfinishTripWarm = false;
          if(!/^\d+$/.test(this.localfinish1Read)) this.FinishNumberWarm = true;
          else{
            this.FinishNumberWarm = false;
            localfinishTripData = this.localfinishTrip+" "+this.localfinish1Read;
          }
        }else if (this.localfinishTrip == '2' && this.localfinish2Days !== "" && this.localfinish2Hour !== "" && this.localfinish2Minute !== ""){
          this.localfinishTripWarm = false;
          if(!/^\d+$/.test(this.localfinish2Days) || !/^\d+$/.test(this.localfinish2Hour) || !/^\d+$/.test(this.localfinish2Minute)) this.FinishNumberWarm = true;
          else{
            this.FinishNumberWarm = false;
            localfinishTripData = this.localfinishTrip+" "+this.localfinish2Days+"days"+this.localfinish2Hour+"h"+this.localfinish2Minute+"m";
          }
        }else if (this.localfinishTrip == '3' && this.localfinish3Date !== "" && this.localfinish3Hour !== "" && this.localfinish3Minute !== ""){
          this.localfinishTripWarm = false;
            this.FinishNumberWarm = false;
            const [hoursStr] = localfinish3Time.split(':');
            const hours = parseInt(hoursStr);
            if (hours >= 0 && hours < 12) {
              finishtimeUporDown = ' 上 ';
            } else {
              finishtimeUporDown = ' 下 ';
            }
            localfinishTripData = this.localfinishTrip+" "+this.localfinish3Date+finishtimeUporDown+localfinish3Time;
          }else {
          this.localfinishTripWarm = true;
        }
        if(this.localdurationWarm == false && this.localintervalWarm == false && this.localstartTripWarm == false && this.localfinishTripWarm == false && this.intervalNumberWarm == false && this.StartNumberWarm == false && this.StarttimeNumberalerm==false && this.FinishtimeNumberalerm==false){
          passData = {
            duration: this.localduration == "User Defined" ? "U":this.localduration == "1day" ? this.localduration.replace("day", ""):this.localduration.replace("days", ""),
            intervalread:this.localintervalreadDays+"days"+this.localintervalreadHours+"h"+this.intervalreadMinutes+"m"+this.localintervalreadSeconds+"s",
            startTrip:localstartTripData,
            finishTrip:localfinishTripData
          };
        }else{
          passData = "false"
        }
        
        this.$emit('dataToParent', passData);
      },
      showDatePicker(num) {
      if(num == 1) this.isDatePickerVisible = true;
      else this.isfinishDatePickerVisible = true;
    },
    hideDatePicker(num) {
      if(num == 1) this.isDatePickerVisible = false;
      else this.isfinishDatePickerVisible = false;
    },
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2);
      const day = ('0' + d.getDate()).slice(-2);
      return `${year}/${month}/${day}`;
    }
      }
  }
  </script>