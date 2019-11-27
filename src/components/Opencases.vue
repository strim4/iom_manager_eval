<!-- This file contains the structure to display all the open cases -->
<template slot="items" slot-scope="props" >

    <v-container > 

  <!-- Datatable with containing all the open cases -->
  
      <v-card > 
                <v-card-title>
                  Offene Fälle
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" 
                    single-line hide-details></v-text-field>
                </v-card-title>

      <v-data-table
      :headers="headers"
      :items="ccases"
      item-key="name"
      :search="search"
      class="elevation-1"  
      no-data-text="keine offenen Fälle gefunden"
    >
      <template v-slot:item.start="{ item }">
       <router-link :to="{ name: 'Protocol', params: { id: item._id } }">
            <v-icon :color="color">
         play_circle_filled 
        </v-icon>
        </router-link>
      </template>

        <template v-slot:item.edit="{ item }">
       <router-link :to="{ name: 'Editopencase', params: { id: item._id } }">
            <v-icon>
          edit
        </v-icon>
        </router-link>
      </template>

      <template v-slot:item.delete="{ item }">
            <v-icon @click="deleteOpenCase(item._id, item)">
          delete
        </v-icon>
      </template>

    </v-data-table>

      </v-card>
    </v-container>
     
</template>

<script>
import axios from 'axios';

export default {
  name: 'Cases',
  data() {
    return {
      color: 'success',
      fixed: true,
      ccases: [],
      search: '',
      headers: [
        { text: 'IOM Starten', value: 'start', sortable: false },
        { text: 'Fall Nr.', value: 'casenr' },
        { text: 'Name', value: 'name' },
        { text: 'Vorname', value: 'surname' },
        { text: 'Geburtsdatum', value: 'birthdate' },
        { text: 'Diagnose', value: 'diagnose' },
        { text: 'Operation', value: 'operation' },
        { text: 'OP-Datum', value: 'opdate', },
        { text: 'Bearbeiten', value: 'edit', sortable: false },
        { text: 'Löschen', value: 'delete', sortable: false },

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
      return axios({
        method: 'get',
        url: 'http://localhost:8081/cases',
      })
        .then((response) => {
          this.ccases = response.data.cases;
        })
        .catch(() => {});
    },

    // delete a opencase from the database
    async  deleteOpenCase(id, item) {
      console.log(id);
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `http://localhost:8081/cases/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.ccases.indexOf(item);
          this.ccases.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};
</script>
