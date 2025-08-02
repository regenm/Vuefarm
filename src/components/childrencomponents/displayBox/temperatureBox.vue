<template>
    <el-card class="temperature-card" shadow="hover">
      <div class="content">
        当前 温度：
        <span class="temperature">{{ temperature }}°C</span>
      </div>
    </el-card>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 示例固定温度
  const temperature = ref(25)
  </script>
  
  <style scoped>
  .temperature-card {
    width: 200px;           /* 卡片宽度 */
    text-align: center;     /* 内容居中 */
    font-size: 20px;
    height: 100px;
  }
  
  .temperature {
    color: #ff5722;         /* 橙红色 */
    font-weight: bold;
    font-size: 24px;
  }
  </style>
  