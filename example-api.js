var http = require("http");
var urlParser = require('url');

const serverPort = 8080;//test

function handleRequest(request, response){
    try{
        var domain = request.headers.host;
        var method = request.method;
        var url = request.url;
        var calledActionURI = method + " " + domain + url;

        console.log("Receiving request... " + calledActionURI);
        
        var urlObject = urlParser.parse(url, true);
        
        if(url.startsWith("/slow-down")){
            //it slowdown 5 seconds, or time query param if it's specified
            var time_ms = 5000;
            var time_ms_param = urlObject.query['time_ms'];

            if(time_ms_param){
                time_ms = parseInt(time_ms_param);
            }
            sleep(time_ms);
        }

        randomItem(response);
    }catch(e){
        console.log(e);
        response.writeHead(500, {"Content-Type": "application/json"});
            message = JSON.stringify({ 
                error: e
            });
        response.end(message);
    }
}

function sleep(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

function initialize(){        
    var server = http.createServer(handleRequest);
    server.listen(serverPort, function(){
        console.log("\n\nServer listening on: http://localhost:%s", serverPort);
    });
}

process.on('SIGINT', function() {
    process.exit();
});

initialize();


function randomItem(response) {
  response.writeHead(200, {"Content-Type": "application/json"});
    var otherArray = ["item " + getRandomInt(1000, 4000), "item " + getRandomInt(1000, 4000)];
    var json = JSON.stringify({ 
        items: otherArray, 
        description: "This is a randomly generated items list"
    });
  response.end(json);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}