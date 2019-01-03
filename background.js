let defaultZoom = 1.33;

let gettingDefaultZoom = browser.storage.local.get("defaultZoom");
gettingDefaultZoom.then((storage) => {
  if (storage.defaultZoom) {
    defaultZoom = storage.defaultZoom;
  }
});

function setZoom(details) {
  let gettingZoom = browser.tabs.getZoom(details.id);
  gettingZoom.then((zoomFactor) => {
    if (zoomFactor != defaultZoom) {
      if (zoomFactor == 1) {
        browser.tabs.setZoom(details.id, parseFloat(defaultZoom));
      }
    }
  });
}

browser.storage.onChanged.addListener((newSettings) => {
  defaultZoom = newSettings.defaultZoom.newValue
});

browser.tabs.onCreated.addListener((details) => {
  browser.tabs.setZoom(details.id, parseFloat(defaultZoom));
});

browser.tabs.onActivated.addListener(setZoom);
browser.webNavigation.onDOMContentLoaded.addListener(setZoom);
