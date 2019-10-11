
<template slot="items" slot-scope="props">
    <v-container>
        <v-col>
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
    
            <v-card>
                <v-card-title>
                    Erfasste Diagnosen 
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="this.diagnoses" :fixed-header="fixed" :search="search"></v-data-table>
            </v-card>
        </v-col>
    
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        valid: true,
        diagnose: '',
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
     mounted() {
        this.fetchDiagnoses();
    },
    methods: {
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
        clear() {
            this.$refs.form.reset();
        },
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
    },
};
</script>