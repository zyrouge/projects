const path = require("path");

const createProject = ({ dir, cmd, build }) => {
const src = path.join(__dirname, dir);
const dist = path.join(src, build);
return { src, cmd, dist };
}

module.exports = [
createProject({ dir: "todo-app", build: "dist", cmd: "npm run dev" }),
];
