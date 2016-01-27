var commandBlock = require("./commands.js");

var BashShell = function() {
	this.prompt = 'prompt > ';	
}

BashShell.prototype.initializeShell = function(alternatePrompt) {
	this.confirmPrompt(alternatePrompt);
	this.printPrompt();
	this.beginUserInputLoop();
};

BashShell.prototype.confirmPrompt = function(alternatePrompt) {
	if(!!alternatePrompt) this.prompt = alternatePrompt;
};

BashShell.prototype.printPrompt = function(){
	process.stdout.write(this.prompt);
};

BashShell.prototype.beginUserInputLoop = function() {
	// The stdin 'data' event fires after a user types in a line
	process.stdin.on('data', function(data) {
	  var userInput = data.toString().trim(); 
	  this.processUserInput(userInput);
	}.bind(this));
};

BashShell.prototype.processUserInput = function(userInput) {
	var inputTokens = userInput.split(' ');  

	if(this.isValidCommand(inputTokens)) {
		this.acceptCommandAttempt(inputTokens);
	}
	else {
        this.rejectCommandAttempt(inputTokens);
    }
};

BashShell.prototype.isValidCommand = function(inputTokens) {
    return !!commandBlock[inputTokens[0]];
};

BashShell.prototype.acceptCommandAttempt = function(acceptedTokens) {
    var command = acceptedTokens[0];
    var args = acceptedTokens.slice(1);
    
    this.executeCommand(command, args);
};

BashShell.prototype.rejectCommandAttempt = function(rejectedTokens) {
	process.stdout.write(rejectedTokens[0]+': command not found\n');
	this.printPrompt();
};

BashShell.prototype.executeCommand = function(command, args) {
	commandBlock[command].call(this,args);
};

BashShell.prototype.printCommandOutput = function(output)  {
   process.stdout.write(output+'\n');
   this.printPrompt();
};

BashShell.prototype.clearConsole = function() {
	process.stdout.write('\033c');
	this.printPrompt();
};

var bash = new BashShell();
bash.initializeShell(process.argv[2]);