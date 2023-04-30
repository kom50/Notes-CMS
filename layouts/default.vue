<template>
    <div class="w-screen h-screen box-border">
        <div class="">
            <BaseLayoutHeader />
        </div>
        <div class="mt-16 pt-2 p-2 box-border">
            <slot />
        </div>
        <div>
            <BaseLayoutFooter />
        </div>
    </div>
</template>

<script setup lang="ts">
</script>