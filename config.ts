import { IProject } from "./src/model";
import { Constants } from "./src/constants";

export const Projects: IProject[] = [
    // {
    //     name: "Yukino",
    //     href: "https://yukino-org.github.io/",
    //     description: "Yukino lets you stream anime or read manga ad-free from multiple sources for free!",
    //     image: "images/yukino.png",
    //     tags: ["typescript", "electron", "vue"],
    // },
    {
        name: "Todo App",
        dir: "todo-app",
        description:
            "Simple Todo app that uses <b>localstorage</b> to store all the data.",
        image: "images/notepad.jpg",
        dist: "dist",
        cmd: `npm install -D && npm run build -- --base=${Constants.baseURL}/todo-app/`,
        tags: ["typescript", "vue"],
    },
    {
        name: "Calendar App",
        dir: "calendar-app",
        description:
            "Simple Calendar app that can store <b>events and notes</b> using localstorage",
        image: "images/calendar.jpg",
        cmd: `npm install -D && npm run build -- --base=${Constants.baseURL}/calendar-app/`,
        dist: "dist",
        tags: ["typescript", "vue"],
    },
    {
        name: "Age Calculator",
        dir: "age-calculator",
        description: "App that calculates your age and time spent",
        image: "images/age.jpg",
        cmd: `npm install -D && npm run build -- --base=${Constants.baseURL}/age-calculator/`,
        dist: "dist",
        tags: ["typescript", "vue"],
    },
    {
        name: "Genius Lyrics",
        href: "https://genius-lyrics.js.org",
        description:
            "Just a simple lyrics fetcher that uses Genius. Also has official API implementations.",
        image: "images/music.jpg",
        tags: ["typescript"],
    },
    {
        name: "Canvacord",
        href: "https://canvacord.js.org/",
        description:
            "Powerful image manipulation tool to manipulate images easily.",
        image: "images/palatte.jpg",
        tags: ["typescript"],
    },
    {
        name: "YouTube Extractor",
        href: "https://youtube-ext.js.org/",
        description: "Just a simple YouTube scraper. No key needed!",
        image: "https://raw.githubusercontent.com/zyrouge/youtube-ext/main/media/imgs/logo.png",
        tags: ["typescript"],
    },
    {
        name: "Tic Tac Toe",
        dir: "tic-tac-toe",
        description: "Simple Tic Tac Toe game",
        image: "images/tic-tac-toe.jpg",
        cmd: "echo 0",
        dist: "src",
        tags: ["javascript"],
    },
];
