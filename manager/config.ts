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
    cmd?(baseUrl: string): string;
    dist: string;
}

export interface ICloudProject {
    href: string;
}

export type IProject = IProjectBase & (ILocalProject | ICloudProject);

const root = path.resolve(__dirname, "..");

export const Projects: IProject[] = [
    {
        name: "Yukino",
        href: "https://zyrouge.github.io/yukino-app/",
        description: "Yukino lets you stream anime or read manga ad-free from multiple sources for free!",
        image: "images/yukino.png",
        tags: ["Electron", "Vue", "Node.js", "Typescript", "Scraping"],
        links: [
            {
                name: "Source",
                href: "https://github.com/zyrouge/yukino-app"
            },
        ]
    },
    {
        name: "Todo App",
        dir: "todo-app",
        description: "Simple Todo app that uses <b>localstorage</b> to store all the data.",
        image: "images/notepad.jpg",
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
        image: "images/calendar.jpg",
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
        image: "images/age.jpg",
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
        href: "https://genius-lyrics.js.org",
        description: "Just a simple lyrics fetcher that uses Genius. Also has official API implementations.",
        image: "images/music.jpg",
        tags: ["NPM", "Node.js", "Typescript", "API", "Scraping"],
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
        image: "images/palatte.jpg",
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
    },
    {
        name: "YouTube Extractor",
        href: "https://youtube-ext.js.org/",
        description: "Just a simple YouTube scraper. No key needed!",
        image: "https://raw.githubusercontent.com/zyrouge/youtube-ext/main/media/imgs/logo.png",
        tags: ["NPM", "Node.js", "Typescript", "Scraping"],
        links: [
            {
                name: "Source",
                href: "https://github.com/zyrouge/youtube-ext"
            },
            {
                name: "NPM",
                href: "https://www.npmjs.com/package/youtube-ext"
            }
        ]
    },
    {
        name: "Tic Tac Toe",
        dir: "tic-tac-toe",
        description: "Simple Tic Tac Toe game",
        image: "images/tic-tac-toe.jpg",
        dist: "src",
        tags: ["Web App"],
        links: [
            {
                name: "Source",
                href: "https://github.com/zyrouge/apps/tree/main/apps/tic-tac-toe"
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
