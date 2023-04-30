<template>
    <v-dialog :fullscreen="mobile" :width="mobile ? '100%' : '80%'" persistent>
        <slot />
    </v-dialog>
</template>


<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { mobile } = useDisplay()

const props = defineProps({
    dialog: {
        type: Boolean,
        default: false
    }
})
</script>