<template>
    <div>
        <LoginForm />
    </div>
</template>

<script setup>
    useHead({
        title: "Login | Carpedia",
    });

    definePageMeta({
        middleware: ["guest"],
    });
</script>
