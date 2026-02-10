<template>
  <div class="common-layout">
    <el-container class="container">
      <!-- 左侧容器：包含两列 -->
      <div class="left-container">
        <!-- 第一列：场所选择 -->
        <div class="site-aside">
          <div class="site-header">
            <h3>场所选择</h3>
          </div>
          <div class="site-list">
            <div 
              class="site-item site-item-active"
              @click="selectSite(1)"
            >
              <div class="site-icon">
                <el-icon><HomeFilled /></el-icon>
              </div>
              <div class="site-name">农场区域1</div>
            </div>
          </div>
        </div>

        <!-- 第二列：功能菜单 -->
        <div class="menu-aside">
          <div class="menu-header">
            <h3>农场区域1 功能</h3>
          </div>
          <el-menu
            class="menu"
            :default-active="activeMenu"
            background-color="#34195e"
            text-color="#ecf0f1"
            active-text-color="#1abc9c"
            @select="handleMenuSelect"
          >
            <el-menu-item index="dataexhibit">
              
              <span>数据面板</span>
            </el-menu-item>
            <el-menu-item index="controlcenter">
              
              <span>控制管理</span>
            </el-menu-item>
            <el-menu-item index="runtimestatus">
              
              <span>监控运行</span>
            </el-menu-item>
          </el-menu>
        </div>
      </div>

      <!-- 右侧主区域：包含顶部 banner + 主内容 -->
      <div class="right-container">
        <!-- 顶部 banner -->
        <div class="banner">
          <h2>VUE FARM V1.0</h2>
        </div>

        <!-- 主内容区域 -->
        <div class="main-content">
          <RouterView />
        </div>
      </div>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
  DataLine, 
  Setting, 
  Monitor,
  HomeFilled
} from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();

// 当前选中的菜单
const activeMenu = ref('');

// 监听路由变化，设置当前激活的菜单
watch(() => route.path, (newPath) => {
  if (newPath === '/dataexhibit') {
    activeMenu.value = 'dataexhibit';
  } else if (newPath === '/controlcenter') {
    activeMenu.value = 'controlcenter';
  } else if (newPath === '/runtimestatus') {
    activeMenu.value = 'runtimestatus';
  }
}, { immediate: true });

// 选择场所（现在只有一个场所）
const selectSite = (siteId) => {
  console.log('选择场所:', siteId);
  // 这里可以添加选中场所后的逻辑
};

// 菜单选择处理
const handleMenuSelect = (index) => {
  router.push({ path: '/' + index });
};
</script>

<style scoped>
.common-layout {
  height: 100vh;
  overflow: hidden;
}

.container {
  display: flex;
  height: 100%;
}

/* 左侧容器 - 两列布局 */
.left-container {
  display: flex;
  width: 280px; /* 减小左侧总宽度 */
  background: linear-gradient(to bottom, #2c3e50, #34195e);
  color: white;
}

/* 第一列：场所选择 */
.site-aside {
  width: 100px; /* 减小第一列宽度 */
  background-color: rgba(44, 62, 80, 0.9);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.site-header {
  padding: 15px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.site-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
}

.site-list {
  flex: 1;
  padding: 10px 0;
}

.site-item {
  padding: 12px 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;
}

.site-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.site-item-active {
  background-color: rgba(26, 188, 156, 0.2);
  border-left: 3px solid #1abc9c;
}

.site-icon {
  font-size: 20px;
  margin-bottom: 5px;
  color: #1abc9c;
}

.site-name {
  font-size: 12px;
  text-align: center;
  line-height: 1.2;
}

/* 第二列：功能菜单 */
.menu-aside {
  width: 180px; /* 减小第二列宽度 */
  display: flex;
  flex-direction: column;
}

.menu-header {
  padding: 15px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.menu-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #ecf0f1;
}

.menu {
  flex: 1;
  border-right: none;
}

.menu .el-menu-item {
  height: 60px; /* 减小菜单项高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  transition: all 0.3s ease;
  padding: 0 5px !important; /* 减少内边距 */
}

.menu .el-menu-item:hover {
  background-color: rgba(26, 188, 156, 0.1) !important;
}

.menu .el-menu-item.is-active {
  background-color: rgba(26, 188, 156, 0.2) !important;
}

.menu .el-menu-item .el-icon {
  font-size: 20px; /* 减小图标大小 */
  margin-bottom: 3px;
}

/* 右侧容器 */
.right-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0; /* 防止内容溢出 */
}

/* 顶部 banner */
.banner {
  background: linear-gradient(to right, #34195e, #2c3e50);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px; /* 减小banner高度 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.banner h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

/* 主内容区域 */
.main-content {
  flex: 1;
  padding: 15px;
  background-color: #f8f9fa;
  overflow-y: auto;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .left-container {
    width: 240px;
  }
  
  .site-aside {
    width: 90px;
  }
  
  .menu-aside {
    width: 150px;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  
  .left-container {
    width: 100%;
    height: auto;
  }
}
</style>