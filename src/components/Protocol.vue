<template>
<v-layout>
    <v-container>
  <v-layout row>
    <v-flex md2>
        <v-card
      class="mx-auto"
      max-width="344"
    >
    <v-card-title>Patientendaten</v-card-title>
      <v-card-text class="text-left">
     {{name}}, {{surname}}</br> {{birthdate}}</p>
     <v-divider></v-divider>
     </v-card-text>
     <v-card-title>Operation</v-card-title>
     <v-card-text class="text-left">
     Diagnose: {{diagnose}}</br>
      Operation: {{operation}} </br>
      Datum: {{opdate}} </br>
      Operateur: {{surgeon}} </br>
      Assistent: {{assistant}}
      </p>
        
      </v-card-text>
    </v-card>
    </v-flex>
    <v-flex md10>
     <p class=".font-weight-medium">Fall-Nr. {{casenr}} - IOM {{status}} </br></p>
      <v-layout row>
        <v-flex md3><b>Uhrzeit</b></v-flex>
        <v-flex md3><b>Kategorie</b></v-flex>
        <v-flex md3><b>Eintrag</b></v-flex>
        <v-flex md3><b>Bemerkung</b></v-flex>
      </v-layout >  </br>  
        <v-layout row>
        <v-flex md3>09:00:51</v-flex>
        <v-flex md3>IOM</v-flex>
        <v-flex md3>IOM Beginn</v-flex>
        <v-flex md3>Beginn nach Plan </v-flex>
      </v-layout > 
        
      
     
        </v-flex>
  </v-layout> 
</v-container>

</v-layout>
</template>

<script>
import axios from 'axios';


export default {
  data: () => ({
    running: false,
    status: 'läuft',
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


 
  }),
  // fetches all data co
  mounted() {
  
    this.fetchCase(this.id);
   

  },
  // store case id from the routerlink to a local variable on page load
  created() {
    this.id = this.$route.params.id;
    this.running = true;
  },

  methods: {
   

  
    // fetch a single case from the database
    async  fetchCase(id) {
      return axios({
        method: 'get',
        data: {
          id,
        },
        url: `http://localhost:8081/cases/${id}`,
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
        .catch(() => { console.log('error'); });
    },
  },
};
</script>


