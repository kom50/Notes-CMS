<template>
    <v-dialog :fullscreen="mobile" :width="mobile ? '100%' : '80%'" persistent v-model="dialog">
        <template v-slot:activator="{ props }">
            <v-btn value="plus" color="primary" v-bind="props">
                <v-icon>mdi-note-plus</v-icon>
                Add
            </v-btn>
        </template>
        <v-card class="pa-2">
            <v-form @submit.prevent="save">
                <v-card-title>
                    <span class="text-h5">Create Note</span>
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="title" variant="outlined" label="Title*" required :rules="rules.title"
                                clearable></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="subtitle" variant="outlined" label="Subtitle" clearable></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea v-model="description" variant="outlined" label="Description*"
                                :rules="rules.description" clearable required></v-textarea>
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
                    <v-btn type="submit" color="blue" variant="tonal"> Save </v-btn>
                </v-card-actions>
            </v-form>
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

/** Input fields rules */
const rules = {
    title: [
        (value: string) => {
            if (value) return true
            return 'You must enter a note title.'
        }
    ],
    description: [
        (value: string) => {
            if (value) return true
            return 'You must enter a note description.'
        }
    ],
}

/**
 * Function to save note data
 */
async function save(event: any) {
    const results = await event

    // If input not valid
    if (!results.valid) return

    const note: Note = {
        title: title.value,
        subtitle: subtitle.value,
        description: description.value,
        timestamp: Date.now(),
        id: uuidv4()
    }

    // Store in IDB and also in note store
    await storeNote(note)
    noteStore.setNote(note)

    // CLose create dialog box
    dialog.value = false

    // Reset value
    title.value = ''
    subtitle.value = ''
    description.value = ''
}
</script>