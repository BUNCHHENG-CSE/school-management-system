<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { computed } from "vue";
import axios from "axios";


const toast = useToast();
const degreeDialog = ref(false);
const submitted = ref(false);
const initialDegree = ref([
    { name: "Bachelor's Degree", studyperiodyear: 4, studyperiodsemester: 8, credits: 120 },
    { name: "Master's Degree", studyperiodyear: 2, studyperiodsemester: 4, credits: 45 },
    { name: "Doctoral Degree", studyperiodyear: 3, studyperiodsemester: 6, credits: 54 },
    { name: "Short Course", studyperiodyear: 1, studyperiodsemester: 2, credits: 45 },
]);

const onClickCreate = () => {
    // router.push({
    //     path: "/studymanagement/room-management/buildings-creation",
    // });
    submitted.value = false;
    degreeDialog.value = true;
};
</script>

<template>
    <Toast />
    <Fluid class="flex flex-row mb-5">
        <div class="w-full">
            <div class="card" style="padding: 1rem 2rem 0.3rem 2rem;">
                <h5>Degree</h5>
            </div>
        </div>
    </Fluid>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full ">
            <div class="card">
                <Toolbar class="mb-6" style="border: none !important;">
                <template #end>
                    <Button label="New" icon="pi pi-plus" class="mr-2" @click="onClickCreate" />
                </template>
            </Toolbar>
                <DataTable :value="initialDegree" tableStyle="min-width: 50rem">
                    <Column field="name" header="Name"></Column>
                    <Column field="studyperiodyear" header="Study Period ( year )"></Column>
                    <Column field="studyperiodsemester" header="Study Period ( semester )"></Column>
                    <Column field="credits" header="Credit"></Column>
                    <Column class="w-24 !text-end">
                        <template #body="{ data }">
                            <Button icon="pi pi-search" @click="selectRow(data)" severity="secondary" rounded></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </Fluid>
    <Dialog v-model:visible="degreeDialog" :style="{ width: '90%', maxWidth: '1400px' }"
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
