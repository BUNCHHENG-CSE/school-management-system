<script setup>
import router from '@/router';
import axios from 'axios';
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

onMounted(() => {
    id.value = history.state.id

    axios.get(`http://localhost:8888/api/v1/scholarships/${id.value}`)
        .then((res) => {
            console.log("response testin 1")
            scholarship.value = res.data.data

            console.log("response data")
            console.log(scholarship.value)

            console.log("response testin 2")
            toast.add({
                severity: "success",
                summary: "Success",
                detail: "Scholarship found",
                life: 3000,
            });
        }).catch((error) => {
            console.log(error.response)
            toast.add({
                severity: "warn",
                summary: "Warning",
                detail: "Scholarship Not found",
                life: 3000,
            });
        })
})

const toast = useToast();
const id = ref();
const scholarship = ref([])


const onClickPreviousPage = () => {
    router.go(-1)
}

</script>

<template>
    <Toast />
    <div>
        <Fluid class="flex flex-row mb-5">
            <div class="w-full">
                <div class="card" style="padding: 1rem 2rem 0.3rem 2rem">
                    <h5>ShowMore SchoolaShip</h5>
                </div>
            </div>
        </Fluid>
        <Toolbar class="mb-6">
            <template #end>
                <Button icon="pi pi-times" severity="danger" aria-label="Cancel" @click="onClickPreviousPage" />
            </template>
        </Toolbar>

        <div class="card">
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
                                    <RadioButton v-model="initialParentValues.father_life_status"
                                        inputId="fatherstatuslive" name="fatherstatus" value="1" />
                                    <label for="fatherstatuslive">Live</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="initialParentValues.father_life_status"
                                        inputId="fatherstatusdie" name="fatherstatus" value="0" />
                                    <label for="fatherstatusdie">Die</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-col gap-4 w-full">
                            <IftaLabel class="w-full">
                                <DatePicker id="fatherdob" v-model="initialParentValues.father_birth_year
                                    " class="w-full" view="year" dateFormat="yy" show-icon iconDisplay="input" />
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
                                    <RadioButton v-model="initialParentValues.mother_life_status"
                                        inputId="motherstatuslive" name="motherstatus" value="1" />
                                    <label for="motherstatuslive">Live</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="initialParentValues.mother_life_status"
                                        inputId="motherstatusdie" name="monterstatus" value="0" />
                                    <label for="motherstatusdie">Die</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="flex flex-col gap-4 w-full">
                            <IftaLabel class="w-full">
                                <DatePicker id="motherdob" v-model="initialParentValues.mother_birth_year
                                    " class="w-full" view="year" dateFormat="yy" show-icon iconDisplay="input" />
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


    </div>
</template>