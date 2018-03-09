# ZB-NG-Senior-Project

#### Useful Documentation
* React JS Documentation https://reactjs.org/docs/hello-world.html
* Create React App Documentation https://github.com/facebook/create-react-app
  * Our app is built on top of Create React App, whic takes care a lot of React JS headache
  * This documentation gives pointers for configuring the app and adding basic features that we'll need
* Create React App Typescript Documentation https://github.com/wmonk/create-react-app-typescript
  * This allows us to use Typescript when it helps us
* Material-UI Documentation https://material-ui-next.com
* NPM packages for anything not built into React or Material-UI https://www.npmjs.com
* Standard Material-UI Icons https://material.io/icons/
* Custom Material-UI Icons https://materialdesignicons.com/
  * Using these Icons is a bit more involved, but by downloading any icon as an SVG, you gain access to a special code that can be used to generate the Icon properly
  * https://material-ui-next.com/style/icons/ documents how to use one of these codes
* Gordon Branding Standards http://www.gordon.edu/brandstandards

#### Dependencies
* @types -- Typescript dependencies so that various react types can be used as types
* babel-loader -- Deals with loading javascript files. Normally hidden within Create React App, but had to be manually installed so the configuration could be patched to use both Typescript and Javascript
* babel-preset-react-app -- The presets for Babel used by Create React App which was also needed to modify the project configuration
* cross-env -- Allows app commands like `start` and `build` to be run with unix variables on both Windows and Mac
* material-ui -- Pre-made user interface components like buttons, tabs, etc.
* material-ui-icons -- Standard material icons that work seemlessly with Material UI
* react -- The basic React libraries for constructing a React app
* react-app-rewired -- Allows for modification of the configuration file normally hidden by Create React App
* react-dom -- DOM for React
* react-router -- Allows for navigation between React components
* react-router-dom -- DOM for React Router
* react-scripts-ts -- Commands for running, building, testing a React App built on Typescript
* typescript -- More strictly typed Javascript

#### Running and Developing the App
* Install react globally (with the -g option) via the npm package manager https://www.npmjs.com/package/react/tutorial
* Install yarn globally in one of the ways listed https://yarnpkg.com/lang/en/docs/install/
* Navigate to the `goco-transit` folder of the repository
* Execute `yarn dev` to run the project
* Execute `yarn build` to create a production build of the project

#### Naming Conventions
* Branches: `{issuenumber}-{summary-description}`
* Pull Requests (Should have names identical to the Issue they're linked to, but with the issue number at the front): `{linked issue number}-{linked issue description}`

#### Issue Tracking
* Creating an issue
  * Give the issue a name that briefly describes the bug or feature
  * Assign the issue to the appropriate person
  * Label the issue appropriately
  * Add the issue to the goco-transit project
  * Add the issue to a sprint if applicable
  * If the issue needs to be completed in the current sprint, add it to that column on the project board
  * Move the issue to "In Progress" once you have begun work on it
* Completing an issue
  * When you have finished work on the issue, create a pull request to merge the issue into master
  * Assign that pull request to the appropriate reviewer
  * Add the pull request to the goco-transit project
  * Add the pull request to the current sprint
  * Wait for the pull request to be approved and merged
  * Delete the branch associated with the pull request
  * Close out the issue manually
