"use strict";

/*Generate an outline based on h1-h6 headings in the source document*/
window.addEventListener("load", makeOutline);
//Generates the text of the table of contents as a nested list
function makeOutline() {
    var outline = document.getElementById("outline");

    //source document for the outline in article tag
    var source = document.getElementById("doc");

    var mainHeading = document.createElement("h1");
    var outlineList = document.createElement("ol");
    mainHeading.innerHTML = "Outline";
    outline.appendChild(mainHeading);
    outline.appendChild(outlineList);
    //parameters source as document and outlineList as ol
    createList(source, outlineList);
}
function createList(source, outlineList) {
    var headings = ["H1", "H2", "H3", "H4", "H5", "H6"];

    //previous level of the headings
    var prevLevel = 0;
    //running total of the article headings
    var headNum = 0;

    //loop through all the child nodes of source article until no child nodes are left
    for (var n = source.firstChild; n !== null; n = n.nextSibling) {
        //examine only article headings nodeName = H1
        var headLevel = headings.indexOf(n.nodeName);
        //testing if node name appears in headings array
        if (headLevel !== -1) {
            //add an id to the heading if it is missing
            headNum++;
            //test if id already exist for heading
            if (n.hasAttribute("id") === false) {
                n.id = "head" + headNum;
            }
            var listElem = document.createElement("li");
            var linkElem = document.createElement("a");
            //create <a> within each list item
            linkElem.innerHTML = n.innerHTML;
            linkElem.href = "#" + n.id;
            listElem.appendChild(linkElem);

            if (headLevel === prevLevel) {
                outlineList.appendChild(listElem);
            }
            else if (headLevel > prevLevel) {
                var nestedList = document.createElement("ol");
                nestedList.appendChild(listElem);
                //append nested list to last item in the current list
                outlineList.lastChild.appendChild(nestedList);
                //change the current list to the nested list
                outlineList = nestedList;
            }
            else {
                //append the list item to a higher list
                //calculate the difference between the current and previous level
                var levelUp = prevLevel - headLevel;
                //go up to the higher level
                for (var i = 1; i <= levelUp; i++) {
                    //moves up 2 levels for each iteration
                    outlineList = outlineList.parentNode.parentNode;
                }
                outlineList.appendChild(listElem);
            }
            //update the value of prevLevel
            prevLevel = headLevel;
        }
    }
}
