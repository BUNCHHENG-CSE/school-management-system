import { defineStore } from "pinia";
import { ref } from "vue";
export const useStudentStore = defineStore("student", {
    state: () => ({
        student: ref({
            id: 0,
            card_num: "",
            degree_num: "",
            first_name_en: "",
            last_name_en: "",
            full_name_en: "",
            first_name_kh: "",
            last_name_kh: "",
            full_name_kh: "",
            gender: "",
            nationality: "",
            ethnicity: "",
            birth_date: "",
            place_of_birth: "",
            place_of_birth_province: "",
            address: "",
            address_province: "",
            job: "",
            telephone: "",
        }),
    }),
    actions: {
        setStudentData(newData) {
            this.student = newData;
        },
        resetStudentData() {
            this.student = {
                id: 0,
                card_num: "",
                degree_num: "",
                first_name_en: "",
                last_name_en: "",
                full_name_en: "",
                first_name_kh: "",
                last_name_kh: "",
                full_name_kh: "",
                gender: "",
                nationality: "",
                ethnicity: "",
                birth_date: "",
                place_of_birth: "",
                place_of_birth_province: "",
                address: "",
                address_province: "",
                job: "",
                telephone: "",
            };
        },
    },
});
export const useParentStore = defineStore("parent", {
    state: () => ({
        parent: ref({
            id:0,
            father_name: "",
            father_birth_year: "",
            father_nationality: "",
            father_ethnicity: "",
            father_life_status: "",
            father_job: "",
            father_telephone: "",
            mother_name: "",
            mother_birth_year: "",
            mother_nationality: "",
            mother_ethnicity: "",
            mother_life_status: "",
            mother_job: "",
            mother_telephone: "",
            student_id: "",
        }),
    }),
    actions: {
        setParentData(newData) {
            this.parent = newData;
        },
        resetParentData() {
            this.parent = {
                id:0,
                father_name: "",
                father_birth_year: "",
                father_nationality: "",
                father_ethnicity: "",
                father_life_status: "",
                father_job: "",
                father_telephone: "",
                mother_name: "",
                mother_birth_year: "",
                mother_nationality: "",
                mother_ethnicity: "",
                mother_life_status: "",
                mother_job: "",
                mother_telephone: "",
                student_id: "",
            };
        },
    },
});

export const useScholarshipStore = defineStore("scholarship", {
    state: () => ({
        scholarship: ref({
            id: 0,
            name: "",
            description: "",
            total: 0,
            budget: 0.0,
            sponsor_name: "",
            sponsor_telephone: "",
        }),
    }),
    actions: {
        setScholarshipData(newData) {
            this.scholarship = newData;
        },
        resetScholarshipData() {
            this.scholarship = {
                id: 0,
                name: "",
                description: "",
                total: 0,
                budget: 0.0,
                sponsor_name: "",
                sponsor_telephone: "",
            };
        },
    },
});
export const useAcademicYearStore = defineStore("academicyear", {
    state: () => ({
        academicyear: ref({
            id: 0,
            label: "",
            start_date: "",
            end_date: "",
            activate: false,
        }),
    }),
    actions: {
        setAcademicYearData(newData) {
            this.academicyear = newData;
        },
        resetAcademicYearData() {
            this.academicyear = {
                id: 0,
                label: "",
                start_date: "",
                end_date: "",
                activate: false,
            };
        },
    },
});
