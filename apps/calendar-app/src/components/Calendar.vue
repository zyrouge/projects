<template>
  <div
    class="flex flex-col md:flex-row justify-between items-center pb-5 text-indigo-600 text-3xl md:mx-24 mt-10"
  >
    <Logo />
    <div class="text-center">
      <p>
        {{ prefixes.months[current.month - 1] }}
      </p>
      <p class="flex justify-center items-stretch">
        <button :class="prefixes.iconClassNames" @click="decrementYear()">
          <Icon icon="chevron-left" />
        </button>
        <span class="mx-4 text-6xl">{{ current.year }}</span>
        <button :class="prefixes.iconClassNames" @click="incrementYear()">
          <Icon icon="chevron-right" />
        </button>
      </p>
    </div>
  </div>
  <div class="flex items-stretch justify-center mx-5 md:mx-10">
    <button :class="prefixes.iconClassNames" @click="decrementMonth()">
      <Icon icon="chevron-left" />
    </button>
    <table
      class="border-separate flex-grow table w-full mx-2 md:mx-6 py-2 md:py-5 text-xl"
      id="cal-table"
    >
      <thead>
        <tr class="bg-indigo-600 text-white">
          <th
            class="py-2 rounded-full shadow"
            v-for="d in prefixes.days"
            :key="d"
          >
            {{ d.slice(0, 3).toUpperCase() }}
          </th>
        </tr>
      </thead>
      <tbody class="font-bold">
        <tr class="border border-gray-300" v-for="tab in table.tabs" :key="tab">
          <th
            :class="getDateClassNames(date)"
            v-for="date in tab"
            :key="date"
            @click="pushTo(date)"
          >
            <p v-if="date">{{ date }}</p>
            <p class="opacity-30" v-else>-</p>
            <span
              class="absolute text-sm text-white bottom-1 right-1 bg-yellow-500 rounded-full w-5 h-5"
              title="Seems like something has to be done, click me to view"
              v-if="
                date &&
                current.data.events[date.toString()] &&
                current.data.events[date.toString()].length
              "
            >
              !
            </span>
          </th>
        </tr>
      </tbody>
    </table>
    <button :class="prefixes.iconClassNames" @click="incrementMonth()">
      <Icon icon="chevron-right" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { Database, IMonthEvents, Constants } from "../util";
import Logo from "./Logo.vue";

type ITab = number[][];
interface ITable {
  days: number;
  tabs: ITab;
}

export default defineComponent({
  name: "Calendar",
  components: {
    Logo,
    Icon: FontAwesomeIcon,
  },
  data() {
    const data: {
      today: {
        date: number;
        month: number;
        year: number;
      };
      current: {
        month: number;
        year: number;
        data: IMonthEvents;
      };
      table: ITable;
      prefixes: Record<string, any>;
    } = {
      today: {
        date: 0,
        month: 0,
        year: 0,
      },
      current: {
        month: 0,
        year: 0,
        data: {
          events: {},
        },
      },
      prefixes: {
        days: Constants.days,
        months: Constants.months,
        iconClassNames: [
          "text-3xl",
          "text-indigo-300",
          "hover:text-indigo-500",
          "transition",
          "duration-400",
          "cursor-pointer",
          "w-10",
        ],
      },
      table: {
        days: 0,
        tabs: [],
      },
    };
    return data;
  },
  mounted() {
    let month: number | undefined, year: number | undefined;
    if (
      typeof this.$route.query.month === "string" &&
      typeof this.$route.query.year === "string"
    ) {
      const m = parseInt(this.$route.query.month);
      const y = parseInt(this.$route.query.year);
      if (m && y) {
        const parsed = new Date(y, m);
        if (parsed instanceof Date && !isNaN(parsed as any)) {
          month = parsed.getMonth();
          year = parsed.getFullYear();
        }
      }
    }
    this.prerequisite({ month, year });
  },
  methods: {
    prerequisite(current?: { month?: number; year?: number }) {
      const today = new Date();
      this.current.month = current?.month || today.getMonth() + 1;
      this.current.year = current?.year || today.getFullYear();
      this.today = {
        date: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear(),
      };
      this.configure();
      this.watch();
    },
    configure() {
      this.table = this.getTable(this.current.year, this.current.month);
      this.updateEvents();
      this.$router.replace({
        query: {
          month: this.current.month.toString(),
          year: this.current.year.toString(),
        },
      });
    },
    watch() {
      watch(this.current, this.configure);
    },
    getTable(year: number, month: number): ITable {
      const fday = new Date(year, month, 0);
      const lday = new Date(year, month, 1);
      const days = fday.getDate();
      const firstday = lday.getDay();
      const tabs = this.getTabs(days, firstday);
      return { days, tabs };
    },
    getTabs(noofdays: number, firstday: number): ITab {
      const tabs: ITab = [];
      const weeks = Math.ceil((noofdays + firstday) / 7);
      let prevday = 0;
      for (let i = 0; i < weeks; i++) {
        tabs[i] = [];
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && firstday > j) || prevday >= noofdays) {
            tabs[i].push(0);
          } else {
            prevday += 1;
            tabs[i].push(prevday);
          }
        }
      }
      return tabs;
    },
    getCurrentID() {
      return `${this.current.month}_${this.current.year}`;
    },
    updateEvents() {
      const data = Database.get(this.getCurrentID());
      if (data) this.current.data = data;
    },
    getDateClassNames(date: number) {
      const names: string[] = [
        "relative",
        "border",
        "py-3",
        "md:py-6",
        "rounded-lg",
        "shadow-sm",
        "hover:bg-gray-100",
        "transition",
        "duration-200",
        "cursor-pointer",
        "font-mono",
      ];
      if (
        this.current.year === this.today.year &&
        this.current.month === this.today.month &&
        date === this.today.date
      )
        names.push("bg-indigo-500", "text-white", "hover:bg-indigo-600");
      return names;
    },
    incrementMonth() {
      this.current.month =
        this.current.month + 1 > 12 ? 1 : this.current.month + 1;
    },
    decrementMonth() {
      this.current.month =
        this.current.month - 1 < 1 ? 12 : this.current.month - 1;
    },
    incrementYear() {
      this.current.year += 1;
    },
    decrementYear() {
      this.current.year -= 1;
    },
    pushTo(date: number) {
      this.$router.push({
        path: `/${this.current.year}/${this.current.month}/${date}`,
        query: this.$route.query,
      });
    },
  },
});
</script>

<style scoped>
#cal-table {
  border-spacing: 0.5rem;
}
</style>
