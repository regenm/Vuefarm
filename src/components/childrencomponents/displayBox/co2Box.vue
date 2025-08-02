<template>
    <el-card class="co2-card" shadow="hover">
      <div class="content">
        当前CO₂浓度：
        <span class="co2">{{ co2Level }} ppm</span>
      </div>
    </el-card>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 示例固定CO₂浓度（单位：ppm）
  const co2Level = ref(400)  // CO₂浓度（ppm）
  </script>
  
  <style scoped>
  .co2-card {
    width: 200px;  
    height: 100px;         /* 卡片宽度 */
    text-align: center;     /* 内容居中 */
    font-size: 20px;
  }
  
  .co2 {
    color: #ff5722;         /* 橙红色 */
    font-weight: bold;
    font-size: 24px;
  }
  </style>
  