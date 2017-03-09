const router = require('./router.js')
// Problem; We need a simple way to look at user's badge count and Javascript 
	// points from a web browser

// Solution: Use Node.js to perform the profile look ups and server our 
	// template via HTTP

// Create a web server
const http = require('http');

http.createServer(function (request, response) {
	router.home(request, response);
	router.user(request, response);   
}).listen(process.env.PORT || 5000);
console.log('Server running at Port: ' + (process.env.PORT !== undefined ? process.env.PORT : 5000));



























