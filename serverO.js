var fs = require('fs'),
    http = require('http'),
    url = require('url'),
    path = require('path');

var indexPage, movie_webm, movie_mp4, movie_ogg;

// load the video files and the index html page
/*fs.readFile(path.resolve(__dirname,"movie.webm"), function (err, data) {
    if (err) {
        throw err;
    }
    movie_webm = data;
});
fs.readFile(path.resolve(__dirname,"movie.mp4"), function (err, data) {
    if (err) {
        throw err;
    }
    movie_mp4 = data;
});
fs.readFile(path.resolve(__dirname,"movie.ogg"), function (err, data) {
    if (err) {
        throw err;
    }
    movie_ogg = data;
});

fs.readFile(path.resolve(__dirname,"index.html"), function (err, data) {
    if (err) {
        throw err;
    }
    indexPage = data;
});*/

http.createServer(function (req, res) {
  if (req.url != "/movie.mp4") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end('<video src="http://10.20.44.127:8888/Aladdin.1992.720p.BRrip.x264.GAZ.YIFY.mp4" controls></video>');
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
}).listen(8888);

// create http server
/*http.createServer(function (req, res) {

    var reqResource = url.parse(req.url).pathname;
    //console.log("Resource: " + reqResource);

    if(reqResource == "/"){

        //console.log(req.headers)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexPage);
        res.end();

    } else if (reqResource == "/favicon.ico"){

        res.writeHead(404);
        res.end();

    } else {

            var total;
            if(reqResource == "/movie.mp4"){
                total = movie_mp4.length;
            } else if(reqResource == "/movie.ogg"){
                total = movie_ogg.length;
            } else if(reqResource == "/movie.webm"){
                total = movie_webm.length;
            }

            var range = req.headers.range;

            var positions = range.replace(/bytes=/, "").split("-");
            var start = parseInt(positions[0], 10);
            // if last byte position is not present then it is the last byte of the video file.
            var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
            var chunksize = (end-start)+1;

            if(reqResource == "/movie.mp4"){
                res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                     "Accept-Ranges": "bytes",
                                     "Content-Length": chunksize,
                                     "Content-Type":"video/mp4"});
                res.end(movie_mp4.slice(start, end+1), "binary");

            } else if(reqResource == "/movie.ogg"){
                res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                     "Accept-Ranges": "bytes",
                                     "Content-Length": chunksize,
                                     "Content-Type":"video/ogg"});
                res.end(movie_ogg.slice(start, end+1), "binary");

            } else if(reqResource == "/movie.webm"){
                res.writeHead(206, { "Content-Range": "bytes " + start + "-" + end + "/" + total,
                                     "Accept-Ranges": "bytes",
                                     "Content-Length": chunksize,
                                     "Content-Type":"video/webm"});
                res.end(movie_webm.slice(start, end+1), "binary");
            }
    }
}).listen(8888); */

