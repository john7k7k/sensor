<template>
    <div class="pageTital">Specification</div>
    <div class="InputDatacard">
        <div class="inputItem1">
          <div>
            <div class="dataTital">Description</div>
            <Input class="inputCss" v-model="SensorID" :border="false" size="small" />
          </div>
          <div>
            <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
              <v-radio class="checkboxWord" label="Enable the beeper in the logger(s)" value="one" color="#E57373"></v-radio>
            </v-radio-group>
            <v-radio-group class="checkBox" v-model="choosevalue2" @click="toggleRadio2" hide-details>
              <v-radio class="checkboxWord" label="New battery is fitted" value="two" color="#E57373"></v-radio>
            </v-radio-group>
          </div>
        </div>
        <div class="inputItem2">
          <div class="dataTital">Minimum</div>
          <Input class="inputCss" v-model="SensorID" :border="false" size="small" />
          <div class="dataTital2">Maximum</div>
          <Input class="inputCss" v-model="SensorID" :border="false" size="small" />
          <div class="dataTital2">Increment</div>
          <Input class="inputCss" v-model="SensorID" :border="false" size="small" />
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
    margin: 2% 0;
  }
  .dataTital2{
    font-size: 20px;
    letter-spacing: 0.1px;
    color: #757575;
    margin-top: 6%;
    margin-bottom: 2%;
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
  }
  .checkBox{
    position: relative;
    top: 10px;
    right: 2%;
  }
  .checkboxWord{
    font-weight: bold;
  }
  
  </style>
  
<script>
    
export default {
  props: {
  },
    data() {
    return {
        SensorID:"",
        choosevalue1: "",
        choosevalue2: "",
     }
    },
    mounted() {
    },
    methods: {
      toggleRadio() {
      if (this.choosevalue1 === 'one') {
        this.choosevalue1 = '';
      } else {
        this.choosevalue1 = 'one';
      }
    },
    toggleRadio2() {
      if (this.choosevalue2 === 'one') {
        this.choosevalue2 = '';
      } else {
        this.choosevalue2 = 'one';
      }
    },
    PassData(){
      this.$emit('dataToParent', this.choosevalue1);
    }
    }
}
</script>