<template>
<v-layout  >

    <v-container  >
    
     <v-layout row>
    <v-flex md2 >
       <!-- card for patient and op data -->
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
       <v-btn   class="my-n3" width="180px" color="primary"  @click="dialogExtras = true" >Extras</v-btn>
      </v-card-text>
      <v-card-text class="text-center">
       <v-btn   class="my-n3" width="180px" color="primary"  @click="dialogClosing = true" >Closing</v-btn>
      </v-card-text>
      
    </v-card>
    
    <!-- protocol entries -->
    </v-flex>

    <v-flex md10 >
    <template>
      <div>
        <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
      </div>
    </template>
     <p class=".font-weight-medium">Fall-Nr. {{casenr}}</p>
      
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
        <v-flex md2><b>Kategorie</b></v-flex>
        <v-flex md3><b>Eintrag</b></v-flex>
        <v-flex md4><b>Bemerkung</b></v-flex>
     
      </v-layout >  </br> 
          
      <div v-for="(entry, index) in entries">
        <v-layout row >
          
        <v-flex md2 >{{entry.ts}}</v-flex>
        <v-flex md2 >{{entry.entrycat.name}}</v-flex>
        <v-flex md3 >{{entry.event}}</v-flex>
        <v-flex md4> <v-textarea v-model="entry.comment"  :auto-grow="true" :dense="true" :readonly="true" :rows="2"></v-textarea></v-flex>        
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
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.age" class="my-n3" :disabled="true"
                    :items="age"
                    label="Alter"
                  ></v-select>
                  <v-select v-model="evaluation.sex" class="my-n3" :disabled="true"
                    :items="sex"
                    label="Geschlecht"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.local" class="my-n3" :disabled="true"
                    :items="local"
                    label="Lokalisation"
                  ></v-select>
                  <v-select v-model="evaluation.detail" class="my-n3" :disabled="true"
                    :items="detail"
                    label="Detail"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.patho" class="my-n3" :disabled="true"
                    :items="patho"
                    label="Pathologie"
                  ></v-select>
                  <v-select v-model="evaluation.op" class="my-n3" :disabled="true"
                    :items="op"
                    label="Operation"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                  <v-select v-model="evaluation.anaest" class="my-n3" :disabled="true"
                    :items="anaest"
                    label="Anästhesie"
                  ></v-select>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <v-col cols="12" sm="4" md="8">
                 <v-select v-model="evaluation.modalities" class="my-n3" label="Modalitäten" :items="modalities" multiple :disabled="true"></v-select>
                  <v-select v-model="evaluation.mapping" class="my-n3" label="Mapping" :items="mapping" multiple :disabled="true"></v-select>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                    <label>Tiefste Mapping-Schwelle</label>
                    </v-col>
                    <v-col cols="12" sm="4" md="2">
                    <v-text-field v-model="evaluation.mappingsw" class="my-n3" suffix="mA" :disabled="true"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-select v-model="evaluation.reflexes" class="my-n3" label="Reflexe" :items="reflexes" multiple :disabled="true"></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="4">
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
                  <v-select v-model="evaluation.veps2" class="my-n3" :disabled="true" 
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
                 <v-col cols="12" sm="6" md="4">
                    <v-select v-model="evaluation.optechnik" class="my-n3" :disabled="true" 
                    :items="optechnik"
                    label="OP-Technik"
                  ></v-select>
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
                    <v-flex md2> <v-btn    color="primary"  @click="createPDF">PDF generieren</v-btn></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2.5> <v-btn    color="primary"  @click="analyseR">Kurvenansicht</v-btn></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2.5> <a :href="link"  target="_blank"><v-btn    color="primary"  @click="">EDF herunterladen</v-btn></a></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2.5><v-btn    color="primary"  @click="dialogInterpret = true">Interpretation</v-btn></v-flex>
                    
                    
                </v-layout>
               </v-flex>
    </v-layout> 
    
      
    

<!-- dialog for baselines  -->
         <v-dialog v-model="dialogBaselines" persistent max-width="1000px">
        
        <v-card >
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
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>N</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>P</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>Amplitude</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusLN" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusLP" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusLAmp" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusRN" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusRP" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusRAmp" class="my-n5" suffix="mA" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisLN" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisLP" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisLAmp" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisRN" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisRP" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisRAmp" class="my-n5" suffix="mA" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>Baselines TES MEPs</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <label>Seite</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C1/C2</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C3/C4</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C3/Cz</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C4/Cz</label>
                </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel1" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 1"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel1Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              
               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel2" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 2"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
               </v-row> 

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel3" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 3"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel3Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C3C4" class="my-n5"  suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel4" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 4"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel4Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel5" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 5"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel5Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel6" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 6"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel6Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel7" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 7"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel7Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel8" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 8"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel8Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel9" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 9"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel9Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel10" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 10"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel10Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel11" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 11"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel11Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel12" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 12"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel12Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel13" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 13"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel13Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel14" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 14"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel14Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel15" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 15"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel15Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="baselines.mepChannel16" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 16"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="baselines.mepChannel16Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C1C2" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C3C4" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C3CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C4CZ" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

            </v-container>
            </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Baselines DCS MEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-label></v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>Seite</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#1</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#2</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#3</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#4</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Masseter</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.masseterSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter1" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter2"  class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter3"  class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter4"  class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Orb oris</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.orisSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris1" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris3" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris4" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Deltoideus</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.deltoideusSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus1" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus3" class="my-n5"  :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus4" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Biceps</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bicepsSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps1" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps3" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps4" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Extensor</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.extensorSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor1" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor2" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor3" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor4" class="my-n5"  :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.thenarSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar1" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  v-model="baselines.thenar2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar3" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar4" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.tibSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib1" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib2" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib3" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib4" class="my-n5"  :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Abd hall</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.abdSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd1" class="my-n5"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd2" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd3" class="my-n5" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd4" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader  class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.thenar2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar21" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar22" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar23" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar24" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2" >
                  <v-subheader  class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.tib2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib21" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib22" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib23" class="my-n5" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib24" class="my-n5" :disabled="true" ></v-text-field>
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
                  <v-label></v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>I</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>II</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>III</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>IV</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>V</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLI" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLII" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLIII" class="my-n5" suffix="ms":disabled="true"  ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLIV" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field  v-model="baselines.aepLV" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRI" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRII" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRIII" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRIV" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRV" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
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
                  <v-select v-model="baselines.vepL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.vepR" class="my-n5" :disabled="true" 
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
                  <v-select v-model="baselines.brL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.brR" class="my-n5" :disabled="true" 
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
                  <v-select v-model="baselines.larL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.larR" class="my-n5" :disabled="true" 
                    :items="items"
                    label="R"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" :disabled="true" >BCR</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bcrL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bcrR" class="my-n5" :disabled="true" 
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
            <v-btn  depressed  large color="primary"  @click="dialogBaselines = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


    <!-- dialog for interpretation -->
         <v-dialog v-model="dialogInterpret" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">Interpretation:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                  <v-textarea  v-model="interp.text" :outlined="true" :auto-grow="true" ></v-textarea>
              </v-row>
              <v-text-field v-model="interp.histopatho" label="Histopathologie"></v-text-field>
              <v-select v-model="interp.deficits" class="my-n3" label="Defizite" :items="deficits" multiple chips></v-select>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn  depressed  large color="success"  @click="submitInterp" >Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogInterpret = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

       <!-- dialog for extras -->
         <v-dialog v-model="dialogExtras" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Extras:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label>Amplitude</label>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <label>Latenz</label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-subheader class="my-n5" >D-Welle:</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.dWaveAmp" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.dWaveLat" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1" class="my-n5" label="Weitere" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1Amp" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1Lat" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2" class="my-n5" label="Weitere" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2Amp" class="my-n5" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2Lat" class="my-n5" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="primary"  @click="dialogExtras = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- dialog for closing  -->
         <v-dialog v-model="dialogClosing" persistent max-width="1000px">
                <v-card>
          <v-card-title>
            <span class="headline">Closing:</span>
          </v-card-title>
          <v-card-text>
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>Closing SSEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container> 
              <v-row>
                <v-col cols="12" sm="6" md="2">
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>N</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>P</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>Amplitude</v-label>
                </v-col>
              </v-row>
          <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsMedianusLN" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsMedianusLP" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusLAmp" :disabled="true" class="my-n5" suffix="mA" ></v-text-field>
                </v-col>
              </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsMedianusRN" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsMedianusRP" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsMedianusRAmp" :disabled="true" class="my-n5" suffix="mA" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsTibialisLN" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsTibialisLP" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisLAmp" :disabled="true" class="my-n5" suffix="mA" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsTibialisRN" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.ssepsTibialisRP" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.ssepsTibialisRAmp" :disabled="true" class="my-n5" suffix="mA" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Closing TES MEPs</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="3">
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <label>Seite</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C1/C2</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C3/C4</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C3/Cz</label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <label>C4/Cz</label>
                </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel1" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 1"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel1Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel1C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>
              
               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel2" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 2"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel2C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
               </v-row> 

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel3" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 3"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel3Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel3C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel4" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 4"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel4Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel4C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel5" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 5"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel5Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel5C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel6" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 6"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel6Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel6C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel7" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 7"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel7Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel7C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel8" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 8"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel8Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel8C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel9" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 9"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel9Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel9C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

               <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel10" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 10"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel10Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel10C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.mepChannel11" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 11"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.mepChannel11Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel11C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel12" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 12"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel12Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel12C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel13" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 13"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel13Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel13C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel14" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 14"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel14Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel14C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel15" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 15"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel15Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel15C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="3">
                  <v-select v-model="closing.mepChannel16" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 16"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-select v-model="closing.mepChannel16Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C1C2" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C3C4" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C3CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="closing.mepChannel16C4CZ" :disabled="true" class="my-n5" suffix="mA"></v-text-field>
                </v-col>
              </v-row>

            </v-container>
            </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Closing DCS MEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
              <v-container>
                <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-label></v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>Seite</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#1</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#2</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#3</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-label>#4</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Masseter</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.masseterSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter2"  :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter3"  :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.masseter4"  :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Orb oris</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.orisSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.oris4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Deltoideus</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.deltoideusSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.deltoideus4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Biceps</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.bicepsSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.biceps4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Extensor</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.extensorSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.extensor4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.thenarSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  v-model="closing.thenar2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.tibSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Abd hall</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.abdSide" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd1" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd2" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd3" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.abd4" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader  class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.thenar2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar21" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar22" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar23" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.thenar24" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2" >
                  <v-subheader  class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.tib2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib21" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib22" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib23" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="closing.tib24" :disabled="true" class="my-n5"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header>Closing AEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-label></v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>I</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>II</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>III</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>IV</v-label>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-label>V</v-label>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLI" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLII" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLIII" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepLIV" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field  v-model="closing.aepLV" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRI" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRII" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRIII" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRIV" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="closing.aepRV" :disabled="true" class="my-n5" suffix="ms" ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>Closing VEPs</v-expansion-panel-header>
              <v-expansion-panel-content>
                            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >VEP</v-subheader>
                </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.vepL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.vepR" class="my-n5" :disabled="true" 
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
                  <v-select v-model="closing.brL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.brR" class="my-n5" :disabled="true" 
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
                  <v-select v-model="closing.larL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.larR" class="my-n5" :disabled="true" 
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
                  <v-select v-model="closing.bcrL" class="my-n5" :disabled="true" 
                    :items="items"
                    label="L"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="closing.bcrR" class="my-n5" :disabled="true" 
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
            <v-btn  depressed  large color="primary"  @click="dialogClosing = false">Schliessen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> 

        <v-dialog v-model="dialogCurve" width="auto" height="100" >
        
     <v-card>
       <div v-if="loading">
         </br></br></br></br>
       <p class="text-center"  >
         Daten werden geladen</br>
         <v-progress-circular
        indeterminate
        color="primary"
        :size="70"
        :width="7"
       
      ></v-progress-circular>
      
      </p>
      </div>
          
                <canvas id="myChart" width="auto" height="100" color="white"></canvas>    
      
     </v-card>
          
            <v-btn  depressed  large color="normal"  @click="dialogCurve = false">schliessen</v-btn>
         
      </v-dialog>


  

</v-container>

</v-layout>

</template>

<script>
import axios from 'axios';
import pdfmake from 'pdfmake';
import moment from 'moment';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import Chart from 'chart.js';




export default {
//initialize variables
  data: () => ({
    dialogCurve:false,
 edfName: '/MEPtest2.edf',
    edfData: {},
      lab: [],
    breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: true,
          href: 'home',
        },
        {
          text: 'Fallsuche',
          disabled: true,
          href: 'casesearch',
        },
       
      ],

dialogEval: false,
dialogInterpret: false,
dialogUpload: false,
dialogBaselines: false,
dialogExtras: false,
dialogClosing: false,
 

interp: {

  text: '',
  histopatho: '',
  deficits: '',
},
    
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

  timestamps: [],

study: '',

loading: false,

 baselines: {

    ssepsMedianusLN:'',
    ssepsMedianusLP:'',
    ssepsMedianusLAmp:'',

    ssepsMedianusRN:'',
    ssepsMedianusRP:'',
    ssepsMedianusRAmp:'',

    ssepsTibialisLN:'',
    ssepsTibialisLP:'',
    ssepsTibialisLAmp:'',

    ssepsTibialisRN:'',
    ssepsTibialisRP:'',
    ssepsTibialisRAmp:'',

        mepChannel1:'',
    mepChannel1Side:'',
    mepChannel1C1C2:'',
    mepChannel1C3C4:'',
    mepChannel1C3CZ:'',
    mepChannel1C4CZ:'',

        mepChannel2:'',
    mepChannel2Side:'',
    mepChannel2C1C2:'',
    mepChannel2C3C4:'',
    mepChannel2C3CZ:'',
    mepChannel2C4CZ:'',

        mepChannel3:'',
    mepChannel3Side:'',
    mepChannel3C1C2:'',
    mepChannel3C3C4:'',
    mepChannel3C3CZ:'',
    mepChannel3C4CZ:'',

        mepChannel4:'',
    mepChannel4Side:'',
    mepChannel4C1C2:'',
    mepChannel4C3C4:'',
    mepChannel4C3CZ:'',
    mepChannel4C4CZ:'',

        mepChannel5:'',
    mepChannel5Side:'',
    mepChannel5C1C2:'',
    mepChannel5C3C4:'',
    mepChannel5C3CZ:'',
    mepChannel5C4CZ:'',

        mepChannel6:'',
    mepChannel6Side:'',
    mepChannel6C1C2:'',
    mepChannel6C3C4:'',
    mepChannel6C3CZ:'',
    mepChannel6C4CZ:'',

        mepChannel7:'',
    mepChannel7Side:'',
    mepChannel7C1C2:'',
    mepChannel7C3C4:'',
    mepChannel7C3CZ:'',
    mepChannel7C4CZ:'',

        mepChannel8:'',
    mepChannel8Side:'',
    mepChannel8C1C2:'',
    mepChannel8C3C4:'',
    mepChannel8C3CZ:'',
    mepChannel8C4CZ:'',

        mepChannel9:'',
    mepChannel9Side:'',
    mepChannel9C1C2:'',
    mepChannel9C3C4:'',
    mepChannel9C3CZ:'',
    mepChannel9C4CZ:'',

        mepChannel10:'',
    mepChannel10Side:'',
    mepChannel10C1C2:'',
    mepChannel10C3C4:'',
    mepChannel10C3CZ:'',
    mepChannel10C4CZ:'',

        mepChannel11:'',
    mepChannel11Side:'',
    mepChannel11C1C2:'',
    mepChannel11C3C4:'',
    mepChannel11C3CZ:'',
    mepChannel11C4CZ:'',

        mepChannel12:'',
    mepChannel12Side:'',
    mepChannel12C1C2:'',
    mepChannel12C3C4:'',
    mepChannel12C3CZ:'',
    mepChannel12C4CZ:'',

        mepChannel13:'',
    mepChannel13Side:'',
    mepChannel13C1C2:'',
    mepChannel13C3C4:'',
    mepChannel13C3CZ:'',
    mepChannel13C4CZ:'',

        mepChannel14:'',
    mepChannel14Side:'',
    mepChannel14C1C2:'',
    mepChannel14C3C4:'',
    mepChannel14C3CZ:'',
    mepChannel14C4CZ:'',

        mepChannel15:'',
    mepChannel15Side:'',
    mepChannel15C1C2:'',
    mepChannel15C3C4:'',
    mepChannel15C3CZ:'',
    mepChannel15C4CZ:'',

        mepChannel16:'',
    mepChannel16Side:'',
    mepChannel16C1C2:'',
    mepChannel16C3C4:'',
    mepChannel16C3CZ:'',
    mepChannel16C4CZ:'',

    masseterSide:'',
    masseter1:'',
    masseter2:'',
    masseter3:'',
    masseter4:'',

    orisSide:'',
    oris1:'',
    oris2:'',
    oris3:'',
    oris4:'',

    deltoideusSide:'',
    deltoideus1:'',
    deltoideus2:'',
    deltoideus3:'',
    deltoideus4:'',

    bicepsSide:'',
    biceps1:'',
    biceps2:'',
    biceps3:'',
    biceps4:'',

    extensorSide:'',
    extensor1:'',
    extensor2:'',
    extensor3:'',
    extensor4:'',

    thenarSide:'',
    thenar1:'',
    thenar2:'',
    thenar3:'',
    thenar4:'',

    tibSide:'',
    tib1:'',
    tib2:'',
    tib3:'',
    tib4:'',

    abdSide:'',
    abd1:'',
    abd2:'',
    abd3:'',
    abd4:'',
    
    thenar2Side:'',
    thenar21:'',
    thenar22:'',
    thenar23:'',
    thenar24:'',

    tib2Side:'',
    tib21:'',
    tib22:'',
    tib23:'',
    tib24:'',

    aepLI:'',
    aepLII:'',
    aepLIII:'',
    aepLIV:'',
    aepLV:'',
    
    aepRI:'',
    aepRII:'',
    aepRIII:'',
    aepRIV:'',
    aepRV:'',

    vepL:'',
    vepR:'',

    brR:'',
    brL:'',
    larL:'',
    larR:'',
    bcrL:'',
    bcrR:'',

  },

  filename: '',

    extras: {

    dWaveAmp: '',
    dWaveLat: '',
    additional1: '',
    additional1Amp: '',
    additional1Lat: '',
    additional2: '',
    additional2Amp: '',
    additional2Lat: '',

  },

  closing: {

    ssepsMedianusLN:'',
    ssepsMedianusLP:'',
    ssepsMedianusLAmp:'',

    ssepsMedianusRN:'',
    ssepsMedianusRP:'',
    ssepsMedianusRAmp:'',

    ssepsTibialisLN:'',
    ssepsTibialisLP:'',
    ssepsTibialisLAmp:'',

    ssepsTibialisRN:'',
    ssepsTibialisRP:'',
    ssepsTibialisRAmp:'',

        mepChannel1:'',
    mepChannel1Side:'',
    mepChannel1C1C2:'',
    mepChannel1C3C4:'',
    mepChannel1C3CZ:'',
    mepChannel1C4CZ:'',

        mepChannel2:'',
    mepChannel2Side:'',
    mepChannel2C1C2:'',
    mepChannel2C3C4:'',
    mepChannel2C3CZ:'',
    mepChannel2C4CZ:'',

        mepChannel3:'',
    mepChannel3Side:'',
    mepChannel3C1C2:'',
    mepChannel3C3C4:'',
    mepChannel3C3CZ:'',
    mepChannel3C4CZ:'',

        mepChannel4:'',
    mepChannel4Side:'',
    mepChannel4C1C2:'',
    mepChannel4C3C4:'',
    mepChannel4C3CZ:'',
    mepChannel4C4CZ:'',

        mepChannel5:'',
    mepChannel5Side:'',
    mepChannel5C1C2:'',
    mepChannel5C3C4:'',
    mepChannel5C3CZ:'',
    mepChannel5C4CZ:'',

        mepChannel6:'',
    mepChannel6Side:'',
    mepChannel6C1C2:'',
    mepChannel6C3C4:'',
    mepChannel6C3CZ:'',
    mepChannel6C4CZ:'',

        mepChannel7:'',
    mepChannel7Side:'',
    mepChannel7C1C2:'',
    mepChannel7C3C4:'',
    mepChannel7C3CZ:'',
    mepChannel7C4CZ:'',

        mepChannel8:'',
    mepChannel8Side:'',
    mepChannel8C1C2:'',
    mepChannel8C3C4:'',
    mepChannel8C3CZ:'',
    mepChannel8C4CZ:'',

        mepChannel9:'',
    mepChannel9Side:'',
    mepChannel9C1C2:'',
    mepChannel9C3C4:'',
    mepChannel9C3CZ:'',
    mepChannel9C4CZ:'',

        mepChannel10:'',
    mepChannel10Side:'',
    mepChannel10C1C2:'',
    mepChannel10C3C4:'',
    mepChannel10C3CZ:'',
    mepChannel10C4CZ:'',

        mepChannel11:'',
    mepChannel11Side:'',
    mepChannel11C1C2:'',
    mepChannel11C3C4:'',
    mepChannel11C3CZ:'',
    mepChannel11C4CZ:'',

        mepChannel12:'',
    mepChannel12Side:'',
    mepChannel12C1C2:'',
    mepChannel12C3C4:'',
    mepChannel12C3CZ:'',
    mepChannel12C4CZ:'',

        mepChannel13:'',
    mepChannel13Side:'',
    mepChannel13C1C2:'',
    mepChannel13C3C4:'',
    mepChannel13C3CZ:'',
    mepChannel13C4CZ:'',

        mepChannel14:'',
    mepChannel14Side:'',
    mepChannel14C1C2:'',
    mepChannel14C3C4:'',
    mepChannel14C3CZ:'',
    mepChannel14C4CZ:'',

        mepChannel15:'',
    mepChannel15Side:'',
    mepChannel15C1C2:'',
    mepChannel15C3C4:'',
    mepChannel15C3CZ:'',
    mepChannel15C4CZ:'',

        mepChannel16:'',
    mepChannel16Side:'',
    mepChannel16C1C2:'',
    mepChannel16C3C4:'',
    mepChannel16C3CZ:'',
    mepChannel16C4CZ:'',

    masseterSide:'',
    masseter1:'',
    masseter2:'',
    masseter3:'',
    masseter4:'',

    orisSide:'',
    oris1:'',
    oris2:'',
    oris3:'',
    oris4:'',

    deltoideusSide:'',
    deltoideus1:'',
    deltoideus2:'',
    deltoideus3:'',
    deltoideus4:'',

    bicepsSide:'',
    biceps1:'',
    biceps2:'',
    biceps3:'',
    biceps4:'',

    extensorSide:'',
    extensor1:'',
    extensor2:'',
    extensor3:'',
    extensor4:'',

    thenarSide:'',
    thenar1:'',
    thenar2:'',
    thenar3:'',
    thenar4:'',

    tibSide:'',
    tib1:'',
    tib2:'',
    tib3:'',
    tib4:'',

    abdSide:'',
    abd1:'',
    abd2:'',
    abd3:'',
    abd4:'',
    
    thenar2Side:'',
    thenar21:'',
    thenar22:'',
    thenar23:'',
    thenar24:'',

    tib2Side:'',
    tib21:'',
    tib22:'',
    tib23:'',
    tib24:'',

    aepLI:'',
    aepLII:'',
    aepLIII:'',
    aepLIV:'',
    aepLV:'',
    
    aepRI:'',
    aepRII:'',
    aepRIII:'',
    aepRIV:'',
    aepRV:'',

    vepL:'',
    vepR:'',

    brR:'',
    brL:'',
    larL:'',
    larR:'',
    bcrL:'',
    bcrR:'',

  },


  file: null,

    /* values for evaluation*/
    age: ['Kind','Erwachsener'],
    sex: ['Weiblich','Männlich'],
    local: ['supratentorielle RF','infratentorielle RF','spinal','Gefässe',''],
    detail: ['frontal','zentral','parietal','occipital','temporal','cerebellär','KHBW','HWK','BWK','LWK','SWK','Hypophyse','Hirnstamm',''],
    patho: ['intracerebral','extradural','intradural','intramedullär','vaskulär','Blutungen',''],
    op: ['Resektion','Clipping','Stabilisation','Dekompression','Biopsie','direkte Stimulation','Verschluss',''],
    anaest: ['TIVA','TIVA plus','Wach-OP',''],
    optechnik: ['Wach-OP', 'SCS', 'DBS', 'IB', ''],
    modalities: ['SSEPs ', 'TES-MEPs ', 'DCS-MEPs ', 'AEPs ', 'VEPs ', 'CCEPs ', 'EMG ', 'ECOG '],
    mapping:['Dynamischer Sauger ', 'DNS ', 'D-Welle ', 'Penfield '],
    reflexes:['BR ', 'LAR ', 'BCR '],

    /* values for interpretation*/
    deficits:['1 Tag postop ', '1 Woche postop ', '1 Monat postop '],
 
 /* values for the baselines and for the closing*/
    items: ['vorhanden', 'mässig', 'schlecht', ''],
    sides: ['L', 'R', ''],
    muscles: ['Occulomotor', 'Trochlearis', 'Masseter', 'Abduzens', 'Orb occ', 'Labialis', 'Orb oris', 'Mentalis', 'Glosso', 'Vagus', 'Accessorius', 'Hypoglosso', 'Deltoideus', 'Biceps', 'Triceps', 'Extensor', 'Thenar', 'Hypothenar', 'Aductor', 'Ileopsoas', 'Quadri', 'Tib ant', 'Gastro', 'Abd hall', ''],
    eventchanges: ['normal', 'bedeutende Veränderungen', 'Verlust', ''],

  }),



//Link to edf 
computed: {
    link: function () {
      
       return "./../static/"+this.filename;
    }
  },

  // store case id from the routerlink to a local variable on page load
  created() {
    this.casenr = this.$route.params.casenr;
  },

  // fetches all case data on load and pushs a first entry in the entry array
  mounted() {
    this.fetchProtocol(this.casenr);
  },

  methods: {

  // fetch a single protocol from the database
    async  fetchProtocol(casenr) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          
        },
        url: `http://localhost:8081/completcase/${casenr}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          this.pid = response.data.protocols.pid;
          this.fid = response.data.protocols.fid;
          this.name = response.data.protocols.name;
          this.surname = response.data.protocols.surname;
          this.birthdate =moment( response.data.protocols.birthdate).format("DD-MM-YYYY");
          this.diagnose = response.data.protocols.diagnose;
          this.operation = response.data.protocols.operation;
          this.isismodality = response.data.protocols.isismodality;
          this.opdate = moment( response.data.protocols.opdate).format("DD-MM-YYYY");
          this.surgeon = response.data.protocols.surgeon;
          this.assistant = response.data.protocols.assistant;
          this.entries = response.data.protocols.entries;
          this.evaluation = response.data.protocols.evaluation;
          this.baselines = response.data.protocols.baselines;
          this.extras = response.data.protocols.extras;
          this.closing = response.data.protocols.closing;
          this.filename = response.data.protocols.edf;
         console.log(this.filename);
         
        })
        .catch(() => { console.log('error'); });
    },

    // update a case
    update() {
    
        const token = window.localStorage.getItem('auth');
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
        isismodality:this.isismodality,
        opdate: this.opdate,
        surgeon: this.surgeon,
        assistant: this.assistant,
        entries: this.entries,
        evaluation: this.evaluation,
        baselines:this.baselines,
        extras: this.extras,
        closing: this.losing,
        interpretation:this.interp,
        edf:this.file,
          },
          url: `http://localhost:8081/completcase/${this.casenr}`,
          headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Fall wurde erfolgreich aktualisiert!',
              'success',
            );
          
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Der Fall konnte nicht aktualisiert werden!',
              'error',
            );
          });
      },
     
  //Submission of interpretation to the database
  submitInterp(){
    this.dialogInterpret = false;
this.update();
  },

    // fetch file from server
    async  fetchFile(filename) {
      const token = window.localStorage.getItem('auth');
      return axios({
        method: 'get',
        data: {
          
        },
        url: `http://localhost:8081/upload/${filename}`,
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {       
          this.file = response.data.complet.extras;

        })
        .catch(() => { console.log('error'); });
    },


//method to open the uploaded file in browser or to download it

openFile: function(){

  let reader = new FileReader()
  reader.readAsDataURL(this.file);

     reader.onloadend = (e) => {

                let anchor = document.createElement('a')
                anchor.setAttribute('class', 'q-attached-file', 'download')
                anchor.setAttribute('title', this.file.name)
                anchor.setAttribute('href', reader.result)
                anchor.innerText = this.file.name
               
                var win = window.open();
    win.document.write('<iframe src="' + anchor  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
 
    }
  
},

//triggers R function on server that emmits r file to R. R file is proccessed in 
//R an the return to the server. Server returns data to frontend and afterwards the signal curves are drawn
   async analyseR(){
      //const token = window.localStorage.getItem('auth');
        this.dialogCurve = true;
        this.loading = true;
      return axios({
        method: 'post',
        data: {
            name: this.edfName,
          },
        url: 'http://localhost:8081/ex-async',
         headers: {
           // Authorization: `JWT ${token}`,
            //'Content-Type': 'application/json',
          },
      })
        .then((response) => {
  
           this.loading = false;
          this.edfData = response.data;
      
          for(let i = 0; i<this.edfData[ 'Thenar re' ].fragments[0].signal.length; i++){
         this.lab.push(i);
        
       };
          
           var ctx = document.getElementById('myChart');
        
         
      
      
 //Draw Curves with charts.js     
var myChart = new Chart(ctx, {
    type: 'line',
   
    data:
    { labels: this.lab,
      datasets: [
            {
                label: "Thenar re",
             
                data: this.edfData[ 'Thenar re' ].fragments[0].signal,
                fill: true,
                  lineTension: 0.1,
                  backgroundColor: "rgba(75,192,192,0.4)",
                  borderColor: "rgba(75,192,192,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(75,192,192,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(75,192,192,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                 
                  spanGaps: false,
                
            },
             {
                label: "Tib ant re",
                data: this.edfData[ 'Tib ant re' ].fragments[0].signal,
                fill: true,
                  lineTension: 0.1,
                  backgroundColor: "rgba(204, 235, 52,0.4)",
                  borderColor: "rgba(204, 235, 52,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(204, 235, 52,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(204, 235, 52,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                 
                  spanGaps: false,
                
            }, 
             {
                label: "Extensor re",
                data: this.edfData[ 'Extensor re' ].fragments[0].signal,
                fill: true,
                  lineTension: 0.1,
                  backgroundColor: "rgba(229, 52, 2352,0.4)",
                  borderColor: "rgba(229, 52, 235,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(229, 52, 235,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(229, 52, 235,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                 
                  spanGaps: false,
                
            },
            {
                label: "Deltoideus re",
                data: this.edfData[ 'Deltoideus re' ].fragments[0].signal,
                fill: true,
                  lineTension: 0.1,
                  backgroundColor: "rgba(150, 235, 52,0.4)",
                  borderColor: "rgba(150, 235, 52,1)",
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: "rgba(150, 235, 52,1)",
                  pointBackgroundColor: "#fff",
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: "rgba(150, 235, 52,1)",
                  pointHoverBorderColor: "rgba(220,220,220,1)",
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                 
                  spanGaps: false,
                
            },]},
   options:{
                 responsive: true, 
             scales: {
    yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Amplitude [mV]',
         fontStyle: "bold",
      }
    }],
     xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Latency [ms]',
         fontStyle: "bold",
      }
    }]
  }     
            }
});
        })
        .catch(() => {});
   },

//generate PDF Export
createPDF() {

var sourceData = this.entries
var bodyData = [];



sourceData.forEach(function(sourceRow) {
  var dataRow = [];


  dataRow.push(sourceRow.ts);
  dataRow.push(sourceRow.entrycat.name);
  dataRow.push(sourceRow.event);
  dataRow.push(sourceRow.comment);
 
 
  bodyData.push(dataRow)
});

  //Documentstructure for export
	let documentDefinition = {

    pageMargins: [ 20, 70, 20, 20 ],
    pageSize: 'A4',

    header: [

        { canvas: [{ type: 'line', color:'#3F51B5', x1: 20, y1: 10, x2: 595-20, y2: 10, lineWidth: 0.5 }] },

        {
           fontSize: 8,
           columns : [
               {
                   text : 'IOM-Manager', margin : [ 20, 0, 0, 0 ], width : 100 
               }     
           ]

        },

        {
           fontSize: 8,
           columns : [
               {
                   text : 'Fall Nr. ' + this.casenr, margin : [ 20,0,0,0 ], width : 100
               }     
           ]

        },

        { 
            canvas: [
                { type: 'line', color:'#3F51B5', x1: 20, y1: 0, x2: 595-20, y2: 0, lineWidth: 0.5 }
            ] 

        },



    ],
  	content: 
    [
      { text: moment(new Date()).format('DD-MM-YYYY'), alignment: 'right' },
      { text: 'IOM Protokoll Fall Nr. ' + this.casenr, style: 'header' },

      { text: 'Patientenangaben', style: 'subheader' },
      
      { text: "Vorname: " + this.surname, style: 'plaintext'},
      { text: "Name: " + this.name, style: 'plaintext'},
      { text: "Geburtsdatum: " + this.birthdate, style: 'plaintext'},

      { text: 'Angaben zur Operation', style: 'subheader' },

      { text: "Diagnose: " + this.diagnose, style: 'plaintext'},
      { text: "Operation: " + this.operation, style: 'plaintext'},
      { text: "OP-Datum: " + this.opdate, style: 'plaintext'},

       
       { text: 'Protokolleinträge\n', style: 'subheader' },
        {  
        table: 
        {
            body: bodyData   	    
        }
        }, 
      
      { text: 'Interpretation', style: 'subheader'},
      { text: this.interp.text},
      { text: this.interp.histopatho},
      { text: this.interp.deficits},

      { text: 'Auswertung Monitorist', style: 'subheader' },
      { text: '\nFallkodierung:'},

      {
        table: 
        {
          body: [

            ['Alter: ' + this.evaluation.age, 'Lokalisation: ' + this.evaluation.local,'Pathologie: ' + this.evaluation.patho, 'Anästhesie: ' + this.evaluation.anaest],
            ['Geschlecht: ' + this.evaluation.age, 'Detail: ' + this.evaluation.local, 'Operation: ' + this.evaluation.op,''],
          ]
        }
      
      },
      { text: '\n' },
      	{
     
			table: {
			
				body: [

          ['Modalitäten', {text: this.evaluation.modalities, style: 'value'}],
          ['Mapping', {text: this.evaluation.mapping, style: 'value'}],
          ['Tiefste Mapping-Schwelle:', {text: this.evaluation.mappingsw, style: 'value'}],
          ['Reflexe', {text: this.evaluation.reflexes, style: 'value'}],
          ['SSEPs:', {text: this.evaluation.sseps2, style:'value'}],
          ['TES-MEPs:', {text: this.evaluation.meps2, style: 'value'}],
          ['AEPs:', {text: this.evaluation.aeps2, style: 'value'}],
          ['VEPs:', {text: this.evaluation.veps2, style: 'value'}],
          ['DCS-MEPs:', {text: this.evaluation.gripdmeps2, style: 'value'}],
          ['OP-Technik:', {text: this.evaluation.optechnik, style: 'value'}],
          ['Studie:', {text: this.evaluation.study, style: 'value'}],
				
				]      
      },

     },
     { text: '\nBemerkungen: ' + this.evaluation.comment},

     { text: 'Baselines SSEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'N', style: 'tableHeader'}, {text:'P', style: 'tableHeader'}, {text:'Amplitude', style: 'tableHeader'}],
					['Medianus L', this.baselines.ssepsMedianusLN, this.baselines.ssepsMedianusLP, this.baselines.ssepsMedianusLAmp + 'mA',],
          ['Medianus R', this.baselines.ssepsMedianusRN, this.baselines.ssepsMedianusRP, this.baselines.ssepsMedianusRAmp + 'mA',],
          ['Tibialis L', this.baselines.ssepsTibialisLN, this.baselines.ssepsTibialisLP, this.baselines.ssepsTibialisLAmp + 'mA',],
          ['Tibialis R', this.baselines.ssepsTibialisRN, this.baselines.ssepsTibialisRP, this.baselines.ssepsTibialisRAmp + 'mA',],
      
				]
        
			},
        
		},

    { text: 'Baselines TES-MEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'Ableitung', style: 'tableHeader'}, {text:'Seite', style: 'tableHeader'}, {text:'C1/C2', style: 'tableHeader'}, {text:'C3/C4', style: 'tableHeader'}, {text:'C3/Cz', style: 'tableHeader'}, {text:'C4/Cz', style: 'tableHeader'}],
					[this.baselines.mepChannel1, this.baselines.mepChannel1Side , this.baselines.mepChannel1C1C2 + 'mA', this.baselines.mepChannel1C3C4 + 'mA',this.baselines.mepChannel1C3CZ +'mA',this.baselines.mepChannel1C4CZ +'mA',],
      		[this.baselines.mepChannel2, this.baselines.mepChannel2Side , this.baselines.mepChannel2C1C2 + 'mA', this.baselines.mepChannel2C3C4 + 'mA',this.baselines.mepChannel2C3CZ +'mA',this.baselines.mepChannel2C4CZ +'mA',],
          [this.baselines.mepChannel3, this.baselines.mepChannel3Side , this.baselines.mepChannel3C1C2 + 'mA', this.baselines.mepChannel3C3C4 + 'mA',this.baselines.mepChannel3C3CZ +'mA',this.baselines.mepChannel3C4CZ +'mA',],
				  [this.baselines.mepChannel4, this.baselines.mepChannel4Side , this.baselines.mepChannel4C1C2 + 'mA', this.baselines.mepChannel4C3C4 + 'mA',this.baselines.mepChannel4C3CZ +'mA',this.baselines.mepChannel4C4CZ +'mA',],
          [this.baselines.mepChannel5, this.baselines.mepChannel5Side , this.baselines.mepChannel5C1C2 + 'mA', this.baselines.mepChannel5C3C4 + 'mA',this.baselines.mepChannel5C3CZ +'mA',this.baselines.mepChannel5C4CZ +'mA',],
          [this.baselines.mepChannel6, this.baselines.mepChannel6Side , this.baselines.mepChannel6C1C2 + 'mA', this.baselines.mepChannel6C3C4 + 'mA',this.baselines.mepChannel6C3CZ +'mA',this.baselines.mepChannel6C4CZ +'mA',],
          [this.baselines.mepChannel7, this.baselines.mepChannel7Side , this.baselines.mepChannel7C1C2 + 'mA', this.baselines.mepChannel7C3C4 + 'mA',this.baselines.mepChannel7C3CZ +'mA',this.baselines.mepChannel7C4CZ +'mA',],
          [this.baselines.mepChannel8, this.baselines.mepChannel8Side , this.baselines.mepChannel8C1C2 + 'mA', this.baselines.mepChannel8C3C4 + 'mA',this.baselines.mepChannel8C3CZ +'mA',this.baselines.mepChannel8C4CZ +'mA',],
      		[this.baselines.mepChannel9, this.baselines.mepChannel9Side , this.baselines.mepChannel9C1C2 + 'mA', this.baselines.mepChannel9C3C4 + 'mA',this.baselines.mepChannel9C3CZ +'mA',this.baselines.mepChannel9C4CZ +'mA',],
      		[this.baselines.mepChannel10, this.baselines.mepChannel10Side , this.baselines.mepChannel10C1C2 + 'mA', this.baselines.mepChannel10C3C4 + 'mA',this.baselines.mepChannel10C3CZ +'mA',this.baselines.mepChannel10C4CZ +'mA',],
      		[this.baselines.mepChannel11, this.baselines.mepChannel11Side , this.baselines.mepChannel11C1C2 + 'mA', this.baselines.mepChannel11C3C4 + 'mA',this.baselines.mepChannel11C3CZ +'mA',this.baselines.mepChannel11C4CZ +'mA',],
      		[this.baselines.mepChannel12, this.baselines.mepChannel12Side , this.baselines.mepChannel12C1C2 + 'mA', this.baselines.mepChannel12C3C4 + 'mA',this.baselines.mepChannel12C3CZ +'mA',this.baselines.mepChannel12C4CZ +'mA',],
      		[this.baselines.mepChannel13, this.baselines.mepChannel13Side , this.baselines.mepChannel13C1C2 + 'mA', this.baselines.mepChannel13C3C4 + 'mA',this.baselines.mepChannel13C3CZ +'mA',this.baselines.mepChannel13C4CZ +'mA',],      
       		[this.baselines.mepChannel14, this.baselines.mepChannel14Side , this.baselines.mepChannel14C1C2 + 'mA', this.baselines.mepChannel14C3C4 + 'mA',this.baselines.mepChannel14C3CZ +'mA',this.baselines.mepChannel14C4CZ +'mA',],      
      		[this.baselines.mepChannel15, this.baselines.mepChannel15Side , this.baselines.mepChannel15C1C2 + 'mA', this.baselines.mepChannel15C3C4 + 'mA',this.baselines.mepChannel15C3CZ +'mA',this.baselines.mepChannel15C4CZ +'mA',],       
      		[this.baselines.mepChannel16, this.baselines.mepChannel16Side , this.baselines.mepChannel16C1C2 + 'mA', this.baselines.mepChannel16C3C4 + 'mA',this.baselines.mepChannel16C3CZ +'mA',this.baselines.mepChannel16C4CZ +'mA',],
        ]
        
			},
        
		},


     { text: 'Baselines DCS-MEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [

          [{text:'', style: 'tableHeader'}, {text:'Seite', style: 'tableHeader'}, {text:'#1', style: 'tableHeader'}, {text:'#2', style: 'tableHeader'}, {text:'#3', style: 'tableHeader'}, {text:'#4', style: 'tableHeader'}],
					['Masseter' , this.baselines.masseterSide , this.baselines.masseter1, this.baselines.masseter2, this.baselines.masseter3, this.baselines.masseter4,],
					['Orb oris' , this.baselines.orisSide , this.baselines.oris1, this.baselines.oris2, this.baselines.oris3, this.baselines.oris4,],
          ['Deltoideus' , this.baselines.deltoideusSide , this.baselines.deltoideus1, this.baselines.deltoideus2, this.baselines.deltoideus3, this.baselines.deltoideus4,],
          ['Biceps' , this.baselines.bicepsSide , this.baselines.biceps1, this.baselines.biceps2, this.baselines.biceps3, this.baselines.biceps4,],
          ['Extensor' , this.baselines.extensorSide , this.baselines.extensor1, this.baselines.extensor2, this.baselines.extensor3, this.baselines.extensor4,],
          ['Thenar' , this.baselines.thenarSide , this.baselines.thenar1, this.baselines.thenar2, this.baselines.thenar3, this.baselines.thenar4,],
          ['Tib ant' , this.baselines.tibSide , this.baselines.tib1, this.baselines.tib2, this.baselines.tib3, this.baselines.tib4,],
          ['Abd hall' , this.baselines.abdSide , this.baselines.abd1, this.baselines.abd2, this.baselines.abd3, this.baselines.abd4,],
          ['Thenar' , this.baselines.thenar2Side , this.baselines.thenar21, this.baselines.thenar22, this.baselines.thenar23, this.baselines.thenar24,],
          ['Tib ant' , this.baselines.tib2Side , this.baselines.tib21, this.baselines.tib22, this.baselines.tib23, this.baselines.tib24,],

      	
        ],
        
        
			},
        
		},

     { text: 'Baselines AEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'I', style: 'tableHeader'}, {text:'II', style: 'tableHeader'}, {text:'III', style: 'tableHeader'}, {text:'IV', style: 'tableHeader'}, {text:'V', style: 'tableHeader'}],
					['AEP L' , this.baselines.aepLI +'ms', this.baselines.aepLII +'ms', this.baselines.aepLIII +'ms', this.baselines.aepLIV +'ms', this.baselines.aepLV +'ms'],
          ['AEP R' , this.baselines.aepRI +'ms', this.baselines.aepRII +'ms', this.baselines.aepRIII +'ms', this.baselines.aepRIV +'ms', this.baselines.aepRV +'ms'],

        ],

			},
        
		},

     { text: 'Baselines VEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'Links', style: 'tableHeader'}, {text:'Rechts', style: 'tableHeader'}],
					['VEP' , this.baselines.vepL, this.baselines.vepR, ],
          

        ],

			},
        
		},

        { text: 'Baselines Reflexe', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'Reflex', style: 'tableHeader'}, {text:'Links', style: 'tableHeader'}, {text:'Rechts', style: 'tableHeader'}],
					['BR' , this.baselines.brL, this.baselines.brR, ],
          ['LAR' , this.baselines.larL, this.baselines.larR, ],
          ['BCR' , this.baselines.bcrL, this.baselines.bcrR, ],
          

        ],

			},
        
    },
    
    { text: 'Extras', style: 'subheader'},

    {

      table: {

        body: [

          [{text:'', style: 'tableHeader'}, {text:'Amplitude', style: 'tableHeader'}, {text:'Latenz', style: 'tableHeader'}],
          ['D-Wave:', this.extras.dWaveAmp + 'mA', this.extras.dWaveLat + 'ms'],
          [this.extras.additional1, this.extras.additional1Amp, this.extras.additional1Lat],
          [this.extras.additional2, this.extras.additional2Amp, this.extras.additional2Lat], 

        ],
      },
    },

    { text: 'Closing SSEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'N', style: 'tableHeader'}, {text:'P', style: 'tableHeader'}, {text:'Amplitude', style: 'tableHeader'}],
					['Medianus L', this.closing.ssepsMedianusLN, this.closing.ssepsMedianusLP, this.closing.ssepsMedianusLAmp + 'mA',],
          ['Medianus R', this.closing.ssepsMedianusRN, this.closing.ssepsMedianusRP, this.closing.ssepsMedianusRAmp + 'mA',],
          ['Tibialis L', this.closing.ssepsTibialisLN, this.closing.ssepsTibialisLP, this.closing.ssepsTibialisLAmp + 'mA',],
          ['Tibialis R', this.closing.ssepsTibialisRN, this.closing.ssepsTibialisRP, this.closing.ssepsTibialisRAmp + 'mA',],
      
				]
        
			},
        
		},

    { text: 'Closing TES-MEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'Ableitung', style: 'tableHeader'}, {text:'Seite', style: 'tableHeader'}, {text:'C1/C2', style: 'tableHeader'}, {text:'C3/C4', style: 'tableHeader'}, {text:'C3/Cz', style: 'tableHeader'}, {text:'C4/Cz', style: 'tableHeader'}],
					[this.closing.mepChannel1, this.closing.mepChannel1Side , this.closing.mepChannel1C1C2 + 'mA', this.closing.mepChannel1C3C4 + 'mA',this.closing.mepChannel1C3CZ +'mA',this.closing.mepChannel1C4CZ +'mA',],
      		[this.closing.mepChannel2, this.closing.mepChannel2Side , this.closing.mepChannel2C1C2 + 'mA', this.closing.mepChannel2C3C4 + 'mA',this.closing.mepChannel2C3CZ +'mA',this.closing.mepChannel2C4CZ +'mA',],
          [this.closing.mepChannel3, this.closing.mepChannel3Side , this.closing.mepChannel3C1C2 + 'mA', this.closing.mepChannel3C3C4 + 'mA',this.closing.mepChannel3C3CZ +'mA',this.closing.mepChannel3C4CZ +'mA',],
				  [this.closing.mepChannel4, this.closing.mepChannel4Side , this.closing.mepChannel4C1C2 + 'mA', this.closing.mepChannel4C3C4 + 'mA',this.closing.mepChannel4C3CZ +'mA',this.closing.mepChannel4C4CZ +'mA',],
          [this.closing.mepChannel5, this.closing.mepChannel5Side , this.closing.mepChannel5C1C2 + 'mA', this.closing.mepChannel5C3C4 + 'mA',this.closing.mepChannel5C3CZ +'mA',this.closing.mepChannel5C4CZ +'mA',],
          [this.closing.mepChannel6, this.closing.mepChannel6Side , this.closing.mepChannel6C1C2 + 'mA', this.closing.mepChannel6C3C4 + 'mA',this.closing.mepChannel6C3CZ +'mA',this.closing.mepChannel6C4CZ +'mA',],
          [this.closing.mepChannel7, this.closing.mepChannel7Side , this.closing.mepChannel7C1C2 + 'mA', this.closing.mepChannel7C3C4 + 'mA',this.closing.mepChannel7C3CZ +'mA',this.closing.mepChannel7C4CZ +'mA',],
          [this.closing.mepChannel8, this.closing.mepChannel8Side , this.closing.mepChannel8C1C2 + 'mA', this.closing.mepChannel8C3C4 + 'mA',this.closing.mepChannel8C3CZ +'mA',this.closing.mepChannel8C4CZ +'mA',],
      		[this.closing.mepChannel9, this.closing.mepChannel9Side , this.closing.mepChannel9C1C2 + 'mA', this.closing.mepChannel9C3C4 + 'mA',this.closing.mepChannel9C3CZ +'mA',this.closing.mepChannel9C4CZ +'mA',],
      		[this.closing.mepChannel10, this.closing.mepChannel10Side , this.closing.mepChannel10C1C2 + 'mA', this.closing.mepChannel10C3C4 + 'mA',this.closing.mepChannel10C3CZ +'mA',this.closing.mepChannel10C4CZ +'mA',],
      		[this.closing.mepChannel11, this.closing.mepChannel11Side , this.closing.mepChannel11C1C2 + 'mA', this.closing.mepChannel11C3C4 + 'mA',this.closing.mepChannel11C3CZ +'mA',this.closing.mepChannel11C4CZ +'mA',],
      		[this.closing.mepChannel12, this.closing.mepChannel12Side , this.closing.mepChannel12C1C2 + 'mA', this.closing.mepChannel12C3C4 + 'mA',this.closing.mepChannel12C3CZ +'mA',this.closing.mepChannel12C4CZ +'mA',],
      		[this.closing.mepChannel13, this.closing.mepChannel13Side , this.closing.mepChannel13C1C2 + 'mA', this.closing.mepChannel13C3C4 + 'mA',this.closing.mepChannel13C3CZ +'mA',this.closing.mepChannel13C4CZ +'mA',],      
       		[this.closing.mepChannel14, this.closing.mepChannel14Side , this.closing.mepChannel14C1C2 + 'mA', this.closing.mepChannel14C3C4 + 'mA',this.closing.mepChannel14C3CZ +'mA',this.closing.mepChannel14C4CZ +'mA',],      
      		[this.closing.mepChannel15, this.closing.mepChannel15Side , this.closing.mepChannel15C1C2 + 'mA', this.closing.mepChannel15C3C4 + 'mA',this.closing.mepChannel15C3CZ +'mA',this.closing.mepChannel15C4CZ +'mA',],       
      		[this.closing.mepChannel16, this.closing.mepChannel16Side , this.closing.mepChannel16C1C2 + 'mA', this.closing.mepChannel16C3C4 + 'mA',this.closing.mepChannel16C3CZ +'mA',this.closing.mepChannel16C4CZ +'mA',],
        ]
        
			},
        
		},


     { text: 'Closing DCS-MEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [

          [{text:'', style: 'tableHeader'}, {text:'Seite', style: 'tableHeader'}, {text:'#1', style: 'tableHeader'}, {text:'#2', style: 'tableHeader'}, {text:'#3', style: 'tableHeader'}, {text:'#4', style: 'tableHeader'}],
					['Masseter' , this.closing.masseterSide , this.closing.masseter1, this.closing.masseter2, this.closing.masseter3, this.closing.masseter4,],
					['Orb oris' , this.closing.orisSide , this.closing.oris1, this.closing.oris2, this.closing.oris3, this.closing.oris4,],
          ['Deltoideus' , this.closing.deltoideusSide , this.closing.deltoideus1, this.closing.deltoideus2, this.closing.deltoideus3, this.closing.deltoideus4,],
          ['Biceps' , this.closing.bicepsSide , this.closing.biceps1, this.closing.biceps2, this.closing.biceps3, this.closing.biceps4,],
          ['Extensor' , this.closing.extensorSide , this.closing.extensor1, this.closing.extensor2, this.closing.extensor3, this.closing.extensor4,],
          ['Thenar' , this.closing.thenarSide , this.closing.thenar1, this.closing.thenar2, this.closing.thenar3, this.closing.thenar4,],
          ['Tib ant' , this.closing.tibSide , this.closing.tib1, this.closing.tib2, this.closing.tib3, this.closing.tib4,],
          ['Abd hall' , this.closing.abdSide , this.closing.abd1, this.closing.abd2, this.closing.abd3, this.closing.abd4,],
          ['Thenar' , this.closing.thenar2Side , this.closing.thenar21, this.closing.thenar22, this.closing.thenar23, this.closing.thenar24,],
          ['Tib ant' , this.closing.tib2Side , this.closing.tib21, this.closing.tib22, this.closing.tib23, this.closing.tib24,],

      	
        ],
        
        
			},
        
		},

     { text: 'Closing AEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'I', style: 'tableHeader'}, {text:'II', style: 'tableHeader'}, {text:'III', style: 'tableHeader'}, {text:'IV', style: 'tableHeader'}, {text:'V', style: 'tableHeader'}],
					['AEP L' , this.closing.aepLI +'ms', this.closing.aepLII +'ms', this.closing.aepLIII +'ms', this.closing.aepLIV +'ms', this.closing.aepLV +'ms'],
          ['AEP R' , this.closing.aepRI +'ms', this.closing.aepRII +'ms', this.closing.aepRIII +'ms', this.closing.aepRIV +'ms', this.closing.aepRV +'ms'],

        ],

			},
        
		},

     { text: 'Closing VEPs', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'', style: 'tableHeader'}, {text:'Links', style: 'tableHeader'}, {text:'Rechts', style: 'tableHeader'}],
					['VEP' , this.closing.vepL, this.closing.vepR, ],
          

        ],

			},
        
		},

        { text: 'Closing: Reflexe', style: 'subheader' },
     
      	{
     
			table: {
			
				body: [
        
          [{text:'Reflex', style: 'tableHeader'}, {text:'Links', style: 'tableHeader'}, {text:'Rechts', style: 'tableHeader'}],
					['BR' , this.closing.brL, this.closing.brR, ],
          ['LAR' , this.closing.larL, this.closing.larR, ],
          ['BCR' , this.closing.bcrL, this.closing.bcrR, ],
          

        ],

			},
        
    }, 

   

  	],
    styles: 
    {
    	header: 
      {
				fontSize: 18,
				bold: true,
        margin: [0, 10, 0, 0],
        alignment: 'center',
        color: '#3F51B5'
			},
      	subheader: 
      {
				fontSize: 14,
        bold: true,
        margin: [0, 15, 0, 0],
        
			},
      	plaintext: 
      {
				fontSize: 12,
				bold: false,
        
			},

    	tableHeader: 
      {
      	fillColor: '#3F51B5',
    		color: 'white'
        
      },

      value: {
        color: '#3F51B5'
      },


    }
  };
  
  pdfmake.createPdf(documentDefinition).download('IOM-Fall Nr. ' + this.casenr +'.pdf');
}






 
 
  },
};
</script>


