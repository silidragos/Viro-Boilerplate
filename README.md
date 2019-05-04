# React-Native CLI to Viro
## Project setup

-   Copy **index.js** **index.android.js** **index.ios.js** and replace with the appropriate name.
-   Copy **rn-cli.config.js** in root
-   **metro.config.js** has to permit 3D specific files. The new config file basically loads the old metro-config permited Asset Extensions and add the new ones. This file should be merged with the existing one.
-   Copy **setup-ide.sh** to root.
-   Add **react (16.8.3)**, **react-native (0.59.3)** and **react-viro(2.14.0)** to package json

---

-   Run in root folder:

```console
./setup-ide.sh android
cd ./android/
./gradlew.bat installArDebug
cd ..
react-native run-android --variant=arDebug
```

---

## Scene setup

-   The AR scene has to have as root the **ARSceneNavigator** tag and get the API key as prop. It should also receive the scene to be run as a prop.
