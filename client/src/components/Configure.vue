<template>
  <div class="Cbox">
    <div class="tital">Program and Configure</div> 
    <v-btn class="closeBtn" density="comfortable" icon="$close" variant="plain" @click="closeModal"></v-btn>
    <div class="stepBox">
      <div class="stepBoxitem">
        <div class="circleNum mb-1" :class="{ circleNumNow: Step1Now === true }" v-if="!Step1done">1</div>
        <div class="circleNum mb-1" v-if="Step1done" :class="{ circleNumDone: Step1done === true }"><span class="mdi mdi-check"></span></div>
        <div class="stepWord" :class="{ stepWordDone: Step1done === true }">Specification</div>
      </div>
      <div class="horizontal-line"></div>
      <div class="stepBoxitem">
        <div class="circleNum mb-1" :class="{ circleNumNow: Step2Now === true }" v-if="!Step2done">2</div>
        <div class="circleNum mb-1" v-if="Step2done" :class="{ circleNumDone: Step2done === true }"><span class="mdi mdi-check"></span></div>
        <div class="stepWord" :class="{ stepWordDone: Step2done === true }">Startup</div>
      </div>
      <div class="horizontal-line"></div>
      <div class="stepBoxitem">
        <div class="circleNum mb-1" :class="{ circleNumNow: Step3Now === true }" v-if="!Step3done">3</div>
        <div class="circleNum mb-1" v-if="Step3done" :class="{ circleNumDone: Step3done === true }"><span class="mdi mdi-check"></span></div>
        <div class="stepWord" :class="{ stepWordDone: Step3done === true }">Alerm</div>
      </div>
      <div class="horizontal-line"></div>
      <div class="stepBoxitem">
        <div class="circleNum mb-1" :class="{ circleNumNow: Step4Now === true }" v-if="!Step4done">4</div>
        <div class="circleNum mb-1" v-if="Step4done" :class="{ circleNumDone: Step4done === true }"><span class="mdi mdi-check"></span></div>
        <div class="stepWord" :class="{ stepWordDone: Step4done === true }">Summary</div>
      </div>
    </div> 
    <div class="pageCard">
      <ConfigurePage1 v-if="Step1show" ref="childComponent1" @dataToParent="handleDataFromChild"></ConfigurePage1>
      <ConfigurePage2 v-if="Step2show"></ConfigurePage2>
      <ConfigurePage3 v-if="Step3show"></ConfigurePage3>
      <ConfigurePage4 v-if="Step4show"></ConfigurePage4>
    </div>
    <div class="btnBox">
      <v-btn rounded="xl" prepend-icon="mdi mdi-chevron-left" class="backbtnIcon" @click="Backpage"><div class="btnWord">Back</div></v-btn>
      <v-btn v-if="!confirmBtnShow" rounded="xl" append-icon="mdi mdi-chevron-right" class="nextbtnIcon" @click="Nextpage"><div class="btnWord">Next</div></v-btn>
      <v-btn v-if="confirmBtnShow" rounded="xl"  class="nextbtnIcon" ><div class="btnWord">Confirm</div></v-btn>
    </div>
  </div>
</template>
  
<style scoped>
.closeBtn{
  position: absolute;
  right: 5%;
  font-size: 20px;
}
.Cbox{
 display: flex;
 flex-direction: column;
 align-items: center;
 width: 90%;
 height: 90%;
}
.tital{
  font-size: 22px;
  font-weight:500;
  letter-spacing: 1px;
}
.stepBox{
  width: 60%;
  height: 10%;
  margin-top: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circleNum {
  width: 35px;
  height: 35px;
  font-size: 17px;
  color: #BDBDBD;
  border: 1.6px solid #BDBDBD;
  border-radius: 50%; 
  display: flex;
  align-items: center;
  justify-content: center;
}
.circleNumNow{
  color: white;
  background-color: #E57373;
  border: 1.6px solid #E57373;
}
.circleNumDone{
  color: white;
  background-color: #E57373;
  border: 1.6px solid #E57373;
  font-size: 22px;
}
.stepBoxitem{
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stepWord{
  color: #BDBDBD;
  font-size: 12px;
}
.stepWordDone{
  color: black;
}
.horizontal-line {
  width: 14%; 
  height: 1.5px; 
  background-color: #BDBDBD;
  position: relative;
  bottom: 13px;
}
.pageCard{
  width: 100%;
  height: 80%;
}
.btnBox{
  display: flex;
  justify-content: center;
}
.backbtnIcon{
  font-size: 22px;
  color:#757575;
  margin-right: 10%;
}
.nextbtnIcon{
  font-size: 22px;
  color:white;
  background-color: #616161;
  margin-left: 10%;
}
.btnWord{
  font-size: 16px;
}

</style>

<script>
import ConfigurePage1 from '@/components/ConfigurePage1.vue'
import ConfigurePage2 from '@/components/ConfigurePage2.vue'
import ConfigurePage3 from '@/components/ConfigurePage3.vue'
import ConfigurePage4 from '@/components/ConfigurePage4.vue'
  export default {
    name: 'HomeView',
    components: {
      ConfigurePage1,ConfigurePage2,ConfigurePage3,ConfigurePage4
      },
    data() {
      return {
        Step1done:false,
        Step2done:false,
        Step3done:false,
        Step4done:false,
        Step1show:true,
        Step2show:false,
        Step3show:false,
        Step4show:false,
        Step1Now:true,Step2Now:false,Step3Now:false,Step4Now:false,
        NowStep:1,
        SensorID:"",
        answer:"",
        confirmBtnShow:false,
      }
    },
    mounted() {
    },
    methods: {
      closeModal() {
      this.NowStep = 1;
      this.handleStepShow(this.NowStep);
      this.$emit('close-modal');
      
      },
      Backpage(){
        if(this.NowStep == 0) return;
        this.NowStep -= 1;
        this.handleStepShow(this.NowStep);
      },
      Nextpage(){
        this.NowStep += 1;
        this.handleStepShow(this.NowStep);
        
        //this.$refs.childComponent1.PassData();
      },
      handleStepShow(num){
        if(num == 1){
          this.Step1show = true;
          this.Step2show = this.Step3show = this.Step4show = false;
          this.Step1done = this.Step2done = this.Step3done = this.Step4done = false;
          this.confirmBtnShow = this.Step2Now = this.Step3Now = this.Step4Now = false;
          this.Step1Now = true;
        }else if(num == 2){
          this.Step2show = true;
          this.Step1show = this.Step3show = this.Step4show = false;
          this.Step1done = true;
          this.Step2done = this.Step3done = this.Step4done = false;
          this.confirmBtnShow = this.Step1Now = this.Step3Now = this.Step4Now = false;
          this.Step2Now = true;
        }else if(num == 3){
          this.Step3show = true;
          this.Step1show = this.Step2show = this.Step4show = false;
          this.Step1done = this.Step2done =true;
          this.Step3done = this.Step4done = false;
          this.confirmBtnShow = this.Step1Now = this.Step2Now = this.Step4Now = false;
          this.Step3Now = true;
        }else if(num == 4){
          this.Step4show = true;
          this.Step1show = this.Step2show = this.Step3show = false;
          this.Step1done = this.Step2done = this.Step3done = true; 
          this.Step4done = false;
          this.confirmBtnShow = true;
          this.Step1Now = this.Step2Now = this.Step3Now = false;
          this.Step4Now = true;
        }
      },
      handleDataFromChild(data) {
      this.answer = data;
      alert(this.answer);
    }

    }
  }
</script>