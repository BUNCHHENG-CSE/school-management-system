import AppLayout from "@/layout/AppLayout.vue";
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
                {
                    path: "/studymanagement/student/studentinformation",
                    name: "Student Information",
                    component: () =>
                        import(
                            "@/views/studymanagement/student/StudentInformation.vue"
                        ),
                },
                {
                    path: "/studymanagement/scholarship/scholarship-list",
                    name: "Scholarship",
                    component: () => 
                        import(
                            "@/views/studymanagement/scholarship/ScholarShipList.vue"
                        ),
                },
                {
                    path: "/studymanagement/scholarship/create-scholarship",
                    name: "Create Scholarship",
                    component: () => 
                        import(
                            "@/views/studymanagement/scholarship/ScholarShipCreation.vue"
                        ),
                },
                {
                    path: "/studymanagement/scholarship/showmore-scholarship",
                    name: "ShowMore Scholarship",
                    component: () => 
                        import(
                            "@/views/studymanagement/scholarship/ScholarShipShowMore.vue"
                        ),
                },
            ],
        },
    ],
});

export default router;
