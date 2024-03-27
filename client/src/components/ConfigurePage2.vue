<template>
    <div class="pageTital">Startup</div>
    <div class="InputDatacard">
        <div class="inputItem1">
          <div>
            <div class="dataTital">Duration of a trip</div>
            <div class="combinBox mb-15">
              <div class="selectbox ">
                <v-select v-model="selectedDays" :items="items" density="compact"  class="selecttime" rounded="xl"  
                bg-color="white"  flat variant="solo" ></v-select>
              </div>
              <div class="ml-5 unitWord">Days</div>
            </div>
          </div>
          <div>
            <div class="dataTital">Interval between each reading</div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord">h</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord">m</div>
            </div>
            <div class="combinBox">
              <Input class="smallinputCss" v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord">s</div>
            </div>
            
          </div>
        </div>
        <div class="inputItem2">
          <div class="dataTital2">Start new log trip</div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="one" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">Wait</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
              <div class="ml-5 unitWord">after a magnetic start</div>
            </div>
          </div>
          <div class="chooseLogtripBox ">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="one" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">In</div>
            </div>
            <div class="chooseLogtripBoxitem2 ">
              <Input class="ml-7 smallinputCss2" v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
              <Input class="ml-5 smallinputCss2 " v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord ">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
            </div>
          </div>
          <div class="chooseLogtripBox ">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="one" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">At</div>
            </div>
            <div class="chooseLogtripBoxitem2 ">
              <Input class="ml-7 smallinputCss2" v-model="InputDays" :border="false" size="small" />
            </div>
          </div>
          <div class="dataTital">Finish log trip</div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="one" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">After</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord">h</div>
              <div class="ml-5 unitWord">readings</div>
            </div>
          </div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="one" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord ">After</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord">Days</div>
              <Input class="ml-5 smallinputCss2 " v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord ">h</div>
              <Input class="ml-5 smallinputCss2 " v-model="InputDays" :border="false" size="small" />
              <div class="ml-5 unitWord ">m</div>
            </div>
          </div>
          <div class="chooseLogtripBox">
            <div class="chooseLogtripBoxitem1">
              <v-radio-group class="checkBox " v-model="choosevalue1" @click="toggleRadio" hide-details>
                <v-radio class="checkboxWord"  value="one" color="#E57373"></v-radio>
              </v-radio-group>
              <div class="unitWord mr-4">At</div>
            </div>
            <div class="chooseLogtripBoxitem2">
              <Input class="ml-7 smallinputCss2" v-model="InputDays" :border="false" size="small" />
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
    margin: 2% 0;
  }
  .dataTital2{
    font-size: 20px;
    letter-spacing: 0.1px;
    color: #757575;
    margin: 1.5% 0;
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
          SensorID:"",
          choosevalue1: "",
          choosevalue2: "",
          items: ['1 Day', '2 Days', '3 Days', '4 Days', '5 Days', '6 Days', '7 Days'],
          selectedDays:"User Defined",
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