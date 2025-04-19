<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { computed } from "vue";
import axios from "axios";


const toast = useToast();
const staffDialog = ref(false);
const submitted = ref(false);
const router = useRouter();
const initialStaff = ref([
    { orderlist: 1, staffID: "00001", name: "ab", email: "ab@rupp.edu.kh", phonenumber: "098809228", currentaddress: "Phnom Penh" },
    { orderlist: 2, staffID: "00002", name: "cd", email: "cd@rupp.edu.kh", phonenumber: "012231313", currentaddress: "Phnom Penh" },
    { orderlist: 3, staffID: "00003", name: "ef", email: "ef@rupp.edu.kh", phonenumber: "094444222", currentaddress: "Phnom Penh" },
    { orderlist: 4, staffID: "00004", name: "ig", email: "ig@rupp.edu.kh", phonenumber: "012244224", currentaddress: "Phnom Penh" },
]);

const onClickCreate = () => {
    // router.push({
    //     path: "/studymanagement/room-management/buildings-creation",
    // });
    submitted.value = false;
    staffDialog.value = true;
};

const onClickShow = (id) => {
    router.push({
        path: "/administrationmanagement/staff-information",
        state: { message: id }
    });
};
</script>

<template>
    <Toast />
    <Fluid class="flex flex-row mb-5">
        <div class="w-full">
            <div class="card" style="padding: 1rem 2rem 0.3rem 2rem;">
                <h5>Staff Management</h5>
            </div>
        </div>
    </Fluid>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full ">
            <div class="card">
                <Toolbar style="border: none !important;">
                    <template #start>
                        <Button label="New" icon="pi pi-plus" class="mr-2" @click="onClickCreate" />
                    </template>
                    <template #end>
                        <Form @submit="onSearch">
                            <div class="flex flex-row gap-4 justify-end">
                                <FloatLabel variant="on">
                                    <InputText id="on_label" v-model="searchValue" />
                                    <label for="on_label">Search By ID</label>
                                </FloatLabel>
                                <Button type="submit" severity="info" icon="pi pi-search" class="ml-5" />
                            </div>
                        </Form>
                    </template>
                </Toolbar>
                <Toolbar class="mb-6" style="border: none;">
                    <template #end>
                        <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload
                            chooseLabel="Import" class="mr-10" auto :chooseButtonProps="{ severity: 'secondary' }" />
                        <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                    </template>
                </Toolbar>

                <DataTable :value="initialStaff" tableStyle="min-width: 50rem">
                    <Column field="orderlist" header="#"></Column>
                    <Column field="staffID" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="phonenumber" header="Phone Number"></Column>
                    <Column field="currentaddress" header="Current Address"></Column>
                    <Column class="!text-end">
                        <template #body="{ data }">
                            <Button label="Show More" severity="info" @click="onClickShow(data.id)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </Fluid>
    <Dialog v-model:visible="staffDialog" :style="{ width: '90%', maxWidth: '1400px' }"
        :class="'bg-white shadow-lg rounded-lg p-4'" header="Degree" :modal="true">

        <template #default>
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Left Side (Image) -->
                <div class="w-full md:w-1/2 flex flex-col items-center p-4">
                    <img src="/rupp_logo.png" alt="Logo" class="w-20 h-20 mb-4">
                    <h2 class="text-center font-bold text-lg">Royal University Of Phnom Penh</h2>
                    <img src="/illustration.png" alt="Illustration" class="w-3/4 mt-4 object-contain">
                </div>

                <!-- Right Side (Form) -->
                <div class="w-full md:w-1/2 p-4 space-y-4 min-w-0 ">
                    <div class="grid grid-cols-1 gap-4">
                        <!-- Scholarship Information -->
                        <div>
                            <h3 class="font-bold text-lg mb-2">Degree Creation</h3>
                            <div class="flex flex-col gap-4 w-full">
                                <IftaLabel class="w-full">
                                    <label for="name">Name</label>
                                    <InputText id="name" type="text" class="w-full" />
                                </IftaLabel>
                                <IftaLabel class="w-full">
                                    <label for="studyperiodyear">Study Period ( year )</label>
                                    <InputText id="studyperiodyear" type="number" class="w-full" />
                                </IftaLabel>
                                <IftaLabel class="w-full">
                                    <label for="studyperiodsemester">Study Period ( semester )</label>
                                    <InputText id="studyperiodsemester" type="number" class="w-full" />
                                </IftaLabel>
                                <IftaLabel class="w-full">
                                    <label for="credit">Credit</label>
                                    <InputText id="credit" type="number" class="w-full" />
                                </IftaLabel>
                            </div>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="grid grid-cols-2 gap-2 pt-4">
                        <button class="bg-gray-200 text-gray-700 px-6 py-2 rounded-md">Cancel</button>
                        <button class="bg-blue-500 text-white px-6 py-2 rounded-md">Save</button>

                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>
