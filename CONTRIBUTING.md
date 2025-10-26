# Contributing to Cornucopia

## How to obtain the source code

If you are a Cornucopia team member, clone the repository. If you are an external contributor, fork this repository to your own GitHub account and then clone it to your local device.

## Directory structure

The project contains the following important files and directories:

- **~/\_\_tests\_\_**: Unit and integration tests for each of the pages of this app
- **~/src/app**: All of the routable pages of this app
- **~/src/app/(tabs)**: each of the pages in this directory correspond to a tab in the bottom tabs navigation
- **~/src/components**: Reusable react components
- **~/src/lib**: Functions for API calls
- **~/src/util**: contains utility functions
- **~/app.json**: configuration of the app such as the app name, icon, and splash screen
- **~/eas.json**: configuration of different build profiles for this app (e.g., development, preview, production)
- **~/package.json**: lists all of the npm dependencies for this app

## How to build the software

### General prerequisites

1. Install [Node](https://nodejs.org/en/download)

2. Open the root project directory in your IDE and Install all npm packages:
   `npm i`

3. Install expo-dev-client:
   `npx expo install expo-dev-client`

4. Install eas-cli and login using your Expo credentials:
   `npm install -g eas-cli && eas login`

5. Join our Expo organization

### IOS

1. Complete all the steps under General prerequisites

2. Install IOS simulator on Xcode

3. Install [Homebrew](https://brew.sh/)

4. Install Fastlane
   `brew install fastlane`

5. Install Cocoapods
   `brew install cocoapods`

6. Build and launch the app
   `npx expo run:ios`

### Android

1. Complete all the steps under General prerequisites

2. Install [Android Studio](https://developer.android.com/studio)

3. Build the app
   `eas build --platform android --profile development --local`

4. Copy the generated .apk file onto your Android device and install it

5. Run the development server and scan the generated QR code in the terminal
   `npx expo start`

## How to test the software

1. Ensure all npm dependencies are installed
   `npm i`

2. Run the test script to execute our test suite
   `npm run test`

## How to add new tests

We use the Jest library for testing. Name your test file "**{name of relevant page}.spec.ts**" and place the file under "**~/\_\_tests\_\_/{name of relevant page}/**"
