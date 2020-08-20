const dark = "icon/dark.png";
const light = "icon/light.png";
document.getElementById("colormode_dark").addEventListener("click", () => {
    document.getElementById("colormode_light").hidden = false;
    document.getElementById("colormode_dark").hidden = true;
    document.getElementById("body").className = "";
})

document.getElementById("colormode_light").addEventListener("click", () => {
    document.getElementById("colormode_light").hidden = true;
    document.getElementById("colormode_dark").hidden = false;
    document.getElementById("body").className = "dark";
})