<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

onMounted(() => {
    axios
        .get("http://localhost:8888/api/v1/scholarships")
        .then((response) => {
            if (response.status === 200) {
                scholarships.value = response.data.data;
            }
        })
        .catch((error) => {
            console.log(error.response);
        });
});

const searchValue = ref("");
const scholarships = ref([]);

const onSearch = () => {
    console.log(searchValue.value);
};
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="mr-2" />
                </template>
                <template #end>
                    <Form @submit="onSearch">
                        <div class="flex flex-row gap-4 justify-end">
                            <FloatLabel variant="on">
                                <InputText
                                    id="on_label"
                                    v-model="searchValue"
                                />
                                <label for="on_label">Search By Name</label>
                            </FloatLabel>
                            <Button
                                type="submit"
                                label="Search"
                                icon="pi pi-search"
                                class="ml-5"
                            />
                        </div>
                    </Form>
                </template>
            </Toolbar>

            <DataTable
                :value="scholarships"
                paginator
                :rows="5"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 50rem"
            >
                <Column field="id" style="width: 5%" header="#"></Column>   
                <Column field="name" style="width: 25%" header="Name"></Column>
                <Column field="sponsor_name" style="width: 20%" header="Sponsor Name"></Column>
                <Column field="sponsor_telephone"  style="width: 20%" header="Sponsor Telephone"></Column>
                <Column field="description" style="width: 20%" header="Descrition"></Column>
                <Column field="total" style="width: 10%" header="Total"></Column>
                <Column field="id" style="width: 10%" header="Action"></Column>
            </DataTable>
        </div>
    </div>
</template>
