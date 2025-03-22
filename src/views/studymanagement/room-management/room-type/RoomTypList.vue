<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";

onMounted(() => {
    axios
        .get(`${import.meta.env.VITE_API_URL}/api/v1/room-types`)
        .then((response) => {
            if (response.status === 200) {
                roomTypes.value = response.data.data;
            }
        })
        .catch((error) => {
            console.log(error.response);
            toast.add({
                severity: "warn",
                summary: "Warning",
                detail: "Student found",
                life: 3000,
            });
        });
});

const searchValue = ref("");
const roomTypes = ref([]);

const onSearch = () => {
    console.log(searchValue.value);
};

const onClickCreate = () => {
    router.push({
        path: "/studymanagement/room-management/roomtypes-creation",
    });
};

const onClickShow = (id) => {
    router.push({
        path: "/studymanagement/scholarship/scholarships-information",
        state: { 'id': id }
    });
};


</script>

<template>
    <Toast />
    <div>
        <Fluid class="flex flex-row mb-5">
            <div class="w-full">
                <div class="card" style="padding: 1.5rem">
                    <h5 class="m-0">RoomType Management</h5>
                </div>
            </div>
        </Fluid>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="mr-2" @click="onClickCreate" />
                </template>
                <template #end>
                    <Form @submit="onSearch">
                        <div class="flex flex-row gap-4 justify-end">
                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="searchValue" />
                                <label for="on_label">Search By Name</label>
                            </FloatLabel>
                            <Button type="submit" severity="info" label="Search" icon="pi pi-search" class="ml-5" />
                        </div>
                    </Form>
                </template>
            </Toolbar>
            <DataTable :value="roomTypes" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem">
                <Column field="id" style="width: 5%" header="#"></Column>
                <Column field="name_en" style="width: 25%" header="Name EN"></Column>
                <Column field="name_kh" style="width: 20%" header="Name KH"></Column>
                <Column field="description_en" style="width: 20%" header="Description EN">
                    <template #body="{ data }">
                        <span v-if="data.description_en">{{ data.description_en }}</span>
                        <span v-else>N/A</span>
                    </template>
                </Column>
                <Column field="description_kh" style="width: 20%" header="Description KH">
                    <template #body="{ data }">
                        <span v-if="data.description_kh">{{ data.description_en }}</span>
                        <span v-else>N/A</span>
                    </template>
                </Column>
                <Column style="width: 15%" header="Action">
                    <template #body="{ data }">
                        <Button label="Show More" severity="info" @click="onClickShow(data.id)" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
