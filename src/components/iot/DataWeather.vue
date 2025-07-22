<template>
  <div class="container">
    <!-- 地图部分 -->
    <div id="map-container"></div>

    <!-- 天气数据卡片 -->
    <div class="cards">
      <!-- 当前天气 -->
      <div class="card">
        <h3>当前天气</h3>
        <p class="city">{{ state.city }}</p>
        <p class="weather">{{ state.weather }}</p>
        <h2 class="temp">
          <em>{{ state.temperature }}℃</em>
        </h2>
        <div class="detail">
          <span>风力：{{ state.windPower }}</span> |
          <span>风向：{{ state.windDir }}</span> |
          <span>空气湿度：{{ state.humidity }}%</span>
        </div>
      </div>

      <!-- 天气预报 -->
      <div class="card" v-if="forecasts.length">
        <h3>天气预报</h3>
        <div
          class="group"
          v-for="(forecast, index) in forecasts.slice(0, forecasts.length - 1)" 
          :key="index"
        >
          <div>{{ index === 0 ? "今天" : index === 1 ? "明天" : "后天" }}：</div>
          <span class="tm">
            白天：{{ forecast.dayTemp }}℃ {{ forecast.dayWeather }}
            {{ forecast.dayWindDir }} {{ forecast.dayWindPower }}
          </span>
          <span class="tm">
            夜间：{{ forecast.nightTemp }}℃ {{ forecast.nightWeather }}
            {{ forecast.nightWindDir }} {{ forecast.nightWindPower }}
          </span>
        </div>
      </div>
      </div>
      </div>

</template>









<script>
import { ref, onMounted, onUnmounted } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  data() {
    return {
      now: new Date().toLocaleString(),
      state: {
        city: "上海市",
        weather: "",
        temperature: "",
        windPower: "",
        windDir: "",
        humidity: "",
      },
      forecasts: [],
      map: null,
      AMap: null,
      cityList: ["杭州市", "北京市", "上海市", "广州市"], // 城市列表
      currentCityIndex: 0, // 当前选择的城市索引
    };
  },
  methods: {
    // 初始化地图
    initMap() {
      AMapLoader.load({
        key: "3b27ee6fc417d35df055f045c1ea7e87", // 替换为你的高德地图 API Key
        version: "2.0",
        plugins: ["AMap.Scale", "AMap.Weather", "AMap.Geocoder"], // 加载必要插件
      })
        .then((AMap) => {
          this.AMap = AMap;
          this.map = new AMap.Map("map-container", {
            mapStyle: "amap://styles/fresh",
            zoom: 11,
            center: [121.896964, 30.882957], // 初始中心点
          });
          this.map.addControl(new AMap.Scale()); // 添加比例尺组件

          // 地图点击事件
          this.map.on("click", (e) => {
            const lnglat = e.lnglat; // 获取点击经纬度
            this.getCityName(lnglat)
              .then((city) => {
                this.state.city = city;
                this.getLiveWeather(city);
                this.getForecastWeather(city);
              })
              .catch((err) => console.error("获取城市名称失败", err));
          });

          // 初始天气查询
          this.getLiveWeather(this.state.city);
          this.getForecastWeather(this.state.city);
        })
        .catch((error) => {
          console.error("地图加载失败:", error);
        });
    },

    // 获取实时天气
    getLiveWeather(city) {
      const weather = new this.AMap.Weather();
      weather.getLive(city, (err, data) => {
        if (!err) {
          this.state.weather = data.weather;
          this.state.temperature = data.temperature;
          this.state.windPower = data.windPower;
          this.state.windDir = data.windDirection;
          this.state.humidity = data.humidity;
        } else {
          console.error("实时天气获取失败:", err);
        }
      });
    },

    // 获取天气预报
    getForecastWeather(city) {
      const weather = new this.AMap.Weather();
      weather.getForecast(city, (err, data) => {
        if (!err) {
          this.forecasts = data.forecasts;
        } else {
          console.error("天气预报获取失败:", err);
        }
      });
    },

    // 获取城市名称
    getCityName(lnglat) {
      return new Promise((resolve, reject) => {
        const geocoder = new this.AMap.Geocoder();
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.regeocode) {
            const city = result.regeocode.addressComponent.city || result.regeocode.addressComponent.province;
            resolve(city);
          } else {
            reject("无法获取地址");
          }
        });
      });
    },

    // 切换城市
    toggleCity() {
      this.currentCityIndex = (this.currentCityIndex + 1) % this.cityList.length;
      this.state.city = this.cityList[this.currentCityIndex];
      this.getLiveWeather(this.state.city);
      this.getForecastWeather(this.state.city);
    },
  },
  mounted() {
    window._AMapSecurityConfig = {
      securityJsCode: "98d64f666cc13e5567eb31f9c03dc545", // 替换为你的高德开发者平台的安全密钥
    };
    this.initMap();
    // 更新时间
    setInterval(() => {
      this.now = new Date().toLocaleString();
    }, 1000);
  },
  beforeUnmount() {
    this.map?.destroy();
  },
};
</script>
<style scoped>
.container {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column; /* 垂直排列，确保地图和卡片在独立行 */
  gap: 20px;
  padding: 20px;
  background-color: #f5f8fa; /* 背景浅灰蓝，柔和 */
}

#map-container {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.cards {
  display: flex;
  flex-wrap: wrap; /* 当宽度不足时换行 */
  gap: 20px;
}

.card {
  flex: 1;
  min-width: 300px;
  padding: 20px;
  border: 1px solid #0078d4; /* 边框采用主题色 */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 120, 212, 0.1); /* 半透明蓝色背景 */
  color: #333; /* 主要文字颜色 */
}

.card h3 {
  margin-bottom: 10px;
  font-size: 1.6rem;
  color: #0078d4; /* 标题采用主题色 */
  text-align: center;
  font-weight: bold;
}

.city {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  color: #005ea6; /* 城市名称颜色 */
}

.temp em {
  font-size: 3rem;
  color: #ff5722; /* 温度醒目，橙色 */
  font-weight: bold;
  display: block;
  text-align: center;
}

.weather {
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.detail {
  font-size: 1rem;
  margin-top: 15px;
  color: #005ea6; /* 细节文字主题色 */
  text-align: center;
}

.detail span {
  display: inline-block;
  margin: 0 10px;
}

.tm {
  display: block;
  margin-top: 10px;
  font-size: 1.1rem;
  color: #0078d4; /* 时间段天气颜色主题一致 */
}

.group {
  margin-top: 10px;
  color: #0078d4;
  padding: 10px;
  border-top: 1px solid rgba(0, 120, 212, 0.3);
}
</style>
