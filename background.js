let defaultZoom = 1;

let gettingDefaultZoom = browser.storage.local.get("defaultZoom");
gettingDefaultZoom.then((storage) => {
  if (storage.defaultZoom) {
    // Start of temporary migration as we've changed the units of the setting.
    let parsedZoom = parseFloat(storage.defaultZoom);
    if (0.3 <= parsedZoom && parsedZoom <= 3) {
      defaultZoom = parsedZoom;
      browser.storage.local.set({
        defaultZoom: parsedZoom * 100
      });
    // End of temporary migration.
    } else {
      defaultZoom = parseFloat(storage.defaultZoom) / 100;
    }
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
  defaultZoom = parseFloat(newSettings.defaultZoom.newValue) / 100;
});

browser.tabs.onCreated.addListener((tab) => {
  browser.tabs.setZoom(tab.id, defaultZoom);
});

browser.tabs.onUpdated.addListener(setZoom);
