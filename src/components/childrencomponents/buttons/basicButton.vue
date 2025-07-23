<template>
    <div class="button-panel">
      <el-button type="primary" @click="handleStart">启动设备</el-button>
      <el-button type="danger" @click="handleStop">停止设备</el-button>
      <el-button type="success" @click="handleSend">发送消息</el-button>
    </div>
  </template>
  
  <script setup>
  // 这里可以写事件处理
  const handleStart = () => {
    console.log('点击启动设备')
    // 调用接口 / emit 等
  }
  
  const handleStop = () => {
    console.log('点击停止设备')
  }
  
  const handleSend = () => {
    console.log('点击发送消息')
  }
  </script>
  
  <style scoped>
  .button-panel {
    display: flex;
    gap: 16px;      /* 按钮间距 */
    margin: 16px;   /* 外边距 */
  }
  </style>
  