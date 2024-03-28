<template>
    <div class="pageTital">Specification</div>
    <div class="InputDatacard">
        <div class="inputItem1">
          <div>
            <div class="dataTital">Pin(0-15)<p class="starSymbol ml-5">∗</p></div>
            <div class="warmTital" v-if="SensorIDWarm">Please provide the required information.</div>
            <Input class="inputCss" v-model="localSensorID" :border="false" size="small" />
          </div>
          <div>
            <v-radio-group class="checkBox " v-model="localchoosevalue1" @click="toggleRadio" hide-details>
              <v-radio class="checkboxWord" label="Enable the beeper in the logger(s)" value="true" color="#E57373"></v-radio>
            </v-radio-group>
            <v-radio-group class="checkBox" v-model="localchoosevalue2" @click="toggleRadio2" hide-details>
              <v-radio class="checkboxWord" label="New battery is fitted" value="true" color="#E57373"></v-radio>
            </v-radio-group>
          </div>
        </div>
        <div class="inputItem2">
          <div class="dataTital">Minimum</div>
          <Input class="inputCss" v-model="localMinimum" :border="false" size="small" />
          <div class="dataTital2">Maximum</div>
          <Input class="inputCss" v-model="localMaximum" :border="false" size="small" />
          <div class="dataTital2">Increment</div>
          <Input class="inputCss" v-model="localIncrement" :border="false" size="small" />
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
    margin-top: 6%;
    margin-bottom: 2%;
  }
  .starSymbol{
    color: red;
    font-size: 20px;
  }
  .warmTital{
    color: red;
  }
  .InputDatacard{
    width: 100%;
    height: 70%;
    display: flex;
  }
  .inputItem1,.inputItem2{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .inputCss{
    width: 40%;
    padding: 5px;
    border: 1px solid #BDBDBD;
    border-radius: 25px;
    margin-bottom: 1%;
  }
  .checkBox{
    position: relative;
    top: 9px;
    right: 2%;
  }
  .checkboxWord{
    font-weight: bold;
  }
  
  </style>
  
  <script>
  export default {
    props: {
      SensorID: {
        type: String,
        required: true
      },
      minimum: {
        type: String,
        required: true
      },
      maximum: {
        type: String,
        required: true
      },
      increment: {
        type: String,
        required: true
      },
      choosevalue1: {
        type: String,
        required: true
      },
      choosevalue2: {
        type: String,
        required: true
      },

    },
    data() {
      return {
        localchoosevalue1: this.choosevalue1.toString(),
        localchoosevalue2: this.choosevalue2.toString(),
        localSensorID: this.SensorID,
        localMinimum: this.minimum,
        localMaximum: this.maximum,
        localIncrement: this.increment,
        SensorIDWarm:false
      }
    },
    mounted() {
    },
    methods: {
      toggleRadio() {
        if (this.localchoosevalue1 === 'true') {
          this.localchoosevalue1 = '';
        } else {
          this.localchoosevalue1 = 'true';
        }
      },
      toggleRadio2() {
        if (this.localchoosevalue2 === 'true') {
          this.localchoosevalue2 = '';
        } else {
          this.localchoosevalue2 = 'true';
        }
      },
      PassData() {
        if (this.localSensorID.trim() === "" || !/^\d+$/.test(this.localSensorID)) {
            this.SensorIDWarm = true;
            this.localSensorID = "nodata";
        } else {
            this.SensorIDWarm = false;
        }
        let passData = {
            pin: this.localSensorID,
            beeper: this.localchoosevalue1 !== "" ? true : false,
            newbattery: this.localchoosevalue2 !== "" ? true : false,
            minimum: this.localMinimum,
            maximum: this.localMaximum,
            increment: this.localIncrement
          };
        this.$emit('dataToParent', passData);
      }
    }
  }
  </script>
  