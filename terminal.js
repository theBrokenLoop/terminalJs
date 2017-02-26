var linesQueue = [];
function initTerminal(){
    var target = document.getElementById("terminal");
    // alert(target.innerHTML);
    populateIntoLineQueue(target);
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
    // console.log(html);
    // alert("Length = "+html.length+" substr = "+html.substr(0, 10));
}
