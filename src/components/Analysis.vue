<!-- This file contains the structure to display all the open cases -->
<template slot="items" slot-scope="props" >
    <v-container > 
            <template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
</template>
  <!-- Datatable with containing all the open cases -->
        <v-card > 
                <v-card-title>
                 Analysen
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" 
                    single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      :headers="headers"
      :items="analyses"
      item-key="name"
      :search="search"
      class="elevation-1"  
      no-data-text="keine offene Analysen gefunden - Legen Sie eine neue Analyse an"
    >
      <template v-slot:item.start="{ item }">
     
            <v-icon :color="color" @click="meanValue">
         play_circle_filled 
        </v-icon>
      
      </template>
       
      <template v-slot:item.delete="{ item }">
            <v-icon @click="deleteOpenAnalyse(item._id, item)">
          delete
        </v-icon>
      </template>
    </v-data-table>
   </v-card> </br>
      <v-btn @click="analyseR">Run R</v-btn>
    </v-container> 
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

    color: 'indigo',
        analyses: [],
      search: '',
      headers: [
        { text: 'Durchschnittliche IOM-Dauer', value: 'start', sortable: false },
        { text: 'Bezeichnung.', value: 'name' },
        { text: 'Enthaltene Fälle.', value: 'cases' },
        { text: 'Löschen', value: 'delete', sortable: false },

      ],

    }),

  // fetch all analyses on pageload
  mounted() {
    this.fetchAnalyses();
  },

    methods: {

          // method to fetch all analyses from the database
    async fetchAnalyses() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/analyses',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
      })
        .then((response) => {
          this.analyses = response.data.analyses;
          console.log(this.analyses);
        })
        .catch(() => {});
    },

        // delete a Analyse from the database
    async  deleteOpenAnalyse(id, item) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `http://localhost:8081/analyses/${id}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.analyses.indexOf(item);
          this.analyses.splice(index, 1);
        })
        .catch(() => {});
    },

    meanValue: function(){
      console.log(this.analyses[0].cases);
      let case1 = this.analyses[0].cases;
      let start = [];
       let end = [];
      for(let i = 0; i < case1.length; i++){
        
          
          start.push(case1[i].entries[0].ts);
        
         
          end.push(case1[i].entries[case1[i].entries.length-1].ts);
      };
  
 
       var res = Math.abs(end[0]  - start[0]) / 1000;
       var minutes = Math.floor(res / 60) % 60;
       console.log(minutes);

    },



   async analyseR(){
      //const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/ex-async',
         headers: {
           // Authorization: `JWT ${token}`,
            //'Content-Type': 'application/json',
          },
      })
        .then((response) => {
          //this.analyses = response.data.analyses;
          console.log(response.data);
        })
        .catch(() => {});

    },
       
},}
</script>
