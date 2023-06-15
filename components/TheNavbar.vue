<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container justify-content-around">
            <div class="navbar-logo-text">
                <NuxtLink to="/" @click="showNavbar = false">
                    <h2>{{ headingContent }}</h2>
                </NuxtLink>
                <h6>-{{ tagLine }}</h6>
            </div>

            <button
                class="navbar-toggler"
                type="button"
                aria-controls="navbarNav"
                @click="showNavbar = !showNavbar"
                :aria-expanded="showNavbar ? 'true' : 'false'"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div
                class="collapse navbar-collapse justify-content-end my-3"
                :class="{ show: showNavbar }"
                id="navbarNav"
            >
                <div class="user_detail" v-if="isAuthenticated">
                    <img
                        class="user_logo"
                        src="/images/userlogo.png"
                        alt="userlogo"
                    />
                    <h4>{{ getLoggedInUserName }}</h4>
                </div>
                <ul class="navbar-nav">
                    <li class="nav-item" v-if="isAuthenticated">
                        <NuxtLink to="/" @click="showNavbar = false">
                            <BaseButton class="navbar" size="sm">
                                <h4>Home</h4>
                            </BaseButton>
                        </NuxtLink>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <NuxtLink to="/login" @click="showNavbar = false">
                            <BaseButton class="navbar" size="lg">
                                <h4>Login</h4>
                            </BaseButton>
                        </NuxtLink>
                    </li>
                    <li class="nav-item" v-if="!isAuthenticated">
                        <NuxtLink to="/register" @click="showNavbar = false">
                            <BaseButton class="navbar" size="sm">
                                <h4>Register</h4>
                            </BaseButton>
                        </NuxtLink>
                    </li>
                    <li class="nav-item" v-if="isAuthenticated">
                        <NuxtLink to="/login">
                            <BaseButton
                                class="navbar"
                                size="sm"
                                @click="handleLogout"
                            >
                                <h4>Logout</h4>
                            </BaseButton>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import useAuthStore from "~/stores/authStore";

    const authStore = useAuthStore();
    const { isAuthenticated, getLoggedInUserName } = storeToRefs(authStore);
    const { handleLogout } = authStore;
    const showNavbar = ref(false);
    const headingContent = "Carpedia";
    const tagLine = "Your encyclopedia of all things automotive";
</script>

<style scoped>
    .navbar {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: sticky;
        top: 0;
        gap: 10;
        z-index: 100;
        background-color: var(--header-background);
    }
    h4 {
        margin: 0;
    }

    .navbar .navbar-logo-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .router-link-active > button {
        color: white;
    }

    h2 {
        color: #fff;
        font-size: 45px;
        margin: 0;
        padding: 0;
        text-align: center;
    }

    h6 {
        color: #fff;
        padding: 0;
        margin-block: 0.5rem;
        text-align: center;
    }

    .container-fluid {
        display: flex;
        justify-content: space-around;
    }

    .user_logo {
        width: 2.5rem;
    }

    .user_detail {
        display: flex;
        align-items: center;
        margin: 0 20px;
        color: white;
        /* box-shadow: 0 0px 2px 1px white; */
        border-radius: 3rem;
        padding: 2px 0.8rem;
        gap: 0.5rem;
        background: #6b7a83;
        max-width: fit-content;
    }

    @media screen and (max-width: 600px) {
        header {
            padding-block: 10px;
        }

        .button {
            padding: 8px 20px;
        }

        .navbar h6 {
            display: none;
        }
    }
</style>
