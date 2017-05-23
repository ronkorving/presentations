# Content authoring

All presentation libraries we use should be added to package.json as a dependency. In the `/presentations` folder,
you can add your presentation. Please codify as follows `YYYYMMDD Name of presentation (Name of event)`.
The date refers to when the presentation was given.

Name the entrypoint to your presentation `index.html`.

Please put all assets (images, etc) from your presentation in a subfolder called `assets`.

You are encouraged to add a README.md file to your presentation's folder, which could reference a conference or meet-up
website where you gave your presentation.

Example structure:

```
/node_modules
	/reveal.js
		...
/presentations
	/20170501 How to make a great presentation (Global Presentation Summit)
		/README.md
		/index.html
		/assets
			/using-comic-sans.jpg
			/the-bulletpoint-song.mp3
```

## Reveal.js presentations

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
