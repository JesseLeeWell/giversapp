cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "branch-cordova-sdk.Branch",
      "file": "plugins/branch-cordova-sdk/src/index.js",
      "pluginId": "branch-cordova-sdk",
      "clobbers": [
        "Branch"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    }
  ];
  module.exports.metadata = {
    "branch-cordova-sdk": "4.1.2",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-inappbrowser": "3.2.0",
    "cordova-plugin-whitelist": "1.3.4"
  };
});