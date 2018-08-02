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
 alert("here 19");
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
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
		
		
		determinStartPage();
    }
	
	
};

function determinStartPage()
{
   
    storageSet('already_initialSetup', true);
   	
	//var hideIntro = 'true';//storageGet('hideintro');
	var hideIntro = storageGet('hideintro');
	
	//var alreadyshowedintro = window.sessionStorage.getItem('alreadyshowedintro');
	
	
	
	if((hideIntro && hideIntro == 'true'))// || (alreadyshowedintro && alreadyshowedintro == 'true'))
	{
		
		alert("here 1");

	}
	else
	{
		alert("here 2");
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
{alert(pagetype);
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
