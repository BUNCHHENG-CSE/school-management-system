<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStudentStore, useParentStore } from "@/store/Store";
import axios from "axios";


const toast = useToast();
const dt = ref(null);
const students = ref([]);
const selectedstudents = ref();
const router = useRouter();
const storeStudent = useStudentStore();
const storeParent = useParentStore();
const showPaginator = computed(() => students.value.length > 10);
const initialStudentValuesSearch = ref({
    stu_card: "",
    name_en: "",
    name_kh: "",
    birth_date: "",

});

const defaultStudentValuesSearch = JSON.parse(JSON.stringify(initialStudentValuesSearch.value));

const onFormSubmit = async () => {
    initialStudentValuesSearch.value.birth_date = formatStudentBirthDate(initialStudentValuesSearch.value.birth_date);
    const filteredValues = Object.fromEntries(
        Object.entries(initialStudentValuesSearch.value)
            .filter(([key, value]) => value !== null && value !== "")
    );
    const params = new URLSearchParams(filteredValues).toString();
    console.log(params);
    const response = await axios.get(`http://localhost:8888/api/v1/students/search?${params}`)
        .then(response => {
            if (response.status === 200) {
                students.value = response.data.data
                toast.add({
                    severity: "success",
                    summary: "Search Success",
                    detail: "Student found",
                    life: 3000,
                });
                initialStudentValuesSearch.value = JSON.parse(JSON.stringify(defaultStudentValuesSearch));
            }
        }).catch(error => {
            console.log(error.message);
            alert("Registration failed. Please try again.");
        });
};
console.log(students.value);
const formatStudentBirthDate = (brithdate) => {
    if (brithdate) {
        const date = new Date(brithdate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        brithdate = `${year}-${month}-${day}`;
    }
    return brithdate;
}
const sendPrompt = (card_num) => {
    storeStudent.resetStudentData();
    storeParent.resetParentData();
    router.push({
        path: '/studymanagement/student/studentinformation', state: { message: card_num }
    });
};

</script>

<template>
    <Toast />
    <Fluid class="flex flex-row mb-5">
        <div class="w-full">
            <div class="card" style="padding: 1rem 2rem 0.3rem 2rem;">
                <h5>Student Information</h5>
            </div>
        </div>
    </Fluid>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full ">
            <div class="card">
                <div>
                    <Tabs value="0">
                        <TabList>
                            <Tab value="0">Find Student</Tab>
                            <Tab value="1">Student List</Tab>
                            <Tab value="2">Export Student</Tab>
                            <Tab value="3">List Student pre-exam</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel value="0">

                                <Form @submit="onFormSubmit">
                                    <div class="flex flex-row gap-4 justify-end">
                                        <IftaLabel>
                                            <InputText id="on_label" v-model="initialStudentValuesSearch.stu_card" />
                                            <label for="on_label">Student Card Number</label>
                                        </IftaLabel>
                                        <IftaLabel>
                                            <InputText id="on_label" v-model="initialStudentValuesSearch.name_en" />
                                            <label for="on_label">Name EN</label>
                                        </IftaLabel>
                                        <IftaLabel>
                                            <InputText id="on_label" v-model="initialStudentValuesSearch.name_kh" />
                                            <label for="on_label">Name KH</label>
                                        </IftaLabel>
                                        <IftaLabel>
                                            <DatePicker id="dob" v-model="initialStudentValuesSearch.birth_date"
                                                class="w-full" dateFormat="dd-mm-yy" show-icon iconDisplay="input" />
                                            <label for="dob">Date Of
                                                Birth</label>
                                        </IftaLabel>
                                        <Button type="submit" label="Search" icon="pi pi-search"
                                            style="width: fit-content;" />
                                    </div>
                                </Form>

                                <div v-if="students.length">
                                    <div class="card">
                                        <Toolbar class="mb-6" style="border: none;">
                                            <template #end>
                                                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000"
                                                    label="Import" customUpload chooseLabel="Import" class="mr-2" auto
                                                    :chooseButtonProps="{ severity: 'secondary' }" />
                                                <Button label="Export" icon="pi pi-upload" severity="secondary"
                                                    @click="exportCSV($event)" />
                                            </template>
                                        </Toolbar>

                                        <DataTable ref="dt" v-model:selection="selectedstudents" :value="students"
                                            dataKey="id" :paginator="showPaginator" :rows="10" :filters="filters"
                                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                            :rowsPerPageOptions="[5, 10, 25]"
                                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students">
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
                            </TabPanel>
                            <TabPanel value="1">
                                <h6>Student List coming soon ...</h6>
                            </TabPanel>
                            <TabPanel value="2">
                                <h6>Export Student coming soon ...</h6>
                            </TabPanel>
                            <TabPanel value="3">
                                <h6>List Student pre-exam coming soon ...</h6>
                            </TabPanel>

                        </TabPanels>
                    </Tabs>

                </div>
            </div>
        </div>
    </Fluid>
</template>
