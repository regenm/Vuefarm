<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const input = ref(''); // 用户输入的密码
const errorMessage = ref(''); // 显示错误信息
const isLoading = ref(false); // 控制按钮加载状态
const router = useRouter(); // 使用 Vue Router 进行跳转

// 发送登录请求到后端
const sendData = async () => {
  errorMessage.value = ''; // 清空之前的错误信息
  isLoading.value = true; // 开启加载状态
  
  try {
    const response = await axios.post('http://127.0.0.1:5000/api/login', {
      magic_spell: input.value  // 发送输入的数据
    });

    console.log('Response from server:', response.data);

    if (response.status === 200) {
      // 登录成功后存储 token
      localStorage.setItem('token', response.data.token);
      input.value = ''; // 清空输入框
      router.push('/admin'); // 跳转到管理页面
    }
  } catch (error) {
    // 捕获错误并显示错误信息
    if (error.response && error.response.status === 401) {
      errorMessage.value = 'Invalid magic spell !!!'; // 显示后端返回的错误信息
    } else {
      errorMessage.value = 'An error occurred. Please try again.'; // 显示通用错误信息
    }
    console.error('Error sending data:', error);
  } finally {
    isLoading.value = false; // 无论成功与否，关闭加载状态
  }
};


const toComponentMethod = (subpath) => {
  router.push({ path: '/admin' + subpath });
}
</script>

<template>
  <div class="background">
    <el-card class="card">
      <h2>Login</h2>
      <el-divider />

      <el-input
        v-model="input"
        style="width: 240px"
        type="password"
        placeholder="Magic Spell"
        show-password
        clearable
      />

      <!-- 显示错误信息 -->
      <div v-if="errorMessage" style="color: red; margin-top: 10px;">
        {{ errorMessage }}
      </div>

      <div class="button-container">
        <!-- 点击按钮时调用 sendData 函数，按钮在加载期间禁用 -->
        <el-button 
          @click="sendData" 
          style="width:240px" 
          :loading="isLoading"
          :disabled="isLoading">
          Login
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.background {
  background: url("../assets/1.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: cover; /* 使背景图适应容器 */
}

.card {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translateX(-50%); /* 使卡片水平居中 */
  width: 300px;
  height: 300px;
  border-radius: 10%;
  background-color: rgba(255, 255, 255, 0.6);
}

.button-container {
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
