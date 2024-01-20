export class AppManager {
    nextAppId = 1;

    open(appId, uiManager) {
        if (appId == "testApp") {
            document.getElementById("apps").className += " invisible"
            uiManager.app({
                title: "Test App",
                id: this.nextAppId,
                content: [
                    uiManager.label({ content: "The quick brown fox jumps over the lazy dog. 1234567890" }),
                    uiManager.break(2),
                    uiManager.button({ content: "Primary Button", clicked: "alert(1)", type: "primary" }),
                    uiManager.break(),
                    uiManager.button({ content: "Normal Button", clicked: "alert(2)" })
                ]
            })
        }
        else if (appId == "devmenu") {
            document.getElementById("apps").className += " invisible"
            document.getElementById("content").innerHTML += '<div class="app" id="devMenu"><title-bar class="active mobile_tb"><nei class="title">Developer Menu</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar><div class="frame"><label>titleBarsEnabled (reload required!)</label>&nbsp;&nbsp;<button class="default" id="titleBarsEnabledBtn" onclick="toggle_cfg(\'titleBarsEnabled\')">' + os.getServ("configManager").getConf().titleBarsEnabled + '</button></div></div>';;
        }
        else {
            throw new Error("App not found: " + appId);
        }
        this.nextAppId++;
    }

    hideApps() {
        for (var i = 0; i < document.getElementsByClassName("app").length; i++) {
            document.getElementsByClassName("app")[i].className = "app invisible"
        }

        try {
            document.getElementById("devMenu").remove();
        }
        catch (e) { }
        document.getElementById("apps").className = "appScreen";
    }
}