# Splashpack

A hosted web site in a package, because splashscreens.

## Why?

* Put your hosted web app in a package to make it future proof to update to a privileged app later on.
* The package can have custom code to keep Firefox OS specific code paths out of your hosted web site.
* Instantly loaded splashscreen and nice offline messaging

## Multi domain

The app will attempt to retrieve the user's region from the SIM. If it finds a region it will look for a region-specific URL in `/static/script.js` and redirect to it. Otherwise it will redirect to a specified `default` URL.

## Testing

Use [App Manager/WebIDE](https://developer.mozilla.org/en-US/docs/Tools/WebIDE) to test the app on a Firefox OS simulator or device.
