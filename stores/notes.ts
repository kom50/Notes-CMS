import { defineStore } from 'pinia'
import { Note } from '@/types'

export const useNotesStore = defineStore("notes-store", () => {

    const notes = ref<Note[]>([])

    /** Get all favorite notes from store */
    const favoriteNotes = computed(() => notes.value.filter(note => note.favorite));

    /**
     * Function to add one note
     *  
     * @param {Note} note - note data
     */
    function setNote(note: Note) {
        notes.value.push(note)
    }

    /**
     * Function to add multiple notes
     *  
     * @param {Note[]} newNotes - new notes data
     */
    function setNotes(newNotes: Note[]) {
        notes.value.push(...newNotes)
    }

    /**
     * Function to set updated data of any specific note
     * 
     * @param {Note} note - updated note 
     */
    function updateNote(note: Note) {
        const index = notes.value.findIndex(tempNote => tempNote.id === note.id)
        notes.value[index] = note;
    }

    /**
     * Function to set updated data of any specific note
     * 
     * @param {string} noteId - note id 
     */
    function deleteNote(noteId: string) {
        notes.value = notes.value.filter(tempNote => tempNote.id !== noteId)
    }

    return {
        notes: computed(() => notes.value),
        favoriteNotes,
        setNotes,
        setNote,
        updateNote,
        deleteNote
    }
}) 