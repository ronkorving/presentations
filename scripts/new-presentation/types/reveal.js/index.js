'use strict';

const path = require('path');
const fs = require('fs-extra');

module.exports = function (pathInfo) {
	const source = [
		'css',
		'lib',
		'js/reveal.js',
		'plugin',
		'index.html'
	];

	const dest = pathInfo.presentationPath;

	console.log(`Copying reveal.js files to ${dest}`);

	for (const file of source) {
		console.log(`Copying: ${file}`);

		fs.copySync(path.join('node_modules/reveal.js', file), path.join(dest, file));
	}
};
