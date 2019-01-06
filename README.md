# Default Zoom extension for Firefox

Set the [default zoom level for
Firefox](https://addons.mozilla.org/en-US/firefox/addon/default-zoom/). Useful
for QHD or HiDPI monitors, or if you don't like squinting.

* Set your desired default zoom level. If unset, the add-on will default to
  100%.
* Per-site zoom is respected (with one exception, see below).

## How does this compare to other add-ons?

Other zoom add-ons have more features and might suit you better.

This add-on makes some trade-offs to be **as tiny as possible**. It's [just 30
lines of
JavaScript](https://github.com/jamielinux/default-zoom/blob/master/background.js)
(whereas others are 1000s of lines). It doesn't use browser storage other than
a single option for the default zoom level. It [requests almost no
permissions](https://github.com/jamielinux/default-zoom/blob/master/manifest.json#L10-L12).

## Per-site zoom levels

**Per-site zoom levels are respected, with one exception: a zoom level of 100%
is always overridden after you reload.** (Reason: There's a limitation in the
WebExtension API. Other add-ons solve that by storing per-site zoom level
entries for every website you visit. This add-on avoids that by only zooming
when the zoom of the current tab is 100%, which is fine because 100% was too
small for you anyway!)

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
