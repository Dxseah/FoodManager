<template>
    <div class="progress-bar">
      <div class="progress-bar-fill" :style="{ width: percentComplete + '%' }"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      percentComplete: {
        type: Number,
        default: 0,
        required: true
      }
    }
  };
  </script>
  
  <style>
  .progress-bar {
    background-color: #f2f2f2;
    height: 20px;
    position: relative;
    width: 100%;
  }
  
  .progress-bar-fill {
    background-color: #4caf50;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transition: width 0.3s ease-in-out;
  }
  </style>
  