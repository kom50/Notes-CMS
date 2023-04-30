import { IDBPDatabase, openDB } from 'idb';
import { Note } from '@/types';

/**
 * Function to return IDB instance 
 * 
 * @returns {Promise<IDBPDatabase<unknown>>} return IDB instance
 */
function getIDB(): Promise<IDBPDatabase<unknown>> {
    return openDB("Notes", 1, {
        upgrade(db) {
            db.createObjectStore('notes');
        }
    })
}

/**
 * Function to store notes in IndexedDB
 * 
 * @param {Note} note - note object 
 */
export async function storeNote(note: Note) {
    await (await getIDB()).put('notes', note, note.id)
}

/**
 * 
 * @returns {Note[]} returns notes data
 */
export async function readNotes(): Promise<Note[]> {
    return await (await getIDB()).getAll('notes') as Note[];
}