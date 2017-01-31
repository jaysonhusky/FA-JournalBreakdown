// ==UserScript==
// @name         FA Journal Breakdown
// @namespace    FurAffinity
// @version      3.2.0.1
// @description  Provides a breakdown of your journal list
// @author       JaysonHusky
// @grant        GM_getValue
// @grant        GM_setValue
// @match        *://www.furaffinity.net/msg/others/*
// @match        *://www.furaffinity.net/controls/user-settings/*
// @require      https://code.jquery.com/jquery-latest.js
// ==/UserScript==
(function() {
    'use strict';
    // Setup keywords
		var myKeywords;
	// Begin loading
		function FAJBM_Load(){
			var user_defined_keywords=GM_getValue('fajbm');
			if(user_defined_keywords>""){
				myKeywords=user_defined_keywords.split(",");
				$('#fajbm_settings').val(user_defined_keywords.replace(/,/g,", "));
			}
			else {
				console.log("Error occured while attempting to retrieve user keywords, ERR: KEY_UNDEFINED");
                return "undefined";
			}
		}
	// Save settings
	function FAJBM_SaveSettings(fajbm){
		GM_setValue('fajbm',fajbm);
	}
	// Load Control Panel
		var pathx=window.location.pathname;
		if(~pathx.indexOf("/controls/user-settings/")){
			// Update
			$(document.body).on('click', '#fajbm_saveit', function(){
				var fajbm_set=$("input[name='fajbm_setting']").val().replace(/ /g,"").replace(/  /g,"");
				FAJBM_SaveSettings(fajbm_set);
				$('.faf-update-status').fadeIn('slow');
					setTimeout(function(){
						$('.faf-update-status').fadeOut('slow');
					}, 5000);
				});
				if(STATIC_PATH=="/themes/beta"){
				$('.content .section-divider').after(`
					<div id="customfacontrolpanel" style="border:1px dashed white; background: rgba(1,0,0,0.1); padding: 5px; border-radius: 5px; margin-top: 20px;">
						<h2>FA Journal Breakdown Control Panel <span class="faf-update-status" style="font-weight: bold; color: #02cc02; float:right; clear:right; display: none;">Update successful!</span></h2>
						<br/>
						<strong>Custom Keywords</strong>
						<div class="control-panel-option">
							<div class="control-panel-item-1">
								<p>Enter keywords here for the addon to identify in journal titles. <br/>Keywords MUST be comma seperated and usernames MUST match the username of the page, NOT the URL.<br/>Singular terms like "Stream" will match "Streams" etc.<br/> Please do <b>NOT</b> use the terms "posted by" or "hours ago" as they will match every journal.</p>
							</div>
							<div class="control-panel-item-2">
								<input type="text" name="fajbm_setting" id="fajbm_settings" placeholder="Example: free,fender,commission" style="padding:5px; width:250px" />
							</div>
						</div>
						<div class="button-nav">
							<div class="button-nav-item">
								<input class="button mobile-button" id="fajbm_saveit" type="button" value="Save Settings*">
							</div>
						</div>
						<br/><b>*Updates take effect from the next page load</b><br/><span style="font-size:10px;">FA Journal Breakdown by <a href="https://www.furaffinity.net/user/feralfrenzy" style="border-bottom:1px dotted white;">JaysonHusky</a></span>
					</div>`);
				}
				else {
					$('.footer').before(`<table cellpadding="0" cellspacing="1" border="0" class="section maintable" style="width: 60%; margin: 0 auto;">
					<tbody>
						<tr>
							<td height="22" class="cat links">&nbsp;
								<strong>FA Journal Breakdown - Control Panel</strong>
								<span class="faf-update-status" style="font-weight: bold; color: #7cfc00; float:right; clear:right; display: none;">Update successful!</span>
							</td>
						</tr>
						<tr>
							<td class="alt1 addpad ucp-site-settings" align="center">
								<table cellpadding="0" cellspacing="1" border="0">
									<tbody>
										<tr>
											<th><strong>Custom Keywords</strong></th>
											<td>
												<input type="text" name="fajbm_setting" id="fajbm_settings" placeholder="Example: free,fender,commission" style="padding:5px; width:250px" />
											</td>
											<td class="option-description">
												<p>Enter keywords here for the addon to identify in journal titles. <br/>Keywords MUST be comma seperated and usernames MUST match the username of the page, NOT the URL.<br/>Singular terms like "Stream" will match "Streams" etc.<br/> Please do <b>NOT</b> use the terms "posted by" or "hours ago" as they will match every journal.</p>
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
    if(STATIC_PATH=="/themes/beta"){
        KeywordTitle=$("#messages-journals h2").append('<br/><i style="font-size:70%;cursor:help;" title="Click on each term to highlight the relevant journal entries">Journal breakdown by term:</i>');
    }
    else {
        KeywordTitle=$("#messages-journals h3").first().append('<br/><i style="font-size:70%;cursor:help;" title="Click on each term to highlight the relevant journal entries">Journal breakdown by term:</i>');
    }
    // Sort Keywords alphabetically
     myKeywords=myKeywords.sort();
    // Creating the var's
    var scx,theStreamCount,strtouc;
    // Adapt JQuery :contains to function without case restriction
    jQuery.expr[':'].icontains=function(a, i, m){
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};
    // JS equiv of PHPs ucwords() for better presentation (Credit: rickycheers @ Github)
    String.prototype.ucwords=function(){
        strtouc=this.toLowerCase();
        return strtouc.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(s){
            return s.toUpperCase();
        });
    };
    function CheckForConventionNaming(term){
        // I know YCH is not a convention, but it needs to be termed as a all caps response
        var conventions=["ych","fc","mwff","mwf","fwa","blfc","cf","ac","sc","ef","ane","jftw","mp","bc","mff","af","ao","fau","ff","fm","fu","mcfc","nc","nfc","bff","bc","rcfm","cc","ifc"];
        if(conventions.indexOf(term)>-1){
            scx=$("#messagecenter-other #messages-journals li strong a:icontains('"+term+"')").length;
            theStreamCount='&nbsp;&nbsp;<i class="'+term+'" style="cursor:pointer;font-size:65%;"> '+term.toUpperCase()+': '+scx+' </i>';
           }
        else if(term=="cfz"){
			// Due to the way Confuzzled stylise their name, it has a unique condition here.
            scx=$("#messagecenter-other #messages-journals li strong a:icontains('"+term+"')").length;
            theStreamCount='&nbsp;&nbsp;<i class="'+term+'" style="cursor:pointer;font-size:65%;"> CFz: '+scx+'</i> ';
        }
        else{
            scx=$("#messagecenter-other #messages-journals li:icontains('"+term+"')").length;
            theStreamCount='&nbsp;&nbsp;<i class="'+term+'" style="cursor:pointer;font-size:65%;"> '+term.ucwords()+': '+scx+' </i>';
           }
    }
    // Search for custom keywords
    myKeywords.forEach(function(keyword) {
        // Add CSS3 Transitional feature for keyword click
        $("."+keyword+"").css('transition','0.5s all');
        // Run a check against list of convention abbreviations and correctly present them
        CheckForConventionNaming(keyword);
        // Add custom keywords to Journal header
        $(KeywordTitle).append(theStreamCount);
		// Highlight when clicked (deselecting all others)
        $("."+keyword).click(function(){
            if(STATIC_PATH=="/themes/beta"){
                $("."+keyword+"").css('transition','0.5s all');
                $("."+keyword+"").css('background','#5b5e65');
                $("."+keyword+"").css('border-radius','3px');
                $("#messages-journals i:not(."+keyword+")").css('background','transparent');
                $("#messagecenter-other #messages-journals li:icontains('"+keyword+"')").css('background','#535d75');
                $("#messagecenter-other #messages-journals li:not(:icontains("+keyword+"))").css('background','transparent');
            }
            else {
                $("."+keyword+"").css('transition','0.5s all');
                $("."+keyword+"").css('background','rgba(1,0,0,0.2');
                $("."+keyword+"").css('border-radius','3px');
                $("#messages-journals i:not(."+keyword+")").css('background','transparent');
                $("#messagecenter-other #messages-journals li:icontains('"+keyword+"')").css('background','rgba(1,0,0,0.2');
                $("#messagecenter-other #messages-journals li:not(:icontains("+keyword+"))").css('background','transparent');
            }
        });
    });
})();