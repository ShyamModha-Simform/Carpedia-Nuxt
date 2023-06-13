<template>
    <div class="card-1 card-div">
        <div class="img-div">
            <img :src="carDetail.image" :alt="`${carDetail.name}'s image`" />
        </div>
        <div class="card-body-container">
            <h2 class="item-name">{{ carDetail.name }}</h2>
            <p class="card-description">{{ displayTruncatedDescription }}</p>
            <div class="card-buttons-container">
                <div class="card-info-button">
                    <NuxtLink :to="`/details/${carDetail.id}`">
                        <BaseButton class="card"> Info </BaseButton>
                    </NuxtLink>
                </div>
                <div>
                    <img
                        src="../public/images/edit_icon.png"
                        class="edit-icon"
                        alt="editIcon"
                        @click="editCarDetails"
                        data-bs-toggle="modal"
                        data-bs-target="#backdrop-overlay-modal"
                    />
                    <img
                        src="../public/images/delete_icon.png"
                        class="edit-icon"
                        alt="editIcon"
                        @click="deleteCarDetails"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    //
    import useModalFormStore from "../stores/modalForm";
    import { storeToRefs } from "pinia";

    // State and Variables
    const emits = defineEmits(["delete-car-details"]);
    const props = defineProps(["carDetail"]);
    const modalFormStore = useModalFormStore();
    const { selectedCarForEditing, modalType } = storeToRefs(modalFormStore);

    // Methods
    function editCarDetails() {
        // Setting value in global store which will automatically reactive at other components
        modalType.value = "edit";
        selectedCarForEditing.value = { ...props.carDetail };
        // we are passing object by value instead of passing by reference
    }
    function deleteCarDetails() {
        emits("delete-car-details", props.carDetail.id, props.carDetail);
    }
    const displayTruncatedDescription = computed(() => {
        return props.carDetail?.details?.slice(0, 200) + "...";
    });
</script>

<style scoped>
    /* Card Styling */
    .card-div {
        width: 20em;
        min-height: 20em;
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        background-color: var(--card-main-color);
        margin: 0.6em;
        box-sizing: border-box;
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: transform 0.2s ease-in-out;
    }

    .img-div {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background-color: var(--card-1-secondary-color);
    }

    .img-div img {
        width: 20rem;
        height: 11rem;
        object-fit: cover;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .card-body-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 1.5em;
        padding-top: 1em;
        padding-bottom: 1em;
        box-sizing: border-box;
    }

    .card-body-container .item-name {
        margin: 0.2em 0;
        text-align: center;
    }

    .card-body-container .item-name {
        font-size: 1.2em;
        font-weight: var(--title-font-weight);
        color: #606d75;
    }

    .card-body-container .card-description {
        text-align: left;
        font-size: 0.9em;
        font-weight: var(--date-font-weight);
        color: var(--date-text-color);
    }
    .card-description {
        min-height: 86px;
    }

    .card-buttons-container {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0.25em 0 0 0;
    }

    .card-info-button {
        display: flex;
        flex-direction: column;
        text-align: left;
    }

    .edit-icon {
        cursor: pointer;
        width: 32px;
        margin-inline-start: 0.4rem;
    }
</style>
