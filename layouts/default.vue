<template>
    <div>
        <ClientOnly>
            <TheNavbar />
        </ClientOnly>
        <RectangularLoader v-if="showHideSpinner" />
        <slot v-else />
    </div>
</template>

<script setup>
    const showHideSpinner = ref(true);

    onMounted(() => {
        showHideSpinner.value = false;
    });
</script>
