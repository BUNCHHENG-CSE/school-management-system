<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useStudentStore, useParentStore } from "@/store/Store";


const studentDetails = ref({
});
const storeStudent = useStudentStore();
const storeParent = useParentStore();

onMounted(async () => {
    await axios.get(`http://localhost:8888/api/v1/students/${history.state?.message}`)
        .then(response => {
            if (response.status === 200) {
                studentDetails.value = response.data.data;
                storeStudent.setStudentData(studentDetails.value);
                storeParent.setParentData(studentDetails.value.parent);
            }
        }).catch(error => {
            console.log(error.message);
            // alert("Registration failed. Please try again.");
        });
});
</script>

<template>
    <Fluid class="flex flex-row mb-5">
        <div class="w-full">
            <div class="card" style="padding: 1rem 2rem 0.3rem 2rem;">
                <h5>Student Information : {{ storeStudent.student.first_name_en }} , Card Number: {{ storeStudent.student.card_num
                    }} </h5>
            </div>
        </div>
    </Fluid>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full ">
            <div class="card">
                <div>
                    <h5>Student Information</h5>
                    <div v-if="storeStudent.student && Object.keys(storeStudent.student).length">
                        <p><strong>Card Number:</strong> {{ storeStudent.student.card_num }}</p>
                        <p><strong>Name EN:</strong> {{ storeStudent.student.first_name_en }}</p>
                        <p><strong>Name KH:</strong> {{ storeStudent.student.full_name_kh }}</p>
                        <p><strong>Degree Number:</strong> {{ storeStudent.student.degree_num }}</p>
                        <p><strong>Gender : {{ storeStudent.student.gender }}</strong></p>
                    </div>
                    <div v-else>No student details found.</div>
                </div>
            </div>
        </div>
    </Fluid>

</template>
