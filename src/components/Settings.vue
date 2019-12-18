<!-- This file  contains the structure for the setting page -->
<template>
<!-- Navigation to the different subpages -->
<v-container grid-list-md text-xs-center>
        <template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
  </div>
</template>
      <v-layout row wrap>
        <v-flex  xs6>
            <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Diagnosen</v-list-item-title>
          
        </v-list-item-content>
  
       <v-list-item-avatar color="indigo" size="62">
        <v-icon dark>mdi-apps</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
         <router-link :to="{ name: 'Adddiagnose' }">
          <v-btn color="indigo accent-4" text>Hinzufügen / Bearbeiten</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
        </v-flex>

         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Operationen</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="indigo" size="62">
        <v-icon dark>mdi-silverware</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
        
          <router-link :to="{ name: 'Addoperation' }">
         <v-btn color="indigo accent-4" text>Hinzufügen / Bearbeiten</v-btn>
        </router-link>
        
      </v-card-actions>
    </v-card>
        </v-flex>
        
         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">ISIS-Geräte</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="indigo" size="62">
        <v-icon dark>mdi-desktop-mac</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
         <router-link :to="{ name: 'Adddevice' }">
         <v-btn color="indigo accent-4" text>Hinzufügen / Bearbeiten</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
        </v-flex>
        
         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Operateure</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="indigo" size="62">
        <v-icon dark>mdi-account-outline</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
          <router-link :to="{ name: 'Addsurgeon' }">
         <v-btn color="indigo accent-4" text>Hinzufügen / Bearbeiten</v-btn>
        </router-link>
        
        
      </v-card-actions>
    </v-card>
        </v-flex>

         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          
          <v-list-item-title class="headline mb-1">Assistenten</v-list-item-title>
          
        </v-list-item-content>
  
      <v-list-item-avatar color="indigo" size="62">
        <v-icon dark>mdi-account</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
          <router-link :to="{ name: 'Addassistant' }">
         <v-btn color="indigo accent-4" text>Hinzufügen / Bearbeiten</v-btn>
        </router-link>
        
        
      </v-card-actions>
    </v-card>
        </v-flex>

         <v-flex  xs6>
         <v-card
      class="mx-auto"
      max-width="450"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">Protokolleinträge</v-list-item-title>   
        </v-list-item-content>
        <v-list-item-avatar color="indigo" size="62">
        <v-icon dark>mdi-file-document</v-icon>
      </v-list-item-avatar>
      </v-list-item>
  
      <v-card-actions>
          <router-link :to="{ name: 'Addprotocolentry' }">
         <v-btn color="indigo accent-4" text>Hinzufügen / Bearbeiten</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
        </v-flex>    
      </v-layout>
    </v-container>

</template>

<script>
export default {
  name: 'Settings',
  //initialize variables
  data() {
    return {
      breadcrumbs: [
        {
          text: 'Dashboard',
          disabled: false,
          href: 'home',
        },
        {
          text: 'Einstellungen',
          disabled: true,
          href: 'settings',
        },
      ],
    }
  }
}
</script>
