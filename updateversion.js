const checkGameVersion = (savegame) => {
    if (savegame.general.version === currentGameVersion.general.version) {
        game = savegame;
    } else {
        game = updateGameVersionTwo(currentGameVersion, savegame);
        game.general.version = currentGameVersion.general.version;
    }
};

const updateGameVersionTwo = (base, saveData) => {
    let newVersion = base;
    let save = saveData;
    Object.keys(newVersion).map((key) => {
        if (save.hasOwnProperty(key)) {
            if (typeof newVersion[key] == "object" && newVersion[key]) {
                newVersion = {
                    ...newVersion,
                    [key]: updateGameVersionTwo(newVersion[key], saveData[key]),
                };
            } else {
                newVersion = { ...newVersion, [key]: save[key] };
            }
        }
    });
    return newVersion;
};
