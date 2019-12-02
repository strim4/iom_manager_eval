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
       <v-btn   class="my-n3" width="180px" color="primary"  @click="dialogExtras = true" >Extras</v-btn>
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
                    <v-flex md2> <v-btn    color="primary"  @click="createPDF">PDF genereiren</v-btn></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2> <v-btn    color="primary"  @click="dialogUpload = true">EDF hinzufügen</v-btn></v-flex>
                    <v-flex md0.5></v-flex>
                    <v-flex md2.5><v-btn    color="primary"  @click="dialogInterpret = true">Interpretation hinzufügen</v-btn></v-flex>
                    
                    <v-flex md3><b><v-btn    color="success"  @click="submit()">Fall abschliessen</v-btn></b></v-flex>
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
              <v-container > 
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusLN" :disabled="true" class="my-n5" label="N:" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusLP" class="my-n5" label="P:" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusLAmp" class="my-n5" label="Amplitude:" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Medianus R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusRN" class="my-n5" label="N:" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsMedianusRP" class="my-n5" label="P:" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsMedianusRAmp" class="my-n5" label="Amplitude:" suffix="mA" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis L</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisLN" class="my-n5" label="N:" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisLP" class="my-n5" label="P:" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisLAmp" class="my-n5" label="Amplitude:" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tibialis R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisRN" class="my-n5" label="N:" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.ssepsTibialisRP" class="my-n5" label="P:" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.ssepsTibialisRAmp" class="my-n5" label="Amplitude:" suffix="mA" :disabled="true"  ></v-text-field>
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
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel1" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 1"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel1Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel1C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              
               <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel2" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 2"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel2C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
               </v-row> 

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel3" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 3"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel3Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel3C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel4" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 4"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel4Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel4C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel5" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 5"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel5Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel5C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel6" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 6"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel6Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel6C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel7" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 7"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel7Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel7C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel8" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 8"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel8Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel8C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel9" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 9"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel9Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel9C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

               <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel10" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 10"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel10Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel10C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel11" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 11"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel11Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel11C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel12" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 12"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel12Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel12C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel13" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 13"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel13Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel13C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel14" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 14"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel14Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel14C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel15" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 15"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel15Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel15C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel16" class="my-n5" :disabled="true" 
                    :items="muscles"
                    label="Kanal 16"
                  ></v-select>
                 </v-col>
                  <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.mepChannel16Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C1C2" class="my-n5" label="C1/C2" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C3C4" class="my-n5" label="C3/C4" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C3CZ" class="my-n5" label="C3/Cz" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                   <v-text-field  v-model="baselines.mepChannel16C4CZ" class="my-n5" label="C4/Cz" suffix="mA" :disabled="true" ></v-text-field>
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
                  <v-subheader class="my-n5" >Masseter</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.masseterSide" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter1" class="my-n5" label="#1" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter2"  class="my-n5" label="#2" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter3"  class="my-n5" label="#3" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.masseter4"  class="my-n5" label="#4"  :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Orb oris</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.orisSide" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris1" class="my-n5" label="#1" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris2" class="my-n5" label="#2"  :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris3" class="my-n5" label="#3" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.oris4" class="my-n5" label="#4" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Deltoideus</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.deltoideusSide" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus1" class="my-n5" label="#1" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus2" class="my-n5" label="#2" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus3" class="my-n5" label="#3" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.deltoideus4" class="my-n5" label="#4" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Biceps</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.bicepsSide" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps1" class="my-n5" label="#1" :disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps2" class="my-n5" label="#2" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps3" class="my-n5" label="#3" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.biceps4" class="my-n5" label="#4" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Extensor</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.extensorSide" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor1" class="my-n5" label="#1" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor2" class="my-n5" label="#2" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor3" class="my-n5" label="#3" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.extensor4" class="my-n5" label="#4" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.thenarSide" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar1" class="my-n5" label="#1" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field  v-model="baselines.thenar2" class="my-n5" label="#2" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar3" class="my-n5" label="#3" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar4" class="my-n5" label="#4" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.tibSide" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib1" class="my-n5" label="#1" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib2" class="my-n5" label="#2" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib3" class="my-n5" label="#3" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib4" class="my-n5" label="#4" :disabled="true"  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col ols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >Abd hall</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.abdSide" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd1" class="my-n5" label="#1" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd2" class="my-n5" label="#2":disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd3" class="my-n5" label="#3":disabled="true"  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.abd4" class="my-n5" label="#4" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader  class="my-n5" >Thenar</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.thenar2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar21" class="my-n5" label="#1" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar22" class="my-n5" label="#2" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar23" class="my-n5" label="#3" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.thenar24" class="my-n5" label="#4" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2" >
                  <v-subheader  class="my-n5" >Tib ant</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-select v-model="baselines.tib2Side" class="my-n5" :disabled="true" 
                    :items="sides"
                    label="Seite"
                  ></v-select>
                 </v-col>
                 </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib21" class="my-n5" label="#1" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib22" class="my-n5" label="#2" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib23" class="my-n5" label="#3" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field v-model="baselines.tib24" class="my-n5" label="#4" :disabled="true" ></v-text-field>
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
                  <v-text-field v-model="baselines.aepLI" class="my-n5"  label="I" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLII" class="my-n5"  label="II" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLIII" class="my-n5"  label="III" suffix="ms":disabled="true"  ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepLIV" class="my-n5"  label="IV" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field  v-model="baselines.aepLV" class="my-n5" label="V" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="2">
                  <v-subheader class="my-n5" >AEP R</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRI" class="my-n5"  label="I" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRII" class="my-n5"  label="II" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRIII" class="my-n5"  label="III" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRIV" class="my-n5"  label="IV" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
                  <v-col cols="12" sm="6" md="1">
                  <v-text-field v-model="baselines.aepRV" class="my-n5"  label="V" suffix="ms" :disabled="true" ></v-text-field>
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
                  <v-textarea  v-model="interp" :outlined="true" :auto-grow="true" ></v-textarea>
              </v-row>
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="dialogInterpret= false">Speichern</v-btn>
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
                  <v-subheader class="my-n5" >D-Welle:</v-subheader>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.dWaveAmp" class="my-n5" label="Amplitude" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.dWaveLat" class="my-n5" label="Latenz" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1" class="my-n5" label="Weitere" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1Amp" class="my-n5" label="Amplitude" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional1Lat" class="my-n5" label="Latenz" suffix="ms" :disabled="true" ></v-text-field>
                </v-col>
              </v-row>
               <v-row>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2" class="my-n5" label="Weitere" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2Amp" class="my-n5" label="Amplitude" suffix="mA" :disabled="true" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field v-model="extras.additional2Lat" class="my-n5" label="Latenz" suffix="ms" :disabled="true" ></v-text-field>
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
            <v-btn  depressed  large color="success" @click="dialogInterpret = false">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogInterpret = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <!-- dialog for fileupload -->
         <v-dialog v-model="dialogUpload" persistent max-width="600px">
        
        <v-card>
          <v-card-title>
            <span class="headline">EDF-Datei hochladen:</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                  <v-file-input v-model="file" show-size label="Datei auswählen" ></v-file-input>
              </v-row>
              <v-row>
               
       <v-btn color="indigo accent-4" text @click="openFile()"> Anzeigen / Herunterladen</v-btn>
       
              </v-row>
              
            </v-container>
           
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  depressed  large color="success" @click="saveFile()">Speichern</v-btn>
            <v-btn  depressed  large color="normal"  @click="dialogUpload = false">Abbrechen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
</v-container>


</v-layout>
</template>



<script>
import axios from 'axios';
//import pdfmake from 'pdfmake';
import moment from 'moment';

import pdfmake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;






export default {
  
  data: () => ({



dialogEval: false,
dialogInterpret: false,
dialogUpload: false,
dialogBaselines: false,
dialogExtras: false,

file: null,

    
    
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

  timestamps: [],

study: '',



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
           this.baselines = response.data.protocols.baselines;
          this.extras = response.data.protocols.extras;
          console.log(response.data.protocols);
         
         
        })
        .catch(() => { console.log('error'); });
    },



  // submit method to send the new protocol to the db and delete the case from opencase db
    submit() {
      
    

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
            baselines: this.baselines,
            extras: this.extras,
            interp: this.interp,
            file: this.file.name,
          },
          url: 'http://localhost:8081/completcase',
          headers: {
            'Content-Type': 'application/json',
          },
          
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Das Fall wurde erfolgreich abgeschlossen!',
              'success',
            );
      
            this.$router.push({ name: 'Casesearch' });
            
          })
          .catch(() => {
            this.$swal(
              'Fehler!',
              'Der Fall konnte nicht abgesclossen werden!',
              'error',
            );
          }); 
     
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



// method to save file to server
saveFile: function(){
this.dialogUpload = false;
console.log(this.file);
this.submitFile();


},

//Upload file to server
submitFile(){
  let formData = new FormData();
  formData.append('file', this.file);

  axios.post( 'http://localhost:8081/upload',
  formData,
  {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
  }
).then(resp =>{
  
  console.log('SUCCESS!!');
})
.catch(function(){
  console.log('FAILURE!!');
});

},




//generate PDF Export
createPDF() {



  
	let documentDefinition = {
  	content: 
    [
        { text: moment(new Date()).format('DD-MM-YYYY'), alignment: 'right' },
       { text: 'IM Protokoll Fall Nr. ' + this.casenr, style: 'header' },

        { text: 'Angaben zu Patient / Operation', style: 'subheader' },
      { text: '', style: 'subheader' },

       
      {  
        table: 
        {
            headerRows: 0,                            
            body: 
            [   
              ["Vorname" ,  "Name", "Diagnose", "Opeartion", 'OP-Datum']   , 
              [this.surname, this.name, this.diagnose, this.operation, this.opdate ],                
              
            ]
        }
    }, 
       
       { text: 'Protokolleinträge', style: 'subheader' },
      { text: '', style: 'subheader' },
    
      
     
       
      
      
      
    
  	],
    styles: 
    {
    	header: 
      {
				fontSize: 18,
				bold: true,
        margin: [0, 10, 0, 10],
        alignment: 'center'
			},
    	tableHeader: 
      {
      	fillColor: '#4CAF50',
    		color: 'white'
      }
    }
  };
  
  pdfmake.createPdf(documentDefinition).download('IOM-Fall Nr. ' + this.casenr +'.pdf');
}






 
 
  },
};
</script>


