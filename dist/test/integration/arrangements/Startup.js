sap.ui.define(["sap/ui/test/Opa5"],function(a){"use strict";return a.extend("de.varelmann.varelmann_scan_au.test.integration.arrangements.Startup",{iStartMyApp:function(a){var n=a||{};n.delay=n.delay||50;this.iStartMyUIComponent({componentConfig:{name:"de.varelmann.varelmann_scan_au",async:true},hash:n.hash,autoWait:n.autoWait})}})});