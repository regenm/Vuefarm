<template>
  <el-card class="nutrient-card" shadow="hover">
    <div class="content">
      当前营养含量：
      <span class="nutrient">{{ nutrient }}%</span>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

// 示例固定营养含量
const nutrient = ref(25)  // 营养含量（百分比）
</script>

<style scoped>
.nutrient-card {
  width: 200px;           /* 卡片宽度 */
  text-align: center;     /* 内容居中 */
  font-size: 20px;
  height: 100px;
}

.nutrient {
  color: #ff5722;         /* 橙红色 */
  font-weight: bold;
  font-size: 24px;
}
</style>
