import AcademicYearsInformationLayout from "@/layout/AcademicYears/AcademicYearsInformationLayout.vue";
import AppLayout from "@/layout/AppLayout.vue";
import ScholarshipInformationLayout from "@/layout/scholarship/ScholarshipInformationLayout.vue";
import StudentInformationLayout from "@/layout/student/StudentInformationLayout.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: AppLayout,
            children: [
                {
                    path: "/",
                    name: "dashboard",
                    component: () => import("@/views/Dashboard.vue"),
                },
                {
                    path: "/registrationmangement/paid",
                    name: "Paid Student",
                    component: () =>
                        import("@/views/office/study-office-management/registration-mangement/PaidStudent.vue"),
                },
                {
                    path: "/registrationmangement/scholarship",
                    name: "Scholarship Student",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/registration-mangement/ScholarshipStudent.vue"
                        ),
                },
                // Student Management
                {
                    path: "/studymanagement/student/student-list",
                    name: "Student List",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/student-management/student-information/StudentList.vue"
                        ),
                },
                // Room Management
                /**
                 * Room Type
                 */
                {
                    path: "/studymanagement/room-management/roomtypes-list",
                    name: "Room Type List",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/room-management/room-type/RoomTypList.vue"
                        ),
                },
                {
                    path: "/studymanagement/room-management/roomtypes-creation",
                    name: "Room Type Create",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/room-management/room-type/RoomTypeCreation.vue"
                        ),
                },
                /**
                 * Building
                 */
                {
                    path: "/studymanagement/room-management/buildings-list",
                    name: "Building List",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/room-management/building/BuildingList.vue"
                        ),
                },
                {
                    path: "/studymanagement/room-management/buildings-creation",
                    name: "Building Create",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/room-management/building/BuildingCreation.vue"
                        ),
                },
                /**
                 * Room
                 */
                {
                    path: "/studymanagement/room-management/rooms-list",
                    name: "Room List",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/room-management/room/RoomList.vue"
                        ),
                },
                // Scholarship Management
                {
                    path: "/studymanagement/scholarship/scholarships-list",
                    name: "Scholarship",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/scholarship-management/ScholarShipList.vue"
                        ),
                },
                {
                    path: "/studymanagement/scholarship/scholarships-creation",
                    name: "Create Scholarship",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/scholarship-management/ScholarShipCreation.vue"
                        ),
                },
                // Study Year Management
                {
                    path: "/administrationmanagement/structuremanagement/academicyear-list",
                    name: "Study Year",
                    component: () =>
                        import(
                            "@/views/office/admintstrator-management/structure-management/academic-year-management/AcademicYearList.vue"
                        ),
                },
            ],
        },
        {
            path: "/studymanagement/student/student-information",
            component: StudentInformationLayout,
            children: [
                {
                    path: "/studymanagement/student/student-information",
                    name: "Student Information",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/student-management/student-information/information/StudentInformation.vue"
                        ),
                },
                {
                    path: "/studymanagement/student/student-edit",
                    name: "Update Student Information",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/student-management/student-information/information/UpdateStudentInformation.vue"
                        ),
                },
            ],
        },
        {
            path: "/studymanagement/scholarship/scholarships-information",
            component: ScholarshipInformationLayout,
            children: [
                {
                    path: "/studymanagement/scholarship/scholarships-information",
                    name: "Scholarship Information",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/scholarship-management/information/ScholarShipDetail.vue"
                        ),
                },
                {
                    path: "/studymanagement/scholarship/scholarships-edit",
                    name: "Update Scholarship",
                    component: () =>
                        import(
                            "@/views/office/study-office-management/study-management/scholarship-management/information/ScholarshipEdit.vue"
                        ),
                },
            ]
        },
        {
            path: "/administratormanagement/structuremanagement/academicyear-information",
            component: AcademicYearsInformationLayout,
            children: [
                {
                    path: "/administratormanagement/structuremanagement/academicyear-information",
                    name: "Study Year Information",
                    component: () =>
                        import(
                            "@/views/office/admintstrator-management/structure-management/academic-year-management/academic-year-information/AcademicYearInformation.vue"
                        ),
                },

            ],
        },
    ],
});

export default router;
