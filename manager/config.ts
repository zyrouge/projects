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

export interface ILocalProject {
    dir: string;
    cmd(baseUrl: string): string;
    dist: string;
}

export interface ICloudProject {
    href: string;
}

export type IProject = IProjectBase & (ILocalProject | ICloudProject);

const root = path.resolve(__dirname, "..");

export const Projects: IProject[] = [
    {
        name: "ZDev API",
        href: "https://zyrouge.gq/api/docs",
        description: "Multipurpose API with features like Image Manipulation and stuffs.",
        image: "https://raw.githubusercontent.com/zyrouge/zyrouge.gq/master/src/assets/zdev.png",
        tags: ["Node.js", "Express", "API"],
        links: []
    },
    {
        name: "Todo App",
        dir: "todo-app",
        description: "Simple Todo app that uses <b>localstorage</b> to store all the data.",
        image: "/images/notepad.jpg",
        dist: "dist",
        cmd: (baseUrl: string) => `npm install -D && npm run build -- --base=${baseUrl}/todo-app/`,
        tags: ["Web App", "Node.js", "Vue 3", "Typescript"],
        links: [
            {
                name: "Source",
                href: "https://github.com/zyrouge/apps/tree/main/apps/todo-app"
            }
        ]
    },
    {
        name: "Calendar App",
        dir: "calendar-app",
        description: "Simple Calendar app that can store <b>events and notes</b> using localstorage",
        image: "/images/calendar.jpg",
        dist: "dist",
        cmd: (baseUrl: string) => `npm install -D && npm run build -- --base=${baseUrl}/calendar-app/`,
        tags: ["Web App", "Node.js", "Vue 3", "Typescript"],
        links: [
            {
                name: "Source",
                href: "https://github.com/zyrouge/apps/tree/main/apps/calendar-app"
            }
        ]
    },
    {
        name: "Age Calculator",
        dir: "age-calculator",
        description: "App that calculates your age and time spent",
        image: "/images/age.jpg",
        dist: "dist",
        cmd: (baseUrl: string) => `npm install -D && npm run build -- --base=${baseUrl}/age-calculator/`,
        tags: ["Web App", "Node.js", "Vue 3", "Typescript"],
        links: [
            {
                name: "Source",
                href: "https://github.com/zyrouge/apps/tree/main/apps/age-calculator"
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