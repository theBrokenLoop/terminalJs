var linesQueue = [];
function initTerminal(){
    var target = document.getElementById("terminal");
    /// Add terminal class for DOM
    target.className += " terminal";
    populateIntoLineQueue(target);
}
function getImportHtml(text){
    return '<span class="import">'+text+'</span>';
}
function getMethodHtml(text){
    return '<span class="method">'+text+'</span>';
}
function getStringHtml(text){
    return '<span class="string">'+text+'</span>';
}
function replacer(match, p1, offset, string) {
  // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    alert("Came in repalcer");
  return getMethodHtml(p1);
}
function processLine(line){
    /// Some preliminary operations on line
    line.trim().replace("  ", "").replace(" ", "");
    console.log("got string = "+line);
    if (line.search(/(.\w+\(])/)){
        alert("Found");
        line = line.replace(/(.\w+\()]/, replacer);
    }

    if (line.indexOf("import") >= 0){
        console.log("Found import");
        line = line.replace("import", getImportHtml("import"));
    }

    // if (line.search(/.[\w]*/))
    console.log("Returning = "+line);
    return line;
}
function populateIntoLineQueue(target){
    var html = String(target.innerHTML).trim();
    var start = html.search(/\w/);
    alert("First char starts at = "+start);
    var end = start;
    while(end != -1){
        end = html.indexOf("\n");
        linesQueue.push(html.slice(0, end));
        html = html.substr(end + 1, html.length).trim();
    }
    console.log(linesQueue);
    var temp = '';
    for(var i=0;i<linesQueue.length;i++){
        temp += processLine(linesQueue[i]);
    }
    console.log(temp);
    target.innerHTML = temp;
}
