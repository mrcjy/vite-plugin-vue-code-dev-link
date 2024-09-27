const serverConfig = {
    editor: "vscode",
};
export function setEditor(editor) {
    serverConfig.editor = editor;
}
export function getEditor() {
    return serverConfig.editor;
}
export default serverConfig;
