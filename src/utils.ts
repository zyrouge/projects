import { exec } from "child_process";
import { promisify } from "util";

export class Utils {
    static exec = promisify(exec);
}
