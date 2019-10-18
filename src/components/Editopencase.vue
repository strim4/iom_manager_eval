<!-- This file contains the structure to prapare a new case and save it to the database -->
<template>
<!-- Form to add a new Case -->
    <v-form v-model="valid" ref="form" lazy-validation>
    
        <h1>Offener Fall bearbeiten</h1>
        <label>Angaben zum Patienten</label>
        <v-text-field label="Fall Nr." v-model="casenr" :rules="requiredRules" required></v-text-field>
        <v-text-field label="PID" v-model="pid" :rules="requiredRules" required></v-text-field>
        <v-text-field label="FID" v-model="fid" :rules="requiredRules" required></v-text-field>
        <v-text-field label="Name" v-model="name" :rules="requiredRules" required></v-text-field>
        <v-text-field label="Vorname" v-model="surname" :rules="requiredRules" required></v-text-field>
        <v-text-field label="Geburtsdatum" readonly prepend-icon="event"  v-model="birthdate" :rules="requiredRules" required></v-text-field>
        <v-date-picker v-model="birthdate" :landscape="$vuetify.breakpoint.smAndUp"  :locale="'de'"></v-date-picker>
        
        </br>
        </br>
        </br>

        <label>Angaben zur Operation</label>
        <v-select label="Diagnose" v-model="diagnose" :items="diagnoses" item-text="diagnose"></v-select>
        <v-select label="Operation" v-model="operation" :items="operations"></v-select>
        <v-select label="ISIS-Gerät" v-model="isismodality" :items="isismodalities"></v-select>
        <v-text-field label="OP-Datum" prepend-icon="event" v-model="opdate"></v-text-field>
        <v-date-picker v-model="opdate" :landscape="$vuetify.breakpoint.smAndUp" :locale="'de'"></v-date-picker>
        <v-select label="Operateur" v-model="surgeon" :items="surgeons"></v-select>
        <v-select label="Assistent" v-model="assistant" :items="assistants"></v-select>
        <v-btn @click="update" color="success" :disabled="!valid">
            speichern
        </v-btn>
        <v-btn @click="clear">zurücksetzten</v-btn>
    </v-form>
</template>

<script>
import axios from 'axios';
import moment from 'moment';



export default {
    data: () => ({
        id: 0,
        valid: true,
        casenr: '',
        pid: '',
        fid: '',
        name: '',
        surname: '',
        birthdate: null,
        diagnose: '',
        operation: '',
        isismodality: '',
        opdate: '',
        surgeon: '',
        assistant: '',
        

        requiredRules: [
            v => !!v || 'Bitte befüllen Sie alle Pflichtfelder',
        ],
        select: null,
        diagnoses: [
           
        ],
        operations: [
            'CEA',
            'Hemilaminektomie',
            'Kraniotomie',
            'Kraniotomie & Clipping',
            'Kraniotomie & Exstirpation',
            'Laminektomie',

        ],
        isismodalities: [
            'Einstein',
            'Mietze',
            'Napoleon',
            'Rosalinde',

        ],
        surgeons: [
            'Abu-Isa Janine',
            'Bervini David',
            'Fichter Jens',
            'Krähenbühl Katharina',
            'Murek Michael',
            'Lutz Katharina',
            'Pollo Claudio',
            'Raabe Andreas',
        ],
        assistants: [
            'Consuegra Alberto',
            'Fard Ayda',
            'Finkenstädt Sina',
            'Goldberg Johannes',
            'Gondar Renato',
            'Hängi Levin Ayda',
        ],
    }),
    // fetches all diagnoses on pageload
    mounted() {
        this.fetchDiagnoses();
        this.fetchCase(this.id);
      

    },
      created() {
            this.id = this.$route.params.id;
            console.log(this.id);
           
           
        },

    methods: {
        // submit method to send the new case to the backend to store
        update() {
           console.log(this.casenr);
            if (this.$refs.form.validate()) {
                return axios({
                        method: 'put',
                        data: {
                           
                            casenr: this.casenr,
                            pid: this.pid,
                            fid: this.fid,
                            name: this.name,
                            surname: this.surname,
                            birthdate: this.birthdate,
                            diagnose: this.diagnose,
                            operation: this.operation,
                            isismodality: this.isismodality,
                            opdate: this.opdate,
                            surgeon: this.surgeon,
                            assistant: this.assistant,
                        },
                        url: 'http://localhost:8081/cases/'+this.id,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(() => {
                        this.$swal(
                            'Erfolgreich!',
                            'Der Fall wurde erfolgreich aktualisiert!',
                            'success',
                        );
                        this.$router.push({ name: 'Opencases' });
                        this.$refs.form.reset();
                    })
                    .catch(() => {
                        this.$swal(
                            'Fehler!',
                            'Der Fall konnte nicht aktualisiert werden!',
                            'error',
                        );
                    });
            }
            return true;
        },
        //method to reset the form
        clear() {
            this.$refs.form.reset();
        },
            //method to fetch all diagnoses from the database
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
         //fetch a single case from the database
   async  fetchCase(id) {
      
            return axios({
                    method: 'get',
                     data: {
                            id: id,
                        },
                    url: 'http://localhost:8081/cases/'+id,
                    headers: {
                            'Content-Type': 'application/json',
                        },
                })
                .then((response) => {
                this.casenr = response.data.cases.casenr;
                this.pid = response.data.cases.pid;
                this.fid = response.data.cases.fid;
                this.name = response.data.cases.name;
                this.surname = response.data.cases.surname;
                this.birthdate = response.data.cases.birthdate;
                this.diagnose = response.data.cases.diagnose;
                this.operation = response.data.cases.operation;
                this.isismodality = response.data.cases.isismodality;
                this.opdate = response.data.cases.opdate;
                this.surgeon = response.data.cases.surgeon;
                this.assistant = response.data.cases.assistant;             
       
                })
                .catch(() => {console.log("error");});
        },
    },
};
</script>
                          