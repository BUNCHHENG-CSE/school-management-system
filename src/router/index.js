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
                    path: "/studentregistration/PaidStudent",
                    name: "Paid Student",
                    component: () =>
                        import("@/views/studentregisteration/PaidStudent.vue"),
                },
                {
                    path: "/studentregistration/ScholarshipStudent",
                    name: "Scholarship Student",
                    component: () =>
                        import(
                            "@/views/studentregisteration/ScholarshipStudent.vue"
                        ),
                },
                // Student Management
                {
                    path: "/studymanagement/student/studentlist",
                    name: "Student List",
                    component: () =>
                        import(
                            "@/views/studymanagement/student/StudentList.vue"
                        ),
                },
                {
                    path: "/studymanagement/student/studentstudyabroad",
                    name: "Student Study Abroad",
                    component: () =>
                        import(
                            "@/views/studymanagement/student/StudentStudyAbroad.vue"
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
                            "@/views/studymanagement/room-management/room-type/RoomTypList.vue"
                        ),
                },
                {
                    path: "/studymanagement/room-management/roomtypes-creation",
                    name: "Room Type Create",
                    component: () =>
                        import(
                            "@/views/studymanagement/room-management/room-type/RoomTypeCreation.vue"
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
                            "@/views/studymanagement/room-management/building/BuildingList.vue"
                        ),
                },
                {
                    path: "/studymanagement/room-management/buildings-creation",
                    name: "Building Create",
                    component: () =>
                        import(
                            "@/views/studymanagement/room-management/building/BuildingCreation.vue"
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
                            "@/views/studymanagement/room-management/room/RoomList.vue"
                        ),
                },
                // Scholarship Management
                {
                    path: "/studymanagement/scholarship/scholarships-list",
                    name: "Scholarship",
                    component: () =>
                        import(
                            "@/views/studymanagement/scholarship/ScholarShipList.vue"
                        ),
                },
                {
                    path: "/studymanagement/scholarship/scholarships-creation",
                    name: "Create Scholarship",
                    component: () =>
                        import(
                            "@/views/studymanagement/scholarship/ScholarShipCreation.vue"
                        ),
                },
                // Study Year Management
                {
                    path: "/administrationmanagement/studyyear/studyyear-list",
                    name: "Study Year",
                    component: () =>
                        import(
                            "@/views/admintstratormanagement/StudyYearList.vue"
                        ),
                },
            ],
        },
        {
            path: "/studymanagement/student/student-information",
            component: StudentInformationLayout,
            children: [
                {
                    path: "/studymanagement/student/information/student-information",
                    name: "Student Information",
                    component: () =>
                        import(
                            "@/views/studymanagement/student/information/StudentInformation.vue"
                        ),
                },
                {
                    path: "/studymanagement/student/student-edit",
                    name: "Update Student Information",
                    component: () =>
                        import(
                            "@/views/studymanagement/student/information/UpdateStudentInformation.vue"
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
                            "@/views/studymanagement/scholarship/information/ScholarShipDetail.vue"
                        ),
                },
                {
                    path: "/studymanagement/scholarship/scholarships-edit",
                    name: "Update Scholarship",
                    component: () =>
                        import(
                            "@/views/studymanagement/scholarship/information/ScholarshipEdit.vue"
                        ),
                },
            ]
        },
        {
            path: "/administratormanagement/academicyearinformation/academic-year-information",
            component: AcademicYearsInformationLayout,
            children: [
                {
                    path: "/administratormanagement/academicyearinformation/academic-year-information",
                    name: "Study Year Information",
                    component: () =>
                        import(
                            "@/views/admintstratormanagement/academicyearinformation/AcademicYearInformation.vue"
                        ),
                },

            ],
        },
    ],
});

export default router;
