<template>
    <div v-if="list">
        <!-- Lists -->
        <div class="tabs is-centered">
            <ul>
                <li
                    v-for="name in Object.keys(list)"
                    :key="name"
                    :class="current === name ? 'is-active' : ''"
                    @click="switchTab(name)"
                >
                    <a>{{ name }}</a>
                </li>
                <li @click="toggleNewTab()"><a>+</a></li>
            </ul>
        </div>

        <!-- New Tab Popup -->
        <div class="modal" id="newTabPopup">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box has-text-centered">
                    <p class="subtitle">Create a new List</p>
                    <div class="field">
                        <input
                            class="input"
                            id="newTabInput"
                            type="text"
                            placeholder="Name of the list"
                        />
                    </div>
                    <div class="buttons is-centered">
                        <button
                            class="button is-success"
                            @click="createNewTab()"
                        >
                            Add
                        </button>
                        <button
                            class="button is-danger"
                            @click="toggleNewTab()"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <button
                class="modal-close is-large"
                aria-label="close"
                @click="toggleNewTab()"
            ></button>
        </div>

        <section class="section" style="padding-top: 1rem">
            <div class="container">
                <!-- Actions -->
                <div v-if="list[current]" class="buttons is-right">
                    <button
                        class="button is-success"
                        @click="toggleNewListItem()"
                    >
                        New Task
                    </button>
                    <button
                        class="button is-danger"
                        @click="deleteTab(current)"
                    >
                        Delete List
                    </button>
                </div>

                <!-- List -->
                <div v-if="list[current]">
                    <div class="box" id="newListItem" style="display: none">
                        <div class="field">
                            <input
                                class="input"
                                id="newListItemTitle"
                                type="text"
                                placeholder="Item title"
                            />
                        </div>
                        <div class="field">
                            <textarea
                                class="textarea"
                                id="newListItemDescription"
                                placeholder="Item description"
                            />
                        </div>
                        <div class="buttons is-centered">
                            <button
                                class="button is-success"
                                @click="createNewListItem()"
                            >
                                Add
                            </button>
                            <button
                                class="button is-danger"
                                @click="toggleNewListItem()"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <div v-if="list[current].length">
                        <div
                            class="box"
                            v-for="(item, itemindex) in list[current].sort(
                                (a, b) => b.position - a.position
                            )"
                            :key="item"
                        >
                            <div class="columns is-vcentered">
                                <div
                                    class="column"
                                    style="max-width: max-content"
                                >
                                    <input
                                        type="checkbox"
                                        style="width: 20px; height: 20px"
                                        :checked="item.checked"
                                        @click="toggleListItemCheck(itemindex)"
                                    />
                                </div>
                                <div class="column is-four-fifths">
                                    <p
                                        class="has-text-weight-bold"
                                        style="
                                            overflow-wrap: break-word;
                                            word-wrap: break-word;
                                        "
                                    >
                                        {{ item.title }}
                                    </p>
                                    <p
                                        v-if="item.description"
                                        style="
                                            overflow-wrap: break-word;
                                            word-wrap: break-word;
                                        "
                                    >
                                        {{ item.description }}
                                    </p>
                                    <p
                                        class="is-size-7 has-text-grey"
                                        style="margin-top: 2px"
                                    >
                                        Created on:
                                        {{
                                            new Date(
                                                item.createdAt
                                            ).toLocaleString() || "Unknown"
                                        }}
                                    </p>
                                </div>
                                <div class="column">
                                    <div
                                        class="buttons are-small is-right"
                                        style="height: 100%"
                                    >
                                        <button
                                            class="button is-light is-link"
                                            style="
                                                padding-left: 6px;
                                                padding-right: 6px;
                                            "
                                            @click="
                                                moveListItem(
                                                    itemindex,
                                                    itemindex - 1
                                                )
                                            "
                                        >
                                            <span
                                                class="mi mi-arrow-upward"
                                                style="font-size: 16px"
                                            ></span>
                                        </button>
                                        <button
                                            class="button is-light is-link"
                                            style="
                                                padding-left: 6px;
                                                padding-right: 6px;
                                            "
                                            @click="
                                                moveListItem(
                                                    itemindex,
                                                    itemindex + 1
                                                )
                                            "
                                        >
                                            <span
                                                class="mi mi-arrow-downward"
                                                style="font-size: 16px"
                                            ></span>
                                        </button>
                                        <button
                                            class="button is-light is-danger"
                                            style="
                                                padding-left: 8px;
                                                padding-right: 8px;
                                            "
                                            @click="removeListItem(itemindex)"
                                        >
                                            <span
                                                class="mi mi-delete"
                                                style="font-size: 16px"
                                            ></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-else id="msg">Seems like this list is empty</p>
                </div>
                <p v-else id="msg">Choose a list to view the list!</p>
            </div>
        </section>
    </div>
    <p v-else-if="error" id="msg">{{ error }}</p>
    <p v-else id="msg">Preparing your bread...</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TodoManager, TodoList, TodoItem } from "../utils/Manager";

export default defineComponent({
    name: "Sidebar",
    data() {
        const data: {
            list: TodoList | null;
            current: string | null;
            error: string | null;
        } = {
            list: null,
            current: null,
            error: null,
        };
        return data;
    },
    mounted() {
        this.fetchTodo();
        if (this.list) this.switchTab(Object.keys(this.list)[0]);
    },
    methods: {
        fetchTodo() {
            try {
                this.list = TodoManager.getList();
            } catch (error) {
                this.list = error.toString();
            }
        },
        updateList() {
            if (this.list) TodoManager.setList(this.list);
            this.fetchTodo();
        },
        switchTab(tab: string) {
            this.current = tab;
        },
        toggleNewTab() {
            const popup = document.getElementById("newTabPopup");
            popup?.classList.toggle("is-active");
        },
        createNewTab() {
            const input = document.getElementById("newTabInput");
            const toggleDanger = () => input?.classList.add("is-danger");
            // @ts-ignore
            const name: string | null = input?.value;
            if (name?.length) {
                if (!this.list) this.list = {};
                if (this.list[name]) return toggleDanger();
                this.list[name] = [];
                this.updateList();
                this.toggleNewTab();
                // @ts-ignore
                input.value = "";
            } else toggleDanger();
        },
        deleteTab(name: string) {
            if (this.list) {
                delete this.list[name];
                this.updateList();
            }
        },
        toggleNewListItem() {
            const litem = document.getElementById("newListItem");
            if (!litem) return;
            if (litem.style.display === "block") litem.style.display = "none";
            else litem.style.display = "block";
        },
        createNewListItem() {
            const input = document.getElementById("newListItemTitle");
            const descput = document.getElementById("newListItemDescription");
            const toggleDanger = () => input?.classList.add("is-danger");
            // @ts-ignore
            const title: string | null = input?.value;
            // @ts-ignore
            const desc: string | null = descput?.value;
            if (title?.length) {
                if (!this.current) return;
                if (!this.list) this.list = {};
                if (!this.list[this.current]) this.list[this.current] = [];
                this.list[this.current].push({
                    title,
                    description: desc || undefined,
                    createdAt: Date.now(),
                    checked: false,
                    position: this.list[this.current].length,
                });
                this.updateList();
                this.toggleNewListItem();
                // @ts-ignore
                input.value = descput.value = "";
            } else toggleDanger();
        },
        removeListItem(index: number) {
            if (this.list && this.current && this.list[this.current]) {
                this.list[this.current].splice(index, 1);
                this.updateList();
            }
        },
        moveListItem(from: number, to: number) {
            if (
                from > -1 &&
                to > -1 &&
                this.list &&
                this.current &&
                this.list[this.current]
            ) {
                const ele = this.list[this.current].splice(from, 1)[0];
                if (ele) {
                    this.list[this.current].splice(to, 0, ele);
                    this.updateList();
                }
            }
        },
        toggleListItemCheck(index: number) {
            if (
                this.list &&
                this.current &&
                this.list[this.current] &&
                this.list[this.current][index]
            ) {
                this.list[this.current][index].checked = !this.list[
                    this.current
                ][index].checked;
                this.updateList();
            }
        },
    },
});
</script>

<style scoped>
#msg {
    font-size: 1.5rem;
    text-align: center;
    padding-top: 2rem;
}
</style>
