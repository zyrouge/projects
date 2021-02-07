<template>
    <section class="hero is-link has-text-centered">
        <div class="hero-body">
            <p class="title">Todo App</p>
            <p class="subtitle">
                Simple todo app that uses <b>localstorage</b> to store your
                data!
            </p>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Sidebar",
});
</script>
