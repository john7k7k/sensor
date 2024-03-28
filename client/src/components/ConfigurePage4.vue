<template>
    
    <div class="InputDatacard">
      <div class="circleNum" ><span class="mdi mdi-check"></span></div>
      <div class="pageTital">Summary</div>
      <div class="mt-5 resultWord">Logger will start in 1 minute</div>
      <div class="resultWord">recording a reading every 6 Seconds</div>
      <div class="resultWord">and will finish logging 2024/03/14 PM 10:37:59</div>
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