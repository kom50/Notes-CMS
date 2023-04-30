<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </v-app>
</template>

<script setup lang="ts">
import { readNotes } from '@/helpers/idb';
import { useNotesStore } from '@/stores/notes';

/** Initially read all notes from IDB  and stored in PINIA Notes store */
const notes = await readNotes()
useNotesStore().setNotes(notes)

</script>
