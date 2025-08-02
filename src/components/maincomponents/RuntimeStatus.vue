<template>
    <div class="status-dashboard">
      <!-- 传感器状态部分 -->
      <div class="sensor-status">
        <el-row gutter={20}>
          <!-- 温度传感器 -->
          <el-col :span="8">
            <el-card class="sensor-card" shadow="hover">
              <div class="sensor-info">
                <el-icon name="el-icon-thermometer" class="sensor-icon" />
                <div class="sensor-details">
                  <h3>温度传感器</h3>
                  <p>{{ temperature }} °C</p>
                  <span :style="{ color: temperatureStatusColor }">{{ temperatureStatus }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
  
          <!-- 湿度传感器 -->
          <el-col :span="8">
            <el-card class="sensor-card" shadow="hover">
              <div class="sensor-info">
                <el-icon name="el-icon-water" class="sensor-icon" />
                <div class="sensor-details">
                  <h3>湿度传感器</h3>
                  <p>{{ humidity }} %</p>
                  <span :style="{ color: humidityStatusColor }">{{ humidityStatus }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
  
          <!-- CO2传感器 -->
          <el-col :span="8">
            <el-card class="sensor-card" shadow="hover">
              <div class="sensor-info">
                <el-icon name="el-icon-circle-check" class="sensor-icon" />
                <div class="sensor-details">
                  <h3>CO2传感器</h3>
                  <p>{{ co2 }} ppm</p>
                  <span :style="{ color: co2StatusColor }">{{ co2Status }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
  
        <el-row gutter={20}>
          <!-- 土壤水分传感器 -->
          <el-col :span="8">
            <el-card class="sensor-card" shadow="hover">
              <div class="sensor-info">
                <el-icon name="el-icon-water-drop" class="sensor-icon" />
                <div class="sensor-details">
                  <h3>土壤水分</h3>
                  <p>{{ soilMoisture }} %</p>
                  <span :style="{ color: soilMoistureStatusColor }">{{ soilMoistureStatus }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
  
          <!-- 光照强度传感器 -->
          <el-col :span="8">
            <el-card class="sensor-card" shadow="hover">
              <div class="sensor-info">
                <el-icon name="el-icon-sun" class="sensor-icon" />
                <div class="sensor-details">
                  <h3>光照强度</h3>
                  <p>{{ lightIntensity }} Lux</p>
                  <span :style="{ color: lightIntensityStatusColor }">{{ lightIntensityStatus }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
  
          <!-- 植物养分传感器 -->
          <el-col :span="8">
            <el-card class="sensor-card" shadow="hover">
              <div class="sensor-info">
                <el-icon name="el-icon-grape" class="sensor-icon" />
                <div class="sensor-details">
                  <h3>植物养分</h3>
                  <p>{{ nutrients }} mg/L</p>
                  <span :style="{ color: nutrientsStatusColor }">{{ nutrientsStatus }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
  
      <!-- 控制设备状态部分 -->
      <div class="control-status">
        <el-row gutter={20}>
          <!-- 水泵控制 -->
          <el-col :span="8">
            <el-card class="control-card" shadow="hover">
              <div class="control-info">
                <el-icon name="el-icon-water" class="control-icon" />
                <div class="control-details">
                  <h3>水泵</h3>
                  <el-switch v-model="waterPumpStatus" active-text="开" inactive-text="关" />
                </div>
              </div>
            </el-card>
          </el-col>
  
          <!-- 通风系统控制 -->
          <el-col :span="8">
            <el-card class="control-card" shadow="hover">
              <div class="control-info">
                <el-icon name="el-icon-wind" class="control-icon" />
                <div class="control-details">
                  <h3>通风系统</h3>
                  <el-switch v-model="ventilationStatus" active-text="开" inactive-text="关" />
                </div>
              </div>
            </el-card>
          </el-col>
  
          <!-- 灯光控制 -->
          <el-col :span="8">
            <el-card class="control-card" shadow="hover">
              <div class="control-info">
                <el-icon name="el-icon-lightbulb" class="control-icon" />
                <div class="control-details">
                  <h3>灯光</h3>
                  <el-switch v-model="lightControlStatus" active-text="开" inactive-text="关" />
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="control-card" shadow="hover">
              <div class="control-info">
                <el-icon name="el-icon-lightbulb" class="control-icon" />
                <div class="control-details">
                  <h3>营养输送</h3>
                  <el-switch v-model="nutrientTransferStatus" active-text="开" inactive-text="关" />
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 传感器数据
  const temperature = ref(22)
  const humidity = ref(50)
  const co2 = ref(400)
  const soilMoisture = ref(45)
  const lightIntensity = ref(800)
  const nutrients = ref(15)
  
  // 传感器状态
  const temperatureStatus = ref('正常')
  const humidityStatus = ref('正常')
  const co2Status = ref('正常')
  const soilMoistureStatus = ref('正常')
  const lightIntensityStatus = ref('正常')
  const nutrientsStatus = ref('正常')
  
  // 传感器状态颜色
  const temperatureStatusColor = ref('green')
  const humidityStatusColor = ref('green')
  const co2StatusColor = ref('green')
  const soilMoistureStatusColor = ref('green')
  const lightIntensityStatusColor = ref('green')
  const nutrientsStatusColor = ref('green')
  
  // 控制设备状态
  const waterPumpStatus = ref(false)
  const ventilationStatus = ref(true)
  const lightControlStatus = ref(false)
  </script>
  
  <style scoped>
  .status-dashboard {
    padding: 20px;
  }
  
  .sensor-status {
    margin-bottom: 30px;
  }
  
  .control-status {
    margin-top: 30px;
  }
  
  .sensor-card, .control-card {
    margin-bottom: 20px;
  }
  
  .sensor-info, .control-info {
    display: flex;
    align-items: center;
  }
  
  .sensor-icon, .control-icon {
    font-size: 40px;
    margin-right: 10px;
  }
  
  .sensor-details h3 {
    margin: 0;
  }
  
  .sensor-details p {
    font-size: 18px;
  }
  
  .sensor-details span {
    font-size: 14px;
    margin-left: 10px;
  }
  </style>
  