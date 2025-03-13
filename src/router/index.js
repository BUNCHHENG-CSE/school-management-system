import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/studentregistration/PaidStudent',
                    name: 'Paid Student',
                    component: () => import('@/views/studentregisteration/PaidStudent.vue')
                },
                {
                    path: '/studentregistration/ScholarshipStudent',
                    name: 'Scholarship Student',
                    component: () => import('@/views/studentregisteration/ScholarshipStudent.vue')
                },
            ]
        },
    ]
});

export default router;
