<template>
  <el-card class="light-card" shadow="hover">
    <div class="content">
      当前光照强度：
      <span class="light">{{ lightIntensity }} lx</span>
    </div>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'

// 示例固定光照强度（单位：Lux）
const lightIntensity = ref(500)  // 光照强度（Lux）
</script>

<style scoped>
.light-card {
  width: 200px;           /* 卡片宽度 */
  text-align: center;     /* 内容居中 */
  font-size: 20px;
  height: 100px;
}

.light {
  color: #ff5722;         /* 橙红色 */
  font-weight: bold;
  font-size: 24px;
}
</style>
