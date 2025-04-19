<script setup>
import { useToast } from "primevue/usetoast";
import { usePrimeVue } from "primevue/config";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const toast = useToast();
const $primevue = usePrimeVue();
const currentStep = ref("1");
const initialStaffValues = ref({
    full_name_en: "",
    full_name_kh: "",
    gender: "",
    birth_date: "",
    place_of_birth: "",
    place_of_birth_province: "",
    email: "",
    telephone: "",
    foreigner: false,
    functional: [""],
    hired_date: "",
});
const initialFamilyValues = ref({
    wife_or_husband_name: "",
    birth_year: "",
    total_children: "",
    total_duaghter: "",
    unit: "",
    phonenumber: "",
    life_status: "",
    job: "",
    telephone: "",

})
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

const functionals = ref([
    {title: "Do you want to assign this staff member as an academic staff?", key: "1"},
    {title: "Do you want to assign this staff member as an office staff?", key: "2"},
    {title: "Do you also want to assign this staff member as a human resources management staff?", key: "3"},
]);
const onClickPreviousPage = () => {
    router.push("/administrationmanagement/staff-list")
}
const onFormSubmit = async () => {


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


</script>

<template>
    <Fluid class="flex flex-row mb-5">
        <div class="w-full">
            <div class="card flex justify-between" style="padding: 1rem 2rem 0.3rem 2rem;">
                <div>
                    <h5>Staff Information :&nbsp; Staff A </h5>
                </div>
                <div>
                    <Button icon="pi pi-times" severity="danger" aria-label="Cancel" @click="onClickPreviousPage" />
                </div>

            </div>

        </div>
    </Fluid>

    <Fluid class="flex flex-row gap-8">
        <div class="w-full">
            <div class="card">
                <Form @submit="onFormSubmit">
                    <!-- Student Info -->
                    <div>
                        <h4>Personal Information</h4>
                        <div>
                            <!-- Part 1-->
                            <div class="w-full grid grid-cols-2 gap-4">
                                <div>
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
                                                        " icon="pi pi-cloud-upload" rounded outlined severity="success"
                                                        :disabled="!files ||
                                                            files.length ===
                                                            0
                                                            "></Button>
                                                    <Button @click="
                                                        clearCallback()
                                                        " icon="pi pi-times" rounded outlined severity="danger"
                                                        :disabled="!files ||
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
                                                    <div class="p-4 border rounded flex flex-col items-center gap-4">
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
                                                    <div class="p-4 border rounded flex flex-col items-center gap-4">
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
                                                        <Badge value="Completed" class="mt-4" severity="success" />
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
                                    <div class="flex flex-wrap gap-4 my-8 items-center justify-between">
                                        <div class="flex flex-row gap-4 items-center justify-start">
                                            <span>Gender</span>
                                            <div class="flex items-center gap-2">
                                                <RadioButton v-model="initialStaffValues.gender" inputId="male"
                                                    name="gender" value="1" />
                                                <label for="male">Male</label>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <RadioButton v-model="initialStaffValues.gender" inputId="female"
                                                    name="gender" value="0" />
                                                <label for="female">Female</label>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center gap-2">
                                                <Checkbox v-model="initialStaffValues.foreigner" inputId="foreigner"
                                                    name="foreigner" value="foreigner" />
                                                <label for="foreigner"> Foreigner </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div class="grid">
                                    <div class="flex flex-col gap-4 w-full">
                                        <IftaLabel class="w-full">
                                            <label for="fullnameEN">Fullname
                                                EN</label>
                                            <InputText id="fullnameEN" v-model="initialStaffValues.full_name_en
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                        <IftaLabel class="w-full">
                                            <label for="fullnameKH">Fullname KH</label>
                                            <InputText id="fullnameKH" v-model="initialStaffValues.full_name_kh
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                        <IftaLabel class="w-full">
                                            <DatePicker id="dob" v-model="initialStaffValues.birth_date"
                                                class="w-full" dateFormat="dd-mm-yy" show-icon iconDisplay="input" />
                                            <label for="dob">Date Of
                                                Birth</label>
                                        </IftaLabel>
                                        <IftaLabel class="w-full">
                                            <label for="telephone">Phonenumber
                                            </label>
                                            <InputText id="telephone" v-model="initialStaffValues.telephone
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                        <IftaLabel class="w-full">
                                            <label for="email">Email Address</label>
                                            <InputText id="email" v-model="initialStaffValues.email
                                                " type="text" class="w-full" />
                                        </IftaLabel>

                                    </div>
                                </div>
                            </div>
                            <!-- Part 2-->
                            <div class="w-full grid grid-cols-2 gap-4 my-5">
                                <div>
                                    <h5>Set Functional</h5>
                                    <div class="flex flex-col gap-4 w-full">
                                        <div v-for="functional of functionals" :key="functional.key"
                                            class="flex items-center gap-2">
                                            <Checkbox v-model="initialStaffValues.functional" :inputId="functional.key"
                                                name="functional" :value="functional.title" />
                                            <label :for="functional.key">{{ functional.title }}</label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-col gap-4 w-full">

                                        <InputGroup>
                                            <InputGroup>
                                                <IftaLabel class="w-full">
                                                    <InputText id="pob"
                                                        style="border-top-right-radius: 0px; border-bottom-right-radius: 0px;"
                                                        v-model="initialStaffValues.place_of_birth" />
                                                    <label for="pob">Place of Birth</label>
                                                </IftaLabel>
                                            </InputGroup>
                                            <InputGroup>
                                                <IftaLabel class="w-full">
                                                    <Select id="pobp" v-model="initialStaffValues.place_of_birth_province
                                                        " :options="dropdownItemsprovince
                                                            " optionLabel="name" optionValue="code"
                                                        placeholder="Select One" class="w-full"
                                                        style="border-top-left-radius: 0px; border-bottom-left-radius: 0px;" />
                                                    <label for="pobp">Province</label>
                                                </IftaLabel>
                                            </InputGroup>
                                        </InputGroup>
                                        <IftaLabel class="w-full">
                                            <DatePicker id="hod" v-model="initialStaffValues.hired_date"
                                                class="w-full" dateFormat="dd-mm-yy" show-icon iconDisplay="input" />
                                            <label for="hod">Hired Date</label>
                                        </IftaLabel>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Parent Info -->
                    <div>
                        <h4>Family Information</h4>
                        <div>
                            <div class="w-full grid grid-cols-2 gap-4 my-5">
                                <div>
                                    <div class="flex flex-col gap-4 w-full">
                                        <IftaLabel class="w-full">
                                            <label for="worhname">Wife or Husband Name</label>
                                            <InputText id="worhname" v-model="initialFamilyValues.father_name
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                        <div class="flex flex-wrap gap-4 my-4 items-center">
                                            <span>Status</span>
                                            <div class="flex items-center gap-2">
                                                <RadioButton v-model="initialFamilyValues.life_status"
                                                    inputId="statuslive" name="status" value="1" />
                                                <label for="statuslive">Live</label>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <RadioButton v-model="initialFamilyValues.life_status"
                                                    inputId="statusdie" name="status" value="0" />
                                                <label for="statusdie">Die</label>
                                            </div>
                                        </div>

                                        <IftaLabel class="w-full">
                                            <label for="job">Job</label>
                                            <InputText id="job" v-model="initialFamilyValues.job
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                        <IftaLabel class="w-full">
                                            <label for="totalchildren">Total children</label>
                                            <InputText id="totalchildren" v-model="initialFamilyValues.total_children
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                    </div>
                                </div>
                                <div>
                                    <div class="flex flex-col gap-4 w-full">
                                        <IftaLabel class="w-full">
                                            <DatePicker id="dob" v-model="initialFamilyValues.birth_year
                                                " class="w-full"  show-icon
                                                iconDisplay="input" />
                                            <label for="dob">Date Of
                                                Birth</label>
                                        </IftaLabel>

                                        <IftaLabel class="w-full">
                                            <label for="phonenumber">Phonenumber</label>
                                            <InputText id="phonenumber" v-model="initialFamilyValues.phonenumber
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                        <IftaLabel class="w-full">
                                            <label for="unit">Unit</label>
                                            <InputText id="unit" v-model="initialFamilyValues.unit
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                        <IftaLabel class="w-full">
                                            <label for="totaldaughter">Total Duaghter</label>
                                            <InputText id="totaldaughter" v-model="initialFamilyValues.total_duaghter
                                                " type="text" class="w-full" />
                                        </IftaLabel>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- <div class="flex pt-6 justify-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="nextStep('1')" />
                        <Button type="submit" label="Submit" />
                    </div> -->

                </Form>
            </div>
        </div>
    </Fluid>
</template>
