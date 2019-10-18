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
     
    <!-- Datatable with the stored diagnoses -->

        
     
    
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
          
          @click="deleteDiagnose(item._id, item)"
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
            { text: 'Löschen', value: 'action', sortable: false },
           
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
                        this.fetchDiagnoses();

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
                    data: {
                            diagnose: this.diagnose,
                        },
                    url: 'http://localhost:8081/diagnoses',
                })
                .then((response) => {
                    this.diagnoses = response.data.diagnoses;
                })
                .catch(() => {});
        },
        //delete a diagnose from the database
   async  deleteDiagnose(id, item) {
       console.log(id);
            return axios({
                    method: 'delete',
                     data: {
                            id: id,
                        },
                    url: 'http://localhost:8081/diagnoses/'+id,
                    headers: {
                            'Content-Type': 'application/json',
                        },
                })
                .then((response) => {
                   const index = this.diagnoses.indexOf(item)
       this.diagnoses.splice(index, 1);
       
                })
                .catch(() => {});
        },
       
    },
};

</script>