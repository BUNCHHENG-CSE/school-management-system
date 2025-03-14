<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
    {
        label: "Home",
        items: [
            { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
            {
                label: "Student Registeration",
                items: [
                    {
                        label: "Paid",
                        to: "/studentregistration/PaidStudent",
                    },
                    {
                        label: "Scholarship",
                        to: "/studentregistration/ScholarshipStudent",
                    },
                ],
            },
            {
                label: "Study Management",
                to: "/pages",
                items: [
                    {
                        label: "Student",
                        items: [
                            {
                                label: "Student List",
                                to: "/studymanagement/student/studentlist",
                            },
                            {
                                label: "List Student Study Abroad",
                                to: "/studymanagement/student/studentstudyabroad",
                            },
                        ],
                    },

                ],
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
