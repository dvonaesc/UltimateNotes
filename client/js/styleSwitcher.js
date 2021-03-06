
function setActiveStyleSheet(title) {
    let i, a;
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") !== -1 && a.getAttribute("title")) {
            a.disabled = true;
            if (a.getAttribute("title") === title) a.disabled = false;
        }
    }
}

function getActiveStyleSheet() {
    let i, a;
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") !== -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
    }
    return null;
}

function getPreferredStyleSheet() {
    let i, a;
    for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
        if (a.getAttribute("rel").indexOf("style") !== -1
            && a.getAttribute("rel").indexOf("alt") === -1
            && a.getAttribute("title")
        ) return a.getAttribute("title");
    }
    return null;
}

function createCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        expires = "; expires=" + Date.toUTCString();
        date.setTime(date.getTime()+(days*24*60*60*1000));
    }
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}



window.onload = function() {
    let cookie = readCookie("style");
    let title = cookie ? cookie : getPreferredStyleSheet();
    setActiveStyleSheet(title);

};

window.onunload = function() {
    let title = getActiveStyleSheet();
    createCookie("style", title, 365);
};

let cookie = readCookie("style");
let title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);