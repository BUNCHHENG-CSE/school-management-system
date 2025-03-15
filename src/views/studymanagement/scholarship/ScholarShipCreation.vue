<script setup>
import router from '@/router';
import axios from 'axios';
import { useToast } from 'primevue';
import { ref } from 'vue';

const toast = useToast()
const scholarship_data = ref({
    "name": "",
    "description": "",
    "total": 0,
    "budget": 0.00,
    "sponsor_name": "",
    "sponsor_telephone": "",
})
const default_scholarship_data = JSON.parse(JSON.stringify(scholarship_data.value))

const onClickPreviousPage = () => {
    router.go(-1)
}

const errors = ref({})

const validateForm = () => {
    errors.value = {};
    if (!scholarship_data.value.name.trim())
        errors.value.name = 'Scholarship Name Required';
    if (scholarship_data.value.total <= 0)
        errors.value.total = 'Total > 0 Required';
    if (scholarship_data.value.budget <= 0)
        errors.value.budget = 'Budget > 0 Required';
    if (!scholarship_data.value.sponsor_name.trim())
        errors.value.sponsor_name = 'Sponsor Name Required';
    if (!scholarship_data.value.sponsor_telephone.trim())
        errors.value.sponsor_telephone = 'Phone Required';
    return Object.keys(errors.value).length === 0;
}

const onSubmitCreateScholarship = () => {
    if (validateForm()) {
        console.log("submit")
        scholarship_data.value.budget = scholarship_data.value.budget.toFixed(2);
        console.log(scholarship_data.value)
        axios.post("http://localhost:8888/api/v1/scholarships", scholarship_data.value).then((res) => {
            if (res.status === 201) {
                toast.add({
                    severity: "success",
                    summary: res.data.status,
                    detail: res.data.message,
                    life: 3000,
                });
                scholarship_data.value = JSON.parse(JSON.stringify(default_scholarship_data))
            }
        }).catch((err) => {
            console.log(err.response);
            toast.add({
                severity: "warn",
                summary: "Warning",
                detail: "Somthing Wrong",
                life: 3000,
            });
        })
    }
}

</script>

<template>
    <div>
        <div>
            <Toolbar class="mb-6">
                <template #start>
                    <div class="flex items-center justify-center">
                        <p class="text-center">Create Scholarship</p>
                    </div>
                </template>

                <template #end>
                    <Button icon="pi pi-times" severity="danger" aria-label="Cancel" @click="onClickPreviousPage" />
                </template>
            </Toolbar>
        </div>
        <div class="card">
            <Form @submit="onSubmitCreateScholarship">
                <div class="w-full">
                    <div class="w-full grid grid-cols-2 gap-4 my-5">
                        <div>
                            <h3>Scholarship Information</h3>
                            <div class="flex flex-col gap-4 w-full">
                                <IftaLabel class="w-full">
                                    <label for="name">Scholaship Name</label>
                                    <InputText v-model="scholarship_data.name" id="name" type="text" class="w-full " />
                                </IftaLabel>
                                <Message v-if="errors.name" severity="error" size="small" variant="simple">{{
                                    errors.name }}</Message>
                                <IftaLabel class="w-full">
                                    <InputNumber id="budget" v-model="scholarship_data.budget" inputId="stacked-buttons"
                                        showButtons mode="currency" :min-fraction-digits="2" :max-fraction-digits="2"
                                        locale="en-US" currency="USD" fluid :step="10" />

                                    <label for="budget">Budget Scholarship</label>
                                </IftaLabel>
                                <Message v-if="errors.budget" severity="error" size="small" variant="simple">{{
                                    errors.budget }}</Message>

                                <IftaLabel class="w-full">
                                    <InputNumber id="total" v-model="scholarship_data.total" name="amount" fluid />
                                    <label for="total">Total Scholarship</label>
                                </IftaLabel>
                                <Message v-if="errors.total" severity="error" size="small" variant="simple">{{
                                    errors.total }}</Message>
                                <IftaLabel>
                                    <Textarea v-model="scholarship_data.description" id="description" rows="5" cols="30"
                                        style="resize: none" fluid />
                                    <label for="description">Description</label>
                                </IftaLabel>
                            </div>
                        </div>
                        <div>
                            <h3>Sponsor Information</h3>
                            <div class="flex flex-col gap-4 w-full">
                                <IftaLabel class="w-full">
                                    <label for="sponsor_name">Sponsor Name</label>
                                    <InputText v-model="scholarship_data.sponsor_name" id="sponsor_name" type="text"
                                        class="w-full" />
                                </IftaLabel>
                                <Message v-if="errors.sponsor_name" severity="error" size="small" variant="simple">{{
                                    errors.sponsor_name }}</Message>
                                <IftaLabel class="w-full">
                                    <label for="sponsor_telephone">Sponsor Telephone</label>
                                    <InputText v-model="scholarship_data.sponsor_telephone" id="sponsor_telephone"
                                        type="text" class="w-full" />
                                </IftaLabel>
                                <Message v-if="errors.sponsor_telephone" severity="error" size="small" variant="simple">
                                    {{
                                        errors.sponsor_telephone }}</Message>
                            </div>
                        </div>
                    </div>
                    <Button type="submit" label="Submit" fluid d />
                </div>
            </Form>
        </div>
    </div>
</template>