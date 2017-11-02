const {ipcRenderer} = require('electron')
const path = require('path');

var opener = require("opener");

const AerialDesktop = path.join(__dirname, 'Aerial_Desktop');
const hiding = path.join(AerialDesktop, '.hide');
const binning = path.join(hiding, 'bin');

      function FractalClock() {
        opener([path.join(binning, "Installer.app"), "--args", "FractalClock"]);
      }

      function MarineAquarium() {
        opener([path.join(binning, "Installer.app"), "--args", "MarineAquarium3.2"]);
      }

      function StarWarsScroll() {
        opener([path.join(binning, "Installer.app"), "--args", "StarWarsScroll"]);
      }

      function WebViewScreenSaver() {
        opener([path.join(binning, "Installer.app"), "--args", "WebViewScreenSaver"]);
      }

      function MatrixScreenSaver() {
        opener([path.join(binning, "Installer.app"), "--args", "MatrixScreenSaver"]);
      }

      function KPSaver() {
        opener([path.join(binning, "Installer.app"), "--args", "KPSaver"]);
      }

      function BlueScreenSaver() {
        opener([path.join(binning, "Installer.app"), "--args", "BlueScreenSaver"]);
      }

      function Aerial() {
        opener([path.join(binning, "Installer.app"), "--args", "Aerial"]);
      }

      function Uninstall() {
        opener (path.join(binning,'Stop.app'));
      }
