<template>
    <div>
        <v-container fluid>
            <v-row dense>
                <!-- :class="[mobile ? 'v-vol-12' : 'v-col-4']" -->
                <v-col v-for="note in      isShowFavoriteNotes ? favoriteNotes : notes     " :key="note.id"
                    :cols="lg ? 4 : (md ? 6 : mobile ? 12 : 6)">
                    <v-card :title="note.title" :subtitle="note.subtitle" :text="note.description">
                        <v-card-text>{{ new Date(note.timestamp).toLocaleString() }}</v-card-text>
                        <v-card-actions>
                            <v-btn size="small" color="blue" variant="tonal" @click="() => viewNote(note)">See
                                more</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn size="large" color="red" variant="text" @click="addToFavoriteNotes(note)"
                                :icon="note.favorite ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
                            <v-btn size="large" color="black" variant="text" @click="removeNote(note.id)"
                                icon="mdi-delete"></v-btn>
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
import { storeNote, deleteNote } from '@/helpers/idb';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { mobile, md, lg } = useDisplay()

const notesStore = useNotesStore();

const isShowFavoriteNotes = ref(false)

/** Get all notes from store */
const notes = computed(() => notesStore.notes);

/** Get all favorite notes from store */
const favoriteNotes = computed(() => notesStore.favoriteNotes);

const selectedNote = ref<Note | null>(null)

/**
 * Function to set selectedNote value
 * 
 * @param {Note} note - note data 
 */
function viewNote(note: Note) {
    selectedNote.value = note;
}

/**
 * Function to update note in favorite value 
 * 
 * @param {Note} note - note  
 */
async function addToFavoriteNotes(note: Note) {
    const tempNote = { ...note, favorite: !note.favorite }

    // Store in IDB and also in note store
    await storeNote(tempNote);
    notesStore.updateNote(tempNote)
}

EventBus.$on('showFavoriteNotes', () => {
    isShowFavoriteNotes.value = !isShowFavoriteNotes.value
})

function removeNote(id: string) {
    deleteNote(id)
    notesStore.deleteNote(id)
}

</script>