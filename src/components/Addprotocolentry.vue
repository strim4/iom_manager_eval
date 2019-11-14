<!-- This file contains the structure for the add protocolentries site-->
<template slot="items" slot-scope="props">
    <v-container>
        <v-col>
            <!-- Form to add a new device -->
            <v-form v-model="valid" ref="form" lazy-validation>
                <label>Neue Protokolleinträge hinzufügen</label>
                <v-select label="Event" v-model="event" :items="selectoptions" item-text="names" ></v-select>
                <v-text-field label="Event" :rules="rules" v-model="option" required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>

    <!-- Datatable with the stored protocolentries -->

     


        <v-card>
                <v-card-title>
                    Erfasste Operationen
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="IomCategories"
     
      :search="search"
      class="elevation-1"

    >

    

      <template v-slot:item.action="{ item }">
            <v-icon

          @click="deleteOperation(item._id, item)"
        >
          delete
        </v-icon>

      </template>

    </v-data-table>

      </v-card>
      </br></br>
<v-btn @click="sortCategories">Testbutton</v-btn>
</br> </br> </br> </br> 
 <v-layout row>
        <v-flex md3><b><p>Kategorie</p></b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md3><b>Event</b></v-flex>
        <v-flex md1></v-flex>
        <v-flex md1><b>Löschen</b></v-flex>
      </v-layout >  </br> 
      <div v-for="(category, index) in categories" >

<div v-for="(option, index) in category.options" >

 <v-layout row>
  <v-flex md3>{{category.name}}</v-flex>
        <v-flex md1></v-flex>
        <v-flex md3>{{option}}</v-flex>
        <v-flex md1></v-flex>
        <v-flex md1><b> <v-icon @click="removeEntry(index)">
          delete
        </v-icon></b></v-flex>
          </v-layout > 
</div>
      </div>
</br></br>
    



    </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({

    event: '',
    option:'',

  IomCategories:[],

    valid: true,
  
    selectoptions: ['IOM', 'Anästhesie', 'OP-Verlauf', 'Weitere'],
    selected: [],
    categories: [],
   
  
    rules: [
      v => !!v || 'Bitte geben Sie eine IOM-Gerät ein',
    ],
    fixed: true,
 
    search: '',
   operations: [],
    search: '',
    headers: [{
      text: 'Event',
      align: 'left',
      value: 'options',
    },
    { text: 'Löschen', value: 'action', sortable: false },

    ],


  }),
computed: {

},


  // fetch all devices on pageload
  mounted() {
   this.fetchCategories();
  
 

  },
  methods: {

    sortCategories: function(){
      let iomCat = [];
      iomCat = this.categories.filter(cat => cat.name == 'IOM');
      console.log(iomCat);
     let result = iomCat.map(({ options }) => options)
      console.log(result);
  this.IomCategories = iomCat;

    },
  
    // submit method to send the new entry oder update a entry to/in the backend



      submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'put',
          data: {
            name: this.event,
            options: this.option,
          },
          url: 'http://localhost:8081/categories',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Eintrag wurde gespeichert!',
              'success',
            );
           // this.fetchDevices();

            this.$refs.form.reset();
          
          })
          .catch(() => {
            this.$swal(
              'Fehlgeschlagen!',
              'Der Eintrag konnte nicht gespeichert werden!',
              'error',
            );
          });
      }
      return true;
    },
    // Reset function
    clear() {
      this.$refs.form.reset();
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
          this.categories = response.data.categories;
          console.log(this.categories);
          
        
        })
        .catch(() => {});
    },
    // delete a device from the database
    async  deleteDevice(id, item) {
      console.log(id);
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `http://localhost:8081/devices/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.devices.indexOf(item);
          this.devices.splice(index, 1);
        })
        .catch(() => {});
    },



  },

};



</script>
