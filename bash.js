var commandBlock = require("./commands.js");

process.stdout.write('prompt > ');

var handler = function(command){
  
    var cmd = command.split(' ');  
    var firstCommand=cmd[0];
    var flags=cmd.slice(1);
    
    //console.log(firstCommand);
    //console.log(flags);
    
    //if (cmd[0] ==='pwd') {
    
    if(commandBlock[firstCommand] !== undefined){
        //commandBlock[firstCommand].apply(this,flags);    
        commandBlock[firstCommand](flags);    
    }
    else {
        process.stdout.write('huh?\n');
        process.stdout.write('prompt > ');
    }
}

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var cmd = data.toString().trim(); // remove the newline

  //process.stdout.write('You typed: ' + cmd);
  //process.stdout.write('\nprompt > ');
  handler(cmd);

});