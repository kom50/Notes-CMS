<template>
    <div>
        <v-bottom-navigation mode="shift" color="teal" grow>
            <v-btn value="recent">
                <v-icon>mdi-history</v-icon>
                Recent
            </v-btn>
            <NotesCreateDialog> </NotesCreateDialog>
            <v-btn value="favorites" @click="EventBus.$emit('showFavoriteNotes')">
                <v-icon>mdi-heart</v-icon>
                Favorites
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>
