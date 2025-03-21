<script setup>
import router from '@/router';
import { useScholarshipStore, useStudentStore } from '@/store/Store';
import axios from 'axios';
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

const useScholarship = useScholarshipStore();
const toast = useToast();
const id = ref();
const scholarship = ref([])

onMounted(async () => {
    id.value = history.state.id
    scholarship.value = useScholarship.scholarship

    if (id.value !== undefined) {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/scholarships/${id.value}`)
            .then((res) => {
                useScholarship.setScholarshipData(res.data.data)
                toast.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Scholarship found",
                    life: 3000,
                });
            }).catch((error) => {
                console.log(error.response)
                toast.add({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Scholarship Not found",
                    life: 3000,
                });
            })
    } else if (useScholarship.scholarship.id <= 0) {
        redirect()
    }
})

const redirect = () => {
    useScholarship.resetScholarshipData()
    router.go(-1)
}

const onClickPreviousPage = () => {
    router.push("/studymanagement/scholarship/scholarships-list")
}

</script>

<template>
    <Toast />
    <div>
        <div>
            <Toolbar class="mb-6">
                <template #start>
                    <div class="flex items-center justify-center">
                        <p class="text-center">Scholarship Detial</p>
                    </div>
                </template>
                <template #end>
                    <Button icon="pi pi-times" severity="danger" aria-label="Cancel" @click="onClickPreviousPage" />
                </template>
            </Toolbar>
        </div>

        <Fluid class="flex flex-row gap-8">
            <div class="w-full ">
                <div class="card">
                    <div>
                        <h2>Student Information</h2>
                        <div v-if="useScholarship && Object.keys(useScholarship.scholarship).length">
                            <p><strong>ID:</strong> {{ useScholarship.scholarship.id }}</p>
                            <p><strong>Name:</strong> {{ useScholarship.scholarship.name }}</p>
                            <p><strong>SPONSER NAME:</strong> {{ useScholarship.scholarship.sponsor_name }}</p>
                            <p><strong>SPONSER TELEPHONE:</strong> {{ useScholarship.scholarship.sponsor_telephone }}
                            </p>
                            <p><strong>BUDGET:</strong> {{ useScholarship.scholarship.budget }}</p>
                            <p><strong>TOTAL:</strong> {{ useScholarship.scholarship.total }}</p>
                            <p><strong>DESCRIPTION:</strong> {{ useScholarship.scholarship.description }}</p>
                        </div>
                        <div v-else>No student details found.</div>
                    </div>
                </div>
            </div>
        </Fluid>
    </div>
</template>
