const fs = require('fs');
const path = require('path');

const read = (fileName) => {
	let data = fs.readFileSync(
		path.resolve(process.cwd(), "src", 'database', fileName + '.json'),
		'utf-8',
	);
	return JSON.parse(data) || [];
};

const write = (fileName,data) => {
	fs.writeFileSync(
		path.resolve(process.cwd(), "src", 'database', fileName + '.json'),
		JSON.stringify(data, null, 4),
	);
	return true;
};

module.exports = {
 read,
 write
}
