# Content authoring

## Workflow

### Locally hosted presentations

1. Add any dependencies your presentation may depend on to `package.json`.
2. Please codify your presentation folder name as follows `YYYYMMDD Name of presentation (Name of event)`. The date
   refers to the day when the presentation was given.
3. Author your presentation in `./index.html` in your presentation folder.
4. Put all assets (images, etc) from your presentation in a subfolder `./assets`.
5. You may add more information to your presentation by adding a `info.json` file to your folder.
6. After any changes, run `npm run build` to update `index.html` of the root of this repository to include all
   information about your presentation. Make sure no errors happened.

### Externally hosted presentations

1. Please codify your presentation folder name as follows `YYYYMMDD Name of presentation (Name of event)`. The date
   refers to the day when the presentation was given.
2. Add more information (at least the external URL) to your presentation by adding a `info.json` file to your folder.
3. After any changes, run `npm run build` to update `index.html` of the root of this repository to include all
   information about your presentation. Make sure no errors happened.


## Structure and Syntax

### Folder structure

```
/node_modules
	/reveal.js
		...
/presentations
	/20170501 How to make a great presentation (Global Presentation Summit)
		/index.html
		/info.json
		/assets
			/using-comic-sans.jpg
			/the-bulletpoint-song.mp3
```

### info.json structure

All fields are optional.

```json
{
	"url": "URL to the presentation IF externally hosted",
	"speaker": {
		"name": "Name of the speaker"
	},
	"event": {
		"url": "URL to the event page"
	}
}
```


## Using presentation tools

### Reveal.js

When you add your presentation, you copy and use `node_modules/reveal.js/index.html` as a basis. Keep in mind however
that all URLs in that file will not point to the right location. You must prefix all CSS and JavaScript links with
`../../node_modules/reveal.js/`.

For example:

```html
<link rel="stylesheet" href="css/reveal.css">
```

Becomes:

```html
<link rel="stylesheet" href="../../node_modules/reveal.js/css/reveal.css">
```
