<template>
  <div class="home">
    <div class="item1">
      <Navbar></Navbar>
    </div>
    <div class="item2">
      <div class="titalbox">
        <div class="tital font-weight-medium">Sensor connection Adaptor</div>
        <v-text-field
            v-model="searchId"
            label="Search Number"
            prepend-inner-icon="mdi-magnify"
            class="searchnum"
            density="compact"
            variant="solo-filled"
            rounded="xl"
            bg-color="#EEEEEE"
          ></v-text-field>
      </div>
      <div class="titalword">Click on the following buttons to view the information you requeted</div>
      <div class="box">
        <DataCards v-for="num in filteredData" :key="num" :chartId="'myChart' + num" :sensornum="num"></DataCards>
      </div>
    </div>
  </div>
</template>
<style scoped>
.home{
  display:flex ;
  width: 100%;
  height: 100%;
}
.item1{
  width: 15%;
}
.item2{
  width: 85%;
}
.tital{
  font-size: 40px;
  letter-spacing: 1px;
  margin-top: 4%;
}
.titalword{
  color: #757575;
  font-size: 16px;
  margin-top: 0.5%;
  margin-bottom: 1%;
}
.titalbox{
  display: flex;
  width: 95%;
  justify-content: space-between;
}
.searchnum{
  max-width: 20%;
  max-height: 20px;
  border-radius: 50px;
  margin-right: 4%;
  margin-top: 3%;
}
.box{
  display: flex;
  width: 95%;
  justify-content: start;
  flex-wrap: wrap;
}
</style>

<script>
import DataCards from '@/components/DataCards.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'HomeView',
  components: {
    DataCards,Navbar
  },
  data: () => ({
    number:["39-78","39-71","39-72","39-73","39-74","39-75"],
    searchId:"",
  }),
  computed: {
        filteredData() {
            if (!this.searchId) {
              return this.number;
            } else if(this.number){
              return this.number.filter(item => {
                return item.includes(this.searchId.toLowerCase());
              });
            }else{
              return [];
            }
        },
  },
}
</script>

