var linesQueue = [];
function initTerminal(){
    var target = document.getElementById("terminal");
    target.className += " terminal";
    // alert(target.innerHTML);
    populateIntoLineQueue(target);
}
function getImportHtml(text){
    return '<span class="import">'+text+'</span>';
}
function populateIntoLineQueue(target){
    var html = String(target.innerHTML).trim();
    var start = html.search(/\w/);
    alert("First char starts at = "+start);
    var end = start;
    while(end != -1){
        end = html.indexOf("\n");
        linesQueue.push(getImportHtml(html.slice(0, end)));
        html = html.substr(end + 1, html.length).trim();
    }
    console.log(linesQueue);
    var temp = '';
    for(var i=0;i<linesQueue.length;i++){
        temp += linesQueue[i];
    }
    target.innerHTML = temp;
    // console.log(html);
    // alert("Length = "+html.length+" substr = "+html.substr(0, 10));
}
