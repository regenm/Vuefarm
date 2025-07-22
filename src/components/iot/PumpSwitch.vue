<template>
  <div class="background">
    <div class="card-container">
      <el-card class="card">
        <h2>水泵控制</h2>
        <el-divider />

        <!-- Toggle Button -->
        <div class="button-container">
          <el-button 
            style="width: 150px" 
            :type="isPumpOn ? 'danger' : 'primary'" 
            @click="togglePump">
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
            @click="setTimer">
            启动定时
          </el-button>
        </div>

        <!-- Message Display -->
        <el-message v-if="message" :type="messageType">{{ message }}</el-message>
      </el-card>

      



    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

export default {
  setup() {
    const message = ref('');
    const messageType = ref('success');
    const isPumpOn = ref(false);  // Track pump state
    const hours = ref(0);         // Timer hours
    const minutes = ref(0);       // Timer minutes
    const seconds = ref(0);       // Timer seconds
    let timer = null;

    const togglePump = async () => {
      const action = isPumpOn.value ? 'stop' : 'start';
      try {
        const response = await axios.post('http://127.0.0.1:5000/api/admin', {
          option: action,
        }, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });

        // Update state and message
        isPumpOn.value = !isPumpOn.value;
        message.value = response.data.message;
        messageType.value = 'success';
      } catch (error) {
        console.error('Error toggling pump:', error);
        message.value = '操作失败，请重试！';
        messageType.value = 'error';
      }
    };

    const setTimer = () => {
      if (timer) clearTimeout(timer); // Clear any existing timer

      // Calculate total delay in milliseconds
      const totalDelay = (hours.value * 3600 + minutes.value * 60 + seconds.value) * 1000;

      timer = setTimeout(() => {
        togglePump();
        message.value = `定时操作已${isPumpOn.value ? '开启' : '关闭'}`;
      }, totalDelay);

      message.value = `定时操作将在 ${hours.value} 小时 ${minutes.value} 分钟 ${seconds.value} 秒后执行`;
      messageType.value = 'info';
    };

    return {
      togglePump,
      setTimer,
      isPumpOn,
      hours,
      minutes,
      seconds,
      message,
      messageType,
    };
  }
};
</script>

<style scoped>
.background {
  background: url("../../assets/1.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: cover;
  display: flex;

  padding: 20px; /* Add padding to keep the card away from the edges */
}

.card-container {
  display: flex;
  justify-content: flex-start; /* Align card towards the left */
  align-items: flex-start; /* Align card towards the top */
  padding: 20px; /* Padding to keep card from sticking to edges */
}

.card {
  width: 400px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

h2 {
  font-size: 1.6rem;
  color: #333;
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
  gap: 10px;
}


.el-input-number {
  width: 100px;
}
</style>
