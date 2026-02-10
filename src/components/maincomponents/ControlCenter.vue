<template>
  <div class="control-panel">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>控制管理</h1>
    </div>

    <!-- 设备控制卡片 -->
    <div class="control-cards">
      <div 
        v-for="device in devices" 
        :key="device.id"
        class="control-card"
      >
        <div class="device-icon">
          <span class="icon-text">{{ device.icon }}</span>
        </div>
        
        <div class="device-info">
          <h3>{{ device.name }}</h3>
          <div class="device-status">
            <span class="status-indicator" :class="getDeviceStatusClass(device)"></span>
            <span class="status-text">{{ getDeviceStatusText(device) }}</span>
          </div>
        </div>
        
        <div class="device-control">
          <div 
            class="custom-switch"
            :class="{ 'on': device.isOn }"
            @click="toggleDevice(device.id)"
          >
            <div class="switch-slider"></div>
            <span class="switch-text">{{ device.isOn ? '开' : '关' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 设备数据
const devices = ref([
  {
    id: 1,
    name: '风扇',
    icon: '💨',
    isOn: true
  },
  {
    id: 2,
    name: 'CO₂泵',
    icon: '☁️',
    isOn: false
  },
  {
    id: 3,
    name: '遮光帘',
    icon: '🪟',
    isOn: true
  },
  {
    id: 4,
    name: '水泵',
    icon: '💧',
    isOn: true
  },
  {
    id: 5,
    name: '营养泵',
    icon: '🌱',
    isOn: false
  }
])

// 获取设备状态样式
const getDeviceStatusClass = (device) => {
  return device.isOn ? 'status-on' : 'status-off'
}

// 获取设备状态文本
const getDeviceStatusText = (device) => {
  return device.isOn ? '运行中' : '已关闭'
}

// 切换设备开关状态
const toggleDevice = (deviceId) => {
  const device = devices.value.find(d => d.id === deviceId)
  if (device) {
    device.isOn = !device.isOn
  }
}
</script>

<style scoped>
.control-panel {
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

/* 设备控制卡片样式 */
.control-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.control-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
}

.control-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.device-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 188, 156, 0.1);
  border-radius: 10px;
  font-size: 28px;
}

.device-info {
  flex: 1;
}

.device-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
  font-weight: 600;
}

.device-status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-on {
  background-color: #67c23a;
  animation: pulse 2s infinite;
}

.status-off {
  background-color: #dcdfe6;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.status-text {
  font-size: 13px;
  color: #666;
}

/* 开关样式 */
.device-control {
  min-width: 60px;
}

.custom-switch {
  width: 60px;
  height: 30px;
  background: #dcdfe6;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.custom-switch.on {
  background: #1abc9c;
}

.switch-slider {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: absolute;
  left: 3px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.custom-switch.on .switch-slider {
  left: calc(100% - 27px);
}

.switch-text {
  font-size: 12px;
  color: white;
  font-weight: 500;
  position: absolute;
  right: 10px;
}

.custom-switch.on .switch-text {
  right: auto;
  left: 10px;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .control-cards {
    grid-template-columns: 1fr;
  }
}
</style>