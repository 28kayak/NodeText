/**
 * Created by kaya on 9/23/16.
 */
var port = 1337;
var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request', doRequest);
server.listen(port);

function doRequest(req, res)
{
    fs.readFile('./list2-7.html', 'UTF-8', doRead);
    //<filesystem>.readFile('path to file', encode, callback function);
    var title = "This is a sample page";
    var message = "this sentence is given in program";

    function doRead(err, data)
    {
        var str = data.replace(/@@@title@@@/g,title).replace(/@@@message@@@/,message);
        res.setHeader('Content-Type', 'text/html');
        res.write(str);
        res.end();
    }//doRead
}//doRequest