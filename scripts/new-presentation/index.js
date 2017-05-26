#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// ensure root path is the repository root

process.chdir(path.resolve(__dirname, '../..'));


function isDate(str) {
	return /^[0-9]{8}$/.test(str);
}

function isOptionalUrl(str) {
	if (!str) {
		return true;
	}

	return true;
}

function isRequired(str) {
	return str.length > 0;
}


function getDateString() {
	const now = new Date();

	const yyyy = String(now.getFullYear());
	const m = String(now.getMonth() + 1);
	const d = String(now.getDate());
	const mm = m.length === 1 ? `0${m}` : m;
	const dd = d.length === 1 ? `0${d}` : d;

	return `${yyyy}${mm}${dd}`;
}


function askPresentationQuestions() {
	return inquirer.prompt([
		{
			type: 'input',
			name: 'speakerName',
			message: 'Speaker name:',
			validate: isRequired
		},
		{
			type: 'input',
			name: 'name',
			message: 'Presentation name:',
			validate: isRequired
		},
		{
			type: 'input',
			name: 'url',
			message: 'URL to slides (optional):',
			validate: isOptionalUrl
		},
		{
			type: 'input',
			name: 'event.name',
			message: 'Event name:',
			validate: isRequired
		},
		{
			type: 'input',
			name: 'event.url',
			message: 'URL to event website (optional):',
			validate: isOptionalUrl
		},
		{
			type: 'input',
			name: 'event.date',
			message: 'Event date (YYYYMMDD):',
			validate: isDate,
			default: getDateString
		}
	]);
}


function askPresentationType() {
	return inquirer.prompt([
		{
			type: 'list',
			name: 'type',
			message: 'Presentation format:',
			choices: [
				'empty',
				'reveal.js'
			]
		}
	]);
}


function generatePresentationFolder(presentation) {
	const folderName = `${presentation.event.date} ${presentation.name} (${presentation.event.name})`;
	const presentationPath = path.resolve('./presentations', folderName);
	const assetsPath = path.resolve(presentationPath, 'assets');
	const metaPath = path.resolve(presentationPath, 'info.json');

	console.log(`mkdir ${presentationPath}`);

	fs.mkdirSync(presentationPath);

	console.log(`mkdir ${assetsPath}`);

	fs.mkdirSync(assetsPath);

	const info = {
		url: presentation.url || undefined,
		speaker: {
			name: presentation.speakerName || undefined
		},
		event: {
			url: presentation.event.url || undefined
		}
	};

	console.log(`writing meta data to ${metaPath}`);

	const json = JSON.stringify(info, null, 2);

	fs.writeFileSync(metaPath, json);

	return {
		presentationPath
	};
}



async function run() {
	const presentation = await askPresentationQuestions();

	const pathInfo = generatePresentationFolder(presentation);

	if (presentation.url) {
		// no need to generate RevealJS etc
		return;
	}

	const { type } = await askPresentationType();

	await require(`./types/${type}`)(pathInfo);
}

run().catch((error) => {
	console.log(error);
});
