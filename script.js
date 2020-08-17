var cnt = 0;
var stage = "default";
function createURL(obj) {
    return URL.createObjectURL(obj);
}

function changeState(nxt) {
    if (nxt === "enterName") {
        stage = "enterName";
        changePlaceholder("Enter name");
    }else if (nxt === "addMsg") {
        stage = "addMsg";
        changePlaceholder("Enter new message or type 'QUIT' to exit");
    }else if (nxt == "default") {
        stage = "default";
        changePlaceholder("Type 'new' to add new person");
    }
}
function run(cmd) {
    cmd = cmd === "QUIT" ? "QUIT" : cmd.toLowerCase();
    if (stage === "default") {
        if (cmd === "new") {
            createNewChat();
            changeState("enterName");
        }
    }else if (stage === "enterName" && cmd !== "") {
        setName(cmd);
        changeState("addMsg");
    }else if (stage === "addMsg") {
        if (cmd === "QUIT") {
            changeState("default");
        }else if (cmd !== "") {
            addChat(cmd);
        }
    }
}
document.getElementById("cmdline").addEventListener("keypress", function (e) {
    if (e.which === 13) {
        e.stopPropagation();
        e.preventDefault();
        run(document.getElementById("cmdline").value);
        document.getElementById("cmdline").value = "";
    }
});

function createNewChat() {
    ++cnt;
    var img = document.createElement("img"); img.id = `photo${cnt}`; img.className = "img"; img.setAttribute("onclick", `document.getElementById('file-input${cnt}').click();`); img.setAttribute("src", "default.png");
    var input = document.createElement("input"); input.id = `file-input${cnt}`; input.setAttribute("type", "file"); input.setAttribute("name", "name"); input.setAttribute("style", "display: none;"); input.setAttribute("onchange", `document.getElementById('photo${cnt}').src = createURL(event.target.files[0]);`);
    var head2 = document.createElement("div"); head2.className = "head2";
    var head = document.createElement("div"); head.className = "head";
    head2.insertBefore(img, null);
    head.insertBefore(head2, null); head.insertBefore(input, null);
    var chatbox = document.createElement("div"); chatbox.id = `chat${cnt}`; chatbox.className = "chatbox"; 
    var box = document.createElement("div"); box.id = `box${cnt}`; box.className = "box"; 
    box.insertBefore(head, null); box.insertBefore(chatbox, null);
    document.getElementById("body").insertBefore(box, document.getElementById("cmd"));
    // console.log(head);
}
function setName(string) {
    var name = document.createElement("div"); name.className = "name"; name.innerText = string;
    document.getElementById(`chat${cnt}`).insertBefore(name, null);
}
function addChat(string) {
    var chat = document.createElement("div"); chat.className = "chat"; chat.innerText = string;
    document.getElementById(`chat${cnt}`).insertBefore(chat, null);
    var check = document.getElementById(`chat${cnt}`).getElementsByClassName("chat");
    var len = check.length;
    if (len === 1) {
        check[0].className = "chat single";
    }else {
        for (var i = 1; i < len - 1; i++) {
            check[i].className = "chat mid";
        }
        check[0].className = "chat top";
        check[len - 1].className = "chat down";
    }
}
function changePlaceholder(string) {
    document.getElementById("cmdline").setAttribute("placeholder", string);
}
/*
    <div class="box">
        <div class="head">
            <div class="head2">
                <img id="photo1" class="img" onclick="document.getElementById('file-input1').click();" src="a.png">
            </div>
            <input id="file-input1" type="file" name="name" onchange="loadFile(event)" style="display: none;"/>
        </div>
        <div class="chatbox" id="chat">
            <div class="name">最愛麻辣yui醬、麻辣mio醬跟麻辣冬馬的噁男</div>
            <div class="chat top">我愛麻辣YUI醬</div>
            <div class="chat mid">冬馬破妓</div>
            <div class="chat down">我是台大電神</div>
        </div>
    </div>
*/