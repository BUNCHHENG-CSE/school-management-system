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
                    {
                        label: "ScholarShip",
                        to: "/studymanagement/scholarship/scholarships-list",
                    }

                ],
            },
            {
                label: "Administration management",
                items: [
                    {
                        label: "Study Year",
                        to: "/administrationmanagement/studyyear/studyyear-list",
                    }
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
