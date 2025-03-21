<script setup>
import router from '@/router';
import { useAcademicYearStore } from '@/store/Store';
import axios from 'axios';
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

const storeAcademicYear = useAcademicYearStore();
const toast = useToast();
const id = ref();
const academicyear = ref([])

onMounted(async () => {
    id.value = history.state.id
    academicyear.value = storeAcademicYear.academicyear

    if (id.value !== undefined) {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/academic-years/${id.value}`)
            .then((res) => {
                storeAcademicYear.setAcademicYearData(res.data.data)
                toast.add({
                    severity: "success",
                    summary: "Success",
                    detail: "Academic Year found",
                    life: 3000,
                });
            }).catch((error) => {
                console.log(error.response)
                toast.add({
                    severity: "warn",
                    summary: "Warning",
                    detail: "Academic Year Not found",
                    life: 3000,
                });
            })
    } else if (storeAcademicYear.academicyear.id <= 0) {
        redirect()
    }
})

const redirect = () => {
    storeAcademicYear.resetAcademicYearData();
    router.go(-1)
}

const onClickPreviousPage = () => {
    router.push("/administrationmanagement/studyyear/studyyear-list")
}

</script>

<template>
    <Toast />
    <div>
        <div>
            <Toolbar class="mb-6">
                <template #start>
                    <div class="flex items-center justify-center">
                        <p class="text-center"> Academic Year Details</p>
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
                        <h2>Academic Year Information</h2>
                        <div v-if="storeAcademicYear && Object.keys(storeAcademicYear.academicyear).length">
                            <p><strong>ID:</strong> {{ storeAcademicYear.academicyear.id }}</p>
                            <p><strong>LABEL:</strong> {{ storeAcademicYear.academicyear.label }}</p>
                            <p><strong>START DATE:</strong> {{ storeAcademicYear.academicyear.start_date }}</p>
                            <p><strong>END DATE:</strong> {{ storeAcademicYear.academicyear.end_date }}
                            </p>
                            <p><strong>ACTIVE:</strong> {{ storeAcademicYear.academicyear.activate === true ? "Active" : "Inactive" }}</p>
                        </div>
                        <div v-else>No academic year details found.</div>
                    </div>
                </div>
            </div>
        </Fluid>
    </div>
</template>
