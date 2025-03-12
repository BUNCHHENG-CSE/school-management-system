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
  { name: 'Phnom Penh', code: 'Phnom Penh' },
  { name: 'Siem Reap', code: 'Siem Reap' },
  { name: 'Battambang', code: 'Battambang' },
  { name: 'Sihanoukville', code: 'Sihanoukville' },
  { name: 'Kampong Cham', code: 'Kampong Cham' },
  { name: 'Kampong Thom', code: 'Kampong Thom' },
  { name: 'Kampot', code: 'Kampot' },
  { name: 'Kandal', code: 'Kandal' },
  { name: 'Takeo', code: 'Takeo' },
  { name: 'Prey Veng', code: 'Prey Veng' },
  { name: 'Banteay Meanchey', code: 'Banteay Meanchey' },
  { name: 'Koh Kong', code: 'Koh Kong' },
  { name: 'Pursat', code: 'Pursat' },
  { name: 'Preah Vihear', code: 'Preah Vihear' },
  { name: 'Ratanakiri', code: 'Ratanakiri' },
  { name: 'Mondulkiri', code: 'Mondulkiri' },
  { name: 'Stung Treng', code: 'Stung Treng' },
  { name: 'Kratie', code: 'Kratie' },
  { name: 'Oddar Meanchey', code: 'Oddar Meanchey' },
  { name: 'Pailin', code: 'Pailin' },
  { name: 'Tboung Khmum', code: 'Tboung Khmum' }
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
  <Fluid class="flex flex-col md:flex-row gap-8">
    <div class="w-full">
      <div class="flex flex-col md:flex-row gap-8">
        <div class="md:w-1/2 lg:w-full">
          <div class="card">
            <Stepper :value="currentStep">
              <StepList>
                <Step value="1">Student Info.</Step>
                <Step value="2">Parents Info</Step>
                <Step value="3">Confirm</Step>
              </StepList>

              <Form @submit="onFormSubmit" class="flex flex-col gap-4">
                <StepPanels>

                  <StepPanel value="1" class="p-4">
                    <div class="w-full flex flex-col gap-6">

                      <div class="flex flex-col md:flex-row gap-4 w-full">
                        <IftaLabel class="w-full">
                          <label for="firstnameEN">Firstname EN</label>
                          <InputText id="firstnameEN" v-model="initialValues.firstnameEN" type="text" class="w-full" />
                        </IftaLabel>
                        <IftaLabel class="w-full">
                          <label for="lastnameEN">Lastname EN</label>
                          <InputText id="lastnameEN" v-model="initialValues.lastnameEN" type="text" class="w-full" />
                        </IftaLabel>
                      </div>

                      
                      <div class="flex flex-col md:flex-row gap-4 w-full">
                        <IftaLabel class="w-full">
                          <label for="firstnameKH">Firstname KH</label>
                          <InputText id="firstnameKH" v-model="initialValues.firstnameKH" type="text" class="w-full" />
                        </IftaLabel>
                        <IftaLabel class="w-full">
                          <label for="lastnameKH">Lastname KH</label>
                          <InputText id="lastnameKH" v-model="initialValues.lastnameKH" type="text" class="w-full" />
                        </IftaLabel>
                      </div>

                   
                      <div class="flex flex-col md:flex-row gap-4 w-full">
                        <IftaLabel class="w-full">
                          <label for="gender">Gender</label>
                          <InputText id="gender" v-model="initialValues.gender" type="text" class="w-full" />
                        </IftaLabel>
                        <IftaLabel class="w-full">
                          <DatePicker id="dob" v-model="initialValues.dob" class="w-full" dateFormat="dd/mm/yy"
                            show-icon iconDisplay="input" />
                          <label for="dob">Date Of Birth</label>
                        </IftaLabel>
                      </div>

                      
                      <div class="flex flex-col md:flex-row gap-4 w-full">
                        <IftaLabel class="w-full">
                          <Select id="pob" v-model="initialValues.pob" :options="dropdownItems" optionLabel="name"
                            placeholder="Select One" class="w-full" />
                          <label for="pob">Place Of Birth</label>
                        </IftaLabel>
                        <IftaLabel class="w-full">
                          <label for="code">Code</label>
                          <InputText id="code" v-model="initialValues.code" type="text" class="w-full" />
                        </IftaLabel>
                      </div>
                    </div>

                    <div class="flex pt-6 justify-end w-full">
                      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" class="w-full md:w-auto"
                        @click="nextStep('2')" />
                    </div>
                  </StepPanel>

       
                  <StepPanel value="2">
                    <div class="flex flex-col h-48 justify-center items-center rounded font-medium">
                      Parent Information (To be added)
                    </div>
                    <div class="flex pt-6 justify-between">
                      <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="nextStep('1')" />
                      <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextStep('3')" />
                    </div>
                  </StepPanel>

                  
                  <StepPanel value="3">
                    <div class="flex flex-col h-48 justify-center items-center rounded font-medium">
                      Confirm Information & Submit
                    </div>
                    <div class="flex pt-6 justify-between">
                      <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="nextStep('2')" />
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
