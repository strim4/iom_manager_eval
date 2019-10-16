<!-- This file contains the structure for the add diagnose site-->
<template slot="items" slot-scope="props">
    <v-container>
        <v-col>
            <!-- Form to add a new diagnose -->
            <v-form v-model="valid" ref="form" lazy-validation>
                <label>Neue Diagnose hinzufügen</label>
                <v-text-field label="Diagnose" :rules="rules" v-model="diagnose" required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>
        <v-col>
    <!-- Datatable with the stored diagnoses -->
            <v-card>
                <v-card-title>
                    Erfasste Diagnosen 
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="this.diagnoses" :fixed-header="fixed" :search="search"></v-data-table>
            </v-card>
        </v-col>


        <!-- Test -->
     
    
        <v-card>
                <v-card-title>
                    Erfasste Diagnosen 
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="diagnoses"
      item-key="name"
      :search="search"
      class="elevation-1"
    >
     
      <template v-slot:item.action="{ item }">
            <v-icon
          small
          @click="deleteItem(item)"
        >
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
    data: () => ({
        valid: true,
        diagnose: '',
        selected: [],
        rules: [
            v => !!v || 'Bitte geben Sie eine Diagnose ein',
        ],
        fixed: true,
        diagnoses: [],
        search: '',
        headers: [{
                text: 'Diagnose.',
                align: 'left',
                value: 'diagnose',
            },
            { text: 'Aktionen', value: 'action', sortable: false },
           
        ],


    }),
    // fetch all diagnoses on pageload
     mounted() {
        this.fetchDiagnoses();
    },
    methods: {
        // submit method to send the new diagnose to the backend
        submit() {
            if (this.$refs.form.validate()) {
                return axios({
                        method: 'post',
                        data: {
                            diagnose: this.diagnose,
                        },
                        url: 'http://localhost:8081/diagnoses',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(() => {
                        this.$swal(
                            'Erfolgreich!',
                            'Die Diagnose wurde gespeichert!',
                            'success',
                        );

                        this.$refs.form.reset();
                    })
                    .catch(() => {
                        this.$swal(
                            'Fehlgeschlagen!',
                            'Die Diagnose konnte nicht gespeichert werden!',
                            'error',
                        );
                    });
            }
            return true;
        },
        //Reset function
        clear() {
            this.$refs.form.reset();
        },
        // fetches all diagnoses from the database
         async fetchDiagnoses() {
            return axios({
                    method: 'get',
                    url: 'http://localhost:8081/diagnoses',
                })
                .then((response) => {
                    this.diagnoses = response.data.diagnoses;
                })
                .catch(() => {});
        },
     deleteDiagnose() {
            this.$refs.form.reset();
        },
        deleteItem(item) {
        const index = this.diagnoses.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.diagnoses.splice(index, 1)
        },
    },
};
</script>