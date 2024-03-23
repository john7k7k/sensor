<template>
    <div class="pageTital">Alerm</div>
    <div class="InputDatacard">
      <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
        <v-radio   value="one" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Raise alarm on below lower spec readings</div>
        </template>
        </v-radio>
      </v-radio-group>
      <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
        <v-radio   value="one" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Raise alarm on above upper spec readings</div>
        </template>
        </v-radio>
      </v-radio-group>
      <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
        <v-radio   value="one" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Deactivate alarm if connditions go back into spec</div>
        </template>
        </v-radio>
      </v-radio-group>
      <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
        <v-radio   value="one" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">EAudible alarm and alarm link activation</div>
        </template>
        </v-radio>
      </v-radio-group>
      <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
        <v-radio   value="one" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Deactivate alarm by using the magnet</div>
        </template>
        </v-radio>
      </v-radio-group>
      <div class="bigBox ">
        <v-radio-group class="bigBoxitem1" v-model="choosevalue1" @click="toggleRadio" hide-details>
          <v-radio   value="one" color="#E57373">
            <template v-slot:label>
            <div class="checkboxWord">Number of consecutive out of specification readings</div>
          </template>
          </v-radio>
        </v-radio-group>
        <div class="combinBox">
          <Input class="smallinputCss" v-model="InputDays" :border="false" size="small" />
          <div class="ml-5 unitWord">m</div>
        </div>
      </div>
      <div class="bigBox mt-4">
        <v-radio-group class="bigBoxitem1" v-model="choosevalue1" @click="toggleRadio" hide-details>
          <v-radio   value="one" color="#E57373">
            <template v-slot:label>
            <div class="checkboxWord">Total number of out of specification readings</div>
          </template>
          </v-radio>
        </v-radio-group>
        <div class="combinBox">
          <Input class="smallinputCss" v-model="InputDays" :border="false" size="small" />
          <div class="ml-5 unitWord">m</div>
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
    margin: 2% 0;
  }
  .InputDatacard{
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    padding-top: 1%;
    justify-content: space-around;
  }
  
  .checkBox{
    width: 100%;
    position: relative;
    right: 10px;
    display: flex;
    align-items: center;
    height: 15%;
    margin: 0.5% 0;
  }
  .checkboxWord{
    font-weight: bold;
    color: black;
    font-size: 20px;
  }
.bigBox{
    width: 100%;
    height:10%;
    display: flex;
    align-items: center;
    position: relative;
    right: 10px;
  }
.bigBoxitem1{
  width: 80%;
  height: 100%;
}
  .combinBox{
  display: flex;
  width: 20%;
  height: 100%;
  align-items: center;
  justify-content: end;
}
.smallinputCss{
    width: 60%;
    padding: 5px;
    border: 1px solid #BDBDBD;
    border-radius: 25px;
}
.unitWord{
  font-size: 17px;
  font-weight: bolder;
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