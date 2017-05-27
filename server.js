var sys = require("sys");
const WebSocket = require('ws');
var userCount = [];

var server = new WebSocket.Server({ port: 8000 });


var magnet = 'magnet:?xt=urn:btih:AZGJ5ME5L4SYBK2F6G3ZY7Z2MOQ3GBWA';
magnet = 'magnet:?xt=urn:btih:J4EPH6LNJAWO3CUTSV6ICRFF2P7RXLCX';
var cmd = 'peerflix "'+ magnet + '" --path .';
var cmdL = 'peerflix -l "'+ magnet + '"';

function run_cmd(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
}
filename = 'Sample.webm';//
filename = 'Aladdin.1992.720p.BRrip.x264.GAZ.YIFY.mp4';//

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout);}
function getURL(error, stdout, stderr) {
    var re = /:\s([\w\.\-]+?(?:.mp4|.avi))\s:/;
    var found = stdout.match(re);
    console.log(stdout)
}
exec(cmd, puts);
var url = 'http://599b58ea.ngrok.io/' + encodeURIComponent('Untitled2.webm');//encodeURIComponent('Aladdin\ \(1992\)') + '/' + filename;


server.broadcast = function broadcast(data) {
    server.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

server.on("connection", function(conn){
    server.broadcast("userCount " + ++userCount);
    server.broadcast("url " + url);
    conn.on("message", function(message){
        server.broadcast(message);
    });

});

server.on("close", function(conn){
  server.broadcast("userCount " + --userCount);
});

function log(msg) {
  sys.puts(+new Date + ' - ' + msg.toString());
};


console.log("url " + url);
