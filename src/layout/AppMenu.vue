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
                        label: "Student Management",
                        items: [
                            {
                                label: "Student",
                                to: "/studymanagement/student/studentlist",
                            },
                            {
                                label: "List Student Study Abroad",
                                to: "/studymanagement/student/studentstudyabroad",
                            },
                        ],
                    },
                    {
                        label: "Room Management",
                        items: [
                            {
                                label: "Room Type",
                                to: "/studymanagement/room-management/roomtypes-list",
                            },
                            {
                                label: "Building",
                                to: "/studymanagement/room-management/buildings-list",
                            },
                            {
                                label: "Room",
                                to: "/studymanagement/room-management/rooms-list",
                            }
                        ]
                    },
                    {
                        label: "Scholarship Management",
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
