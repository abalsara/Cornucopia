# Contributing to Cornucopia

Thank you for your interest in contributing to Cornucopia!
This guide will walk you through setting up the project, building the app, running tests, and contributing new code or tests.

- [How to obtain the source code](#how-to-obtain-the-source-code)
- [Directory structure](#directory-structure)
- [How to build the software](#how-to-build-the-software)
- [How to add and run tests](#how-to-add-and-run-tests)

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
   `npx expo run:ios`

### Android

1. Complete all the steps under [General prerequisites](#general-prerequisites)

2. Install a JDK (e.g., [Oracle JDK 21](https://www.oracle.com/java/technologies/downloads/#java21))

3. Install [Android Studio](https://developer.android.com/studio) using the default installation options. This will additionally install the Android SDK and an emulator.

4. Configure the Android environment variables by following the instructions under [Android configuration](#android-configuration):

5. Build and launch the app
   `npx expo run:android`

### Android configuration
   This section describes how to set the Android SDK environment variables, which is required for building the Android app locally.
   
#### Windows:
1. In the Windows search bar, search for and click on “**Edit environment variables for your account**” and click **New** to create a new ANDROID_HOME user variable. **Or** go to **Windows Control Panel** > **User Accounts** > **User Accounts** (again) > **Change my environment variables** and click **New** to create a new ANDROID_HOME user variable.

2. Set the variable name to **ANDROID_HOME** and the value to the path of the Android SDK folder. By default it is **%LOCALAPPDATA%\Android\Sdk**

3. Add a new Path environment variable by clicking on **Path** > **Edit…** > **New** > Then add the path of the Android platform-tools folder. By default it is **%LOCALAPPDATA%\Android\Sdk\platform-tools**

4. Restart your computer

#### Linux/MacOS
1. Add the following lines to your /.zprofile or ~/.zshrc (if you are using bash, then ~/.bash_profile or ~/.bashrc) config file:

```sh
export ANDROID_HOME=$HOME/Library/Android/sdk && export 
PATH=$PATH:$ANDROID_HOME/emulator && export 
PATH=$PATH:$ANDROID_HOME/platform-tools
```

2. Reload the path environment variables in your current shell:

```sh
# for .zsh
source $HOME/.zshrc
# for bash
source $HOME/.bashrc
```

## How to add and run tests

Follow our comprehensive testing guidelines on [TEST-GUIDE.md](TEST-GUIDE.md)

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
