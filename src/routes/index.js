import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue'; //메인 컴포넌트 호출
import About from '@/components/About.vue'
import Board from '@/components/Board.vue'
import BoardWrite from '@/components/BoardWrite.vue'
import BoardOne from '@/components/BoardOne.vue'



const routes = [
    { path:'/', name:"Home", component:Home },
    { path:'/about', name:"About", component:About },
    { path:'/board', name:"Board", component:Board },
    { path:'/boardwrite', name:"BoardWrite", component:BoardWrite },
    { path:'/boardone', name:"BoardOne", component:BoardOne }
];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});
  
export default router;