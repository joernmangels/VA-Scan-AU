sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("de.varelmann.varelmann_scan_au.controller.View2", {

		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("GLOBAL");
			this.getView().setModel(oModel, "global");
			
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View2").attachMatched(this._onRouteMatchedView2, this);
			
		},
		onNavToView3: function () {
			//this.getOwnerComponent().getRouter().navTo("RouteView2", {}, false);
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("View3", {
				text: "View3"
			});
			//oRouter.attachMatched(this._onRouteMatchedView2, this);
		},
		onNavBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("View1", {
				text: "View1"
			}, false);
		},
		_onRouteMatchedView2: function (oEvent) {
			// var path = this.getView().getModel("global").getProperty("/_image_path");
			// var image2 = this.getView().byId("image2");
			// image2.setSrc(path);
			
			this.getOwnerComponent().step1Complete(oEvent, this);
			
			// AUS: function () {
			// $('.fingerprint').toggleClass('scanning');
			// },
		}

	});

});