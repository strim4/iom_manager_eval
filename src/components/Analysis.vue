<template>
<v-layout>
          <template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
</template>

 <v-btn  color="primary" @click="analyse"> Analyse</v-btn>
</v-layout>
</template>


<script>
import axios from 'axios';
export default {
//initialize variables
    data: () => ({
    
          breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Analyse',
          disabled: true,
          href: 'analysis',
        },
      ],
    }),
    methods: {

    analyse: function(){
        var R = require("r-script");
        var out = R("test.r")
           .data()
           .callSync();

    },
       
},}
</script>
