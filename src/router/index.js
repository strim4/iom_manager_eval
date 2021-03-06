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
import Protocolevaluation from '@/components/Protocolevaluation';
import Protocoloverview from '@/components/Protocoloverview';
import Register from '@/components/Register';
import Login from '@/components/Login';

//Tell vue to use the router
Vue.use(Router);


export default new Router({
  // mode history makes it possible to use the arrows in the browser to navigate back and forth
  mode: 'history',
  routes: [
    {
      path: '/home',
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
    {
      path: '/protocolevaluation/:casenr',
      name: 'Protocolevaluation',
      component: Protocolevaluation,
    },
    {
      path: '/protocoloverview/:casenr',
      name: 'Protocoloverview',
      component: Protocoloverview,
    },
    {
      path: '/users/register',
      name: 'Register',
      component: Register,
      // In beforeEnter method the ip addresses This method defines which IPs can access the registry page.
      // This ensures that only users in a certain network, e.g. from the Inselspital, can register new users. 
      //The method is disabled because the application is currently installed locally or on a public server.


     /*beforeEnter(to, from, next) {
           
        $.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
          
          handleJsonResponse(data);
        });
        function handleJsonResponse(data) {
        if(data.geobytesremoteip == '213.55.161.' || 'enter authorized IP'){
          next();
        }else{
          next(false);
          alert("Nur Benutzer innerhalb des Netzwerkes können neue Benutzer registrieren");
        };
  
      };
      
      } */
      },
      {
        path: '/',
        name: 'Login',
        component: Login,
        },
        
    
  ],
});
