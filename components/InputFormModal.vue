<template>
    <v-row justify="center" class="form__container">
        <v-dialog v-model="dialog" persistent width="600">
            <v-card>
                <v-card-text>
                    <v-container>
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <vForm
                                        class="form"
                                        :validation-schema="schema"
                                        @submit="handleFormSubmit"
                                    >
                                        <div class="modal-header mb-5">
                                            <h1
                                                class="modal-title fs-5 text-dark"
                                                id="staticBackdropLabel"
                                            >
                                                {{
                                                    modalType === "edit"
                                                        ? "Edit"
                                                        : "Add"
                                                }}
                                                Car Details
                                            </h1>
                                            <button
                                                type="reset"
                                                class="btn-close"
                                                @click="closeModalForm"
                                                ref="closeForm"
                                            ></button>
                                        </div>
                                        <div class="group">
                                            <vField
                                                name="carName"
                                                placeholder="‎"
                                                type="text"
                                                class="input"
                                                :validateOnInput="true"
                                                v-model.lazy="
                                                    selectedCarForEditing.name
                                                "
                                            />
                                            <label for="carName"
                                                >Car Name<span>*</span></label
                                            >
                                            <ErrorMessage
                                                name="carName"
                                                class="error_message"
                                            />
                                        </div>

                                        <div class="group">
                                            <vField
                                                name="price"
                                                placeholder="‎"
                                                type="number"
                                                class="input"
                                                :validateOnInput="true"
                                                v-model="
                                                    selectedCarForEditing.price
                                                "
                                            />
                                            <label for="price"
                                                >Price<span>*</span></label
                                            >
                                            <ErrorMessage
                                                name="price"
                                                class="error_message"
                                            />
                                        </div>

                                        <div class="group">
                                            <vField
                                                name="url"
                                                placeholder="‎"
                                                type="text"
                                                class="input"
                                                :validateOnInput="true"
                                                v-model="
                                                    selectedCarForEditing.image
                                                "
                                            />
                                            <label for="url"
                                                >Image URL<span>*</span></label
                                            >
                                            <ErrorMessage
                                                name="url"
                                                class="error_message"
                                            />
                                        </div>
                                        <div class="group">
                                            <vField
                                                name="carDetails"
                                                :bails="false"
                                                v-slot="{ field, errors }"
                                                v-model="
                                                    selectedCarForEditing.details
                                                "
                                            >
                                                <textarea
                                                    type="text"
                                                    placeholder="‎"
                                                    id="comment"
                                                    class="textarea"
                                                    name="carDetails"
                                                    rows="3"
                                                    v-bind="field"
                                                />
                                                <div
                                                    class="error_message"
                                                    v-for="err in errors"
                                                    :key="err"
                                                >
                                                    {{ err }}
                                                </div>
                                            </vField>
                                            <label for="carDetails"
                                                >Car Details
                                                <span>*</span></label
                                            >
                                        </div>
                                        <small>*Indicates required field</small>
                                        <div class="modal-footer">
                                            <BaseButton
                                                type="reset"
                                                class="card"
                                                size="lg"
                                                @click="closeModalForm"
                                                >Cancel</BaseButton
                                            >
                                            <BaseButton
                                                type="submit"
                                                class="card"
                                            >
                                                <CircularLoader
                                                    v-show="buttonLoader"
                                                />
                                                <span v-show="!buttonLoader">{{
                                                    modalType == "edit"
                                                        ? `Update`
                                                        : `Submit`
                                                }}</span>
                                            </BaseButton>
                                        </div>
                                    </vForm>
                                </div>
                            </div>
                        </div>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script setup>
    import Swal from "sweetalert2";
    import useCarDataStore from "~/stores/carData";
    import useModalFormStore from "~/stores/modalForm";
    import { storeToRefs } from "pinia";
    import swal_alert_helper from "~/utils/swal_alert.js";

    const schema = {
        carName: "required|alpha_spaces",
        price: "required|integer",
        url: "required|url:https://*",
        carDetails: "required|min:30|max:120",
    };

    const carDataStore = useCarDataStore();
    const modalFormStore = useModalFormStore();

    const { addCar, updateCar } = carDataStore;
    const {
        openModal: dialog,
        modalType,
        selectedCarForEditing,
    } = storeToRefs(modalFormStore);

    const closeForm = ref(null);
    let submitFormTimer = null;
    let buttonLoader = ref(false);

    function handleFormSubmit() {
        clearTimeout(submitFormTimer);
        submitFormTimer = setTimeout(async () => {
            await createCar();
        }, 300);
    }

    async function createCar() {
        const temp = modalType.value;
        buttonLoader.value = true;

        let res =
            temp !== "edit"
                ? await addCar(selectedCarForEditing.value)
                : await updateCar(selectedCarForEditing.value);

        if (res?.status == 201 || res?.status == 200) {
            swal_alert_helper(temp, selectedCarForEditing.value);
            closeForm.value.click();
        }
        buttonLoader.value = false;
    }

    const closeModalForm = () => {
        dialog.value = false;
    };
</script>

<style scoped>
    .custom__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        outline: 0;
        border: 0;
        cursor: pointer;
        color: white;
        font-weight: 600;
        border-radius: 50px;
        transition: all 0.2s ease-out;
        margin: 5px;
        font-size: 14px;
        min-height: 38px;
        padding: 8px 20px;
        background-color: rgb(96, 109, 117);
        width: max-content;
        box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%),
            0 1px 3px 0 rgb(93 100 148 / 20%);
        text-transform: initial;
    }

    .custom__btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>

<style scoped>
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

    .form {
        display: flex;
        flex-direction: column;
    }

    .group {
        position: relative;
        margin-bottom: 20px;
    }

    .form .group label {
        font-size: 14px;
        color: rgb(99, 102, 102);
        position: absolute;
        top: -10px;
        left: 10px;
        background-color: #fff;
        transition: all 0.3s ease;
    }

    .form .group .input,
    .form .group .textarea {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        outline: 0;
        width: 100%;
        background-color: transparent;
    }

    label span {
        font-weight: 700;
    }

    .form .group .input:placeholder-shown + label,
    .form .group .textarea:placeholder-shown + label {
        top: 10px;
        background-color: transparent;
    }

    .form .group input:focus,
    .form .group .textarea:focus {
        border-color: #606d75;
    }

    .form .group .input:focus + label,
    .form .group .textarea:focus + label {
        top: -10px;
        left: 10px;
        background-color: #fff;
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
        /* top: -20px; */
    }

    .modal-footer {
        display: flex;
        flex-direction: row;
    }

    small {
        margin-bottom: 10px;
    }

    .form__container {
        margin: 0;
    }
</style>
