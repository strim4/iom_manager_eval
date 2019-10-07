<template>

    <v-form v-model="valid" ref="form" lazy-validation>
    
    <h1>Neuer Fall</h1>
    <label>Angaben zum Patienten</label>
        <v-text-field label="Fall Nr." v-model="casenr" :rules="requiredRules" required></v-text-field>
        <v-text-field label="PID" v-model="pid" :rules="requiredRules" required></v-text-field>
         <v-text-field label="FID" v-model="fid" :rules="requiredRules" required></v-text-field>
         <v-text-field label="Name" v-model="name" :rules="requiredRules" required></v-text-field>
         <v-text-field label="Vorname" v-model="surname" :rules="requiredRules" required></v-text-field>
         <v-text-field label="Geburtsdatum" prepend-icon="event"    v-model="birthdate"  :rules="requiredRules" required></v-text-field>
       
         </br>

         <label>Angaben zur Operation</label>
         <v-select label="Diagnose" v-model="diagnose" :items="diagnoses"></v-select>
         <v-select label="Operation" v-model="operation" :items="operations"></v-select>
         <v-select label="ISIS-Gerät" v-model="isismodality" :items="isismodalities"></v-select>
        <v-text-field label="OP-Datum" prepend-icon="event" v-model="opdate"></v-text-field>
        <v-select label="Operateur" v-model="surgeon" :items="surgeons"></v-select>
         <v-select label="Assistent" v-model="assistant" :items="assistants"></v-select>
        <v-btn @click="submit" :disabled="!valid">
            submit
        </v-btn>
        <v-btn @click="clear">clear</v-btn>
    </v-form>
   
</template>


<script>
export default {
    data: () => ({
        valid: true,
        casenr: '',
        pid: '',
        fid: '',
        name: '',
        surname: '',
        birthdate: null,
        diagnose: '',
        operation:'',
        isismodality: '',
        opdate: '',
        surgeon: '',
        assistant: '',


        requiredRules: [
            v => !!v || 'Bitte befüllen Sie alle Pflichtfelder',
        ],
        select: null,
         diagnoses: [
            'AKN R',
            'AKN L',
            'Gliom',
            'Glioblastom',
            'ICA Aneurysma',
            'LGG',
            'Meningeom',
            'Oligodendrogliom',
            'Raumforderung',
            'SIH',
        ],
         operations: [
            'CEA',
            'Hemilaminektomie',
            'Kraniotomie',
            'Kraniotomie & Clipping',
            'Kraniotomie & Exstirpation',
            'Laminektomie',
           
        ],
           isismodalities: [
            'Einstein',
            'Mietze',
            'Napoleon',
            'Rosalinde',
                     
        ],
        surgeons: [
            'Abu-Isa Janine',
            'Bervini David',
            'Fichter Jens',
            'Krähenbühl Katharina',
            'Murek Michael',
            'Lutz Katharina',
            'Pollo Claudio',
            'Raabe Andreas',
        ],
         assistants: [
            'Consuegra Alberto',
            'Fard Ayda',
            'Finkenstädt Sina',
            'Goldberg Johannes',
            'Gondar Renato',
            'Hängi Levin Ayda',          
        ],
    }),
  
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                // Perform next action
            }
        },
        clear() {
            this.$refs.form.reset();
        },
    },
};
</script>
