export class ConfigManager {
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