var testapp_html = '<div class=\"app\"><label>Hi</label></div>';

function open_app(cmd) {
    if(cmd == "testApp") {
        document.getElementById("apps").className += " invisible"
        document.getElementById("content").innerHTML += testapp_html;
    }
}

function apps_screen() {
    for(i = 0; i < document.getElementsByClassName("app").length; i++)
    {
        document.getElementsByClassName("app")[i].className += " invisible"
    }
    document.getElementById("apps").className = "appScreen";
}