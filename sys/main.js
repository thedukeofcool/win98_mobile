var verInfo = {
    build: "4.10.15",
    branch: "main"
}

var defaultConf = {
    titleBarsEnabled: false,
    userConfig: {
        backgroundColor: "#088"
    },
    dataVersion: 2
}

console.info("Windows 98 Mobile " + verInfo.build);

class confmgr {
    constructor() {
        console.group("confmgr");

        try {
            var data = JSON.parse(localStorage.mconfig);

            if (data.dataVersion !== 2) {
                console.log("found older data version, upgrading to v" + defaultConf.dataVersion);
                localStorage.mconfig = JSON.stringify(defaultConf);
                console.log("sucessfully upgraded data");
            } else {
                console.log("sucessfully loaded configuration");
            }
        } catch (e) {
            console.warn("failed to load mconifg, reseting to defaults");
            localStorage.mconfig = JSON.stringify();
        }

        console.group("userSettings");

        console.log("applying user settings...")
        document.getElementsByTagName("body")[0].style = "background-color: " + JSON.parse(localStorage.mconfig).userConfig.backgroundColor + ";"
        console.log("sucessfully loaded user settings")

        console.groupEnd();

        console.log("completed confmgr init")
        console.groupEnd();
    }

    getConf() {
        return JSON.parse(localStorage.mconfig);
    }

    setConf(conf) {
        localStorage.mconfig = JSON.stringify(conf);
    }

    toggleCfg(cfg) {
        var conf = this.getConf();
        conf[cfg] = !conf[cfg];
        this.setConf(conf);
        document.getElementById(conf + "btn").innerText = conf[cfg];
    }

    setCfg(cfg, val) {
        var conf = this.getConf();
        conf[cfg] = val;
        this.setConf(conf);
    }

    setUserSetting(cfg, val) {
        var conf = this.getConf();
        conf.userConfig[cfg] = val;
        this.setConf(conf);
    }
}

class appmgr {
    open(appId) {
        if(appId == "testApp") {
            document.getElementById("apps").className += " invisible"
            document.getElementById("content").innerHTML += testapp_html;
        }
        else if (appId == "devmenu") {
            document.getElementById("apps").className += " invisible"
            document.getElementById("content").innerHTML += devmenu_html;
        }
    }

    hideApps() {
        for(var i = 0; i < document.getElementsByClassName("app").length; i++)
        {
            document.getElementsByClassName("app")[i].className += " invisible"
        }

        try {
            document.getElementById("devMenu").remove();
        }
        catch (e) {}
        document.getElementById("apps").className = "appScreen";
    }
}

configUtils = new confmgr();
appManager = new appmgr();

var testapp_html = '<div class="app"><label>Hi</label></div>';
var devmenu_html = '<div class="app" id="devMenu"><h2>Developer Menu</h2><div class="frame"><label>titleBarsEnabled (reload required!)</label>&nbsp;&nbsp;<button class="default" id="titleBarsEnabledBtn" onclick="toggle_cfg(\'titleBarsEnabled\')">' + configUtils.getConf().titleBarsEnabled + '</button></div></div>';

if (configUtils.getConf().titleBarsEnabled === true){
    testapp_html = '<div class="app"><title-bar class="active mobile_tb"><nei class="title">Test App</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar><label>Hi</label></div>';
    devmenu_html = '<div class="app" id="devMenu"><title-bar class="active mobile_tb"><nei class="title">Developer Menu</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar><div class="frame"><label>titleBarsEnabled (reload required!)</label>&nbsp;&nbsp;<button class="default" id="titleBarsEnabledBtn" onclick="toggle_cfg(\'titleBarsEnabled\')">' + configUtils.getConf().titleBarsEnabled + '</button></div></div>';
}

// LEGACY FUNCTIONS: dont use
function open_app(cmd) {
    appManager.open(cmd);
}

function apps_screen() {
    appManager.hideApps();
}

function toggle_cfg(cfg) {
    configUtils.toggleCfg(cfg);
}