const { getCatGif } = require("../src/cat");
const { expect, test } = require("@jest/globals");

test("It returns a 200 response when given a valid API key", async () => {
	const { response } = await getCatGif(
		"fc0cb6d6-af8d-4641-818a-80076be07b05"
	);

	expect(response.status).toBe(200);
});
