<template>
    <Navbar />
    <Content />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Navbar from "./components/Navbar.vue";
import Content from "./components/Content.vue";

export default defineComponent({
    name: "App",
    components: {
        Navbar,
        Content,
    },
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

* {
    padding: 0;
    margin: 0;
}

body {
    font-family: "Poppins", sans-serif;
    overflow: hidden;
}
</style>
