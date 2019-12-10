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
      v-model="selected"
      :headers="headers"
      :items="completcases"
      :single-select="singleSelect"
      item-key="casenr"
      show-select
      :search="search"
      class="elevation-1"  
    >
      <template v-slot:item.start="{ item }">
       <router-link :to="{ name: 'Protocoloverview',  params: { casenr: item.casenr }  }">
            <v-icon :color="color">
        mdi-file-document
        </v-icon>
        </router-link>
      </template>   
            <template v-slot:item.delete="{ item }">
            <v-icon @click="deleteCase(item._id, item)">
          delete
        </v-icon>
      </template>     
    </v-data-table>
   </v-card> </br>
      <div class="text-right">
       <v-btn    color="primary"  :left="true">zu Analyse hinzufügen</v-btn>
       </div>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Casesearch',
  //initialize variables
  data() {
    return {
      singleSelect: false,
      color: 'indigo',
      fixed: true,
      completcases: [],
      search: '',
      headers: [
        { text: 'Fall öffnen', value: 'start', sortable: false },
        { text: 'Fall Nr.', value: 'casenr' },
        { text: 'FID', value: 'fid' },
        { text: 'PID', value: 'pid' },
        { text: 'Name', value: 'name' },
        { text: 'Vorname', value: 'surname' },
        { text: 'Geburtsdatum', value: 'birthdate' },
        //{ text: 'Diagnose', value: 'diagnose' },
        //{ text: 'Operation', value: 'operation' },
        //{ text: 'OP-Datum', value: 'opdate', },
        //{ text: 'Operateur', value: 'surgeon', },
        //{ text: 'Assistent', value: 'assistant', },
        { text: 'Alter', value: 'age'},
        { text: 'Studie', value: 'evaluation.study', },
        { text: 'Lokalisation', value: 'local'},
        { text: 'Detail', value: 'detail'},
        { text: 'Pathologie', value: 'patho'},
        { text: 'Operation', value: 'op'},
        { text: 'Löschen', value: 'delete', sortable: false},
            ],

    };
  },

  // fetch all cases on pageload
  mounted() {
    this.fetchCases();
  },
  
  // method to fetch all cases from the database
  methods: {
    async fetchCases() {
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
          this.completcases = response.data.protocols;
        })
        .catch(() => {});
    },

    // delete a case from the database
  
  },
};
</script>

