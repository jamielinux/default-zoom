let defaultZoom = 1;

const gettingDefaultZoom = browser.storage.local.get("defaultZoom");
gettingDefaultZoom.then((storage) => {
  if (storage.defaultZoom) {
    const parsedZoom = parseFloat(storage.defaultZoom);
    if (parsedZoom >= 30 && parsedZoom <= 300) {
      defaultZoom = parsedZoom / 100;
    } else {
      // If the setting is somehow outside the allowed range of
      // values, set it back to the default.
      browser.storage.local.set({
        defaultZoom: "100",
      });
    }
  }
});

function setZoom(tabId, changeInfo) {
  if (changeInfo.status) {
    const gettingZoom = browser.tabs.getZoom(tabId);
    gettingZoom.then((currentZoom) => {
      if (defaultZoom !== 1 && currentZoom === 1) {
        browser.tabs.setZoom(tabId, defaultZoom);
      }
    });
  }
}

browser.storage.onChanged.addListener((newSettings) => {
  defaultZoom = parseFloat(newSettings.defaultZoom.newValue) / 100;
});

browser.tabs.onCreated.addListener((tab) => {
  setZoom(tab.id, {status:1}, tab);         
});

browser.tabs.onUpdated.addListener(setZoom);
