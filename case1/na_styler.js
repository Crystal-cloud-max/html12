"use strict";

//runs function after browser is reloaded
window.addEventListener("load", setStyles);

function setStyles() {
    //one of 5 fancy style sheets to be randomly used when page is opened
    var styleNum = randInt(5);//call function

    //creating a link tag in the head tag of html page and set attributes
    var newStyle = document.createElement("link");
    newStyle.rel = "stylesheet";
    newStyle.id = "fancySheet";
    newStyle.href = "na_style_" + styleNum + ".css";

    //add element to the head tag
    document.head.appendChild(newStyle);

    /*user will be able to choose between the 5 fancy style sheet
     *themes she has created by clicking thumbnail images from a figure box*/
    var figBox = document.createElement("figure");//create figure tag for div#box
    figBox.id = "styleThumbs";//set id
    document.getElementById("box").appendChild(figBox);//add tag to div tag

    //populate the figure box with preview images of the 5 fancy style sheets
    for (var i = 0; i < 5; i++) {
        //create img tag in figure#thumbStyles and set properties
        var sheetImg = document.createElement("img");
        sheetImg.src = "na_small_" + i + ".png";
        sheetImg.alt = "na_style_" + i + ".css";

        //browser load a different style sheet when user clicks on of thumbnail images
        sheetImg.onclick = function (e) {
            //get id from link tag in head tag targetting its alt attribute from sheetImg.alt
            document.getElementById("fancySheet").href = e.target.alt;
        };
        //add sheet image to figure#styleThumbs
        figBox.appendChild(sheetImg);
    }

    //var thumbStyles = document.createElement("style");
    //document.head.appendChild(thumbStyles);

    //change styles for img thumbs selection 
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "figure#styleThumbs { \
        position: absolute;\
        left: 0;\
        bottom: 0;\ }", 0);
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "figure#styleThumbs img {\
        outline: 1px solid black;\
        cursor: pointer;\
        opacity:.75;\}", 1);
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "figure#styleThumbs img:hover{\
        outline: 1px solid red;\
        opacity:1.0;\}",2);
}
//Returns a random integer from 1st-last value.
function randInt(size) {
   return Math.floor(size * Math.random());
}