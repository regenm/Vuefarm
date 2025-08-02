<template>
  <div>
    <!-- Box Section: Displaying all the data boxes -->
    <div class="box-section">
      <el-row>
        <el-col :span="4">
          <temperatureBox />
        </el-col>
        <el-col :span="4">
          <humidBox />
        </el-col>
        <el-col :span="4">
          <co2Box />
        </el-col>
        <el-col :span="4">
          <lightBox />
        </el-col>
        <el-col :span="4">
          <soildHumidBox />
        </el-col>
        <el-col :span="4">
          <nutriantsBox />
        </el-col>
      </el-row>
    </div>

    <!-- Divider: To separate box section and chart section -->
    <el-divider></el-divider>

    <!-- Buttons for selecting charts -->
    <div class="button-group" style="margin-bottom: 20px;">
      <button 
        v-for="option in granularityOptions" 
        :key="option.value"
        @click="toggleChart(option.value)"
        :style="{
          margin: '5px 15px', 
          padding: '8px 16px', 
          background: activeTabs.includes(option.value) ? '#409EFF' : '#f0f0f0',
          color: activeTabs.includes(option.value) ? '#fff' : '#333',
          border: 'none', 
          borderRadius: '20px', /* 增加圆角 */
          cursor: 'pointer',
          fontSize: '16px', /* 增加字体大小 */
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', /* 添加轻微的阴影 */
          transition: 'all 0.3s ease', /* 添加平滑过渡效果 */
        }"
      >
        {{ option.label }}
      </button>

    </div>

    <!-- Displaying the charts based on activeTabs -->
    <temperatureChart v-show="activeTabs.includes('temperature')" />
    <humidChart v-show="activeTabs.includes('humidity')" />
    <co2Chart v-show="activeTabs.includes('co2')" />
    <lightChart v-show="activeTabs.includes('light')" />
    <soilHumidChart v-show="activeTabs.includes('soilHumid')" />
    <nutriantsChart v-show="activeTabs.includes('nutriants')" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import temperatureBox   from '@/components/childrencomponents/displayBox/temperatureBox.vue'
import humidBox         from '@/components/childrencomponents/displayBox/humidBox.vue'
import co2Box           from '@/components/childrencomponents/displayBox/co2Box.vue'
import lightBox         from '@/components/childrencomponents/displayBox/lightBox.vue'
import soildHumidBox    from '@/components/childrencomponents/displayBox/soilHumidBox.vue'
import nutriantsBox     from '@/components/childrencomponents/displayBox/nutriantsBox.vue'
import temperatureChart from '@/components/childrencomponents/echarts/temperatureChart.vue'
import co2Chart         from '@/components/childrencomponents/echarts/co2Chart.vue'
import lightChart       from '@/components/childrencomponents/echarts/lightChart.vue'
import soilHumidChart   from '@/components/childrencomponents/echarts/soilHumidChart.vue'
import nutriantsChart   from '@/components/childrencomponents/echarts/nutriantsChart.vue'
import humidChart       from '@/components/childrencomponents/echarts/humidChart.vue'

const activeTabs = ref([ 'temperature', 'humidity', 'co2', 'light', 'soilHumid', 'nutriants' ])

const granularityOptions = [
  { label: 'Temperature', value: 'temperature' },
  { label: 'Humidity', value: 'humidity' },
  { label: 'CO2', value: 'co2' },
  { label: 'Light', value: 'light' },
  { label: 'Soil Humidity', value: 'soilHumid' },
  { label: 'Nutrients', value: 'nutriants' }
]

// Toggle chart visibility
function toggleChart(value) {
  if (activeTabs.value.includes(value)) {
    activeTabs.value = activeTabs.value.filter(item => item !== value)
  } else {
    activeTabs.value.push(value)
  }
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
  color: #000;
  display: block;
  min-width: 300px;
}

.button-group button {
  margin: 0 5px;
  padding: 5px 10px;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-group button:hover {
  background: #409EFF;
  color: white;
}

</style>
