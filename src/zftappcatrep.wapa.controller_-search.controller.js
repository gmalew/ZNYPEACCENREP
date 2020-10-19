sap.ui.define([                                                                                                                                                                                                                                                
    "nype/ft/ac/controller/BaseController",                                                                                                                                                                                                                    
    "sap/ui/model/json/JSONModel"                                                                                                                                                                                                                              
], function (BaseController, JSONModel) {                                                                                                                                                                                                                      
    "use strict";                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                               
    return BaseController.extend("nype.ft.ac.controller.Search", {                                                                                                                                                                                             
        onInit: function () {                                                                                                                                                                                                                                  
            var oViewModel = new JSONModel({                                                                                                                                                                                                                   
                semanticAction: "",                                                                                                                                                                                                                            
                semanticObject: "",                                                                                                                                                                                                                            
                uiVersion: "1.52",                                                                                                                                                                                                                             
                libSource: ""                                                                                                                                                                                                                                  
            });                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                               
            this.setModel(oViewModel, "view");                                                                                                                                                                                                                 
            this.getRouter().getRoute("search").attachMatched(this._onObjectMatched, this);                                                                                                                                                                    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                                                                                                                                                                       
            this.showVersionWarning();                                                                                                                                                                                                                         
            this.setAboutData();                                                                                                                                                                                                                               
        },                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
        onSearchPress: function () {                                                                                                                                                                                                                           
            var oViewModel = this.getModel("view");                                                                                                                                                                                                            
                                                                                                                                                                                                                                                               
            var sSemanticObject = oViewModel.getProperty("/semanticObject");                                                                                                                                                                                   
            var sSemanticAction = oViewModel.getProperty("/semanticAction");                                                                                                                                                                                   
                                                                                                                                                                                                                                                               
            this.getRouter().navTo("systems", {                                                                                                                                                                                                                
                semanticObject: encodeURIComponent(sSemanticObject),                                                                                                                                                                                           
                semanticAction: encodeURIComponent(sSemanticAction)                                                                                                                                                                                            
            })                                                                                                                                                                                                                                                 
        },                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
        _onObjectMatched: function () {                                                                                                                                                                                                                        
            this.getOwnerComponent().setApplicationLayout(0);                                                                                                                                                                                                  
        },                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
        showVersionWarning: function () {                                                                                                                                                                                                                      
            var oVersion = sap.ui.getCore().getConfiguration().getVersion();                                                                                                                                                                                   
            var oModel = this.getModel("view");                                                                                                                                                                                                                
            var sMinorVersion = oVersion.getMajor() + "." + oVersion.getMinor();                                                                                                                                                                               
            if (sMinorVersion !== "1.52"){                                                                                                                                                                                                                     
                oModel.setProperty("/uiVersion", sMinorVersion);                                                                                                                                                                                               
                oModel.setProperty("/libSource", this._getLibSource());                                                                                                                                                                                        
                this.getView().byId("searchPage").setShowFooter(true);                                                                                                                                                                                         
            }                                                                                                                                                                                                                                                  
        },                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
        handlePopoverPress: function () {                                                                                                                                                                                                                      
            var oView = this.getView()                                                                                                                                                                                                                         
            var oButton = oView.byId("popoverButton");                                                                                                                                                                                                         
            if (!this._oPopover) {                                                                                                                                                                                                                             
                this._oPopover = sap.ui.xmlfragment("nype.ft.ac.view.fragments.WarningPopover", this);                                                                                                                                                         
                oView.addDependent(this._oPopover);                                                                                                                                                                                                            
                this._oPopover.openBy(oButton);                                                                                                                                                                                                                
            } else {                                                                                                                                                                                                                                           
                this._oPopover.openBy(oButton);                                                                                                                                                                                                                
            }                                                                                                                                                                                                                                                  
        },                                                                                                                                                                                                                                                     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                                                                                                                                                                                                               
        _getLibSource: function () {                                                                                                                                                                                                                           
            var sPath = window.location.pathname.toLowerCase();                                                                                                                                                                                                
            var sLibSource = "";                                                                                                                                                                                                                               
            if (sPath.indexOf("indexuidep.html") >= 0) {                                                                                                                                                                                                       
                sLibSource = "uideps";                                                                                                                                                                                                                         
            } else if (sPath.indexOf("indexft.html") >= 0) {                                                                                                                                                                                                   
                sLibSource = "local";                                                                                                                                                                                                                          
            } else if (sPath.indexOf("indexcdn.html") >= 0) {                                                                                                                                                                                                  
                sLibSource = "cdn";                                                                                                                                                                                                                            
            }                                                                                                                                                                                                                                                  
            return sLibSource;                                                                                                                                                                                                                                 
        },                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
        onLogoPress: function () {                                                                                                                                                                                                                             
            this._showAboutDialog();                                                                                                                                                                                                                           
        },                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
        _showAboutDialog: function () {                                                                                                                                                                                                                        
            if (!this._oAboutDialog) {                                                                                                                                                                                                                         
                this._oAboutDialog = sap.ui.xmlfragment("nype.ft.ac.view.fragments.AboutDialog");                                                                                                                                                              
                this._oAboutDialog.getEndButton().attachPress(function () {                                                                                                                                                                                    
                    this._oAboutDialog.close();                                                                                                                                                                                                                
                }.bind(this));                                                                                                                                                                                                                                 
                this.getView().addDependent(this._oAboutDialog)                                                                                                                                                                                                
            }                                                                                                                                                                                                                                                  
            this._oAboutDialog.open();                                                                                                                                                                                                                         
        },                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                               
        setAboutData: function () {                                                                                                                                                                                                                            
            var oDataModel = this.getModel();                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                               
            oDataModel.read("/VersionSet('FT')", {                                                                                                                                                                                                             
                success: function (oData) {                                                                                                                                                                                                                    
                    var oViewModel = new JSONModel({                                                                                                                                                                                                           
                        version: oData.Value                                                                                                                                                                                                                   
                    })                                                                                                                                                                                                                                         
                    this.setModel(oViewModel, "about")                                                                                                                                                                                                         
                }.bind(this)                                                                                                                                                                                                                                   
            });                                                                                                                                                                                                                                                
        }                                                                                                                                                                                                                                                      
    });                                                                                                                                                                                                                                                        
});                                                                                                                                                                                                                                                            