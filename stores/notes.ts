import { defineStore } from 'pinia'
import { Note } from '@/types'


export const useNotesStore = defineStore("notes-store", () => {

    const notes = ref<Note[]>([])

    function setNote(data: Note) {
        notes.value.push(data)
    }

    function setNotes(data: Note[]) {
        notes.value.push(...data)
    }

    return {
        notes: notes.value,
        setNotes,
        setNote
    }
}) 