# Hypo App
Hypo World Electron Application, gemaakt door Jeff.

## Installatie
```bash
#Start de app op, om live de updates te zien.
npm start
#Genereer app voor Windows
npm run publish-win
#genereer app voor MacOS
npm run publish-mac
```

## MacOS Foutmelding
Als je op MacOS een foutmelding krijgt, kan dit vaak helpen:

```bash
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
```

### Windows foutmelding

Install the current version of Python from the [Microsoft Store package](https://docs.python.org/3/using/windows.html#the-microsoft-store-package).

Install tools and configuration manually:
   * Install Visual C++ Build Environment: [Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)
   (using "Visual C++ build tools" workload) or [Visual Studio Community](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community)
   (using the "Desktop development with C++" workload)
   * Launch cmd, `npm config set msvs_version 2017`

   If the above steps didn't work for you, please visit [Microsoft's Node.js Guidelines for Windows](https://github.com/Microsoft/nodejs-guidelines/blob/master/windows-environment.md#compiling-native-addon-modules) for additional tips.

   To target native ARM64 Node.js on Windows 10 on ARM, add the components "Visual C++ compilers and libraries for ARM64" and "Visual C++ ATL for ARM64".
