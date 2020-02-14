sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"de/varelmann/varelmann_scan_au/controller/Formatter",
	"sap/m/MessageBox"

], function (Controller, Formatter, MessageBox) {
	"use strict";

	return Controller.extend("de.varelmann.varelmann_scan_au.controller.View3", {

		_formFragments: {},

		onInit: function () {
			var oModel = this.getOwnerComponent().getModel("GLOBAL");
			this.getView().setModel(oModel, "global");

			this._showFormFragment("Nav1Change");

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("View3").attachMatched(this._onRouteMatchedView3, this);

			var that = this;
			// -----------------------------------------------------------------------
			var initial_certificate = this.getView().byId("initial_certificate");
			//initial_certificate.attachSelect(function (oEvent) {
			initial_certificate.attachChange(function (oEvent) {
				that.value_changed(oEvent, initial_certificate);
			});
			var renewed_certificate = this.getView().byId("renewed_certificate");
			renewed_certificate.attachChange(function (oEvent) {
				that.value_changed(oEvent, renewed_certificate);
			});
			var workplace_accident = this.getView().byId("workplace_accident");
			workplace_accident.attachChange(function (oEvent) {
				that.value_changed(oEvent, workplace_accident);
			});
			var doctor_assigned = this.getView().byId("doctor_assigned");
			doctor_assigned.attachChange(function (oEvent) {
				that.value_changed(oEvent, doctor_assigned);
			});
			var incapacity_from = this.getView().byId("incapacity_from");
			incapacity_from.attachChange(function (oEvent) {
				that.value_changed(oEvent, incapacity_from);
			});
			var incapacity_to = this.getView().byId("incapacity_to");
			incapacity_to.attachChange(function (oEvent) {
				that.value_changed(oEvent, incapacity_to);
			});
			var incapacity_noticed = this.getView().byId("incapacity_noticed");
			incapacity_noticed.attachChange(function (oEvent) {
				that.value_changed(oEvent, incapacity_noticed);
			});
			// -----------------------------------------------------------------------
			this._showFormFragment("Nav1Display");
		},
		onNavOn: function () {
			//this.getOwnerComponent().getRouter().navTo("RouteView2", {}, false);
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("View3", {
				text: "View3"
			});
			//oRouter.getRoute("appHome").attachMatched(this._onRouteMatchedHome, this);
		},
		onNavBack: function (oEvent) {
			this.getOwnerComponent().getRouter().navTo("View1", {
				text: "View1"
			}, false);
		},
		_onRouteMatchedView3: function (oEvent) {
			// var path = this.getView().getModel("global").getProperty("/_image_path");
			// var image2 = this.getView().byId("image2");
			// image2.setSrc(path);

			var oModel = this.getView().getModel("global");
			oModel.setProperty("/_w3_validated", true);
			oModel.setProperty("/_w3_back", true);

			//this.getOwnerComponent().step1Complete(oEvent, this);

		},
		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "de.varelmann.varelmann_scan_au.view." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},
		_showFormFragment: function (sFragmentName) {
			var oNav1 = this.getView().byId("NAV1");
			oNav1.removeAllContent();
			oNav1.insertContent(this._getFormFragment(sFragmentName));
		},
		onToggleChange: function () {
			var oModel = this.getView().getModel("global");
			var toggle = oModel.getProperty("/_w3_toggle");

			if (toggle) {
				oModel.setProperty("/_w3_toggle", false);
				this._toggleButtonsAndView(false);
			} else {
				oModel.setProperty("/_w3_toggle", true);
				this._toggleButtonsAndView(true);
			}
		},
		// handleCancelPress: function () {
		// 	// var oModel = this.getView().getModel("global");
		// 	// oModel.setProperty("/_ocr_result", ocr_org);
		// 	//this.getView().getModel("global").refresh(true, false);
		// 	this.getView().getModel("global").resetChanges();
		// 	this._toggleButtonsAndView(false);
		// },
		_toggleButtonsAndView: function (bEdit) {
			var oView = this.getView();

			oView.byId("EDIT").setVisible(!bEdit);
			oView.byId("SAVE").setVisible(bEdit);
			// oView.byId("BACK").setVisible(!bEdit);
			// oView.byId("FORW").setVisible(!bEdit);
			oView.byId("BACK").setEnabled(!bEdit);
			oView.byId("FORW").setEnabled(!bEdit);
			this._showFormFragment(bEdit ? "Nav1Change" : "Nav1Display");
		},
		value_changed: function (oEvent, control) {
			var oModel = this.getView().getModel("global");
			var oView = this.getView();
			var tchanged = oView.getModel("i18n").getResourceBundle().getText("manuell_changed");
			var text;

			switch (oEvent.getParameter("id")) {
			case "__xmlview2--initial_certificate":
				//var checkbox = oEvent.getParameter("selected");
				if (!oModel.getProperty("/_ocr_result/initial_certificate/changed")) {
					text = oView.getModel("i18n").getResourceBundle().getText("ocr_result-initial_certificate") + " " + tchanged;
					// ms = oView.byId("initial_certificate_t");
					// ms2 = oView.byId("initial_certificate_t2");
					// ms.setText(ms.getText() + " " + tchanged);
					// ms2.setText(ms.getText() + " " + tchanged);
					oModel.setProperty("/_ocr_result/initial_certificate/text", text);
					oModel.setProperty("/_ocr_result/initial_certificate/changed", true);
				}
				break;
			case "__xmlview2--renewed_certificate":
				if (!oModel.getProperty("/_ocr_result/renewed_certificate/changed")) {
					text = oView.getModel("i18n").getResourceBundle().getText("ocr_result-renewed_certificate") + " " + tchanged;
					oModel.setProperty("/_ocr_result/renewed_certificate/text", text);
					oModel.setProperty("/_ocr_result/renewed_certificate/changed", true);
				}
				break;
			case "__xmlview2--workplace_accident":
				if (!oModel.getProperty("/_ocr_result/workplace_accident/changed")) {
					text = oView.getModel("i18n").getResourceBundle().getText("ocr_result-workplace_accident") + " " + tchanged;
					oModel.setProperty("/_ocr_result/workplace_accident/text", text);
					oModel.setProperty("/_ocr_result/workplace_accident/changed", true);
				}
				break;
			case "__xmlview2--doctor_assigned":
				if (!oModel.getProperty("/_ocr_result/doctor_assigned/changed")) {
					text = oView.getModel("i18n").getResourceBundle().getText("ocr_result-doctor_assigned") + " " + tchanged;
					oModel.setProperty("/_ocr_result/doctor_assigned/text", text);
					oModel.setProperty("/_ocr_result/doctor_assigned/changed", true);
				}
				break;
			case "__xmlview2--incapacity_from":
				if (!oModel.getProperty("/_ocr_result/incapacity_from/changed")) {
					text = oView.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_from") + " " + tchanged;
					oModel.setProperty("/_ocr_result/incapacity_from/text", text);
					oModel.setProperty("/_ocr_result/incapacity_from/changed", true);
				}
				break;
			case "__xmlview2--incapacity_to":
				if (!oModel.getProperty("/_ocr_result/incapacity_to/changed")) {
					text = oView.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_to") + " " + tchanged;
					oModel.setProperty("/_ocr_result/incapacity_to/text", text);
					oModel.setProperty("/_ocr_result/incapacity_to/changed", true);
				}
				break;
			case "__xmlview2--incapacity_noticed":
				if (!oModel.getProperty("/_ocr_result/incapacity_noticed/changed")) {
					text = oView.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_noticed") + " " + tchanged;
					oModel.setProperty("/_ocr_result/incapacity_noticed/text", text);
					oModel.setProperty("/_ocr_result/incapacity_noticed/changed", true);
				}
				break;
			}

		},
		onMessagePress: function (oEvent) {
			this._getMessagePopover().openBy(oEvent.getSource());
		},
		onClearPress: function () {
			sap.ui.getCore().getMessageManager().removeAllMessages();
		},
		_getMessagePopover: function () {
			// create popover lazily (singleton)
			if (!this._oMessagePopover) {
				// create popover lazily (singleton)
				this._oMessagePopover = sap.ui.xmlfragment(this.getView().getId(),
					"de.varelmann.varelmann_scan_au.view.MessagePopover", this);
				this.getView().addDependent(this._oMessagePopover);
			}
			return this._oMessagePopover;
		},
		handleRESTART: function () {
			//location.reload(true);
			this.getOwnerComponent().getRouter().navTo("View1", {
				text: "View1"
			}, false);
		},
		handleUPLB: function (evt) {
			var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
			var text = this.getView().getModel("i18n").getResourceBundle().getText("confirm__UPLB");
			var senden = this.getView().getModel("i18n").getResourceBundle().getText("confirm_senden");

			var that = this;
			MessageBox.confirm(
				text, {
					actions: [senden, sap.m.MessageBox.Action.CANCEL],
					styleClass: bCompact ? "sapUiSizeCompact" : "",
					onClose: function (sAction) {
						if (sAction === "Senden") {
							//that.getView().setBusy(true);
							//that.sending_data(evt);
							var uuid = that.create_UUID();
							var promise1 = new Promise(function (resolve, reject) {
								that.getOwnerComponent().creating_data_backend(evt, that, uuid, resolve, reject);
							});
							promise1.then(function (result) {
								switch (result) {
								case 'success':
									var promise2 = new Promise(function (resolve, reject) {
										that.getOwnerComponent().creating_data_backend_pic(evt, that, uuid, resolve, reject);
									});
									promise2.then(function (result) {
										switch (result) {
										case 'success':
											that.getView().setBusy(false);
											// that.getView().byId("RESTART").setVisible(true);
											// that.getView().byId("UPLB").setVisible(false);
											var text = that.getView().getModel("i18n").getResourceBundle().getText("succ_send");
											var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
											MessageBox.success(text, {
												actions: [sap.m.MessageBox.Action.OK],
												styleClass: bCompact ? "sapUiSizeCompact" : "",
												onClose: function (sAction) {
													if (sAction === "OK") {
														that.handleRESTART();
														// var oView0 = sap.ui.getCore().byId("__xmlview0"); 
														// var img = oView0.byId("image1");
														// img.setSrc("");        
														that.getRouter().navTo("View1", {
															text: "View1"
														}, false);
													}
												}

											});
										}
									});
									break;
								case 'reject':
									var text = that.getView().getModel("i18n").getResourceBundle().getText("erro_send");
									var bCompact = !!that.getView().$().closest(".sapUiSizeCompact").length;
									MessageBox.error(text, {
										styleClass: bCompact ? "sapUiSizeCompact" : ""
									});
									that.getView().setBusy(false);
								}

							});

						}
					}
				}
			);
		},
		create_UUID: function () {
			var dt = new Date().getTime();
			var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (dt + Math.random() * 16) % 16 | 0;
				dt = Math.floor(dt / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
			return uuid;
		},

	});

});