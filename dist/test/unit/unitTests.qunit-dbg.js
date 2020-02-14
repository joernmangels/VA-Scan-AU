/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"de/varelmann/varelmann_scan_au/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});