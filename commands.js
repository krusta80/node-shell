var fs = require('fs');

var commandBlock = {
    exit : function() {
        process.exit(0);
    },
    
    clear : function() {
    	this.clearConsole();
    },

    pwd : function() {
        this.printCommandOutput(process.cwd());
    },
    
    date : function() {
        var dt = new Date().toString();
        this.printCommandOutput(dt);
    },
    
    ls : function(commandArgs) {
        var path = commandArgs[0] || '.';
        var fileList = "";

        fs.readdir(path, function(err, files) {
          if (err) throw err;          
          files.forEach(function(file) {
            fileList += file.toString() + "\n";
          });
          this.printCommandOutput(fileList.slice(0,fileList.length-1));
        }.bind(this));
    },
    
    echo: function(input) {
        for(var i = 0; i < input.length; i++) {
            if(input[i].indexOf('$') == 0)
            {
                if(process.env[input[i].slice(1)] !== undefined) {
                    input[i] = process.env[input[i].slice(1)];
                }
                else {
                    input[i] = "";
                }
            }
        }
        this.printCommandOutput(input.join(' '));
    },
    
    cat : function(input){
        fs.readFile(input[0], function (err, data) {
       		if (err) {
           		return console.error(err);
            }
            this.printCommandOutput(data.toString());
        }.bind(this));
    }
};



module.exports = commandBlock;