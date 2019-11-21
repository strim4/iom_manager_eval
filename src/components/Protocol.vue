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
     {{name}}, {{surname}}</br> {{birthdate}}
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
      
      <v-divider></v-divider>
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

    
    
    <!-- protocol entries -->
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
      <div v-for="(entry, index) in entries" :class="{active:entry.selected}" @dblclick="$set(entry, 'selected', !entry.selected)" @contextmenu="">
        <v-layout row >
          
        <v-flex md2 ><v-text-field style="margin-left: 2.3em;" v-model="entry.ts" name="entries[][ts]"  :solo="true" :flat="true" background-color="transparent">{{entry.ts}}</v-text-field></v-flex>
       
        <v-flex md2>
           <v-select label="Kategorie"  v-model="entry.entrycat"  :items="dbcategories" item-text="name" item-value="entry.entrycat.name"   return-object name="entrycat"></v-select>
        </v-flex>
        <v-flex md1></v-flex>
        <v-flex md2>
              <v-select label="Event"  v-model="entry.event" :items="entry.entrycat.options" item-text="options"  :value="entry.event"  return-object  name="entries[][event]" >{{entry.event}}</v-select>
        </v-flex>
        <v-flex md1></v-flex>
        <v-flex md3> <v-textarea label="Bemerkung" v-model="entry.comment"  name="entries[][comment]" :auto-grow="true" :dense="true" :clearable="true" :rows="2"></v-textarea></v-flex>
        <v-flex md1>
          <v-icon @click="removeEntry(index)" >
          delete
        </v-icon>
         <v-icon @click="addNewEntry()">
          add
        </v-icon>
        </v-flex>
        
      </v-layout > 

     
     
         <v-divider></v-divider>
      </div>
      <v-layout row>
        <v-flex md10><b></b></v-flex>
        <v-flex md2> <v-btn depressed  large color="success" @click.stop="dialogFinish = true">IOM beenden</v-btn>

<!-- dialog for baselines  -->
         <v-dialog v-model="dialogBaselines" persistent max-width="1000px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Baselines:</span>
          </v-card-title>
          <v-card-text>


          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>Baselines SSEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container> 
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="N:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="P:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="Amplitude:" suffix="mA" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="N:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="P:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="Amplitude:" suffix="mA" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="N:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="P:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="Amplitude:" suffix="mA" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="N:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="P:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="Amplitude:" suffix="mA" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Baselines MEPs</v-expansion-panel-header>
            <v-expansion-panel-content>
                          <v-container>
              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="muscles"
                    label="Kanal 1"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  class="my-n5" label="C1/C2" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  class="my-n5" label="C4/Cz" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  class="my-n5" label="C3/Cz" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  class="my-n5" label="C3/C4" suffix="mA"></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="muscles"
                    label="Kanal 2"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  class="my-n5" label="C1/C2" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  class="my-n5" label="C4/Cz" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  class="my-n5" label="C3/Cz" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field class="my-n5" label="C3/C4" suffix="mA"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Baselines AEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
                            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="I" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="II" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="III" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="IV" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field  class="my-n5" label="V" suffix="ms" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="I" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="II" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="III" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="IV" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field class="my-n5"  label="V" suffix="ms" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Baselines VEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
                            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >VEP</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Reflexe</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >BR</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >LAR</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >BCR</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="dialogBaselines = false">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogBaselines = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- dialog for grid-baselines  -->
         <v-dialog v-model="dialogGrid" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Grid-MEPs:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col ols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >Masseter</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >Orb oris</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >Deltoideus</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >Biceps</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >Extensor</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >Abd hall</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-subheader  class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
                            <v-row>
                <v-col cols="12" sm="6" md="3" >
                  <v-subheader  class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select  class="my-n5" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  class="my-n5" label="C1/C2" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="dialogGrid = false">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogGrid = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    <!-- dialog for d-wave -->
         <v-dialog v-model="dialogDwave" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">D-Welle:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field  class="my-n5" label="Amplitude" suffix="mA" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field  class="my-n5" label="Latenz" suffix="ms"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="dialogDwave = false">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogDwave = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
        

         <!-- Dialog for finishing IOM -->
        <v-dialog
        v-model="dialogFinish"
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
             depressed  large color="normal"
              @click="dialogFinish = false"
            >
              Nein, nicht beenden            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog></v-flex>

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
                 <v-checkbox v-model="evaluation.sseps" class="my-n3" label="SSEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.meps" class="my-n3" label="MEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.aeps" class="my-n3" label="AEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.veps" class="my-n3" label="VEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.emg" class="my-n3" label="EMG" ></v-checkbox>
                 <v-checkbox v-model="evaluation.ecog" class="my-n3" label="ECOG" ></v-checkbox>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                 <v-checkbox v-model="evaluation.gridmeps" class="my-n3" label="Grid-MEPs" ></v-checkbox>
                 <v-checkbox v-model="evaluation.sauger" class="my-n3" label="Dynamischer Sauger" ></v-checkbox>
                 <v-checkbox v-model="evaluation.dns" class="my-n3" label="DNS" ></v-checkbox>
                  <v-checkbox v-model="evaluation.dwave" class="my-n3" label="D-Welle" ></v-checkbox>
                  <v-checkbox v-model="evaluation.penfield" class="my-n3" label="Penfield"></v-checkbox>
                  <v-text-field v-model="evaluation.mappingsw" class="my-n6" label="tiefste Mapping-Schwelle" suffix="mA"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="2">
                 <v-checkbox v-model="evaluation.br" class="my-n3" label="BR" ></v-checkbox>
                 <v-checkbox v-model="evaluation.lar" class="my-n3" label="LAR" ></v-checkbox>
                 <v-checkbox v-model="evaluation.bcr" class="my-n3" label="BCR" ></v-checkbox>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-checkbox v-model="evaluation.stabil" class="my-n3" label="IOM stabil"></v-checkbox>
                  <v-select v-model="evaluation.sseps2" class="my-n3"
                    :items="eventchanges"
                    label="SSEPs"
                  ></v-select>
                  <v-select v-model="evaluation.meps2" class="my-n3"
                    :items="eventchanges"
                    label="MEPs"
                  ></v-select>
                  <v-select v-model="evaluation.aeps2" class="my-n3"
                    :items="eventchanges"
                    label="AEPs"
                  ></v-select>
                  <v-select v-model="evaluation.veps2"class="my-n3"
                    :items="eventchanges"
                    label="VEPs"
                  ></v-select>
                  <v-select v-model="evaluation.gripdmeps2" class="my-n3"
                    :items="eventchanges"
                    label="Grid-MEPs"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                 <v-col cols="12" sm="6" md="2">
                 <v-checkbox v-model="evaluation.wachop" class="my-n3" label="Wach-OP" ></v-checkbox>
                 <v-checkbox v-model="evaluation.scs" class="my-n3" label="SCS" ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                 <v-checkbox v-model="evaluation.dbs" class="my-n3" label="DBS" ></v-checkbox>
                 <v-checkbox v-model="evaluation.ib" class="my-n3" label="IB" ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-checkbox  class="my-n3" v-model="evaluation.studycheck" label="Studienfall" ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="evaluation.study" class="my-n3"  :disabled="!evaluation.studycheck" label="Studien eingeben"></v-text-field>
                </v-col>

              </v-row>
              <v-row>
                  
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-textarea v-model="evaluation.comment"
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
            <v-btn  depressed  large color="success" @click="submit()">Fall beenden</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogEval = false">Abbrechen</v-btn>
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

      

 /* values for the baselines */
    items: ['vorhanden', 'mässig', 'schlecht', ''],
    sides: ['L', 'R', ''],
    muscles: ['Occulomotor', 'Trochlearis', 'Masseter', 'Abduzens', 'Orb occ', 'Labialis', 'Orb oris', 'Mentalis', 'Glosso', 'Vagus', 'Accessorius', 'Hypoglosso', 'Deltoideus', 'Biceps', 'Triceps', 'Extensor', 'Thenar', 'Hypothenar', 'Aductor', 'Ileopsoas', 'Quadri', 'Tib ant', 'Gastro', 'Abd hall', ''],
    eventchanges: ['normal', 'bedeutende Veränderungen', 'Verlust'],


  //  modalities: ['sseps', 'meps', 'aeps', 'veps', 'emg', 'ecog', 'grid', 'sauger', 'dns', 'dwave', 'penfield'],
  //  reflexes: ['br', 'lar', 'bcr'],
  //  summary: ['stabil', 'wachop', 'scs', 'dbs', 'ib'],
  //  study: ['study'],


dialogFinish: false,
dialogEval: false,
dialogBaselines: false,
dialogGrid: false,
dialogDwave: false,





  evaluation: {

      sseps:'',
      meps:'',
      aeps:'',	
      veps:'',
      emg:'',
      ecog:'',

      gridmeps:'',
      sauger:'',
      dns:'',
      dwave:'',
      penfield:'',
      mappingsw:'',

      br:'',
      lar:'',
      bcr:'',

      stabil:'',
      sseps2:'',
      meps2:'',
      aeps2:'',
      veps2:'',
      gridmeps2:'',

      wachop:'',
      scs:'',
      dbs:'',
      ib:'',
      study:'',
      studycheck: false,


      comment:'',


    },



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


    selectedEntry: null,




    dbcategories: [],
 selected: undefined,

 
  }),


  


  // fetches all case data on load and pushs a first entry in the entry array
  mounted() {
  
    this.fetchCase(this.id);
  

     this.getNow();
  
 this.fetchCategories();  
 this.entries.push( {
      ts: this.entry.ts,
      entrycat: { "options": [ "IOM gestartet", "IOM beendet", "Kalibrierung" ], "_id": "5dce9280026fa6fcc7f8653e", "name": "IOM" },
      event: 'IOM gestartet',
      comment: '',
 }) ;
 console.log(this.entries);



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
     
      ts: this.entry.ts,
      entrycat: this.entry.entrycat,
      event: this.entry.event,
      comment: this.entry.comment,
 }) ;
window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
console.log(this.entries);
    },

  
    
    //method to delete entry
    removeEntry: function (index) {


      swal({
            title: "Eintrag löschen?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            buttons: ["Abbrechen", "Löschen"],
           
            
        })
        .then((willDelete) => {
          if (willDelete) {
              this.entries.splice(index, 1,);
           
        
          } else {
           
          }
        });

     
     
     
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
this.dialogFinish = false;
this.dialogEval = true;
 this.entries.push( {
      ts: this.entry.ts,
      entrycat: { "options": [ "IOM gestartet", "IOM beendet", "Kalibrierung" ], "_id": "5dce9280026fa6fcc7f8653e", "name": "IOM" },
      event: 'IOM beendet',
      comment: '',
 });

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
      
          
        
        })
        .catch(() => {});
    },

 // submit method to send the new protocol to the db and delete the case from opencase db
    submit() {
      this.dialogEval = false;
    

        var self = this;
        return axios({
          method: 'post',
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
            entries: this.entries,
            evaluation: this.evaluation,
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
           /* Zum Programmieren deaktivert, muss anschliessend wieder aktiviert werden 
            this.deleteOpenCase(this.id); */
            this.$router.push({ name: 'Protocolevaluation', params: { casenr: this.casenr }  });
            
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Das Protokoll konnte nicht gespeichert werden!',
              'error',
            );
          }); 
     
    },

       // delete the specific case from opencase collection
    async  deleteOpenCase(id) {
     
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


<style>
.active {
  background-color: yellow;
}
</style>



