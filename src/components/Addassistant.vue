<!-- This file contains the structure for the add assistant site-->
<template slot="items" slot-scope="props">
    <v-container>
        <v-col>
            <!-- Form to add a new assistant -->
            <v-form v-model="valid" ref="form" lazy-validation>
                <label>Neuen Assistenten hinzufügen</label>
                <v-text-field label="Assistent" :rules="rules" v-model="assistant" required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>

    <!-- Datatable with the stored assistants -->


        <v-card>
                <v-card-title>
                    Erfasste Assistenten
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="assistants"
      item-key="name"
      :search="search"
      class="elevation-1"

    >

      <template v-slot:item.action="{ item }">
            <v-icon

          @click="deleteAssistant(item._id, item)"
        >
          delete
        </v-icon>

      </template>

    </v-data-table>

      </v-card>


    </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    valid: true,
    assistant: '',
    selected: [],
    rules: [
      v => !!v || 'Bitte geben Sie eine Assistent ein',
    ],
    fixed: true,
    assistants: [],
    search: '',
    headers: [{
      text: 'Assistent',
      align: 'left',
      value: 'assistant',
    },
    { text: 'Löschen', value: 'action', sortable: false },

    ],


  }),
  // fetch all assistants on pageload
  mounted() {
    this.fetchAssistants();
  },
  methods: {
    // submit method to send the new assistant to the backend

    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            assistant: this.assistant,
          },
          url: 'http://localhost:8081/assistants',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Der Assistent wurde gespeichert!',
              'success',
            );
            this.fetchAssistants();

            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehlgeschlagen!',
              'Der Assistent konnte nicht gespeichert werden!',
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
    // fetches all assistants from the database
    async fetchAssistants() {
      return axios({
        method: 'get',
        data: {
          assistant: this.assistant,
        },
        url: 'http://localhost:8081/assistants',
      })
        .then((response) => {
          this.assistants = response.data.assistants;
        })
        .catch(() => {});
    },
    // delete a assistant from the database
    async  deleteAssistant(id, item) {
      console.log(id);
      return axios({
        method: 'delete',
        data: {
          id,
        },
        url: `http://localhost:8081/assistants/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          const index = this.assistants.indexOf(item);
          this.assistants.splice(index, 1);
        })
        .catch(() => {});
    },

  },
};

</script>
