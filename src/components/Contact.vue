<template>
 <v-layout>
      <v-flex fluid>
        <v-row>
          <v-col cols="12" md="6">
            <v-card>
              <v-img
                src="https://vki.at/sites/vki.at/files/styles/slider/public/media/images/kontakt_shutterstock_148294223_niroworld_1060px_0.jpg?itok=Ho04Tl5V"
                aspect-ratio="2.75"
              ></v-img>
  
               <v-card-title primary-title>
                 <div>
                   <h3 class="headline mb-0">Kontakt</h3>
                   <div> {{ contactText }} </div>
                   <div> {{ contactPerson }} </div>
                   <a href="mailto:chantal.zbinden@insel.ch">E-Mail senden</a>
                  </div>
                  
                </v-card-title>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline">Über IOM-Manager</h3>
                    <div> {{ aboutText }}</div>
                  </div>
                </v-card-title>
                </v-card>
           </v-col>
          </v-row>
      </v-flex>

      
    </v-layout>
</template>


<script>

export default {
  
  data() {
    return {

        contactText: 'Bei Fragen wenden Sie sich bitte an die folgende Kontaktperson: ',
        contactPerson: 'Chantal Zbinden, Inselspital Bern',
        aboutText: 'Der IOM-Manager wurde von der Berner Fachhochschule in Zusammenarbeit mit dem Inselspital als Studentenprojekt für die Anwender des intraoperativen Neuromonitorings entwickelt. Es bietet die Funktionen für die intraoperative Protokollierung, in Zusammenarbeit mit dem Klinikserver wird die Datenarchivierung angeboten und es besteht die Möglichkeit Auswertungsskripts für die Datenanalyse hochzuladen. Bei der vorliegenden Version handelt es sich um einen Prototyp. Dies bedeutet es gibt für dieses System keinen laufenden Support, für Anmerkungen sind die Entwickler jedoch immer offen.',
    }
  },
};

</script>
