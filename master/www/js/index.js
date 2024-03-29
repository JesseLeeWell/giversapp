/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var browserwindow = null;
  
var app = {
    eventId: "",
    // Application Constructor
    initialize: function() {
         
        this.bindEvents();
            
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("resume", this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //console.log("ready");
        app.receivedEvent('deviceready');
    },
    onResume: function() {
        //console.log("resume");
        app.receivedEvent('resume');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        app.eventId = id;
        if(id == "deviceready" || id == "resume")
        {
            setapplesafe(runapp);
            app.handleBranch();
        }
    },
    handleBranch: function() {
        //console.log("handle");
        // Branch initialization
        Branch.initSession().then(function(data) {
            if (data['+clicked_branch_link']) {
                // read deep link data on click
                if(data['page']){
                    //console.log('Deep Link Data: ' + JSON.stringify(data));
                    var fullUrl = _kioskURL+data['page'];
                    opengiversapp(fullUrl);
                }
            }
        });
      }
    


};


function runapp()
{
    
    //setapplesafe();
    //alert(getAppleSafe());
    setDeviceSpecificClasses();
    determinStartPage();   

}

function opengiversapp(url)
{
    if(url)
    {

    }
    else
    {
        var url =_kioskURL;    
    }

    target = "_blank";
    //target = "_self";

   browserwindow = cordova.InAppBrowser.open(url, target, 'toolbar=no,location=no');
   browserwindow.addEventListener('exit', function(){
        $('#main').show();
   });
   //browserwindow = window.open(url, target, 'toolbar=no,location=no');
  
    //browserwindow.addEventListener('exit', iabCloseDonation);
    browserwindow.addEventListener('loadstop', iabLoadStopDonation);
    browserwindow.addEventListener('loadstart', iabLoadDonationPageInSystem); 

    dontShowAgain();
}

function determinStartPage()
{
    
    storageSet('already_initialSetup', true);
    storageSet('hideintro', true);

    //var hideIntro = 'true';//storageGet('hideintro');
    var hideIntro = storageGet('hideintro');

    var lasturl = DEV_MODE ? false : storageGet('lasturl', _kioskURL);
    var dont_show_again = DEV_MODE ? false : storageGet('dont_show_again');
    
    if(lasturl || dont_show_again){
        var url = lasturl.replace('#backtoapp', '');//if user clicked back
        if( app.eventId != 'resume' ){
            opengiversapp(url);
        }
    }

    if(dont_show_again != 'true'){
        $('#main').show();
    }

    //var alreadyshowedintro = window.sessionStorage.getItem('alreadyshowedintro');
    /*
    if((hideIntro && hideIntro == 'true'))// || (alreadyshowedintro && alreadyshowedintro == 'true'))
    {

        // opengiversapp();

    }
    else
    {

        //set the session storage that it showed the intro
        //window.sessionStorage.setItem("alreadyshowedintro", "true");

        jQuery.mobile.loading( 'show', {
            text: 'Loading Intro',
            textVisible: true,
            theme: 'a',
            html: ""
        });
        setTimeout( function() {
            loadMoreInfo('');

            }, 2000 );


    }
    */


}

function loadMoreInfo(pagetype)
{
    storageSet('hideintro', true);
    switch(pagetype)
    {

        case 'dialog':
            alert(pagetype);
            $(':mobile-pagecontainer').pagecontainer('change', 'intro.html', {
                transition: 'pop',
                changeHash: false,
                reverse: false,
                showLoadMsg: true,
                role: "dialog"
            });
            break;

        default:
            alert(pagetype);
            //using the click technique so that we can load it with a transistion and still use the external relation tag it has on a tags
            //alert("here");
            //$('#moreinfolink').click();
            /*
            $(':mobile-pagecontainer').pagecontainer('change', 'intro.html', {
            transition: 'slidefade',
            changeHash: false,
            reverse: false,
            showLoadMsg: true,
            rel: 'external'
            });
            */
            browserwindow = window.open('intro.html', '_self', 'location=yes');
            break;
    }


}

function storageSet(key, value)
{
    window.localStorage.setItem(key, value);
}
function storageGet(key, defaultval)
{

    //if((!window.localStorage.getItem(key) || /^\s*$/.test(window.localStorage.getItem(key))))
    if(typeof window.localStorage.getItem(key) === 'undefined' )
    {

        if((!defaultval ))
        {

            return null;
        }
        else
        {
            return defaultval
        }


    }

    return window.localStorage.getItem(key);
}

function loadLearnMorePage()
{
    var target = '_system';//(getAppleSafe())?'_blank':'_system';
    browserwindow = window.open(_baseURL, target, 'location=no');
}

function openPage(url, target, location, includebaseurl, callback, lasturl)
{
    if(includebaseurl)
    {
        url = _baseURL+url;  
    }
     if(callback)
    {
        
        callback(lasturl);  
          
    } 
    window.open(url, target, location); 
   

}

function iabLoadDonationPageInSystem(event) { 
    cururl = event.url;
    lasturl = storageGet('lasturl', _kioskURL);
    storageSet('lasturl', cururl);

    //navigator.notification.activityStart("Loading", "");
    //only do this if it is not apple safe
   
    if(!isApple() )
    {
        
        navigator.notification.activityStart("Loading", "");

    }
   

    if(cururl.indexOf("backtoapp") != -1)
    {
        //$('#main').show();
        browserwindow.close();   
    }

    if(!getAppleSafe())
    {

        cururl = event.url;

        if(cururl.indexOf("donation_prompt") != -1 )
        {

            // cururl = cururl.replace("giverapp", "www");

            //opengiversapp();
            //window.open(_kioskURL, "_blank",'location=no');
            alert("Taking you to our webpage to donate per Apple's terms of use.");
            //navigator.notification.confirm("Taking you to our webpage to donate per Apple's terms of use.", null, "Givers App", "OK");

            //window.history.go(-1);
            //openPage(cururl, "_system", "",false, opengiversapp,lasturl);
            browserwindow.close();
            
            openPage(cururl, "_system", "",false);
            opengiversapp(lasturl);
           
           

        }
    }
}
function iabLoadStopDonation(event)
{
    if(!isApple()  )
    {
        navigator.notification.activityStop();

    }
    // navigator.notification.activityStop();
}


function setDeviceSpecificClasses()
{
  
    if(isApple())
    {
        //$('.appleonly').show();

    }
    else
    {

        $(".hideapple").show();

    }
    if(getAppleSafe())
    {

        $('.applestoresafe').show();
    }
    else
    {

        $('.applestoresafe').hide();

    }
 
}
function setapplesafe(callback)
{


    var applesafeversion = storageGet('applesafeversion');
    var applesafestorage = storageGet('applesafestorage');

    //only check if ipad and and store


    var isapple = isApple();

    //if it is false, we need to check in case it changed
    //if the two app versions don't match up we need to check
    //if its true and the 2 app version match, we don't need to check    
    // if(((isapple && (_kiosklicense == 'store')) ) && ( !(applesafestorage == 'true') || !(applesafeversion == _kioskversion) ) )
    // {
    //if(((isapple && (_kiosklicense == 'store')) ) && ( !(applesafestorage == 'true') || !(applesafeversion == _kioskversion) ) )
    // {
    //checking every time so I can control this even if it was already safe
   
    if(((isapple && (_kiosklicense == 'store')) )  )
    {
        //if it came in here, we set the flow to false until we know otherwise
        storageSet('applesafestorage', 'false');

        //then we need to check the version
        var urltocall = _baseURL + _appCheckURL + "?kioskversion="+_kioskversion;

        $.ajax({
            url: urltocall,
            async: false,
            success:function(data){  
                var result = (data =='true' )?'true':'false';
               
                storageSet('applesafeversion', _kioskversion);
                storageSet('applesafestorage', result);


            }
            ,
            fail:function(data){


                storageSet('applesafeversion', _kioskversion);
                storageSet('applesafestorage', 'false');



            }
        });

    }
    else
    {

        storageSet('applesafestorage', 'true');

    }
   
     //storageSet('applesafestorage', 'true');
    if(callback)
    {

        callback();
    }   

}
function getAppleSafe()
{      
    var result = true;
    //only check if apple, otherwise its true

    var isapple = isApple();

    if( isapple && (_kiosklicense == 'store'))
    {
        result = (storageGet('applesafestorage') == 'true')?true:false;
    }

    return result;
}

function isApple()
{

    var devicetype = device.platform; 
    //alert(devicetype);

    var result = ((devicetype.toLowerCase().indexOf("iphone") >= 0) || (devicetype.toLowerCase().indexOf("ipad") >= 0) || (devicetype.toLowerCase().indexOf("ipod") >= 0) || (devicetype.toLowerCase().indexOf("ios") >= 0));

    return result
}

function changeUrl(url){
    var fullUrl = _kioskURL+url;
    console.log(fullUrl);
    storageSet('lasturl', fullUrl);
    setTimeout(function(){
        opengiversapp(fullUrl);
    }, 0);
}

function dontShowAgain(){
    storageSet('dont_show_again', 'true');
    $('#main').hide();
}

 app.initialize();
