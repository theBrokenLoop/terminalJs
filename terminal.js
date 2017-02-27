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

function getImportHtml(text) {
    return '<span class="import">' + text + '</span>';
}
function getMethodHtml(text) {
    return '<span class="method">' + text + '</span>';
}
function getStringHtml(text) {
    return '<span class="string">' + text + '</span>';
}
function getAttributeHtml(text) {
    return '<span class="attribute">' + text + '</span>';
}


function methodReplacer(match, p1, p2, p3, offset, string) {
    alert("P1 = " + p1 + " p2 = " + p2 + " p3 = " + p3);
    return getMethodHtml(p1);
}
function attributeReplacer(match, p1, offset, string) {
    alert("p1 = " + p1);
    return getAttributeHtml(p1);
}


function processLine(line) {
    /// Some preliminary operations on line
    line.trim().replace("  ", "").replace(" ", "");
    // console.log("got string = "+line);

    /// python's reserved characters Regex Patterns matching

    line = line.replace(/import/, getImportHtml("import"));  // Check for "import" statement
    line = line.replace(/from/, getImportHtml("from"));  // Check for "from" statement
    line = line.replace(/(\.[a-zA-Z]+\()(\w*)(\))/, methodReplacer);  // Check for methods
    line = line.replace(/(\.[a-zA-Z^(]+)/, attributeReplacer);  // Check for attributes


    console.log("Returning = " + line);
    return line;
}
function populateIntoLineQueue(target) {
    var html = String(target.innerHTML).trim();
    var start = html.search(/\w/);
    var end = start;
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
    console.log(temp);
    target.innerHTML = temp;
}
