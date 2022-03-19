import path from "path";

export class Constants {
    static rootDir = path.resolve(__dirname, "..");
    static appsDir = path.join(Constants.rootDir, "apps");
    static outputDir = path.join(Constants.rootDir, "dist");

    static baseURL = "https://zyrouge.github.io/projects";
}
