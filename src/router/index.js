import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Contact from '@/components/Contact';
import Opencases from '@/components/Opencases';
import Newcase from '@/components/Newcase';
import Casesearch from '@/components/Casesearch';
import Settings from '@/components/Settings';
import Analysis from '@/components/Analysis';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/opencases',
      name: 'Opencases',
      component: Opencases,
    },
    {
      path: '/newcase',
      name: 'Newcase',
      component: Newcase,
    },
    {
      path: '/casesearch',
      name: 'Casesearch',
      component: Casesearch,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
    {
      path: '/analysis',
      name: 'Analysis',
      component: Analysis,
    },
  ],
});
