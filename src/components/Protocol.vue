<template>
<v-layout  >
    <v-container  >
  <v-layout row>
    <v-flex md2 >
    <!-- Card with patient and op data -->
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
      Datum: {{opdate}} </br>
      Operateur: {{surgeon}} </br>
      Assistent: {{assistant}}
      </p>
       </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="text-center">
       <v-btn  color="primary"  @click="dialog3 = true" >Baselines</v-btn>
        
      </v-card-text>
      
    </v-card>
    
   
    
    </v-flex>

    <!-- dialog for baselines  -->
         <v-dialog v-model="dialog3" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Baselines:</span>
          </v-card-title>
          <v-card-text>
          <label>Titel:</label>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Platzhalter" ></v-text-field>
                </v-col>
               
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="error" @click="dialog3 = false">Speichern</v-btn>
            <v-btn  depressed  large color="success"  @click="dialog3 = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
    <v-flex md10 >
     <p class=".font-weight-medium">Fall-Nr. {{casenr}} - IOM {{status}} </br></p>
      <v-layout row>
        <v-flex md2><b><p>Uhrzeit</p></b></v-flex>
       
        <v-flex md2><b>Kategorie</b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md2><b>Eintrag</b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md3><b>Bemerkung</b></v-flex>
        <v-flex md1><b>Aktionen</b></v-flex>
      </v-layout >  </br>  
      
 
      <form >
      <div v-for="(entry, index) in entries" :key="index">
        <v-layout row v-on:dblclick="highlight()" :class="[isActive ? 'yellow' : 'none']">
          
        <v-flex md2 v-model="entry.ts" name="entries[][ts]">{{entry.ts}}</v-flex>
       
        <v-flex md2>
           <v-select label="Kategorie"  v-model="entry.entrycat"  :items="dbcategories" item-text="name"   return-object name="entries[][entrycat]"></v-select>
        </v-flex>
        <v-flex md1></v-flex>
        <v-flex md2>
              <v-select label="Event"  v-model="entry.event" :items="entry.entrycat.options" item-text="options"    return-object  name="entries[][event]" >{{entry.event}}</v-select>
        </v-flex>
        <v-flex md1></v-flex>
        <v-flex md3> <v-textarea label="Bemerkung" v-model="entry.comment"  name="entries[][comment]" :auto-grow="true" :dense="true" :clearable="true" :rows="2"></v-textarea></v-flex>
        <v-flex md1>
          <v-icon @click="dialog4 = true" >
          delete
        </v-icon>
         <v-icon @click="addNewEntry()">
          add
        </v-icon>
        </v-flex>
        
      </v-layout > 

       <!-- Dialog for deleting an protocol entry -->
        <v-dialog
        v-model="dialog4"
        max-width="400"
      >
     
        <v-card>
          <v-card-title class="headline">Eintrag löschen?</v-card-title>
  
          <v-card-text>
            Sind Sie sicher, dass Sie den Eintrag löschen wollen?
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              depressed  large color="success"
              @click="removeEntry(index)"
            >
              Ja, löschen.
            </v-btn>
  
            <v-btn
             depressed  large color="error"
              @click="dialog4 = false"
            >
              Abbrechen           </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
         <v-divider></v-divider>
      </div>
      <v-layout row>
        <v-flex md10><b></b></v-flex>
        <v-flex md2> <v-btn depressed  large color="success" @click.stop="dialog = true">IOM beenden</v-btn>


        

         <!-- Dialog for finishing IOM -->
        <v-dialog
        v-model="dialog"
        max-width="400"
      >
     
        <v-card>
          <v-card-title class="headline">IOM beenden?</v-card-title>
  
          <v-card-text>
            Sind Sie sicher, dass Sie das IOM-beenden möchten?
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
  
            <v-btn
              depressed  large color="success"
              @click="stopIom()"
            >
              Ja, beenden.
            </v-btn>
  
            <v-btn
             depressed  large color="error"
              @click="dialog = false"
            >
              Nein, nicht beenden            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog></v-flex>

<!-- dialog for case evaluation -->
         <v-dialog v-model="dialog2" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Fallauswertung Monitorist:</span>
          </v-card-title>
          <v-card-text>
          <label>Modalität auswählen:</label>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field label="Platzhalter" ></v-text-field>
                </v-col>
               
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="error" @click="dialog2 = false">Abbrechen</v-btn>
            <v-btn  depressed  large color="success"  @click="dialog2 = false">Fall beenden</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      </v-layout >  </br>  
           
      </br> </br></br> 
      </form>
        
      
     
        </v-flex>
        
        
  </v-layout> 
  
</v-container>


</v-layout>
</template>



<script>
import axios from 'axios';
import Qs from 'qs';


export default {
  
  data: () => ({



dialog: false,
dialog2: false,
dialog3: false,
dialog4: false,
del: false,

 isActive: false,

    entry: {
      ts: '',
      entrycat: '',
      event: '',
      comment: '',
    },
    entries: [
    
    ],

    
    
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

   timestamp: "",
    category: '',
    event: '',
    comment:'',


/*static categories
    categories: [
      {
      name: 'IOM',
      options: ['IOM 1', 'IOM 2', 'IOM 3', 'IOM gestartet']
      },
        {
        name: 'Anästhesie',
        options: ['Medigabe', 'Überdosis', 'Patient aufgewacht']
      },
       {
        name: 'Events',
        options: ['Event1', 'Event2', 'Event 3']
      },
       {
        name: 'OP-Verlauf',
        options: ['Schnitt', 'Nath']
      }


    ], */

    dbcategories: [],


 
  }),


  


  // fetches all case data on load and pushs a first entry in the entry array
  mounted() {
  
    this.fetchCase(this.id);
  

     this.getNow();
  
 this.fetchCategories();  
 this.entries.push( {
      ts: this.entry.ts,
      entrycat: 'IOM',
      event: 'IOM gestartet',
      comment: '',
 }) ;



  },
  // store case id from the routerlink to a local variable on page load
  created() {
    this.id = this.$route.params.id;
    
    
 
  },

  methods: {

//method to add a new entry and scroll down to the last entry
    addNewEntry: function () {
   this.getNow();
 this.entries.push( {
      index: this.entries.lenght,
      ts: this.entry.ts,
      entrycat: this.entry.entrycat,
      event: this.entry.event,
      comment: this.entry.comment,
 }) ;
window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);

    },

  
    
    //method to delete entry
    removeEntry: function (index) {
      this.dialog4 = false;
    
     console.log(index);
      this.entries.splice(index, 1,);
    },

   

//formate timestamp
  checkTime: function(i) {
        return (i < 10) ? "0" + i : i;
    },
//method to get the timestamp
   getNow: function() {
      const today = new Date();
        var h = this.checkTime(today.getHours());
      var      m = this.checkTime(today.getMinutes());
          var  s = this.checkTime(today.getSeconds());
       this.entry.ts = h + ":" + m + ":" + s;;
                },

//method to stop the iom
stopIom: function(){
this.status = 'beendet';
//this.dialog = false;
//this.dialog2 = true;
 this.entries.push( {
      ts: this.entry.ts,
      entrycat: 'IOM',
      event: 'IOM beendet',
      comment: '',
 });
this.submit();
},

//hilighting entries
highlight: function(){
   if(this.isActive){
         this.isActive = false;
       }else{
         this.isActive = true;
       }


},

   // fetches all categories from the database
    async fetchCategories() {
      return axios({
        method: 'get',
        data: {
          name: this.categories,
        },
        url: 'http://localhost:8081/categories',
      })
        .then((response) => {
          this.dbcategories = response.data.categories;
          console.log(this.categories);
          
        
        })
        .catch(() => {});
    },

 // submit method to send the new protocol to the backend to store
    submit() {
      
        var self = this;
        return axios({
          method: 'post',
          data: {
           // id: this.id,
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
            entries: this.entries,
          },
          url: 'http://localhost:8081/protocols',
          headers: {
            'Content-Type': 'application/json',
          },
          
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Das Protokoll wurde erfolgreich gespeichert!',
              'success',
            );
            this.$router.push({ name: 'Protocolevaluation' });
            
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Das Protokoll konnte nicht gespeichert werden!',
              'error',
            );
          });
     
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





