<script setup>
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import { computed } from "vue";
import axios from "axios";

onMounted(() => {
    axios
        .get(`${import.meta.env.VITE_API_URL}/api/v1/academic-years`)
        .then((response) => {
            if (response.status === 200) {
                academicyears.value = response.data.data;
            }
        })
        .catch((error) => {
            console.log(error.response);
            toast.add({
                severity: "warn",
                summary: "Warning",
                detail: "Academic found",
                life: 3000,
            });
        });
});
const toast = useToast();
const dt = ref(null);
const roomDialog = ref(false);
const submitted = ref(false);
const academicyears = ref([]);
const router = useRouter();
const showPaginator = computed(() => academicyears.value.length > 0);
const dropdownItemsBuildings = ref([
    { name: "Building A", code: "buildingA" },
    { name: "Building B", code: "buildingB" },
]);
const dropdownItemsRoomType = ref([
    { name: "Laboratory", code: "laboratory" },
    { name: "Laboratory Computer", code: "laboratorycomputer" },
    { name: "Laboratory Network", code: "laboratorynetwork" },
]);
const dropdownItemsFloor = ref([
    { name: "1", code: 1 },
    { name: "2", code: 2 },
    { name: "3", code: 3 },
    { name: "4", code: 4 },
    { name: "5", code: 5 },
    { name: "6", code: 6 },

]);
// const onFormSubmit = async () => {
//     await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/academic-years`).then((response) => {
//         console.log(response.data.data);
//         academicyears.value = response.data.data;
//     });
// };
const initialRoomValues = ref({
    building: "",
    room_type: "",
    floor: "",
    room_code: "",
    room_name_en: "",
    room_name_kh: "",
    total_amount: "",

});
const initialRoom = ref([
    { orderlist: 1, roomCode: "A103A", name: "A 103A", totalamount: 25, roomType: "Laboratory Network", building: "A", floor: 1 },
    { orderlist: 2, roomCode: "A103C", name: "A 103C", totalamount: 25, roomType: "Laboratory Computer", building: "A", floor: 1 },
    { orderlist: 3, roomCode: "A303", name: "A 303", totalamount: 25, roomType: "Laboratory", building: "A", floor: 3 },
    { orderlist: 4, roomCode: "A205", name: "A 205", totalamount: 25, roomType: "Laboratory", building: "A", floor: 2 },
]);
const initialRoomValuesSearch = ref({
    building: "",
    room_type: "",
    room_name: "",
});
const sendPrompt = (id) => {
    router.push({
        path: '/administratormanagement/structuremanagement/academicyear-information', state: { 'id': id }
    });
};
const onClickCreate = () => {
    // router.push({
    //     path: "/studymanagement/room-management/buildings-creation",
    // });
    submitted.value = false;
    roomDialog.value = true;
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
                <h5>Room</h5>
            </div>
        </div>
    </Fluid>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full ">
            <div class="card">
                <div>
                    <Toolbar class="mb-6" style="border: none !important;">
                        <template #start>
                            <Button label="New" icon="pi pi-plus" class="mr-2" @click="onClickCreate" />
                        </template>
                        <template #end>
                            <Form @submit="onFormSubmit">
                                <div class="flex flex-row gap-4 justify-end">
                                    <IftaLabel>
                                        <Select id="nationality" v-model="initialRoomValuesSearch.building
                                            " :options="dropdownItemsBuildings
                                                " optionLabel="name" optionValue="code" placeholder="Select One"
                                            :showClear="true" class="w-full" />
                                        <label for="nationality">Building</label>
                                    </IftaLabel>
                                    <IftaLabel>
                                        <Select id="nationality" v-model="initialRoomValuesSearch.room_type
                                            " :options="dropdownItemsRoomType
                                                " optionLabel="name" optionValue="code" placeholder="Select One"
                                            :showClear="true" class="w-full" />
                                        <label for="nationality">Room Type</label>
                                    </IftaLabel>
                                    <IftaLabel>
                                        <InputText id="on_label" v-model="initialRoomValuesSearch.room_name" />
                                        <label for="on_label">Room Name</label>
                                    </IftaLabel>

                                    <Button type="submit" label="Search" icon="pi pi-search"
                                        style="width: fit-content;" />
                                </div>
                            </Form>
                        </template>
                    </Toolbar>
                </div>
                <DataTable :value="initialRoom" :paginator="showPaginator" :rows="10" dataKey="id"
                    style="margin-top: 20px;">
                    <Column field="orderlist" header="#"></Column>
                    <Column field="roomCode" header="Room Code"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="totalamount" header="Total Amount"></Column>
                    <Column field="roomType" header="Room Type"></Column>
                    <Column field="building" header="Building"></Column>
                    <Column field="floor" header="Floor"></Column>
                    <Column class="w-24 !text-end">
                        <template #body="{ data }">
                            <Button label="Show More" @click="sendPrompt(data.id)" style="width: max-content;" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </Fluid>
    <Dialog v-model:visible="roomDialog" :style="{ width: '90%', maxWidth: '1400px' }"
        :class="'bg-white shadow-lg rounded-lg p-4'" header="Room" :modal="true">

        <template #default>
            <div class="flex flex-col md:flex-row gap-6">
                <!-- Left Side (Image) -->
                <div class="w-full md:w-1/2 flex flex-col items-center p-4">
                    <img src="/rupp_logo.png" alt="Logo" class="w-20 h-20 mb-4">
                    <h2 class="text-center font-bold text-lg">Royal University Of Phnom Penh</h2>
                    <img src="/illustration.png" alt="Illustration" class="w-3/4 mt-4 object-contain">
                </div>

                <!-- Right Side (Form) -->
                <div class="w-full md:w-1/2 p-4 space-y-4 min-w-0 ">
                    <div class="grid grid-cols-1 gap-4">
                        <!-- Scholarship Information -->
                        <div>
                            <h3 class="font-bold text-lg mb-2">Room Creation</h3>
                            <div class="flex flex-col gap-4 w-full">
                                <IftaLabel>
                                        <Select id="nationality" v-model="initialRoomValues.building
                                            " :options="dropdownItemsBuildings
                                                " optionLabel="name" optionValue="code" placeholder="Select One"
                                            :showClear="true" class="w-full" />
                                        <label for="nationality">Building</label>
                                    </IftaLabel>
                                    <IftaLabel>
                                        <Select id="nationality" v-model="initialRoomValues.floor
                                            " :options="dropdownItemsFloor
                                                " optionLabel="name" optionValue="code" placeholder="Select One"
                                            :showClear="true" class="w-full" />
                                        <label for="nationality">Floor</label>
                                    </IftaLabel>
                                <IftaLabel class="w-full">
                                    <label for="roomnameEN">Room Name EN</label>
                                    <InputText id="roomnameEN" type="text" class="w-full" v-model="initialRoomValues.room_name_en" />
                                </IftaLabel>
                                <IftaLabel class="w-full">
                                    <label for="roomnameKH">Room Name KH</label>
                                    <InputText id="roomnameKH" type="text" class="w-full" v-model="initialRoomValues.room_name_kh" />
                                </IftaLabel>
                                <IftaLabel class="w-full">
                                    <label for="roomnameKH">Room Code</label>
                                    <InputText id="roomnameKH" type="text" class="w-full" v-model="initialRoomValues.room_code" />
                                </IftaLabel>
                                <IftaLabel>
                                        <Select id="nationality" v-model="initialRoomValues.room_type
                                            " :options="dropdownItemsRoomType
                                                " optionLabel="name" optionValue="code" placeholder="Select One"
                                            :showClear="true" class="w-full" />
                                        <label for="nationality">Room Type</label>
                                    </IftaLabel>
                                <IftaLabel class="w-full">
                                    <label for="studyperiodyear">Total Amount</label>
                                    <InputText id="studyperiodyear" type="number" class="w-full" v-model="initialRoomValues.total_amount" />
                                </IftaLabel>

                            </div>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="grid grid-cols-2 gap-2 pt-4">
                        <button class="bg-gray-200 text-gray-700 px-6 py-2 rounded-md">Cancel</button>
                        <button class="bg-blue-500 text-white px-6 py-2 rounded-md">Save</button>

                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>
