
//environment
//var environment = 'dev';
//var environment = 'prod';
var environment = 'demo';
//var environment = 'local';
//var environment = 'qa';

var _kioskversion = '3.5';
var _kiosklicense = 'store';

//var _kiosklicense = 'enterprise';
//var _kioskversion = 3.0;

//setup the whitelabel we are compilig for
var _whitelabel = 'continuetogive';
var _whitelabelfullname = 'Continue To Give';
var _whitelabeldisplayurl = 'www.ContiueToGive.com';


var _whitelabel = 'platinumgiving';
var _whitelabelfullname = 'Platinum Giving';
var _whitelabeldisplayurl = 'www.PlatinumGiving.com';

var _whitelabel = 'continuetogive';
var _whitelabelfullname = 'Continue To Give';
var _whitelabeldisplayurl = 'www.ContiueToGive.com';


var _whitelablelogo = 'img/logos/'+_whitelabel+'_logo.png';


// Global InAppBrowser reference

if(environment == 'dev')
{
	var _baseURL =  'http://dev.'+_whitelabel+'.com/';
	var _kioskURL = 'http://dev-giverapp.'+_whitelabel+'.com/';
	
}
else if(environment == 'qa')
{
	var _baseURL = 'https://qa.'+_whitelabel+'.com/';
	var _kioskURL = 'https://qa-giverapp.'+_whitelabel+'.com/';
}
else if(environment == 'demo')
{
	var _baseURL = 'https://demo.'+_whitelabel+'.com/';
	var _kioskURL = 'https://demo-giverapp.'+_whitelabel+'.com/';
}
else if(environment == 'local')
{
	var _baseURL = 'http://local.workingbranch.'+_whitelabel+'.com/';
	var _kioskURL = 'http://local.giverapp.workingbranch.'+_whitelabel+'.com/';
}
else if(environment == 'prod')
{
	var _baseURL = 'https://www.'+_whitelabel+'.com/';
	//if(_whitelabel == 'continuetogive')
	//{
	//	var _kioskURL = 'https://www.kiosk.'+_whitelabel+'.com/';		
	//}
	//else
	//{
		var _kioskURL = 'https://giverapp.'+_whitelabel+'.com/';
	//}
}
else
{
	var _baseURL = 'http://dev.'+_whitelabel+'.com/';
	var _kioskURL = 'http://dev-giverapp.'+_whitelabel+'.com/';
}
var _kiosksetupURL = 'index.php?moduleType=Module_kiosk&task=setupkiosk';
var _forgotPinURL = 'index.php?moduleType=Module_system&task=kioskforgotpassword';
var _contactRequestURL ='index.php?moduleType=Module_kiosk&task=appcontactrequestform';
var _searchPage = 'index.php?moduleType=Module_Search&task=show.results';
var _signUpPage = 'index.php?moduleType=Module_Registration&task=regflow_church&registrationstep=regcreateaccount';
var _getPageInformationURL = 'router/Kiosk/getpageinformation?pageid=';
var _appCheckURL = 'appcheck.php';
var _iosEnterpriseVersionAppCheckURL = _baseURL+'iosenterpriseversionappcheck.php';
var _purchasePageURL = 'index.php?moduleType=Module_Content&task=text&article=offering-kiosk-giving-kiosk';
var _lockKioskHelpURL = 'index.php?moduleType=Module_Content&task=text&article=kiosk_ios_kiosk_mode';
var _enterpriseDownloadURL = 'itms-services://?action=download-manifest&url='+_baseURL+_whitelabel+'_offering_kiosk.plist';

var browserwindow = null;
var browserwindow = null;
var _storagePageID = "storagePageID";
var _storageDisplayName = "storageDisplayName";
var _storageFullURL = "storageFullURL";
var _storagePin = 'pin';
var DEV_MODE = false;

//load the logos
/*
$( document ).ready(function() {
   $( "._whitelablelogoclass" ).attr( "src", _whitelablelogo );
            
});
*/

