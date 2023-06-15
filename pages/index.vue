<template>
    <main>
        <InputFormModal />
        <RectangularLoader v-if="getIsLoaderStarted" />
        <GalleryCardList v-else />
    </main>
</template>

<script setup>
    import useCarDataStore from "~/stores/carData";
    import { storeToRefs } from "pinia";

    useHead({
        title: "Home | Carpedia",
    });

    definePageMeta({
        middleware: ["auth"],
    });

    const carDataStore = useCarDataStore();
    const { getIsLoaderStarted } = storeToRefs(carDataStore);
    const { fetchAllCars } = carDataStore;

    fetchAllCars();
</script>
