<script setup>
import { ref } from "vue";
import { usePrimeVue } from "primevue/config";
import { useToast } from "primevue/usetoast";
import axios from "axios";
import { useStudentStore, useParentStore } from "@/store/Store";
const toast = useToast();
const $primevue = usePrimeVue();
const currentStep = ref("1");
const studentStore = useStudentStore();
const parentStore = useParentStore();

const initialStudentIdentityValues = ref({
    card_num: "",
    degree_num: "",
})
const initialStudentValues = ref({
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
const initialParentIdentityValues = ref({
    student_id: "",
})
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

})
initialStudentValues.value = studentStore.student;
initialStudentIdentityValues.value.card_num = studentStore.student.card_num;
initialStudentIdentityValues.value.degree_num = studentStore.student.degree_num;

initialParentValues.value = parentStore.parent;
initialParentIdentityValues.value.student_id = parentStore.parent.student_id;
initialStudentValues.value.gender = studentStore.student.gender.toString();
initialParentValues.value.father_life_status = Number(parentStore.parent.father_life_status).toString();
initialParentValues.value.mother_life_status = Number(parentStore.parent.mother_life_status).toString();

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
    { name: "ខ្មែរ", code: "ខ្មែរ" }
]);
const dropdownItemsethnicity = ref([
    { name: "Khmer", code: "khmer" },
    { name: "ខ្មែរ", code: "ខ្មែរ" }
]);
const onFormSubmit = async () => {
    initialStudentValues.value.full_name_en = initialStudentValues.value.first_name_en + " " + initialStudentValues.value.last_name_en;
    initialStudentValues.value.full_name_kh = initialStudentValues.value.first_name_kh + " " + initialStudentValues.value.last_name_kh;
    initialStudentValues.value.birth_date = formatStudentBirthDate(initialStudentValues.value.birth_date);
    initialParentValues.value.father_birth_year = formatParentBirthDate(initialParentValues.value.father_birth_year);
    initialParentValues.value.mother_birth_year = formatParentBirthDate(initialParentValues.value.mother_birth_year);
    await axios.put(`http://localhost:8888/api/v1/students/${studentStore.student.card_num}`, initialStudentValues.value)
        .then((response) => {
            if (response.status === 202) {
                axios.put(`http://localhost:8888/api/v1/parents/${parentStore.parent.student_id}`, initialParentValues.value).then((res) => {
                    if (res.status === 202) {
                        toast.add({
                            severity: "success",
                            summary: "Success",
                            detail: "Student Information Updated",
                            life: 3000,
                        });
                    }
                }).catch((error) => {
                    toast.add({
                        severity: "error",
                        summary: "Error",
                        detail: "Student Information Update Failed",
                        life: 3000,
                    });
                });

            }
        }).catch((error) => {
            toast.add({
                severity: "error",
                summary: "Error",
                detail: "Student Information Update Failed",
                life: 3000,
            });
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
};
const formatParentBirthDate = (brithdate) => {
    if (brithdate) {
        const date = new Date(brithdate);
        const year = date.getFullYear();
        brithdate = `${year}`;
    }
    return brithdate;
};

initialParentValues.value.father_birth_year = formatParentBirthDate(initialParentValues.value.father_birth_year);
initialParentValues.value.mother_birth_year = formatParentBirthDate(initialParentValues.value.mother_birth_year);

</script>

<template>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full">

            <div class="card">
                <Stepper :value="currentStep">
                    <StepList>
                        <Step value="1">Student Info.</Step>
                        <Step value="2">Summary Info</Step>
                    </StepList>

                    <Form @submit="onFormSubmit">
                        <StepPanels>
                            <StepPanel value="1" class="p-4">
                                <!-- Student Info -->
                                <div>
                                    <h1>Update</h1>
                                    <div>
                                        <!-- Part 1-->
                                        <div class="w-full grid grid-cols-2 gap-4">
                                            <div>
                                                <IftaLabel class="w-full mb-4">
                                                    <label for="phonenumber">Card Number</label>
                                                    <InputText id="phonenumber" v-model="initialStudentIdentityValues.card_num
                                                        " type="text" class="w-full" disabled />
                                                </IftaLabel>
                                                <Toast />
                                                <FileUpload disabled name="demo[]" url="/api/upload" @upload="
                                                    onTemplatedUpload
                                                " :multiple="false" accept="image/*" :maxFileSize="1000000" @select="
                                                    onSelectedFiles
                                                ">
                                                    <template #header="{
                                                        chooseCallback,
                                                        uploadCallback,
                                                        clearCallback,
                                                        files,
                                                    }">
                                                        <div class="flex justify-between items-center gap-4">
                                                            <div class="flex gap-2">
                                                                <Button @click="
                                                                    chooseCallback()
                                                                    " icon="pi pi-image" rounded outlined
                                                                    severity="secondary"></Button>
                                                                <Button @click="
                                                                    uploadEvent(
                                                                        uploadCallback
                                                                    )
                                                                    " icon="pi pi-cloud-upload" rounded outlined
                                                                    severity="success" :disabled="!files ||
                                                                        files.length ===
                                                                        0
                                                                        "></Button>
                                                                <Button @click="
                                                                    clearCallback()
                                                                    " icon="pi pi-times" rounded outlined
                                                                    severity="danger" :disabled="!files ||
                                                                        files.length ===
                                                                        0
                                                                        "></Button>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template #content="{
                                                        files,
                                                        uploadedFiles,
                                                        removeUploadedFileCallback,
                                                        removeFileCallback,
                                                    }">
                                                        <div class="pt-4">
                                                            <div v-if="
                                                                files.length >
                                                                0
                                                            ">
                                                                <h5>
                                                                    Pending
                                                                </h5>
                                                                <div
                                                                    class="p-4 border rounded flex flex-col items-center gap-4">
                                                                    <img role="presentation" :alt="files[0]
                                                                        .name
                                                                        " :src="files[0]
                                                                            .objectURL
                                                                            " width="100" height="50" />
                                                                    <span
                                                                        class="font-semibold text-ellipsis max-w-60 overflow-hidden">{{
                                                                            files[0]
                                                                                .name
                                                                        }}</span>
                                                                    <div>
                                                                        {{
                                                                            formatSize(
                                                                                files[0]
                                                                                    .size
                                                                            )
                                                                        }}
                                                                    </div>
                                                                    <Badge value="Pending" severity="warn" />
                                                                    <Button icon="pi pi-times" @click="
                                                                        removeFileCallback(
                                                                            0
                                                                        )
                                                                        " outlined rounded severity="danger" />
                                                                </div>
                                                            </div>

                                                            <div v-if="
                                                                uploadedFiles.length >
                                                                0
                                                            ">
                                                                <h5>
                                                                    Completed
                                                                </h5>
                                                                <div
                                                                    class="p-4 border rounded flex flex-col items-center gap-4">
                                                                    <img role="presentation" :alt="uploadedFiles[0]
                                                                        .name
                                                                        " :src="uploadedFiles[0]
                                                                            .objectURL
                                                                            " width="100" height="50" />
                                                                    <span
                                                                        class="font-semibold text-ellipsis max-w-60 overflow-hidden">{{
                                                                            uploadedFiles[0]
                                                                                .name
                                                                        }}</span>
                                                                    <div>
                                                                        {{
                                                                            formatSize(
                                                                                uploadedFiles[0]
                                                                                    .size
                                                                            )
                                                                        }}
                                                                    </div>
                                                                    <Badge value="Completed" class="mt-4"
                                                                        severity="success" />
                                                                    <Button icon="pi pi-times" @click="
                                                                        removeUploadedFileCallback(
                                                                            0
                                                                        )
                                                                        " outlined rounded severity="danger" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template #empty>
                                                        <div class="flex items-center justify-center flex-col">
                                                            <i
                                                                class="pi pi-cloud-upload border-2 rounded-full p-8 text-4xl text-muted-color" />
                                                            <p class="mt-6 mb-0">
                                                                Drag and
                                                                drop a file
                                                                here to
                                                                upload.
                                                            </p>
                                                        </div>
                                                    </template>
                                                </FileUpload>
                                                <div class="flex flex-wrap gap-4 my-8 items-center">
                                                    <span>Gender</span>
                                                    <div class="flex items-center gap-2">
                                                        <RadioButton v-model="initialStudentValues.gender"
                                                            inputId="male" name="gender" value="1" />
                                                        <label for="male">Male</label>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <RadioButton v-model="initialStudentValues.gender"
                                                            inputId="female" name="gender" value="0" />
                                                        <label for="female">Female</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="grid">
                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <label for="phonenumber">Degree Number</label>
                                                        <InputText id="phonenumber" v-model="initialStudentIdentityValues.degree_num
                                                            " type="text" class="w-full" disabled />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="firstnameEN">Firstname
                                                            EN</label>
                                                        <InputText id="firstnameEN" v-model="initialStudentValues.first_name_en
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="lastnameEN">Lastname
                                                            EN</label>
                                                        <InputText id="lastnameEN" v-model="initialStudentValues.last_name_en
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="firstnameKH">Firstname
                                                            KH</label>
                                                        <InputText id="firstnameKH" v-model="initialStudentValues.first_name_kh
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="lastnameKH">Lastname
                                                            KH</label>
                                                        <InputText id="lastnameKH" v-model="initialStudentValues.last_name_kh
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <DatePicker id="dob" v-model="initialStudentValues.birth_date"
                                                            class="w-full" dateFormat="dd-mm-yy" show-icon
                                                            iconDisplay="input" />
                                                        <label for="dob">Date Of
                                                            Birth</label>
                                                    </IftaLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Part 2-->
                                        <div class="w-full grid grid-cols-2 gap-4 my-5">
                                            <div>
                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <Select id="nationality" v-model="initialStudentValues.nationality
                                                            " :options="dropdownItemsnationality
                                                                " optionLabel="name" optionValue="code"
                                                            placeholder="Select One" class="w-full" />
                                                        <label for="nationality">Nationality</label>
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full" disable>
                                                        <label for="nationalitynumber">Nationality
                                                            Number</label>
                                                        <InputText id="nationalitynumber" v-model="initialStudentValues.NationalityNumber
                                                            " type="text" class="w-full" disabled />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="bac2gy">BACII Graduated Year</label>
                                                        <InputText id="bac2gy" v-model="initialStudentValues.bac2gy
                                                            " type="text" class="w-full" disabled />
                                                    </IftaLabel>
                                                    <InputGroup>
                                                        <InputGroup>
                                                            <IftaLabel class="w-full">
                                                                <label for="pob">Place Of Birth</label>
                                                                <InputText id="pob"
                                                                    style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                                                    v-model="initialStudentValues.place_of_birth" />
                                                            </IftaLabel>
                                                        </InputGroup>
                                                        <InputGroup>
                                                            <IftaLabel class="w-full">
                                                                <Select id="pobprovince"
                                                                    v-model="initialStudentValues.place_of_birth_province"
                                                                    :options="dropdownItemsprovince
                                                                        " optionLabel="name" optionValue="code"
                                                                    placeholder="Select One" class="w-full"
                                                                    style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;" />
                                                                <label for="pobprovince">Province</label>
                                                            </IftaLabel>
                                                        </InputGroup>
                                                    </InputGroup>
                                                    <IftaLabel class="w-full">
                                                        <label for="currentjob">Current Job</label>
                                                        <InputText id="currentjob" v-model="initialStudentValues.job
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="phonenumber">Phone Number</label>
                                                        <InputText id="phonenumber" v-model="initialStudentValues.telephone
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>

                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <Select id="pob" v-model="initialStudentValues.ethnicity
                                                            " :options="dropdownItemsethnicity
                                                                " optionLabel="name" optionValue="code"
                                                            placeholder="Select One" class="w-full" />
                                                        <label for="pob">Ethnicity</label>
                                                    </IftaLabel>
                                                    <InputGroup>
                                                        <InputGroup>
                                                            <IftaLabel class="w-full">
                                                                <label for="highschooln">Hign school
                                                                    name</label>
                                                                <InputText id="highschooln"
                                                                    style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                                                    disabled />
                                                            </IftaLabel>
                                                        </InputGroup>
                                                        <InputGroup>
                                                            <IftaLabel class="w-full">
                                                                <Select id="highschoolprovince" v-model="initialStudentValues.highschoolprovince
                                                                    " :options="dropdownItemsprovince
                                                                        " optionLabel="name" optionValue="code"
                                                                    placeholder="Select One" class="w-full" disabled
                                                                    style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;" />
                                                                <label for="highschoolprovince">Province</label>
                                                            </IftaLabel>
                                                        </InputGroup>
                                                    </InputGroup>
                                                    <IftaLabel class="w-full">
                                                        <label for="bac2cn">BACII Certificate Number</label>
                                                        <InputText id="bac2cn" v-model="initialStudentValues.bac2certificatenumber
                                                            " type="text" class="w-full" disabled />
                                                    </IftaLabel>
                                                    <InputGroup>
                                                        <InputGroup>
                                                            <IftaLabel class="w-full">
                                                                <label for="curraddress">Current Address</label>
                                                                <InputText id="curraddress"
                                                                    style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                                                    v-model="initialStudentValues.address" />
                                                            </IftaLabel>
                                                        </InputGroup>
                                                        <InputGroup>
                                                            <IftaLabel class="w-full">
                                                                <Select id="currprovince" v-model="initialStudentValues.address_province
                                                                    " :options="dropdownItemsprovince
                                                                        " optionLabel="name" optionValue="code"
                                                                    placeholder="Select One" class="w-full"
                                                                    style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;" />
                                                                <label for="currprovince">Province</label>
                                                            </IftaLabel>
                                                        </InputGroup>
                                                    </InputGroup>
                                                    <IftaLabel class="w-full">
                                                        <label for="jobp">Job place</label>
                                                        <InputText id="jobp" v-model="initialStudentValues.jobplace
                                                            " type="text" class="w-full" disabled />
                                                    </IftaLabel>
                                                    <div class="flex flex-wrap gap-4 my-8 items-center">
                                                        <span>Family Status</span>
                                                        <div class="flex items-center gap-2">
                                                            <RadioButton inputId="familystatussigle" name="familystatus"
                                                                value="1" disabled />
                                                            <label for="familystatussigle">Single</label>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <RadioButton inputId="familystatusmarried"
                                                                name="familystatus" value="0" disabled />
                                                            <label for="familystatusmarried">married</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Parent Info -->
                                <div>
                                    <h1>Family Status</h1>
                                    <div>
                                        <div class="w-full grid grid-cols-2 gap-4 my-5">
                                            <div>
                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <label for="fathername">Father name</label>
                                                        <InputText id="fathername" v-model="initialParentValues.father_name
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <Select id="fathernationality" v-model="initialParentValues.father_nationality
                                                            " :options="dropdownItemsnationality
                                                                " optionLabel="name" optionValue="code"
                                                            placeholder="Select One" class="w-full" />
                                                        <label for="fathernationality">Nationality</label>
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="fatherphonenumber">Phone Number</label>
                                                        <InputText id="fatherphonenumber" v-model="initialParentValues.father_telephone
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <div class="flex flex-wrap gap-4 my-8 items-center">
                                                        <span>Status</span>
                                                        <div class="flex items-center gap-2">
                                                            <RadioButton
                                                                v-model="initialParentValues.father_life_status"
                                                                inputId="fatherstatuslive" name="fatherstatus"
                                                                value="1" />
                                                            <label for="fatherstatuslive">Live</label>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <RadioButton
                                                                v-model="initialParentValues.father_life_status"
                                                                inputId="fatherstatusdie" name="fatherstatus"
                                                                value="0" />
                                                            <label for="fatherstatusdie">Die</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <DatePicker id="fatherdob" v-model="initialParentValues.father_birth_year
                                                            " class="w-full" view="year" dateFormat="yy" show-icon
                                                            iconDisplay="input" />
                                                        <label for="fatherdob">Date Of
                                                            Birth</label>
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <Select id="fatherethnicity" v-model="initialParentValues.father_ethnicity
                                                            " :options="dropdownItemsethnicity
                                                                " optionLabel="name" optionValue="code"
                                                            placeholder="Select One" class="w-full" />
                                                        <label for="fatherethnicity">Ethnicity</label>
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="fatherjob">Job</label>
                                                        <InputText id="fatherjob" v-model="initialParentValues.father_job
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="w-full grid grid-cols-2 gap-4 my-5">
                                            <div>
                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <label for="mothername">Mother name</label>
                                                        <InputText id="mothername" v-model="initialParentValues.mother_name
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <Select id="mothernationality" v-model="initialParentValues.mother_nationality
                                                            " :options="dropdownItemsnationality
                                                                " optionLabel="name" optionValue="code"
                                                            placeholder="Select One" class="w-full" />
                                                        <label for="mothernationality">Nationality</label>
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="motherphonenumber">Phone Number</label>
                                                        <InputText id="motherphonenumber" v-model="initialParentValues.mother_telephone
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <div class="flex flex-wrap gap-4 my-8 items-center">
                                                        <span>Status</span>
                                                        <div class="flex items-center gap-2">
                                                            <RadioButton
                                                                v-model="initialParentValues.mother_life_status"
                                                                inputId="motherstatuslive" name="motherstatus"
                                                                value="1" />
                                                            <label for="motherstatuslive">Live</label>
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <RadioButton
                                                                v-model="initialParentValues.mother_life_status"
                                                                inputId="motherstatusdie" name="monterstatus"
                                                                value="0" />
                                                            <label for="motherstatusdie">Die</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <DatePicker id="motherdob" v-model="initialParentValues.mother_birth_year
                                                            " class="w-full" view="year" dateFormat="yy" show-icon
                                                            iconDisplay="input" />
                                                        <label for="motherdob">Date Of
                                                            Birth</label>
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <Select id="motherethnicity" v-model="initialParentValues.mother_ethnicity
                                                            " :options="dropdownItemsethnicity
                                                                " optionLabel="name" optionValue="code"
                                                            placeholder="Select One" class="w-full" />
                                                        <label for="motherethnicity">Ethnicity</label>
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="motherjob">Job</label>
                                                        <InputText id="motherjob" v-model="initialParentValues.mother_job
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex pt-6 justify-end w-full">
                                    <Button label="Next" icon="pi pi-arrow-right" iconPos="right" class="w-full"
                                        @click="nextStep('2')" />
                                </div>
                            </StepPanel>
                            <StepPanel value="2">
                                <div class="flex h-48 justify-center items-center rounded font-medium">
                                    Summary Information (To be added)
                                </div>
                                <div class="flex pt-6 justify-between">
                                    <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                        @click="nextStep('1')" />
                                    <Button type="submit" label="Submit" />
                                </div>
                            </StepPanel>


                        </StepPanels>
                    </Form>
                </Stepper>
            </div>
        </div>
    </Fluid>
</template>
