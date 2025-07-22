import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import AdminView from '../views/AdminView.vue';
import PumpSwitch from '../components/iot/PumpSwitch.vue'
import DataTemp from '../components/iot/DataTemp.vue'
import DataWeather from '../components/iot/DataWeather.vue'
import RealtimeData from '../components/iot/RealtimeData.vue'
import SendMessage from '../components/iot/SendMessage.vue'
// // 检查 token 是否存在，判断用户是否认证
// const isAuthenticated = () => {
//   return !!localStorage.getItem('token'); // 如果 token 存在则返回 true，否则 false
// };

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: AdminView, // 登录页面
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminView, // 管理页面
      children: [
        {
          path: 'pumpswitch',
          name: 'pumpswitch',
          component: PumpSwitch,
        },
        {
          path: 'datatemp',
          name: 'datatemp',
          component: DataTemp,
        },
        {
          path: 'dataweather',
          name: 'dataweather',
          component: DataWeather,
        },
        {
          path: 'realtimedata',
          name: 'realtimedata',
          component: RealtimeData,
        },
        {
          path: 'sendmessage',
          name: 'sendmessage',
          component: SendMessage,
        },

      ],
      beforeEnter: (to, from, next) => {
        if (!isAuthenticated()) {
          next({ name: 'Login' }); // 如果未认证，则重定向到登录页面
        } else {
          next(); // 已认证，继续访问 admin 页面
        }
      },
    },
    {
      path: '/:pathMatch(.*)*', 
      redirect: '/', // 处理未匹配的路由，重定向到登录页面
    },
  ],
});

export default router;
