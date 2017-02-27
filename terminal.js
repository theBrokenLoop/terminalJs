var linesQueue = [];
function initTerminal() {
    var target = document.getElementById("terminal");
    /// Add terminal class for DOM
    target.className += " terminal";
    // var line = ".class()";
    // if(line.search(/\.[a-z]+]/)){
    //     alert("Found class");
    // }
    populateIntoLineQueue(target);
}

/**
 * Process lines through available theme
 * @param line
 * @return {*}
 */
function processLine(line) {

    /// Some preliminary operations on line
    line.trim().replace("  ", "").replace(" ", "");

    /// python's reserved characters Regex Patterns matching

    line = line.replace(/import/, getImportHtml("import"));  // Check for "import" statement
    line = line.replace(/from/, getImportHtml("from"));  // Check for "from" statement
    line = line.replace(/(\.[a-zA-Z^(]+)/, attributeReplacer);  // Check for attributes
    line = line.replace(/(\.[a-zA-Z]+\()(.*)(\))/, methodReplacer);  // Check for methods

    console.log("Returning = " + line);
    return line;
}

/**
 * Divides text into lines using '\n' character
 * @param {Element} target
 */
function populateIntoLineQueue(target) {
    var html = String(target.innerHTML).trim();
    var end = html.search(/\w/);
    while (end != -1) {
        end = html.indexOf("\n");
        linesQueue.push(html.slice(0, end));
        html = html.substr(end + 1, html.length).trim();
    }
    console.log(linesQueue);
    var temp = '';
    for (var i = 0; i < linesQueue.length; i++) {
        temp += processLine(linesQueue[i]);
    }
    target.innerHTML = temp;
}

/******************* Regex Pattern Formatter Functions \*****************/

/**
 * Regex pattern formatter function
 * Take 3 parameter , method name , method arguments and method closing parenthesis and return with attached class
 * @param match
 * @param p1
 * @param p2
 * @param p3
 * @param offset
 * @param string
 * @return {string}
 */
function methodReplacer(match, p1, p2, p3, offset, string) {
    alert("P1 = " + p1 + " p2 = " + p2 + " p3 = " + p3);
    return getMethodHtml(p1) + p2 + getMethodHtml(p3);
}

/**
 * Regex pattern formatter function
 * Take 1 parameter , attribute name and  return with attached class
 * @param match
 * @param p1
 * @param offset
 * @param string
 * @return {string}
 */
function attributeReplacer(match, p1, offset, string) {
    alert("p1 = " + p1);
    return getAttributeHtml(p1);
}

/******************* Class Attach Functions \*****************/

/**
 * Take raw line as input and return line with attached import class
 * @param text
 * @return {string}
 */
function getImportHtml(text) {
    return '<span class="import">' + text + '</span>';
}

/**
 * Take raw line as input and return line with attached method class
 * @param text
 * @return {string}
 */
function getMethodHtml(text) {
    return '<span class="method">' + text + '</span>';
}

/**
 * Take raw line as input and return line with attached string class
 * @param text
 * @return {string}
 */
function getStringHtml(text) {
    return '<span class="string">' + text + '</span>';
}

/**
 * Take raw line as input and return line with attached attribute class
 * @param text
 * @return {string}
 */
function getAttributeHtml(text) {
    return '<span class="attribute">' + text + '</span>';
}