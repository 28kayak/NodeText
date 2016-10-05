/**
 * Created by kaya on 9/24/16.
 */
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');


var port = 1337;
var server = http.createServer();
server.on('request', doRequest);
server.listen(port);

function doRequest(req, res)
{
    //res.setHeader('Content-Type', 'text/html');
    var path = url.parse(req.url);
    console.log(path);
    console.log("path name => " + path.pathname);
    switch(path.pathname)
    {
        case '/':

            fs.readFile('2_11.html', 'UTF-8', function (err, data)
            {
                //Call back function for readFile
                console.log("get in the callback function for readFile!!");
                var result = data.replace(/@@@@@/, "Write something");
                console.log("\nbefore send a header!");
                //res.writeHeader()
                res.setHeader('Content-Type', 'text/html');
                res.write(result);
                console.log("before end");
                res.end();

            });//readFile
            break;
        case '/form':
            console.log(req);
            console.log("req.method ==> " + req.method);
            if(req.method == "POST")
            {
                var reqBody = '';
                req.on('data', function(data){
                    reqBody += data;
                });//on
                req.on('end', function (){
                    console.log("\n print reqBody \n");
                    console.log(reqBody);
                    var form = qs.parse(reqBody);
                    console.log("\n details of var form \n");
                    console.log(form);
                    var input1 = form.input1;
                    fs.readFile('2_11.html', 'UTF-8', function (err, data){
                        var result = data.replace(/@@@@@/, "You wrote " + input1 + "!");
                        res.setHeader('Content-Type', 'text/html');
                        res.write(result);
                        res.end();
                    });
                })

            }else
            {
                res.setHeader('Content-Type', 'text/plain');
                res.end('Error! == can not get ==');

            }
            break;
        default:
            res.setHeader('Content-Type', 'text/plain');
            res.end('Error == No page ==');
            break;
    }

}//function do request
console.log('Server is running @ http://127.0.0.1:1337');