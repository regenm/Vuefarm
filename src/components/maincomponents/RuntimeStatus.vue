<template>
  <div class="monitor-panel">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>监控运行</h1>
    </div>

    <!-- 模式选择按钮 -->
    <div class="mode-selector">
      <button 
        class="mode-btn large-btn"
        :class="{ 'active': activeMode === 'mcu' }"
        @click="activeMode = 'mcu'"
      >
        <span class="btn-icon">⚙️</span>
        <span class="btn-text">MCU状态监控</span>
        <span class="btn-desc">查看所有微控制器状态</span>
      </button>
      
      <button 
        class="mode-btn large-btn"
        :class="{ 'active': activeMode === 'sensor' }"
        @click="activeMode = 'sensor'"
      >
        <span class="btn-icon">📡</span>
        <span class="btn-text">传感器监控</span>
        <span class="btn-desc">查看所有传感器状态</span>
      </button>
    </div>

    <!-- MCU状态显示 -->
    <div v-if="activeMode === 'mcu'" class="status-grid">
      <h2 class="section-title">微控制器状态 ({{ mcuOnlineCount }}/{{ mcuList.length }} 在线)</h2>
      
      <div class="grid-container">
        <div 
          v-for="mcu in mcuList" 
          :key="mcu.id"
          class="status-card"
          :class="{ 'online': mcu.status === 'online', 'offline': mcu.status === 'offline' }"
        >
          <div class="card-header">
            <span class="status-icon">{{ mcu.icon }}</span>
            <div class="status-indicator" :class="mcu.status"></div>
          </div>
          
          <div class="card-content">
            <h3>{{ mcu.name }}</h3>
            <p class="device-id">ID: {{ mcu.id }}</p>
            <p class="device-location">位置: {{ mcu.location }}</p>
          </div>
          
          <div class="card-footer">
            <span class="status-text">{{ mcu.status === 'online' ? '正常运行中' : '离线' }}</span>
            <span class="last-update">{{ mcu.lastUpdate }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 传感器状态显示 -->
    <div v-else-if="activeMode === 'sensor'" class="status-grid">
      <h2 class="section-title">传感器状态 ({{ sensorOnlineCount }}/{{ sensorList.length }} 在线)</h2>
      
      <div class="grid-container">
        <div 
          v-for="sensor in sensorList" 
          :key="sensor.id"
          class="status-card"
          :class="{ 'online': sensor.status === 'online', 'offline': sensor.status === 'offline' }"
        >
          <div class="card-header">
            <span class="status-icon">{{ sensor.icon }}</span>
            <div class="status-indicator" :class="sensor.status"></div>
          </div>
          
          <div class="card-content">
            <h3>{{ sensor.name }}</h3>
            <p class="sensor-type">类型: {{ sensor.type }}</p>
            <p class="sensor-location">位置: {{ sensor.location }}</p>
            <div v-if="sensor.status === 'online'" class="sensor-data">
              <span class="data-label">当前值:</span>
              <span class="data-value">{{ sensor.value }} {{ sensor.unit }}</span>
            </div>
          </div>
          
          <div class="card-footer">
            <span class="status-text">{{ sensor.status === 'online' ? '正常运行中' : '离线' }}</span>
            <span class="last-update">{{ sensor.lastUpdate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 当前激活的模式
const activeMode = ref('mcu')

// MCU数据
const mcuList = ref([
  {
    id: 'MCU-001',
    name: '主控制器',
    icon: '💻',
    status: 'online',
    location: '控制室',
    lastUpdate: '刚刚更新'
  },
  {
    id: 'MCU-002',
    name: '环境控制器',
    icon: '🌡️',
    status: 'online',
    location: '温室A区',
    lastUpdate: '2分钟前'
  },
  {
    id: 'MCU-003',
    name: '灌溉控制器',
    icon: '💧',
    status: 'online',
    location: '水泵房',
    lastUpdate: '5分钟前'
  },
  {
    id: 'MCU-004',
    name: '光照控制器',
    icon: '☀️',
    status: 'offline',
    location: '温室B区',
    lastUpdate: '30分钟前'
  },
  {
    id: 'MCU-005',
    name: '通风控制器',
    icon: '💨',
    status: 'online',
    location: '通风机房',
    lastUpdate: '1分钟前'
  },
  {
    id: 'MCU-006',
    name: '营养控制器',
    icon: '🌱',
    status: 'online',
    location: '营养液房',
    lastUpdate: '3分钟前'
  },
  {
    id: 'MCU-007',
    name: '数据采集器',
    icon: '📊',
    status: 'offline',
    location: '服务器室',
    lastUpdate: '1小时前'
  },
  {
    id: 'MCU-008',
    name: '安防控制器',
    icon: '🔒',
    status: 'online',
    location: '监控室',
    lastUpdate: '刚刚更新'
  }
])

// 传感器数据
const sensorList = ref([
  {
    id: 'S-001',
    name: '温度传感器',
    icon: '🌡️',
    type: '温度',
    status: 'online',
    location: '温室A区',
    value: '25.6',
    unit: '°C',
    lastUpdate: '刚刚更新'
  },
  {
    id: 'S-002',
    name: '湿度传感器',
    icon: '💧',
    type: '湿度',
    status: 'online',
    location: '温室A区',
    value: '65',
    unit: '%',
    lastUpdate: '1分钟前'
  },
  {
    id: 'S-003',
    name: '光照传感器',
    icon: '☀️',
    type: '光照',
    status: 'online',
    location: '温室A区',
    value: '850',
    unit: 'lux',
    lastUpdate: '2分钟前'
  },
  {
    id: 'S-004',
    name: '土壤湿度传感器',
    icon: '🌱',
    type: '土壤湿度',
    status: 'offline',
    location: '种植区1',
    value: '-',
    unit: '%',
    lastUpdate: '15分钟前'
  },
  {
    id: 'S-005',
    name: 'CO₂传感器',
    icon: '☁️',
    type: '气体',
    status: 'online',
    location: '温室B区',
    value: '420',
    unit: 'ppm',
    lastUpdate: '3分钟前'
  },
  {
    id: 'S-006',
    name: 'pH传感器',
    icon: '🧪',
    type: '酸碱度',
    status: 'offline',
    location: '营养液池',
    value: '-',
    unit: 'pH',
    lastUpdate: '20分钟前'
  },
  {
    id: 'S-007',
    name: '水位传感器',
    icon: '💧',
    type: '水位',
    status: 'online',
    location: '蓄水池',
    value: '85',
    unit: '%',
    lastUpdate: '5分钟前'
  },
  {
    id: 'S-008',
    name: '风速传感器',
    icon: '💨',
    type: '风速',
    status: 'online',
    location: '通风口',
    value: '2.3',
    unit: 'm/s',
    lastUpdate: '2分钟前'
  },
  {
    id: 'S-009',
    name: '营养液浓度传感器',
    icon: '🧪',
    type: '浓度',
    status: 'online',
    location: '混合罐',
    value: '1.2',
    unit: 'g/L',
    lastUpdate: '4分钟前'
  },
  {
    id: 'S-010',
    name: '门窗传感器',
    icon: '🚪',
    type: '开关',
    status: 'offline',
    location: '温室入口',
    value: '-',
    unit: '',
    lastUpdate: '25分钟前'
  }
])


// 计算在线MCU数量
const mcuOnlineCount = computed(() => {
  return mcuList.value.filter(mcu => mcu.status === 'online').length
})

// 计算在线传感器数量
const sensorOnlineCount = computed(() => {
  return sensorList.value.filter(sensor => sensor.status === 'online').length
})
</script>

<style scoped>
.monitor-panel {
  height: 100%;
  padding: 20px;
  background-color: #f8f9fa;
}

.page-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.page-header h1 {
  margin: 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

/* 模式选择按钮 */
.mode-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.large-btn {
  background: white;
  border: 2px solid #e4e7ed;
  border-radius: 16px;
  padding: 30px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  min-height: 180px;
}

.large-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #1abc9c;
}

.large-btn.active {
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  border-color: #1abc9c;
  box-shadow: 0 4px 12px rgba(26, 188, 156, 0.15);
}

.btn-icon {
  font-size: 48px;
  display: block;
}

.btn-text {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: block;
}

.btn-desc {
  font-size: 14px;
  color: #666;
  display: block;
}

/* 状态网格 */
.section-title {
  margin: 0 0 25px 0;
  font-size: 18px;
  color: #333;
  font-weight: 600;
  padding-bottom: 15px;
  border-bottom: 1px solid #e4e7ed;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.status-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.status-card.online {
  border-color: #67c23a;
}

.status-card.offline {
  border-color: #909399;
  opacity: 0.8;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.status-icon {
  font-size: 32px;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-indicator.online {
  background-color: #67c23a;
  animation: pulse 2s infinite;
  box-shadow: 0 0 8px rgba(103, 194, 58, 0.5);
}

.status-indicator.offline {
  background-color: #909399;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.card-content {
  margin-bottom: 15px;
}

.card-content h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.device-id,
.sensor-type,
.device-location,
.sensor-location {
  margin: 4px 0;
  font-size: 13px;
  color: #666;
}

.sensor-data {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #eee;
  display: flex;
  align-items: center;
  gap: 8px;
}

.data-label {
  font-size: 13px;
  color: #999;
}

.data-value {
  font-size: 16px;
  font-weight: 600;
  color: #1abc9c;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.status-text {
  font-size: 13px;
  font-weight: 500;
}

.status-text.online {
  color: #67c23a;
}

.status-text.offline {
  color: #909399;
}

.last-update {
  font-size: 12px;
  color: #999;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .mode-selector {
    grid-template-columns: 1fr;
  }
  
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  .large-btn {
    min-height: 150px;
    padding: 20px;
  }
  
  .btn-icon {
    font-size: 36px;
  }
  
  .btn-text {
    font-size: 18px;
  }
}
</style>