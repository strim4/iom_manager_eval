<template>
<v-layout  >
    <v-container  >
     <v-layout row>
    <v-flex md2 >
       
        <v-card
      class="mx-auto"
      max-width="175" 
      style="position: fixed;"
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
      Datum: {{opdate}}
      <!-- </br>
      Operateur: {{surgeon}} </br>
      Assistent: {{assistant}} -->
      </p>
      <v-divider></v-divider>
       </v-card-text>
      
       <v-card-text class="text-center">
       <v-btn  class="my-n3" width="180px"  color="primary"  @click="dialogEval = true" >Auswertung </br> Monitorist</v-btn>
      </v-card-text>
      <v-card-text class="text-center">
       <v-btn  class="my-n3" width="180px"  color="primary"  @click="dialogBaselines = true" >Baselines</v-btn>
      </v-card-text>
      <v-card-text class="text-center">
       <v-btn   class="my-n3" width="180px"  color="primary"  @click="dialogGrid = true" >Grid-MEPs</v-btn>
      </v-card-text>
      <v-card-text class="text-center">
       <v-btn   class="my-n3" width="180px" color="primary"  @click="dialogDwave = true" >D-Welle</v-btn>
        </br></br>
      </v-card-text>
      
    </v-card>
    
    
    

    </v-flex>
    <v-flex md10 >
     <p class=".font-weight-medium">Fall-Nr. {{casenr}} </br></p>
      
      
        </v-flex> 
  </v-layout> 
  <v-layout row>
    <v-flex md2 >   
    </v-flex>
    </br></br>
    <v-flex md10 >
     </br></br>
      <v-layout row>
        <v-flex md2><b><p>Uhrzeit</p></b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md2><b>Kategorie</b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md2><b>Eintrag</b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md2><b>Bemerkung</b></v-flex>
     
      </v-layout >  </br> 
          
      <div v-for="(entry, index) in entries">
        <v-layout row >
          
        <v-flex md2 >{{entry.ts}}</v-flex>
        <v-flex md1></v-flex>
        <v-flex md2 >{{entry.entrycat.name}}</v-flex>
        <v-flex md1></v-flex>
       <v-flex md2 >{{entry.event}}</v-flex>
        <v-flex md1></v-flex>
        <v-flex md3> <v-textarea v-model="entry.comment"  :auto-grow="true" :dense="true" :readonly="true" :rows="2"></v-textarea></v-flex>        
      </v-layout > 
       <v-divider></v-divider>
      </div>
        </v-flex> 


      

        

        


      

  
<!-- dialog for case evaluation -->

  
         <v-dialog v-model="dialogEval" persistent max-width="1000px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Fallauswertung Monitorist:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="4" md="2">
                 <v-checkbox v-model="evaluation.sseps" :disabled="true" class="my-n3" label="SSEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.meps" :disabled="true"  class="my-n3" label="MEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.aeps" :disabled="true"  class="my-n3" label="AEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.veps" :disabled="true" class="my-n3" label="VEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.emg" :disabled="true" class="my-n3" label="EMG" ></v-checkbox>
                 <v-checkbox v-model="evaluation.ecog" :disabled="true"  class="my-n3" label="ECOG" ></v-checkbox>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                 <v-checkbox v-model="evaluation.gridmeps" :disabled="true"  class="my-n3" label="Grid-MEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.sauger" :disabled="true"  class="my-n3" label="Dynamischer Sauger" ></v-checkbox>
                 <v-checkbox v-model="evaluation.dns" :disabled="true"  class="my-n3" label="DNS" ></v-checkbox>
                  <v-checkbox v-model="evaluation.dwave" :disabled="true"  class="my-n3" label="D-Welle" ></v-checkbox>
                  <v-checkbox v-model="evaluation.penfield" :disabled="true"  class="my-n3" label="Penfield"></v-checkbox>
                  <v-text-field v-model="evaluation.mappingsw" :disabled="true" class="my-n6" label="tiefste Mapping-Schwelle" suffix="mA"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="2">
                 <v-checkbox v-model="evaluation.br" :disabled="true"  class="my-n3" label="BR" ></v-checkbox>
                 <v-checkbox v-model="evaluation.lar" :disabled="true" class="my-n3" label="LAR" ></v-checkbox>
                 <v-checkbox v-model="evaluation.bcr" :disabled="true" class="my-n3" label="BCR" ></v-checkbox>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-checkbox v-model="evaluation.stabil" :disabled="true" class="my-n3" label="IOM stabil"></v-checkbox>
                  <v-select v-model="evaluation.sseps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="SSEPs"
                  ></v-select>
                  <v-select v-model="evaluation.meps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="MEPs"
                  ></v-select>
                  <v-select v-model="evaluation.aeps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="AEPs"
                  ></v-select>
                  <v-select v-model="evaluation.veps2"class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="VEPs"
                  ></v-select>
                  <v-select v-model="evaluation.gripdmeps2" class="my-n3" :disabled="true" 
                    :items="eventchanges"
                    label="Grid-MEPs"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                 <v-col cols="12" sm="6" md="2">
                 <v-checkbox v-model="evaluation.wachop"  :disabled="true" class="my-n3" label="Wach-OP" ></v-checkbox>
                 <v-checkbox v-model="evaluation.scs" :disabled="true" class="my-n3" label="SCS" ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                 <v-checkbox v-model="evaluation.dbs" :disabled="true" class="my-n3" label="DBS" ></v-checkbox>
                 <v-checkbox v-model="evaluation.ib" :disabled="true"  class="my-n3" label="IB" ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-checkbox  class="my-n3" v-model="evaluation.studycheck" :disabled="true"  label="Studienfall"></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="evaluation.study" class="my-n3"  :disabled="true" label="Studien eingeben"></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                  
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea v-model="evaluation.comment" :disabled="true" 
                  outlined
                  name="Bemerkungen"
                 label="Bemerkungen"
                  ></v-textarea>
                 </v-col>
             </v-row>    
             

            </v-container>


            
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
           
            <v-btn  depressed  large color="primary"  @click="dialogEval = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
           
  </v-layout> 
  </br></br>
  <v-layout row>
               <v-flex md2></v-flex>
               <v-flex md10>
                 <v-layout row>
                   <v-flex md0.5></v-flex>
                    <v-flex md2> <v-btn    color="primary"  @click="">PDF genereiren</v-btn></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2> <v-btn    color="primary"  @click="">EDF hinzufügen</v-btn></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2.5><v-btn    color="primary"  @click="dialogInterpret = true">Interpretation hinzufügen</v-btn></v-flex>
                    
                    <v-flex md3><b><v-btn    color="success"  @click="">Fall abschliessen</v-btn></b></v-flex>
                </v-layout>
               </v-flex>
    </v-layout> 


    <!-- dialog for interpretation -->
         <v-dialog v-model="dialogInterpret" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Interpretation:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                  <v-textarea  v-model="interp" :outlined="true" :auto-grow="true" ></v-textarea>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogInterpret = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
</v-container>


</v-layout>
</template>



<script>
import axios from 'axios';



export default {
  
  data: () => ({



dialogEval: false,
dialogInterpret: false,
    
    
 interp: '', 
    
    casenr: 0,
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
    entries: [],
    evaluation: {},

  

study: '',
 
 /* values for the baselines */
    items: ['vorhanden', 'mässig', 'schlecht', ''],
    sides: ['L', 'R', ''],
    muscles: ['Occulomotor', 'Trochlearis', 'Masseter', 'Abduzens', 'Orb occ', 'Labialis', 'Orb oris', 'Mentalis', 'Glosso', 'Vagus', 'Accessorius', 'Hypoglosso', 'Deltoideus', 'Biceps', 'Triceps', 'Extensor', 'Thenar', 'Hypothenar', 'Aductor', 'Ileopsoas', 'Quadri', 'Tib ant', 'Gastro', 'Abd hall', ''],
    eventchanges: ['normal', 'bedeutende Veränderungen', 'Verlust'],

  }),

  // store case id from the routerlink to a local variable on page load
  created() {
    this.casenr = this.$route.params.casenr;
    
    
 
  },

  


  // fetches all case data on load and pushs a first entry in the entry array
  mounted() {
  
    this.fetchProtocol(this.casenr);
    console.log(this.evaluation);

   

  },

  methods: {


  // fetch a single protocol from the database
    async  fetchProtocol(casenr) {
      return axios({
        method: 'get',
        data: {
          
        },
        url: `http://localhost:8081/protocols/${casenr}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          //this.casenr = response.data.protocols.casenr;
          this.pid = response.data.protocols.pid;
          this.fid = response.data.protocols.fid;
          this.name = response.data.protocols.name;
          this.surname = response.data.protocols.surname;
          this.birthdate = response.data.protocols.birthdate;
          this.diagnose = response.data.protocols.diagnose;
          this.operation = response.data.protocols.operation;
          this.isismodality = response.data.protocols.isismodality;
          this.opdate = response.data.protocols.opdate;
          this.surgeon = response.data.protocols.surgeon;
          this.assistant = response.data.protocols.assistant;
          this.entries = response.data.protocols.entries;
          this.evaluation = response.data.protocols.evaluation;
          console.log(response.data.protocols.entries);
         
        })
        .catch(() => { console.log('error'); });
    },

 
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


