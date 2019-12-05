<template>
    <v-form v-model="valid" ref="form" lazy-validation>
        </br> </br>
        <h1>IOM-Manager - Registrierung:</h1>
         </br>
        <v-row   align="center" justify="center">
         <v-img
        src="./../static/logo.png"
        position='center center'
        max-width="160"
        max-height="160"
      ></v-img>
      </v-row>

        <v-text-field label="Name" v-model="name" required></v-text-field>

        <v-text-field label="E-mail" v-model="email" :rules="emailRules" required></v-text-field>

        <v-text-field label="Passwort" v-model="password" required></v-text-field>

        <v-text-field name="input-7-1" label="Passwort bestätigen" v-model="confirm_password"></v-text-field>

        <v-btn @click="submit" :disabled="!valid" color="success">

            Registrieren

        </v-btn>

        <v-btn @click="clear">Zurücksetzten</v-btn>

    </v-form>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        valid: true,
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        emailRules: [
            v => !!v || 'Bitte geben Sie eine E-Mailadresse ein',
            v => /\S+@\S+\.\S+/.test(v) || 'Die E-Mailadresse ist ungültig',
        ],
    }),
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                return axios({
                        method: 'post',
                        data: {
                            name: this.name,
                            email: this.email,
                            password: this.password,
                        },
                        url: 'http://localhost:8081/users/register',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(() => {
                        this.$swal(
                            'Erflogreich!',
                            'Sie haben sich erflogreich registriert!',
                            'success',
                        );
                        this.$router.push({ name: 'Login' });
                    })
                    .catch((error) => {
                        const message = error.response.data.message;
                        this.$swal('Fehlgeschlagen!', `${message}`, 'error');
                    });
            }
            return true;
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>