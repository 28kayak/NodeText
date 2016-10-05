/**
 * Created by kaya on 9/23/16.
 */
var port = 1337;
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer();
server.on('request', doRequest);
server.listen(port);

function doRequest(req,res)
{
    var path = url.parse(req.url);
    console.log(path);
    console.log("pathname - " + path.pathname);
    
    switch(path.pathname)
    {
        case '/':
            console.log('\n case of / \n ');
            fs.readFile('./list2_9.html', 'UTF-8', doRead);
            function doRead(err, data)
            {
                res.setHeader('Content-Type', 'text/html');
                res.write(data);
                res.end();
            }//doRead
            break;
        case '/helo':
            res.setHeader('Content-Type', 'text/plain');
            res.end("hello!!!!!");
            break;
        default :
            res.setHeader('Content-Type', 'text/html');
            res.end('ERROR! == no page ==');
            break;

    }//switch
}//dorequest
console.log("Server is running @ http://127.0.0.1:1337/");

