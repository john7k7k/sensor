<template>
    <div class="pageTital">Alerm<p class="starSymbol ml-5">∗</p></div>
    <div class="InputDatacard">
      <v-radio-group class="checkBox " v-model="alerm[0]" @click="toggleRadio(alerm[0],0)" hide-details>
        <v-radio   value="true" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Raise alarm on below lower spec readings</div>
        </template>
        </v-radio>
      </v-radio-group>
      <v-radio-group class="checkBox " v-model="alerm[1]" @click="toggleRadio(alerm[1],1)" hide-details>
        <v-radio   value="true" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Raise alarm on above upper spec readings</div>
        </template>
        </v-radio>
      </v-radio-group>
      <v-radio-group class="checkBox " v-model="alerm[2]" @click="toggleRadio(alerm[2],2)" hide-details :disabled="forClick">
        <v-radio   value="true" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Deactivate alarm if connditions go back into spec</div>
        </template>
        </v-radio>
      </v-radio-group>
      <v-radio-group class="checkBox " v-model="alerm[3]" @click="toggleRadio(alerm[3],3)" hide-details :disabled="forClick">
        <v-radio   value="true" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Audible alarm and alarm link activation</div>
        </template>
        </v-radio>
      </v-radio-group>
      <v-radio-group class="checkBox " v-model="alerm[4]" @click="toggleRadio(alerm[4],4)" hide-details :disabled="forClick">
        <v-radio   value="true" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Deactivate alarm by using the magnet</div>
        </template>
        </v-radio>
      </v-radio-group>
      <div class="bigBox ">
        <v-radio-group class="bigBoxitem1" v-model="checknum1" @click="toggleRadio(checknum1,5)" hide-details :disabled="forClick">
          <v-radio   value="true" color="#E57373">
            <template v-slot:label>
            <div class="checkboxWord">Number of consecutive out of specification readings</div>
          </template>
          </v-radio>
        </v-radio-group>
        <div class="combinBox">
          <Input class="smallinputCss" v-model="alerm[5]" :border="false" size="small" :disabled="forClick"/>
          <div class="ml-5 unitWord">m</div>
        </div>
      </div>
      <div class="bigBox mt-4">
        <v-radio-group class="bigBoxitem1" v-model="checknum2" @click="toggleRadio(checknum2,6)" hide-details :disabled="forClick">
          <v-radio   value="true" color="#E57373">
            <template v-slot:label>
            <div class="checkboxWord">Total number of out of specification readings</div>
          </template>
          </v-radio>
        </v-radio-group>
        <div class="combinBox">
          <Input class="smallinputCss" v-model="alerm[6]" :border="false" size="small" :disabled="forClick" />
          <div class="ml-5 unitWord">m</div>
        </div>
      </div>
      <v-radio-group class="checkBox mt-4" v-model="alerm[7]" @click="toggleRadio(alerm[7],7)" hide-details>
        <v-radio   value="true" color="#E57373">
          <template v-slot:label>
          <div class="checkboxWord">Default</div>
        </template>
        </v-radio>
      </v-radio-group>
    </div>
  </template>
    
  <style scoped>
  .pageTital{
    font-size: 35px;
    letter-spacing: 0.5px;
    font-weight: 500;
    display: flex;
    align-items: center;
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
    margin: 0.1% 0;
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
.starSymbol{
    color: red;
    font-size: 20px;
  }
  </style>
  
  <script>
    
  export default {
    props: {
    },
      data() {
      return {
          alerm:["","","","","","0","0",""],
          checknum1:"",
          checknum2:"",
       }
      },
      computed: {
        forClick() {
          return this.alerm[0] !== "true" ||this.alerm[0] === "" && this.alerm[1] !== "true" || this.alerm[1] === "";
        }
      },
      mounted() {
        
      },
      methods: {
        toggleRadio(value,index) {
        if (value === 'true') {
          if(index !== 5 && index !== 6) this.alerm[index] = "";
          else if(index == 5) this.checknum1 = "";
          else if(index == 6) this.checknum2 = "";

        } else {
          if(index !== 5 && index !== 6) this.alerm[index] = "true";
          else if(index == 5) this.checknum1 = "true";
          else if(index == 6) this.checknum2 = "true";
        }
      },
      PassData() {
        if(this.checknum1 == "") this.alerm[5] = 0;
        if(this.checknum2 == "") this.alerm[6] = 0;
        if(this.alerm[7] == "true"){
          this.alerm[0] = this.alerm[1] = this.alerm[2] = this.alerm[3] = this.alerm[4] = "";
          this.alerm[5] = this.alerm[6] = 0
        }
        let passData = {
          alerm:[this.alerm[0] !== "" ? true:false,
                 this.alerm[1] !== "" ? true:false,
                 this.alerm[2] !== "" ? true:false,
                 this.alerm[3] !== "" ? true:false,
                 this.alerm[4] !== "" ? true:false,
                 parseInt(this.alerm[5]),
                 parseInt(this.alerm[6]),
                 this.alerm[7] !== "" ? true:false,
                ],
        };
        this.$emit('dataToParent', passData);
      },
      }
  }
  </script>