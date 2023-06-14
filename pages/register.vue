<template>
    <RegisterForm />
</template>

<script setup>
    definePageMeta({
        middleware: ["guest"],
    });
</script>
