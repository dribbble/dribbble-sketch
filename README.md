# Dribbble Plugin for Sketch

### What you'll need

- Sketch
- Node >=6.9.5 and NPM
- skpm

### Developing this plugin

This plugin is built using [spkm](https://github.com/skpm/skpm). Go ahead and get familiar with it. For development just know it's:

- Essentially just A Webpack development setup
- A React app that talks to the Sketch environment
- Entirely ES6 friendly

To get started, set up an `.env` file with the following keys (fill in the values yourself):

```
STAGING_AUTH=
API_CLIENT_KEY=
DOMAIN_NAME=
```

Afterward you can get set up by running the following command.

```bash
// Install the dependencies
npm install

// Once the installation is done, you can run some commands inside the project folder:
npm run build

// To watch for changes:
npm run watch

// Additionally, if you wish to run the plugin every time it is built:
npm run start
```

If Sketch is crashing when you run the plugin, you may need to manually link the plugin:

* Go to your Sketch plugins path: `/Users/USER/Library/Application Support/com.bohemiancoding.sketch3/Plugins`
* Delete any instance of the plugin
* Install the SKPM build tools globally: `npm install -g @skpm/builder`
* Build (`skpm-build`) and Link (`skpm-link`) the plugin
* Now you should be able to run the plugin with `npm run watch` running

### Creating releases

This will change in the future but for now just do the following:

- Version bump in `package.json`
- Delete your build folder and run `NODE_ENV=production npm run build` to get a production version of the code
- Zip it and [create a Release](https://github.com/jodyheavener/dribbble-sketch/releases/new)
