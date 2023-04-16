<template>
    <div id="food">{{ label }}</div>
    <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: capPercentage + '%'}"></div>
    </div>
    <div class="raised">{{ value }} / {{ max }} raised</div>
    <div class="percent"> {{ percentage }}% completed</div>
</template>
  
<script>
  export default {
    props: {
      label: String,
      min: Number,
      max: Number,
      value: Number,
    },

    computed: {
        capPercentage() {
            return Math.min(((this.value - this.min) / (this.max - this.min) * 100), 100);
        },

        percentage() {
            if (this.max != 0) {
                return parseFloat((this.value - this.min) / (this.max - this.min) * 100).toFixed(2);
            } else {
                return parseFloat(0).toFixed(2);
            }

        }
    }
};
</script>
  
<style>
.progress-bar {
  background-color: #CDE8E6;
  height: 20px;
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  }
  
.progress-bar-fill {
  background-color: #4caf50;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: width 0.3s ease-in-out;
  }

#food {
  text-align: left;
  font-weight: bolder;
  font-size: 30px;
  }

.raised {
  text-align: right;
  font-weight: bold;
  font-size: 25px;
}

.percent {
  text-align: right;
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 20px;
}
</style>
  