import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from "../components/home.vue"
import NotFound from "../components/notfound.vue"
import Contact from "../components/contact.vue"
import About from "../components/about.vue"
import Services from "../components/services.vue"
import Docs from "../components/docs.vue"
import SignOut from "../components/signout.vue"



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home
    },

    {
      path: '/contact',
      component: Contact
    },

    {
      path: '/about',
      component: About
    },

    {
      path: '/services',
      component: Services
    },

    {
      path: '/documentation',
      component: Docs
    },

    {
      path: "/signout",
      component: SignOut
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },


  ],
})

export default router
