// Github:   
// By:        
// Contact:
  


on("chat:message", function(msg) {
    if (msg.type != "api") return;
    
    var message = msg.content;
    var command = message.split(" ")[0];
    var numrolls = parseInt(message.split(" ")[1]);
    var outroll = "ob" + message.split(" ")[1] + ": ";
    
    if(message.search(/\+/g)!=-1){
       var plus = parseInt(message.split("+")[1]);
       var times = 0
    }
    else if(message.search(/\*/g)!=-1){
       var times = parseInt(message.split("*")[1]);
       var plus = 0
    }
    else{
        var plus = 0
        var times = 0
    }
    
    if (command == "!ob") {
        var count = 0;
        var total = 0;
        var roll = 0;
        var first = true;
        var output = "" + outroll + "" ;
        while (count < numrolls) {
            roll = randomInteger(6);
            if (roll === 6) {
                if(first == true){
                    output = output + "[6]"
                    first = false;
                    numrolls = numrolls + 2;
                }
                else{
                    output = output + ",[6]"
                    numrolls = numrolls + 2;
                }
            } else {
                total += roll;
                if(first == true){
                    output = output + roll;
                    first = false;
                }
                else{
                    output = output + "," + roll;
                }
            }
            count++;
        }
        if(plus > 0 && times == 0){
            sendChat(msg.who, output + " = " + total + "+" + plus + " Total: " + (total+plus) + "");
        }
        else if(plus == 0 && times > 0){
            sendChat(msg.who, output + " = " + total + "*" + times + " Total: " + (total*times) + "");
        }
        else{
            sendChat(msg.who, output + " Total: " + (total) + "");
        }
    }
});
