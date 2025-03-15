<script setup>
import router from '@/router';






const onClickPreviousPage = () => {
    router.go(-1)
}



</script>

<template>
    <div>
        <Fluid class="flex flex-row mb-5">
            <div class="w-full">
                <div class="card" style="padding: 1rem 2rem 0.3rem 2rem">
                    <h5>Create Scholarship</h5>
                </div>
            </div>
        </Fluid>
        <Toolbar class="mb-6">
            <template #end>
                <Button icon="pi pi-times" severity="danger" aria-label="Cancel" @click="onClickPreviousPage" />
            </template>
        </Toolbar>


    </div>
</template>