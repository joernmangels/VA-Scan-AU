sap.ui.define(["sap/ui/core/UIComponent","sap/ui/Device","de/varelmann/varelmann_scan_au/model/models","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/m/MessageBox"],function(e,t,a,c,r,i){"use strict";return e.extend("de.varelmann.varelmann_scan_au.Component",{metadata:{manifest:"json"},init:function(){e.prototype.init.apply(this,arguments);this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"message");this.getRouter().initialize();this.setModel(a.createDeviceModel(),"device");var t=this.create_globalModel();this.setModel(t,"GLOBAL")},create_globalModel:function(){var e=t.system.phone;var a=new c({_imagewidth:e?"13em":"20em",_w1_validated:false,_image_path:"",_ocr_result:{},_image:{},_w2_validated:false,_w2_back:false,_w3_validated:false,_w3_back:false,_w3_toggle:false});return a},step1Complete:function(e,t){var a=sap.ui.getCore().byId("__xmlview0");var c=t.getView();var n=this;var o=c.getModel("global");var s=new Promise(function(e,r){o.setProperty("/_w2_back",false);o.setProperty("/_w2_validated",false);n._toggleradar(t,"ON");n.uploadPictureV2(a,c,e,r)});s.then(function(e){var a=n.getModel("i18n").getResourceBundle().getText("pic_success");var c=n.getModel("i18n").getResourceBundle().getText("pic_error");n._toggleradar(t,"OFF");switch(e){case"success":o.setProperty("/_w2_validated",true);o.setProperty("/_w2_back",true);r.show(a);setTimeout(function(){var e=n.getRouter();e.navTo("View3",{text:"Analyse"})},3e3);break;case"error":o.setProperty("/_w2_validated",false);o.setProperty("/_w2_back",true);i.confirm(c,{actions:[sap.m.MessageBox.Action.OK],onClose:function(e){if(e==="OK"){n.getRouter().navTo("View1",{},false)}}})}})},_toggleradar:function(e,t){var a=e.getView().byId("FB1");if(t==="ON"){a.addStyleClass("scanning")}else{a.removeStyleClass("scanning")}},uploadPictureV2:function(e,t,a,c){var r=e.byId("fileUploader1");var i=jQuery.sap.domById(r.getId()+"-fu").files[0];var n=new FileReader;n.onload=function(){return function(e){var c="/OCRV2";var r=new FormData;r.append("image",i);$.ajax({crossDomain:true,url:c,type:"POST",cache:false,contentType:false,processData:false,data:r,success:function(e){if(e.status==="OK"){var c={status:e.status,error_description:e.error_description,incapacity_from:{text:t.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_from"),value:e.ocr_result.incapacity_from.value,uncertain:e.ocr_result.incapacity_from.uncertain,changed:false},incapacity_to:{text:t.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_to"),value:e.ocr_result.incapacity_to.value,uncertain:e.ocr_result.incapacity_to.uncertain,changed:false},incapacity_noticed:{text:t.getModel("i18n").getResourceBundle().getText("ocr_result-incapacity_noticed"),value:e.ocr_result.incapacity_noticed.value,uncertain:e.ocr_result.incapacity_noticed.uncertain,changed:false},initial_certificate:{text:t.getModel("i18n").getResourceBundle().getText("ocr_result-initial_certificate"),value:e.ocr_result.initial_certificate.value,uncertain:e.ocr_result.initial_certificate.uncertain,changed:false},renewed_certificate:{text:t.getModel("i18n").getResourceBundle().getText("ocr_result-renewed_certificate"),value:e.ocr_result.renewed_certificate.value,uncertain:e.ocr_result.renewed_certificate.uncertain,changed:false},workplace_accident:{text:t.getModel("i18n").getResourceBundle().getText("ocr_result-workplace_accident"),value:e.ocr_result.workplace_accident.value,uncertain:e.ocr_result.workplace_accident.uncertain,changed:false},doctor_assigned:{text:t.getModel("i18n").getResourceBundle().getText("ocr_result-doctor_assigned"),value:e.ocr_result.doctor_assigned.value,uncertain:e.ocr_result.doctor_assigned.uncertain,changed:false}};if(c.incapacity_from.value===null){c.incapacity_from.value="2099-01-01"}if(c.incapacity_to.value===null){c.incapacity_to.value="2099-01-01"}if(c.incapacity_noticed.value===null){c.incapacity_noticed.value="2099-01-01"}if(c.initial_certificate.value===null){c.initial_certificate.value=false}if(c.renewed_certificate.value===null){c.renewed_certificate.value=false}if(c.workplace_accident.value===null){c.workplace_accident.value=false}if(c.doctor_assigned.value===null){c.doctor_assigned.value=false}var r=t.getModel("global");r.setProperty("/_ocr_result",c);r.setProperty("/_image",i);setTimeout(function(){a("success")},2e3)}else{setTimeout(function(){a("error")},2e3)}},error:function(e,t,c){setTimeout(function(){a("error")},2e3)}})}}(i);n.readAsDataURL(i);return},creating_data_backend:function(e,t,a,c,r){var i=this.getModel("au");var n=this.getModel("GLOBAL");sap.ui.getCore().getMessageManager().removeAllMessages();var o=n.getProperty("/_ocr_result");var s={ImportId:a,ImportDate:"NEU",ImportTime:"NEU",ImportUser:"NEU",IncapacityFrom:o.incapacity_from.value,IncapacityFrom_changed:o.incapacity_from.changed,IncapacityTo:o.incapacity_to.value,IncapacityTo_changed:o.incapacity_to.changed,IncapacityNoticed:o.incapacity_noticed.value,IncapacityNoticed_changed:o.incapacity_noticed.changed,InitialCertificate:o.initial_certificate.value,InitialCertificate_changed:o.initial_certificate.changed,RenewedCertificate:o.renewed_certificate.value,RenewedCertificate_changed:o.renewed_certificate.changed,WorkplaceAccident:o.workplace_accident.value,WorkplaceAccident_changed:o.workplace_accident.changed,DoctorAssigned:o.doctor_assigned.value,DoctorAssigned_changed:o.doctor_assigned.changed};var l=t;l.getView().setBusy(true);i.create("/AU_DatenSet",s,{method:"POST",success:function(e){c("success")},error:function(e){c("reject")}})},creating_data_backend_pic:function(e,t,a,c,r){var i=this.getModel("au");var n=sap.ui.getCore().byId("__xmlview0");var o=n.byId("fileUploader1");var s=jQuery.sap.domById(o.getId()+"-fu").files[0];var l="data:"+s.type+";base64,";var u=s.name;var d="/sap/opu/odata/VBGMBH/AU_ODATA_SRV/AU_DatenSet('"+a+"')/TOFOTO";var _=i.getHeaders()["x-csrf-token"];var g=new FileReader;g.onload=function(e){return function(e){var t=e.target.result.indexOf(l)+l.length;var a=e.target.result.substring(t);var r={"x-csrf-token":_,slug:s.name,"X-Requested-With":"XMLHttpRequest","Content-Type":s.type};$.ajax({type:"POST",url:d,headers:r,cache:false,contentType:s.type,dataType:"text",processData:false,data:s,success:function(e){c("success")},error:function(e){c("error")}})}}(s);g.readAsDataURL(s);return}})});