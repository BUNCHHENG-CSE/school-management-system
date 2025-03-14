<script setup>
import { ref } from "vue";
import axios from "axios";
const { cardNum } = defineProps(['cardNum']);
const card_num = ref(cardNum);


const response = await axios.get(`http://localhost:8888/api/v1/students/${card_num.value}`)
    .then(response => {
        if (response.status === 200) {
            console.log(response.data.data);
        }
    }).catch(error => {
        console.log(error.message);
        //alert("Registration failed. Please try again.");
    });
console.log(response);
</script>

<template>
    <Fluid class="flex flex-row gap-8">
        <div class="w-full">
            <div class="flex flex-row gap-8">
                <div class="w-full">
                    <div class="card">
                        <h5>Coming Soon ...</h5>

                    </div>
                </div>
            </div>
        </div>
    </Fluid>
</template>
