var fs = require('fs');

 var newPrompt = function()  {
    process.stdout.write('prompt > ');
    };

var commandBlock = {
    
   
    
    pwd : function(){
        process.stdout.write(process.cwd()+'\n');
        newPrompt();
    },//end pwd
    
    date : function(){
        var dt= new Date().toString();
        process.stdout.write(dt+'\n');
        newPrompt();
    },
    
    ls : function(path){
        path=path[0] || '.';
        fs.readdir(path, function(err, files) {
          if (err) throw err;
          files.forEach(function(file) {
            process.stdout.write(file.toString() + "\n");
          })
        newPrompt();
        });
       // throw Error("test")
    },//end of ls
    
    echo: function(input){
        
        input=input || '';
        
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
        
        process.stdout.write(input.join(' ')+'\n');
        newPrompt();
        
    },// end echo
    
    cat : function(input){
        
        fs.readFile(input[0], function (err, data) {
       if (err) {
           return console.error(err);
            }
            process.stdout.write(data.toString()+'\n');
            newPrompt();
        });
         
    },//end function cat
};



module.exports = commandBlock;
