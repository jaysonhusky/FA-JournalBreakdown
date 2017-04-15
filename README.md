FA Journal Breakdown
=========
This userscript implements a list of user generated terms in FA's Journal system. So users can see at a glance how many journals contain what content, also add's highlighting functionality to the terms.


## Credits
- JaysonHusky, Concept & Development
- RickyCheers @ GitHub, JS Equivalent of PHP's UCWords function

## External Links
- Download at GreasyFork: https://greasyfork.org/en/scripts/26236-furaffinity-journal-breakdown

## Changelog


<b>9.9.12</b><br/>
- Updated to be compatible with the April 14 Site code revisions.

<b>9.9.11</b><br/>
- Removes defunct conventions

<b>9.9.10</b><br/>
- Control panel now melds properly with the existing Beta site, also fixed issue where streams would be auto selected by the script even when clicking an alternative term. No UI changes to classic version.

<b>9.0.1.2</b><br/>
- Updated to be compatible with FA's new Beta template.

<b>9.0.1</b><br/>
- Minor tweak required to fix erroneous matches for staff users, to be fixed in 10.0

<b>9.0</b><br/>
- Removes "NoMatch" criteria due to some browsers parsing it incorrectly

<b>8.0</b> <br/>
- Adds helpful error messages and hints, fixes potential issues where it could cause a browser to crash from an error.<br/><br/>

<b>7.0</b> <br/>
- Adds feature to identify staff journals easier, fixes padding for keywords.<br/><br/>

<b>6.0</b> <br/>
- Tidies inline CSS and updates presentation of keywords to fix issues with double/triple whitespace issues.<br/><br/>

<b>5.0.1</b>  (2017-03-02)<br/>
- changed transition effect duration for keywords, it is now shorter and more efficient.<br/><br/>

<b>5.0</b> <br/>
- Adds subtle transitions on term clicks for better appearance, also hides terms with no results, so it doesn't clutter your screen. See what you want to see! (V4 skipped as it was included in this update)<br/><br/>

<b>3.2.0.1</b> <br/>
- General tidy-up & removal of unused variables<br/><br/>

<b>3.2</b> <br/>
- Add's term highlighting for Classic UI<br/><br/>

<b>3.1</b> <br/>
- Add's indicator to Beta template of which term is currently selected for hightlighting<br/><br/>

<b>3.0</b> <br/>
- Updates list of conventions to match those listed at Wikifur (some are removed either by cause of being defunct or through they do not have abbreviated representations, full convention names are still valid)<br/><br/>

<b>2.1</b> <br/>
- Removes "Tampermonkey" name from title. No feature changes.<br/><br/>
- Correctly interprets distinction between convention abbreviations and usernames with similar letters.<br/><br/>

<b>2.0.1</b> <br/>
- Allows for users who don't use forced HTTPS connections<br/><br/>

<b>2.0</b> <br/>
- Fixes presentation for convention name abbreviations.<br/><br/>

<b>1.8</b> <br/>
- Changed control panel text to show removal of restriction surrounding spaces in keywords, also included screenshots<br/><br/>
- Reintroduces the Firefox dependant wildcard operate for matched url.<br/><br/>
- Fixes the parsing of spaces in keywords when comma delimited, making control panel more user friendly without impacting functionality<br/><br/>

<b>1.7.0.2</b> <br/>
- After much research, please use this script with Tampermonkey, it can function with GreaseMonkey, but throws unexpected errors.<br/><br/>
- Updated descriptions for control panels to reflect changes.<br/><br/>
- Temporary fix to enable correct parsing if spaces are found keywords<br/><br/>

<b>1.7.0.1</b> <br/>
- No feature changes, formatted code into easier reading indentation and changed requirement to JQuery Latest<br/><br/>

<b>1.7</b> <br/>
- Add's support for classical interface (Both Light and Dark themes)<br/><br/>

<b>1.6</b> <br/>
- Updates control panel to identify globally matching terms.<br/><br/>

<b>1.5</b> <br/>
- Adds control panel to script (accessible via User settings page)<br/><br/>

<b>1.3</b><br/>
- Adds sorting to keywords, so they show in the correct order on page load<br/><br/>

<b>1.2</b><br/>
- Initial commit.