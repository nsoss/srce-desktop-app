# srce-desktop-app

![Build Status](https://nsoss.semaphoreci.com/badges/srce-desktop-app.svg?style=shields)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Setup

Make sure you have [Node.js] installed (with npm). Then, run `npm install`. You
will need to do this after cloning the repository, and every time `package.json`
changes.

Optionally, you can use [nvm] to manage your local Node versions. This will
ensure consistency between local and release environments. The latest LTS
version _should_ always work.

Editor support is provided for [Visual Studio Code], with features such as
import sorting configured out of the box. Configure the [Prettier extension] for
automatic code formatting.

## Scripts

* `npm run start:renderer` Serve the React application used by the renderer
  process on [localhost:3000].
* `npm run start:main` Build and run the Electron application. Make sure that
  the React application is being served in the background. If you see a blank
  screen, you probably forgot to run `npm start:renderer`.
* `npm run db:migrate` Execute all pending database migrations.
* `npm run db:rollback` Revert the last executed migration. Use this command to
  test your `down()` method.
* `npm run db:drop` ☢️ the database. Can come in handy if something goes wrong
  while developing migrations.
* `npm run lint` Check the codebase for linter errors. Used by CI.
* `npm run format` Format the codebase using Prettier. Use this script if CI
  complains.
* `npm run storybook` Start [Storybook] on [localhost:9000].
* `scripts/build.sh` Package the application for your local development OS. If
  you're integrating with native modules, this will come in handy as a preflight
  check.
* `npm run package` Package the application for Windows, our target platform.
  Will attempt to cross-compile on Linux / macOS. You will need to run the above
  build script first.
* `npm run deploy` Same as `npm run package`, but also attempt to deploy (for
  example, using GitHub releases).

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
[localhost:3000]:http://localhost:3000/
[Storybook]:https://storybook.js.org/
[localhost:9000]:http://localhost:9000/
[Node.js REPL]:https://nodejs.dev/learn/how-to-use-the-nodejs-repl
[Figma]:https://www.figma.com/file/3GkovVdGabhJmCOXC4X5Pi/srce-desktop-app?node-id=1%3A14
