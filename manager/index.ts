import path from "path";
import cp from "child_process";
import util from "util";
import fs from "fs-extra";
import chalk from "chalk";
import ora from "ora";

import * as config from "./config";

const base = path.resolve(__dirname, "..");
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
    for (const project of config.Projects) {
        const lg = ora(`Processing ${chalk.blueBright(project.name)} from ${chalk.blueBright(project.src)}`).start();
        const proc = await exec(`cd ${project.src} && ${project.cmd}`);
        if (proc.stderr) {
            lg.fail(proc.stderr);
            Logger.error(`Child process of ${project.name} failed. Exiting gracefully...`);
            process.exit(0);
        }
        lg.text = `Compiled ${chalk.blueBright(project.name)}`;
        const out = path.join(output, project.name);
        await fs.copy(project.dist, out);
        lg.succeed(`Processed ${chalk.blueBright(project.name)} to ${chalk.blueBright(out)}`);
    }

    for (const file of config.copyables) {
        const lg = ora(`Copying ${chalk.blueBright(file.from)} to ${chalk.blueBright(file.to)}`);
        await fs.copy(file.from, file.to);
        lg.succeed(`Copied ${chalk.blueBright(file.from)} to ${chalk.blueBright(file.to)}`);
    }

    for (const file of config.deletables) {
        const lg = ora(`Deleting ${chalk.blueBright(file)}`);
        await fs.remove(file);
        lg.succeed(`Deleted ${chalk.blueBright(file)}`);
    }

    return;
}

start();
