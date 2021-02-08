import path from "path";

interface ProjectOpts {
    dir: string;
    build: string;
    cmd?: string;
}

interface IProject {
    name: string;
    src: string;
    cmd: string | undefined;
    dist: string;
}

const root = path.resolve(__dirname, "..");
const base = path.join(root, "apps");

const createProject = ({ dir, cmd, build }: ProjectOpts): IProject => {
    const src = path.join(base, dir);
    const dist = path.join(src, build);
    return { name: dir, src, cmd, dist };
}

export const Projects: IProject[] = [
    createProject({ dir: "todo-app", build: "dist", cmd: "npm run build" }),
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