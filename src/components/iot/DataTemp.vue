<template>
  <div class="background">
    <div class="card-container">
      <!-- Card for Temperature -->
      <div class="card">
        <h2 style="color: red;">Temperature</h2>
        <div id="temperature-chart" style="width: 100%; height: 400px;"></div>
      </div>

      <!-- Card for Humidity -->
      <div class="card">
        <h2 style="color: blue;">Humidity</h2>
        <div id="humidity-chart" style="width: 100%; height: 400px;"></div>
      </div>

      <!-- Card for CO₂ -->
      <div class="card">
        <h2 style="color: black;">CO₂</h2>
        <div id="co2-chart" style="width: 100%; height: 400px;"></div>
      </div>

      <!-- Card for Light Intensity -->
      <div class="card">
        <h2 style="color: white;">Light Intensity</h2>
        <div id="light-chart" style="width: 100%; height: 400px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as mqtt from "mqtt/dist/mqtt.min";
import * as echarts from "echarts";
import { reactive, ref, onMounted, onUnmounted } from "vue";

// MQTT connection configuration
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

// Subscription topics
const subscription = ref({
  tempTopic: "/esp8266/test",
  humTopic: "/esp8266/test",
  co2Topic: "/esp8266/test", // New CO₂ topic
  lightTopic: "/esp8266/test", // New light intensity topic
  qos: 0,
});

const client = ref(null);
const tempChartInstance = ref(null);
const humChartInstance = ref(null);
const co2ChartInstance = ref(null);
const lightChartInstance = ref(null);

const createConnection = () => {
  const connectUrl = `${connection.protocol}://${connection.host}:${connection.port}/mqtt`;
  client.value = mqtt.connect(connectUrl, connection);

  client.value.on("connect", () => {
    console.log("Connection successful");
    // Subscribe to all topics
    client.value.subscribe(
      [
        subscription.value.tempTopic,
        subscription.value.humTopic,
        subscription.value.co2Topic,
        subscription.value.lightTopic,
      ],
      { qos: subscription.value.qos }
    );
  });

  client.value.on("message", (topic, message) => {
    if (topic === subscription.value.tempTopic) {
      updateChart(tempChartInstance.value, message.toString(), "temperature");
      //下面三行需要删掉，现在测试都是在同一个mqtt频道，所以需要都喂数据
      updateChart(humChartInstance.value, message.toString(), "humidity");
      updateChart(co2ChartInstance.value, message.toString(), "CO2");
      updateChart(lightChartInstance.value, message.toString(), "light");
    } else if (topic === subscription.value.humTopic) {
      updateChart(humChartInstance.value, message.toString(), "humidity");
    } else if (topic === subscription.value.co2Topic) {
      updateChart(co2ChartInstance.value, message.toString(), "CO2");
    } else if (topic === subscription.value.lightTopic) {
      updateChart(lightChartInstance.value, message.toString(), "light");
    }
  });
};

// Initialize the ECharts
const initChart = (chartDomId, title, yAxisLabel) => {
  const chartDom = document.getElementById(chartDomId);
  const chartInstance = echarts.init(chartDom);

  chartInstance.setOption({
    title: {
      text: `Real-time ${title} Data`,
    },
    xAxis: {
      type: "category",
      data: [],
      boundaryGap: false,
    },
    yAxis: {
      type: "value",
      name: yAxisLabel,
      min: 0,
    },
    series: [
      {
        name: title,
        type: "line",
        data: [],
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
        },
      },
    ],
  });

  return chartInstance;
};

const updateChart = (chartInstance, data, type) => {
  try {
    const parsedData = JSON.parse(data);
    const value = parsedData.msg;
    const time = new Date().toLocaleTimeString();

    const option = chartInstance.getOption();
    option.xAxis[0].data.push(time);
    option.series[0].data.push(Number(value));

    if (option.xAxis[0].data.length > 20) {
      option.xAxis[0].data.shift();
      option.series[0].data.shift();
    }

    chartInstance.setOption(option);
  } catch (error) {
    console.error(`Failed to update ${type} chart:`, error);
  }
};

export default {
  setup() {
    onMounted(() => {
      createConnection();
      tempChartInstance.value = initChart("temperature-chart", "Temperature", "Temperature (°C)");
      humChartInstance.value = initChart("humidity-chart", "Humidity", "Humidity (%)");
      co2ChartInstance.value = initChart("co2-chart", "CO2", "CO2 (ppm)");
      lightChartInstance.value = initChart("light-chart", "Light Intensity", "Light (lux)");
    });

    onUnmounted(() => {
      client.value?.end();
      tempChartInstance.value?.dispose();
      humChartInstance.value?.dispose();
      co2ChartInstance.value?.dispose();
      lightChartInstance.value?.dispose();
    });
  },
};
</script>

<style scoped>
.background {
  width: 100%;
  height: 100%;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 10px;
}

.card {
  width: 100%;
  max-width: 1000px;
  margin: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
}
</style>
