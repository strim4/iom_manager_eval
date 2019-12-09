<template>
<v-layout>
 <v-btn  color="primary" @click="analyse"> Analyse</v-btn>
</v-layout>
</template>


<script>
import axios from 'axios';
export default {
//initialize variables
    data: () => ({
    
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
