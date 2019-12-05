<template>


    <v-form v-model="valid" ref="form" lazy-validation>
        </br> </br>
        <h1>IOM-Manager - Login:</h1>
        </br>
        <v-row   align="center" justify="center">
         <v-img
        src="./../static/logo.png"
        position='center center'
        max-width="160"
        max-height="160"
      ></v-img>
      </v-row>
       
   
        <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>

        
        <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            
              :type="show1 ? 'text' : 'password'"
              
             label="Passwort" 
              
              counter
              @click:append="show1 = !show1"
              required
            ></v-text-field>

        <v-btn @click="submit" :disabled="!valid" color="success"> Anmelden</v-btn>

        <v-btn @click="clear">Zurücksetzen</v-btn>
        </br> </br> </br>
        <h3>Noch nicht registriert?</h3>
        <router-link v-bind:to="{ name: 'Register' }" >
        <v-btn  color="primary"> Registrieren</v-btn>
        </router-link>
    
    
    
    </v-form>
</template>

<script>
import axios from 'axios';
export default {
    data: () => ({
        valid: true,
        show1: false,
        email: '',
        password: '',
        emailRules: [
            v => !!v || 'Bitte geben Sie eine E-Mailadresse ein',
            v => /\S+@\S+\.\S+/.test(v) || 'E-mailadresse ist ungültig',
        ],
    }),
    methods: {
        async submit() {
            return axios({
                    method: 'post',
                    data: {
                        email: this.email,
                        password: this.password,
                    },
                    url: 'http://localhost:8081/users/login',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    window.localStorage.setItem('auth', response.data.token);
                    this.$swal('Angemeldet!', 'Sie haben sich erfolgreich angemeldet!', 'success');
                    this.$router.push({ name: 'Home' });
                })
                .catch((error) => {
                    const message = error.response.data.message;
                    this.$swal('Fehlgeschlagen!', `${message}`, 'error');
                    this.$router.push({ name: 'Login' });
                });
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>