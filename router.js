const Profile = require('./profile.js');
const renderer = require('./renderer.js');
const querystring = require('querystring');

// Handle HTTP route GET / and POST / i.e. Home
const home = (request, response) => {
	// if url == "/" && GET
	if(request.url === "/") {
		if(request.method.toLowerCase() === 'get') {
		// show Search
		response.statusCode = 200;
	  response.setHeader('content-type', 'text/html');
	  renderer.view('header', {}, response);
	  renderer.view('search', {}, response); 	
	  renderer.view('footer', {}, response);
	  response.end();
		} else {
			//  if url == "/" && POST

			// Get the post data from body
			request.on('data', postBody => {
				// Extract the username
				let query = querystring.parse(postBody.toString());
				response.write(query.username);
				response.end();
				// redirect to /:username					
			});		
		}
	}

}

// Handle HTTP route GET /:username i.e. /username
const user = (request, response) => {
	// If url == '/...'
	let username = request.url.replace('/', '');
	if(username.length > 0) {
		response.statusCode = 200;
  	response.setHeader('content-type', 'text/html');
  	renderer.view('header', {}, response);
  	// Get json from Treehouse
  	let studentProfile = new Profile(username);
			// on end:
			// When the JSON body is fully recieved the 
			// the "end" event is triggered and the full body
			// is given to the handler or callback
			studentProfile.on('end', profileJSON => {
				// show profile

				// Store the values which we need
				let values = {
					avatarURL: profileJSON.gravatar_url,
					username: profileJSON.profile_name,
					badges: profileJSON.badges.length,
					javascriptPoints: profileJSON.points.JavaScript
				}
				// Simple response
  			renderer.view('profile', values, response);
  			renderer.view('footer', {}, response);
  			response.end();
			});
			// on error:
			// If a parsing, network or HTTP error occurs an
			// error object is passed in to the handler or callback
			studentProfile.on("error", error => {
				// Show error 	
				renderer.view('error', {errorMessage: error.message}, response);
  			renderer.view('search', {}, response);				
  			renderer.view('footer', {}, response);
  			response.end();
			});
	}
}

module.exports.home = home;
module.exports.user = user;
























