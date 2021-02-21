<template>
  <router-view />
  <br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "./components/Calendar.vue";

export default defineComponent({
  name: "App",
  components: {
    Calendar,
  },
});
</script>
