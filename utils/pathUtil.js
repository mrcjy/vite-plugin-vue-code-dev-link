import { fileURLToPath } from "url";
import { dirname } from "path";
// 获取当前文件的 URL
const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);
// 获取目录名
const __dirname = dirname(__filename);
let projectBasePath = __dirname.substring(0, __dirname.search("node_modules"));
export default {
    projectBasePath: projectBasePath,
};
