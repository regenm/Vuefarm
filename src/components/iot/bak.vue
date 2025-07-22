

<template>
  
  <div class="background">
    <div class="card-container">
      <div class="card">
        <h2>MQTT Connection</h2>
        <div class="message-display">
          <h3>Received Messages:</h3>
          <pre>{{ receivedMessages }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as mqtt from "mqtt/dist/mqtt.min";
import { reactive, ref, onMounted } from "vue";

// MQTT 连接配置
// 成功连接emqx服务器
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

// 订阅主题配置
const subscription = ref({
  topic: "/esp8266/test",
  qos: 0,
});

const client = ref(null);
const receivedMessages = ref("");
const retryTimes = ref(0);

const initData = () => {
  client.value = null;
  retryTimes.value = 0;
};

// 处理重新连接
const handleOnReConnect = () => {
  retryTimes.value += 1;
  if (retryTimes.value > 5) {
    client.value?.end();
    initData();
    console.log("connection maxReconnectTimes limit, stop retry");
  }
};

// 创建 MQTT 连接
const createConnection = () => {
  try {
    const { protocol, host, port, ...options } = connection;
    const connectUrl = `${protocol}://${host}:${port}/mqtt`;
    client.value = mqtt.connect(connectUrl, options);

    client.value.on("connect", () => {
      console.log("connection successful");

      // 连接后立即订阅主题
      client.value?.subscribe(subscription.value.topic, { qos: subscription.value.qos }, (error, granted) => {
        if (error) {
          console.log("subscribe error:", error);
          return;
        }
        console.log("subscribe successfully:", granted);
      });
    });

    client.value.on("reconnect", handleOnReConnect);
    client.value.on("error", (error) => console.log("connection error:", error));
    client.value.on("message", (topic, message) => {
      receivedMessages.value += `\nTopic: ${topic} | Message: ${message.toString()}`;
      console.log(`received message: ${message} from topic: ${topic}`);
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
.background {
  background: url("../../assets/1.jpg");
  position: fixed;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.card-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.card {
  width: 100%;
  max-width: 500px;
  margin: 20px;
  border-radius: 10%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
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
