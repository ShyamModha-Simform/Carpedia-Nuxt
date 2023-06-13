<template>
    <div class="form-container--login">
        <h1>Register</h1>

        <vForm
            class="form"
            :validation-schema="schema"
            @submit="performRegistration"
        >
            <div class="group">
                <vField
                    name="name"
                    placeholder="‎"
                    type="text"
                    class="input"
                    :validateOnInput="true"
                    v-model="readRegisterDetails.name"
                />
                <label for="name">Name<span>*</span></label>
                <ErrorMessage name="name" class="error_message" />
            </div>

            <div class="group">
                <vField
                    name="email"
                    placeholder="‎"
                    type="text"
                    class="input"
                    :validateOnInput="true"
                    v-model="readRegisterDetails.email"
                />
                <label for="email">Email<span>*</span></label>
                <ErrorMessage name="email" class="error_message" />
            </div>

            <div class="group">
                <vField
                    name="password"
                    :bails="false"
                    class="input"
                    :validateOnInput="true"
                    v-slot="{ field, errors }"
                    v-model="readRegisterDetails.password"
                >
                    <input
                        type="password"
                        placeholder="‎"
                        v-bind="field"
                        class="input"
                    />
                    <label for="password">Password<span>*</span></label>
                    <div class="error_message" v-for="err in errors" :key="err">
                        {{ err }}
                    </div>
                </vField>
            </div>

            <div class="group">
                <vField
                    name="confirmPwd"
                    placeholder="‎"
                    type="password"
                    class="input"
                    :validateOnInput="true"
                    v-model="readRegisterDetails.confirmPwd"
                />
                <label for="confirmPwd">Confirm Password<span>*</span></label>
                <ErrorMessage name="confirmPwd" class="error_message" />
            </div>

            <div class="group">
                <vField
                    name="role"
                    :bails="false"
                    class="input"
                    v-slot="{ field, errors }"
                    v-model="readRegisterDetails.role"
                >
                    <select v-bind="field">
                        <option disabled value="">Select Role</option>
                        <option value="admin">admin</option>
                        <option value="employee">employee</option>
                        <option value="customer">customer</option>
                    </select>
                    <div class="error_message" v-for="err in errors" :key="err">
                        {{ err }}
                    </div>
                </vField>
                <label for="role">Role<span>*</span></label>
            </div>

            <div class="group--gender">
                <label for="gender">Gender:<span>*</span></label>
                <vField
                    name="gender"
                    placeholder="‎"
                    type="radio"
                    value="Male"
                    v-model="readRegisterDetails.gender"
                />
                Male
                <vField
                    name="gender"
                    placeholder="‎"
                    type="radio"
                    value="Female"
                    v-model="readRegisterDetails.gender"
                />
                Female
                <ErrorMessage name="gender" class="error_message" />
            </div>

            <div class="group">
                <vField
                    name="dob"
                    placeholder="‎"
                    type="date"
                    class="input"
                    v-model="readRegisterDetails.dob"
                    @change="calculateAge"
                />
                <label for="dob">DOB:<span>*</span></label>
                <ErrorMessage name="dob" class="error_message" />
            </div>

            <div class="group">
                <vField
                    name="age"
                    placeholder="‎"
                    type="number"
                    class="input"
                    v-model="readRegisterDetails.age"
                    disabled
                />
                <label for="age">Age</label>
                <ErrorMessage name="age" class="error_message" />
            </div>

            <div class="modal-footer">
                <BaseButton type="reset" class="card" size="w100">
                    Cancel
                </BaseButton>
                <BaseButton type="submit" class="card" size="w100">
                    <span v-if="!getIsLoaderStarted">Register</span>
                    <CircularLoader v-else />
                </BaseButton>
            </div>
        </vForm>
    </div>
</template>

<script setup>
    // Imports
    import { storeToRefs } from "pinia";
    import useAuthStore from "../stores/authStore";

    // State
    const authStore = useAuthStore();
    const { getIsLoaderStarted } = storeToRefs(authStore);
    const { userRegistration } = authStore;

    const schema = {
        name: "required|alpha_spaces",
        email: "required|email",
        password: "required|min:8|max:12|regex:^(?=.*\\d)(?=.*[\\W_]).+$",
        confirmPwd: "required|confirmed:@password",
        role: "required",
        gender: "required",
        dob: (value) => {
            if (value) {
                const date = new Date(value);
                // Define the minimum and maximum dates
                const minDate = new Date("1900-01-01");
                const maxDate = new Date("2015-01-01");
                return date >= minDate && date <= maxDate
                    ? true
                    : "DOB must between 01/01/1900 to 01/01/2015";
            } else {
                return "Please choose a Date of birth.";
            }
        },
    };

    let readRegisterDetails = reactive({
        name: "",
        email: "",
        password: "",
        role: "",
        gender: "",
        dob: "",
        age: Number,
    });

    // Methods
    async function performRegistration() {
        const res = await userRegistration({ ...readRegisterDetails });
        if (res?.status !== 201) {
            return;
        }
        navigateTo("/login");
    }
    function calculateAge() {
        readRegisterDetails.age =
            new Date().getFullYear() -
            new Date(readRegisterDetails.dob).getFullYear();
    }
</script>

<style scoped>
    .form-container--login {
        width: max(316px, 25%);
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-block-start: 2rem;
        padding-block-end: 2rem;
        flex: 1;
    }

    label span {
        font-weight: 900;
    }

    .form-container--login h1 {
        color: #606d75;
    }

    .card {
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;
        width: 350px;
        display: flex;
        flex-direction: column;
    }

    .title {
        font-size: 24px;
        font-weight: 600;
        text-align: center;
    }
    input[type="radio"] {
        margin-left: 10px;
    }

    .form {
        width: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
    }

    .group {
        position: relative;
        margin-bottom: 20px;
    }

    .form .group > label {
        font-size: 14px;
        color: rgb(99, 102, 102);
        position: absolute;
        top: -10px;
        left: 10px;
        background-color: #e6e8e7;
        transition: all 0.3s ease;
    }

    .form .group .input,
    .form .group .textarea,
    .form .group select {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        outline: 0;
        width: 100%;
        background-color: transparent;
    }

    .form .group .input:placeholder-shown + label,
    .form .group .textarea:placeholder-shown + label,
    .form .group select:placeholder-shown + label {
        top: 10px;
        background-color: transparent;
    }

    .form .group input:focus,
    .form .group .textarea:focus,
    .form .group select:focus {
        border-color: #606d75;
    }

    .form .group .input:focus + label,
    .form .group .textarea:focus + label,
    .form .group select:focus + label {
        top: -10px;
        left: 10px;
        background-color: #e6e8e7;
        color: #606d75;
        font-weight: 600;
        font-size: 14px;
    }

    .form .group .textarea {
        resize: none;
        height: 100px;
    }

    .error_message {
        color: red;
        position: relative;
    }

    .modal-footer {
        display: flex;
        flex-direction: row;
    }

    input:disabled {
        cursor: not-allowed;
    }

    .group--gender {
        margin-bottom: 20px;
    }
</style>
