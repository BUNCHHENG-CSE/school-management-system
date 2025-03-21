<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { computed } from "vue";
import axios from "axios";


const toast = useToast();
const dt = ref(null);
const selectedstudents = ref();
const router = useRouter();
const showPaginator = computed(() => students.value.length > 10);
const academicyears = ref();
const dropdownItemsYear = ref([
    { name: "Year 1", code: "year1" },
    { name: "Year 2", code: "year2" },
    { name: "Year 3", code: "year3" },
    { name: "Year 4", code: "year4" },
]);
const dropdownItemsDegree = ref([
    { name: "Bachelor", code: "bachelor" },
    { name: "Master", code: "master" },
    { name: "Doctor", code: "doctor" },
]);
const onFormSubmit = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/academic-years`).then((response) => {
        console.log(response.data.data);
        academicyears.value = response.data.data;
    });
};


// const sendPrompt = (card_num) => {

//     router.push({
//         path: '/studymanagement/student/student-information', state: { message: card_num }
//     });
// };

</script>

<template>
    <Toast />
    <Fluid class="flex flex-row mb-5">
        <div class="w-full">
            <div class="card" style="padding: 1rem 2rem 0.3rem 2rem;">
                <h5>Study Year</h5>
            </div>
        </div>
    </Fluid>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full ">
            <div class="card">
                <div>
                    <Form @submit="onFormSubmit">
                        <div class="flex flex-row gap-3 justify-end">
                            <IftaLabel class="w-full">
                                <Select id="nationality" v-model="s
                                    " :options="dropdownItemsYear
                                        " optionLabel="name" optionValue="code" placeholder="Select One"
                                    class="w-full" />
                                <label for="nationality">Year</label>
                            </IftaLabel>
                            <IftaLabel class="w-full">
                                <Select id="nationality" v-model="s
                                    " :options="dropdownItemsDegree
                                        " optionLabel="name" optionValue="code" placeholder="Select One"
                                    class="w-full" />
                                <label for="nationality">Degree</label>
                            </IftaLabel>
                            <Button type="submit" label="Search" icon="pi pi-search" />
                        </div>
                    </Form>
                </div>
                <!-- <div>
                    <div v-if="students.length">
                        <div class="card">
                            <Toolbar class="mb-6" style="border: none;">
                                <template #end>
                                    <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import"
                                        customUpload chooseLabel="Import" class="mr-2" auto
                                        :chooseButtonProps="{ severity: 'secondary' }" />
                                    <Button label="Export" icon="pi pi-upload" severity="secondary"
                                        @click="exportCSV($event)" />
                                </template>
</Toolbar>

<DataTable ref="dt" v-model:selection="selectedstudents" :value="students" dataKey="id" :paginator="showPaginator"
    :rows="10"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students">
    <template #header>
                                    <div class="flex flex-wrap gap-2 items-center justify-between">
                                        <h4 class="m-0">Student </h4>
                                    </div>
                                </template>
    <Column field="card_num" header="Card Number" style="min-width: 12rem">
    </Column>
    <Column field="full_name_en" header="Name En" style="min-width: 16rem">
    </Column>
    <Column field="full_name_kh" header="Name KH" style="min-width: 8rem">
    </Column>
    <Column field="degree_num" header="Degree Number" style="min-width: 10rem">
    </Column>
    <Column class="w-24 !text-end">
        <template #body="{ data }">
                                        <Button icon="pi pi-search" @click="sendPrompt(data.card_num)" />
                                    </template>
    </Column>
</DataTable>

</div>
</div>
<div v-else>
    <div class="card text-center">

        <h5> No student available</h5>
    </div>
</div>
</div> -->
                <DataTable :value="academicyears" :frozenValue="lockedCustomers" scrollable scrollHeight="400px" :pt="{
                    table: { style: 'min-width: 50rem' },
                    bodyrow: ({ data }) => ({
                        class: { 'font-bold': data.activate }
                    })
                }">

                    <Column field="data.label" header="Name"></Column>
                    <Column field="data.start_date" header="Country"></Column>
                    <Column field="data.end_date" header="Representative"></Column>

                    <!-- <Column field="data.activate" header="Status">
                        <template #body="{ data }">
                            <span :class="statusClass(data.activate)">
                                {{ data.activate ? 'Active' : 'Inactive' }}
                            </span>
                        </template>
                    </Column>

                    <Column style="flex: 0 0 4rem">
                        <template #body="{ data }">
                            <Button type="button" :icon="lockIcon(data.activate)" text size="small"
                                :disabled="!data.activate" />
                        </template>
                    </Column> -->

                </DataTable>

            </div>
        </div>
    </Fluid>
</template>
