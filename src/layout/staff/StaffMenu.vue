<script setup>
import { ref } from "vue";

import AppMenuItem from "../AppMenuItem.vue";

const model = ref([
    {
        label: "Staff Information",
        items: [
            {
                label: "Suammry Info",
                items: [
                    {
                        label: "Personal Information",
                        to: "/administrationmanagement/staff-information",
                    },
                    {
                        label: "Language",
                        to: "",
                    },
                    {
                        label: "General Education Level",
                        to: "",
                    },
                    {
                        label: "Vocational Training Level",
                        to: "",
                    },
                    {
                        label: "Work experience",
                        to: "",
                    },
                    {
                        label: "Reference letter",
                        to: "",
                    },
                    {
                        label: "Absence schedule",
                        to: "",
                    },
                ],
            },

            {
                label: "Unit",
                items: [
                    {
                        label: "Unit",
                        to: "",
                    },
                ]
            },
            {
                label: "Agreement",
                items: [
                    {
                        label: "Agreement",
                        to: "",
                    },
                ]
            },
            {
                label: "HR Information",
                items: [
                    {
                        label: "HR Information",
                        to: "",
                    },
                ]
            },
            {
                label: "Academic Rank and Title",
                items: [
                    {
                        label: "Academic Rank and Title",
                        to: "",
                    },
                ]
            },
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
