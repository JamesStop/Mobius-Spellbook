// import LZString from "lz-string";

const save = () => {
	var saveString = JSON.stringify(game);
	var saveGame = JSON.parse(saveString);
	saveString = LZString.compressToBase64(JSON.stringify(saveGame));
	localStorage.setItem('savestring', saveString);
};

const autoSave = () => {
	save();
	setTimeout(autoSave, 60000);
};

const load = () => {
	if (localStorage.getItem('savestring')) {
		savestring = localStorage.getItem('savestring');
		savegame = JSON.parse(LZString.decompressFromBase64(savestring));
		checkGameVersion(savegame);
	} else {
		game = currentGameVersion;
	}
	resourceColorReset();
	setResourcesActiveColor(game.current.collecting);
	updateResourceAmount();
	updateTotalProductionAll();
	updateStorages();
	updateUpgradesDisplayAll();
	golemAssignColors(game.current.resources.golems.assignmentType);
	updateGolemsTotal();
	updateGolemsActiveAll();
	allStatUpdate();
	updateWholeFloor();
};

const exporting = () => {
	if (localStorage.getItem('savestring')) {
		navigator.clipboard.writeText(localStorage.getItem('savestring'));
	}
};

const importing = async () => {
	savestring = await navigator.clipboard.readText();
	localStorage.setItem('savestring', savestring);
	load();
};
