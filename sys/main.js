var verInfo = {
    build: "4.50.17",
    branch: "main",
    greetingStyle: "font-weight: 800; color: white; background: linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,48,255,1) 100%); padding: 2px;"
}

console.info("%cWindows 98 Mobile " + verInfo.build, verInfo.greetingStyle);
document.getElementById("version").innerText = "Windows 98 Mobile " + verInfo.build;

class confmgr {
    defaultConf = {
        titleBarsEnabled: true,
        userConfig: {
            backgroundColor: "#088"
        },
        dataVersion: 2
    }

    constructor() {
        console.group("confmgr");

        try {
            var data = localStorage.mconfig;

            if (data.dataVersion < this.defaultConf.dataVersion) {
                console.log("found older data version, reseting to v" + this.defaultConf.dataVersion);
                this.resetConf();
            } else {
                console.log("sucessfully loaded configuration");
            }
        } catch (e) {
            console.warn("failed to load conifg, reseting to defaults");
            this.resetConf();
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

    resetConf() {
        this.setConf(this.defaultConf);
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

class fileSystem {
    defaultFs = {
        drives: {
            c: {
                type: "drive",
                displayName: "C:",
                content: {
                    "test.txt": {
                        type: "file",
                        content: ["base64", "VGhlIHF1aWNrIGJyb3duIGZveCBqdW1wcyBvdmVyIHRoZSBsYXp5IGRvZy4="]
                    },
                    "directory": {
                        type: "dir",
                        content: {}
                    },
                    "test_symlink.txt": {
                        type: "symlink",
                        pointsToType: "file",
                        pointsTo: "C:\\test.txt",
                    }
                }
            }
        },
        updBuild: verInfo.build,
        dataVersion: 1
    }

    constructor() {
        console.group('fileSystem');
        try {
            var fileSys = localStorage.fileSys;
            if (fileSys.dataVersion < this.defaultFs.dataVersion) {
                // TODO: implement some sort of update system
                console.log("found older file system version, reseting");
                this.resetFs();
            }
            console.log("sucessfully loaded file system")
        } catch (e) {
            console.log("error loading file system, reseting");
            this.resetFs();
        }
        console.groupEnd();
    }

    getFs() {
        return localStorage.fileSys;
    }

    setFs(fs) {
        localStorage.fileSys = fs;
    }

    resetFs() {
        this.setFs(this.defaultFs);
    }
}

fileSys = new fileSystem();
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