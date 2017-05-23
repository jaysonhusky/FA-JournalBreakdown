// ==UserScript==
// @name         FA Journal Breakdown
// @namespace    FurAffinity
// @version      11.0
// @description  Provides a breakdown of your journal list
// @author       JaysonHusky
// @grant        GM_getValue
// @grant        GM_setValue
// @match        *://www.furaffinity.net/msg/others/*
// @match        *://www.furaffinity.net/controls/user-settings/*
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==
(function(){
    'use strict';
    var TemplateStyle=$('body').attr('data-static-path');
    // Setup keywords
		var myKeywords;
    // Creating the var's
    var scx,theStreamCount,strtouc,nkm;
	// Begin loading
		function FAJBM_Load(){
			var user_defined_keywords=GM_getValue('fajbm');
			if(user_defined_keywords>""){
				myKeywords=user_defined_keywords.split(",");
				$('#fajbm_settings').val(user_defined_keywords.replace(/,/g,", "));
			}
			else {
				console.log("Error occured while attempting to retrieve user keywords, ERR: KEYS_UNDEFINED");
                //return "undefined";
			}
		}
	  // Add Special Stylesheet for keywords
		var JaysCSS=document.createElement('style');
		var jayStyle=document.createTextNode(`
			i.fajbm{
				margin-right:5px;
				padding:1px;
			}
			span.faf-update-status{
				font-weight:bold;
				color:#04fd04;
				float:right;
				clear:right;
				display:none;
			}
			#customfacontrolpanel{
				margin-top:20px;
			}
			.JaySB{
				background: #36393d;
				padding: 7px 14px 14px 14px;
			}
			#speciallisting li{
				margin-left:20px;
			}
		`);
		JaysCSS.appendChild(jayStyle);
		document.getElementsByTagName('body')[0].appendChild(JaysCSS);
	// Save settings
	function FAJBM_SaveSettings(fajbm){
		GM_setValue('fajbm',fajbm);
	}
	// Load Control Panel
		var pathx=window.location.pathname;
		if(~pathx.indexOf("/controls/user-settings/")){
			// Update
			$(document.body).on('click','#fajbm_saveit',function() {
				var fajbm_set=$("input[name='fajbm_setting']").val().replace(/ /g,"").replace(/  /g,"");
				FAJBM_SaveSettings(fajbm_set);
				$('.faf-update-status').fadeIn('slow');
					setTimeout(function(){
						$('.faf-update-status').fadeOut('slow');
					}, 5000);
				});
				if(TemplateStyle=="/themes/beta"){
				$('.content .section-body').after(`
					<div id="customfacontrolpanel" class="JaySB">
						<h2>FA Journal Breakdown Control Panel <span class="faf-update-status">Update successful!</span></h2>
						<br/>
						<h4>Custom Keywords to track in journal titles</h4>
						<div class="control-panel-option">
							<div class="control-panel-item-1">
								<p>
								<ul id="speciallisting">
								<li>Keywords must be comma seperated.</li>
								<li>Must match username and not URL style.</li>
								<li>Singular terms will match plurals.</li>
								</ul>
								</p>
							</div>
							<div class="control-panel-item-2">
								<input type="text" name="fajbm_setting" id="fajbm_settings" class="textbox" placeholder="Example: free,fender,commission" style="height:36px;padding:5px; width:300px" />
							</div>
						</div>
						<div class="button-nav">
							<div class="button-nav-item">
								<input class="button mobile-button" id="fajbm_saveit" type="button" value="Save Journal Breakdown Settings*">
							</div>
						</div>
						<br/><b>*Updates take effect from the next page load.</b><br/><span style="font-size:10px;position:relative;bottom:0;right:0;">FA Journal Breakdown by <a href="https://www.furaffinity.net/user/feralfrenzy" style="border-bottom:1px dotted white;">JaysonHusky</a></span>
					</div><br/><br/>`);
				}
				else {
					$('.footer').before(`<table cellpadding="0" cellspacing="1" border="0" class="section maintable" style="width: 60%; margin: 0 auto;">
					<tbody>
						<tr>
							<td height="22" class="cat links">&nbsp;
								<strong>FA Journal Breakdown - Control Panel</strong>
								<span class="faf-update-status">Update successful!</span>
							</td>
						</tr>
						<tr>
							<td class="alt1 addpad ucp-site-settings" align="center">
								<table cellpadding="0" cellspacing="1" border="0">
									<tbody>
										<tr>
											<th><strong>Custom Keywords</strong></th>
											<td>
												<input type="text" name="fajbm_setting" id="fajbm_settings" class="textbox" placeholder="Example: free,fender,commission" style="padding:5px; width:250px" />
											</td>
											<td class="option-description">
												<p>Enter keywords here for the addon to identify in journal titles. <br/>Keywords MUST be comma seperated and usernames MUST match the username of the page, NOT the URL.<br/>Singular terms like "Stream" will match "Streams" etc.</p>
											</td>
										</tr>
										<th class="noborder">&nbsp;</th>
										<td class="noborder">&nbsp;</td>
										<td class="option-description noborder">
											<br><input class="button mobile-button" id="fajbm_saveit" type="button" value="Save Settings*"><br/>
											<span style="font-size:10px;">FA Journal Breakdown by <a href="https://www.furaffinity.net/user/feralfrenzy" style="border-bottom:1px dotted white;">JaysonHusky</a></span><br/><br/>
											<b>*Updates take effect from the next page load</b>
										</td>
									</tr>
								</tbody>
							</table>`);
				}
        }
		FAJBM_Load();
    // Setup the hook
    var KeywordTitle;
    if(TemplateStyle=="/themes/beta"){
        KeywordTitle=$("#messages-journals h2").append('<br/><i style="font-size:70%;cursor:help;" title="Click on each term to highlight the relevant journal entries">Journal breakdown by term:</i>&nbsp;');
    }
    else {
        KeywordTitle=$("#messages-journals h3").first().append('<br/><i style="font-size:66%;cursor:help;" title="Click on each term to highlight the relevant journal entries">Journal breakdown by term:</i>');
    }
    // Sort Keywords alphabetically
     if(myKeywords===undefined){}
    else {
         myKeywords=myKeywords.sort();
    }
    // Adapt JQuery :contains to function without case restriction
    jQuery.expr[':'].icontains=function(a,i,m){
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
	};
    // JS equiv of PHPs ucwords() for better presentation (Credit: rickycheers @ Github)
    String.prototype.ucwords=function(){
        strtouc=this.toLowerCase();
        return strtouc.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(s){
            return s.toUpperCase();
        });
    };
    var stafflist=["dragoneer","chase","shivadramon","asianeko","foxamoore","monique","quotingmungo","net-cat","pickra","fender"]; // Staff List identifier temporarily removed due to bugs.
    function CheckForConventionNaming(term){
        // I know YCH is not a convention, but it needs to be termed as a all caps response
        var conventions=["ych","fc","mwff","mwf","fwa","blfc","cf","ac","sc","ef","ane","jftw","mp","bc","mff","af","ao","fau","ff","fm","fu","mcfc","nc","nfc","bff","bc","cc","ifc"];
        if(conventions.indexOf(term)>-1){
            scx=$("#messagecenter-other #messages-journals li strong a:icontains('"+term+"')").length;
            if(scx===0){theStreamCount='<i class="'+term+' fajbm" style="cursor:pointer;font-size:65%;display:none;"> '+term.toUpperCase()+': '+scx+' </i>';}
            else{theStreamCount='<i class="'+term+' fajbm" style="cursor:pointer;font-size:65%;"> '+term.toUpperCase()+': '+scx+' </i>';}
        }
        else if(term=="cfz"){
			// Due to the way Confuzzled stylise their name, it has a unique condition here.
            scx=$("#messagecenter-other #messages-journals li strong a:icontains('"+term+"')").length;
            if(scx===0){theStreamCount='<i class="'+term+' fajbm" style="cursor:pointer;font-size:65%;display:none;"> CFz: '+scx+'</i>';}
            else{theStreamCount='<i class="'+term+' fajbm" style="cursor:pointer;font-size:65%;"> CFz: '+scx+'</i>';}
        }
        else{
            scx=$("#messagecenter-other #messages-journals li:icontains('"+term+"')").length;
            if(scx===0){theStreamCount='<i class="'+term+' fajbm" style="cursor:pointer;font-size:65%;display:none;"> '+term.ucwords()+': '+scx+' </i>';}
            else{theStreamCount='<i class="'+term+' fajbm" style="cursor:pointer;font-size:65%;"> '+term.ucwords()+': '+scx+' </i>';}
           }
    }
    // Search for custom keywords
     if(myKeywords===undefined){
        theStreamCount='<i style="font-size:65%; color:white;">No keywords defined. <a href="/controls/user-settings/">Click here to enable them</a></i>';
        $(KeywordTitle).append(theStreamCount+"");
    }
    else {
        myKeywords.forEach(function(keyword) {
        // Add CSS3 Transitional feature ready for keyword click
        $("."+keyword+"").css('transition','0.2s all');
        $("#messagecenter-other #messages-journals li:icontains('"+keyword+"')").css('transition','0.2s all');
        // Run a check against list of convention abbreviations and correctly present them
        CheckForConventionNaming(keyword);
        // Add custom keywords to Journal header
            $(KeywordTitle).append(theStreamCount+"");
		// Highlight when clicked (deselecting all others)
        $("."+keyword).click(function(){
            if(TemplateStyle=="/themes/beta"){
                $("."+keyword+"").css({
                    'transition':'0.2s all',
                    'background':'#5b5e65',
                    'border-radius':'3px'
                });
                $("#messages-journals i:not(."+keyword+")").css('background','transparent');
                    $("#messagecenter-other #messages-journals li:icontains('"+keyword+"')").css({
                    'transition':'0.2s all',
                    'background':'#535d75',
                    'border-radius':'3px'
                });
                $("#messagecenter-other #messages-journals li:not(:icontains("+keyword+"))").css('background','transparent');
            }
            else {
                $("."+keyword+"").css({
                    'transition':'0.5s all',
                    'background':'rgba(1,0,0,0.2)',
                    'border-radius':'3px'
                });
                $("#messages-journals i:not(."+keyword+")").css('background','transparent');
                $("#messagecenter-other #messages-journals li:icontains('"+keyword+"')").css('background','rgba(1,0,0,0.2');
                $("#messagecenter-other #messages-journals li:not(:icontains("+keyword+"))").css('background','transparent');
            }
        });
    });
    }
})();