<script setup>
import router from '@/router';
import { useStudentStore,useParentStore } from '@/store/Store';
import axios from 'axios';
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

const storeStudent = useStudentStore();
const storeParent = useParentStore();
const toast = useToast();
const card_num = ref();
const students = ref([])

onMounted(async () => {
    card_num.value = history.state.message
    students.value = storeStudent.student

    if (card_num.value !== undefined) {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/students/${card_num.value}`)
            .then((res) => {
                storeStudent.setStudentData(res.data.data)
                storeParent.setParentData(res.data.data.parent)
                toast.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Student found",
                    life: 3000,
                });
            }).catch((error) => {
                console.log(error.response)
                toast.add({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Student Not found",
                    life: 3000,
                });
            })

    } else if (students.value.id <= 0) {
        redirect()
    }
})

const redirect = () => {
    storeStudent.resetStudentData();
    router.go(-1)
}

const onClickPreviousPage = () => {
    router.push("/studymanagement/student/studentlist")
}

</script>

<template>
    <Toast />
    <Fluid class="flex flex-row mb-5">
        <div class="w-full">
            <div class="card flex justify-between" style="padding: 1rem 2rem 0.3rem 2rem;">
                <div>
                    <h5>Student Information :&nbsp; {{ storeStudent.student.first_name_en }} &nbsp; |&nbsp; Card
                        Number:&nbsp; {{
                            storeStudent.student.card_num }} </h5>
                </div>
                <div>
                    <Button icon="pi pi-times" severity="danger" aria-label="Cancel" @click="onClickPreviousPage" />
                </div>

            </div>

        </div>
    </Fluid>


    <Fluid class="flex flex-row gap-8">
        <div class="w-full ">
            <div class="card">
                <div>
                    <h5>Student Information</h5>
                    <div v-if="storeStudent && Object.keys(storeStudent.student).length">
                        <p><strong>Card Number:</strong> {{ storeStudent.student.card_num }}</p>
                        <p><strong>Name EN:</strong> {{ storeStudent.student.first_name_en }}</p>
                        <p><strong>Name KH:</strong> {{ storeStudent.student.full_name_kh }}</p>
                        <p><strong>Degree Number:</strong> {{ storeStudent.student.degree_num }}</p>
                        <p><strong>Gender : {{ storeStudent.student.gender }}</strong></p>
                    </div>
                    <div v-else>No student details found.</div>
                </div>
            </div>
        </div>
    </Fluid>

</template>
