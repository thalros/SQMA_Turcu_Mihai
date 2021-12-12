const { getCatGif } = require("../src/cat");
const { expect, test, afterAll } = require("@jest/globals");
const fetch = require("node-fetch");
const fs = require("fs");
const mime = require("mime-types");
const sizeOf = require("image-size");

let filename = "";

const isSubset = (superObj, subObj) =>
	superObj === subObj ||
	(typeof superObj === "object" &&
		typeof subObj === "object" &&
		(subObj.valueOf() === superObj.valueOf() ||
			Object.keys(subObj).every((k) =>
				isSubset(superObj[k], subObj[k])
			)));

test("The provided image URL is valid, and by GETting it we receive an image that matches the previously obtained specs.", async () => {
	const { data } = await getCatGif("fc0cb6d6-af8d-4641-818a-80076be07b05");
	const imageRequest = await fetch(data[0].url);

	const image = await imageRequest.blob();
	const imageArrayBuffer = await image.arrayBuffer();
	const buffer = Buffer.from(imageArrayBuffer, "binary");
	filename = `test.${mime.extension(image.type)}`;
	fs.writeFileSync(filename, buffer);

	const expectedSizes = {
		width: data[0].width,
		height: data[0].height,
	};

	const actualSizes = await sizeOf(filename);

	expect(actualSizes).toMatchObject(expectedSizes);
});

afterAll(() => {
	if (filename) {
		fs.unlinkSync(filename);
	}
});
