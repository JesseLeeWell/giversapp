import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { _kiosklicense, _kioskURL, DEV_MODE } from "./settings";
import { Preferences } from "@capacitor/preferences";
import $ from "jquery";

var browserwindow = null;
var app = {
  initialize: () => {
    setAppleSafe(run);
  }
};

function openGiversApp(url) {
  url = url || _kioskURL;

  browserwindow = cordova.InAppBrowser.open(
    url,
    "_blank",
    "toolbar=no,location=no"
  );
  browserwindow.addEventListener("exit", () => $("#main").show());
  browserwindow.addEventListener("loadstart", iabLoadDonationPageInSystem);

  storageSet("dont_show_again", "true");
  $("#main").hide();
}

async function iabLoadDonationPageInSystem(event) {
  let cururl = event.url;
  let lasturl = await storageGet("lasturl", _kioskURL);
  storageSet("lasturl", cururl);

  if (cururl.indexOf("backtoapp") != -1) {
    browserwindow.close();
  }

  getAppleSafe().then((res) => {
    if (res) return;

    cururl = event.url;

    if (cururl.indexOf("donation_prompt") != -1) {
      // cururl = cururl.replace("giverapp", "www");

      //opengiversapp();
      //window.open(_kioskURL, "_blank",'location=no');
      alert("Taking you to our webpage to donate per Apple's terms of use.");
      //navigator.notification.confirm("Taking you to our webpage to donate per Apple's terms of use.", null, "Givers App", "OK");

      //window.history.go(-1);
      //openPage(cururl, "_system", "",false, opengiversapp,lasturl);
      browserwindow.close();

      openPage(cururl, "_system", "", false);
      openGiversApp(lasturl);
    }
  });
}

function openPage(url, target, location, includebaseurl, callback, lasturl) {
  if (includebaseurl) {
    url = _baseURL + url;
  }

  if (callback) {
    callback(lasturl);
  }

  window.open(url, target, location);
}

function isApple() {
  return Capacitor.getPlatform() == "ios";
}

function setAppleSafe(callback) {
  if (!isApple()) {
    storageSet("applesafestorage", "true");
  } else if (_kiosklicense == "store") {
    //if it came in here, we set the flow to false until we know otherwise
    storageSet("applesafestorage", "false");

    //then we need to check the version
    let urlToCall = _baseURL + _appCheckURL + "?kioskversion=" + _kioskversion;

    $.ajax({
      url: urlToCall,
      async: false,
      success: function (data) {
        let result = data == "true" ? "true" : "false";

        storageSet("applesafeversion", _kioskversion);
        storageSet("applesafestorage", result);
      },
      fail: function () {
        storageSet("applesafeversion", _kioskversion);
        storageSet("applesafestorage", "false");
      },
    });
  }

  if (callback) callback();
}

function run() {
  setDeviceSpecificClasses();
  determineStartPage();
}

async function determineStartPage() {
  storageSet("already_initialSetup", true);
  storageSet("hideintro", true);

  let lasturl = DEV_MODE ? false : await storageGet("lasturl");
  let dontShowAgain = DEV_MODE ? false : await storageGet("dont_show_again");

  if (lasturl || dontShowAgain) {
    //if user clicked back
    let url = lasturl.replace("#backtoapp", "");
    if (app.eventId != "resume") {
      openGiversApp(url);
    }
  }

  if (dontShowAgain != "true") {
    $("#main").show();
  }
}

function setDeviceSpecificClasses() {
  if (!isApple()) {
    $(".hideapple").show();
  }

  getAppleSafe().then((res) => {
    if (res) {
      $(".applestoresafe").show();
    } else {
      $(".applestoresafe").hide();
    }
  });
}

async function getAppleSafe() {
  //only check if apple, otherwise its true

  if (isApple() && _kiosklicense == "store") {
    return (await storageGet("applesafestorage")) == "true";
  }

  return true;
}

function storageSet(key, value) {
  Preferences.set({ key, value });
}

async function storageGet(key, defaultval) {
  const res = await Preferences.get({ key });

  if (res.value == null) {
    return defaultval;
  }

  return res.value;
}

const button = document.getElementById("openApp");
button.onclick = () => {
  openGiversApp(_kioskURL);
};

App.addListener("resume", () => app.initialize());
app.initialize();
