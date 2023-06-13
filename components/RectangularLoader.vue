<template>
    <div class="loader">
        <div class="box1"></div>
        <div class="box2"></div>
        <div class="box3"></div>
    </div>
</template>

<style scoped>
    .loader {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .box1,
    .box2,
    .box3 {
        border: 14px solid rgb(96, 109, 117);
        border-radius: 10px;
        box-sizing: border-box;
        position: absolute;
        display: block;
        background-color: rgb(96, 109, 117);
    }

    .box1 {
        width: 100px;
        height: 42px;
        margin-top: 64px;
        margin-left: 0px;
        animation: abox1 3s 0.2s forwards ease-in-out infinite;
    }

    .box2 {
        width: 42px;
        height: 42px;
        margin-top: 0px;
        margin-left: 0px;
        animation: abox2 3s 0.2s forwards ease-in-out infinite;
    }

    .box3 {
        width: 42px;
        height: 42px;
        margin-top: 0px;
        margin-left: 64px;
        animation: abox3 3s 0.2s forwards ease-in-out infinite;
    }

    @keyframes abox1 {
        0% {
            width: 100px;
            height: 42px;
            margin-top: 64px;
            margin-left: 0px;
        }

        12.5% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 0px;
        }

        25% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 0px;
        }

        37.5% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 0px;
        }

        50% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 0px;
        }

        62.5% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 0px;
        }

        75% {
            width: 42px;
            height: 100px;
            margin-top: 0px;
            margin-left: 0px;
        }

        87.5% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 0px;
        }

        100% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 0px;
        }
    }

    @keyframes abox2 {
        0% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 0px;
        }

        12.5% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 0px;
        }

        25% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 0px;
        }

        37.5% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 0px;
        }

        50% {
            width: 100px;
            height: 42px;
            margin-top: 0px;
            margin-left: 0px;
        }

        62.5% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 64px;
        }

        75% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 64px;
        }

        87.5% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 64px;
        }

        100% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 64px;
        }
    }

    @keyframes abox3 {
        0% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 64px;
        }

        12.5% {
            width: 42px;
            height: 42px;
            margin-top: 0px;
            margin-left: 64px;
        }

        25% {
            width: 42px;
            height: 100px;
            margin-top: 0px;
            margin-left: 64px;
        }

        37.5% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 64px;
        }

        50% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 64px;
        }

        62.5% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 64px;
        }

        75% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 64px;
        }

        87.5% {
            width: 42px;
            height: 42px;
            margin-top: 64px;
            margin-left: 64px;
        }

        100% {
            width: 100px;
            height: 42px;
            margin-top: 64px;
            margin-left: 0px;
        }
    }
</style>
