var testapp_html = '<div class="app"><label>Hi</label></div>';
var devmenu_html = '<div class="app" id="devMenu"><h2>Developer Menu</h2><div class="frame"><label>titleBarsEnabled (reload required!)</label>&nbsp;&nbsp;<button class="default" id="titleBarsEnabledBtn" onclick="toggle_cfg(\'titleBarsEnabled\')">' + get_mconfig().titleBarsEnabled + '</button></div></div>';

if (localStorage.mconfig === undefined)
{
    localStorage.mconfig = JSON.stringify({
        titleBarsEnabled: false
    });
}

function get_mconfig() {
    return JSON.parse(localStorage.mconfig);
}

if (get_mconfig().titleBarsEnabled === true){
    testapp_html = '<div class="app"><title-bar class="active mobile_tb"><nei class="title">Test App</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar><label>Hi</label></div>';
    devmenu_html = '<div class="app" id="devMenu"><title-bar class="active mobile_tb"><nei class="title">Developer Menu</nei><div class="windowControls"><button class="titleControl"><img src="./sys/resources/img/png/close_btn.png"></button></div></title-bar><div class="frame"><label>titleBarsEnabled (reload required!)</label>&nbsp;&nbsp;<button class="default" id="titleBarsEnabledBtn" onclick="toggle_cfg(\'titleBarsEnabled\')">' + get_mconfig().titleBarsEnabled + '</button></div></div>';
}

function open_app(cmd) {
    if(cmd == "testApp") {
        document.getElementById("apps").className += " invisible"
        document.getElementById("content").innerHTML += testapp_html;
    }
    else if (cmd == "devmenu")
    {
        document.getElementById("apps").className += " invisible"
        document.getElementById("content").innerHTML += devmenu_html;
    }
}

function apps_screen() {
    for(i = 0; i < document.getElementsByClassName("app").length; i++)
    {
        document.getElementsByClassName("app")[i].className += " invisible"
    }
    document.getElementById("devMenu").remove();
    document.getElementById("apps").className = "appScreen";
}

function toggle_cfg(cfg) {
    if (cfg == "titleBarsEnabled") {
        var mcfg = get_mconfig()
        mcfg.titleBarsEnabled = !mcfg.titleBarsEnabled;
        document.getElementById("titleBarsEnabledBtn").innerText = mcfg.titleBarsEnabled.toString();
        localStorage.mconfig = JSON.stringify(mcfg);
        delete mcfg;
    }
}