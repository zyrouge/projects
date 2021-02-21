<template>
  <div>
    <div
      class="font-sans flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 h-full w-full px-2 py-2"
    >
      <p class="text-5xl text-white my-5">Age Calculator</p>
      <div class="mb-5">
        <input
          class="mx-2 text-center text-3xl rounded w-20"
          type="text"
          min="1"
          max="31"
          placeholder="DD"
          v-model="dob.date"
        />
        <input
          class="mx-2 text-center text-3xl rounded w-20"
          type="text"
          min="1"
          max="12"
          placeholder="MM"
          v-model="dob.month"
        />
        <input
          class="mx-2 text-center text-3xl rounded w-28"
          type="text"
          placeholder="YYYY"
          v-model="dob.year"
        />
      </div>
    </div>
    <br />
    <p class="text-xl text-center" v-if="err">
      <span class="rounded-full bg-red-500 text-white px-3 mr-2">!</span
      >{{ err }}
    </p>
    <div class="text-xl text-center" v-if="time">
      <p class="mb-3 text-3xl">
        Age: <b class="text-red-500">{{ Math.floor(time.yrs) }}</b>
      </p>
      <p class="font-bold underline">Time spent</p>
      <p>
        Years: <b>{{ time.yrs.toFixed(2) }}</b>
      </p>
      <p>
        Days: <b>{{ time.days.toFixed(2) }}</b>
      </p>
      <p>
        Hours: <b>{{ time.hrs.toFixed(2) }}</b>
      </p>
      <p>
        Minutes: <b>{{ time.mins.toFixed(2) }}</b>
      </p>
      <p>
        Seconds: <b>{{ time.sec.toFixed(2) }}</b>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, reactive } from "vue";

interface TimeSpent {
  sec: number;
  mins: number;
  hrs: number;
  days: number;
  yrs: number;
}

export default defineComponent({
  name: "App",
  data() {
    const data: {
      dob: {
        date: string;
        month: string;
        year: string;
      };
      time: TimeSpent | null;
      err: string | null;
    } = {
      dob: reactive({
        date: "14",
        month: "04",
        year: "2004",
      }),
      time: null,
      err: null,
    };
    return data;
  },
  mounted() {
    this.configure();
  },
  methods: {
    configure() {
      watch(this.dob, this.validate);
    },
    removeOtherChars(char: string, min?: number, max?: number) {
      const valid = new Array(10).fill(null).map((x, i) => i.toString());
      let num = char
        .split("")
        .filter((x) => valid.includes(x))
        .join("");
      if (min !== undefined && !Number.isNaN(min) && parseInt(num) < min)
        num = min.toString();
      if (max !== undefined && !Number.isNaN(max) && parseInt(num) > max)
        num = max.toString();
      return num;
    },
    validate() {
      this.dob.date = this.removeOtherChars(this.dob.date, 0, 31);
      this.dob.month = this.removeOtherChars(this.dob.month, 0, 12);
      this.dob.year = this.removeOtherChars(this.dob.year);
      this.update();
    },
    update() {
      if (
        !this.dob.year.length ||
        !this.dob.month.length ||
        !this.dob.date.length
      )
        return;

      const date = new Date(
        parseInt(this.dob.year),
        parseInt(this.dob.month),
        parseInt(this.dob.date)
      );
      if (!this.isValidDate(date)) {
        this.err = "Seems like an invalid date!";
        this.time = null;
        return;
      }

      const today = Date.now();
      const ms = today - date.getTime();
      this.time = this.getFormattedTime(ms);
      this.err = "";
    },
    isValidDate(date: any): date is Date {
      return date instanceof Date && !isNaN(date as any);
    },
    getFormattedTime(ms: number): TimeSpent {
      let sec = ms / 1000,
        mins = sec / 60,
        hrs = mins / 60,
        days = hrs / 24,
        yrs = days / 365.25;
      return { sec, mins, hrs, days, yrs };
    },
  },
});
</script>
