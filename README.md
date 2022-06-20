### Dev scripts and info
Specify your site in firebase.json
Add your site ID to the firebase.json configuration file. After you get set up, see the best practices for multi-site deployment.

{
  "hosting": {
    "site": "kaisertools-dev",

    "public": "public",
    ...
  }
}
When you’re ready, deploy your web app
Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:

firebase deploy --only hosting:kaisertools-dev
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\

### Firebase backend
Make sure firestore rules are set up correctly and deploy after running build with `firebase deploy`.\
