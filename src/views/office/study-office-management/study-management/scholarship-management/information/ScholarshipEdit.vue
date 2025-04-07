<script setup>
import router from '@/router';
import { useScholarshipStore } from '@/store/Store';
import { onMounted } from 'vue';

const useScholarship = useScholarshipStore()

onMounted(() => {

    if (useScholarship.scholarship.id <= 0) {
        router.go(-1)
    }

})

const onClickPreviousPage = () => {
    router.push("/studymanagement/scholarship/scholarships-list")
}


</script>
<template>
    <div>
        <div>
            <Toolbar class="mb-6">
                <template #start>
                    <div class="flex items-center justify-center">
                        <p class="text-center">Scholarship Edit</p>
                    </div>
                </template>
                <template #end>
                    <Button icon="pi pi-times" severity="danger" aria-label="Cancel" @click="onClickPreviousPage" />
                </template>
            </Toolbar>
        </div>
        <h1>{{ useScholarship.scholarship.name }}</h1>
    </div>

</template>