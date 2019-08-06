sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/export/Spreadsheet"
], function (Controller,Spreadsheet) {
	"use strict";

	return Controller.extend("com.mtk.jingUI5_table.controller.List", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.mtk.jingUI5_table.view.List
		 */
		onInit: function () {
			var jsonModel = new sap.ui.model.json.JSONModel({dateFrom:null,dateTo:null});
			this.getView().setModel(jsonModel,"date");
		},
		
		_getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		onItemPressed: function (oEvt) {
			var oItem, oCtx;
			oItem = oEvt.getSource();
			oCtx = oItem.getBindingContext();
			this._getRouter().navTo("RouteDetail", { SO : oCtx.getProperty("SalesOrderID"),
													Item: oCtx.getProperty("ItemPosition")});
		},

		onSearch: function () {
			var ofilter = new sap.ui.model.Filter({
				path: "CreationDateTime",
				operator: sap.ui.model.FilterOperator.BT,
				value1: this.byId("DP11").getDateValue(),
				value2: this.byId("DP21").getDateValue()
			});
			var oTable = this.byId("soTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(ofilter);
		},

		onSearchTable: function () {
			var dateFrom = this.byId("DP1").getDateValue();
			var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
        			pattern: "yyyy-MM-dd"
					});
			dateFrom = dateFormat.format(new Date(dateFrom), true);
			var dateTo = this.byId("DP2").getDateValue();
			dateTo = dateFormat.format(new Date(dateTo), true);
			var ofilter = new sap.ui.model.Filter({
				path: "CreationDateTime",
				operator: sap.ui.model.FilterOperator.BT,
				value1: dateFrom,
				value2: dateTo
			});
			var oTable = this.byId("soTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(ofilter);
		},

		handleValidFromChange: function (oEvent) {
			var oDatePicker = oEvent.getSource(),
				sValue = oDatePicker.getDateValue(),
				sToDatePicker = "DP2",
				oToDatePicker = this.byId(sToDatePicker);
			oToDatePicker.setMinDate(sValue);
		},

		handleValidToChange: function (oEvent) {
			var oDatePicker = oEvent.getSource(),
				sValue = oDatePicker.getDateValue(),
				sFromDatePicker = "DP1",
				oFromDatePicker = this.byId(sFromDatePicker);
			oFromDatePicker.setMaxDate(sValue);
		},

		handleValidFromChange1: function (oEvent) {
			var oDatePicker = oEvent.getSource(),
				sValue = oDatePicker.getDateValue(),
				sToDatePicker = "DP21",
				oToDatePicker = this.byId(sToDatePicker);
			oToDatePicker.setMinDate(sValue);
		},

		handleValidToChange1: function (oEvent) {
			var oDatePicker = oEvent.getSource(),
				sValue = oDatePicker.getDateValue(),
				sFromDatePicker = "DP11",
				oFromDatePicker = this.byId(sFromDatePicker);
			oFromDatePicker.setMaxDate(sValue);
		},
		onExcelExport: function(){
			var aCols, oRowBinding, oSettings, oTable;
			oTable = this.byId("soTable");
			oRowBinding = oTable.getBinding("items");//this is important! bindingInfo

			aCols = this._createColumnConfig();

			var oModel = oTable.getModel();
			var oModelInterface = oModel.getInterface();

			oSettings = {
				workbook: { columns: aCols },
				dataSource: {
					type: "oData",
					dataUrl: oRowBinding.getDownloadUrl ? oRowBinding.getDownloadUrl() : null,
					serviceUrl: oModelInterface.sServiceUrl,
					headers: oModelInterface.getHeaders ? oModelInterface.getHeaders() : null,
					count: oRowBinding.getLength ? oRowBinding.getLength() : null,
					useBatch: oModelInterface.bUseBatch,
					sizeLimit: oModelInterface.iSizeLimit
				},
				worker: true ,
				fileName: "SO Item.xlsx"
			};

			new Spreadsheet(oSettings).build();			
		},
		_createColumnConfig: function() {
			var aCols = [];

			aCols.push({
				label: "Sales Order",
				property: "SalesOrderID",
				type: "string"
			});

			aCols.push({
				label: "Business Partner",
				type: "string",
				property: "CompanyName"
			});

			aCols.push({
				property: "CreationDateTime",
				type: "date",
				format: "yyyy/mm/dd"
			});
			
			aCols.push({
				property: "GrossAmount",
				type: "currency",
				unitProperty: "CurrencyCode",
				displayUnit: false,
				delimiter: true
			});
			
			aCols.push({
				property: "CurrencyCode",
				type: "string"
			});
			
/*			aCols.push({
				label: 'Full name',
				property: ['Lastname', 'Firstname'],
				type: 'string',
				template: '{0}, {1}'
			});

			aCols.push({
				property: 'Salary',
				type: 'number',
				scale: 2,
				delimiter: true
			});*/

/*			aCols.push({
				property: 'Active',
				type: 'boolean',
				trueValue: 'YES',
				falseValue: 'NO'
			});
*/
			return aCols;
		}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf com.mtk.jingUI5_table.view.List
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.mtk.jingUI5_table.view.List
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.mtk.jingUI5_table.view.List
		 */
		//	onExit: function() {
		//
		//	}

	});

});