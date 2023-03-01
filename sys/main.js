var verInfo = {
    build: "4.50.23",
    branch: "main",
    greetingStyle: "font-weight: 800; color: white; background: linear-gradient(90deg, rgba(9,9,121,1) 0%, rgba(0,48,255,1) 100%); padding: 2px;"
}

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
            var data = JSON.parse(localStorage.mconfig);

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
        document.getElementById(cfg + "Btn").innerText = conf[cfg];
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
    nextAppId = 1;

    open(appId, uiManager, osInst) {
        if(appId == "testApp") {
            document.getElementById("apps").className += " invisible"
            uiManager.app({
                title: "Test App",
                id: this.nextAppId,
                content: [
                    uiManager.label({content: "Hi"}),
                    uiManager.break(2),
                    uiManager.label({content: "very cool", style: "engraved"}),
                    uiManager.break(),
                    uiManager.button({content: "Very nice button", clicked: "alert(1)", type: "primary"})
                ]
            }, osInst)
        }
        else if (appId == "devmenu") {
            document.getElementById("apps").className += " invisible"
            document.getElementById("content").innerHTML += devmenu_html;
        }
        else {
            throw new Error("App not found: " + appId);
        }
        this.nextAppId++;
    }

    hideApps() {
        for(var i = 0; i < document.getElementsByClassName("app").length; i++)
        {
            document.getElementsByClassName("app")[i].className = "app invisible"
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
        dataVersion: 2
    }

    constructor() {
        console.group('fileSystem');
        try {
            var fileSys = JSON.parse(localStorage.fileSys);
            if (fileSys.dataVersion < this.defaultFs.dataVersion) {
                // TODO: implement some sort of update system
                console.log("found older file system version, reseting");
                this.resetFs();
            } else {
                console.log("sucessfully loaded file system");
            }
        } catch (e) {
            console.warn("error loading file system, reseting");
            this.resetFs();
        }
        console.groupEnd();
    }

    getFs() {
        return JSON.parse(localStorage.fileSys);
    }

    setFs(fs) {
        localStorage.fileSys = JSON.stringify(fs);
    }

    resetFs() {
        localStorage.fileSys = JSON.stringify(this.defaultFs);
    }
}

class uiMgr {
    constructor() {

    }

    processContent(content) {
        var html = ""
        content.forEach(element => {
            html += element;
        });
        return html;
    }

    label(json) {
        if (json.style) {
            return '<label class="' + json.style + '">' + json.content + '</label>';
        } else {
            return '<label>' + json.content + '</label>';
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
        return(html);
    }

    button(json) {
        if (json.clicked) {
            return '<button class="' + json.type + '" onClick="' + json.clicked + '">' + json.content + '</button>'
        } else {
            return '<button class="' + json.type + '">' + json.content + '</button>'
        }
    }

    app(json, osInst) {
        var titleBarsEnabled = osInst.getServ("configManager").getConf().titleBarsEnabled;
        var screenContent = document.getElementById("content");
        if (titleBarsEnabled) {
            var appContent = '<div class="app" id="app_' + json.id + '"><title-bar class="active mobile_tb"><nei class="title">' + json.title + '</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar>' + this.processContent(json.content) + '</div>'          
        } else {
            var appContent = '<div class="app" id="app_' + json.id + '"><h1>' + json.title + '</h1>' + this.processContent(json.content) + '</div>';
        }
        screenContent.innerHTML += appContent;
        return appContent;
    }
}

class main {
    services = {
        fileSys: undefined,
        configManager: undefined,
        appManager: undefined,
        uiManager: undefined
    }
    
    versInfo = verInfo;

    constructor() {
        console.info("%cWindows 98 Mobile " + this.versInfo.build, this.versInfo.greetingStyle);
        document.getElementById("version").innerText = "Windows 98 Mobile " + this.versInfo.build;

        this.services.fileSys = new fileSystem();
        this.services.configManager = new confmgr();
        this.services.appManager = new appmgr();
        this.services.uiManager = new uiMgr();
    }

    getServ(service) {
        return this.services[service];
    }
}

osInst = new main();

var testapp_html = '<div class="app"><label>Hi</label></div>';
var devmenu_html = '<div class="app" id="devMenu"><h2>Developer Menu</h2><div class="frame"><label>titleBarsEnabled (reload required!)</label>&nbsp;&nbsp;<button class="default" id="titleBarsEnabledBtn" onclick="toggle_cfg(\'titleBarsEnabled\')">' + osInst.getServ("configManager").getConf().titleBarsEnabled + '</button></div></div>';

if (osInst.getServ("configManager").getConf().titleBarsEnabled === true){
    testapp_html = '<div class="app"><title-bar class="active mobile_tb"><nei class="title">Test App</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar><label>Hi</label></div>';
    devmenu_html = '<div class="app" id="devMenu"><title-bar class="active mobile_tb"><nei class="title">Developer Menu</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar><div class="frame"><label>titleBarsEnabled (reload required!)</label>&nbsp;&nbsp;<button class="default" id="titleBarsEnabledBtn" onclick="toggle_cfg(\'titleBarsEnabled\')">' + osInst.getServ("configManager").getConf().titleBarsEnabled + '</button></div></div>';
}

// LEGACY FUNCTIONS: dont use
function open_app(cmd) {
    osInst.getServ("appManager").open(cmd, osInst.getServ("uiManager"), osInst);
}

function apps_screen() {
    osInst.getServ("appManager").hideApps();
}

function toggle_cfg(cfg) {
    osInst.getServ("configManager").toggleCfg(cfg);
}