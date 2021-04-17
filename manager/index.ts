import path from "path";
import cp from "child_process";
import _ from "lodash";
import util from "util";
import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";
import jimp from "jimp";
import pkgjson from "./package.json";

import * as config from "./config";

const base = path.resolve(__dirname, "..");
const apps = path.join(base, "apps");
const output = path.join(base, "docs");
const exec = util.promisify(cp.exec);

const Logger = {
    log (text: string) {
        console.log(`${chalk.blueBright("/")} ${text}`);
    },
    error(text: string) {
        console.log(`${chalk.redBright("!")} ${text}`);
    }
}

const start = async () => {
    const served: (config.IProjectBase & config.ICloudProject)[] = [];

    const ddlg = ora(`Deleting old output files from ${chalk.blueBright(output)}`).start();
    await fs.remove(output);
    ddlg.succeed(`Deleted old output files from ${chalk.blueBright(output)}`);

    for (const project of config.Projects) {
        if ("cmd" in project) {
            const lg = ora(`Processing ${chalk.blueBright(project.name)} from ${chalk.blueBright(project.dir)}`).start();
            await exec(`cd ${path.join(apps, project.dir)} && ${project.cmd(pkgjson.homepage)}`);
            lg.text = `Compiled ${chalk.blueBright(project.name)}`;
            const out = path.join(output, project.dir);
            await fs.copy(path.join(apps, project.dir, project.dist), out);
            lg.succeed(`Processed ${chalk.blueBright(project.name)} to ${chalk.blueBright(out)}`);
            served.push({
                name: project.name,
                description: project.description,
                image: project.image,
                tags: project.tags,
                links: project.links,
                href: project.dir
            });
        } else {
            Logger.log(`Skipped ${chalk.blueBright(project.name)}`);
            served.push(project);
        }
    }

    for (const file of config.copyables) {
        const lg = ora(`Copying ${chalk.blueBright(file.from)} to ${chalk.blueBright(file.to)}`).start();
        await fs.copy(file.from, file.to);
        lg.succeed(`Copied ${chalk.blueBright(file.from)} to ${chalk.blueBright(file.to)}`);
    }

    const hlg = ora(`Rendering API (${chalk.blueBright("api.json")})`).start();
    await RenderAPI(served);
    hlg.succeed(`Rendered API (${chalk.blueBright("api.json")})`);

    const csslg = ora(`Compiling Stylesheet (${chalk.blueBright("styles.css")})`).start();
    await exec(`npm run build:css`);
    csslg.succeed(`Compiled Stylesheet (${chalk.blueBright("styles.css")})`);

    const imglg = ora("Compressing Images").start();
    await CompressImages();
    imglg.succeed("Compressed Images");

    return;
}

start();

async function RenderAPI(projects: (config.IProjectBase & config.ICloudProject)[]): Promise<void> {
    await fs.writeFile(path.join(output, "api.json"), JSON.stringify({
        lastUpdated: Date.now(),
        apps: projects.map(x => ({
            ...x,
            href: `${pkgjson.homepage}/${x.href}`
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
