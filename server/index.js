import { openCodeFile } from "./openCodeFile.js";
export default () => ({
    name: "open-code-vite-server",
    configureServer(server) {
        const myMiddleware = (req, res, next) => {
            if (req.url.startsWith("/code")) {
                // console.log(
                //     decodeURIComponent(req.url.split("?")[1].split("=")[1])
                // );

                // 执行vscode定位代码行命令
                openCodeFile(
                    decodeURIComponent(req.url.split("?")[1].split("=")[1])
                );

                // if (req.query.filePath) {
                //     // 执行vscode定位代码行命令
                //     openCodeFile(req.query.filePath);
                // }
                res.end("successfully receive request");
            } else {
                next();
            }
        };
        // 插入到中间件链的最前面
        server.middlewares.stack.unshift({ route: "", handle: myMiddleware });

        // return () => {
        //     server.middlewares.use((req, res, next) => {
        //         console.log(req.url.filePath);
        //         if (req.url.startsWith("/code")) {
        //             if (req.query.filePath) {
        //                 // 执行vscode定位代码行命令
        //                 openCodeFile(req.query.filePath);
        //             }
        //             res.end("successfully receive request");
        //         } else {
        //             next();
        //         }
        //     });
        // };
    },
});
