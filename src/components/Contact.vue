<template>
 <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            src="https://vki.at/sites/vki.at/files/styles/slider/public/media/images/kontakt_shutterstock_148294223_niroworld_1060px_0.jpg?itok=Ho04Tl5V"
            aspect-ratio="2.75"
          ></v-img>
  
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kontakt</h3>
              <div> {{ contactText }} </div>
            </div>
          </v-card-title>
  
          <v-card-actions>
            <v-btn flat color="lime">Aktion1</v-btn>
            <v-btn flat color="lime">Aktion2</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      
    </v-layout>
</template>


<script>

export default {
  
  data() {
    return {

        contactText: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.',
    
    }
  },
};

</script>
