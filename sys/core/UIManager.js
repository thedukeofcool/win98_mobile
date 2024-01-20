export class UIManager {
    constructor() { }

    processContent(content) {
        var html = ""
        content.forEach(element => {
            html += element;
        });
        return html;
    }

    label(json) {
        if (json.style) {
            return '<label class="' + json.style + '" style="' + json.customCss + '">' + json.content + '</label>';
        } else {
            return '<label style="' + json.customCss + '">' + json.content + '</label>';
        }
    }

    break() {
        return '<br/>';
    }

    break(len) {
        var html = "";
        for (var i = 0; i < len; i++) {
            html += "<br/>";
        }
        return (html);
    }


    button(json) {
        if (json.clicked) {
            return '<button class="' + json.type + '" onClick="' + json.clicked + '">' + json.content + '</button>'
        } else {
            return '<button class="' + json.type + '">' + json.content + '</button>'
        }
    }

    app(json) {
        var titleBarsEnabled = os.getServ("configManager").getConf().titleBarsEnabled;
        var screenContent = document.getElementById("content");
        if (titleBarsEnabled) {
            var appContent = '<div class="app" id="app_' + json.id + '"><title-bar class="active mobile_tb"><nei class="title">' + json.title + '</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar><div class="app-content">' + this.processContent(json.content) + '</div></div>'
        } else {
            var appContent = '<div class="app" id="app_' + json.id + '"><h1>' + json.title + '</h1><div class="app-content">' + this.processContent(json.content) + '</div></div>';
        }
        screenContent.innerHTML += appContent;
        return appContent;
    }
}