<template>
    <div class="form-container--login">
        <h1>Login</h1>

        <vForm class="form" :validation-schema="schema" @submit="performLogin">
            <div class="group">
                <vField
                    name="email"
                    placeholder="‎"
                    type="text"
                    class="input"
                    :validateOnInput="true"
                    v-model="readLoginDetails.email"
                />
                <label for="email">Email<span>*</span></label>
                <ErrorMessage name="email" class="error_message" />
            </div>
            <div class="group">
                <vField
                    name="password"
                    placeholder="‎"
                    type="password"
                    class="input"
                    :validateOnInput="true"
                    v-model="readLoginDetails.password"
                />
                <label for="password">Password<span>*</span></label>
                <ErrorMessage name="password" class="error_message" />
            </div>

            <div class="modal-footer">
                <BaseButton type="reset" class="card" size="w100">
                    Cancel
                </BaseButton>
                <BaseButton type="submit" class="card" size="w100">
                    <span v-if="!getIsLoaderStarted">Login</span>
                    <CircularLoader v-else />
                </BaseButton>
            </div>
        </vForm>
    </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import useAuthStore from "~/stores/authStore";

    const authStore = useAuthStore();
    const { getIsLoaderStarted } = storeToRefs(authStore);
    const { userLogin } = authStore;
    const router = useRouter();

    const schema = {
        email: "required|email",
        password: "required",
    };

    let readLoginDetails = reactive({
        email: "",
        password: "",
    });

    async function performLogin() {
        const res = await userLogin(readLoginDetails);
        if (res?.status !== 200) {
            return;
        }
        navigateTo("/");
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
</style>
