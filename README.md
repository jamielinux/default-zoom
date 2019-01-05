# Default Zoom extension for Firefox

Set the default zoom level for Firefox. Useful for QHD or HiDPI monitors, or if
you don't like squinting.

* Set your desired default zoom level. If unset, the add-on will default to
  100%.
* Per-site zoom is respected (with one exception, see below).

## How does this compare to other add-ons?

Other zoom add-ons have more features and might suit you better.

This add-on makes some trade-offs to be as tiny as possible. It's [just 30
lines of
JavaScript](https://github.com/jamielinux/default-zoom/blob/master/background.js).
It doesn't use browser storage other than a single option for the default zoom
level. It [requests minimal
permissions](https://github.com/jamielinux/default-zoom/blob/master/manifest.json#L13-L15).

## Per-site zoom levels

**All per-site zoom levels are respected, with one exception: a zoom level of
100% is always overridden when reloading a page.** That might not be an issue
for you though if 100% zoom is always too small anyway!

Other add-ons use browser storage to keep per-site zoom level entries for every
website you visit. This add-on avoids doing that, while still respecting
per-site zoom levels, by only zooming the page when the zoom level is 100% (ie,
a new tab).

## Why is this add-on even necessary?

You can't easily set the default zoom level for new tabs in Firefox. There are
four options:

1. Change `layout.css.devPixelsPerPx` in `about:config`, but this also changes
   the UI of the browser itself.
2. Change `zoom.minPercent` in `about:config`, but then you can't reduce the
   zoom below that value.
3. Run this in the Browser Console command-line:
   `FullZoom._cps2.setGlobal(FullZoom.name,1.33,gBrowser.selectedBrowser.loadContext);`,
   but you have to press `Ctrl-0` for every new tab.
4. Install an add-on. There are many to choose from.
