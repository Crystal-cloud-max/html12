"use strict";

//An 2-dimensional array of the data found in the body of the web table
var tableData = [];

//An array of the column titles found the head of the web table
var dataCategories = [];

/*  The index number of the column by which the web table should be
    sorted where 0 = 1st column, 1 = 2nd column, etc.
 */
var sortIndex = 0;

/*  A value indicating direction of the sorting where a value of 1 sorts
    the data in ascending order and a value of -1 sorts the data in descending order
*/
var sortDirection = 1;

//functions run after browser reloads
window.addEventListener("load", function () {
    defineDataArray();
    writeTableData();
    defineColumns();
});

/*  Extracts values from the body of the web table and stores them in the tableData array*/
function defineDataArray() {
    //references all tr elements within the table body of the sortable table
    var tableRows = document.querySelectorAll("table.sortable tbody tr");

    //loop through each tr tag
    for (var i = 0; i < tableRows.length; i++) {
        var rowCells = tableRows[i].children;//table.sortable tbody tr td
        var rowValues = new Array(rowCells.length);//create new array for data cells
        for (var j = 0; j < rowCells.length; j++) {//loop through row cells
            rowValues[j] = rowCells[j].textContent;//display text
        }
        tableData[i] = rowValues;//set empty arraay to new array
    }
    //tableData array will contain a 2-D array of all of the data in the table body
    tableData.sort(dataSort2D);
}

//Writes the sorted data into the table rows and cells       
function writeTableData() {
    //create table body tag
    var newTableBody = document.createElement("tbody");
    for (var i = 0; i < tableData.length; i++) {
        //create table row tag
        var tableRow = document.createElement("tr");
        for (var j = 0; j < tableData[i].length; j++) {
            //create table data cell tag
            var tableCell = document.createElement("td");
            tableCell.textContent = tableData[i][j];//display data in new table data cell
            tableRow.appendChild(tableCell);//add table data cell tag to table row
        }
        newTableBody.appendChild(tableRow);//add tr to tbody
    }
    var sortTable = document.querySelector("table.sortable");
    var oldTableBody = sortTable.lastElementChild;//table.sortable tbody
    sortTable.replaceChild(newTableBody, oldTableBody);//replace updated tbody tag for old table.sortable tbody
}
/*  Extracts values form the column heads of the web table and stores
    them in the dataCategories array; also sets up the onclick event
    handlers for the column heads so that the table can be sorted by
    clicking a table heading cell.
 */
function defineColumns() {
    var newSheet = document.createElement("style");
    document.head.appendChild(newSheet);//add new style tag to head tag

    //adding to display pointer cursor over column headings
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "table.sortable thead tr th { \
        cursor: pointer;\ }", 0);
    //column heading should display an icon that indicates that they are sortable
    //symbol pointing down
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "table.sortable thead tr th::after { \
        content:'\\00a0'; \
        font-family: monospace; \
        margin-left: 5px;\ }", 1);
    //changing icon for 1st column heading to a ^
    document.styleSheets[document.styleSheets.length - 1].insertRule(
        "table.sortable thead tr th:nth-of-type(1)::after { \
        content: '\\25b2';\ }", 2);

    //loop through each column header to sort in ascending order
    var columnHeaders = document.querySelectorAll("table.sortable thead tr th");
    for (var i = 0; i < columnHeaders.length; i++) {
        dataCategories[i] = columnHeaders[i].textContent;//display text to table.sortable thead tr th
        columnHeaders[i].onclick = columnSort;//call function
    }
}
/*  Event handler function that sorts the table data when a column
    heading is clicked
*/
function columnSort(e) {
    //determine which column was clicked by the user
    var columnText = e.target.textContent;

    //retrieve the index number of the column with text
    var columnIndex = dataCategories.indexOf(columnText);

    /*if user clicks the column heading currently used for sorting, the sorting
     * direction is toggled between ascending and descending. If user clicks a
     * new column heading, the table should be sorted by value in that column*/
    if (columnIndex === sortIndex) {
        sortDirection = -sortDirection;//descending order
    }
    else {
        sortIndex = columnIndex;
    }

    //move the icon into the column heading cell used for sorting
    var columnNumber = columnIndex + 1;

    //references last style sheet in the document then delete 3rd rule from style sheet
    var columnStyles = document.styleSheets[document.styleSheets.length - 1]
    columnStyles.deleteRule(2);//3rd rule

    //ascending order
    if (sortDirection === 1) {
        columnStyles.insertRule(
            "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after { \
            content: '\\25b2';\}", 2);
    }
    //descending order
    else {
        columnStyles.insertRule(
            "table.sortable thead tr th:nth-of-type(" + columnNumber + ")::after { \
            content: '\\25bc';\}", 2);
    }
    //sort table data in ascending order by calling function
    tableData.sort(dataSort2D);

    //create and append newly sorted table body to the web table by calling function
    writeTableData();
}
/*  Compare function used to sort numeric and alphabetical data from a 2-dimensional array */
function dataSort2D(a, b) {
   //if false array a a double is not a number
    if (isNaN(parseFloat(a[sortIndex])) === false) {
      //ascending order of arrays * direction
      return (a[sortIndex] - b[sortIndex])*sortDirection;
   }
   else {//set array string variables to lower case
      var astring = a[sortIndex].toLowerCase();
      var bstring = b[sortIndex].toLowerCase();
           
      if (bstring > astring) return -sortDirection;//descend
      if (bstring < astring) return sortDirection;//ascend
      return 0;
   }
}