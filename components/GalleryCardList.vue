<template>
    <div class="card-container--layer">
        <div class="add-car-container">
            <BaseButton
                class="card"
                size="lg"
                @click="modalType = 'add'"
                data-bs-toggle="modal"
                data-bs-target="#backdrop-overlay-modal"
            >
                Add
            </BaseButton>
        </div>
        <div class="no_cars_found" v-if="carDetails.length === 0">
            <h1>No Cars Found!</h1>
            <img src="../public/images/No_cars.png" />
        </div>

        <div class="card-container" v-else>
            <TransitionGroup name="fade" mode="out-in" appear>
                <GalleryCard
                    v-for="(car, index) in carDetails"
                    :carDetail="car"
                    @delete-car-details="triggerDeleteCarHandler"
                    :key="car.id"
                    :style="{ transitionDelay: `${0.03 * index}s` }"
                />
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup>
    // import Swal from "sweetalert2";
    import useCarDataStore from "../stores/carData";
    import { storeToRefs } from "pinia";
    import useModalFormStore from "../stores/modalForm";

    const modalFormStore = useModalFormStore();
    const carDataStore = useCarDataStore();
    const { getCarDetails: carDetails } = storeToRefs(carDataStore);
    const { deleteCar, fetchAllCars } = carDataStore;
    const { modalType } = storeToRefs(modalFormStore);

    // Delete Car Handler
    async function triggerDeleteCarHandler(carId, carToBeDeleted) {
        if (confirm("Are you sure want to delete?")) {
            try {
                const res = await deleteCar(carId);
                await fetchAllCars();
                if (res?.status === 204) {
                    // TODO:
                    // Swal.fire(
                    //     `Deleted ${carToBeDeleted.name}!`,
                    //     "Your file has been deleted.",
                    //     "success"
                    // );
                    alert(`Deleted ${carToBeDeleted.name}!`);
                }
            } catch (e) {
                alert("Something went wrong!");
            }
        }

        // TODO: Remove once it's not needed
        // Swal.fire({
        //     title: "Are you sure?",
        //     text: "You won't be able to revert this!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!",
        // }).then(async (result) => {
        //     if (result.isConfirmed) {
        //         try {
        //             const res = await deleteCar(carId);
        //             await fetchAllCars();
        //             if (res?.status === 204) {
        //                 Swal.fire(
        //                     `Deleted ${carToBeDeleted.name}!`,
        //                     "Your file has been deleted.",
        //                     "success"
        //                 );
        //             }
        //         } catch (e) {
        //             alert("Something went wrong!");
        //         }
        //     }
        // });
    }
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
