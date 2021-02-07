export type TodoList = Record<string, TodoItem[]>;

export interface TodoItem {
    title: string;
    description?: string;
    createdAt: number;
    checked: boolean;
    position: number;
}

export const DefaultTodoList: TodoList = {
    Important: [],
    Tasks: [],
};

export const TodoManager = {
    db_name: "todo_list",
    getList(): TodoList {
        const raw = localStorage.getItem(this.db_name);
        let todos: TodoList = {};
        if (raw) {
            try {
                const parsed = JSON.parse(raw || "");
                if (typeof parsed === "object") todos = parsed;
            } catch (err) {
                throw new Error("Could not parse data");
            }
        } else todos = DefaultTodoList;
        return filterList(todos);
    },
    setList(list: TodoList): void {
        return localStorage.setItem(
            this.db_name,
            JSON.stringify(filterList(list))
        );
    },
    resetList(): void {
        return localStorage.removeItem(this.db_name);
    },
};

function filterList(list: TodoList): TodoList {
    for (const item in list) {
        list[item] = list[item].filter((x) => x);
    }
    return list;
}
