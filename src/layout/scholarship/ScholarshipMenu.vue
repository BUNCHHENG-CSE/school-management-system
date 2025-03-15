<script setup>
import { ref } from "vue";

import AppMenuItem from "../AppMenuItem.vue";

const model = ref([
    {
        label: "Scholarship Information",
        items: [
            { label: "Scholarship Information", to: "/studymanagement/scholarship/scholarships-information" },
            { label: "Scholarship Edition", to: "/studymanagement/scholarship/scholarships-edit" },
        ],
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
