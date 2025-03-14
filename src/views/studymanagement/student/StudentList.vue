<script setup>
import { ref } from "vue";
import { usePrimeVue } from "primevue/config";
import { useToast } from "primevue/usetoast";
import axios from "axios";

const toast = useToast();
const $primevue = usePrimeVue();
const currentStep = ref("1");

const initialStudentValues = ref({
    card_num: "",
    degree_num: "",
    first_name_en: "",
    last_name_en: "",
    full_name_en: "",
    first_name_kh: "",
    last_name_kh: "",
    full_name_kh: "",
    gender: "",
    nationality: "",
    ethnicity: "",
    birth_date: "",
    place_of_birth: "",
    place_of_birth_province: "",
    address: "",
    address_province: "",
    job: "",
    telephone: "",
});
const initialParentValues = ref({
    father_name: "",
    father_birth_year: "",
    father_nationality: "",
    father_ethnicity: "",
    father_life_status: "",
    father_job: "",
    father_telephone: "",
    mother_name: "",
    mother_birth_year: "",
    mother_nationality: "",
    mother_ethnicity: "",
    mother_life_status: "",
    mother_job: "",
    mother_telephone: "",
    student_id: "",
})
const defaultStudentValues = JSON.parse(JSON.stringify(initialStudentValues.value));
const defaultParentValues = JSON.parse(JSON.stringify(initialParentValues.value));
const dropdownItemsprovince = ref([
    { name: "Banteay Meanchey", code: "Banteay Meanchey" },
    { name: "Battambang", code: "Battambang" },
    { name: "Kampong Cham", code: "Kampong Cham" },
    { name: "Kampong Thom", code: "Kampong Thom" },
    { name: "Kampot", code: "Kampot" },
    { name: "Kandal", code: "Kandal" },
    { name: "Koh Kong", code: "Koh Kong" },
    { name: "Kratie", code: "Kratie" },
    { name: "Mondulkiri", code: "Mondulkiri" },
    { name: "Oddar Meanchey", code: "Oddar Meanchey" },
    { name: "Pailin", code: "Pailin" },
    { name: "Phnom Penh", code: "Phnom Penh" },
    { name: "Preah Vihear", code: "Preah Vihear" },
    { name: "Prey Veng", code: "Prey Veng" },
    { name: "Pursat", code: "Pursat" },
    { name: "Ratanakiri", code: "Ratanakiri" },
    { name: "Siem Reap", code: "Siem Reap" },
    { name: "Sihanoukville", code: "Sihanoukville" },
    { name: "Stung Treng", code: "Stung Treng" },
    { name: "Takeo", code: "Takeo" },
    { name: "Tboung Khmum", code: "Tboung Khmum" }
]);
const dropdownItemsnationality = ref([
    { name: "Khmer", code: "khmer" },
]);
const dropdownItemsethnicity = ref([
    { name: "Khmer", code: "khmer" },
]);
const onFormSubmit = async () => {

    // const response = await axios.get("http://localhost:8888/api/v1/students");
    // console.log(response.data.id);
    initialStudentValues.value.full_name_en = initialStudentValues.value.first_name_en + " " + initialStudentValues.value.last_name_en;
    initialStudentValues.value.full_name_kh = initialStudentValues.value.first_name_kh + " " + initialStudentValues.value.last_name_kh;
    initialStudentValues.value.birth_date = formatStudentBirthDate(initialStudentValues.value.birth_date);
    initialParentValues.value.father_birth_year = formatParentBirthDate(initialParentValues.value.father_birth_year);
    initialParentValues.value.mother_birth_year = formatParentBirthDate(initialParentValues.value.mother_birth_year);

    const response = await axios.post("http://localhost:8888/api/v1/students", initialStudentValues.value)
        .then(response => {
            if (response.status === 201) {
                initialParentValues.value.student_id = response.data.data.id;
                const res = axios.post("http://localhost:8888/api/v1/parents", initialParentValues.value)
                    .then(res => {
                        console.log(res.data);
                        if (res.status === 201) {
                            console.log("Success:", res.data);
                            initialStudentValues.value = JSON.parse(JSON.stringify(defaultStudentValues));
                            initialParentValues.value = JSON.parse(JSON.stringify(defaultParentValues));
                            currentStep.value = "1";
                            alert(res.data.message);
                        } else {
                            console.error("Error:", res.data);
                            alert("Registration failed. Please try again.");
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            } else if (response.status === 400) {
                console.error("Error:", response.data.message);
                alert("Registration failed. Please try again.");
            }
        }).catch(error => {
            console.log(error.message);
            alert("Registration failed. Please try again.");
        });
    currentStep.value = "1";
};

const nextStep = (step) => {
    currentStep.value = step;
};

const onSelectedFiles = (event) => {
    if (event.files.length > 1) {
        event.files.splice(1);
    }
};

const uploadEvent = (callback) => {
    callback();
};

const onTemplatedUpload = () => {
    toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
    });
};

const formatSize = (bytes) => {
    const k = 1024;
    const sizes = $primevue.config.locale.fileSizeTypes;
    if (bytes === 0) return `0 ${sizes[0]}`;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};
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
const formatParentBirthDate = (brithdate) => {
    if (brithdate) {
        const date = new Date(brithdate);
        const year = date.getFullYear();
        brithdate = `${year}`;
    }
    return brithdate;
}
</script>

<template>
    <Fluid class="flex flex-row mb-5">
        <div class="w-full">
            <div class="card" style="padding: 1rem 2rem 0.3rem 2rem;">
                <h5>Student Information</h5>
            </div>
        </div>
    </Fluid>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full">

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
                                <div class="flex flex-row gap-4 justify-end">
                                    <FloatLabel variant="on">
                                        <InputText id="on_label" v-model="value3" />
                                        <label for="on_label">Student ID</label>
                                    </FloatLabel>
                                    <FloatLabel variant="on">
                                        <InputText id="on_label" v-model="value3" />
                                        <label for="on_label">Student ID</label>
                                    </FloatLabel>
                                    <FloatLabel variant="on">
                                        <InputText id="on_label" v-model="value3" />
                                        <label for="on_label">Student ID</label>
                                    </FloatLabel>

                                    <IftaLabel class="w-full">
                                        <DatePicker id="dob" v-model="initialStudentValues.birth_date" class="w-full"
                                            dateFormat="dd-mm-yy" show-icon iconDisplay="input" />
                                        <label for="dob">Date Of
                                            Birth</label>
                                    </IftaLabel>
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
