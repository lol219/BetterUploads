/**
* @name BetterUploads
* @authorlink https://github.com/lol219
* @invite TCuGtFNhpq
*/

/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();
@else@*/
 class BetterUploads{
    getName() {return "BetterUploads";}
    getDescription() {return "Aditionnal Tools to upload or scan files to discord (API)";}
    getVersion() {return "0.0.2";}
    getAuthor() {return "Alexandro";}

    start() {
        if (!global.ZeresPluginLibrary) return window.BdApi.alert("Library Missing",`The library plugin needed for ${this.getName()} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
        ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), "");
    }

    stop() {

    }
}
const Bapi = BdApi;
module.exports = (() => {
//var BetterUploads = (() => {
    const config = {
        "info": {
            "name":"BetterUploads",
            "authors": [
                {
                    "name":"Alexandro",
                    "discord_id":"820767057959321641",
                    "github_username":"lol219"
                }
            ],
            "version":"0.0.2",
            "description":
            "Aditionnal Tools to upload or scan files to discord (API)",
            "github":"https://github.com/lol219/",
            "github_raw":""
        },
        "changelog":[
            {
                "title": 'fixed',
                "type": 'Fixed :',
                "items": [
                "**Popup** : Fixed the annoying popup when it asks you to download CrashRecovery plugin , if you have it it won't show the message again and never :D  "
                
                
                ]
            }
            
        ],   
        
        
        
        "main":"index.js"
    };
    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
   
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {

    const {DiscordSelectors, Logger, DiscordModules, Patcher, Settings, PluginUtilities} = Library;

    return class BetterUploads extends Plugin {
        constructor() {
			super();
            this.defaultSettings = {};
			this.defaultSettings.Agreement = "",
			this.defaultSettings.AntiVirusService = "DocConversionAPI",
			this.defaultSettings.AuthenticatingColor = "#40ad48",
			this.defaultSettings.CuttlyKey = "",
			this.defaultSettings.DocConversionAPIKey = "",
			this.defaultSettings.DoneColor = "#00adef",
			this.defaultSettings.FailedColor = "#d12229",
			this.defaultSettings.FileCountLimit = 1,
			this.defaultSettings.FileSizeLimit = "",
			this.defaultSettings.HotkeyIncriment = 0.25,
			this.defaultSettings.Hotkeys = {"ScaleIncrease":[35],"ScaleDecrease":[36]},
			this.defaultSettings.RebrandlyKey = "",
			this.defaultSettings.ShortLinkService = "Tinyurl",
			this.defaultSettings.UploadService = "Gofile",
			this.defaultSettings.UploadingColor = "#0f52ba",
			this.defaultSettings.UploadsScale = 1,
			this.defaultSettings.UseAntiVirus = false,
			this.defaultSettings.UseFileCountLimit = false,
			this.defaultSettings.UseFileSizeLimit = false,
			this.defaultSettings.UseShortLink = false,
			this.defaultSettings.VirusTotalKey = ""
        }

        onStart() {
			var KeyPressedMap = {};
			if(!BdApi.getData("BetterUploads", "uploads")){
				BdApi.setData("BetterUploads", "uploads", {});
			}
			if(!BdApi.getData("BetterUploads", "codenames")){
				BdApi.setData("BetterUploads", "codenames", ["abecedarian","abracadabra","accoutrements","adagio","aficionado","agita","agog","akimbo","alfresco","aloof","ambrosial","amok","ampersand","anemone","anthropomorphic","antimacassar","aplomb","apogee","apoplectic","appaloosa","apparatus","archipelago","atingle","avuncular","azure","babushka","bailiwick","bafflegab","balderdash","ballistic","bamboozle","bandwagon","barnstorming","beanpole","bedlam","befuddled","bellwether","berserk","bibliopole","bigmouth","bippy","blabbermouth","blatherskite","blindside","blob","blockhead","blowback","blowhard","blubbering","bluestockings","boing","boffo (boffola)","bombastic","bonanza","bonkers","boondocks","boondoggle","borborygmus","bozo","braggadocio","brainstorm","brannigan","breakneck","brouhaha","buckaroo","bucolic","buffoon","bugaboo","bugbear","bulbous","bumbledom","bumfuzzle","bumpkin","bungalow","bunkum","bupkis","burnsides","busybody","cacophony","cahoots","calamity","calliope","candelabra","canoodle","cantankerous","catamaran","catastrophe","catawampus","caterwaul","chatterbox","chichi","chimerical","chimichanga","chitchat","clandestine","claptrap","clishmaclaver","clodhopper","cockamamie","cockatoo","codswallop","collywobbles","colossus","comeuppance","concoction","conniption","contraband","conundrum","convivial","copacetic","corkscrew","cornucopia","cowabunga","coxcomb","crackerjack","crescendo","crestfallen","cryptozoology","cuckoo","curlicue","curmudgeon","demitasse","denouement","desperado","diaphanous","diddly-squat","digeridoo","dilemma","dillydally","dimwit","diphthong","dirigible","discombobulated","dodecahedron","doldrums","donkeyman","donnybrook","doodad","doohickey (this is what I call a library due date card)","doppelganger","dumbfounded","dumbwaiter","dunderhead","earwig","eavesdrop","ebullient","effervescence","egads","eggcorn","egghead","elixir","ephemeral","epiphany","eucatastrophe","extraterrestrial","finagle","fandango","festooned","fez","fiasco","fiddle-footed","fiddlesticks","finicky","firebrand","fishwife","fisticuffs","flabbergasted","flapdoodle","flibbertigibbet","flimflam","flippant","floccinaucinihilipilification","flophouse","flotsam","flummery","flummoxed","flyaway","flyspeck","folderol","foofaraw","foolhardy","foolscap","footloose","fopdoodle","fortuitous","fracas","frangipani","freewheeling","fricassee","frippery","frogman","froufrou","fuddy-duddy","fussbudget","futz","gadfly","gadzooks","gallimaufry","gangplank","gangway","gargoyle","gasbag","gazebo","gazpacho","gewgaw","genteel","ghostwriter","gibberish","gimcrack","gizmo","glabella","glitch","globetrotter","gobbledygook","gobsmacked","goosebump","gooseflesh","gorgonzola","gossamer","grandiloquent","greenhorn","guffaw","gumshoe","guru","gussied","guttersnipe","haberdashery","haboob","hairpin","halcyon","halfwit","hangdog","haphazard","harebrained","harumph","harum-scarum","headlong","heartstrings","heebie-jeebie","heirloom","helter-skelter","hemidemisemiquaver","heyday","higgledy-piggledy","highfalutin","hijinks","hillbilly","hippocampus","hippogriff","hobbledehoy","hobnobbed","hocus-pocus","hodgepodge","hogwash","hokum","hoodoo","hoodwink","hooey","hooligan","hoopla","hootenanny","hornswoggle","horsefeathers","hotbed","hotfoot","hothead","hubbub","hullabaloo","humbug","humdinger","humdrum","hunky-dory","hurly-burly","hushpuppy","huzzah","hyperbole","idiom","idiosyncrasies","igloo","ignoramus","impromptu","incognito","incorrigible","incredulous","indomitable","indubitably","infinitesimal","interloper","interrobang","ironclad","izzard","jabberwocky","jacuzzi","jalopy","jamboree","jargogle","jawbreaker","jetsam","jibber-jabber","jitney","jubilee","juggernaut","jujubes","jumbo","junket","juxtaposition","kaleidoscope","kaput","kerfuffle","kerplunk","kibosh","killjoy","kismet","knickerbocker","knickknack","kowtow","kumquat","kvetch","lackadaisical","lagoon","lambasted","lampoon","landlubber","laughingstock","lexicographer","limburger","lingo","loco","loggerhead","logjam","logophile","logorrhea","lollapalooza","lollygag","loofah","loony","loophole","lugubrious","lummox","machinations","madcap","maelstrom","magnificent","majordomo","malapropism","malarkey","manifesto","mastermind","mayhem","mealymouthed","mellifluous","menagerie","miasma","miffed","milquetoast","misanthrope","mishmash","moocher","mojo (also a character in THE MONSTORE)","mollycoddle","mondegreen","moniker","monkeyshines","monsoon","mnemonic","moonstruck","muckety-muck","mudpuppy","mudslinger","muffuletta","mufti","mulligatawny","mumbo-jumbo","murmuration","muumuu","nabob","namby-pamby","nimrod","nincompoop","nitwit","nomenclature","nonplussed","noodge","nudnik","numbskull","onomatopoeia","oomph","orotund","outfox","outlandish","oxymoron","pachyderm","pagoda","palindrome","palomino","panache","pandemonium","pantaloons","papyrus","parabola","parallelogram","parapet","paraphernalia","pedagogue","peewee","pell-mell","persimmon","persnickety","pettifogger","phalanx","phantasmagorical","phantonym","phylactery","piffle","pizzazz","plethora","pogo","pogonip","pollex","pollywog","poltroon","pomposity","poppycock","portmanteau","potpourri","pseudonym","pugnacious","pulchritudinous","pusillanimous","pussyfoot","quibble","quicksilver","quicksticks","quiddle","quinzee","quirky","quixotic","quizzity","rabble-rouser","raconteur","rainmaker","ragamuffin","ragtag","ramshackle","ransack","rapscallion","razzle-dazzle","razzmatazz","rejigger","rendezvous","resplendent","rickrack","ricochet","riffraff","rigmarole","riposte","roundabout","roustabout","rubberneck","ruckus","ruffian","rugrat","rumpus","sabayon","sashay","sassafras","scalawag (also scallywag)","scatterbrain","schadenfreude","schlep","schluffy","schmooze","schmutz","scintillating","scrofulous","scrumdiddlyumptious (Dahlism)","scuttlebutt","serendipity","sesquipedalian","shabang","shenanigans","skedaddle","skirmish","skullduggery","slapdash","slapstick","slipshod","smithereens","smorgasbord","snollygoster","sobriquet","sojourn","spellbind","splendiferous","squeegee","squooshy","staccato","stupefaction","succotash","supercilious","superfluous","surreptitious","Svengali","swashbuckler","switcheroo","swizzlestick","synchronicity","syzygy","talisman","taradiddle","tchotchke","teepee","telekinesis","thingamabob","thingamajig","thunderstruck","tidbit","tintinnabulation","toadstool","toady","tomfoolery","tommyrot","toothsome","topsy-turvy","trapezoid","tub-thumper","tumultuous","typhoon","ululation","umlaut","umpteen","usurp","uvula","vagabond","vamoose","verboten","verisimilitude","vermicious (well, if I included one Dahlism, why not another?)","vertigo","verve","virtuoso","vivacious","vuvuzela","wackadoodle","wallflower","wanderlust","whatchamacallit","whatsis","whimsical","whippersnapper","whirligig","whirlybird","whizbang","whodunit","whoop","widget","wigwam","willy-nilly","windbag","wipeout","wiseacre","wisecrack","wisenheimer","wishy-washy","woebegone","wonky","woozy","wordplay","wordsmith","wunderkind","wuthering","xylophone","yahoo","yokel","yo-yo","zaftig","zeitgeist","zenzizenzizenzic (yes, this is a word!)","zephyr","zeppelin","ziggurat","zigzag","zonked","zoom","zydeco"]);
			}
			if(!BdApi.getData("BetterUploads", "settings")){
				BdApi.setData("BetterUploads", "settings", {"Agreement": "", "AntiVirusService": "DocConversionAPI", "AuthenticatingColor": "#40ad48", "CuttlyKey": "", "DocConversionAPIKey": "", "DoneColor": "#00adef", "FailedColor": "#d12229", "FileCountLimit": 1, "FileSizeLimit": "", "HotkeyIncriment": 0.25, "Hotkeys":{"ScaleIncrease": [ 35], "ScaleDecrease": [ 36]}, "RebrandlyKey": "", "ShortLinkService": "Tinyurl", "UploadService": "Gofile", "UploadingColor": "#0f52ba", "UploadsScale": 1, "UseAntiVirus": false, "UseFileCountLimit": false, "UseFileSizeLimit": false, "UseShortLink": false, "VirusTotalKey": ""});
			}
			
			//HTML SETUP --------------------------------------------
			if(!document.getElementById("BetterUploads-Style")){
				var HTML = `<style class="BetterUploads-Component" id="BetterUploads-Style">.BetterUploads-BackgroundBlur{width:100vw;height:100vh;background-color:rgba(0,0,0,0.3);position:absolute;left:0px;top:0px;z-index:1000;}.BetterUploads-GUI{background:#36393f;border-radius:10px;margin:auto;width:400px;height:600px;position:absolute;z-index: 4000;top: 50%;left: 50%;transform: translateY(-50%) translatex(-50%);transform-origin: center;font-family: Calibri;}.BetterUploads-Hidden{display:none;}.BetterUploads-UploadsContainer{width: 400px;height: 580px;overflow-x: hidden;overflow-y: auto;position: absolute;left: 0px;top: 10px;border-radius: 10px;}.BetterUploads-UploadContainer{width: 380px;height: 45px;left:10px;position: relative;margin-bottom: 5px;background-color: #2f3136;border-radius: 3px;}.BetterUploads-UploadType{height: 33px;width: 33px;left: 6px;top: 6px;position: absolute;}.BetterUploads-UploadTitle{height: 11px;left: 45px;top: 6px;position: absolute;font-size: 10pt;cursor: pointer;font-weight:bold;}.BetterUploads-UploadTitle:hover{text-decoration: underline;}.BetterUploads-UploadContainer.failed .BetterUploads-UploadTitle{color:#d12229;}.BetterUploads-UploadContainer.authenticating .BetterUploads-UploadTitle{color:#40ad48;}.BetterUploads-UploadContainer.uploading .BetterUploads-UploadTitle{color:#0f52ba}.BetterUploads-UploadContainer.done .BetterUploads-UploadTitle{color: #00adef;}.BetterUploads-UploadStatus{height: 11px;left: 45px;top: 20px;position: absolute;font-size: 7pt;color: #5c5e64;font-weight: lighter;}.BetterUploads-UploadContainer .BetterUploads-UploadStatus span{height: 3.5px;width: 3.5px;border-radius: 50%;display: inline-block;margin-bottom: 1px;}.BetterUploads-UploadContainer.failed .BetterUploads-UploadStatus span{background-color: #d12229;}.BetterUploads-UploadContainer.authenticating .BetterUploads-UploadStatus span{background-color: #40ad48;}.BetterUploads-UploadContainer.uploading .BetterUploads-UploadStatus span{background-color: #0f52ba;}.BetterUploads-UploadStatusInfo{height: 11px;left: 45px;top: 29px;color: #00adef;position: absolute;font-size: 7pt;color: #5c5e64;font-weight: lighter;}.BetterUploads-UploadBarContainer{position:absolute;left: 0px;width:260px;top:3px;height:5px;border-radius:2.5px;background-color:#23252a;}.BetterUploads-UploadBarContainer span{position:absolute;height:100%;background-color:#0f52ba;border-radius:2.5px;max-width:100%;}.BetterUploads-UploadButton1{left: 350px;fill: #8b0000;width: 15px;height: 15px;position: absolute;top: 15px;cursor:pointer;}.BetterUploads-UploadButton2{left: 326px;}.BetterUploads-UploadButton3{left: 302px;}.BetterUploads-UploadButton:not(.BetterUploads-UploadButton1){width: 15px;height: 15px;position: absolute;top: 15px;cursor:pointer;fill:#b9bbbe;}.BetterUploads-UploadButton:hover{fill:white;}.BetterUploads-UploadButton1:hover{fill:#d12229 !important;}.BetterUploads-DropdownContainer{height: 45px;left:10px;position: relative;margin-bottom: 5px;background-color: #2f3136;border-radius: 3px;width: 335px;margin-left: 45px;}.BetterUploads-DropdownUploadBarContainer{position:absolute;left: 0px;width:215px;top:3px;height:5px;border-radius:2.5px;background-color:#23252a;}.BetterUploads-DropdownUploadBarContainer span{position:absolute;height:100%;background-color:#0f52ba;border-radius:2.5px;max-width:100%;}.BetterUploads-DropdownContainer.failed .BetterUploads-UploadTitle{color:#d12229;}.BetterUploads-DropdownContainer.authenticating .BetterUploads-UploadTitle{color:#40ad48;}.BetterUploads-DropdownContainer.uploading .BetterUploads-UploadTitle{color:#0f52ba}.BetterUploads-DropdownContainer.done .BetterUploads-UploadTitle{color: #00adef;}.BetterUploads-DropdownButton{left: 305px;}.BetterUploads-NoUploads{color:#5c5e64;magrin-top:20px;}.BetterUploads-notSelected{display:none;}.BetterUploads-ButtonRotated{transform:rotate(180deg);}::-webkit-scrollbar{width: 8px;}::-webkit-scrollbar-track{background: #2f3136; border-radius:4px;}::-webkit-scrollbar-thumb{background: #202225; border-radius:4px;}/*Discords built in styles*/.BetterUploads-MessageFileContainer{text-rendering: optimizeLegibility;text-indent: 0;line-height: 1.375rem;white-space: break-spaces;color: var(--text-normal);user-select: text;margin: 0;font-weight: inherit;font-style: inherit;font-family: inherit;font-size: 100%;vertical-align: baseline;outline: 0;display: flex;align-items: center;flex-direction: row;box-sizing: border-box;border-radius: 3px;letter-spacing: 0;max-width: 520px;width: 100%;padding: 10px;border: 1px solid transparent;border-color: var(--background-secondary-alt);background-color: var(--background-secondary);margin-top:10px;}.BetterUploads-MessageFileType{text-rendering: optimizeLegibility;line-height: 1.375rem;white-space: break-spaces;color: var(--text-normal);user-select: text;-webkit-box-direction: normal;letter-spacing: 0;margin: 0;padding: 0;border: 0;font-weight: inherit;font-style: inherit;font-family: inherit;font-size: 100%;vertical-align: baseline;width: 30px;height: 40px;margin-right: 8px;flex-shrink: 0;text-indent: -9999px;}.BetterDiscord-MessageFileInfoContainer{text-rendering: optimizeLegibility;text-indent: 0;line-height: 1.375rem;color: var(--text-normal);user-select: text;-webkit-box-direction: normal;letter-spacing: 0;margin: 0;padding: 0;border: 0;font-weight: inherit;font-style: inherit;font-family: inherit;font-size: 100%;vertical-align: baseline;outline: 0;-webkit-box-flex: 1;flex: 1;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}.BetterDiscord-MessageFileTitleContainer{text-rendering: optimizeLegibility;text-indent: 0;line-height: 1.375rem;user-select: text;-webkit-box-direction: normal;letter-spacing: 0;margin: 0;padding: 0;border: 0;font-weight: inherit;font-style: inherit;font-family: inherit;font-size: 100%;vertical-align: baseline;outline: 0;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;color: var(--text-link);}.BetterDiscord-MessageFileTitle{text-rendering: optimizeLegibility;text-indent: 0;line-height: 1.375rem;user-select: text;-webkit-box-direction: normal;letter-spacing: 0;white-space: nowrap;margin: 0;padding: 0;border: 0;font-weight: inherit;font-style: inherit;font-family: inherit;font-size: 100%;vertical-align: baseline;outline: 0;color: var(--text-link);word-break: break-word;text-decoration: none;cursor: pointer;}.BetterDiscord-MessageFileStatus{text-rendering: optimizeLegibility;text-indent: 0;user-select: text;-webkit-box-direction: normal;letter-spacing: 0;white-space: nowrap;margin: 0;padding: 0;border: 0;font-style: inherit;font-family: inherit;vertical-align: baseline;outline: 0;font-size: 12px;line-height: 16px;font-weight: 300;color: #72767d;margin-right: 8px;}.BetterDiscord-MessageFileDownloadButtonContainer{text-rendering: optimizeLegibility;text-indent: 0;line-height: 1.375rem;white-space: break-spaces;user-select: text;-webkit-box-direction: normal;letter-spacing: 0;margin: 0;padding: 0;border: 0;font-weight: inherit;font-style: inherit;font-family: inherit;font-size: 100%;vertical-align: baseline;outline: 0;color: var(--text-link);word-break: break-word;text-decoration: none;cursor: pointer;}.BetterDiscord-MessageFileDownloadButton{text-rendering: optimizeLegibility;text-indent: 0;line-height: 1.375rem;white-space: break-spaces;user-select: text;-webkit-box-direction: normal;letter-spacing: 0;font-weight: inherit;font-style: inherit;font-family: inherit;font-size: 100%;word-break: break-word;width: 24;height: 24;margin-left: 4px;color: var(--interactive-normal);cursor: pointer;}.BetterDiscord-MessageFileDownloadButton:hover{fill:white;}/*End discords built in styles*/</style>`;
				var Container = document.getElementsByTagName("head")[0];
				addElement(Container,HTML);
			}		
			if(!document.getElementById("BetterUploads-Container")){
				var HTML = `<div class="BetterUploads-Component" id="BetterUploads-Container" style="display:none;"></div>`;
				var Container = document.getElementsByTagName("Body")[0];
				addElement(Container,HTML);
			}
			if(!document.getElementById("BetterUploads-GUI")){
				var HTML = `<div class="BetterUploads-Component BetterUploads-Hidden" id="BetterUploads-GUIContainer"><div class="BetterUploads-BackgroundBlur"></div><div class="BetterUploads-GUI"><div class="BetterUploads-UploadsContainer"></div></div></div>`;
				var Container = document.getElementsByTagName("Body")[0];
				addElement(Container,HTML);
				document.querySelector(".BetterUploads-BackgroundBlur").onmousedown = function(event){
					document.getElementById("BetterUploads-GUIContainer").classList.toggle("BetterUploads-Hidden");
				}
			}
			if(!document.getElementById("BetterUploads-FileInput")){
				var HTML = `<input id="BetterUploads-FileInput" type="file" multiple></input>`;
				var Container = document.getElementById("BetterUploads-Container");
				var input = addElement(Container,HTML);
				input.onchange = function(){
					if(!input.files.length == 0){
						processUpload(generateName(),input.files);
					};
				}
			}		
			//END HTML SETUP ----------------------------------------
			startup();
			// GOFILE -----------------------------------------------
			function goFileRequestServer(){
				return new Promise(resolve => {
					var xhr = new XMLHttpRequest();
					xhr.open("GET", "https://apiv2.gofile.io/getServer");
					xhr.send();
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							resolve(JSON.parse(xhr.response));
						}
					}
				});
			}
			function goFileUpload(name,fileserver,files){
				return new Promise(resolve => {
					var xhr = new XMLHttpRequest();
					var formData = new FormData();
					for (const file of files){
						formData.append("filesUploaded", file);
					}
					formData.append("category","file");
					formData.append("comments",0);
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							resolve(JSON.parse(xhr.response));
						}
					}
					xhr.upload.onprogress = function(e){
						for(var upload of Object.keys(window.BetterUploadsFiles)){
							if(window.BetterUploadsFiles[upload].status == "uploading"){
								updateUpload(upload,{"uploading":e.loaded});
							}
						}
						updateGUI();
						console.log(e.loaded + " / " + e.total + " - " + e.loaded/e.total + "%");
					}
					xhr.open("POST","https://"+fileserver+".gofile.io/upload");
					xhr.send(formData);
				});
			}
			function goFileAuthenticate(name,url){
				var HTML = `<iframe name="`+name+`" class="BetterUploads-iFrame" width="300" height="300" src="`+url+`"></iframe>`;
				var Container = document.getElementById("BetterUploads-Container");
				var authContainer = addElement(Container,HTML);
				authContainer.onload = function(){
					var status = "done";
					updateUpload(name,{"status":"done"});
					for(var element of document.querySelectorAll(".BetterUploads-iFrame")){
						if(element.getAttribute("name") == name){
							element.remove();
						}
					}
				};
				authContainer.onerror = function(){
					updateUpload(name,{"status":"failed"});
					for(var element of document.querySelectorAll(".BetterUploads-iFrame")){
						if(document.querySelectorAll(".BetterUploads-iFrame").getAttribute("name") == name){
							element.remove();
						}
					}
				};
			}
			function goFileGenerateDirectURL(fileserver,code,file){
				var directDownload = encodeURI("https://"+fileserver+".gofile.io/download/"+code+"/"+file.name);
				return directDownload;
			}
			function goFileGenerateDownloadURL(code){
				var downloadsPage = "https://www.gofile.io/d/"+code;
				return downloadsPage;
			}
			// END GOFILE -------------------------------------------
			
			// FILE -------------------------------------------------
			function fileUpload(name,files){
				return new Promise(resolve => {
					var xhr = new XMLHttpRequest();
					var formData = new FormData();
					for (const file of files){
						formData.append("file", file);
					}
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							resolve(JSON.parse(xhr.response));
						}
					}
					xhr.upload.onprogress = function(e){
						console.log(e.loaded + " / " + e.total + " - " + e.loaded/e.total + "%");
					}
					xhr.open("POST","https://file.io/?expires=10y");
					xhr.send(formData);
				});
			}
			// END FILE ---------------------------------------------
			
			// REBRANDLY --------------------------------------------
			function generateRebrandlyShortLink(apiKey,longUrl){
				return new Promise(resolve => {
					var xhr = new XMLHttpRequest();
					let linkRequest = {
						destination: encodeURI(longUrl),
						domain: { fullName: "rebrand.ly" }
					}
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							resolve(JSON.parse(xhr.response));
						}
					}
					xhr.onerror = function(){
						resolve(false);
					}
					xhr.upload.onprogress = function(e){
						console.log(e.loaded + " / " + e.total + " - " + e.loaded/e.total + "%");
					}
					xhr.open("POST","https://api.rebrandly.com/v1/links");
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.setRequestHeader("apikey", apiKey);
					xhr.send(JSON.stringify(linkRequest));
				});
			}
			// END REBRANDLY ----------------------------------------
			
			// CUTTLY -----------------------------------------------
			function generateCuttlyShortLink(apiKey,longUrl){
				return new Promise(resolve => {
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							resolve(xhr.response);
						}
					}
					xhr.upload.onprogress = function(e){
						console.log(e.loaded + " / " + e.total + " - " + e.loaded/e.total + "%");
					}
					xhr.open("POST","https://cutt.ly/api/api.php?key="+apiKey+"&short="+longUrl+"&name=BetterUploadsUpload");
					xhr.send();
				});
			}
			// END CUTTLY -------------------------------------------
			
			// TINYURL ----------------------------------------------
			function generateTinyurlShortLink(longUrl){
				return new Promise(resolve => {
					var xhr = new XMLHttpRequest();
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							resolve(xhr.response);
						}
					}
					xhr.upload.onprogress = function(e){
						console.log(e.loaded + " / " + e.total + " - " + e.loaded/e.total + "%");
					}
					xhr.open("POST","https://tinyurl.com/api-create.php?url="+encodeURI(longUrl));
					xhr.send();
				});
			}
			// END TINYURL ------------------------------------------
			
			// DOCONVERSION -----------------------------------------
			function virusScanDoConversion(apiKey,applicationID,url){
				return new Promise(resolve => {
					var xhr = new XMLHttpRequest();
					var formData = new FormData();
					formData.append("inputFile",url);
					formData.append("async","false");
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							resolve(xhr.response);
						}
					}
					xhr.upload.onprogress = function(e){
						console.log(e.loaded + " / " + e.total + " - " + e.loaded/e.total + "%");
					}
					xhr.open("POST","https://api.virusscannerapi.com/virusscan");
					xhr.setRequestHeader("X-SecretKey", apiKey);
					xhr.setRequestHeader("X-ApplicationID", applicationID);
					xhr.send(formData);
				});
			}
			// END DOCONVERSION -------------------------------------
			
			// VIRUSTOTAL -------------------------------------------
			function virusScanVirusTotal(apiKey,url){
				return new Promise(resolve => {
					var xhr = new XMLHttpRequest();
					var formData = new FormData();
					formData.append("url",url);
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							resolve(xhr.response);
						}
					}
					xhr.upload.onprogress = function(e){
						console.log(e.loaded + " / " + e.total + " - " + e.loaded/e.total + "%");
					}
					xhr.open("POST","https://www.virustotal.com/api/v3/urls");
					xhr.setRequestHeader("x-apikey", apiKey);
					xhr.send(formData);
				});
			}
			// END VIRUSTOTAL ---------------------------------------
			
			// GUI
			function scaleGui(scale){
				document.getElementsByClassName("BetterUploads-GUI")[0].style.transform = "scale("+scale+") translateY(calc(-50% / "+scale+")) translatex(calc(-50% / "+scale+"))";
			}
			function newUpload(name,files){
				window.BetterUploadsFiles[name] = {"code":"","shorturl":"","size":0,"time":new Date().getTime(),"uploading":0,"url":"","files":{}}
				for(var file of files){
					window.BetterUploadsFiles[name].size = window.BetterUploadsFiles[name].size + file.size;
					window.BetterUploadsFiles[name].files[file.name] = {"code":"","path":file.path,"shorturl":"","size":file.size,"url":"","virusscan":""}
				}
			}
			function generateName(){
				var CodenameCopy = window.BetterUploadsCodenames;
				for(var upload of Object.keys(window.BetterUploadsFiles)){
					var index = CodenameCopy.indexOf(upload);
					if (index !== -1) CodenameCopy.splice(index, 1);
				}
				var name = CodenameCopy[Math.floor(Math.random() * CodenameCopy.length)];
				return (name.charAt(0).toUpperCase()+name.slice(1))
			}
			function updateUpload(name,parameters){
				for(var parameter of Object.keys(parameters)){
					if(parameter == "files"){
						for(var file of Object.keys(parameters.files)){
							for(var fileParameter of Object.keys(parameters.files[file])){
								window.BetterUploadsFiles[name].files[file][fileParameter] = parameters.files[file][fileParameter];
							}
						}
					}else{
						window.BetterUploadsFiles[name][parameter] = parameters[parameter];
					}
				}
				updateGUI();
			}
			function addElement(Container,HTML){
				var Template = document.createElement('template');
				Template.innerHTML = HTML;
				var NewElement = Container.appendChild(Template.content.firstChild);
				return(NewElement);
			}
			function formatSizeUnits(bytes){
				if (bytes >= 1073741824){ bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
				else if (bytes >= 1048576){ bytes = (bytes / 1048576).toFixed(2) + " MB"; }
				else if (bytes >= 1024){ bytes = (bytes / 1024).toFixed(2) + " KB"; }
				else if (bytes > 1){ bytes = bytes + " bytes"; }
				else if (bytes == 1){ bytes = bytes + " byte"; }
				else{ bytes = "0 bytes"; }
				return bytes;
			}
			function updateGUI(){
				document.querySelector(".BetterUploads-UploadsContainer").querySelectorAll('*').forEach(n => n.remove());
				if(Object.keys(window.BetterUploadsFiles).length > 0){
					for(var upload of Object.keys(window.BetterUploadsFiles)){
						var Container = document.querySelector(".BetterUploads-UploadsContainer");
						var HTML = `<div class="BetterUploads-UploadContainer"></div>`;
						addElement(Container,HTML);
						var uploadContainer = document.getElementsByClassName("BetterUploads-UploadContainer")[document.getElementsByClassName("BetterUploads-UploadContainer").length-1];
						if(Object.keys((window.BetterUploadsFiles)[upload].files).length == 1){
							if((window.BetterUploadsFiles)[upload].status == "uploading"){
								uploadContainer.classList.add("uploading");
								
								var UploadType = `<svg fill="white" viewbox="-50 0 490 490" class="BetterUploads-UploadType"><path d="M320.45,0H65V490h360.1V112Zm-1.92,421.31H162.28A64.34,64.34,0,0,1,144,295.3c0-.88,0-1.76,0-2.66a64.42,64.42,0,0,1,64.34-64.34A63,63,0,0,1,223,230.06a73.54,73.54,0,0,1,132.31,44.2,71.16,71.16,0,0,1-.66,9.69,73.39,73.39,0,0,1-36.1,137.36ZM300.25,131.8V19.8l104.6,112Z" transform="translate(-64.95)"/><path d="M332.87,294.76a55.1,55.1,0,0,0-101.94-41.87,45.76,45.76,0,0,0-64.56,58.54c-1.36-.12-2.68-.41-4.09-.41a46,46,0,0,0,0,91.91H318.53a55,55,0,0,0,14.34-108.17ZM263.39,329.4v55.15H226.62V329.4H189.86L245,274.26l55.15,55.14Z" transform="translate(-64.95)"/></svg>`;
								var Title =`<div class="BetterUploads-UploadTitle">`+upload+`</div>`;
								var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> Uploading - `+formatSizeUnits((window.BetterUploadsFiles)[upload].uploading)+` / `+formatSizeUnits((window.BetterUploadsFiles)[upload].size)+`</div>`;
								var StautsInfo =`<div class="BetterUploads-UploadStatusInfo"><div class="BetterUploads-UploadBarContainer"><span style="width:`+((window.BetterUploadsFiles)[upload].uploading/(window.BetterUploadsFiles)[upload].size)*100+`%"></span></div></div>`;
								var Button1 = `<svg upload="`+upload+`" viewbox="0 0 1792 1792" fill="white" class="BetterUploads-UploadButton1 BetterUploads-UploadButton"><path upload="`+upload+`" d="M1181.53,896l571.05-571a134.56,134.56,0,0,0,0-190.31l-95.22-95.22a134.56,134.56,0,0,0-190.31,0L896,610.47,325,39.42a134.56,134.56,0,0,0-190.31,0L39.42,134.64a134.56,134.56,0,0,0,0,190.31L610.47,896,39.42,1467.05a134.56,134.56,0,0,0,0,190.31l95.22,95.22a134.56,134.56,0,0,0,190.31,0l571.05-571,571.05,571.05a134.56,134.56,0,0,0,190.31,0l95.22-95.22a134.56,134.56,0,0,0,0-190.31Z" transform="translate(0)"/></svg>`;

								addElement(uploadContainer,UploadType);
								addElement(uploadContainer,Title);
								addElement(uploadContainer,Status);
								addElement(uploadContainer,StautsInfo);
								var del = addElement(uploadContainer,Button1);
								
								del.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										delete (window.BetterUploadsFiles)[upload];
										updateGUI();
									}
								}
							}else if((window.BetterUploadsFiles)[upload].status == "authenticating"){
								uploadContainer.classList.add("authenticating");
								
								var UploadType = `<svg fill="white" viewbox="-50 0 490 490" class="BetterUploads-UploadType"><path d="M319.41,255.55a11.47,11.47,0,0,0-16.46,0L228.36,330l-41.31-41.31a11.47,11.47,0,0,0-16.46,0L154,305.09a11.36,11.36,0,0,0-3.29,8.41,11.16,11.16,0,0,0,3.29,8.23l66.18,66.18a11.24,11.24,0,0,0,8.22,3.47,11.47,11.47,0,0,0,8.41-3.47L336,288.64a11.16,11.16,0,0,0,3.29-8.23A11.36,11.36,0,0,0,336,272Z" transform="translate(-64.95)"/><path d="M320.45,0H65V490h360.1V112Zm46.12,380.5a139.73,139.73,0,0,1-51.09,51.1,141.32,141.32,0,0,1-141,0,139.73,139.73,0,0,1-51.09-51.1,141.3,141.3,0,0,1,0-140.95,139.73,139.73,0,0,1,51.09-51.1,141.32,141.32,0,0,1,141,0,139.73,139.73,0,0,1,51.09,51.1,141.3,141.3,0,0,1,0,141ZM300.25,131.8V19.8l104.6,112Z" transform="translate(-64.95)"/></svg>`;
								var Title =`<div class="BetterUploads-UploadTitle">`+upload+`</div>`;
								var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> Authenticating</div>`;
								var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">Loading Authentication in iFrame</div>`;
								var Button1 = `<svg upload="`+upload+`" viewbox="0 0 1792 1792" fill="white" class="BetterUploads-UploadButton1 BetterUploads-UploadButton"><path upload="`+upload+`" d="M1181.53,896l571.05-571a134.56,134.56,0,0,0,0-190.31l-95.22-95.22a134.56,134.56,0,0,0-190.31,0L896,610.47,325,39.42a134.56,134.56,0,0,0-190.31,0L39.42,134.64a134.56,134.56,0,0,0,0,190.31L610.47,896,39.42,1467.05a134.56,134.56,0,0,0,0,190.31l95.22,95.22a134.56,134.56,0,0,0,190.31,0l571.05-571,571.05,571.05a134.56,134.56,0,0,0,190.31,0l95.22-95.22a134.56,134.56,0,0,0,0-190.31Z" transform="translate(0)"/></svg>`;

								addElement(uploadContainer,UploadType);
								addElement(uploadContainer,Title);
								addElement(uploadContainer,Status);
								addElement(uploadContainer,StautsInfo);
								var del = addElement(uploadContainer,Button1);
								
								del.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										delete (window.BetterUploadsFiles)[upload];
										updateGUI();
									}
								}
							}else if((window.BetterUploadsFiles)[upload].status == "done"){
								uploadContainer.classList.add("done");
								
								var UploadType = `<svg fill="white" viewbox="-50 0 490 490" class="BetterUploads-UploadType"><path d="M320.45,0H65V490h360.1V112Zm-66.1,428.2H130a10.1,10.1,0,1,1,0-20.2h124.4a10.1,10.1,0,0,1,0,20.2Zm105.8-63.8H130a10.1,10.1,0,0,1,0-20.2h230.2a10.1,10.1,0,1,1,0,20.2Zm0-63.4H130a10.1,10.1,0,0,1,0-20.2h230.2a10.1,10.1,0,1,1,0,20.2Zm0-63.4H130a10.07,10.07,0,0,1-10.1-10.1A9.83,9.83,0,0,1,130,217.4h230.2a10.1,10.1,0,1,1,0,20.2Zm0-63.8H130a10.1,10.1,0,1,1,0-20.2h230.2a10.07,10.07,0,0,1,10.1,10.1A10,10,0,0,1,360.15,173.8Zm-59.9-42V19.8l104.6,112Z" transform="translate(-64.95)"/></svg>`;
								var Title =`<div class="BetterUploads-UploadTitle">`+upload+`</div>`;
								var Status =`<div class="BetterUploads-UploadStatus">`+(window.BetterUploadsFiles)[upload].code+` - `+(window.BetterUploadsFiles)[upload].time+`</div>`;
								var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">`+Object.keys((window.BetterUploadsFiles)[upload].files)[0]+` - `+formatSizeUnits((window.BetterUploadsFiles)[upload].size)+`</div>`;
								var Button1 = `<svg upload="`+upload+`" viewbox="0 0 1792 1792" fill="white" class="BetterUploads-UploadButton1 BetterUploads-UploadButton"><path upload="`+upload+`" d="M1181.53,896l571.05-571a134.56,134.56,0,0,0,0-190.31l-95.22-95.22a134.56,134.56,0,0,0-190.31,0L896,610.47,325,39.42a134.56,134.56,0,0,0-190.31,0L39.42,134.64a134.56,134.56,0,0,0,0,190.31L610.47,896,39.42,1467.05a134.56,134.56,0,0,0,0,190.31l95.22,95.22a134.56,134.56,0,0,0,190.31,0l571.05-571,571.05,571.05a134.56,134.56,0,0,0,190.31,0l95.22-95.22a134.56,134.56,0,0,0,0-190.31Z" transform="translate(0)"/></svg>`;
								var Button2 = `<svg upload="`+upload+`" viewbox="0 0 495 434.37" fill="white" class="BetterUploads-UploadButton2 BetterUploads-UploadButton"><path upload="`+upload+`" d="M164.71,456.69h0a8,8,0,0,0,12.51,6.6l55.09-37.62-67.6-32.21Z" transform="translate(0 -30.32)"/><path upload="`+upload+`" d="M492.43,32.44A8,8,0,0,0,487,30.32a7.9,7.9,0,0,0-3.5.81L7.91,264.42a14.15,14.15,0,0,0,.15,25.47L133.4,349.62,384,143.63,164.46,364.41l156.14,74.4a14.14,14.14,0,0,0,19.24-7.55l154.6-390A8,8,0,0,0,492.43,32.44Z" transform="translate(0 -30.32)"/></svg>`;
								
								addElement(uploadContainer,UploadType);
								addElement(uploadContainer,Title);
								addElement(uploadContainer,Status);
								addElement(uploadContainer,StautsInfo);
								var del = addElement(uploadContainer,Button1);
								var send = addElement(uploadContainer,Button2);
								
								send.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										sendMessage(formatMessage(window.BetterUploadsFiles[upload].files));
									}
								}
								del.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										delete (window.BetterUploadsFiles)[upload];
										updateGUI();
									}
								}
							}else if((window.BetterUploadsFiles)[upload].status == "failed"){
								uploadContainer.classList.add("failed");
								
								var UploadType = `<svg fill="white" viewbox="-50 0 490 490" class="BetterUploads-UploadType"><path d="M320.45,0H65V490h360.1V112Zm49.44,397.73a19.62,19.62,0,0,1,0,27.74L356,439.35a19.6,19.6,0,0,1-27.74,0L245,356.1l-83.26,83.25a19.6,19.6,0,0,1-27.74,0l-13.89-13.88a19.62,19.62,0,0,1,0-27.74l83.26-83.26-83.26-83.26a19.63,19.63,0,0,1,0-27.75L134,189.58a19.62,19.62,0,0,1,27.74,0L245,272.84l83.26-83.26a19.62,19.62,0,0,1,27.74,0l13.89,13.88a19.63,19.63,0,0,1,0,27.75l-83.26,83.26ZM300.25,131.8V19.8l104.6,112Z" transform="translate(-64.95)"/></svg>`;
								var Title =`<div class="BetterUploads-UploadTitle">`+upload+`</div>`;
								var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> Failed</div>`;
								var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">`+((window.BetterUploadsFiles)[upload].files)[Object.keys((window.BetterUploadsFiles)[upload].files)[0]].path+`</div>`;
								var Button1 = `<svg upload="`+upload+`" viewbox="0 0 1792 1792" fill="white" class="BetterUploads-UploadButton1 BetterUploads-UploadButton"><path upload="`+upload+`" d="M1181.53,896l571.05-571a134.56,134.56,0,0,0,0-190.31l-95.22-95.22a134.56,134.56,0,0,0-190.31,0L896,610.47,325,39.42a134.56,134.56,0,0,0-190.31,0L39.42,134.64a134.56,134.56,0,0,0,0,190.31L610.47,896,39.42,1467.05a134.56,134.56,0,0,0,0,190.31l95.22,95.22a134.56,134.56,0,0,0,190.31,0l571.05-571,571.05,571.05a134.56,134.56,0,0,0,190.31,0l95.22-95.22a134.56,134.56,0,0,0,0-190.31Z" transform="translate(0)"/></svg>`;
								
								addElement(uploadContainer,UploadType);
								addElement(uploadContainer,Title);
								addElement(uploadContainer,Status);
								addElement(uploadContainer,StautsInfo);
								var del = addElement(uploadContainer,Button1);
								
								del.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										delete (window.BetterUploadsFiles)[upload];
										updateGUI();
									}
								}
							}
						}else{
							if((window.BetterUploadsFiles)[upload].status == "uploading"){
								uploadContainer.classList.add("uploading");
								
								var UploadType = `<svg fill="white" class="BetterUploads-UploadType" viewbox="-50 0 640 640"><path d="M568.17,572.5V131.27L446.07.54H147.83V44.68H56.53V640H513.92V615.77h-.16V572.5ZM422.49,23.65l122.1,130.73H422.49Zm67,592.12H80.79V68.91h67V572.5H489.5ZM438,458H258.44a73.94,73.94,0,0,1-21.07-144.82c0-1-.06-2-.06-3.05a74,74,0,0,1,73.94-73.94,72,72,0,0,1,16.94,2A84.52,84.52,0,0,1,480.25,289a81.12,81.12,0,0,1-.76,11.14A84.34,84.34,0,0,1,438,458Z" transform="translate(-56.53 -0.54)"/><path d="M454.48,312.56a63.32,63.32,0,0,0-117.15-48.11,52.59,52.59,0,0,0-74.19,67.27c-1.57-.14-3.09-.47-4.7-.47a52.82,52.82,0,0,0,0,105.63H438a63.23,63.23,0,0,0,16.48-124.32Zm-79.85,39.82v63.37H332.38V352.38H290.13L353.5,289l63.38,63.38Z" transform="translate(-56.53 -0.54)"/></svg>`;
								var Title =`<div class="BetterUploads-UploadTitle">`+upload+`</div>`;
								var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> Uploading - `+formatSizeUnits((window.BetterUploadsFiles)[upload].uploading)+` / `+formatSizeUnits((window.BetterUploadsFiles)[upload].size)+`</div>`;
								var StautsInfo =`<div class="BetterUploads-UploadStatusInfo"><div class="BetterUploads-UploadBarContainer"><span style="width:`+((window.BetterUploadsFiles)[upload].uploading/(window.BetterUploadsFiles)[upload].size)*100+`%"></span></div></div>`;
								var Button1 = `<svg upload="`+upload+`" viewbox="0 0 1792 1792" fill="white" class="BetterUploads-UploadButton1 BetterUploads-UploadButton"><path upload="`+upload+`" d="M1181.53,896l571.05-571a134.56,134.56,0,0,0,0-190.31l-95.22-95.22a134.56,134.56,0,0,0-190.31,0L896,610.47,325,39.42a134.56,134.56,0,0,0-190.31,0L39.42,134.64a134.56,134.56,0,0,0,0,190.31L610.47,896,39.42,1467.05a134.56,134.56,0,0,0,0,190.31l95.22,95.22a134.56,134.56,0,0,0,190.31,0l571.05-571,571.05,571.05a134.56,134.56,0,0,0,190.31,0l95.22-95.22a134.56,134.56,0,0,0,0-190.31Z" transform="translate(0)"/></svg>`;
								var Button2 = `<svg upload="`+upload+`" viewbox="0 0 55.751 55.751" fill="white" class="BetterUploads-UploadButton2 BetterUploads-UploadButton"><path upload="`+upload+`" d="M31.836,43.006c0.282-0.281,0.518-0.59,0.725-0.912L54.17,20.485c2.107-2.109,2.109-5.528,0-7.638 c-2.109-2.107-5.527-2.109-7.638,0l-18.608,18.61L9.217,12.753c-2.109-2.108-5.527-2.109-7.637,0 C0.527,13.809-0.002,15.19,0,16.571c-0.002,1.382,0.527,2.764,1.582,3.816l21.703,21.706c0.207,0.323,0.445,0.631,0.729,0.913 c1.078,1.078,2.496,1.597,3.91,1.572C29.336,44.604,30.758,44.084,31.836,43.006z"/></svg>`;
								
								addElement(uploadContainer,UploadType);
								addElement(uploadContainer,Title);
								addElement(uploadContainer,Status);
								addElement(uploadContainer,StautsInfo);
								var del = addElement(uploadContainer,Button1);
								var expand = addElement(uploadContainer,Button2);
								
								del.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										delete (window.BetterUploadsFiles)[upload];
										updateGUI();
									}
								}
								expand.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										if(window.BetterUploadsUploadShown == upload){
											window.BetterUploadsUploadShown = "";
										}else{
											window.BetterUploadsUploadShown = upload;
										};
										updateGUI();
									}
								}
								for(var key of Object.keys((window.BetterUploadsFiles)[upload].files)){
									addElement(document.querySelector(".BetterUploads-UploadsContainer"),`<div upload="`+upload+`" class="BetterUploads-DropdownContainer"></div>`);
									var dropdownContainer = document.getElementsByClassName("BetterUploads-DropdownContainer")[document.getElementsByClassName("BetterUploads-DropdownContainer").length-1];
									dropdownContainer.classList.add("uploading");
									
									var UploadType = `<svg fill="white" class="BetterUploads-UploadType" viewbox="-50 0 640 640"><path d="M568.17,572.5V131.27L446.07.54H147.83V44.68H56.53V640H513.92V615.77h-.16V572.5ZM422.49,23.65l122.1,130.73H422.49ZM223.71,179.83h268.7a11.76,11.76,0,0,1,11.79,11.79,11.61,11.61,0,0,1-11.79,11.79H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.75,11.75,0,0,1-11.79-11.79A11.47,11.47,0,0,1,223.71,254.3Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h145.2a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm265.79,139H80.79V68.91h67V572.5H489.5Z" transform="translate(-56.53 -0.54)"/></svg>`;
									var Title =`<div class="BetterUploads-UploadTitle">`+key+`</div>`;
									
									for(var i=0;i<Object.keys((window.BetterUploadsFiles)[upload].files).indexOf(key);i++){
										window.BetterUploadsTempUploadSize = window.BetterUploadsTempUploadSize+(window.BetterUploadsFiles)[upload].files[Object.keys((window.BetterUploadsFiles)[upload].files)[i]].size;
									}
									if((window.BetterUploadsFiles)[upload].uploading>window.BetterUploadsTempUploadSize+(window.BetterUploadsFiles)[upload].files[key].size){
										var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> Uploaded - `+formatSizeUnits((window.BetterUploadsFiles)[upload].files[key].size)+` / `+formatSizeUnits((window.BetterUploadsFiles)[upload].files[key].size)+`</div>`;
									}else if((window.BetterUploadsFiles)[upload].uploading<window.BetterUploadsTempUploadSize+(window.BetterUploadsFiles)[upload].files[key].size && (window.BetterUploadsFiles)[upload].uploading>window.BetterUploadsTempUploadSize){
										var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> Uploading - `+formatSizeUnits((window.BetterUploadsFiles)[upload].uploading-window.BetterUploadsTempUploadSize)+` / `+formatSizeUnits((window.BetterUploadsFiles)[upload].files[key].size)+`</div>`;
									}else{
										var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> In Queue - `+formatSizeUnits(0)+` / `+formatSizeUnits((window.BetterUploadsFiles)[upload].files[key].size)+`</div>`;
									}
									
									(window.BetterUploadsFiles)[upload].files[key].size
									
									var StautsInfo =`<div class="BetterUploads-UploadStatusInfo"><div class="BetterUploads-DropdownUploadBarContainer"><span style="width:`+(((window.BetterUploadsFiles)[upload].uploading-window.BetterUploadsTempUploadSize)/(window.BetterUploadsFiles)[upload].files[key].size)*100+`%"></span></div></div>`;
									
									addElement(dropdownContainer,UploadType);
									addElement(dropdownContainer,Title);
									addElement(dropdownContainer,Status);
									addElement(dropdownContainer,StautsInfo);
									window.BetterUploadsTempUploadSize = 0;
								}
							}else if((window.BetterUploadsFiles)[upload].status == "authenticating"){
								uploadContainer.classList.add("authenticating");
								
								var UploadType = `<svg fill="white" class="BetterUploads-UploadType" viewbox="-50 0 640 640"><path d="M568.17,572.5V131.27L446.07.54H147.83V44.68H56.53V640H513.92V615.77h-.16V572.5ZM489.5,615.77H80.79V68.91h67V572.5H489.5ZM478.36,433.13A144.68,144.68,0,0,1,425.49,486a146.22,146.22,0,0,1-145.84,0,144.6,144.6,0,0,1-52.87-52.87,146.22,146.22,0,0,1,0-145.84,144.58,144.58,0,0,1,52.87-52.86,146.16,146.16,0,0,1,145.84,0,144.65,144.65,0,0,1,52.87,52.86,146.22,146.22,0,0,1,0,145.84ZM422.49,154.38V23.65l122.1,130.73Z" transform="translate(-56.53 -0.54)"/><path d="M429.55,303.84a11.88,11.88,0,0,0-17,0l-77.18,77-42.74-42.75a11.89,11.89,0,0,0-17,0l-17.21,17a11.79,11.79,0,0,0-3.41,8.7,11.56,11.56,0,0,0,3.41,8.51l68.47,68.47a11.64,11.64,0,0,0,8.51,3.6,11.86,11.86,0,0,0,8.71-3.6L446.77,338.08a11.55,11.55,0,0,0,3.4-8.51,11.78,11.78,0,0,0-3.4-8.7Z" transform="translate(-56.53 -0.54)"/></svg>`;
								var Title =`<div class="BetterUploads-UploadTitle">`+upload+`</div>`;
								var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> Authenticating</div>`;
								var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">Loading Authentication in iFrame</div>`;
								var Button1 = `<svg upload="`+upload+`" viewbox="0 0 1792 1792" fill="white" class="BetterUploads-UploadButton1 BetterUploads-UploadButton"><path upload="`+upload+`" d="M1181.53,896l571.05-571a134.56,134.56,0,0,0,0-190.31l-95.22-95.22a134.56,134.56,0,0,0-190.31,0L896,610.47,325,39.42a134.56,134.56,0,0,0-190.31,0L39.42,134.64a134.56,134.56,0,0,0,0,190.31L610.47,896,39.42,1467.05a134.56,134.56,0,0,0,0,190.31l95.22,95.22a134.56,134.56,0,0,0,190.31,0l571.05-571,571.05,571.05a134.56,134.56,0,0,0,190.31,0l95.22-95.22a134.56,134.56,0,0,0,0-190.31Z" transform="translate(0)"/></svg>`;
								var Button2 = `<svg upload="`+upload+`" viewbox="0 0 55.751 55.751" fill="white" class="BetterUploads-UploadButton2 BetterUploads-UploadButton"><path upload="`+upload+`" d="M31.836,43.006c0.282-0.281,0.518-0.59,0.725-0.912L54.17,20.485c2.107-2.109,2.109-5.528,0-7.638 c-2.109-2.107-5.527-2.109-7.638,0l-18.608,18.61L9.217,12.753c-2.109-2.108-5.527-2.109-7.637,0 C0.527,13.809-0.002,15.19,0,16.571c-0.002,1.382,0.527,2.764,1.582,3.816l21.703,21.706c0.207,0.323,0.445,0.631,0.729,0.913 c1.078,1.078,2.496,1.597,3.91,1.572C29.336,44.604,30.758,44.084,31.836,43.006z"/></svg>`;
								
								addElement(uploadContainer,UploadType);
								addElement(uploadContainer,Title);
								addElement(uploadContainer,Status);
								addElement(uploadContainer,StautsInfo);
								var del = addElement(uploadContainer,Button1);
								var expand = addElement(uploadContainer,Button2);
								
								del.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										delete (window.BetterUploadsFiles)[upload];
										updateGUI();
									}
								}
								expand.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										if(window.BetterUploadsUploadShown == upload){
											window.BetterUploadsUploadShown = "";
										}else{
											window.BetterUploadsUploadShown = upload;
										};
										updateGUI();
									}
								}
								for(var key of Object.keys((window.BetterUploadsFiles)[upload].files)){
									addElement(document.querySelector(".BetterUploads-UploadsContainer"),`<div upload="`+upload+`" class="BetterUploads-DropdownContainer"></div>`);
									var dropdownContainer = document.getElementsByClassName("BetterUploads-DropdownContainer")[document.getElementsByClassName("BetterUploads-DropdownContainer").length-1];
									dropdownContainer.classList.add("authenticating");
									
									var UploadType = `<svg fill="white" class="BetterUploads-UploadType" viewbox="-50 0 640 640"><path d="M568.17,572.5V131.27L446.07.54H147.83V44.68H56.53V640H513.92V615.77h-.16V572.5ZM422.49,23.65l122.1,130.73H422.49ZM223.71,179.83h268.7a11.76,11.76,0,0,1,11.79,11.79,11.61,11.61,0,0,1-11.79,11.79H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.75,11.75,0,0,1-11.79-11.79A11.47,11.47,0,0,1,223.71,254.3Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h145.2a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm265.79,139H80.79V68.91h67V572.5H489.5Z" transform="translate(-56.53 -0.54)"/></svg>`;
									var Title =`<div class="BetterUploads-UploadTitle">`+key+`</div>`;
									var Status =`<div class="BetterUploads-UploadStatus">`+(window.BetterUploadsFiles)[upload].files[key].code+`</div>`;
									var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">`+formatSizeUnits((window.BetterUploadsFiles)[upload].files[key].size)+`</div>`;
									
									addElement(dropdownContainer,UploadType);
									addElement(dropdownContainer,Title);
									addElement(dropdownContainer,Status);
									addElement(dropdownContainer,StautsInfo);
								}
							}else if((window.BetterUploadsFiles)[upload].status == "done"){
								uploadContainer.classList.add("done");
								
								var UploadType = `<svg fill="white" class="BetterUploads-UploadType" viewbox="-50 0 640 640"><path d="M568.17,572.5V131.27L446.07.54H147.83V44.68H56.53V640H513.92V615.77h-.16V572.5ZM422.49,23.65l122.1,130.73H422.49ZM223.71,179.83h268.7a11.76,11.76,0,0,1,11.79,11.79,11.61,11.61,0,0,1-11.79,11.79H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.75,11.75,0,0,1-11.79-11.79A11.47,11.47,0,0,1,223.71,254.3Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h145.2a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm265.79,139H80.79V68.91h67V572.5H489.5Z" transform="translate(-56.53 -0.54)"/></svg>`;
								var Title =`<div class="BetterUploads-UploadTitle">`+upload+`</div>`;
								var Status =`<div class="BetterUploads-UploadStatus">`+(window.BetterUploadsFiles)[upload].code+` - `+(window.BetterUploadsFiles)[upload].time+`</div>`;
								var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">`+formatSizeUnits((window.BetterUploadsFiles)[upload].size)+`</div>`;
								var Button1 = `<svg upload="`+upload+`" viewbox="0 0 1792 1792" fill="white" class="BetterUploads-UploadButton1 BetterUploads-UploadButton"><path upload="`+upload+`" d="M1181.53,896l571.05-571a134.56,134.56,0,0,0,0-190.31l-95.22-95.22a134.56,134.56,0,0,0-190.31,0L896,610.47,325,39.42a134.56,134.56,0,0,0-190.31,0L39.42,134.64a134.56,134.56,0,0,0,0,190.31L610.47,896,39.42,1467.05a134.56,134.56,0,0,0,0,190.31l95.22,95.22a134.56,134.56,0,0,0,190.31,0l571.05-571,571.05,571.05a134.56,134.56,0,0,0,190.31,0l95.22-95.22a134.56,134.56,0,0,0,0-190.31Z" transform="translate(0)"/></svg>`;
								var Button2 = `<svg upload="`+upload+`" viewbox="0 0 495 434.37" fill="white" class="BetterUploads-UploadButton2 BetterUploads-UploadButton"><path upload="`+upload+`" d="M164.71,456.69h0a8,8,0,0,0,12.51,6.6l55.09-37.62-67.6-32.21Z" transform="translate(0 -30.32)"/><path upload="`+upload+`" d="M492.43,32.44A8,8,0,0,0,487,30.32a7.9,7.9,0,0,0-3.5.81L7.91,264.42a14.15,14.15,0,0,0,.15,25.47L133.4,349.62,384,143.63,164.46,364.41l156.14,74.4a14.14,14.14,0,0,0,19.24-7.55l154.6-390A8,8,0,0,0,492.43,32.44Z" transform="translate(0 -30.32)"/></svg>`;
								var Button3 = `<svg upload="`+upload+`" viewbox="0 0 55.751 55.751" fill="white" class="BetterUploads-UploadButton3 BetterUploads-UploadButton"><path upload="`+upload+`" d="M31.836,43.006c0.282-0.281,0.518-0.59,0.725-0.912L54.17,20.485c2.107-2.109,2.109-5.528,0-7.638 c-2.109-2.107-5.527-2.109-7.638,0l-18.608,18.61L9.217,12.753c-2.109-2.108-5.527-2.109-7.637,0 C0.527,13.809-0.002,15.19,0,16.571c-0.002,1.382,0.527,2.764,1.582,3.816l21.703,21.706c0.207,0.323,0.445,0.631,0.729,0.913 c1.078,1.078,2.496,1.597,3.91,1.572C29.336,44.604,30.758,44.084,31.836,43.006z"/></svg>`;
								
								
								
								addElement(uploadContainer,UploadType);
								addElement(uploadContainer,Title);
								addElement(uploadContainer,Status);
								addElement(uploadContainer,StautsInfo);
								var del = addElement(uploadContainer,Button1);
								var send = addElement(uploadContainer,Button2);
								var expand = addElement(uploadContainer,Button3);
								
								del.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										delete (window.BetterUploadsFiles)[upload];
										updateGUI();
									}
								}
								send.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										sendMessage(formatMessage(window.BetterUploadsFiles[upload].files));
									}
								}
								expand.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										if(window.BetterUploadsUploadShown == upload){
											window.BetterUploadsUploadShown = "";
										}else{
											window.BetterUploadsUploadShown = upload;
										};
										updateGUI();
									}
								}
								
								for(var key of Object.keys((window.BetterUploadsFiles)[upload].files)){
									addElement(document.querySelector(".BetterUploads-UploadsContainer"),`<div upload="`+upload+`" class="BetterUploads-DropdownContainer"></div>`);
									var dropdownContainer = document.getElementsByClassName("BetterUploads-DropdownContainer")[document.getElementsByClassName("BetterUploads-DropdownContainer").length-1];
									dropdownContainer.classList.add("done");
									
									var UploadType = `<svg fill="white" class="BetterUploads-UploadType" viewbox="-50 0 640 640"><path d="M568.17,572.5V131.27L446.07.54H147.83V44.68H56.53V640H513.92V615.77h-.16V572.5ZM422.49,23.65l122.1,130.73H422.49ZM223.71,179.83h268.7a11.76,11.76,0,0,1,11.79,11.79,11.61,11.61,0,0,1-11.79,11.79H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.75,11.75,0,0,1-11.79-11.79A11.47,11.47,0,0,1,223.71,254.3Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h145.2a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm265.79,139H80.79V68.91h67V572.5H489.5Z" transform="translate(-56.53 -0.54)"/></svg>`;
									var Title =`<div class="BetterUploads-UploadTitle">`+key+`</div>`;
									var Status =`<div class="BetterUploads-UploadStatus">`+(window.BetterUploadsFiles)[upload].files[key].code+`</div>`;
									var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">`+formatSizeUnits((window.BetterUploadsFiles)[upload].files[key].size)+`</div>`;
									var Button1 = `<svg key="`+key+`" upload="`+upload+`" viewbox="0 0 495 434.37" fill="white" class="BetterUploads-DropdownButton BetterUploads-UploadButton"><path key="`+key+`" upload="`+upload+`" d="M164.71,456.69h0a8,8,0,0,0,12.51,6.6l55.09-37.62-67.6-32.21Z" transform="translate(0 -30.32)"/><path key="`+key+`" upload="`+upload+`" d="M492.43,32.44A8,8,0,0,0,487,30.32a7.9,7.9,0,0,0-3.5.81L7.91,264.42a14.15,14.15,0,0,0,.15,25.47L133.4,349.62,384,143.63,164.46,364.41l156.14,74.4a14.14,14.14,0,0,0,19.24-7.55l154.6-390A8,8,0,0,0,492.43,32.44Z" transform="translate(0 -30.32)"/></svg>`;

									addElement(dropdownContainer,UploadType);
									addElement(dropdownContainer,Title);
									addElement(dropdownContainer,Status);
									addElement(dropdownContainer,StautsInfo);
									var send = addElement(dropdownContainer,Button1);
									
									send.onmousedown = function(event){
										if(event.button == 0){
											var key = event.target.getAttribute("key");
											var upload = event.target.getAttribute("upload");
											var a = {[key]:window.BetterUploadsFiles[upload].files[key]};
											sendMessage(formatMessage(a));
										}
									}
								}								
							}else if((window.BetterUploadsFiles)[upload].status == "failed"){
								uploadContainer.classList.add("failed");
								
								var UploadType = `<svg fill="white" class="BetterUploads-UploadType" viewbox="-50 0 640 640"><path d="M568.17,572.5V131.27L446.07.54H147.83V44.68H56.53V640H513.92V615.77h-.16V572.5ZM233.11,262.08a19.62,19.62,0,0,1,0-27.74L247,220.45a19.62,19.62,0,0,1,27.74,0L358,303.71l83.26-83.26a19.62,19.62,0,0,1,27.74,0l13.89,13.89a19.62,19.62,0,0,1,0,27.74l-83.26,83.26,83.26,83.26a19.62,19.62,0,0,1,0,27.74L469,470.23a19.62,19.62,0,0,1-27.74,0L358,387l-83.26,83.26a19.62,19.62,0,0,1-27.74,0l-13.89-13.89a19.62,19.62,0,0,1,0-27.74l83.26-83.26ZM489.5,615.77H80.79V68.91h67V572.5H489.5Zm-67-461.39V23.65l122.1,130.73Z" transform="translate(-56.53 -0.54)"/></svg>`;
								var Title =`<div class="BetterUploads-UploadTitle">`+upload+`</div>`;
								var Status =`<div class="BetterUploads-UploadStatus"><span class="BetterUploads-Notification"></span> Failed</div>`;
								var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">Multiple Files</div>`;
								var Button1 = `<svg upload="`+upload+`" viewbox="0 0 1792 1792" fill="white" class="BetterUploads-UploadButton1 BetterUploads-UploadButton"><path upload="`+upload+`" d="M1181.53,896l571.05-571a134.56,134.56,0,0,0,0-190.31l-95.22-95.22a134.56,134.56,0,0,0-190.31,0L896,610.47,325,39.42a134.56,134.56,0,0,0-190.31,0L39.42,134.64a134.56,134.56,0,0,0,0,190.31L610.47,896,39.42,1467.05a134.56,134.56,0,0,0,0,190.31l95.22,95.22a134.56,134.56,0,0,0,190.31,0l571.05-571,571.05,571.05a134.56,134.56,0,0,0,190.31,0l95.22-95.22a134.56,134.56,0,0,0,0-190.31Z" transform="translate(0)"/></svg>`;
								var Button2 = `<svg upload="`+upload+`" viewbox="0 0 55.751 55.751" fill="white" class="BetterUploads-UploadButton2 BetterUploads-UploadButton"><path upload="`+upload+`" d="M31.836,43.006c0.282-0.281,0.518-0.59,0.725-0.912L54.17,20.485c2.107-2.109,2.109-5.528,0-7.638 c-2.109-2.107-5.527-2.109-7.638,0l-18.608,18.61L9.217,12.753c-2.109-2.108-5.527-2.109-7.637,0 C0.527,13.809-0.002,15.19,0,16.571c-0.002,1.382,0.527,2.764,1.582,3.816l21.703,21.706c0.207,0.323,0.445,0.631,0.729,0.913 c1.078,1.078,2.496,1.597,3.91,1.572C29.336,44.604,30.758,44.084,31.836,43.006z"/></svg>`;

								addElement(uploadContainer,UploadType);
								addElement(uploadContainer,Title);
								addElement(uploadContainer,Status);
								addElement(uploadContainer,StautsInfo);
								var del = addElement(uploadContainer,Button1);
								var expand = addElement(uploadContainer,Button2);
								
								del.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										delete (window.BetterUploadsFiles)[upload];
										updateGUI();
									}
								}
								expand.onmousedown = function(event){
									if(event.button == 0){
										var upload = event.target.getAttribute("upload");
										if(window.BetterUploadsUploadShown == upload){
											window.BetterUploadsUploadShown = "";
										}else{
											window.BetterUploadsUploadShown = upload;
										};
										updateGUI();
									}
								}
								for(var key of Object.keys((window.BetterUploadsFiles)[upload].files)){
									addElement(document.querySelector(".BetterUploads-UploadsContainer"),`<div upload="`+upload+`" class="BetterUploads-DropdownContainer"></div>`);
									var dropdownContainer = document.getElementsByClassName("BetterUploads-DropdownContainer")[document.getElementsByClassName("BetterUploads-DropdownContainer").length-1];
									dropdownContainer.classList.add("failed");
									
									var UploadType = `<svg fill="white" class="BetterUploads-UploadType" viewbox="-50 0 640 640"><path d="M568.17,572.5V131.27L446.07.54H147.83V44.68H56.53V640H513.92V615.77h-.16V572.5ZM422.49,23.65l122.1,130.73H422.49ZM223.71,179.83h268.7a11.76,11.76,0,0,1,11.79,11.79,11.61,11.61,0,0,1-11.79,11.79H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.75,11.75,0,0,1-11.79-11.79A11.47,11.47,0,0,1,223.71,254.3Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74h268.7a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm0,74.47h145.2a11.79,11.79,0,0,1,0,23.58H223.71a11.79,11.79,0,0,1,0-23.58Zm265.79,139H80.79V68.91h67V572.5H489.5Z" transform="translate(-56.53 -0.54)"/></svg>`;
									var Title =`<div class="BetterUploads-UploadTitle">`+key+`</div>`;
									var Status =`<div class="BetterUploads-UploadStatus">`+formatSizeUnits((window.BetterUploadsFiles)[upload].files[key].size)+`</div>`;
									var StautsInfo =`<div class="BetterUploads-UploadStatusInfo">`+(window.BetterUploadsFiles)[upload].files[key].path+`</div>`;
									
									addElement(dropdownContainer,UploadType);
									addElement(dropdownContainer,Title);
									addElement(dropdownContainer,Status);
									addElement(dropdownContainer,StautsInfo);
								}
							}
						}
					}
				}else{
					var Container = document.querySelector(".BetterUploads-UploadsContainer");
					var HTML = `<center class="BetterUploads-NoUploads" style="color: #5c5e64;margin-top: 20px;">No upload history</center>`;
					addElement(Container,HTML);
				}
				
				for(var element of document.querySelectorAll(".BetterUploads-DropdownContainer")){
					if(element.getAttribute("upload") == window.BetterUploadsUploadShown){
						element.classList.remove("BetterUploads-notSelected");
					}else if(element.classList.value.indexOf("BetterUploads-notSelected") == -1){
						element.classList.add("BetterUploads-notSelected");
					}
				};
				
				
				for(var element of document.querySelectorAll(".BetterUploads-UploadButton")){
					if(element.getAttribute("viewBox") == "0 0 55.751 55.751"){
						if(element.getAttribute("upload") == window.BetterUploadsUploadShown){
							element.classList.add("BetterUploads-ButtonRotated");
						}else if(element.classList.value.indexOf("BetterUploads-notSelected") == -1){
							element.classList.remove("BetterUploads-ButtonRotated");
						}
					}
				};
				saveSettings();
			}
			// END GUI
			
			// CHAT
			function sendMessage(message){
				BdApi.findModuleByProps('enqueue').enqueue(
					{
						message: {
						channelId: BdApi.findModuleByProps('getChannelId').getChannelId(),
						content: message,
						nonce: BdApi.findModuleByProps('fromTimestamp').fromTimestamp(new Date),
						},
							type: 'send',
						},
					() => {},
				);
				updateChat();
			}
			function formatMessage(files){
				var MessageJson = {};
				for(var file of Object.keys(files)){
					if(files[file].shorturl == ""){
						MessageJson[file] = {"size":files[file].size,"url":files[file].url[0].substr(8)};
					}else{
						MessageJson[file] = {"size":files[file].size,"url":files[file].shorturl[0].substr(8)};
					}
				}
				return "!!!BETTERUPLOADS!!!"+JSON.stringify(MessageJson)+"!!!BETTERUPLOADS!!!";
			}
			// END CHAT
			
			// HOTKEY
			onkeydown = onkeyup = function(e){
				e = e || event;
				KeyPressedMap[e.keyCode] = e.type == 'keydown';
				var trueMap = [];
				for(var key of Object.keys(KeyPressedMap)){
					if(KeyPressedMap[key] == true){
						trueMap.push(key);
					}
				}
				if(trueMap.length > 0){
					for(var hotkey of Object.keys(window.BetterUploadsSettings.Hotkeys)){
						var isHotkey = true;
						for(var key in window.BetterUploadsSettings.Hotkeys[hotkey]){
							if(trueMap.indexOf(window.BetterUploadsSettings.Hotkeys[hotkey][key].toString()) == -1){
								isHotkey = false;
							}
						}
						if(isHotkey){
							hotkeyHandler(hotkey);
						}
					}
				}
			}
			function hotkeyHandler(hotkey){
				if(hotkey == "ScaleIncrease"){
					if(!document.getElementById("BetterUploads-GUIContainer").classList.contains("BetterUploads-Hidden")){
						window.BetterUploadsSettings.UploadsScale = window.BetterUploadsSettings.UploadsScale + window.BetterUploadsSettings.HotkeyIncriment;
						scaleGui(window.BetterUploadsSettings.UploadsScale);
						saveSettings();
					}
				}else if(hotkey == "ScaleDecrease"){
					if(!document.getElementById("BetterUploads-GUIContainer").classList.contains("BetterUploads-Hidden")){
						window.BetterUploadsSettings.UploadsScale = window.BetterUploadsSettings.UploadsScale - window.BetterUploadsSettings.HotkeyIncriment;
						scaleGui(window.BetterUploadsSettings.UploadsScale);
						saveSettings();
					}
				}
				
			}
			// END HOTKEY
			
			// SETTINGS
			function loadSettings(){
				window.BetterUploadsSettings = BdApi.getData("BetterUploads", "settings");
				window.BetterUploadsFiles = BdApi.getData("BetterUploads", "uploads");
				window.BetterUploadsCodenames = BdApi.getData("BetterUploads", "codenames");
			}
			function saveSettings(){
				if(window.BetterUploadsSettings.Agreement.toUpperCase() == "I AGREE"){
					BdApi.setData("BetterUploads","settings", window.BetterUploadsSettings);
					BdApi.setData("BetterUploads", "uploads", window.BetterUploadsFiles);
					BdApi.setData("BetterUploads", "codenames", window.BetterUploadsCodenames);
				}
			}
			// END SETTINGS
			
			// OTHER
			async function processUpload(name,files){
				if(Object.keys(files).length > 0){
					try{
						var filesSize = 0;
						for(var file of Object.keys(files)){
							filesSize = filesSize + files[file].size
						}
						if(window.BetterUploadsSettings.UseFileSizeLimit == false || filesSize<=window.BetterUploadsSettings.FileSizeLimit){
							if(window.BetterUploadsSettings.UseFileCountLimit == false || Object.keys(files).length<=window.BetterUploadsSettings.UseFileCountLimit){
								var settings = window.BetterUploadsSettings
								newUpload(name,files);
								if(settings.UploadService == "Gofile"){
									var status = "uploading";
									updateUpload(name,{"status":[status],"shorturl":""});
									var serverResponse = await goFileRequestServer();
									if(serverResponse.status == "ok"){
										var server = serverResponse.data.server;
										var uploadResponse = await goFileUpload(name,server,files);
										if(uploadResponse.status == "ok"){
											var code = uploadResponse.data.code;
											var url = goFileGenerateDownloadURL(code);
											var status = "authenticating";
											updateUpload(name,{"code":[code],"url":[url],"status":[status]});
											for(var file of Object.keys(files)){
												var fileurl = goFileGenerateDirectURL(server,code,files[file])
												updateUpload(name,{"files":{[files[file].name]:{"code":[code],"url":[fileurl],"shorturl":""}}});
											}
											goFileAuthenticate(name,url);
										}else{
											alert("Failed On Upload");
											updateUpload(name,{"status":"failed"});
										}
									}else{
										alert("Failed On Request Server");
										updateUpload(name,{"status":"failed"});
									}
								}else if(settings.UploadService == "File"){
									if(Object.keys(files).length = 1){
										var status = "uploading";
										updateUpload(name,{"status":[status],"shorturl":""});
										var uploadResponse = await fileUpload(name,files);
										try{
											if(uploadResponse.success == true){
												var url = uploadResponse.link;
												var code = uploadResponse.key;
												var status = "done";
												updateUpload(name,{"code":[code],"url":[url],"status":[status],"files":{[files[0].name]:{"code":[code],"url":[url],"shorturl":""}}});
											}else{
												alert("Failed On Upload");
												updateUpload(name,{"status":"failed"});
											}
										}catch{
											alert("Failed On Upload");
											updateUpload(name,{"status":"failed"});
										}
									}else{
										alert("Failed On Upload\nOnly One File At A Time Is Permitted With File.io");
										updateUpload(name,{"status":"failed"});
									}
								}else if(settings.UploadService == "P2P"){
									alert("Unsupported Upload Service\n--Hopefully soon it will be supported but thats alot of coding");
								}else{
									alert("Unsupported Upload Service");
								}
								if(settings.ShortLinkService == "Tinyurl"){
									var url = await generateTinyurlShortLink(window.BetterUploadsFiles[name].url);
									updateUpload(name,{"shorturl":[url]});
									for(var file of Object.keys(files)){
										var fileshorturl = await generateTinyurlShortLink(window.BetterUploadsFiles[name].files[files[file].name].url);
										updateUpload(name,{"files":{[files[file].name]:{"shorturl":[fileshorturl]}}});
									}
								}else if(settings.ShortLinkService == "Rebrandly"){
									if(!window.BetterUploadsSettings.RebrandlyKey == ""){
										var url = await generateRebrandlyShortLink(window.BetterUploadsSettings.RebrandlyKey,window.BetterUploadsFiles[name].url);
										if(!url == false){
											try{
												updateUpload(name,{"shorturl":["https://"+url.shortUrl]});
												for(var file of Object.keys(files)){
													var fileshorturl = await generateRebrandlyShortLink(window.BetterUploadsSettings.RebrandlyKey,window.BetterUploadsFiles[name].files[files[file].name].url);
													if(!fileshorturl == false){
														updateUpload(name,{"files":{[files[file].name]:{"shorturl":["https://"+fileshorturl.shortUrl]}}});
													}else{
														alert("Rebrandly error");
													}
												}
											}catch{
												alert("Rebrandly error");
											}
										}else{
											alert("Rebrandly error");
										}
									}else{
										alert("No Rebrandly API Key");
									}
								}else if(settings.ShortLinkService == "Cuttly"){
									alert("Unsupported Upload Service\n--Hopefully soon it will be supported but XSS holds me back :(");
								}else{
									alert("Unsupported Shortlink Service");
								}
								if(window.BetterUploadsFiles[name].status == "failed"){
								}
							}else{
								alert("Failed On Upload\nFile Count Limit Reached");
							}
						}else{
							alert("Failed On Upload\nFile Size Limit Reached");
						}
					}catch{
						console.log("BetterUploads - An internal error has occured");
					}
				}
				document.getElementById("BetterUploads-FileInput").value = '';
			}
			function updateChat(){
				for(var element of document.querySelectorAll(".da-message .da-contents .da-markup")){
					if((element.innerHTML.split("!!!BETTERUPLOADS!!!").length-1) % 2 === 0 && element.innerHTML.split("!!!BETTERUPLOADS!!!").length-1 > 0){
						for(var i=0;i<(element.innerHTML.split("!!!BETTERUPLOADS!!!").length-1)/2;i++){
							if (/^[\],:{}\s]*$/.test(element.innerHTML.split("!!!BETTERUPLOADS!!!")[1+(i*2)].replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
								var files = JSON.parse(element.innerHTML.split("!!!BETTERUPLOADS!!!")[1+(i*2)]);
								element.innerHTML = "";
								for(var file of Object.keys(files)){
									if(files[file].hasOwnProperty("size") && files[file].hasOwnProperty("url")){
										element.innerHTML += `<div class="BetterUploads-MessageFileContainer"><img class="BetterUploads-MessageFileType" src="/assets/985ea67d2edab4424c62009886f12e44.svg" alt="Attachment file type: unknown" title="unknown"><div class="BetterDiscord-MessageFileInfoContainer"><div class="BetterDiscord-MessageFileTitleContainer"><a class="BetterDiscord-MessageFileTitle" href="https://`+files[file].url+`" target="_blank">`+file+`</a></div><div class="BetterDiscord-MessageFileStatus">`+formatSizeUnits(files[file].size)+`</div></div><a class="BetterDiscord-MessageFileDownloadButtonContainer" href="https://`+files[file].url+`" target="_blank"><svg class="BetterDiscord-MessageFileDownloadButton" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path class="fill" fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g></svg></a></div>`;
									}
								}
							}
						}
					}
				}
			}
			function addUploadButton(){
				if(!document.getElementById("BetterUploads-Button")){
					if(document.querySelector(ZLibrary.DiscordSelectors.Textarea.button)){
						var HTML = `<svg id="svg" width="24" height="24" class="`+document.querySelector(DiscordSelectors.Textarea.button).firstChild.className.baseVal+`" aria-hidden="false" viewBox="0 0 500 500"><path fill="currentColor" d="M446.844,208.875C447.625,203.313,448,197.656,448,192c0-70.563-57.406-128-128-128   c-40.938,0-78.531,19.344-102.344,51.063C209.25,113.031,200.688,112,192,112c-61.75,0-112,50.25-112,112   c0,1.563,0.031,3.094,0.094,4.625C33.813,242.375,0,285.313,0,336c0,61.75,50.25,112,112,112h272c70.594,0,128-57.406,128-128   C512,273.344,486.344,231.188,446.844,208.875z M384,416H112c-44.188,0-80-35.813-80-80s35.813-80,80-80   c2.438,0,4.75,0.5,7.125,0.719c-4.5-10-7.125-21.031-7.125-32.719c0-44.188,35.813-80,80-80c14.438,0,27.813,4.125,39.5,10.813   C246,120.25,280.156,96,320,96c53.031,0,96,42.969,96,96c0,12.625-2.594,24.625-7.031,35.688C449.813,238.75,480,275.688,480,320   C480,373.031,437.031,416,384,416z"></path><path fill="currentColor" d="M 160,288 224,288 224,384 288,384 288,288 352,288 256,192  z"></path></svg>`
						var Container = document.querySelector(DiscordSelectors.Textarea.buttons);
						var Clone = Container.firstChild.cloneNode(true);
						var Template = document.createElement('template');
						Template.innerHTML = HTML;
						Container.appendChild(Clone);
						Container.lastChild.children[0].children[0].remove();
						Container.lastChild.children[0].appendChild(Template.content.firstChild);
						Container.lastChild.id = "BetterUploads-Button"
						Container.lastChild.classList.add("BetterUploads-Component" )
						Container.lastChild.onmousedown = function(event){
							if(event.button == 0){
								document.getElementById("BetterUploads-FileInput").click();
							}else if(event.button == 1){
								
							}else if(event.button == 2){
								document.getElementById("BetterUploads-GUIContainer").classList.toggle("BetterUploads-Hidden");
							}
						}
					}
				}
			}
			function startup(){
				loadSettings();
				window.BetterUploadsUploadShown = "";
				scaleGui(window.BetterUploadsSettings.UploadsScale);
				updateGUI();
				updateChat();
				addUploadButton();
			}
			// END OTHER
		}

		
		onSwitch(){
			function formatSizeUnits(bytes){
				if (bytes >= 1073741824){ bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
				else if (bytes >= 1048576){ bytes = (bytes / 1048576).toFixed(2) + " MB"; }
				else if (bytes >= 1024){ bytes = (bytes / 1024).toFixed(2) + " KB"; }
				else if (bytes > 1){ bytes = bytes + " bytes"; }
				else if (bytes == 1){ bytes = bytes + " byte"; }
				else{ bytes = "0 bytes"; }
				return bytes;
			}
			function updateChat(){
				for(var element of document.querySelectorAll(".da-message .da-contents .da-markup")){
					if((element.innerHTML.split("!!!BETTERUPLOADS!!!").length-1) % 2 === 0 && element.innerHTML.split("!!!BETTERUPLOADS!!!").length-1 > 0){
						for(var i=0;i<(element.innerHTML.split("!!!BETTERUPLOADS!!!").length-1)/2;i++){
							if (/^[\],:{}\s]*$/.test(element.innerHTML.split("!!!BETTERUPLOADS!!!")[1+(i*2)].replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
								var files = JSON.parse(element.innerHTML.split("!!!BETTERUPLOADS!!!")[1+(i*2)]);
								element.innerHTML = "";
								for(var file of Object.keys(files)){
									if(files[file].hasOwnProperty("size") && files[file].hasOwnProperty("url")){
										element.innerHTML += `<div class="BetterUploads-MessageFileContainer"><img class="BetterUploads-MessageFileType" src="/assets/985ea67d2edab4424c62009886f12e44.svg" alt="Attachment file type: unknown" title="unknown"><div class="BetterDiscord-MessageFileInfoContainer"><div class="BetterDiscord-MessageFileTitleContainer"><a class="BetterDiscord-MessageFileTitle" href="https://`+files[file].url+`" target="_blank">`+file+`</a></div><div class="BetterDiscord-MessageFileStatus">`+formatSizeUnits(files[file].size)+`</div></div><a class="BetterDiscord-MessageFileDownloadButtonContainer" href="https://`+files[file].url+`" target="_blank"><svg class="BetterDiscord-MessageFileDownloadButton" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"></path><path class="fill" fill="currentColor" d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></g></svg></a></div>`;
									}
								}
							}
						}
					}
				}
			}
			function addUploadButton(){
				if(!document.getElementById("BetterUploads-Button")){
					if(document.querySelector(ZLibrary.DiscordSelectors.Textarea.button)){
						var HTML = `<svg id="svg" width="24" height="24" class="`+document.querySelector(DiscordSelectors.Textarea.button).firstChild.className.baseVal+`" aria-hidden="false" viewBox="0 0 500 500"><path fill="currentColor" d="M446.844,208.875C447.625,203.313,448,197.656,448,192c0-70.563-57.406-128-128-128   c-40.938,0-78.531,19.344-102.344,51.063C209.25,113.031,200.688,112,192,112c-61.75,0-112,50.25-112,112   c0,1.563,0.031,3.094,0.094,4.625C33.813,242.375,0,285.313,0,336c0,61.75,50.25,112,112,112h272c70.594,0,128-57.406,128-128   C512,273.344,486.344,231.188,446.844,208.875z M384,416H112c-44.188,0-80-35.813-80-80s35.813-80,80-80   c2.438,0,4.75,0.5,7.125,0.719c-4.5-10-7.125-21.031-7.125-32.719c0-44.188,35.813-80,80-80c14.438,0,27.813,4.125,39.5,10.813   C246,120.25,280.156,96,320,96c53.031,0,96,42.969,96,96c0,12.625-2.594,24.625-7.031,35.688C449.813,238.75,480,275.688,480,320   C480,373.031,437.031,416,384,416z"></path><path fill="currentColor" d="M 160,288 224,288 224,384 288,384 288,288 352,288 256,192  z"></path></svg>`
						var Container = document.querySelector(DiscordSelectors.Textarea.buttons);
						var Clone = Container.firstChild.cloneNode(true);
						var Template = document.createElement('template');
						Template.innerHTML = HTML;
						Container.appendChild(Clone);
						Container.lastChild.children[0].children[0].remove();
						Container.lastChild.children[0].appendChild(Template.content.firstChild);
						Container.lastChild.id = "BetterUploads-Button"
						Container.lastChild.classList.add("BetterUploads-Component" )
						Container.lastChild.onmousedown = function(event){
							if(event.button == 0){
								document.getElementById("BetterUploads-FileInput").click();
							}else if(event.button == 1){
								
							}else if(event.button == 2){
								document.getElementById("BetterUploads-GUIContainer").classList.toggle("BetterUploads-Hidden");
							}
						}
					}
				}
			}
			updateChat();
			addUploadButton();
		}
		
        onStop() {
			document.querySelectorAll('.BetterUploads-Component').forEach(e => e.remove());
        }
		
		load() {
		}
		
        getSettingsPanel() {
			return Settings.SettingPanel.build(this.saveSettings.bind(this), 
				new Settings.SettingGroup("Agreements").append(
					new Settings.Textbox("User Data Agreement", 'By typing "I Agree" in the textbox above you give this plugin permission to store certain file contents, and content generated by this plugin, and the services the plugin uses, such as but not limited to, file names, file paths, and file sizes, API Responses, and API Keys (Note: only keys manually entered by the end user will be stored).', this.settings.Agreement, (e) => {this.settings.Agreement = e;window.BetterUploadsSettings = this.settings;})
				),
				new Settings.SettingGroup("Services").append(
					new Settings.SettingGroup("Upload Services").append(
						new Settings.Dropdown("Upload Service", "The Service Used To Upload And Store Your Files.", this.settings.UploadService, [
							{label: "Gofile.io", value: "Gofile"},
							{label: "File.io", value: "File"},
							{label: "Peer-To-Peer *BETA*", value: "P2P"}
						], (e) => {this.settings.UploadService = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Switch("Limit File Size", "Toggles The Use Of The Max File Size Limit.", this.settings.UseFileSizeLimit, (e) => {this.settings.UseFileSizeLimit = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Textbox("File Size Limit", "Limits Total File Size To The Set Amount In Bytes e.g. 5000 = 5MB Upload Limit", this.settings.FileSizeLimit, (e) => {this.settings.FileSizeLimit = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Switch("Limit File Count", "Toggles The Use Of The Max File Count Limit.", this.settings.UseFileCountLimit, (e) => {this.settings.UseFileCountLimit = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Slider("File Count Limit", "The Amount Of Files Allowed To Be Uploaded At Once", 0, 100, this.settings.FileCountLimit, (e) => {this.settings.FileCountLimit = e;window.BetterUploadsSettings = this.settings;}, {
							markers: [1,2,3,4,5,6,7,8,9,10],
							stickToMarkers: true
						})
					),
					new Settings.SettingGroup("ShortLink Services").append(
						new Settings.Switch("Use ShortLinks", "Toggle Use Of A Shortlink Service.", this.settings.UseShortLink, (e) => {this.settings.UseShortLink = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Dropdown("ShortLink Service", "The Service Used To Shorten The Links Of Your Files", this.settings.ShortLinkService, [
							{label: "Rebrandly.com", value: "Rebrandly"},
							{label: "Cutt.ly", value: "Cuttly"},
							{label: "Tinyurl.com", value: "Tinyurl"}
						], (e) => {this.settings.ShortLinkService = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Textbox("Rebrandly API Key", "Required To Use Rebrandly Service https://app.rebrandly.com/account/api-keys", this.settings.RebrandlyKey, (e) => {this.settings.RebrandlyKey = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Textbox("Cuttly API Key", "Required To Use Cuttly Service https://cutt.ly/edit", this.settings.CuttlyKey, (e) => {this.settings.CuttlyKey = e;window.BetterUploadsSettings = this.settings;})
					),
					new Settings.SettingGroup("AntiVirus Services").append(
						new Settings.Switch("Use AntiVirus", "Toggle Use The Use Of An AntiVirus Service.", this.settings.UseAntiVirus, (e) => {this.settings.UseAntiVirus = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Dropdown("AntiVirus Service", "The Service Used To Shorten The Links Of Your Files", this.settings.AntiVirusService, [
							{label: "DocConversionAPI.com", value: "DocConversionAPI"},
							{label: "VirusTotal.com", value: "VirusTotal"}
						], (e) => {this.settings.AntiVirusService = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Textbox("DoConversional API Key", "Required To Use DoConversional Service https://app.docconversionapi.com/#/applications", this.settings.DocConversionAPIKey, (e) => {this.settings.DocConversionAPIKey = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Textbox("DoConversional Application ID", "Required To Use DoConversional Service https://app.docconversionapi.com/#/applications", this.settings.DocConversionApplicationID, (e) => {this.settings.DocConversionApplicationID = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Textbox("VirusTotal API Key", "Required To Use Cuttly Service https://www.virustotal.com/gui/user/{user}/apikey", this.settings.VirusTotalKey, (e) => {this.settings.VirusTotalKey = e;window.BetterUploadsSettings = this.settings;})
					)
				),
				new Settings.SettingGroup("GUI").append(
					new Settings.SettingGroup("Colors").append(
						new Settings.ColorPicker("Uploading Color", "The Color Of Uploads While They Are Being Uploaded In The Status GUI", this.settings.UploadingColor, (e) => {this.settings.UploadingColor = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.ColorPicker("Authenticating Color", "The Color Of Uploads While They Are Being Authenticated In The Status GUI", this.settings.AuthenticatingColor, (e) => {this.settings.AuthenticatingColor = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.ColorPicker("Done Color", "The Color Files Once They Have Been Uploaded", this.settings.DoneColor, (e) => {this.settings.DoneColor = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.ColorPicker("Failed Color", "The Color Files Once They Have Failed To Upload", this.settings.FailedColor, (e) => {this.settings.FailedColor = e;window.BetterUploadsSettings = this.settings;})
					),
					new Settings.SettingGroup("Scaling").append(
						new Settings.Slider("GUI Scale", "The Scale Of The Uploads GUI In 100's Of Percent e.g. 0.5 = 0.5*100% = 50% Scale", 0.5, 1.5, this.settings.UploadsScale, (e) => {this.settings.UploadsScale = e;window.BetterUploadsSettings = this.settings;document.getElementsByClassName("BetterUploads-GUI")[0].style.transform = "scale("+e+") translateY(calc(-50% / "+e+")) translatex(calc(-50% / "+e+"))";}, {
							markers: [0.5,0.6,0.7,0.8,0.9,1,1.1,1.2,1.3,1.4,1.5],
							stickToMarkers: false,
						}),
						new Settings.Keybind("Gui Scale Increase Hotkey", "The Hotkey That Will Increase The Scale Of The GUI By The HotkeyIncriment", this.settings.Hotkeys.ScaleIncrease, (e) => {this.settings.Hotkeys.ScaleIncrease = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Keybind("Gui Scale Decrease Hotkey", "The Hotkey That Will Decrease The Scale Of The GUI By The HotkeyIncriment", this.settings.Hotkeys.ScaleDecrease, (e) => {this.settings.Hotkeys.ScaleDecrease = e;window.BetterUploadsSettings = this.settings;}),
						new Settings.Slider("Hotkey Incriment", "The Amount To Scale The Uploads GUI Using The GUI Scale Increase/Decrease Hotkeys",0.05, 0.5, this.settings.HotkeyIncriment, (e) => {this.settings.HotkeyIncriment = e;window.BetterUploadsSettings = this.settings;}, {
							markers: [0.05,0.1,0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.5],
							stickToMarkers: true,
						})
					)
				)
			);
        };
    };
};
          return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
    })();
/*@end*/
