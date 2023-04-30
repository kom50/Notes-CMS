<template>
    <v-dialog :fullscreen="mobile" :width="mobile ? '100%' : '80%'" persistent v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn value="plus" color="primary" v-bind="props">
                <v-icon>mdi-note-plus</v-icon>
                Add
            </v-btn>
        </template>
        <v-card class="pa-2">
            <v-card-title>
                <span class="text-h5">Create Note</span>
            </v-card-title>
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="title" variant="outlined" label="Title*" required clearable></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="subtitle" variant="outlined" label="Subtitle" clearable></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea v-model="description" variant="outlined" label="Description*" persistent-hint clearable
                            required></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
            <v-card-text>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" variant="flat" @click="dialog = false">
                    Close
                </v-btn>
                <v-btn color="blue" variant="tonal" @click="save"> Save </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { v4 as uuidv4 } from 'uuid';
import { storeNote } from '@/helpers/idb'
import { Note } from '@/types';
import { useNotesStore } from '@/stores/notes';

const noteStore = useNotesStore()
const { mobile } = useDisplay()

const dialog = ref(false)
const title = ref('')
const subtitle = ref('')
const description = ref('')

/**
 * Function to save note data
 */
async function save() {

    const note: Note = {
        title: title.value,
        subtitle: title.value,
        description: title.value,
        timestamp: Date.now(),
        id: uuidv4()
    }

    // Store in IDB and also in note store
    await storeNote(note)
    noteStore.setNote(note)
}
</script>