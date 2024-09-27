import axios from "axios";

function uuid(len, radix) {
    var chars =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
            ""
        );
    var uuid = [],
        i;
    radix = radix || chars.length;
    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | (Math.random() * 16);
                uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join("");
}

function sendRequestToOpenFileInEditor(filePath) {
    const protocol = window.location.protocol
        ? window.location.protocol
        : "http:";
    const hostname = window.location.hostname
        ? window.location.hostname
        : "localhost";
    const port = window.location.port ? window.location.port : "80";
    // console.log(`${protocol}//${hostname}:${port}/code`);
    axios
        .get(`${protocol}//${hostname}:${port}/code`, {
            params: {
                filePath: filePath,
            },
        })
        .catch((error) => {
            console.log(error);
        });
}

function getFilePath(element) {
    if (!element || !element.getAttribute) return null;
    if (element.getAttribute("code-location")) {
        return element.getAttribute("code-location");
    }
    return getFilePath(element.parentNode);
}

function openFileInEditor(e) {
    const filePath = getFilePath(e.target);
    // console.log(filePath);
    sendRequestToOpenFileInEditor(filePath);
}

function clickBall(e) {
    const element = document.createElement("div");
    const elementId = "clickBall" + uuid(8, 16);
    element.id = elementId;
    element.style.left = e.clientX - 20 + "px";
    element.style.top = e.clientY - 20 + "px";
    element.setAttribute("class", "clickBall hidSlow");
    document.body.appendChild(element);
    setTimeout(() => {
        document.getElementById(elementId).remove();
    }, 1000);
}
let isAltPressed = false;
let highlightBox = null;
export function init() {
    if (process.env.NODE_ENV === "development") {
        // 全局监听键盘事件
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // 全局监听鼠标移动事件
        window.addEventListener("mousemove", handleMouseMove);
        // console.log("init");
        // const indexcss = require("../css/index.css");
        document.onmousedown = function (e) {
            if (e.altKey && e.button === 0) {
                // console.log("right");
                e.preventDefault();
                clickBall(e);
                openFileInEditor(e);
            }
        };
    }
}

// 创建高亮框
function createHighlightBox() {
    highlightBox = document.createElement("div");
    highlightBox.style.position = "absolute";
    highlightBox.style.border = "2px solid red";
    highlightBox.style.pointerEvents = "none"; // 让框不会影响鼠标交互
    highlightBox.style.zIndex = "9999"; // 置于最上层
    document.body.appendChild(highlightBox);
}

// 更新高亮框的位置和大小
function updateHighlightBox(target) {
    // console.log(target);
    const rect = target.getBoundingClientRect();
    highlightBox.style.top = `${rect.top + window.scrollY}px`;
    highlightBox.style.left = `${rect.left + window.scrollX}px`;
    highlightBox.style.width = `${rect.width}px`;
    highlightBox.style.height = `${rect.height}px`;
    highlightBox.style.display = "block";
}
// 隐藏高亮框
function hideHighlightBox() {
    if (highlightBox) {
        highlightBox.style.display = "none";
    }
}

// 键盘按下事件
function handleKeyDown(event) {
    // console.log(event.key);
    if (event.key === "Alt") {
        isAltPressed = true;
    }
}

// 键盘释放事件
function handleKeyUp(event) {
    if (event.key === "Alt") {
        isAltPressed = false;
        hideHighlightBox();
    }
}
// 鼠标移动事件
function handleMouseMove(event) {
    // console.log(isAltPressed);
    if (isAltPressed) {
        const target = event.target;
        if (!highlightBox) {
            createHighlightBox();
        }
        // console.log("move");
        updateHighlightBox(target);
    }
}
