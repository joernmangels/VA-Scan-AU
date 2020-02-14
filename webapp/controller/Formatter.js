sap.ui.define(function () {
		"use strict";

		var Formatter = {
			messagestrip_type: function (uncertian, changed) {

				if (changed) {
					return "Warning";
				} else {
					if (uncertian) {
						return "Error";
					} else {
						return "Information";
					}
				}

			},
			uncertain_value: function (uncertain) {

				if (uncertain) {
					return "Wert evtl. nicht eindeutig!";
				} else {
					return "Joern";
				}

			},
			value_bool: function (value) {

				if (value) {
					return "Ja";
				} else {
					return "Nein";
				}

			}
		};

		return Formatter;

	},
	/* bExport= */
	true);