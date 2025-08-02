<template>
  <div class="control-panel">
    <!-- 温度控制 -->
    <el-card class="control-box">
      <h3>温度控制</h3>
      <el-slider v-model="temperature" :min="10" :max="35" step="0.1" label="温度 (°C)"></el-slider>
      <el-switch v-model="temperatureSensorStatus" active-text="开启" inactive-text="关闭" />
    </el-card>

    <!-- 湿度控制 -->
    <el-card class="control-box">
      <h3>湿度控制</h3>
      <el-slider v-model="humidity" :min="30" :max="80" step="1" label="湿度 (%)"></el-slider>
      <el-switch v-model="humiditySensorStatus" active-text="开启" inactive-text="关闭" />
    </el-card>

    <!-- CO2 控制 -->
    <el-card class="control-box">
      <h3>二氧化碳控制</h3>
      <el-slider v-model="co2" :min="300" :max="1500" step="10" label="CO2 浓度 (ppm)"></el-slider>
      <el-switch v-model="co2SensorStatus" active-text="开启" inactive-text="关闭" />
      <el-switch v-model="ventilationSystem" active-text="启用通风" inactive-text="关闭通风" />
    </el-card>

    <!-- 光照控制 -->
    <el-card class="control-box">
      <h3>光照控制</h3>
      <el-slider v-model="lightIntensity" :min="0" :max="100" step="1" label="光照强度 (%)"></el-slider>
      <el-switch v-model="lightSensorStatus" active-text="开启" inactive-text="关闭" />
    </el-card>

    <!-- 土壤水分控制 -->
    <el-card class="control-box">
      <h3>土壤水分控制</h3>
      <el-slider v-model="soilMoisture" :min="0" :max="100" step="1" label="土壤水分 (%)"></el-slider>
      <el-switch v-model="irrigationSystem" active-text="开启灌溉" inactive-text="关闭灌溉" />
    </el-card>

    <!-- 养分控制 -->
    <el-card class="control-box">
      <h3>植物养分控制</h3>
      <el-slider v-model="nutrientLevel" :min="0" :max="100" step="1" label="养分浓度 (%)"></el-slider>
      <el-switch v-model="fertilizerSystem" active-text="启用施肥" inactive-text="关闭施肥" />
    </el-card>

    <!-- 自动/手动模式切换 -->
    
  </div>
</template>

<script setup>
import { ref } from 'vue';

const temperature = ref(22);  // 温度
const humidity = ref(50);     // 湿度
const co2 = ref(400);         // 二氧化碳浓度
const lightIntensity = ref(75); // 光照强度
const soilMoisture = ref(40);  // 土壤水分
const nutrientLevel = ref(60); // 养分浓度

const temperatureSensorStatus = ref(true);
const humiditySensorStatus = ref(true);
const co2SensorStatus = ref(true);
const lightSensorStatus = ref(true);
const irrigationSystem = ref(false);
const fertilizerSystem = ref(false);
const ventilationSystem = ref(false);

const controlMode = ref('auto'); // 控制模式: auto or manual
</script>

<style scoped>
.control-panel {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.control-box {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
