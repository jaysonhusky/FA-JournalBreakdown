// ==UserScript==
// @name         FA Journal Breakdown
// @namespace    FurAffinity
// @version      1.2
// @description  Provides a breakdown of your journal list
// @author       JaysonHusky
// @match        https://www.furaffinity.net/msg/others/
// @grant        none
// @require      https://code.jquery.com/jquery-1.11.3.min.js
// ==/UserScript==
(function() {
    'use strict';
    // Insert your Keywords here! (Usernames MUST be exactly as they appear on the site!)
    var myKeywords = [
        // Default Keywords (use singular terms as plurals are automatically included, keywords are case-insensitive)
        'stream','commission',
        // My custom keywords (Make sure the last keyword does NOT have a comma after it!)
        'fursuit','free','christmas','fender','happy'
    ];
    /*
    ##################################################################################################################################################################
    ##################################################################################################################################################################
    ############################################################### PLEASE DO NOT EDIT BELOW THIS LINE ###############################################################
    ##################################################################################################################################################################
    ##################################################################################################################################################################
    */
    // Setup the hook
     var KeywordTitle = $("#messages-journals h2").append('<br/><i style="font-size:70%;" title="Click on each term to highlight the relevant journal entries">Journal breakdown by term:</i>');
    // Creating the var's
    var StreamCounter,scx,theStreamCount2,strtouc,CommCounter;
    // Adapt JQuery :contains to function without case restriction
    jQuery.expr[':'].icontains=function(a, i, m){
		return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
	};
    // JS equiv of PHPs ucwords() for better presentation (Credit: rickycheers @ Github)
    String.prototype.ucwords = function() {
        strtouc = this.toLowerCase();
        return strtouc.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, function(s){
            return s.toUpperCase();
        });
    };
    // Search for custom keywords
    myKeywords.forEach(function(keyword) {
        scx = $("#messagecenter-other #messages-journals li:icontains('"+keyword+"')").length;
        theStreamCount2 = '&nbsp;&nbsp;<i class="'+keyword+'" style="cursor:pointer;font-size:65%;"> '+keyword+': '+scx+'</i>';
        // Add custom keywords to Journal header
        $(KeywordTitle).append(theStreamCount2.ucwords());
		// Highlight when clicked (deselect all others)
        $("."+keyword).click(function(){
            $("#messagecenter-other #messages-journals li:icontains('"+keyword+"')").css('background','#535d75');
            $("#messagecenter-other #messages-journals li:not(:icontains("+keyword+"))").css('background','#272a31');
        });
    });
})();