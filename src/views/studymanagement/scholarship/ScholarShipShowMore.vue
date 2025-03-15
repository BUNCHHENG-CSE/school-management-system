<script setup>
import router from '@/router';
import axios from 'axios';
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

onMounted(() => {
    id.value = history.state.id

    if (id.value === undefined) {
        redirect()
    }

    axios.get(`http://localhost:8888/api/v1/scholarships/${id.value}`)
        .then((res) => {
            console.log("response testin 1")
            scholarship.value = res.data.data

            console.log("response data")
            console.log(scholarship.value)

            console.log("response testin 2")
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
})

const toast = useToast();
const id = ref();
const scholarship = ref([])

const redirect = () => {
    router.go(-1)
}

const onClickPreviousPage = () => {
    redirect()
}

</script>

<template>
    <Toast />
    <div>
        <div>
            <Toolbar class="mb-6">

                <template #start>
                    <div class="flex items-center justify-center">
                        <p class="text-center">ShowMore Scholarship</p>
                    </div>
                </template>

                <template #end>
                    <Button icon="pi pi-times" severity="danger" aria-label="Cancel" @click="onClickPreviousPage" />
                </template>
            </Toolbar>
        </div>
    </div>
</template>