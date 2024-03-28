<template>
    
    <div class="loadBox">
        <div class="loader ">
        <span v-for="i in 7" :key="i" :style="{ animationDelay: i * 0.2 + 's' }"></span>
        </div>
        <div class="loadWord mt-5">{{ loadingText }}</div>
    </div>
    <svg v-show="false">
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          type="matrix"
          in="blur"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 10 -5"
        />
      </filter>
    </svg>
  </template>
  
  <style scoped>
  .loadBox{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .loader {
    width: 50%;
    height: 50%;
    filter: url(#gooey);
    transform: scale(0.7);
  }
  
  .loader span {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
    height: 60%;
    transform: rotate(45deg);
    animation: rotate 2s ease-in-out infinite;
  }
  
  .loader span:before {
    content: '';
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background-color: #0093e9;
    background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
    box-shadow: 0 0 15px blue;
  }
  .loadWord{
    font-size: 40px;
    font-weight: bold;
  }
  @keyframes rotate {
    to {
      transform: rotate(405deg);
    }
  }
  </style>

<script>
export default {
  data() {
    return {
      loadingText: 'Loading',
      dotsCount: 1,
      interval: 500, // 0.5秒
      timer: null
    };
  },
  mounted() {
    // 在組件被加載後啟動定時器
    this.timer = setInterval(this.updateText, this.interval);
  },
  beforeUnmount() {
    // 在組件被銷毀前清除定時器
    clearInterval(this.timer);
  },
  methods: {
    updateText() {
      // 根據點點的數量來更新文字
      switch (this.dotsCount % 4) {
        case 0:
          this.loadingText = 'Loading';
          break;
        case 1:
          this.loadingText = 'Loading.';
          break;
        case 2:
          this.loadingText = 'Loading..';
          break;
        case 3:
          this.loadingText = 'Loading...';
          break;
      }
      // 增加點點的數量
      this.dotsCount++;
    }
  }
};
</script>
  