<!-- This file contains the structure to display all the open cases -->
<template>
    <v-card>
        <v-card-title>
            Offene Fälle
            <div class="flex-grow-1"></div>
            <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers" :items="this.ccases" :fixed-header="fixed"  :search="search"></v-data-table>
    </v-card>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Cases',
    data() {
        return {
            
            fixed: true,
            ccases: [],
            search: '',
            headers: [
                { text: 'Fall Nr.', value: 'casenr'},
                { text: 'PID', value: 'pid' },
                { text: 'FID', value: 'fid' },
                { text: 'Name', value: 'name' },
                { text: 'Vorname', value: 'surname' },
                { text: 'Geburtsdatum', value: 'birthdate' },
                { text: 'Diagnose', value: 'diagnose' },
                { text: 'Operation', value: 'operation' },
                { text: 'ISIS Mod.', value: 'isismodality' },
                { text: 'OP-Datum', value: 'opdate' },
                { text: 'Chirurg', value: 'surgeon' },
                { text: 'Assistent', value: 'assistant' },
            ],

        };

    },
   //run method fetch all cases on pageload
    mounted() {
        this.fetchCases();
    },
     //method to fetch all cases from the database
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
    },
};
</script>