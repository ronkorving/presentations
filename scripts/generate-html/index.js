#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

const presentationMetaFileName = 'info.json';
const outputPath = './index.html';
const rePresentationFolder = /^([0-9]{8}) (.+?) \((.+?)\)$/;  // format: yyyymmdd presentation name (event name)


// ensure root path is the repository root

process.chdir(path.resolve(__dirname, '../..'));


function parseDate(str) {
	return [
		parseInt(str.substr(0, 4), 10),
		parseInt(str.substr(4, 2), 10),
		parseInt(str.substr(6, 2), 10)
	];
}


function parsePresentationFolder(presentationPath) {
	const fileName = path.basename(presentationPath);
	const m = fileName.match(rePresentationFolder);

	if (!m) {
		throw new Error(`Could not parse presentation path: ${presentationPath}`);
	}

	const result = {
		url: presentationPath + '/index.html',
		name: m[2],
		speaker: undefined,
		event: {
			intDate: parseInt(m[1], 10),
			date: parseDate(m[1]),
			name: m[3],
			url: undefined
		}
	};

	try {
		const meta = JSON.parse(fs.readFileSync(path.join(presentationPath, presentationMetaFileName)));

		if (meta.url) {
			result.url = meta.url;
		}

		if (meta.event && meta.event.url) {
			result.event.url = meta.event.url;
		}

		if (meta.speaker) {
			result.speaker = meta.speaker;
		}
	} catch (error) {
		if (error.code !== 'ENOENT') {
			throw error;
		}
	}

	return result;
}


function sortPresentations(a, b) {
	return b.event.intDate - a.event.intDate;
}


function getPresentations() {
	const presentationsPath = './presentations';
	const result = [];

	const files = fs.readdirSync(presentationsPath);
	for (const file of files) {
		const filePath = path.join(presentationsPath, file);

		const stat = fs.statSync(filePath);
		if (!stat.isDirectory()) {
			continue;
		}

		try {
			result.push(parsePresentationFolder(filePath));
		} catch (error) {
			console.warn(error.message);
		}
	}

	result.sort(sortPresentations);

	return result;
}


function renderHtml(presentations) {
	const templateBody = fs.readFileSync(path.join(__dirname, 'template.html.hbs'), { encoding: 'utf8' });
	const template = handlebars.compile(templateBody);
	const data = { presentations };

	return template(data);
}


// render presentations

const html = renderHtml(getPresentations());

fs.writeFileSync(outputPath, html);
