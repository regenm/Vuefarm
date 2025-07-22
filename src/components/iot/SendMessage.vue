<template>
    <div class="background">
      <div class="card-container">
        <!-- 水泵控制卡片 -->
        <el-card class="card">
          <h2>水泵控制</h2>
          <el-divider />
  
          <!-- Toggle Button -->
          <div class="button-container">
            <el-button
              style="width: 150px"
              :type="isPumpOn ? 'danger' : 'primary'"
              @click="togglePump"
            >
              {{ isPumpOn ? '关闭水泵' : '开启水泵' }}
            </el-button>
          </div>
  
          <!-- Timer Controls -->
          <div class="timer-container">
            <p>定时 (小时/分钟/秒):</p>
            <div class="time-inputs">
              <el-input-number v-model="hours" :min="0" label="小时" />
              <el-input-number v-model="minutes" :min="0" :max="59" label="分钟" />
              <el-input-number v-model="seconds" :min="0" :max="59" label="秒" />
            </div>
            <el-button
              style="width: 150px; margin-top: 10px;"
              type="warning"
              @click="setPumpTimer"
            >
              启动定时
            </el-button>
          </div>
  
          <!-- Message Display -->
          <el-message v-if="message" :type="messageType">{{ message }}</el-message>
        </el-card>
  
        <!-- 排气控制卡片 -->
        <el-card class="card">
          <h2>排气控制</h2>
          <el-divider />
  
          <!-- Toggle Button -->
          <div class="button-container">
            <el-button
              style="width: 150px"
              :type="isAirOn ? 'danger' : 'primary'"
              @click="toggleAir"
            >
              {{ isAirOn ? '关闭排气' : '开启排气' }}
            </el-button>
          </div>
  
          <!-- Timer Controls -->
          <div class="timer-container">
            <p>定时 (小时/分钟/秒):</p>
            <div class="time-inputs">
              <el-input-number v-model="airHours" :min="0" label="小时" />
              <el-input-number v-model="airMinutes" :min="0" :max="59" label="分钟" />
              <el-input-number v-model="airSeconds" :min="0" :max="59" label="秒" />
            </div>
            <el-button
              style="width: 150px; margin-top: 10px;"
              type="warning"
              @click="setAirTimer"
            >
              启动定时
            </el-button>
          </div>
  
          <!-- Message Display -->
          <el-message v-if="airMessage" :type="airMessageType">{{ airMessage }}</el-message>
        </el-card>
      </div>
    </div>
  </template>
  
  <script>
  import * as mqtt from "mqtt/dist/mqtt.min";
  import { reactive, ref, onMounted } from "vue";
  
  export default {
    setup() {
      // 水泵控制变量
      const isPumpOn = ref(false);
      const hours = ref(0);
      const minutes = ref(0);
      const seconds = ref(0);
      const message = ref("");
      const messageType = ref("info");
  
      // 排气控制变量
      const isAirOn = ref(false);
      const airHours = ref(0);
      const airMinutes = ref(0);
      const airSeconds = ref(0);
      const airMessage = ref("");
      const airMessageType = ref("info");
  
      // MQTT 连接设置
      const connection = reactive({
        protocol: "wss",
        host: "f6633c11.ala.cn-hangzhou.emqxsl.cn",
        port: 8084,
        clientId: "emqx_vue3_" + Math.random().toString(16).substring(2, 8),
        username: "regen",
        password: "regen",
        clean: true,
        connectTimeout: 30 * 1000,
        reconnectPeriod: 4000,
      });
  
      const client = ref(null);
  
      // 创建 MQTT 连接
      const createConnection = () => {
        const { protocol, host, port, ...options } = connection;
        const connectUrl = `${protocol}://${host}:${port}/mqtt`;
        client.value = mqtt.connect(connectUrl, options);
  
        client.value.on("connect", () => {
          console.log("MQTT connection successful");
        });
  
        client.value.on("error", (error) => {
          console.log("MQTT connection error:", error);
          message.value = "MQTT 连接错误";
          messageType.value = "error";
        });
      };
  
      // 切换水泵状态并发送 MQTT 消息
      const togglePump = () => {
        isPumpOn.value = !isPumpOn.value;
        const pumpState = isPumpOn.value ? "ON" : "OFF";
        sendMessage(`/esp8266/test`, pumpState);
        message.value = `水泵已${isPumpOn.value ? "开启" : "关闭"}`;
        messageType.value = isPumpOn.value ? "success" : "info";
      };
  
      // 设置水泵定时器并发送 MQTT 消息
      const setPumpTimer = () => {
        const totalSeconds = hours.value * 3600 + minutes.value * 60 + seconds.value;
        sendMessage(`/esp8266/test`, `Set Timer: ${totalSeconds} seconds`);
        message.value = `水泵定时器已设定为 ${hours.value} 小时 ${minutes.value} 分钟 ${seconds.value} 秒`;
        messageType.value = "warning";
      };
  
      // 切换排气状态并发送 MQTT 消息
      const toggleAir = () => {
        isAirOn.value = !isAirOn.value;
        const airState = isAirOn.value ? "ON" : "OFF";
        sendMessage(`/esp8266/test`, airState);
        airMessage.value = `排气已${isAirOn.value ? "开启" : "关闭"}`;
        airMessageType.value = isAirOn.value ? "success" : "info";
      };
  
      // 设置排气定时器并发送 MQTT 消息
      const setAirTimer = () => {
        const totalSeconds = airHours.value * 3600 + airMinutes.value * 60 + airSeconds.value;
        sendMessage(`/esp8266/test`, `Set Timer: ${totalSeconds} seconds`);
        airMessage.value = `排气定时器已设定为 ${airHours.value} 小时 ${airMinutes.value} 分钟 ${airSeconds.value} 秒`;
        airMessageType.value = "warning";
      };
  
      // 发送消息到指定的 MQTT 主题
      const sendMessage = (topic, payload) => {
        if (client.value && client.value.connected) {
          client.value.publish(topic, payload, { qos: 0 }, (error) => {
            if (error) {
              console.log("MQTT publish error:", error);
            } else {
              console.log(`Sent message: "${payload}" to topic: "${topic}"`);
            }
          });
        } else {
          console.log("Client is not connected");
        }
      };
  
      onMounted(() => {
        createConnection();
      });
  
      return {
        isPumpOn,
        hours,
        minutes,
        seconds,
        message,
        messageType,
        togglePump,
        setPumpTimer,
        isAirOn,
        airHours,
        airMinutes,
        airSeconds,
        airMessage,
        airMessageType,
        toggleAir,
        setAirTimer,
      };
    },
  };
  </script>

<style scoped>


.card-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  gap: 30px;
  flex-wrap: wrap;
  width: 100%;
  max-width: 100%;
}

.card {
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3);
}

h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

.button-container {
  margin-top: 20px;
}

.timer-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.el-input-number {
  width: 120px;
}

.el-button {
  width: 180px;
  padding: 10px 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.el-button:hover {
  background-color: #1abc9c; /* 更好看的悬停效果 */
}

.el-message {
  margin-top: 15px;
  font-size: 1rem;
  padding: 10px;
}

@media (max-width: 768px) {
  .card {
    width: 100%;
    padding: 20px;
  }

  h2 {
    font-size: 1.4rem;
  }

  .el-input-number,
  .el-button {
    width: 100%;
  }

  .button-container,
  .timer-container {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 15px;
  }

  h2 {
    font-size: 1.2rem;
  }

  .el-button {
    width: 100%;
    padding: 8px 0;
  }

  .el-input-number {
    width: 100%;
  }
}

</style>
