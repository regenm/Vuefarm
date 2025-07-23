<template>
  <div class="common-layout">
    <el-container class="container">
      <!-- 左侧 aside -->
      <el-aside class="aside" width="200px">
        
            <el-menu
              class="menu"
              background-color="#34495e"
              text-color="#ecf0f1"
              active-text-color="#1abc9c"
            >
              <el-menu-item index="1" @click="toComponentMethod('/controlcenter')">
                <h1>控制面板</h1>
              </el-menu-item>

              <el-menu-item index="2" @click="toComponentMethod('/dataexhibit')">
                <h1>数据面板</h1>
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
        <el-main class="main">
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
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 顶部 banner */
.banner {
  background-color: #2c3e50;
  color: #ecf0f1;
  font-size: 15px;
  text-align: center;
  line-height: 60px;
}

/* 主容器布局 */
.container {
  display: flex;
  flex: 1; /* 填充剩余空间 */
  flex-direction: row; /* 横向排列 */
}



.el-scrollbar {
  flex: 1; /* 使滚动区域占满剩余空间 */
}


/* 菜单样式 */
/* 左侧 aside */
.aside {
  background-color: #34495e;
  color: #ecf0f1;
  height: 100%; /* 使侧边栏与主容器一样高 */
  display: flex; /* 使用 flexbox 布局 */
  flex-direction: column; /* 垂直排列 */
  justify-content: center; /* 垂直居中 */
  padding: 10px; /* 添加适当的内边距 */
}

/* 菜单样式 */
.menu {
  background-color: #34495e;
  color: #ecf0f1;
  border-right: none; /* 去除右边框线 */
  display: flex; /* 使用 flexbox 来垂直居中菜单 */
  flex-direction: column; /* 垂直排列菜单项 */
  justify-content: center; /* 垂直居中菜单项 */
  height: 100%; /* 让菜单占满剩余的高度 */
}

/* submenu 从中间开始 */
.el-sub-menu {
  margin-top: auto; /* 让子菜单从容器的底部开始 */
  margin-bottom: auto; /* 让子菜单向上对齐 */
}

::v-deep(.el-menu-item, .el-sub-menu__title) {
  color: #ecf0f1 !important; /* 子菜单字体颜色 */
}
::v-deep(.el-menu-item:hover, .el-sub-menu__title:hover) {
  background-color: #1abc9c !important; /* 鼠标悬停背景颜色 */
  color: #ffffff !important; /* 鼠标悬停字体颜色 */
}
::v-deep(.el-menu--dark .el-menu-item.is-active, .el-menu--dark .el-sub-menu__title.is-active) {
  background-color: #1abc9c !important; /* 激活菜单项背景色 */
  color: #ffffff !important; /* 激活菜单项字体颜色 */
}


/* 中间 main */
.main {
  background-color: #2c3e50;
  color: #ecf0f1;
  flex: 1; /* 填充剩余空间 */
  padding: 20px;
  overflow: auto;
}
</style>
