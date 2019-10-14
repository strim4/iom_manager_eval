<!-- This file  contains the structure for the setting page -->
<template>
<!-- TNavigation to the different subpages -->
 <v-list   >
               <h3>Neue Einträge hinzufügen:</h3>
                 
                 <router-link v-bind:to="{ name: 'Adddiagnose' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>control_point</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Diagnosen hinzufügen / bearbeiten</v-list-item-content>
                    </v-list-item>
                </router-link>
                  <router-link v-bind:to="{ name: 'Newcase' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>control_point</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Operationen hinzufügen / bearbeiten</v-list-item-content>
                    </v-list-item>
                </router-link>
                  <router-link v-bind:to="{ name: 'Newcase' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>control_point</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>ISIS-Geräte hinzufügen / bearbeiten</v-list-item-content>
                    </v-list-item>
                </router-link>
                  <router-link v-bind:to="{ name: 'Newcase' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>control_point</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Operateure hinzufügen / bearbeiten</v-list-item-content>
                    </v-list-item>
                </router-link>
                 <router-link v-bind:to="{ name: 'Newcase' }" class="side_bar_link">
                    <v-list-item>
                        <v-list-item-action>
                            <v-icon>control_point</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>Assistenten hinzufügen / bearbeiten</v-list-item-content>
                    </v-list-item>
                </router-link>
                  
            </v-list>
</template>
