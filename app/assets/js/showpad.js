"use strict";



function Showpad(){

}

let apiConfig = null;

window.onShowpadLibLoaded = () => window.ShowpadLib.getShowpadApi(onShowpadApiConfig);

function onShowpadApiConfig (config)
{
    apiConfig = config;
    console.log("apiConfig:");
    console.log(apiConfig);

    // These functions are loaded in the beginning
    loadFolder('408370');

}

function arrayExists(array) {

    if (array === undefined || array.length == 0) {
        console.log('test false');
        return false;
    } else {
        console.log('test true');
        return true;
    }

}

function loadFolder(folder){

	if (ShowpadLib.getAssetsInFolder(folder, callbackFn)) {
	    // Call went through, callbackFn will be called
	}
	else {
	    // Something went wrong
	}

	function callbackFn(assets) {
	    if (assets) {
            var assetsArray = {assets: assets};
            var assetslist = JSON.stringify(assetsArray);
            logJson('assets', assetslist);
            compileTemplateToHtml("footer__nav__assets__template", "footer__nav__assets__container", assetsArray);
            initializeFooterAssets();
	    }
	    else {
	      // null was returned, something went wrong
	    }
	}

};

function logJson(type, array) {
    var stringifiedArray = JSON.stringify(array);
    console.log(type + ': ' + stringifiedArray);
}

function compileTemplateToHtml(templateId, outputContainerId, array) {

    var source              = document.getElementById(templateId).innerHTML;
    var compiledTemplate    = Handlebars.compile(source);
    var generatedHTML       = compiledTemplate(array);
    var list                = document.getElementById(outputContainerId);
    list.innerHTML          = generatedHTML;
    console.log(generatedHTML);

}
