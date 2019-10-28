// This file contains the routerlinks used for the navigation between the components / sites
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Contact from '@/components/Contact';
import Opencases from '@/components/Opencases';
import Newcase from '@/components/Newcase';
import Casesearch from '@/components/Casesearch';
import Settings from '@/components/Settings';
import Analysis from '@/components/Analysis';
import Adddiagnose from '@/components/Adddiagnose';
import Addoperation from '@/components/Addoperation';
import Adddevice from '@/components/Adddevice';
import Addsurgeon from '@/components/Addsurgeon';
import Addassistant from '@/components/Addassistant';
import Editopencase from '@/components/Editopencase';
import Protocol from '@/components/Protocol';
import Addprotocolentry from '@/components/Addprotocolentry';

Vue.use(Router);

export default new Router({
  // mode history makes it possible to use the arrows in the browser to navigate back and forth
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
      path: '/editopencase/:id',
      name: 'Editopencase',
      component: Editopencase,
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
    {
      path: '/adddiagnose',
      name: 'Adddiagnose',
      component: Adddiagnose,
    },
    {
      path: '/addoperation',
      name: 'Addoperation',
      component: Addoperation,
    },
    {
      path: '/adddevice',
      name: 'Adddevice',
      component: Adddevice,
    },
    {
      path: '/addsurgeon',
      name: 'Addsurgeon',
      component: Addsurgeon,
    },
    {
      path: '/addassistant',
      name: 'Addassistant',
      component: Addassistant,
    },
    {
      path: '/addprotocolentry',
      name: 'Addprotocolentry',
      component: Addprotocolentry,
    },
    {
      path: '/protocol/:id',
      name: 'Protocol',
      component: Protocol,
    },
  ],
});
