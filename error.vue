<template>
    <div class="not_found">
        <img src="images/404Error-pana.png" alt="" />
        <BaseButton class="card" size="lg" @click="backToHome"
            >Go Back To Home</BaseButton
        >
    </div>
</template>

<script setup>
    const backToHome = () => {
        clearError({ redirect: "/" });
    };
</script>

<style scoped>
    .not_found {
        color: red;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .not_found > img {
        width: max(316px, 25%);
    }
</style>
