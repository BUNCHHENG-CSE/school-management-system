<script setup>
import { ref } from "vue";

import AppMenuItem from "../AppMenuItem.vue";

const model = ref([
    {
        label: "Student Information",
        items: [
            { label: "Registered Major", to: "/studymanagement/student/student-information" },
            { label: "Update", to: "/studymanagement/student/student-edit" },
            { label: "Study Result", to: "" },
            { label: "Documents support", to: "" },
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
