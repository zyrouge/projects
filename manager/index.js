const cp = require("child_process");
const until = require("until");
const fs = require("fs-extra").promises;
const exec = util.promisify(cp.exec);
const chalk = require("chalk");

const config = require("../config");
const output = path.join(__dirname, "..", "docs");

const Logger = {
log (text) {
console.log(`${chalk.blueBright("/")} ${text}`);
}
}

const start = async () => {
for (conf of config) {
const project = await fs.readdir(conf.dir);
await exec(project.cmd);
await fs.copy(project.dist, path.join(output, project.name));
Logger.log(`Compiled ${chalk.greenBright(project.name)}`);
}
}

start();
