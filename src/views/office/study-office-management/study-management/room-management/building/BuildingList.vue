<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";

onMounted(() => {
    axios
        .get(`${import.meta.env.VITE_API_URL}/api/v1/buildings`)
        .then((response) => {
            if (response.status === 200) {
                buildings.value = response.data.data;
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


const productDialog = ref(false);
const submitted = ref(false);
const searchValue = ref("");
const buildings = ref([]);

const onSearch = () => {
    console.log(searchValue.value);
};

const onClickCreate = () => {
    // router.push({
    //     path: "/studymanagement/room-management/buildings-creation",
    // });
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
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
                    <h5 class="m-0">Building Management</h5>
                </div>
            </div>
        </Fluid>
        <div class="card">
            <Toolbar class="mb-6" style="border: none !important;">
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
            <DataTable :value="buildings" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
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
        <Dialog v-model:visible="productDialog" :style="{ width: '90%', maxWidth: '1400px' }"
            :class="'bg-white shadow-lg rounded-lg p-4'" header="Building" :modal="true">

            <template #default>
                <div class="flex flex-col md:flex-row gap-6">
                    <!-- Left Side (Image) -->
                    <div class="w-full md:w-1/2 flex flex-col items-center p-4">
                        <img src="/public/rupp_logo.png" alt="Logo" class="w-20 h-20 mb-4">
                        <h2 class="text-center font-bold text-lg">Royal University Of Phnom Penh</h2>
                        <img src="/public/illustration.png" alt="Illustration" class="w-3/4 mt-4 object-contain">
                    </div>

                    <!-- Right Side (Form) -->
                    <div class="w-full md:w-1/2 p-4 space-y-4 min-w-0">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Scholarship Information -->
                            <div>
                                <h3 class="font-bold text-lg mb-2">Scholarship Information</h3>
                                <div class="flex flex-col gap-4 w-full">
                                    <IftaLabel class="w-full">
                                        <label for="name">Scholarship Name</label>
                                        <InputText id="name" type="text" class="w-full" />
                                    </IftaLabel>

                                    <IftaLabel class="w-full">
                                        <InputNumber id="budget" inputId="stacked-buttons" showButtons mode="currency"
                                            :min-fraction-digits="2" :max-fraction-digits="2" locale="en-US"
                                            currency="USD" fluid :step="10" />
                                        <label for="budget">Budget Scholarship</label>
                                    </IftaLabel>

                                    <IftaLabel class="w-full">
                                        <InputNumber id="total" name="amount" fluid />
                                        <label for="total">Total Scholarship</label>
                                    </IftaLabel>

                                    <IftaLabel>
                                        <Textarea id="description" rows="4" cols="30" style="resize: none" fluid />
                                        <label for="description">Description</label>
                                    </IftaLabel>
                                </div>
                            </div>

                            <!-- Sponsor Information -->
                            <div>
                                <h3 class="font-bold text-lg mb-2">Sponsor Information</h3>
                                <div class="flex flex-col gap-4 w-full">
                                    <IftaLabel class="w-full">
                                        <label for="sponsor_name">Sponsor Name</label>
                                        <InputText id="sponsor_name" type="text" class="w-full" />
                                    </IftaLabel>
                                    <IftaLabel class="w-full">
                                        <label for="sponsor_telephone">Sponsor Telephone</label>
                                        <InputText id="sponsor_telephone" type="text" class="w-full" />
                                    </IftaLabel>
                                </div>
                            </div>
                        </div>

                        <!-- Buttons -->
                        <div class="flex justify-end gap-2 pt-4">
                            <button class="bg-gray-200 text-gray-700 px-6 py-2 rounded-md">Cancel</button>
                            <button class="bg-blue-500 text-white px-6 py-2 rounded-md">Save</button>
                        </div>
                    </div>
                </div>
            </template>
        </Dialog>
    </div>
</template>
