// Just some boilerplate to save/restore the default zoom preference for the
// extension, which is 100% if unset.

const defaultZoom = 100;

function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    defaultZoom: document.querySelector("#default-zoom").value
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#default-zoom").value = result.defaultZoom || defaultZoom;
  }
  function onError(error) {
    console.log(`Error: ${error}`);
  }
  var getDefaultZoom = browser.storage.local.get("defaultZoom");
  getDefaultZoom.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
