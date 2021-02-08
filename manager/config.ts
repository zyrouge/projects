import path from "path";

interface ProjectOpts {
    dir: string;
    build: string;
    cmd: string;
    tags: string[];
}

interface IProject {
    name: string;
    src: string;
    cmd: string;
    dist: string;
    tags: string[];
}

const root = path.resolve(__dirname, "..");
const base = path.join(root, "apps");

const createProject = ({ dir, cmd, build, tags }: ProjectOpts): IProject => {
    const src = path.join(base, dir);
    const dist = path.join(src, build);
    return { name: dir, src, cmd, dist, tags };
}

export const Projects: IProject[] = [
    createProject({
        dir: "todo-app",
        build: "dist",
        cmd: "npm install -D && npm run build -- --base=/todo-app/",
        tags: ["Node.js", "Vue 3"]
    }),
];

export const copyables: {
    from: string; to: string;
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
