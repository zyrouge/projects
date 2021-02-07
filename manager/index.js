const cp = require("child_process");
const until = require("util");
const fs = require("fs-extra").promises;
const exec = util.promisify(cp.exec);
const chalk = require("chalk");

const config = require("../config");
const base = path.resolve(__dirname, "..");
const output = path.join(base, "docs");
const ignored = [];

const Logger = {
log (text) {
console.log(`${chalk.blueBright("/")} ${text}`);
}
}

const start = async () => {
for (project of config) {
// const project = await fs.readdir(conf.dir);
await exec(`cd ${project.dir} && ${project.cmd}`);
await fs.copy(project.dist, path.join(output, project.name));
ignored.push(path.join(base, project.name));
Logger.log(`Compiled ${chalk.greenBright(project.name)}`);
}
for (ign of ignored) {
await fs.remove(ign);
}
}

start();
