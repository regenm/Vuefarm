<template>
  <el-card class="temperature-card" shadow="hover">
    <div class="content">
      当前空气湿度：
      <span class="temperature">{{ temperature }}°C</span>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

// 示例固定湿度
const temperature = ref(25)
</script>

<style scoped>
.temperature-card {
  width: 200px;           /* 卡片宽度 */
  text-align: center;     /* 内容居中 */
  font-size: 20px;
}

.temperature {
  color: #ff5722;         /* 橙红色 */
  font-weight: bold;
  font-size: 24px;
}
</style>
