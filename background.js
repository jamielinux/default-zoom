let defaultZoom = 1;

let gettingDefaultZoom = browser.storage.local.get("defaultZoom");
gettingDefaultZoom.then((storage) => {
  if (storage.defaultZoom) {
    defaultZoom = parseFloat(storage.defaultZoom);
  }
});

function setZoom(tabId, changeInfo, tab) {
  if (changeInfo.status) {
    let gettingZoom = browser.tabs.getZoom(tabId);
    gettingZoom.then((currentZoom) => {
      if (defaultZoom != 1 && currentZoom == 1) {
        browser.tabs.setZoom(tabId, defaultZoom);
      }
    });
  }
}

browser.storage.onChanged.addListener((newSettings) => {
  defaultZoom = parseFloat(newSettings.defaultZoom.newValue);
});

browser.tabs.onCreated.addListener((tab) => {
  browser.tabs.setZoom(tab.id, defaultZoom);
});

browser.tabs.onUpdated.addListener(setZoom);
