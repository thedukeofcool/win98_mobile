mode = "mode_txt"

var terminal = null;
var build = "wns_beta_17.2000"

terminal = document.getElementById("text");
command_buffer = "";

document.addEventListener("keydown", (evt) => {
    if (evt.isComposing || evt.keyCode === 229) {
        return;
    }
    else if (evt.keyCode === 13) {
        processCommand(command_buffer);
        command_buffer = "";
    }
    else
    {
        command_buffer += evt.key;
    }
    command_buffer.substr(0, command_buffer.length);
    text_mode_print(command_buffer);
});

function processCommand(command) {

}

function text_mode_print(message) {
    terminal.innerHTML += message;
}

function text_mode_println(message) {
    text_mode_print(message + "<br/>");
}

text_mode_println("Windows 97 Beta (build " + build + ")")
text_mode_println("Mode: " + mode);
text_mode_println("");

text_mode_print("/ $")
