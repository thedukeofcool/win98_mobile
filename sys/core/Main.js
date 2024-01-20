import { AppManager } from "./AppManager.js";
import { AppsScreen } from "./AppsScreen.js";
import { ConfigManager } from "./ConfigManager.js";
import { FileSystem } from "./FileSystem.js";
import { HTTPManager } from "./HTTPManager.js";
import { UIManager } from "./UIManager.js";
import { verInfo } from "./VersionInfo.js";

export class Main {
    services = {
        fileSys: undefined,
        configManager: undefined,
        appManager: undefined,
        uiManager: undefined,
        httpManager: undefined
    };

    constructor() {
        console.info("%cWindows 98 Mobile " + verInfo.build + "." + verInfo.branch, verInfo.greetingStyle);
        document.getElementById("version").innerText = "Windows 98 Mobile " + verInfo.build + "." + verInfo.branch;

        new AppsScreen([{icon: 'generic', title: 'Test App', id: 'testApp'}]);
        this.services.fileSys = new FileSystem();
        this.services.configManager = new ConfigManager();
        this.services.appManager = new AppManager();
        this.services.uiManager = new UIManager();
        this.services.httpManager = new HTTPManager();
    }

    getServ(service) {
        return this.services[service];
    }
}

globalThis.os = new Main();

// LEGACY FUNCTIONS: dont use
function open_app(cmd) {
    console.log('open_app');
    os.getServ("appManager").open(cmd, os.getServ("uiManager"));
}

function apps_screen() {
    os.getServ("appManager").hideApps();
}

function toggle_cfg(cfg) {
    os.getServ("configManager").toggleCfg(cfg);
} 

globalThis.open_app = open_app;
globalThis.apps_screen = apps_screen;
globalThis.toggle_cfg = toggle_cfg;