<template>
    <div class="card-container--layer">
        <div class="add-car-container">
            <BaseButton class="card" size="lg" @click="openAddCarModal">
                Add
            </BaseButton>
        </div>
        <div class="no_cars_found" v-if="carDetails.length === 0">
            <h1>No Cars Found!</h1>
            <img src="/images/No_cars.png" />
        </div>

        <div class="card-container" v-else>
            <TransitionGroup name="fade" mode="out-in" appear>
                <GalleryCard
                    v-for="(car, index) in carDetails"
                    :carDetail="car"
                    :key="car.id"
                    :style="{ transitionDelay: `${0.03 * index}s` }"
                />
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup>
    import Swal from "sweetalert2";
    import useCarDataStore from "~/stores/carData";
    import { storeToRefs } from "pinia";
    import useModalFormStore from "~/stores/modalForm";

    const modalFormStore = useModalFormStore();
    const carDataStore = useCarDataStore();
    const { getCarDetails: carDetails } = storeToRefs(carDataStore);
    const { deleteCar, fetchAllCars } = carDataStore;
    const { modalType, openModal } = storeToRefs(modalFormStore);

    // Add Car Modal Handler
    const openAddCarModal = () => {
        modalType.value = "add";
        openModal.value = true;
    };

    // Delete Car Handler
</script>

<style scoped>
    .card-container--layer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 3em 1em 1em 1em;
    }

    .no_cars_found {
        width: 100%;
        color: #606d75;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-block: 1rem;
    }

    .no_cars_found > img {
        width: max(316px, 25%);
    }

    .add-car-container {
        display: flex;
        width: 100%;
        flex-direction: row-reverse;
        padding-inline: 15%;
    }

    .fade-enter-active,
    .fade-leave-active {
        opacity: 0.5;
        transition: all 0.5s ease-in-out;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: translateY(6rem);
    }
    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
    }
</style>
