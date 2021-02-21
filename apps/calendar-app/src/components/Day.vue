<template>
  <div class="flex flex-col md:flex-row items-center justify-between">
    <Logo class="mx-8 mt-6 md:mb-4" />
    <div
      class="cursor-pointer transition duration-400 hover:bg-gray-200 mx-8 px-4 py-2 text-gray-600"
      @click="goHome()"
    >
      <Icon icon="chevron-left" />
      <span class="mx-2 text-lg">Go Back</span>
    </div>
  </div>
  <p v-if="err">{{ err }}</p>
  <div class="mx-10" v-else>
    <br />
    <p class="text-center text-3xl text-indigo-600">
      {{ prefixes.days[day] }}, {{ date }} {{ prefixes.months[month - 1] }},
      {{ year }}
    </p>
    <br />
    <div class="flex justify-between">
      <p class="text-4xl text-indigo-600">Events</p>
      <button
        class="text-xl cursor-pointer"
        @click="dispNewEvent = !dispNewEvent"
      >
        <Icon v-if="!dispNewEvent" icon="plus" />
        <Icon v-else icon="times" />
      </button>
    </div>
    <ul class="list-inside text-lg font-serif">
      <li
        :class="prefixes.listClassNames"
        v-if="!events.length || dispNewEvent"
      >
        <input
          class="bg-indigo-100 w-full"
          type="text"
          placeholder="Add an event or note (Type here)"
          v-model="nList.title"
          @keyup.enter="addNewEvent()"
        />
        <textarea
          class="bg-indigo-100 w-full"
          type="text"
          placeholder="Add an event description (Optional)"
          v-model="nList.description"
          @keyup.enter="addNewEvent()"
        >
        </textarea>
      </li>
      <li
        :class="prefixes.listClassNames"
        v-for="(note, index) in events"
        :key="index"
      >
        <div class="flex justify-between">
          <p class="cursor-pointer mr-2" @click="toggleCheck(index)">
            <Icon
              v-if="events[index].checked"
              :icon="['far', 'check-circle']"
            />
            <Icon v-else :icon="['far', 'circle']" />
          </p>
          <p class="font-bold flex-1">{{ note.title }}</p>
          <p class="cursor-pointer" @click="removeEvent(index)">
            <Icon icon="trash" />
          </p>
        </div>
        <p v-if="note.description">
          {{ note.description }}
        </p>
        <p class="opacity-40 text-sm">
          Added on: <b>{{ new Date(note.addedOn).toLocaleString() }}</b>
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Database, Constants, IEvent } from "../util";
import Logo from "./Logo.vue";

export default defineComponent({
  name: "Day",
  components: {
    Logo,
    Icon: FontAwesomeIcon,
  },
  data() {
    const data: {
      date: number;
      day: number;
      month: number;
      year: number;
      events: IEvent[];
      err: string | null;
      prefixes: Record<string, any>;
      nList: Omit<IEvent, "addedOn" | "checked">;
      dispNewEvent: boolean;
    } = {
      date: 0,
      day: 0,
      month: 0,
      year: 0,
      events: [],
      err: null,
      prefixes: {
        days: Constants.days,
        months: Constants.months,
        listClassNames: [
          "bg-indigo-100",
          "text-gray-600",
          "rounded",
          "px-5",
          "py-3",
          "my-2",
        ],
      },
      nList: {
        title: "",
        description: "",
      },
      dispNewEvent: false,
    };
    return data;
  },
  mounted() {
    this.configure();
  },
  methods: {
    configure() {
      if (
        typeof this.$route.params.date === "string" &&
        typeof this.$route.params.month === "string" &&
        typeof this.$route.params.year === "string"
      ) {
        const d = parseInt(this.$route.params.date);
        const m = parseInt(this.$route.params.month);
        const y = parseInt(this.$route.params.year);
        if (d && m && y) {
          const parsed = new Date(y, m, d);
          if (parsed instanceof Date && !isNaN(parsed as any)) {
            this.date = parsed.getDate();
            this.day = parsed.getDay();
            this.month = parsed.getMonth();
            this.year = parsed.getFullYear();
            this.$router.push({
              params: {
                date: this.date.toString(),
                month: this.month.toString(),
                year: this.year.toString(),
              },
              query: this.$route.query,
            });
            const ev = Database.get(this.getCurrentID());
            if (ev) this.events = ev.events[this.date.toString()] || [];
          }
          return;
        }
      }
      this.err = "Seems like an invalid date";
    },
    getCurrentID() {
      return `${this.month}_${this.year}`;
    },
    addNewEvent() {
      if (!this.nList.title.length) return;
      this.events.splice(0, 0, {
        title: this.nList.title,
        description: this.nList.description,
        addedOn: Date.now(),
        checked: false,
      });
      this.syncEvents();
      this.nList = {
        title: "",
        description: "",
      };
    },
    removeEvent(index: number) {
      this.events.splice(index, 1);
      this.syncEvents();
    },
    toggleCheck(index: number) {
      this.events[index].checked = !this.events[index].checked;
      this.syncEvents();
    },
    syncEvents() {
      let ev = Database.get(this.getCurrentID());
      if (!ev)
        ev = {
          events: {},
        };
      ev.events[this.date] = this.events;
      Database.set(this.getCurrentID(), ev);
    },
    goHome() {
      this.$router.push({
        path: "/",
        query: this.$route.query,
      });
    },
  },
});
</script>
