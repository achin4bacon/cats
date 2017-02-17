var http = require("http");

var fs = require("fs");

var pageCount = parseInt(fs.readFileSync('./count.txt'));


function updateCount(fileName, pageCount) {
    fs.writeFile(fileName, pageCount, function (err) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

var server = http.createServer(function(req, res){
    if(req.url === "/"){
        fs.readFile("./cats.html", function(err, data){
            res.write(data); 
            pageCount = pageCount + 1; 
            updateCount('./count.txt', pageCount); 
            res.end();
        });

    } else if (req.url === '/count'){
        fs.readFile("./count.txt", function(err, data){
            // data = data.toString();
            // console.log(data);
            res.write(data); 
            res.end(); 
        });
    }
});
server.listen(8080);

console.log("Hello Server!")