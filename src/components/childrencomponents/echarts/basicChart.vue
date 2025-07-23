<template>
    <div ref="chartRef" class="chart"></div>
  </template>
  
  <script setup>
  import * as echarts from 'echarts'
  import { onMounted, ref } from 'vue'
  
  const chartRef = ref(null)
  
  onMounted(() => {
    const myChart = echarts.init(chartRef.value)
  
    // 静态模拟数据
    const option = {
      title: {
        text: '温度变化曲线',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '温度',
          type: 'line',
          data: [22, 24, 19, 23, 25, 21, 20]
        }
      ]
    }
  
    myChart.setOption(option)
  
    // 自适应大小
    window.addEventListener('resize', () => {
      myChart.resize()
    })
  })
  </script>
  
  <style scoped>
  .chart {
    width: 100%;
    height: 400px; /* 根据需要调整高度 */
  }
  </style>
  