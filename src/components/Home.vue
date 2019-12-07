<template>
  <v-layout>
    
     <v-container grid-list-md text-xs-center>
       </br></br></br></br>
      <v-layout row wrap>
     
        <v-flex  xs6>
            <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Erfasste Fälle</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="green" size="62">
        <span class="white--text headline">{{ CompletCaseCount}}</span>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
         <router-link :to="{ name: 'Casesearch' }">
          <v-btn color="indigo accent-4" text>Fallsuche</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
        </v-flex>

         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Offene Fälle</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="orange" size="62">
        <span class="white--text headline">{{OpenCaseCount}}</span>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
        
          <router-link :to="{ name: 'Opencases' }">
         <v-btn color="indigo accent-4" text>Offene Fälle</v-btn>
        </router-link>
        
      </v-card-actions>
    </v-card>
        </v-flex>
        
         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Handbuch</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="pink" size="62">
        <v-icon dark>mdi-book</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
        <a href="./../static/handbuch.pdf" target="_blank">
       <v-btn color="indigo accent-4" text>Handbuch öffnen</v-btn>
        </a>
      </v-card-actions>
    </v-card>
        </v-flex>
        
         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Kontakt / Info</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="blue" size="62">
        <v-icon dark>mdi-email</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
          <router-link :to="{ name: 'Contact' }">
         <v-btn color="indigo accent-4" text>Kontakt öffnen</v-btn>
        </router-link>
        
        
      </v-card-actions>
    </v-card>
        </v-flex>
      
      </v-layout>
    </v-container>
  </v-layout>
</template>


<script>
import axios from 'axios';
export default {
  
  data() {
    return {
     
 
    openItems: {}, 
    completCases: {},
    };
  },

//Count Cases
  computed: {
  OpenCaseCount () {
      return Object.keys(this.openItems).length
  },
   CompletCaseCount () {
      return Object.keys(this.completCases).length
  }
},

methods: {
//fetches all open cases
    async fetchOpenCases() {
       const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/cases',
         headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
        
},
      })
        .then((response) => {
          this.openItems = response.data.cases;
           this.current_user = response.data.current_user;
         
        })
        .catch(() => {});
    },


     async fetchAllCases() {
       const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/completcase',
        headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
},
      })
        .then((response) => {
          
          this.completCases = response.data.protocols;
          this.current_user = response.data.current_user;
          
        })
        .catch(() => {});
    },
    
},


   


//fetches open cases on pageload
  mounted(){

   this.fetchOpenCases();
   this.fetchAllCases();

  },
};
</script>


<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
