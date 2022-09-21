const checkGameVersion = (savegame) => {
	if (savegame.general.version === currentGameVersion.general.version) {
		game = savegame;
	} else {
		updateGameVersion([]);
		game = versionChangeGame;
        game.general.version = currentGameVersion.general.version;
	}
};

const updateGameVersion = (varrr) => {
	let currentNest;
	if (varrr.length == 0) {
        currentNest = currentGameVersion;
		versionChangeGame = { ...currentGameVersion, ...savegame };
	} else if (varrr.length == 1) {
		currentNest = currentGameVersion[varrr[0]];
		if (savegame[varrr[0]]) {
			versionChangeGame[varrr[0]] = {
				...currentGameVersion[varrr[0]],
				...savegame[varrr[0]],
			};
		} else {
			versionChangeGame[varrr[0]] = currentGameVersion[varrr[0]];
		}
	} else if (varrr.length == 2) {
		currentNest = currentGameVersion[varrr[0]][varrr[1]];
		if (savegame[varrr[0]] && savegame[varrr[0]][varrr[1]]) {
			versionChangeGame[varrr[0]][varrr[1]] = {
				...currentGameVersion[varrr[0]][varrr[1]],
				...savegame[varrr[0]][varrr[1]],
			};
		} else {
			versionChangeGame[varrr[0]][varrr[1]] =
				currentGameVersion[varrr[0]][varrr[1]];
		}
	} else if (varrr.length == 3) {
		currentNest = currentGameVersion[varrr[0]][varrr[1]][varrr[2]];
		if (
			savegame[varrr[0]] &&
			savegame[varrr[0]][varrr[1]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]]
		) {
			versionChangeGame[varrr[0]][varrr[1]][varrr[2]] = {
				...currentGameVersion[varrr[0]][varrr[1]][varrr[2]],
				...savegame[varrr[0]][varrr[1]][varrr[2]],
			};
		} else {
			versionChangeGame[varrr[0]][varrr[1]][varrr[2]] =
				currentGameVersion[varrr[0]][varrr[1]][varrr[2]];
		}
	} else if (varrr.length == 4) {
		currentNest = currentGameVersion[varrr[0]][varrr[1]][varrr[2]][varrr[3]];
		if (
			savegame[varrr[0]] &&
			savegame[varrr[0]][varrr[1]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]]
		) {
			versionChangeGame[varrr[0]][varrr[1]][varrr[2]][varrr[3]] = {
				...currentGameVersion[varrr[0]][varrr[1]][varrr[2]][varrr[3]],
				...savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]],
			};
		} else {
			versionChangeGame[varrr[0]][varrr[1]][varrr[2]][varrr[3]] =
				currentGameVersion[varrr[0]][varrr[1]][varrr[2]][varrr[3]];
		}
	} else if (varrr.length == 5) {
		currentNest =
			currentGameVersion[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]];
		if (
			savegame[varrr[0]] &&
			savegame[varrr[0]][varrr[1]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]]
		) {
			versionChangeGame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]] = {
				...currentGameVersion[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]],
				...savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]],
			};
		} else {
			versionChangeGame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]] =
				currentGameVersion[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]];
		}
	} else if (varrr.length == 6) {
		currentNest = currentGameVersion[varrr[0]][varrr[1]];
		if (
			savegame[varrr[0]] &&
			savegame[varrr[0]][varrr[1]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]] &&
			savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]][varrr[5]]
		) {
			versionChangeGame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]][
				varrr[5]
			] = {
				...currentGameVersion[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]][
					varrr[5]
				],
				...savegame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]][varrr[5]],
			};
		} else {
			versionChangeGame[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]][
				varrr[5]
			] =
				currentGameVersion[varrr[0]][varrr[1]][varrr[2]][varrr[3]][varrr[4]][
					varrr[5]
				];
		}
	}
	Object.keys(currentNest).forEach((variable) => {
        if (typeof currentNest[variable] == "object" && currentNest[variable] != null) {
            let newVar = [...varrr, variable];
			updateGameVersion(newVar);
        }
	});
};
