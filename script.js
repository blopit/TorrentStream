var magnet = 'magnet:?xt=urn:btih:AZGJ5ME5L4SYBK2F6G3ZY7Z2MOQ3GBWA';
var cmd = 'peerflix "'+ magnet + '" --path "."';
var cmdL = 'peerflix -l "'+ magnet + '"';
/*var io = require('socket.io').listen(80);
var ss = require('socket.io-stream');
var path = require('path');*/

/*io.of('/user').on('connection', function(socket) {
    ss(socket).on('profile-image', function(stream, data) {
        var filename = path.basename(data.name);
        stream.pipe(fs.createWriteStream(filename));
    });
});*/

function run_cmd(cmd, args, callBack ) {
    var spawn = require('child_process').spawn;
    var child = spawn(cmd, args);
    var resp = "";

    child.stdout.on('data', function (buffer) { resp += buffer.toString() });
    child.stdout.on('end', function() { callBack (resp) });
}

// Run C:\Windows\System32\netstat.exe -an
/*var foo = new run_cmd(
    'peerflix', ['"' + url + '"'],
    function (me, buffer) { me.stdout += buffer.toString() },
    function () { console.log(foo.stdout) }
);*/

//run_cmd( 'peerflix', ['"' + url + '"'], function(text) { console.log (text) });

filename = 'Aladdin.1992.720p.BRrip.x264.GAZ.YIFY.mp4';

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout);}
function getURL(error, stdout, stderr) {
    var re = /:\s([\w\.\-]+?(?:.mp4|.avi))\s:/;
    var found = stdout.match(re);
    console.log(stdout)
}
exec(cmd, puts);
console.log(filename);
var url = 'http://10.20.44.127:8888/' + filename;

console.log(url);

//exec(cmdL, getURL);

/*var fs = require("fs"),
    http = require("http"),
    url = require("url"),
    path = require("path");

http.createServer(function (req, res) {
  if (req.url != "/movie.mp4") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<video src="http://10.20.44.127:8888/star_wreck_in_the_pirkinning_subtitled_xvid.avi" controls></video>');
  } else {
    var file = path.resolve(__dirname,"movie.mp4");
    fs.stat(file, function(err, stats) {
      if (err) {
        if (err.code === 'ENOENT') {
          // 404 Error if file not found
          return res.sendStatus(404);
        }
      res.end(err);
      }
      var range = req.headers.range;
      if (!range) {
       // 416 Wrong range
       return res.sendStatus(416);
      }
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var total = stats.size;
      var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function() {
          stream.pipe(res);
        }).on("error", function(err) {
          res.end(err);
        });
    });
  }
}).listen(8888);*/