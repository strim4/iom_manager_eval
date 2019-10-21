<!-- This file contains the structure for the add device site-->
<template slot="items" slot-scope="props">
    <v-container>
        <v-col>
            <!-- Form to add a new device -->
            <v-form v-model="valid" ref="form" lazy-validation>
                <label>Neue IOM-Geräte hinzufügen</label>
                <v-text-field label="IOM-Gerät" :rules="rules" v-model="device" required></v-text-field>
                <v-btn @click="submit" color="success" :disabled="!valid">
                    Hinzufügen
                </v-btn>
                <v-btn @click="clear">Zurücksetzten</v-btn>
            </v-form>
        </v-col>
        </br>
        </br>

    <!-- Datatable with the stored devices -->


        <v-card>
                <v-card-title>
                    Erfasste IOM-Geräte
                    <div class="flex-grow-1"></div>
                    <v-text-field v-model="search" append-icon="search" label="Suche" single-line hide-details></v-text-field>
                </v-card-title>
      <v-data-table
      v-model="selected"
      :headers="headers"
      :items="devices"
      item-key="name"
      :search="search"
      class="elevation-1"

    >

      <template v-slot:item.action="{ item }">
            <v-icon

          @click="deleteIOM-Gerät(item._id, item)"
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
    device: '',
    selected: [],
    rules: [
      v => !!v || 'Bitte geben Sie eine IOM-Gerät ein',
    ],
    fixed: true,
    devices: [],
    search: '',
    headers: [{
      text: 'IOM-Gerät',
      align: 'left',
      value: 'device',
    },
    { text: 'Löschen', value: 'action', sortable: false },

    ],


  }),
  // fetch all devices on pageload
  mounted() {
    this.fetchDevices();
  },
  methods: {
    // submit method to send the new device to the backend

    submit() {
      if (this.$refs.form.validate()) {
        return axios({
          method: 'post',
          data: {
            device: this.device,
          },
          url: 'http://localhost:8081/devices',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(() => {
            this.$swal(
              'Erfolgreich!',
              'Das IOM-Gerät wurde gespeichert!',
              'success',
            );
            this.fetchDevices();

            this.$refs.form.reset();
          })
          .catch(() => {
            this.$swal(
              'Fehlgeschlagen!',
              'Das IOM-Gerät konnte nicht gespeichert werden!',
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
    // fetches all devices from the database
    async fetchDevices() {
      return axios({
        method: 'get',
        data: {
          device: this.device,
        },
        url: 'http://localhost:8081/devices',
      })
        .then((response) => {
          this.devices = response.data.devices;
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
