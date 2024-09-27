import child_process from "child_process";
import pathUtil from "../utils/pathUtil.js";
import serverConfig from "./config.js";

function openCodeFileInWebStorm(path) {
    let filePath = path.split(":")[0];
    let linePath = path.split(":")[1];
    filePath = pathUtil.projectBasePath + filePath;
    child_process.exec(`webstorm64.exe  ${filePath}:${linePath} `, {
        env: process.env,
    });
}
function openCodeFileInVscode(path) {
    // console.log("openCodeFileInVscode", path);
    let filePath = pathUtil.projectBasePath + path;
    child_process.exec(`code -r -g ${filePath}`, {
        env: process.env,
    });
}
function os() {
    "use strict";
    const os = require("os");
    const platform = os.platform();
    switch (platform) {
        case "darwin":
            return "MacOSX";
            break;
        case "linux":
            return "Linux";
            break;
        case "win32":
            return "Windows";
            break;
        default:
            return "无法确定操作系统!";
    }
}
export function openCodeFile(path) {
    // console.log(decodeURIComponent(path));
    if (serverConfig.editor === "vscode") {
        openCodeFileInVscode(path);
    }
}
