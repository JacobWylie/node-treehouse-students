const fs = require('fs');

const mergeValues = (values, content) => {
	// Cycle over the keys
	for(let key in values) {
		// Replace all {{key}} with the value from the values object
		content = content.replace("{{" + key + "}}", values[key]);
	}

	// Return merged content 
	return content
}

const view = (templateName, values, response) => {
	// Read from the template files
	let fileContents = fs.readFileSync(`./views/${templateName}.html`, {encoding: 'utf8'});
		// Insert values into the content
		fileContents = mergeValues(values, fileContents);
		// Write out the contents to the response  	
  	response.write(fileContents);
	};

module.exports.view = view;