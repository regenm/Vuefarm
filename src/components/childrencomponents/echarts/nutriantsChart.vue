<template>
  <div>
    <div style="text-align: center; margin-bottom: 10px;">
      <button 
        v-for="option in granularityOptions" 
        :key="option.value" 
        @click="changeGranularity(option.value)"
        :style="{ margin: '0 5px', padding: '5px 10px', background: selectedGranularity === option.value ? '#409EFF' : '#f0f0f0', color: selectedGranularity === option.value ? '#fff' : '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }"
      >
        {{ option.label }}
      </button>
    </div>
    <div ref="chartRef" class="chart"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const chartRef = ref(null)
let myChart = null

// 当前选中的颗粒度
const selectedGranularity = ref('1d')

// 颗粒度选项
const granularityOptions = [
  { label: '过去24小时', value: '1d' },
  { label: '过去2天', value: '2d' },
  { label: '过去3天', value: '3d' },
  { label: '过去1周', value: '7d' },
  { label: '过去1个月', value: '30d' }
]

onMounted(() => {
  myChart = echarts.init(chartRef.value)
  updateChart()
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})

// 切换颗粒度
function changeGranularity(granularity) {
  selectedGranularity.value = granularity
  updateChart()
}

// 模拟土壤营养含量数据（白天降低，夜间回升）
function generateNutrientContentData(count) {
  const data = []
  let base = 60 + Math.random() * 10 // 起始营养含量（60%）
  for (let i = 0; i < count; i++) {
    const hour = (i * 24) / count // 计算当前点对应的小时
    if (hour >= 6 && hour <= 18) {
      // 白天（6点到18点），营养含量逐渐降低
      base -= Math.random() * 0.5
      if (base < 30) base = 30 // 保持最低营养含量为30%
    } else {
      // 晚上（18点到6点），营养含量回升
      base += Math.random() * 1
      if (base > 70) base = 70 // 保持最高营养含量为70%
    }
    data.push(parseFloat(base.toFixed(1)))
  }
  return data
}

// 根据颗粒度生成横坐标 & 更新图表
function updateChart() {
  const count = 20 // 固定 20 个点
  const now = new Date()
  const xData = []
  const yData = generateNutrientContentData(count)

  if (selectedGranularity.value === '1d') {
    // 过去24小时 → 每小时间隔 (20个点)
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * (24 / count) * 3600 * 1000)
      xData.push(`${d.getHours()}:00`)
    }
  } else if (selectedGranularity.value === '2d') {
    // 过去2天 → 每2.4小时一个点
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * (48 / count) * 3600 * 1000)
      xData.push(`${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:00`)
    }
  } else if (selectedGranularity.value === '3d') {
    // 过去3天 → 每3.6小时一个点
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * (72 / count) * 3600 * 1000)
      xData.push(`${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:00`)
    }
  } else if (selectedGranularity.value === '7d') {
    // 过去7天 → 每8.4小时一个点
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * (168 / count) * 3600 * 1000)
      xData.push(`${d.getMonth() + 1}/${d.getDate()}`)
    }
  } else if (selectedGranularity.value === '30d') {
    // 过去30天 → 每1.5天一个点
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * (720 / count) * 3600 * 1000)
      xData.push(`${d.getMonth() + 1}/${d.getDate()}`)
    }
  }

  const option = {
    title: {
      text: '土壤营养含量变化曲线',
      left: 'center',
      textStyle: {
        color: '#FF5733',  // 这里设置标题颜色，#FF5733是一个示例颜色
        fontSize: 20,      // 可选：设置字体大小
        fontWeight: 'bold' // 可选：设置字体粗细
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xData
    },
    yAxis: {
      type: 'value',
      name: '营养含量 (%)'  // 设置Y轴的单位
    },
    series: [
      {
        name: '营养含量',
        type: 'line',
        data: yData,
        smooth: true // 平滑线条，更真实
      }
    ]
  }

  myChart.setOption(option)
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 400px;
  color: #000;
}
</style>
