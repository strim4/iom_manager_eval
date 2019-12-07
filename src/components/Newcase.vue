<!-- This file contains the structure to prapare a new case and save it to the database -->
<template>
<!-- Form to add a new Case -->
    <v-form v-model="valid" ref="form" lazy-validation>

        <h1>Neuer Fall</h1>
        <label>Angaben zum Patienten</label>
        <v-text-field label="Fall Nr." v-model="casenr" :rules="requiredRules" required></v-text-field>
        <v-text-field label="PID" v-model="pid"></v-text-field>
        <v-text-field label="FID" v-model="fid"></v-text-field>
        <v-text-field label="Name" v-model="name" :rules="requiredRules" required></v-text-field>
        <v-text-field label="Vorname" v-model="surname" :rules="requiredRules" required></v-text-field>
        <v-text-field label="Geburtsdatum" readonly prepend-icon="event"  v-model="birthdate" :rules="requiredRules" required></v-text-field>
        <v-date-picker v-model="birthdate" :format="formatDate" :landscape="$vuetify.breakpoint.smAndUp"  :locale="'de'"></v-date-picker>

        </br>
        </br>
        </br>

        <label>Angaben zur Operation</label>
        <v-select label="Diagnose" v-model="diagnose" :items="diagnoses" item-text="diagnose"></v-select>
        <v-select label="Operation" v-model="operation" :items="operations" item-text="operation"></v-select>
        <v-select label="ISIS-Gerät" v-model="isismodality" :items="isismodalities" item-text="device"></v-select>
        <v-text-field label="OP-Datum" prepend-icon="event" v-model="opdate"></v-text-field>
        <v-date-picker v-model="opdate" :landscape="$vuetify.breakpoint.smAndUp" :locale="'de'"></v-date-picker>
        <v-select label="Operateur" v-model="surgeon" :items="surgeons" item-text="surgeon"></v-select>
        <v-select label="Assistent" v-model="assistant" :items="assistants" item-text="assistant"></v-select>
        <v-btn @click="submit" color="success" :disabled="!valid">
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


    ],
    isismodalities: [
     

    ],
    surgeons: [
    
    ],
    assistants: [
     
    ],
  }),

  
  // fetches all dropdown values form the database on pageload
  mounted() {
    this.fetchDiagnoses();
    this.fetchOperations();
    this.fetchDevices();
    this.fetchSurgeons();
    this.fetchAssistans();
  },

  methods: {

    formatDate: function (date) {
  return moment(date).format('DD-MM-YYYY')
},
    // submit method to send the new case to the backend to store
    submit() {
      if (this.$refs.form.validate()) {
         const token = window.localStorage.getItem('auth');
        return axios({
          method: 'post',
          data: {
            casenr: this.casenr,
            pid: this.pid,
            fid: this.fid,
            name: this.name,
            surname: this.surname,
            birthdate: moment(this.birthdate).format('DD-MM-YYYY'),
            diagnose: this.diagnose,
            operation: this.operation,
            isismodality: this.isismodality,
            opdate: moment(this.opdate).format('DD-MM-YYYY'),
            surgeon: this.surgeon,
            assistant: this.assistant,
          },
          url: 'http://localhost:8081/cases',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Fall wurde erfolgreich gespeichert!',
              'success',
            );
            this.$router.push({ name: 'Opencases' });
            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Der Fall konnte nicht gespeichert werden!',
              'error',
            );
          });
      }
      return true;
    },
    // method to reset the form
    clear() {
      this.$refs.form.reset();
    },

    // method to fetch all diagnoses from the database
    async fetchDiagnoses() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/diagnoses',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },

      })
        .then((response) => {
          this.diagnoses = response.data.diagnoses;
        })
        .catch(() => {});
    },

    // method to fetch all operations from the database
    async fetchOperations() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/operations',
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
      })
        .then((response) => {
          this.operations = response.data.operations;
        })
        .catch(() => {});
    },

    // method to fetch all isismodalities from the database
    async fetchDevices() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/devices',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
      })
        .then((response) => {
          this.isismodalities = response.data.devices;
        })
        .catch(() => {});
    },

    // method to fetch all surgeons from the database
    async fetchSurgeons() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/surgeons',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
      })
        .then((response) => {
          this.surgeons = response.data.surgeons;
        })
        .catch(() => {});
    },

    // method to fetch all assistants from the database
    async fetchAssistans() {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        url: 'http://localhost:8081/assistants',
         headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
      })
        .then((response) => {
          this.assistants = response.data.assistants;
        })
        .catch(() => {});
    },
  },
};
</script>

