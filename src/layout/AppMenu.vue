<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
    {
        label: "Home",
        items: [
            { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
            {
                label: "Study Office Management",
                items: [
                    {
                        label: "Registration Management",
                        items: [
                            {
                                label: "Paid Student",
                                to: "/registrationmangement/paid",
                            },
                            {
                                label: "Scholarship Student",
                                to: "/registrationmangement/scholarship",
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
                                        label: "Student Information",
                                        to: "/studymanagement/student/student-list",
                                    },
                                    {
                                        label: "Certificate Management",
                                        to: "",
                                    },
                                    {
                                        label: "ID Card Management",
                                        to: "",
                                    },
                                ],
                            },
                            {
                                label: "Study Result",
                                items: [
                                    {
                                        label: "Re-exam List",
                                        to: "",
                                    },
                                    {
                                        label: "Ranking List",
                                        to: "",
                                    },
                                    {
                                        label: "Foundation List",
                                        to: "",
                                    },
                                    {
                                        label: "Attendent Table",
                                        to: "",
                                    },
                                ],
                            },
                            {
                                label: "Exam",
                                items: [
                                    {
                                        label: "Exam Schedule",
                                        to: "",
                                    },
                                ],
                            },
                            {
                                label: "Class and Promote ",
                                items: [
                                    {
                                        label: "Class Management",
                                        to: "",
                                    },
                                ],
                            },
                            {
                                label: "Schedule and Teaching Time",
                                items: [
                                    {
                                        label: "Create Schedule",
                                        to: "",
                                    },
                                    {
                                        label: "Lecturer Schedule",
                                        to: "",
                                    },
                                    {
                                        label: "Teaching Request Time",
                                        to: "",
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
                ],
            },
            {
                label: "Administration management",
                items: [
                    {
                        label: "Structure Management",
                        items: [
                            {
                                label: "Academic Year Management",
                                to: "/administrationmanagement/structuremanagement/academicyear-list",
                            },
                            {
                                label: "Degree Management",
                                to: "/administrationmanagement/structuremanagement/degree-list",
                            },
                            {
                                label: "Subject Management",
                                to: "/administrationmanagement/structuremanagement/subject-list",
                            },
                            {
                                label: "Class Management",
                                to: "",
                            },
                            {
                                label: "Semester Management",
                                to: "",
                            },
                        ],
                    },
                    {
                        label: "Staff Management",
                        to: "",
                    },
                    {
                        label: "Lecturer Management",
                        to: "",
                    },
                ],
            },
            {
                label: "System User",
                items: [
                    {
                        label: "Personal Information",
                        to: "",
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
