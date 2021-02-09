import path from "path";
import cp from "child_process";
import ejs from "ejs";
import _ from "lodash";
import util from "util";
import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";

import * as config from "./config";

const base = path.resolve(__dirname, "..");
const apps = path.join(base, "apps");
const output = path.join(base, "docs");
const exec = util.promisify(cp.exec);

const Logger = {
    log (text: string) {
        console.log(`${chalk.blueBright("./")} ${text}`);
    },
    error(text: string) {
        console.log(`${chalk.redBright("!!")} ${text}`);
    }
}

const start = async () => {
    const ddlg = ora(`Deleting old output files from ${chalk.blueBright(output)}`);
    await fs.remove(output);
    ddlg.succeed(`Deleted old output files from ${chalk.blueBright(output)}`);

    for (const project of config.Projects) {
        const lg = ora(`Processing ${chalk.blueBright(project.name)} from ${chalk.blueBright(project.dir)}`).start();
        await exec(`cd ${path.join(apps, project.dir)} && ${project.cmd}`);
        lg.text = `Compiled ${chalk.blueBright(project.name)}`;
        const out = path.join(output, project.dir);
        await fs.copy(path.join(apps, project.dir, project.dist), out);
        lg.succeed(`Processed ${chalk.blueBright(project.name)} to ${chalk.blueBright(out)}`);
    }

    for (const file of config.copyables) {
        const lg = ora(`Copying ${chalk.blueBright(file.from)} to ${chalk.blueBright(file.to)}`);
        await fs.copy(file.from, file.to);
        lg.succeed(`Copied ${chalk.blueBright(file.from)} to ${chalk.blueBright(file.to)}`);
    }

    const hlg = ora(`Rendering Home page (${chalk.blueBright("index.html")})`);
    await RenderHomePage(config.Projects);
    hlg.succeed(`Rendered Home page (${chalk.blueBright("index.html")})`);

    for (const file of config.deletables) {
        const lg = ora(`Deleting ${chalk.blueBright(file)}`);
        // await fs.remove(file);
        lg.succeed(`Deleted ${chalk.blueBright(file)}`);
    }

    return;
}

start();

function RenderHomePage(projects: config.IProject[]): Promise<void> {
    return new Promise(async (resolve) => {
        const template = path.join(__dirname, "src", "index.ejs");
        const html = await ejs.renderFile(template, {
            projects: _.chunk(projects)
        });
        await fs.writeFile(path.join(output, "index.html"), html);
        resolve();
    });
}