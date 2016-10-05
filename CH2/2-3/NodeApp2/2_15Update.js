/**
 * Created by kaya on 10/4/16.
 */
/**
 * Created by kaya on 10/4/16.
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');

var index = fs.readFileSync('./index.ejs', 'utf8');
var style = fs.readFileSync('./style.css','utf8');

var port = 1337;
var server = http.createServer();
server.on('request', doRequest);
server.listen(port);

function doRequest(req, res) {
    var path = url.parse(req.url);
    console.log(path);
    //define JSON that is needed for render index.ejs
    var json = {
        title: "Index Page",
        msg:"this is a sample page"
    };
    switch(path.pathname)
    {
        case '/':
            var tmp = ejs.render(index,json);
            /*{
             title: "index page",
             msg: "this is a sample page"
             }
             );*///end of var tmp*/
            res.setHeader('Content-Type', 'text/html');
            res.write(tmp);
            res.end();
            break;
        case '/style.css':
            res.setHeader('Content-Type', 'text/css');
            res.write(style);
            res.end();
            break;
        default:
            res.setHeader('Content-Type', 'text/plain');
            res.write('Error');
            res.end();
            break;

    }//switch
}//function
console.log("server is running @ http://127.0.0.1:"+port);
