"use strict";

//Running count of all nodes in the source document
var nodeCount = 0;

//Running count of all element nodes in the source document
var elemCount = 0;

//Running count of all text nodes in the source document
var textCount = 0;

//Running count of all white space text nodes in the source document
var wsCount = 0;

//run function after browser is uploaded
window.onload = makeTree;

/*  Sets up and places the node tree within the HTML document and
    displays the node counts from the document
 */
function makeTree() {
    //create aside element and set its id
    var treeBox = document.createElement("aside");
    treeBox.id = "treeBox";

    //create h1 element in aside#treeBox
    treeBox.innerHTML = "<h1>Node Tree</h1>";

    //location of id in section
    var main = document.getElementById("main");

    //add aside#treeBox to main element
    main.appendChild(treeBox);

    //create and add ordered list to aside#treeBox 
    var nodeList = document.createElement("ol");
    treeBox.appendChild(nodeList);

    //is based on contents of the elements matching CSS selector
    var sourceArticle = document.querySelector("#main article");

    //contents of node tree and count of global variables will be updated
    makeBranches(sourceArticle, nodeList);//call function

    //add commands to display total count of the nodes in source document
    document.getElementById("totalNodes").textContent = nodeCount;
    document.getElementById("elemNodes").textContent = elemCount;
    document.getElementById("textNodes").textContent = textCount;
    document.getElementById("wsNodes").textContent = wsCount;

}

/*  Makes a list item or an ordered list based on the contents and type
    of node from the sourceNode parameter and then appends that list
    item or ordered list to nestedList. The function recursively calls
    itself to navigate throught the node tree of the source document.
 */
function makeBranches(treeNode, nestedList) {
    //new node has been discovered in source article
    nodeCount++;

    //create list item and display +-- with element
    var liElem = document.createElement("li");
    liElem.innerHTML = "+--";

    //create span tag then add span tag to list item tag then list item to nested list parameter
    var spanElem = document.createElement("span");
    liElem.appendChild(spanElem);
    nestedList.appendChild(liElem);

    //if treeNode represents element node 1 for Element node
    if (treeNode.nodeType === 1) {
        elemCount++;//increment
        spanElem.class = "elementNode";//set class name
        spanElem.textContent = "<" + treeNode.nodeName + ">";//nodeName = H1 or #text
    }

    //2 is for Attribute node
    //else if treeNode represents the text node 3 for Text node
    else if (treeNode.nodeType === 3) {
        textCount++;//increment
        //nodeValue element is null or text string
        var textString = treeNode.nodeValue;
        //returns true
        if (isWhiteSpaceNode(textString)) {//call function
            wsCount++;//increment
            spanElem.class = "whiteSpaceNode";//set class name
            spanElem.textContent = "#text";//display string
        }
        else {//returns false
            spanElem.class = "textNode";//set class name
            spanElem.textContent = textString;//display
        }
    }

    //moves through different levels of nodes in source article
    if (treeNode.childNodes.length > 0) {
        //create an ordered list
        var newList = document.createElement("ol");
        newList.innerHTML = "|";//display |
        nestedList.appendChild(newList);//add new ordered list to nested list

        //loop through the child nodes of tree node
        for (var n = treeNode.firstChild; n != null; n = n.nextSibling) {
            makeBranches(n, newList);//call function
        }
    }
}
/*
    Returns true if tString represents the text of a white space text
    node and false if it doesn't
*/
function isWhiteSpaceNode(tString) {
   return !(/[^\t\n\r ]/.test(tString));
}
