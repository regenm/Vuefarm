import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AdminView from '../views/AdminView.vue';
import ControlCenter from '../components/maincomponents/ControlCenter.vue';
import DataExhibit from '../components/maincomponents/DataExhibit.vue';
import RuntimeStatus from '../components/maincomponents/RuntimeStatus.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView, // 管理页面
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
          name: 'runtimestatus',
          component: RuntimeStatus,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*', 
      redirect: '/admin/controlcenter', // 处理未匹配的路由，重定向到登录页面
    },
  ],
});

export default router;
