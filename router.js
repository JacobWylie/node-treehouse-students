const Profile = require("./profile.js");

// Handle HTTP route GET / and POST / i.e. Home
const home = (request, response) => {
	// if url == "/" && GET
	if(request.url === "/") {
		// show Search
	response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.write('Header\n');
  response.write('Search\n');  	
  response.end('Footer\n');
	}
	//  if url == "/" && POST
		// redirect to /:username
}

// Handle HTTP route GET /:username i.e. /username
const user = (request, response) => {
	// If url == '/...'
	let username = request.url.replace('/', '');
	if(username.length > 0) {
		response.statusCode = 200;
  	response.setHeader('Content-Type', 'text/plain');
  	response.write('Header\n');

  	// Get json from Treehouse
  	let studentProfile = new Profile(username);
			// on end:
			// When the JSON body is fully recieved the 
			// the "end" event is triggered and the full body
			// is given to the handler or callback
			studentProfile.on("end", profileJSON => {
				// show profile

				// Store the values which we need
				let values = {
					avatarUrl: profileJSON.gravatar_url,
					username: profileJSON.profile_name,
					badges: profileJSON.badges.length,
					javaScriptPoints: profileJSON.points.JavaScript
				}
				// Simple response
  			response.write(`${values.username} has ${values.badges} badges\n`);  	
  			response.end('Footer\n');
			});
			// on error:
			// If a parsing, network or HTTP error occurs an
			// error object is passed in to the handler or callback
			studentProfile.on("error", error => {
				// Show error 	
				response.write(error.message + '\n');
  			response.end('Footer\n');
			});
	}
}

module.exports.home = home;
module.exports.user = user;
























