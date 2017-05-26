'use strict';

const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

module.exports = function (pathInfo) {
	const templateBody = fs.readFileSync(path.join(__dirname, 'index.html.hbs'), { encoding: 'utf8' });
	const template = handlebars.compile(templateBody);
	const html = template({});

	const indexPath = path.resolve(pathInfo.presentationPath, 'index.html');

	console.log(`creating ${indexPath}`);

	fs.writeFileSync(indexPath, html);
};
