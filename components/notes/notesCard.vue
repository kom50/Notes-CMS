<template>
    <div>
        <v-container fluid>
            <v-row dense>
                <v-col v-for="note in notes" :key="note.id" class="v-auto-col">
                    <v-card :title="note.title" :subtitle="note.subtitle" :text="note.description">
                        <v-card-actions>
                            <v-btn size="small" color="blue" variant="tonal" @click="() => viewNote(note)">See more</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn size="small" color="red" variant="text" icon="mdi-heart-outline"></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>


<script setup lang="ts">
import { useNotesStore } from '@/stores/notes';
import { Note } from '@/types';

const notesStore = useNotesStore();

/** Get all notes from store */
const notes = computed(() => notesStore.notes);

const selectedNote = ref<Note | null>(null)

/**
 * Function to set selectedNote value
 * 
 * @param {Note} note - note data 
 */
function viewNote(note: Note) {
    selectedNote.value = note;
}
</script>