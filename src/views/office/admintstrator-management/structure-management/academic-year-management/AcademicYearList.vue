<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { computed } from "vue";
import axios from "axios";


const toast = useToast();
const dt = ref(null);
const selectedstudents = ref();
const academicyears = ref([]);
const router = useRouter();
const showPaginator = computed(() => academicyears.value.length > 0);
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


const sendPrompt = (id) => {
    router.push({
        path: '/administratormanagement/structuremanagement/academicyear-information', state: { 'id': id }
    });
};
const getStatusLabel = (status) => {
    switch (status) {
        case true:
            return 'success';

        case false:
            return 'warn';

        default:
            return null;
    }
};
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
                                        :showClear="true"
                                    class="w-full" />
                                <label for="nationality">Year</label>
                            </IftaLabel>
                            <IftaLabel class="w-full">
                                <Select id="nationality" v-model="s
                                    " :options="dropdownItemsDegree
                                        " optionLabel="name" optionValue="code" placeholder="Select One"
                                        :showClear="true"
                                    class="w-full" />
                                <label for="nationality">Degree</label>
                            </IftaLabel>
                            <!-- <Button type="submit" label="Search" icon="pi pi-search" hidden /> -->
                        </div>
                    </Form>
                </div>
                <DataTable :value="academicyears" :paginator="showPaginator" :rows="10" dataKey="id"
                    style="margin-top: 20px;">
                    <Column field="label" header="Name"></Column>
                    <Column field="start_date" header="Start Date"></Column>
                    <Column field="end_date" header="End Date"></Column>
                    <Column field="activate" header="Activate" dataType="boolean" bodyClass="text-center"
                        style="min-width: 8rem">
                        <template #body="{ data }">
                            <i class="pi"
                                :class="{ 'pi-check-circle text-green-500 ': data.activate, 'pi-times-circle text-red-500': !data.activate }"></i>
                        </template>

                    </Column>
                    <Column class="w-24 !text-end">
                        <template #body="{ data }">
                            <Button label="Show More"  @click="sendPrompt(data.id)" style="width: max-content;" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </Fluid>
</template>
