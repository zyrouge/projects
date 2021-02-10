import path from "path";

export interface IProjectBase {
    name: string;
    description: string;
    image: string;
    tags: string[];
    links: {
        name: string;
        href: string;
    }[];
}

interface ILocalProject {
    dir: string;
    cmd: string;
    dist: string;
}

interface ICloudProject {
    href: string;
}

export type IProject = IProjectBase & (ILocalProject | ICloudProject);

const root = path.resolve(__dirname, "..");

export const Projects: IProject[] = [
    {
        name: "ZDev API",
        href: "https://zyrouge.gq/api/docs",
        description: "Multipurpose API with features like Image Manipulation and stuffs.",
        image: "https://avatars.githubusercontent.com/u/64364213?s=200&v=4",
        tags: ["Node.js", "Express", "API"],
        links: []
    },
    {
        name: "Todo App",
        dir: "todo-app",
        description: "Simple Todo app that uses <b>localstorage</b> to store all the data.",
        image: "/images/notepad.jpg",
        dist: "dist",
        cmd: "npm install -D && npm run build -- --base=/todo-app/",
        tags: ["Web App", "Node.js", "Vue 3", "Typescript"],
        links: [
            {
                name: "Source",
                href: "https://github.com/zyrouge/apps/tree/main/apps/todo-app"
            }
        ]
    },
    {
        name: "Genius Lyrics",
        href: "https://genius-lyrics.zyrouge.gq",
        description: "Just a simple lyrics fetcher that uses Genius. Also has official API implementations.",
        image: "/images/music.jpg",
        tags: ["NPM", "Node.js", "Typescript", "API", "Scrapping"],
        links: [
            {
                name: "Source",
                href: "https://github.com/zyrouge/genius-lyrics"
            },
            {
                name: "NPM",
                href: "https://www.npmjs.com/package/genius-lyrics"
            }
        ]
    },
    {
        name: "Canvacord",
        href: "https://canvacord.js.org/",
        description: "Powerful image manipulation tool to manipulate images easily.",
        image: "/images/palatte.jpg",
        tags: ["NPM", "Node.js", "Typescript", "API"],
        links: [
            {
                name: "Source",
                href: "https://github.com/DevSnowflake/canvacord"
            },
            {
                name: "NPM",
                href: "https://www.npmjs.com/package/canvacord"
            }
        ]
    }
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
