import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import ControlCenter from '../components/maincomponents/ControlCenter.vue';
import DataExhibit from '../components/maincomponents/DataExhibit.vue';
import RuntimeStatus from '../components/maincomponents/RuntimeStatus.vue';

const router = createRouter({
  // 添加 history 选项
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main, // 管理页面
      children: [
        {
          path: 'controlcenter',
          name: 'ControlCenter',
          component: ControlCenter,
        },
        {
          path: 'dataexhibit',
          name: 'DataExhibit',
          component: DataExhibit,
        },
        {
          path: 'runtimestatus',
          name: 'RuntimeStatus', // 建议保持命名一致，首字母大写
          component: RuntimeStatus,
        },
      ],
    },
  ],
});

export default router;