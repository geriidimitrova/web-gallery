// Lib imports
import Vue from 'vue';
import Router from 'vue-router';

// Routes
import paths from './routes';

Vue.use(Router);

// Create a new router
const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: paths,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  },
});


export default router;