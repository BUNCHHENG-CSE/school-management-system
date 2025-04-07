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
                                to: "/studentregistration/PaidStudent",
                            },
                            {
                                label: "Scholarship Student",
                                to: "/studentregistration/ScholarshipStudent",
                            },
                        ],
                    },
                    {
                        label: "Study Management",
                        items: [
                            {
                                label: "Student Information",
                                items: [
                                    {
                                        label: "Student Management",
                                        to: "/studymanagement/student/studentlist",
                                    },
                                    {
                                        label: "List Student Study Abroad",
                                        to: "/studymanagement/student/studentstudyabroad",
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
                                to: "/administrationmanagement/studyyear/studyyear-list",
                            },
                            {
                                label: "Degree Management",
                                to: "",
                            },
                            {
                                label: "Subject Management",
                                to: "",
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
