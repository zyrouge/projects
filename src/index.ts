import path from "path";
import { promises as fs } from "fs";
import jimp from "jimp";
import { ICloudProject } from "./model";
import { Constants } from "./constants";
import { Utils } from "./utils";
import { Projects } from "../config";


const start = async () => {
    const projects: ICloudProject[] = [];

    await fs.rm(Constants.outputDir, {
        force: true,
        recursive: true,
    });
    console.log(`Removed ${Constants.outputDir}`);

    for (const project of Projects) {
        if (!("href" in project)) {
            console.log(`Processing ${project.name} (${project.dir})`);
            
            if (project.cmd) {
                await Utils.exec(`cd ${path.join(Constants.appsDir, project.dir)} && ${project.cmd(pkgjson.homepage)}`);
            }
            lg.text = `Compiled ${(project.name)}`;
            const out = path.join(output, project.dir);
            await fs.copy(path.join(apps, project.dir, project.dist), out);
            lg.succeed(`Processed ${(project.name)} to ${(out)}`);
            projects.push({
                name: project.name,
                description: project.description,
                href: resolveURL(project.dir),
                image: resolveURL(project.image),
                tags: project.tags,
            });
        } else {
            Logger.log(`Skipped ${(project.name)}`);
            projects.push(project);
        }
    }

    // for (const file of config.copyables) {
    //     const lg = ora(`Copying ${(file.from)} to ${(file.to)}`).start();
    //     await fs.copy(file.from, file.to);
    //     lg.succeed(`Copied ${(file.from)} to ${(file.to)}`);
    // }

    const hlg = ora(`Rendering API (${("api.json")})`).start();
    await RenderAPI(served);
    hlg.succeed(`Rendered API (${("api.json")})`);

    const imglg = ora("Compressing Images").start();
    await CompressImages();
    imglg.succeed("Compressed Images");

    return;
}

start();

function resolveURL(url: string) {
    if (url.startsWith("http")) return url;
    return `${Constants.baseURL}/${url}`;
}

async function RenderAPI(projects: (config.IProjectBase & config.ICloudProject)[]): Promise<void> {
    await fs.writeFile(path.join(output, "api.json"), JSON.stringify({
        lastUpdated: Date.now(),
        apps: projects.map(x => ({
            ...x,
            image: x.image.startsWith("http") ? x.image : `${Constants.}/${x.image}`,
            href: x.href.startsWith("http") ? x.href : `${pkgjson.homepage}/${x.href}`
        }))
    }));
    return;
}

async function CompressImages() {
    const imgbase = path.join(__dirname, "src", "images");
    const imgoutbase = path.join(output, "images");
    const imgfiles = await fs.readdir(imgbase);
    for (const file of imgfiles) {
        const inp = path.join(imgbase, file);
        const out = path.join(imgoutbase, file);
        const img = await jimp.read(inp);
        if (img.bitmap.width > 500) img.resize(500, jimp.AUTO);
        img.quality(80);
        await img.writeAsync(out);
    }
    return;
}
