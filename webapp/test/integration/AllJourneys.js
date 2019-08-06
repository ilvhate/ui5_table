/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"com/mtk/personalTravel/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/mtk/personalTravel/test/integration/pages/App",
	"com/mtk/personalTravel/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.mtk.personalTravel.view.",
		autoWait: true
	});
});