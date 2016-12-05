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
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        setapplesafe(runapp);

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

    //alert(_kioskURL);
    target = "_blank";
    if(isApple())
    {
        target = "_blank";
    }
    browserwindow = cordova.InAppBrowser.open(url, "_blank", 'toolbar=no,location=no');
    //browserwindow.addEventListener('exit', iabCloseDonation);
    browserwindow.addEventListener('loadstop', iabLoadStopDonation);
    browserwindow.addEventListener('loadstart', iabLoadDonationPageInSystem); 


}

function determinStartPage()
{

    storageSet('already_initialSetup', true);
    storageSet('hideintro', true);

    //var hideIntro = 'true';//storageGet('hideintro');
    var hideIntro = storageGet('hideintro');

    //var alreadyshowedintro = window.sessionStorage.getItem('alreadyshowedintro');
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
    window.open(url, target, location); 
    if(callback)
    {
        callback(lasturl);    
    } 

}

function iabLoadDonationPageInSystem(event) { 

    cururl = event.url;
    lasturl = storageGet('lasturl', _kioskURL);
    storageSet('lasturl', cururl);
    //navigator.notification.activityStart("Loading", "");
    //only do this if it is not apple safe

    if(!isApple())
    {
        navigator.notification.activityStart("Loading", "");

    }
    
    if(cururl.indexOf("backtoapp") != -1)
    {
        browserwindow.close();   
    }
    if(!getAppleSafe())
    {
        cururl = event.url;

        if(cururl.indexOf("donation_prompt") != -1)
        {

            //opengiversapp();
            //window.open(_kioskURL, "_blank",'location=no');
            alert("Taking you to the donation webpage to donate there per Apple's donation terms of use.");
            openPage(cururl, "_system", "",false, opengiversapp, lasturl);


        }
    }
}
function iabLoadStopDonation(event)
{
    if(!isApple())
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

    if(((isapple && (_kiosklicense == 'store')) ) && ( !(applesafestorage == 'true') || !(applesafeversion == _kioskversion) ))
    {
        //if it came in here, we set the flow to false until we know otherwise
        storageSet('applesafestorage', 'false');

        //then we need to check the version
        var urltocall = _baseURL + _appCheckURL + "?kioskversion="+_kioskversion;

        $.ajax({
            url: urltocall,
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
    var result = ((devicetype.toLowerCase().indexOf("iphone") >= 0) || (devicetype.toLowerCase().indexOf("ipad") >= 0) || (devicetype.toLowerCase().indexOf("ipod") >= 0) || (devicetype.toLowerCase().indexOf("ios") >= 0));

    return result
}
