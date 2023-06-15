<template>
    <RegisterForm />
</template>

<script setup>
    useHead({
        title: "Register | Carpedia",
    });

    definePageMeta({
        middleware: ["guest"],
    });
</script>
