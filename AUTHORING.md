# Content authoring

## Workflow

1. Ensure you have installed all dependencies by running `npm install`.
2. `npm install --save` any dependencies your presentation may depend.
3. Run `npm run new` to start the wizard for new presentations.
4. You can always change the information you provided by editing `info.json` or renaming the presentation folder.
5. Author your presentation in your newly created presentation folder.
6. After any changes, run `npm run index` to update `index.html` of the root of this repository to include all


## Structure and Syntax

### Folder structure

The presentation folder name *must* always be of the format `YYYYMMDD Presentation name (Event name)`. The presentation
entry file itself must always be named `index.html`.

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
        ...
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
