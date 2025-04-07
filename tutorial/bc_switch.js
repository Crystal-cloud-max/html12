"use strict";

window.addEventListener("load", setupStyles);
function setupStyles() {
    //create a link element for the page view styles
    var pageStyle = document.createElement("link");
    pageStyle.href = "bc_page.css";
    pageStyle.rel = "stylesheet";
    pageStyle.disabled = "disabled";
    document.head.appendChild(pageStyle);

    //for older browsers like Firefox
    pageStyle.disabled = true;

    var buttonDIV = document.createElement("div");
    buttonDIV.id = "styleButtons";

    var webButton = document.createElement("input");
    webButton.type = "button";
    webButton.value = "Web View";

    var pageButton = document.createElement("input");
    pageButton.type = "button";
    pageButton.value = "Page View";

    buttonDIV.appendChild(webButton);
    buttonDIV.appendChild(pageButton);
    document.body.insertBefore(buttonDIV, document.body.firstChild);

    var buttonStyles = document.createElement("style");
    document.head.appendChild(buttonStyles);

    //append an embedded style sheet to document head
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "div#styleButtons { \
          position:fixed; \}", 0);
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "div#styleButtons input{ \
        background-color: rgba(68,94,186,.6); \
        border: 3px solid rgba(0, 24, 123,.6); \
        border-radius: 50%; \
        cursor: pointer; \
        color: white;\
        display: inline-block; \
        font-size: 1.2em; \
        height: 60px; \
        margin: 5px 10px; \
        width: 100px; \ }", 1);

    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "@media print { \
        div#styleButtons { \
        display: none; \ } \ }", 2);
    //turn the page view style off and on
    webButton.onclick = function () {
        pageStyle.disabled = true;
    };
    pageButton.onclick = function () {
        pageStyle.disabled = false;
    };
}
