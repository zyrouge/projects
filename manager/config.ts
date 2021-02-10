import path from "path";

export interface IProject {
    name: string;
    description: string;
    image: string;
    cmd: string;
    dir: string;
    dist: string;
    tags: string[];
}

const root = path.resolve(__dirname, "..");

export const Projects: IProject[] = [
    {
        name: "Todo App",
        dir: "todo-app",
        description: "Simple Todo app that uses <b>localstorage</b> to store all the data.",
        image: "/images/notepad.jpg",
        dist: "dist",
        cmd: "npm install -D && npm run build -- --base=/todo-app/",
        tags: ["Node.js", "Vue 3"]
    },
];

export const copyables: {
    from: string;
    to: string;
}[] = [
    {
        from: path.join(__dirname, "public"),
        to: path.join(root, "docs")
    }
];

export const deletables: string[] = [
    path.join(root, "apps"),
    path.join(root, "manager"),
    path.join(root, ".github"),
    path.join(root, ".gitignore")
];
