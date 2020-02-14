sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"de/varelmann/varelmann_scan_au/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
	
], function (UIComponent, Device, models, JSONModel, MessageToast, MessageBox) {
	"use strict";

	return UIComponent.extend("de.varelmann.varelmann_scan_au.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			// set message model
			this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(), "message");
			
			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			var oModelGlobal = this.create_globalModel();
			this.setModel(oModelGlobal, "GLOBAL");
		},
		create_globalModel: function () {

			var bIsPhone = Device.system.phone;

			var oModelGlobal = new JSONModel({
				_imagewidth: bIsPhone ? "13em" : "20em",
				_w1_validated: false,
				_image_path: "",
				_ocr_result: {},
				_image: {},
				_w2_validated: false,
				_w2_back: false,
				_w3_validated: false,
				_w3_back: false,
				_w3_toggle: false
				
				// _w2_items_visible: false,
				// _imagevisible: false,
				// _messagestrip_width: bIsPhone ? "16em" : "20em",
				// _toggleButtons0: false,
			});
			return oModelGlobal;
		},
		step1Complete: function (OEVENT, THIS) {
			var oView0 = sap.ui.getCore().byId("__xmlview0"); //Step1
			var oView1 = THIS.getView();

			var that = this;
			var oModel = oView1.getModel("global");

			var promise1 = new Promise(function (resolve, reject) {
				oModel.setProperty("/_w2_back", false);
				oModel.setProperty("/_w2_validated", false);
				that._toggleradar(THIS, "ON");
				that.uploadPictureV2(oView0, oView1, resolve, reject);
			});
			promise1.then(function (result) {
				var success = that.getModel("i18n").getResourceBundle().getText("pic_success");
				//var success2 = that.getModel("i18n").getResourceBundle().getText("pic_success2");
				var error = that.getModel("i18n").getResourceBundle().getText("pic_error");

				that._toggleradar(THIS, "OFF");

				//var oModel = that.getModel("GLOBAL");
				
				
				//$('.fingerprint').toggleClass('scanning');

				switch (result) {
				case 'success':
					oModel.setProperty("/_w2_validated", true);
					oModel.setProperty("/_w2_back", true);
					MessageToast.show(success);
					// setTimeout(function () {
					// 	MessageToast.show(success2);
					// }, 3000);
					setTimeout(function () {
						var oRouter = that.getRouter();
						oRouter.navTo("View3", {
									text: "Analyse"
								});
					}, 3000);
					
					
					break;
				case 'error':
					oModel.setProperty("/_w2_validated", false);
					oModel.setProperty("/_w2_back", true);
					MessageBox.confirm(
						error, {
							actions: [sap.m.MessageBox.Action.OK],
							onClose: function (sAction) {
								if (sAction === "OK") {
									that.getRouter().navTo("View1", {}, false);
								}
							}
						}
					);
				}

			});

		},
		_toggleradar: function (THIS, MODE) {
			var fb = THIS.getView().byId("FB1");
			if (MODE === "ON") {
				fb.addStyleClass("scanning");
			} else {
				fb.removeStyleClass("scanning");
			}
			// var oModel = this.getModel("GLOBAL");
			// var togglestate = oModel.getProperty("/_radar_toggle");
			// if (!togglestate) {
			// 	//$('.fingerprint').toggleClass('scanning');
			// 	oModel.getProperty("/_radar_toggle", true);
			// } else {
			// 	oModel.getProperty("/_radar_toggle", false);
			// }
		},
		uploadPictureV2: function (OVIEW0, OVIEW1, fnResolve, fnReject) {

			var oFileUploader = OVIEW0.byId("fileUploader1");
			var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];

			// var success = OVIEW1.getModel("i18n").getResourceBundle().getText("pic_success");
			// var error = OVIEW1.getModel("i18n").getResourceBundle().getText("pic_error");

			var reader = new FileReader();
			reader.onload = (function () {
				return function (evt) {

					var server_url = "/OCRV2";

					var formdata = new FormData();
					formdata.append('image', file);

					$.ajax({
						crossDomain: true,
						url: server_url,
						type: "POST",
						cache: false,
						contentType: false,
						processData: false,
						data: formdata,
						success: function (data) {
							if (data.status === "OK") {

								var Appdata = {
									"status": data.status,
									"error_description": data.error_description,
									"incapacity_from": {
										"text": OVIEW1.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_from"),
										"value": data.ocr_result.incapacity_from.value,
										"uncertain": data.ocr_result.incapacity_from.uncertain,
										"changed": false
									},
									"incapacity_to": {
										"text": OVIEW1.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_to"),
										"value": data.ocr_result.incapacity_to.value,
										"uncertain": data.ocr_result.incapacity_to.uncertain,
										"changed": false
									},
									"incapacity_noticed": {
										"text": OVIEW1.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_noticed"),
										"value": data.ocr_result.incapacity_noticed.value,
										"uncertain": data.ocr_result.incapacity_noticed.uncertain,
										"changed": false
									},
									"initial_certificate": {
										"text": OVIEW1.getModel("i18n").getResourceBundle().getText("ocr_result-initial_certificate"),
										"value": data.ocr_result.initial_certificate.value,
										"uncertain": data.ocr_result.initial_certificate.uncertain,
										"changed": false
									},
									"renewed_certificate": {
										"text": OVIEW1.getModel("i18n").getResourceBundle().getText("ocr_result-renewed_certificate"),
										"value": data.ocr_result.renewed_certificate.value,
										"uncertain": data.ocr_result.renewed_certificate.uncertain,
										"changed": false
									},
									"workplace_accident": {
										"text": OVIEW1.getModel("i18n").getResourceBundle().getText("ocr_result-workplace_accident"),
										"value": data.ocr_result.workplace_accident.value,
										"uncertain": data.ocr_result.workplace_accident.uncertain,
										"changed": false
									},
									"doctor_assigned": {
										"text": OVIEW1.getModel("i18n").getResourceBundle().getText("ocr_result-doctor_assigned"),
										"value": data.ocr_result.doctor_assigned.value,
										"uncertain": data.ocr_result.doctor_assigned.uncertain,
										"changed": false
									}
								};

								if (Appdata.incapacity_from.value === null) {
									Appdata.incapacity_from.value = "2099-01-01";
								}
								if (Appdata.incapacity_to.value === null) {
									Appdata.incapacity_to.value = "2099-01-01";
								}
								if (Appdata.incapacity_noticed.value === null) {
									Appdata.incapacity_noticed.value = "2099-01-01";
								}

								if (Appdata.initial_certificate.value === null) {
									Appdata.initial_certificate.value = false;
								}
								if (Appdata.renewed_certificate.value === null) {
									Appdata.renewed_certificate.value = false;
								}
								if (Appdata.workplace_accident.value === null) {
									Appdata.workplace_accident.value = false;
								}
								if (Appdata.doctor_assigned.value === null) {
									Appdata.doctor_assigned.value = false;
								}

								var oModel = OVIEW1.getModel("global");
								oModel.setProperty("/_ocr_result", Appdata);
								oModel.setProperty("/_image", file);

								setTimeout(function () {
									fnResolve("success");
								}, 2000);

							} else {
								setTimeout(function () {
									fnResolve("error");
								}, 2000);
							}
						},
						error: function (request, textStatus, errorThrown) {
							setTimeout(function () {
								fnResolve("error");
							}, 2000);
						}
					});
				};
			})(file);

			reader.readAsDataURL(file);
			return;
		},
		creating_data_backend: function (evt, THIS, UUID, fnResolve, fnReject) {
			var oModel = this.getModel("au");
			var oModel_g = this.getModel("GLOBAL");

			sap.ui.getCore().getMessageManager().removeAllMessages();

			var oData = oModel_g.getProperty("/_ocr_result");

			var oEntry = {
				"ImportId": UUID,
				"ImportDate": "NEU",
				"ImportTime": "NEU",
				"ImportUser": "NEU",
				"IncapacityFrom": oData.incapacity_from.value,
				"IncapacityFrom_changed": oData.incapacity_from.changed,
				"IncapacityTo": oData.incapacity_to.value,
				"IncapacityTo_changed": oData.incapacity_to.changed,
				"IncapacityNoticed": oData.incapacity_noticed.value,
				"IncapacityNoticed_changed": oData.incapacity_noticed.changed,
				"InitialCertificate": oData.initial_certificate.value,
				"InitialCertificate_changed": oData.initial_certificate.changed,
				"RenewedCertificate": oData.renewed_certificate.value,
				"RenewedCertificate_changed": oData.renewed_certificate.changed,
				"WorkplaceAccident": oData.workplace_accident.value,
				"WorkplaceAccident_changed": oData.workplace_accident.changed,
				"DoctorAssigned": oData.doctor_assigned.value,
				"DoctorAssigned_changed": oData.doctor_assigned.changed
			};

			var that = THIS;
			that.getView().setBusy(true);

			oModel.create("/AU_DatenSet", oEntry, {
				method: "POST",
				success: function (data) {
					//that.getView().setBusy(false);
					fnResolve("success");
					//sap.ui.controller("project_name.view_name").function_name();
				},
				error: function (e) {
					//that.getView().setBusy(false);
					fnResolve("reject");
				}
			});

		},
		creating_data_backend_pic: function (evt, THIS, UUID, fnResolve, fnReject) {
			var oModel = this.getModel("au");
			var oView = sap.ui.getCore().byId("__xmlview0");
			var oFileUploader = oView.byId("fileUploader1");
			var file = jQuery.sap.domById(oFileUploader.getId() + "-fu").files[0];
			var BASE64_MARKER = 'data:' + file.type + ';base64,';
			var filename = file.name;
			var server_url = "/sap/opu/odata/VBGMBH/AU_ODATA_SRV/AU_DatenSet('" + UUID + "')/TOFOTO";
			//server_url = window.location.origin + server_url;
			var token = oModel.getHeaders()['x-csrf-token'];

			var reader = new FileReader();
			reader.onload = (function (theFile) {

				return function (evt) {

					var base64Index = evt.target.result.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
					var base64 = evt.target.result.substring(base64Index);

					var oHeaders = {
						"x-csrf-token": token,
						"slug": file.name,
						"X-Requested-With": "XMLHttpRequest",
						"Content-Type": file.type
					};

					$.ajax({
						type: 'POST',
						url: server_url,
						headers: oHeaders,
						cache: false,
						contentType: file.type,
						dataType: "text",
						processData: false,
						data: file,
						success: function (data) {
							//console.log(data);
							fnResolve("success");
						},
						error: function (data) {
							//console.log(data);
							fnResolve("error");
						}
					});
				};
			})(file);
			reader.readAsDataURL(file);
			return;
		}
		
	});
});