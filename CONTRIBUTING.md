# Contributing to Cornucopia

Thank you for your interest in contributing to Cornucopia!
This guide will walk you through setting up the project, building the app, running tests, and contributing new code or tests.

- [How to obtain the source code](#how-to-obtain-the-source-code)
- [Directory structure](#directory-structure)
- [How to build the software](#how-to-build-the-software)
- [How to test the software](#how-to-test-the-software)
- [How to add new tests](#how-to-add-new-tests)

## How to obtain the source code

If you are a Cornucopia team member, clone the repository. If you are an external contributor, fork this repository to your own GitHub account and then clone it to your local device.

## Directory structure

Below is an overview of the key directories and files:

| Path              | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| `__tests__/`      | Unit and integration tests for each page of the app            |
| `src/app/`        | All routable pages in the app                                  |
| `src/app/(tabs)/` | Pages corresponding to tabs in the bottom tab navigation       |
| `src/components/` | Reusable React components                                      |
| `src/lib/`        | API utility functions and data-fetching logic                  |
| `src/util/`       | General-purpose utility functions                              |
| `app.json`        | App configuration (name, icon, splash screen, etc.)            |
| `eas.json`        | Build profile configuration (development, preview, production) |
| `package.json`    | Lists npm dependencies and scripts                             |

## How to build the software

### General prerequisites

1. Install [Node](https://nodejs.org/en/download)

2. Open the root project directory in your IDE and Install all npm packages:
   `npm install`

3. Install expo-dev-client:
   `npx expo install expo-dev-client`

### IOS

1. Complete all the steps under [General prerequisites](#general-prerequisites)

2. Install IOS simulator on Xcode

3. Install [Homebrew](https://brew.sh/)

4. Install Fastlane
   `brew install fastlane`

5. Install Cocoapods
   `brew install cocoapods`

6. Build and launch the app
   `npm run ios`

### Android

1. Complete all the steps under [General prerequisites](#general-prerequisites)

2. Install a JDK (e.g., [openjdk 21](https://openjdk.org/install/))

3. Install [Android Studio](https://developer.android.com/studio)

4. Build and launch the app
   `npm run android`

## How to test the software

1. Ensure all npm dependencies are installed
   `npm install`

2. Run the test script to execute our test suite
   `npm run test`

## How to add new tests

We use [Jest](https://jestjs.io/) for unit and integration testing.  
Follow these conventions when creating new tests:

- Test filenames should follow this format:  
   `{page-name}.spec.ts`

- Place test files inside the corresponding directory under:  
   `\_\_tests\_\_/{page-name}/{unit | integration}`

Example:  
/\_\_tests\_\_/home/unit/home.spec.ts

## How to build a release of the software

This section is only applicable to internal contributors

1. Update the app's version in /app.json

2. Build the app using the production profile

```sh
eas build --platform ios --profile production
eas build --platform android --profile production
```

3. Submit the app to stores

```sh
eas submit --platform ios
eas submit --platform android
```
