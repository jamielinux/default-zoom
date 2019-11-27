let defaultZoom = 1.2;

let gettingDefaultZoom = browser.storage.local.get("defaultZoom");
gettingDefaultZoom.then((storage) => {
  if (storage.defaultZoom) {
    let parsedZoom = parseFloat(storage.defaultZoom);
    if (30 <= parsedZoom && parsedZoom <= 300) {
      defaultZoom = parsedZoom / 100;
    } else {
      // If the setting is somehow outside the allowed range of
      // values, set it back to the default.
      browser.storage.local.set({
        defaultZoom: "100"
      });
    }
  }
});

function setZoom(tabId) {
  let gettingZoom = browser.tabs.getZoom(tabId);
  gettingZoom.then((currentZoom) => {
    if (defaultZoom != 1 && currentZoom == 1) {
      browser.tabs.setZoom(tabId, defaultZoom);
    }
  });
}

browser.storage.onChanged.addListener((newSettings) => {
  defaultZoom = parseFloat(newSettings.defaultZoom.newValue) / 100;
});

browser.tabs.onCreated.addListener(
  (tab) => { setZoom(tab.id); }
)
browser.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    if (changeInfo.status) setZoom(tabId);
  }
)
browser.tabs.onZoomChange.addListener(
  (info) => {
    if(info.newZoomFactor == 1) setZoom(info.tabId);
  }
)
