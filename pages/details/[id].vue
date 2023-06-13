<template>
    <RectangularLoader v-if="getIsLoaderStarted" />
    <div class="car-card-container px-4" v-else>
        <div>
            <NuxtLink to="/">
                <BaseButton class="card" size="lg">back</BaseButton>
            </NuxtLink>
        </div>

        <div class="card mb-3 mx-sm-2" style="max-width: 70rem">
            <div class="row g-0">
                <div class="col-md-7">
                    <img
                        :src="carDetail?.image"
                        class="img-fluid rounded-start"
                        alt="..."
                    />
                </div>
                <div class="col-md-5">
                    <div class="card-body">
                        <h1 class="card-title">{{ carDetail?.name }}</h1>
                        <h4 class="card-text">Price:-{{ carDetail?.price }}</h4>
                        <p class="card-text">{{ carDetail?.details }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import useCarDataStore from "../../stores/carData";

    const carDataStore = useCarDataStore();
    const route = useRoute();
    const { getIsLoaderStarted, getDetailsOfSelectedCar: carDetail } =
        storeToRefs(carDataStore);
    const { fetchCarDetailsById } = carDataStore;

    fetchCarDetailsById(route.params.id);
</script>

<style scoped>
    h1,
    h4,
    p {
        color: #606d75;
    }

    h1 {
        margin-block: 10px;
    }

    p,
    h4 {
        margin-block: 20px;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .car-card-container {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        width: 70rem;
        max-width: fit-content;
        margin-inline: auto;
        margin-top: 10%;
    }

    .car-card-container > button {
        margin-right: 10px;
    }

    .car-detail--container {
        display: flex;
        background-color: whitesmoke;
        padding: 1.5em 1.5em 1.5em 1.5em;
        box-sizing: border-box;
        margin-inline: auto;
        margin-inline: 10px;
        border-radius: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        transition: transform 0.2s ease-in-out;
    }

    .container--right,
    .container--left {
        min-width: 300px;
    }

    @media screen and (max-width: 680px) {
        .car-card-container {
            width: fit-content;
        }
    }
</style>
