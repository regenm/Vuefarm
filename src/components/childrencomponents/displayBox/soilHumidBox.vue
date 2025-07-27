<template>
  <el-card class="humidity-card" shadow="hover">
    <div class="content">
      当前土壤湿度：
      <span class="humidity">{{ humidity }}%</span>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

// 示例固定土壤湿度
const humidity = ref(60)  // 土壤湿度（百分比）
</script>

<style scoped>
.humidity-card {
  width: 200px;           /* 卡片宽度 */
  text-align: center;     /* 内容居中 */
  font-size: 20px;
}

.humidity {
  color: #ff5722;         /* 橙红色 */
  font-weight: bold;
  font-size: 24px;
}
</style>
