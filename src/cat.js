const fetch = require("node-fetch");

async function getCatGif(apiKey) {
	const response = await fetch("https://api.thecatapi.com/v1/images/search", {
		headers: {
			"x-api-key": apiKey,
		},
	});
	const data = await response.json();
	return { response, data };
}

module.exports = {
	getCatGif,
};
