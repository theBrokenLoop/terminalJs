/**
 @projectName TerminalJs
 @author Vipin Chaudhary
 @source https://github.com/thebrokenloop/terminalJs
 */

/**
 * Terminal Base Class
 * @param target Dom in html document
 * @param language that has to be shown in terminal
 * @param theme
 * @constructor Terminal
 */
function Terminal(target, language, theme) {
    this.target = document.getElementById(target);
    this.language = language;
    this.theme = theme;
    this.linesQueue = [];
}

/**
 * Extending prototype functions in Terminal base class
 * @type {{constructor: Terminal, init: Terminal.init, populateIntoLineQueue: Terminal.populateIntoLineQueue}}
 */
Terminal.prototype = {
    constructor: Terminal,

    /**
     * Function to initiate the terminal
     */
    init: function () {
        // alert("Creating terminal " + this.language + " with " + this.theme);
        this.target.className += " terminal "+this.theme + " " + this.language;
        this.populateIntoLineQueue();
    },
    /**
     * Divides text into lines using '\n' character
     */
    populateIntoLineQueue: function () {
        var html = String(this.target.innerHTML).trim();
        var end = html.search(/\w/);
        while (end != -1) {
            end = html.indexOf("\n");
            this.linesQueue.push(html.slice(0, end));
            html = html.substr(end + 1, html.length).trim();
        }
        console.log(this.linesQueue);
        var temp = '';
        var processLine = new ProcessLine('python');
        for (var i = 0; i < this.linesQueue.length; i++) {
            temp += processLine.process(this.linesQueue[i]);
        }
        this.target.innerHTML = temp;
    }
};

function initTerminal() {
    var terminal1 = new Terminal("terminal1", "python", "dark");
    terminal1.init();

    var terminal2 = new Terminal("terminal2", "python", "light");
    terminal2.init();

}

function ProcessLine(language){
  this.language = language;
}
ProcessLine.prototype = {
  constructor: ProcessLine,
  process: function(line){
    /// Some preliminary operations on line
    line = line.trim().replace("  ", "");

    line = line.replace(/(["'][^,]*["'])/g, stringReplacer)  // Check for methods
    .replace(/(\.[a-zA-Z^(]+)/g, attributeReplacer)  // Check for attributes
    .replace(/([\s(\[])(\d*\.?\d*)([\s)\]:])/g, numberReplacer)  // Check for numbers
    .replace(/(\.[a-zA-Z]+\()(.*)(\))/g, methodReplacer)  // Check for attribute methods
    .replace(/([a-zA-Z]+\()(.*)(\))/g, methodReplacer);  // Check for normal methods
    /// Generic language Operations
    switch (this.language) {
      case 'python':
        return this.python(line);
        break;
      case 'cpp':
        return this.cpp(line);
        break;
      case 'java':
        return this.java(line);
        break;
      default:

    }
  },
  python: function(line){
    /// Python Specific Operations
    line = line.replace(/(#.*)/, commentReplacer)  // Check for comments
    /// python's reserved characters Regex Patterns matching
    .replace(/(\s?import|from|for|all|\sin\s|^break|^continue|^pass|^print\s|^if|^el[is][fe])/g, keywordReplacer);
    // console.log("Returning = " + line);
    return line;
  }
}
/**
 * Process lines through available theme
 * @param line
 * @return {*}
 */
function processPythonLine(line) {

    /// Some preliminary operations on line
    line.trim().replace("  ", "").replace(" ", "");

    /// python's reserved characters Regex Patterns matching

    line = line.replace(/(["'][^,]*["'])/g, stringReplacer)  // Check for methods
    .replace(/(\.[a-zA-Z^(]+)/g, attributeReplacer)  // Check for attributes
    .replace(/([\s(\[])(\d*\.?\d*)([\s)\]:])/g, numberReplacer)  // Check for numbers
    .replace(/(\.[a-zA-Z]+\()(.*)(\))/g, methodReplacer)  // Check for attribute methods
    .replace(/([a-zA-Z]+\()(.*)(\))/g, methodReplacer)  // Check for normal methods
    .replace(/(#.*)/, commentReplacer)  // Check for comments
    /// Check for "import" statement
    .replace(/(\s?import|from|for|all|\sin\s|^break|^continue|^pass|^print\s|^if|^el[is][fe])/g, keywordReplacer);

    console.log("Returning = " + line);
    return line;
}

/******************* Regex Pattern Formatter Functions \*****************/

/**
 * Regex pattern formatter function
 * Take 3 parameter , method name , method arguments and method closing parenthesis and return with attached method class
 * @param match
 * @param p1
 * @param p2
 * @param p3
 * @param offset
 * @param string
 * @return {string}
 */
function methodReplacer(match, p1, p2, p3, offset, string) {
    return getMethodHtml(p1) + p2 + getMethodHtml(p3);
}

/**
 * Regex pattern formatter function
 * Take 1 parameter , attribute name and  return with attached attribute class
 * @param match
 * @param p1
 * @param offset
 * @param string
 * @return {string}
 */
function attributeReplacer(match, p1, offset, string) {
    return getAttributeHtml(p1);
}

/**
 * Regex pattern formatter function
 * Take 1 parameter , string and  return with attached string class
 * @param match
 * @param p1
 * @param offset
 * @param string
 * @return {string}
 */
function stringReplacer(match, p1, offset, string) {
    return getStringHtml(p1);
}

/**
 * Regex pattern formatter function
 * Take 1 parameter , # type comments and  return with attached comment class
 * @param match
 * @param p1
 * @param offset
 * @param string
 * @return {string}
 */
function commentReplacer(match, p1, offset, string) {
    return getCommentHtml(p1);
}

/**
 * Regex pattern formatter function
 * Take 1 parameter , language keywords and return with attached keyword class
 * @param match
 * @param p1
 * @param offset
 * @param string
 * @return {string}
 */
function keywordReplacer(match, p1, offset, string) {
    return getKeywordHtml(p1);
}
/**
 * Regex pattern formatter function for numbers
 * @param match
 * @param p1
 * @param p2
 * @param p3
 * @param offset
 * @param string
 * @return {*}
 */
function numberReplacer(match, p1, p2, p3, offset, string) {
    return p1 + getNumberHtml(p2) + p3;
}

/******************* Class Attach Functions \*****************/

/**
 * Take raw line as input and return line with attached keyword class
 * @param text
 * @return {string}
 */
function getKeywordHtml(text) {
    return '<span class="keyword">' + text + '</span>';
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

/**
 * Take raw line as input and return line with attached comment class
 * @param text
 * @return {string}
 */
function getCommentHtml(text) {
    return '<span class="comment">' + text + '</span>';
}
/**
 * Take raw line as input and return line with attached number class
 * @param text
 * @return {string}
 */
function getNumberHtml(text) {
    return '<span class="number">' + text + '</span>';
}
