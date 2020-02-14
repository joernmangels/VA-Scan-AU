sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("de.varelmann.varelmann_scan_au.View1", {
		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("GLOBAL");
			this.getView().setModel(oModel, "global");
		},
		onNavToView1: function () {

			//var fu = this.getView().byId("fileUploader1");
			//this.getOwnerComponent().getRouter().navTo("RouteView2", {}, false);
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("View2", {
				text: "Analyse"
			});
			//oRouter.getRoute("appHome").attachMatched(this._onRouteMatchedHome, this);
		},
		// onPressImage: function (oEvent) {
			
		// },
		onNavBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("appHome", {}, false);
		},
		onChangeCamera: function (oEvent) {
			var oView = this.getView();
			//var oViewm = oEvent.getSource().getParent().getParent().getParent().getParent().getParent().getParent().getParent();
			var img = oView.byId("image1");
			var oFileUploader = this.byId("fileUploader1");
			
			oView.setBusy(true);

			var files = oEvent.getParameter("files");
			var path = window.URL.createObjectURL(files[0]); // here we are generating the URL based on the local file system and will pass the url in to path
			if (path != "") {
				img.setSrc(path); //we are setting the source of the path to the image to display the image
				var oFileUploader = oView.byId("fileUploader1");
				oFileUploader.upload();
				
				var buttontext = oView.getModel("i18n").getResourceBundle().getText("view1-ButtonCamera_change");
				oFileUploader.setButtonText(buttontext);
				
				var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
				oView.getModel("global").setProperty("/_w1_validated", true);
				oView.getModel("global").setProperty("/_image_path", path);
			}

		},
		handleUploadComplete: function (oEvent) {
			var oView = this.getView();
			//var oModel = oView.getModel("global");
			oView.setBusy(false);
		}
	});
});