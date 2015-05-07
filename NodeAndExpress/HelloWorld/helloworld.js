		fs = require('fs');

function serverStaticFile(res, path, contentType, responseCode) {
	if (!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err, data) {
		if (err) {
			res.writeHead(500, {'Content-type': 'text/plain'});
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode, {'Content-Type': contentType});
			res.end(data);
		}
	});
}

http.createServer(function (req, res) {
	var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	switch(path) {
		case '/':
						console.log('root');
						serverStaticFile(res, '/public/home.html', 'text/html');
						break;
		case '/about':
						console.log('/about');
						serverStaticFile(res, '/public/about.html', 'text/html');
						break;
		case '/img/logo.jpg':
						console.log('/img/logo.jpg');
						serverStaticFile(res, '/public/img/logo.jpeg', 'image/jpeg');
						break;
		case '/favicon.ico':						
						break;
		default:
						console.log('404');
						serverStaticFile(res, '/public/404.html', 'text/html', 404);
						break;
	}
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate...');