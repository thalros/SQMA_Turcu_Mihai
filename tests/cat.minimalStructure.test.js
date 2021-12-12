const { getCatGif } = require("../src/cat");
const { expect, test } = require("@jest/globals");

test("It returns the metadata of an image in JSON format. The metadata contains AT LEAST the properties 'width', 'height' and 'url'.", async () => {
	const { data } = await getCatGif("fc0cb6d6-af8d-4641-818a-80076be07b05");
	expect(Object.keys(data[0])).toEqual(
		expect.arrayContaining(["width", "height", "url"])
	);
});

console.log("testing Jenkins polling");
