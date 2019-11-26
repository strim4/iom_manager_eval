<template slot="items" slot-scope="props" >

    <v-container > 

  <!-- Datatable with containing all the finished cases -->
  
      <v-card > 
                <v-card-title>
                 Fallarchiv
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" 
                    single-line hide-details></v-text-field>
                </v-card-title>

      <v-data-table
      :headers="headers"
      :items="completcases"
      item-key="name"
      :search="search"
      class="elevation-1"  
    >
      <template v-slot:item.start="{ item }">
       <router-link :to="{ name: 'Protocolevaluation',  params: { casenr: item.casenr }  }">
            <v-icon :color="color">
        mdi-file-document
        </v-icon>
        </router-link>
      </template>

      

    </v-data-table>

      </v-card>
    </v-container>
     
</template>

<script>
import axios from 'axios';

export default {
  name: 'Casesearch',
  data() {
    return {
      color: 'indigo',
      fixed: true,
      completcases: [],
      search: '',
      headers: [
        { text: 'Fall öffnen', value: 'start', sortable: false },
        { text: 'Fall Nr.', value: 'casenr' },
        { text: 'Name', value: 'name' },
        { text: 'Vorname', value: 'surname' },
        { text: 'Geburtsdatum', value: 'birthdate' },
        { text: 'Diagnose', value: 'diagnose' },
        { text: 'Operation', value: 'operation' },
        { text: 'OP-Datum', value: 'opdate', },
      

      ],

    };
  },
  // fetch all cases on pageload
  mounted() {
    this.fetchCases();
   // console.log(this.ccases);
  },
  // method to fetch all cases from the database
  methods: {
    async fetchCases() {
      return axios({
        method: 'get',
        url: 'http://localhost:8081/cases',
      })
        .then((response) => {
          this.completcases = response.data.cases;
        })
        .catch(() => {});
    },

  
  },
};
</script>

