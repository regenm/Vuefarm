<template>
  <div class="common-layout">
    <el-container class="container">
      <!-- 左侧 aside -->
      <el-aside class="aside">
        <el-menu
          class="menu"
          background-color="#34195e"
          text-color="#ecf0f1"
          active-text-color="#1abc9c"
        >
          <el-menu-item index="1" @click="toComponentMethod('/dataexhibit')">
            <h1>数据面板</h1>
          </el-menu-item>

          <el-menu-item index="2" @click="toComponentMethod('/controlcenter')">
            <h1>控制面板</h1>
          </el-menu-item>
          <el-menu-item index="3" @click="toComponentMethod('/runtimestatus')">
            <h1>运行状态</h1>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 右侧主区域：包含顶部 banner + 主内容 -->
      <el-container>
        <!-- 顶部 banner -->
        <el-header class="banner">
          <h2>VUE FARM V1.0</h2>
        </el-header>

        <!-- 主内容区域 -->
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const toComponentMethod = (subpath) => {
  router.push({ path: '/admin' + subpath });
};
</script>

<style scoped>
.container {
  height: 100vh; /* 使整个容器高度占满全屏 */
}

.aside {
  background-color: #34195e;
  width: 200px;  /* 左侧菜单固定宽度 */
  height: 100%; /* 确保侧边栏高度充满整个页面 */
  overflow-y: auto; /* 侧边栏内容过长时滚动 */
}

.el-header {
  background-color: #fff;
  padding: 10px;
}

.el-main {
  padding: 20px;
  background-color: #f5f5f5;
  height: calc(100vh - 60px); /* 使主内容区域高度占满页面减去顶部 */
}

</style>
