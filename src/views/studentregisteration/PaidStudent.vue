<script setup>
import { ref } from "vue";
import axios from "axios";
const currentStep = ref("1");

const initialValues = ref({
    firstnameEN: "",
    lastnameEN: "",
    firstnameKH: "",
    lastnameKH: "",
    gender: "",
    dob: "",
    pob: "",
    code: "",
});

const defaultValues = JSON.parse(JSON.stringify(initialValues.value));

const dropdownItems = ref([
    { name: "Phnom Penh", code: "Phnom Penh" },
    { name: "Siem Reap", code: "Siem Reap" },
    { name: "Battambang", code: "Battambang" },
    { name: "Sihanoukville", code: "Sihanoukville" },
    { name: "Kampong Cham", code: "Kampong Cham" },
    { name: "Kampong Thom", code: "Kampong Thom" },
    { name: "Kampot", code: "Kampot" },
    { name: "Kandal", code: "Kandal" },
    { name: "Takeo", code: "Takeo" },
    { name: "Prey Veng", code: "Prey Veng" },
    { name: "Banteay Meanchey", code: "Banteay Meanchey" },
    { name: "Koh Kong", code: "Koh Kong" },
    { name: "Pursat", code: "Pursat" },
    { name: "Preah Vihear", code: "Preah Vihear" },
    { name: "Ratanakiri", code: "Ratanakiri" },
    { name: "Mondulkiri", code: "Mondulkiri" },
    { name: "Stung Treng", code: "Stung Treng" },
    { name: "Kratie", code: "Kratie" },
    { name: "Oddar Meanchey", code: "Oddar Meanchey" },
    { name: "Pailin", code: "Pailin" },
    { name: "Tboung Khmum", code: "Tboung Khmum" },
]);

const onFormSubmit = async () => {
    // try {
    //   const response = await fetch("https://api.example.com/register-student", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(initialValues.value),
    //   });

    //   const result = await response.json();

    //   if (response.ok) {
    //     console.log("Success:", result);
    //     alert("Student registered successfully!");

    //     // Reset the form fields
    //     initialValues.value = JSON.parse(JSON.stringify(defaultValues));

    //     // Redirect to first step
    //     currentStep.value = "1";
    //   } else {
    //     console.error("Error:", result);
    //     alert("Registration failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("API Error:", error);
    //   alert("An error occurred. Please check your connection.");
    // }
    console.log(JSON.stringify(initialValues.value));

    initialValues.value = JSON.parse(JSON.stringify(defaultValues));

    currentStep.value = "1";
};

const nextStep = (step) => {
    currentStep.value = step;
};
</script>

<template>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full">
            <div class="flex flex-row gap-8">
                <div class="w-1/2 lg:w-full">
                    <div class="card">
                        <Stepper :value="currentStep">
                            <StepList>
                                <Step value="1">Student Info.</Step>
                                <Step value="2">Registration</Step>
                                <Step value="3">payment Method</Step>
                                <Step value="4">Summary Info</Step>
                                <Step value="5">Payment Code</Step>
                            </StepList>

                            <Form @submit="onFormSubmit">
                                <StepPanels>
                                    <StepPanel value="1" class="p-4">
                                        <h1>Registration</h1>
                                        <div class="w-full grid grid-cols-2 gap-4">
                                            <!-- Left Column -->
                                            <div>
                                                <Toast />
                                                <FileUpload name="demo[]" url="/api/upload" @upload="
                                                    onTemplatedUpload(
                                                        $event
                                                    )
                                                    " :multiple="true" accept="image/*" :maxFileSize="1000000"
                                                    @select="onSelectedFiles">
                                                    <template #header="{
                                                        chooseCallback,
                                                        uploadCallback,
                                                        clearCallback,
                                                        files,
                                                    }">
                                                        <div
                                                            class="flex flex-wrap justify-between items-center flex-1 gap-4">
                                                            <div class="flex gap-2">
                                                                <Button @click="
                                                                    chooseCallback()
                                                                    " icon="pi pi-images" rounded outlined
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
                                                            <ProgressBar :value="totalSizePercent
                                                                " :showValue="false
                                                                    " class="md:w-20rem h-1 w-full md:ml-auto">
                                                                <span class="whitespace-nowrap">{{
                                                                    totalSize
                                                                    }}B /
                                                                    1Mb</span>
                                                            </ProgressBar>
                                                        </div>
                                                    </template>
                                                    <template #content="{
                                                        files,
                                                        uploadedFiles,
                                                        removeUploadedFileCallback,
                                                        removeFileCallback,
                                                        messages,
                                                    }">
                                                        <div class="flex flex-col gap-8 pt-4">
                                                            <Message v-for="message of messages" :key="message" :class="{
                                                                'mb-8':
                                                                    !files.length &&
                                                                    !uploadedFiles.length,
                                                            }" severity="error">
                                                                {{ message }}
                                                            </Message>

                                                            <div v-if="
                                                                files.length >
                                                                0
                                                            ">
                                                                <h5>Pending</h5>
                                                                <div class="flex flex-wrap gap-4">
                                                                    <div v-for="(file, index
                                                                    ) of files"
                                                                        :key="file.name + file.type + file.size"
                                                                        class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                                                        <div>
                                                                            <img role="presentation" :alt="file.name
                                                                                " :src="file.objectURL
                                                                                    " width="100" height="50" />
                                                                        </div>
                                                                        <span
                                                                            class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                                                                                file.name
                                                                            }}</span>
                                                                        <div>
                                                                            {{
                                                                                formatSize(
                                                                                    file.size
                                                                                )
                                                                            }}
                                                                        </div>
                                                                        <Badge value="Pending" severity="warn" />
                                                                        <Button icon="pi pi-times" @click="
                                                                            onRemoveTemplatingFile(
                                                                                file,
                                                                                removeFileCallback,
                                                                                index
                                                                            )
                                                                            " outlined rounded severity="danger" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div v-if="
                                                                uploadedFiles.length >
                                                                0
                                                            ">
                                                                <h5>
                                                                    Completed
                                                                </h5>
                                                                <div class="flex flex-wrap gap-4">
                                                                    <div v-for="(
file,
    index
                                                                        ) of uploadedFiles" :key="file.name +
                                                                            file.type +
                                                                            file.size
                                                                            "
                                                                        class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                                                                        <div>
                                                                            <img role="presentation" :alt="file.name
                                                                                " :src="file.objectURL
                                                                                    " width="100" height="50" />
                                                                        </div>
                                                                        <span
                                                                            class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{
                                                                                file.name
                                                                            }}</span>
                                                                        <div>
                                                                            {{
                                                                                formatSize(
                                                                                    file.size
                                                                                )
                                                                            }}
                                                                        </div>
                                                                        <Badge value="Completed" class="mt-4"
                                                                            severity="success" />
                                                                        <Button icon="pi pi-times" @click="
                                                                            removeUploadedFileCallback(
                                                                                index
                                                                            )
                                                                            " outlined rounded severity="danger" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template #empty>
                                                        <div class="flex items-center justify-center flex-col">
                                                            <i
                                                                class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                                                            <p class="mt-6 mb-0">
                                                                Drag and drop
                                                                files to here to
                                                                upload.
                                                            </p>
                                                        </div>
                                                    </template>
                                                </FileUpload>
                                                <div class="flex flex-wrap gap-4 my-10 justify-center items-center">
                                                    <span>Gender</span>
                                                    <div class="flex items-center gap-2">
                                                        <RadioButton v-model="gender" inputId="male" name="gender"
                                                            value="1" />
                                                        <label for="male">Male</label>
                                                    </div>
                                                    <div class="flex items-center gap-2">
                                                        <RadioButton v-model="gender" inputId="female" name="gender"
                                                            value="0" />
                                                        <label for="female">Female</label>
                                                    </div>
                                                </div>
                                                <div class="flex flex-col gap-4 my-10 w-full">
                                                    <IftaLabel class="w-full">
                                                        <Select id="pob" v-model="initialValues.pob
                                                            " :options="dropdownItems
                                                                " optionLabel="name" placeholder="Select One"
                                                            class="w-full" />
                                                        <label for="pob">Place Of
                                                            Birth</label>
                                                    </IftaLabel>

                                                </div>
                                                <div class="flex flex-col gap-4 my-10  w-full">
                                                    <IftaLabel class="w-full">
                                                        <label for="firstnameEN">Firstname EN</label>
                                                        <InputText id="firstnameEN" v-model="initialValues.firstnameEN
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="lastnameEN">Lastname EN</label>
                                                        <InputText id="lastnameEN" v-model="initialValues.lastnameEN
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                </div>
                                                <div class="flex flex-col gap-4 my-10  w-full">
                                                    <InputGroup>
                                                        <InputGroup>
                                                            <InputText placeholder="Price" class=" rounded-r-none" />
                                                        </InputGroup>

                                                        <InputGroup>
                                                            <IftaLabel class="w-full">
                                                                <Select id="pob" v-model="initialValues.pob
                                                                    " :options="dropdownItems
                                                                        " optionLabel="name" placeholder="Select One"
                                                                    class="w-full" />
                                                                <label for="pob">Place Of
                                                                    Birth</label>
                                                            </IftaLabel>
                                                        </InputGroup>

                                                    </InputGroup>
                                                </div>

                                            </div>

                                            <!-- Right Column -->
                                            <div class="grid gap-4">
                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <label for="firstnameEN">Firstname EN</label>
                                                        <InputText id="firstnameEN" v-model="initialValues.firstnameEN
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="lastnameEN">Lastname EN</label>
                                                        <InputText id="lastnameEN" v-model="initialValues.lastnameEN
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                </div>

                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <label for="firstnameKH">Firstname KH</label>
                                                        <InputText id="firstnameKH" v-model="initialValues.firstnameKH
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="lastnameKH">Lastname KH</label>
                                                        <InputText id="lastnameKH" v-model="initialValues.lastnameKH
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                </div>

                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <label for="gender">Gender</label>
                                                        <InputText id="gender" v-model="initialValues.gender
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <DatePicker id="dob" v-model="initialValues.dob
                                                            " class="w-full" dateFormat="dd/mm/yy" show-icon
                                                            iconDisplay="input" />
                                                        <label for="dob">Date Of
                                                            Birth</label>
                                                    </IftaLabel>
                                                </div>

                                                <div class="flex flex-col gap-4 w-full">
                                                    <IftaLabel class="w-full">
                                                        <Select id="pob" v-model="initialValues.pob
                                                            " :options="dropdownItems
                                                                " optionLabel="name" placeholder="Select One"
                                                            class="w-full" />
                                                        <label for="pob">Place Of
                                                            Birth</label>
                                                    </IftaLabel>
                                                    <IftaLabel class="w-full">
                                                        <label for="code">Code</label>
                                                        <InputText id="code" v-model="initialValues.code
                                                            " type="text" class="w-full" />
                                                    </IftaLabel>
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
                                            Registration Form Here ...
                                        </div>
                                        <div class="flex pt-6 justify-between">
                                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                                @click="nextStep('1')" />
                                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                                @click="nextStep('3')" />
                                        </div>
                                    </StepPanel>

                                    <StepPanel value="3">
                                        <div class="flex h-48 justify-center items-center rounded font-medium">
                                            Payment Method (To be added)
                                        </div>
                                        <div class="flex pt-6 justify-between">
                                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                                @click="nextStep('2')" />
                                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                                @click="nextStep('4')" />
                                        </div>
                                    </StepPanel>

                                    <StepPanel value="4">
                                        <div class="flex h-48 justify-center items-center rounded font-medium">
                                            Summary Information (To be added)
                                        </div>
                                        <div class="flex pt-6 justify-between">
                                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                                @click="nextStep('3')" />
                                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                                @click="nextStep('5')" />
                                        </div>
                                    </StepPanel>

                                    <StepPanel value="5">
                                        <div class="flex h-48 justify-center items-center rounded font-medium">
                                            Payment Code (To be added)
                                        </div>
                                        <div class="flex pt-6 justify-between">
                                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                                @click="nextStep('4')" />
                                            <Button type="submit" label="Submit" />
                                        </div>
                                    </StepPanel>
                                </StepPanels>
                            </Form>
                        </Stepper>
                    </div>
                </div>
            </div>
        </div>
    </Fluid>
</template>
