# Dribbble Plugin for Sketch

### What you'll need

- Sketch
- Node >=6.9.5 and NPM
- skpm

### Developing

Install the dependencies

```bash
npm install
```

Once the installation is done, you can run some commands inside the project folder:

```bash
npm run build
```

To watch for changes:

```bash
npm run watch
```

Additionally, if you wish to run the plugin every time it is built:

```bash
npm run start
```

### A note about the modal

This plugin leverages `sketch-module-web-view` to create its modal dialog. Currently when you run the plugin the modal will appear. However, if you close it and re-run the plugin Sketch will crash. Therefor, for now, you need to restart Sketch every time you run the plugin. I am working on fixing this.
