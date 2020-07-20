# srce-desktop-app

![Build Status](https://nsoss.semaphoreci.com/badges/srce-desktop-app.svg?style=shields)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Setup

Make sure you have [Node.js] installed (with npm). Then, run `npm install`. You
will need to do this after cloning the repository, and every time `package.json`
changes.

Optionally, you can use [nvm] to manage your local Node versions. This will
ensure consistency between local and release environments. However, the latest
LTS version _should_ always work (in theory).

Editor support is provided for [Visual Studio Code], with features such as
import sorting configured out of the box. Configure the [Prettier extension] for
automatic code formatting.

## Scripts

* `npm start` Run the React application used by the local renderer process.
* `npm start-electron` Build and run the Electron application. Make sure that
  the React application is running in the background. If you see a blank screen,
  you probably forgot to run `npm start`.
* `npm run typeorm migration:run` Execute all pending database migrations.
* `npm run typeorm migration:revert` Revert the last executed migration. Use
  this command to test your `down()` method.
* `npm run typeorm schema:drop` ☢️ the database schema. Can come in handy if
  something goes wrong while developing migrations.
* `npm run format` Format the codebase using Prettier. Use this script if CI
  complains.

## Migrations

Migration files live under `electron/migrations`, and follow the
`TIMESTAMP-MigrationName.ts` naming convention. You can use the [Node.js REPL]
to generate timestamps:

```
Welcome to Node.js v12.18.2.
Type ".help" for more information.
> Date.now();
1595165573664
```

## Design

[Figma]

[Node.js]:https://nodejs.org/en/
[nvm]:https://github.com/nvm-sh/nvm
[Visual Studio Code]:https://code.visualstudio.com/
[Prettier extension]:https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[Node.js REPL]:https://nodejs.dev/learn/how-to-use-the-nodejs-repl
[Figma]:https://www.figma.com/file/3GkovVdGabhJmCOXC4X5Pi/srce-desktop-app?node-id=1%3A14
