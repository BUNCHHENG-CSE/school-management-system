<script setup>
import { ref } from "vue";

const currentStep = ref("1");

const initialValues = ref({
    // Define your form fields here
});

const onFormSubmit = () => {
    console.log("Form submitted with values:", initialValues.value);
};

const nextStep = (step) => {
    currentStep.value = step;
};
</script>

<template>
    <Fluid class="flex flex-col md:flex-row gap-8">
        <div class="w-full">
            <div class="flex flex-col md:flex-row gap-8">
                <div class="md:w-1/2 lg:w-full">
                    <div class="card">
                        <Stepper :value="currentStep">
                            <StepList>
                                <Step value="1">Student Info.</Step>
                                <Step value="2">Parten II</Step>
                                <Step value="3">Header III</Step>
                            </StepList>

                            <Form
                                :initialValues="initialValues"
                                @submit="onFormSubmit"
                                class="flex flex-col gap-4"
                            >
                                <StepPanels>
                                    <StepPanel value="1" class="p-4">
                                        <div class="w-full flex flex-col gap-6">
                                            <!-- Firstname & Lastname -->
                                            <div
                                                class="flex flex-col md:flex-row gap-4 w-full"
                                            >
                                                <div
                                                    class="flex flex-col w-full"
                                                >
                                                    <label for="firstname"
                                                        >Firstname</label
                                                    >
                                                    <InputText
                                                        id="firstname"
                                                        type="text"
                                                        class="w-full"
                                                    />
                                                </div>
                                                <div
                                                    class="flex flex-col w-full"
                                                >
                                                    <label for="lastname"
                                                        >Lastname</label
                                                    >
                                                    <InputText
                                                        id="lastname"
                                                        type="text"
                                                        class="w-full"
                                                    />
                                                </div>
                                            </div>

                                            <!-- Address -->
                                            <div class="flex flex-col w-full">
                                                <label for="address"
                                                    >Address</label
                                                >
                                                <Textarea
                                                    id="address"
                                                    rows="4"
                                                    class="w-full"
                                                />
                                            </div>

                                            <!-- State & Zip -->
                                            <div
                                                class="flex flex-col md:flex-row gap-4 w-full"
                                            >
                                                <div
                                                    class="flex flex-col w-full"
                                                >
                                                    <label for="state"
                                                        >State</label
                                                    >
                                                    <Select
                                                        id="state"
                                                        v-model="dropdownItem"
                                                        :options="dropdownItems"
                                                        optionLabel="name"
                                                        placeholder="Select One"
                                                        class="w-full"
                                                    />
                                                </div>
                                                <div
                                                    class="flex flex-col w-full"
                                                >
                                                    <label for="zip">Zip</label>
                                                    <InputText
                                                        id="zip"
                                                        type="text"
                                                        class="w-full"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Next Button -->
                                        <div
                                            class="flex pt-6 justify-end w-full"
                                        >
                                            <Button
                                                label="Next"
                                                icon="pi pi-arrow-right"
                                                iconPos="right"
                                                class="w-full md:w-auto"
                                                @click="nextStep('2')"
                                            />
                                        </div>
                                    </StepPanel>

                                    <StepPanel value="2">
                                        <div
                                            class="flex flex-col h-48 justify-center items-center rounded font-medium"
                                        >
                                            Content II
                                        </div>
                                        <div class="flex pt-6 justify-between">
                                            <Button
                                                label="Back"
                                                severity="secondary"
                                                icon="pi pi-arrow-left"
                                                @click="nextStep('1')"
                                            />
                                            <Button
                                                label="Next"
                                                icon="pi pi-arrow-right"
                                                iconPos="right"
                                                @click="nextStep('3')"
                                            />
                                        </div>
                                    </StepPanel>

                                    <StepPanel value="3">
                                        <div
                                            class="flex flex-col h-48 justify-center items-center rounded font-medium"
                                        >
                                            Content III
                                        </div>
                                        <div class="flex pt-6 justify-between">
                                            <Button
                                                label="Back"
                                                severity="secondary"
                                                icon="pi pi-arrow-left"
                                                @click="nextStep('2')"
                                            />
                                            <Button
                                                type="submit"
                                                label="Submit"
                                            />
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
