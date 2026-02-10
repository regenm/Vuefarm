<template>
  <div class="data-panel">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>数据面板</h1>
      <p class="update-time">最后更新：{{ lastUpdateTime }}</p>
    </div>

    <!-- 传感器当前数据卡片 -->
    <div class="sensor-cards">
      <div 
        v-for="sensor in sensorData" 
        :key="sensor.id"
        class="sensor-card"
        :class="{ 'active': activeSensorId === sensor.id }"
        @click="selectSensor(sensor.id)"
      >
        <div class="sensor-icon">
          <span class="icon-text">{{ sensor.icon }}</span>
        </div>
        <div class="sensor-info">
          <h3>{{ sensor.name }}</h3>
          <div class="sensor-value">
            <span class="value">{{ sensor.currentValue }}</span>
            <span class="unit">{{ sensor.unit }}</span>
          </div>
          <div class="sensor-status">
            <span class="status-indicator" :class="getStatusClass(sensor.status)"></span>
            <span class="status-text">{{ getStatusText(sensor.status) }}</span>
          </div>
        </div>
        <div class="sensor-trend">
          <span class="trend-icon" :style="{ color: getTrendColor(sensor.trend) }">
            {{ getTrendIcon(sensor.trend) }}
          </span>
          <span class="trend-text">{{ sensor.trendValue }}</span>
        </div>
      </div>
    </div>

    <!-- 历史数据图表区域 -->
    <div class="chart-area" v-if="activeSensorId">
      <div class="chart-header">
        <h2>{{ activeSensor.name }} - 历史数据</h2>
        <div class="time-options">
          <div class="time-buttons">
            <button 
              v-for="option in timeOptions" 
              :key="option.value"
              :class="{ 'active': selectedTimeRange === option.value }"
              @click="selectedTimeRange = option.value; updateChartData()"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <div ref="chartRef" class="echart"></div>
      </div>

      <!-- 数据统计信息 -->
      <div class="chart-stats">
        <div class="stat-item">
          <span class="stat-label">平均值</span>
          <span class="stat-value">{{ chartStats.average }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最大值</span>
          <span class="stat-value">{{ chartStats.max }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最小值</span>
          <span class="stat-value">{{ chartStats.min }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">变化趋势</span>
          <span class="stat-value" :class="getTrendClass(chartStats.trend)">
            {{ chartStats.trend > 0 ? '↑' : '↓' }} {{ Math.abs(chartStats.trend) }}%
          </span>
        </div>
      </div>
    </div>

    <!-- 没有选择传感器的提示 -->
    <div v-else class="no-selection">
      <div class="empty-state">
        <span class="empty-icon">📊</span>
        <p>请点击上方的传感器卡片查看历史数据</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import * as echarts from 'echarts'

// 时间选项
const timeOptions = [
  { label: '近6小时', value: '6h' },
  { label: '近12小时', value: '12h' },
  { label: '近24小时', value: '24h' },
  { label: '今日', value: 'today' },
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' }
]

// 传感器数据 - 使用文本图标
const sensorData = ref([
  {
    id: 1,
    name: '空气温度',
    icon: '🌡️',
    currentValue: '25.6',
    unit: '°C',
    status: 'normal',
    trend: 'up',
    trendValue: '+1.2°C'
  },
  {
    id: 2,
    name: '土壤温度',
    icon: '🌡️',
    currentValue: '20.3',
    unit: '°C',
    status: 'normal',
    trend: 'stable',
    trendValue: '±0.3°C'
  },
  {
    id: 3,
    name: '空气湿度',
    icon: '💧',
    currentValue: '65',
    unit: '%',
    status: 'normal',
    trend: 'down',
    trendValue: '-5%'
  },
  {
    id: 4,
    name: '土壤湿度',
    icon: '🌱',
    currentValue: '42',
    unit: '%',
    status: 'warning',
    trend: 'down',
    trendValue: '-8%'
  },
  {
    id: 5,
    name: '光照强度',
    icon: '☀️',
    currentValue: '850',
    unit: 'lux',
    status: 'normal',
    trend: 'up',
    trendValue: '+120lux'
  },
  {
    id: 6,
    name: 'CO₂浓度',
    icon: '☁️',
    currentValue: '420',
    unit: 'ppm',
    status: 'normal',
    trend: 'stable',
    trendValue: '±10ppm'
  }
])

// 最后更新时间
const lastUpdateTime = ref('')
const updateTimeInterval = ref(null)

// 当前选中的传感器
const activeSensorId = ref(1)

// 选中的时间范围
const selectedTimeRange = ref('24h')

// ECharts实例
let chartInstance = null
const chartRef = ref(null)

// 图表统计信息
const chartStats = ref({
  average: '--',
  max: '--',
  min: '--',
  trend: 0
})

// 计算当前选中的传感器
const activeSensor = computed(() => {
  return sensorData.value.find(sensor => sensor.id === activeSensorId.value) || {}
})

// 状态颜色和文字
const getStatusClass = (status) => {
  const statusMap = {
    normal: 'status-normal',
    warning: 'status-warning',
    danger: 'status-danger'
  }
  return statusMap[status] || 'status-normal'
}

const getStatusText = (status) => {
  const textMap = {
    normal: '正常',
    warning: '警告',
    danger: '危险'
  }
  return textMap[status] || '正常'
}

// 趋势图标和颜色
const getTrendIcon = (trend) => {
  const iconMap = {
    up: '↑',
    down: '↓',
    stable: '→'
  }
  return iconMap[trend] || '→'
}

const getTrendColor = (trend) => {
  const colorMap = {
    up: '#f56c6c',
    down: '#67c23a',
    stable: '#909399'
  }
  return colorMap[trend] || '#909399'
}

const getTrendClass = (trend) => {
  return trend > 0 ? 'trend-up' : trend < 0 ? 'trend-down' : 'trend-stable'
}

// 选择传感器
const selectSensor = (id) => {
  activeSensorId.value = id
  updateChartData()
}

// 生成模拟数据
const generateMockData = () => {
  const data = []
  const now = new Date()
  let value = 0
  let timeInterval = 3600000 // 默认1小时一个点
  
  // 根据时间范围调整间隔
  switch (selectedTimeRange.value) {
    case '6h':
      timeInterval = 1800000 // 30分钟一个点
      break
    case '12h':
      timeInterval = 3600000 // 1小时一个点
      break
    case '24h':
      timeInterval = 3600000 // 1小时一个点
      break
    case 'today':
      timeInterval = 7200000 // 2小时一个点
      break
    case 'week':
      timeInterval = 86400000 // 1天一个点
      break
    case 'month':
      timeInterval = 259200000 // 3天一个点
      break
  }
  
  // 根据传感器类型设置基础值
  switch (activeSensorId.value) {
    case 1: // 空气温度
      value = 24
      break
    case 2: // 土壤温度
      value = 20
      break
    case 3: // 空气湿度
      value = 60
      break
    case 4: // 土壤湿度
      value = 40
      break
    case 5: // 光照强度
      value = 800
      break
    case 6: // CO2浓度
      value = 400
      break
  }

  // 生成20个数据点
  for (let i = 19; i >= 0; i--) {
    const time = new Date(now.getTime() - i * timeInterval)
    const variation = Math.random() * 2 - 1 // -1到1的随机变化
    const currentValue = value + variation
    
    // 格式化时间显示
    let timeLabel
    if (selectedTimeRange.value === '6h' || selectedTimeRange.value === '12h') {
      timeLabel = time.getHours().toString().padStart(2, '0') + ':' + 
                  time.getMinutes().toString().padStart(2, '0')
    } else if (selectedTimeRange.value === '24h' || selectedTimeRange.value === 'today') {
      timeLabel = time.getHours().toString().padStart(2, '0') + ':00'
    } else if (selectedTimeRange.value === 'week') {
      const days = ['日', '一', '二', '三', '四', '五', '六']
      timeLabel = (time.getMonth() + 1) + '/' + time.getDate() + ' 周' + days[time.getDay()]
    } else {
      timeLabel = (time.getMonth() + 1) + '/' + time.getDate()
    }
    
    data.push({
      time: timeLabel,
      value: parseFloat(currentValue.toFixed(1))
    })
  }
  
  return data
}

// 更新图表数据
const updateChartData = () => {
  if (!chartInstance || !activeSensorId.value) return

  const mockData = generateMockData()
  const values = mockData.map(item => item.value)
  
  // 计算统计信息
  const sum = values.reduce((a, b) => a + b, 0)
  const avg = sum / values.length
  const max = Math.max(...values)
  const min = Math.min(...values)
  const trend = ((values[values.length - 1] - values[0]) / values[0]) * 100

  chartStats.value = {
    average: avg.toFixed(1) + activeSensor.value.unit,
    max: max.toFixed(1) + activeSensor.value.unit,
    min: min.toFixed(1) + activeSensor.value.unit,
    trend: parseFloat(trend.toFixed(1))
  }

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const param = params[0]
        return `${param.axisValue}<br/>${activeSensor.value.name}: ${param.value}${activeSensor.value.unit}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: mockData.map(item => item.time),
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: 12,
        rotate: selectedTimeRange.value === 'week' || selectedTimeRange.value === 'month' ? 45 : 0
      }
    },
    yAxis: {
      type: 'value',
      name: activeSensor.value.unit,
      nameTextStyle: {
        color: '#666',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      axisLabel: {
        color: '#666',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          color: '#eee',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: activeSensor.value.name,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: {
          color: '#1abc9c'
        },
        lineStyle: {
          color: '#1abc9c',
          width: 3
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(26, 188, 156, 0.3)' },
            { offset: 1, color: 'rgba(26, 188, 156, 0.05)' }
          ])
        },
        data: mockData.map(item => item.value)
      }
    ]
  }

  chartInstance.setOption(option, true)
}

// 更新时间
const updateTime = () => {
  const now = new Date()
  lastUpdateTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
}

// 初始化ECharts
const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  updateChartData()
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
}

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 生命周期钩子
onMounted(() => {
  updateTime()
  updateTimeInterval.value = setInterval(updateTime, 60000) // 每分钟更新一次时间
  
  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (updateTimeInterval.value) {
    clearInterval(updateTimeInterval.value)
  }
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.data-panel {
  height: 100%;
  padding: 20px;
  background-color: #f8f9fa;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.page-header h1 {
  margin: 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.update-time {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* 传感器卡片样式 */
.sensor-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.sensor-card {
  background: white;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
}

.sensor-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.sensor-card.active {
  border-color: #1abc9c;
  background: linear-gradient(135deg, #f8fff8 0%, #f0f9ff 100%);
}

.sensor-icon {
  margin-right: 15px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 188, 156, 0.1);
  border-radius: 8px;
}

.icon-text {
  font-size: 24px;
  line-height: 1;
}

.sensor-info {
  flex: 1;
}

.sensor-info h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
}

.sensor-value {
  display: flex;
  align-items: baseline;
  margin-bottom: 5px;
}

.value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-right: 4px;
}

.unit {
  font-size: 12px;
  color: #999;
}

.sensor-status {
  display: flex;
  align-items: center;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
}

.status-normal {
  background-color: #67c23a;
}

.status-warning {
  background-color: #e6a23c;
}

.status-danger {
  background-color: #f56c6c;
}

.status-text {
  font-size: 12px;
  color: #666;
}

.sensor-trend {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 50px;
}

.trend-icon {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2px;
}

.trend-text {
  font-size: 12px;
  color: #666;
}

/* 图表区域样式 */
.chart-area {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.chart-header h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.time-options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.time-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.time-buttons button {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  background: white;
  border-radius: 4px;
  font-size: 12px;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s ease;
}

.time-buttons button:hover {
  color: #1abc9c;
  border-color: #1abc9c;
}

.time-buttons button.active {
  background: #1abc9c;
  color: white;
  border-color: #1abc9c;
}

.chart-container {
  height: 300px;
  margin-bottom: 20px;
}

.echart {
  width: 100%;
  height: 100%;
}

/* 统计信息样式 */
.chart-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding-top: 15px;
  border-top: 1px solid #e4e7ed;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.trend-up {
  color: #f56c6c;
}

.trend-down {
  color: #67c23a;
}

.trend-stable {
  color: #909399;
}

/* 无选择提示 */
.no-selection {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.empty-state {
  text-align: center;
}

.empty-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 16px;
}

.empty-state p {
  color: #999;
  margin: 0;
  font-size: 14px;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .sensor-cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .sensor-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .time-buttons {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 5px;
  }
  
  .time-buttons button {
    white-space: nowrap;
  }
}

@media (max-width: 480px) {
  .sensor-cards {
    grid-template-columns: 1fr;
  }
  
  .chart-stats {
    grid-template-columns: 1fr;
  }
  
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>