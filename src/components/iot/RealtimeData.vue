<template>
  <div class="background">
    <div class="card-container">
      <div class="card">
        <h2>🌡️ Real-time Temperature</h2>
        <div class="temperature-display">
          <span class="value" >{{ receivedMessages.temperature }}</span>
          <span class="degree-symbol">°C</span>
        </div>
      </div>
      <div class="card">
        <h2>🌬️ Real-time CO2 Level</h2>
        <div class="co2-display">
          <span class="value">{{ receivedMessages.co2 }}</span>
          <span class="unit">ppm</span>
        </div>
      </div>
      <div class="card">
        <h2>💧 Humidity</h2>
        <div class="humidity-display">
          <span class="value">{{ receivedMessages.humidity }}</span>
          <span class="unit">%</span>
        </div>
      </div>
      <div class="card">
        <h2>💡 Light Intensity</h2>
        <div class="light-display">
          <span class="value">{{ receivedMessages.light }}</span>
          <span class="unit">lux</span>
        </div>
      </div>
      <div class="card">
        <h2>🌿 Water Quality</h2>
        <div class="water-quality-display">
          <span class="value">{{ receivedMessages.waterQuality }}</span>
        </div>
      </div>
      <div class="card">
        <h2>🧪 Nitrogen (N)</h2>
        <div class="value-display">
          <span class="value">{{ receivedMessages.nitrogen }}</span>
          <span class="unit">mg/L</span>
        </div>
      </div>
      <div class="card">
        <h2>🧪 Phosphorus (P)</h2>
        <div class="value-display">
          <span class="value">{{ receivedMessages.phosphorus }}</span>
          <span class="unit">mg/L</span>
        </div>
      </div>
      <div class="card">
        <h2>🧪 Potassium (K)</h2>
        <div class="value-display">
          <span class="value">{{ receivedMessages.potassium }}</span>
          <span class="unit">mg/L</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as mqtt from "mqtt/dist/mqtt.min";
import { reactive, ref, onMounted } from "vue";

// MQTT connection settings
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

// Subscription settings
const topics = {
  temperature: "/esp8266/test",
  co2: "/esp8266/test",
  humidity: "/esp8266/test",
  light: "/esp8266/test",
  waterQuality: "/esp8266/test",
  nitrogen: "/esp8266/test",
  phosphorus: "/esp8266/test",
  potassium: "/esp8266/test",
};

const client = ref(null);
const receivedMessages = ref({
  temperature: "",
  co2: "",
  humidity: "",
  light: "",
  waterQuality: "",
  nitrogen: "",
  phosphorus: "",
  potassium: "",
});

const retryTimes = ref(0);

const initData = () => {
  client.value = null;
  retryTimes.value = 0;
};

// Handle reconnect
const handleOnReConnect = () => {
  retryTimes.value += 1;
  if (retryTimes.value > 5) {
    client.value?.end();
    initData();
    console.log("connection maxReconnectTimes limit, stop retry");
  }
};

// Create MQTT connection
const createConnection = () => {
  try {
    const { protocol, host, port, ...options } = connection;
    const connectUrl = `${protocol}://${host}:${port}/mqtt`;
    client.value = mqtt.connect(connectUrl, options);

    client.value.on("connect", () => {
      console.log("connection successful");

      // Subscribe to all the topics
      Object.values(topics).forEach((topic) => {
        client.value?.subscribe(topic, { qos: 0 }, (error, granted) => {
          if (error) {
            console.log("subscribe error:", error);
            return;
          }
          console.log(`Subscribed to topic: ${topic} successfully`);
        });
      });
    });

    client.value.on("reconnect", handleOnReConnect);
    client.value.on("error", (error) => console.log("connection error:", error));

    // Handle incoming messages
    client.value.on("message", (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());  // Parse JSON format message
        if (payload && payload.msg) {
          // Assign the value from msg field to respective message variable
          if (topic === topics.temperature) {
            receivedMessages.value.temperature = payload.msg;
            // 测试时使用，投入使用时删掉
            receivedMessages.value.co2 = payload.msg;
            receivedMessages.value.humidity = payload.msg;
            receivedMessages.value.light = payload.msg;
            receivedMessages.value.waterQuality = payload.msg;
            receivedMessages.value.nitrogen = payload.msg;
            receivedMessages.value.phosphorus = payload.msg;
            receivedMessages.value.potassium = payload.msg;
          } else if (topic === topics.co2) {
            receivedMessages.value.co2 = payload.msg;
          } else if (topic === topics.humidity) {
            receivedMessages.value.humidity = payload.msg;
          } else if (topic === topics.light) {
            receivedMessages.value.light = payload.msg;
          } else if (topic === topics.waterQuality) {
            receivedMessages.value.waterQuality = payload.msg;
          } else if (topic === topics.nitrogen) {
            receivedMessages.value.nitrogen = payload.msg;
          } else if (topic === topics.phosphorus) {
            receivedMessages.value.phosphorus = payload.msg;
          } else if (topic === topics.potassium) {
            receivedMessages.value.potassium = payload.msg;
          }
        }
        console.log(`Received message from topic ${topic}: ${payload.msg}`);
      } catch (e) {
        console.error("Failed to process message:", e);
      }
    });
  } catch (error) {
    console.log("mqtt.connect error:", error);
  }
};

export default {
  setup() {
    onMounted(() => {
      createConnection();
    });

    return {
      receivedMessages,
    };
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.card {
  width: 250px;
  height: 200px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
}

.temperature-display,
.co2-display,
.humidity-display,
.light-display,
.water-quality-display,
.value-display {
  display: flex;
  align-items: baseline;
}

.value {
  font-size: 2rem;
  font-weight: bold;
  color: #ff5733;
}

.unit {
  font-size: 1.2rem;
  color: #555;
}

.degree-symbol {
  font-size: 1.5rem;
  color: #555;
}

.message-display {
  width: 100%;
  margin-top: 20px;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
