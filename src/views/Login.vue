<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const checked = ref(false);
</script>

<template>
    <div
        class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 20%, rgba(33, 150, 243, 0) 40%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <img src="/rupp_logo.png" alt="" class="w-32 h-32 mx-auto mb-4" />
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to RUPP!
                        </div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <FloatLabel variant="in" class="mb-4">

                            <InputText id="email1" type="text" class="w-full md:w-[30rem]" v-model="email" />
                            <label for="email1"
                                class="block text-surface-900 dark:text-surface-0 text-lg font-medium ">Email
                                Address</label>
                        </FloatLabel>

                        <FloatLabel variant="in">
                            <Password id="password1" v-model="password" :toggleMask="true" class="mb-4" fluid
                                :feedback="false"></Password>
                            <label for="password1"
                                class="block text-surface-900 dark:text-surface-0 font-medium text-lg mb-2">Password</label>
                        </FloatLabel>
                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot
                                password?</span>
                        </div>
                        <Button label="Sign In" class="w-full" as="router-link" to="/"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
