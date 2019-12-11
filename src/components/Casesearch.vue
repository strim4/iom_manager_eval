<template slot="items" slot-scope="props" >
    <v-container > 
      <template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
</template>
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
    </v-data-table>
   </v-card> </br>
      <div class="text-right">
       <v-btn    color="primary"  :left="true" @click="dialogAnalyse = true">Neue Analyse mit selketierten Fällen</v-btn>
       </div>
        <!-- dialog to add new analyse -->
         <v-dialog v-model="dialogAnalyse" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Neue Analyse:</span>
          </v-card-title>
          <v-card-text>
            <v-container>

                  <v-text-field v-model="analyse.name" class="my-n5" label="Geben Sie eine Bezeichnung ein"  ></v-text-field>

            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success"  @click="saveAnalyse">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      selected: [],
      color: 'indigo',
      fixed: true,
      completcases: [],
      dialogAnalyse: false,
      analyse: {},
      
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
            ],
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Fallsuche',
          disabled: true,
          href: 'casesearch',
        },
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

     saveAnalyse: function() {
    
         const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
            name: this.analyse.name,
            cases: this.selected,
          },
          url: 'http://localhost:8081/analyses',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Die Analyse finden Sie nun im Menu "Analyse".',
              'success',
            );
            this.dialogAnalyse = false;
            
           
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Die Analyse konnte nicht gespeichert werden!',
              'error',
            );
          });
     
    },
    showSelect: function(){
      console.log(this.selected );
    },
  
  },
};
</script>

