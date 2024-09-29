import { openCodeFile } from "./openCodeFile.js";
export default () => ({
    name: "open-code-vite-server",
    configureServer(server) {
        const myMiddleware = (req, res, next) => {
            if (req.url.startsWith("/code")) {
                // 执行vscode定位代码行命令
                openCodeFile(
                    decodeURIComponent(req.url.split("?")[1].split("=")[1])
                );

                res.end("successfully receive request");
            } else {
                next();
            }
        };
        // 插入到中间件链的最前面
        server.middlewares.stack.unshift({ route: "", handle: myMiddleware });
    },
});
