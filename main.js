//General Purpose Start//

//General Purpose End//

//Upgrades nav bar click functions start//

//Upgrades nav bar click functions end//

const upgradesNavColorReset = () => {
	const upgradesNavIds = [
		'upgrades-selector',
		'golems-selector',
		'spellbook-selector',
		'something-selector',
	];
	upgradesNavIds.map((id) => {
		$(`#${id}`).removeClass('nav-selected').addClass('nav-unselected')
	});
};

const setUpgradesNavActiveColor = (id) => {
	$(`#${id}`).removeClass('nav-unselected').addClass('nav-selected')
};

const upgradesDisplayHide = () => {
	const UpgradesDisplaysIds = [
		'upgrades-display',
		'golems-display',
		'spellbook-display',
		'something-display',
	];
	UpgradesDisplaysIds.map((id) => {
		$(`#${id}`).addClass('hidden')
	});
};

const upgradesDisplayShow = (id) => {
	const displayId = id.replace('selector', 'display');
	$(`#${displayId}`).removeClass('hidden')
};

const upgradesNavBarClick = (id) => {
	if ($(`#${id}`).attr('class').split(/\s+/).includes('temp-hidden') == false) {
		upgradesNavColorReset();
		setUpgradesNavActiveColor(id);
		upgradesDisplayHide();
		upgradesDisplayShow(id);
	}
};

//Resource bar click functions start//

const resourceColorReset = () => {
	const resourceBarIds = [
		'herb-button',
		'mythril-button',
		'yew-button',
		'crystal-button',
		'arcana-button',
	];
	resourceBarIds.map((id) => {
		$(`#${id}`).removeClass('color-active').addClass('color-inactive');
	});
};

const setResourcesActiveColor = (id) => {
	if (id != null) {
		$(`#${id}-button`).removeClass('color-inactive').addClass('color-active');
	}
};

const setCollectingResource = (resource) => {
	game.current.collecting = resource;
};

const resourceBarClick = (resource) => {
	if (game.current.combat.location != 'tower') {
		resourceColorReset();
		setResourcesActiveColor(resource);
		setCollectingResource(resource);
		updateTotalProductionAll();
	}
};

//Resource bar click functions end//

//Resource idle production update functions start//

const updateTotalProductionAll = () => {
	resources.map((resource) => {
		const updating = game.current.resources[resource];
		if (resource === game.current.collecting) {
			updating.totalPerSec =
				updating.golemPerSec + updating.activeProduction.activeProductionTotal;
		} else {
			updating.totalPerSec = updating.golemPerSec;
		}
		$(`#${resource}-sec`).text(() => {
			return formatNumbers(updating.totalPerSec)
		})
	});
};

const updateTotalProductionIndividual = (resource) => {
	const updating = game.current.resources[resource];
	if (resource === game.current.collecting) {
		updating.totalPerSec =
			updating.golemPerSec + updating.activeProduction.activeProductionTotal;
	} else {
		updating.totalPerSec = updating.golemPerSec;
	}
	$(`#${resource}-sec`).text(() => {
		return formatNumbers(updating.totalPerSec)
	})
};

//Resource idle production update functions end//

//Resource update value functions start//

const updateResourceAmount = () => {
	resources.map((resource) => {
		const updating = game.current.resources[resource];
		$(`#${resource}-current`).text(() => {
			return formatNumbers(updating.current)
		})
	});
};

const updateResourceAmountSingle = (resource) => {
	const updating = game.current.resources[resource];
	$(`#${resource}-current`).text(() => {
		return formatNumbers(updating.current)
	})
};

const updateResourceAmountGain = (resource, value) => {
	const updating = game.current.resources[resource];
	if (updating.current != updating.storage.storageTotal) {
		if (updating.current + value > updating.storage.storageTotal) {
			updating.current += updating.storage.storageTotal - updating.current;
		} else {
			updating.current += value;
		}
		updateResourceAmountSingle(resource);
	}
};

const updateResourceAmountLoss = (resource, value) => {
	const updating = game.current.resources[resource];
	if (updating.current - value < 0) {
		updating.current = 0;
	} else {
		updating.current -= value;
	}
	updateResourceAmountSingle(resource);
};

//Resource update value functions end//

//Idle resource collection functions start//

const collectResources = () => {
	resources.map((resource) => {
		const updateValue = game.current.resources[resource].totalPerSec;
		if (updateValue > 0) {
			updateResourceAmountGain(resource, updateValue);
		}
	});
};

window.setInterval(() => {
	collectResources();
}, 100);

//Idle resource collection functions end//

//Update storage max display functions start//

const updateStorages = () => {
	resources.map((resource) => {
		$(`#${resource}-storage-max`).text(() => {
			return formatNumbers(game.current.resources[resource].storage.storageTotal)
		})
	});
};

const updateStorageSingle = (resource) => {
	$(`#${resource}-storage-max`).text(() => {
		return formatNumbers(game.current.resources[resource].storage.storageTotal)
	})
};

//Update storage max display functions start//

//Update upgrades level display functions start//

const updateUpgradesDisplayAll = () => {
	resources.map((resource) => {
		upgradeTypes.map((type) => {
			$(`#${resource}-${type}-level`).text(() => {
				return formatNumbers(game.current.upgrades.repeatable[type].tierOne[resource])
			})
		});
	});
};

const updateUpgradesDisplaySingle = (upgradeType, type, tier, resource) => {
	$(`#${resource}-${type}-level`).text(() => {
		return formatNumbers(game.current.upgrades.repeatable[type].tierOne[resource])
	})
};

//Update upgrades level display functions start//

//Purchase upgrades functions start//





const purchaseUpgrade = (upgradeType, type, tier, resource) => {
	if (game.current.combat.location != 'tower') {
		if (upgradeType == 'repeatable') {
			let upgrading = game.current.upgrades[upgradeType][type][tier][resource];
			let baseCost = upgradeInfo[upgradeType][type][tier][resource].baseCost;
			let baseIncrement =
				upgradeInfo[upgradeType][type][tier][resource].costIncrement;
			let canUpgrade = true;
			baseCost.forEach((thing) => {
				let resourceType = Object.keys(thing);
				let baseValue = thing[Object.keys(thing)];
				let cost = Math.ceil(baseValue * baseIncrement ** upgrading);
				if (game.current.resources[resourceType].current < cost) {
					canUpgrade = false;
				}
			});
			if (canUpgrade == true) {
				baseCost.forEach((thing) => {
					let resourceType = Object.keys(thing);
					let baseValue = thing[Object.keys(thing)];
					let cost = Math.ceil(baseValue * baseIncrement ** upgrading);
					updateResourceAmountLoss(resourceType, cost);
				});
				game.current.upgrades[upgradeType][type][tier][resource] += 1;
				updateUpgradesDisplaySingle(upgradeType, type, tier, resource);
				purchasedUpgrade[`${type}Upgrade`](resource)
				updateToolTip('purchase', type, resource);
			}
		} else if (upgradeType == 'oneTime') {
			let baseCost = upgradeInfo[upgradeType][type].baseCost
			let canUpgrade = true;
			baseCost.forEach((thing) => {
				let resourceType = Object.keys(thing);
				let baseValue = thing[Object.keys(thing)];
				let cost = Math.ceil(baseValue);
				if (game.current.resources[resourceType].current < cost) {
					canUpgrade = false;
				}
			});
			if (canUpgrade == true) {
				baseCost.forEach((thing) => {
					let resourceType = Object.keys(thing);
					let baseValue = thing[Object.keys(thing)];
					let cost = Math.ceil(baseValue);
					updateResourceAmountLoss(resourceType, cost);
				});
				game.current.unlocks[type] = true
				unlocks[`${type}Unlock`]()
			}
		}
	}
};

const unlockAll = () => {
	Object.keys(unlocks).map((unlock) => {
		unlocks[unlock]();
	});
};

//Purchase upgrades functions end//

//Spells page functions start//

const singleSpellDisplay = (spell) => {
	$(`#${spell}-level`).text(game.current.combat.spells[spell].level)
	$(`#${spell}-expCurrent`).text(game.current.combat.spells[spell].expCurrent)
	$(`#${spell}-expMax`).text(game.current.combat.spells[spell].expMax)
	$(`#${spell}-exp-bar`).css({'width': `${Math.floor((game.current.combat.spells[spell].expCurrent / game.current.combat.spells[spell].expMax) * 100)}%`})

}

const allSpellDisplay = () => {
	Object.keys(game.current.combat.spells).map((spell) => {
		singleSpellDisplay(spell)
	})
}

const gainSpellExp = (spell, amount) => {
	let expCount = amount
	let currentSpell = game.current.combat.spells[spell]
	while (expCount > 0) {
		if (currentSpell.expCurrent + expCount >= currentSpell.expMax) {
			currentSpell.expCurrent = 0
			spellLevelUp(spell, 1)
			expCount -= (currentSpell.expMax - currentSpell.expCurrent)
		} else {
			game.current.combat.spells[spell].expCurrent += expCount
			expCount = 0
		}
	}
	singleSpellDisplay(spell)
}

const spellLevelUp = (spell, amount) => {
	let levels = amount
	let currentSpell = game.current.combat.spells[spell]
	while (levels > 0) {
		currentSpell.level += 1
		currentSpell.expMax = Math.floor(currentSpell.costGrowth * currentSpell.expMax)
		currentSpell.powerBase += currentSpell.spellGrowth
		levels -= 1
	}
	singleSpellDisplay(spell)
}


//Spells page functions end//

//golems page functions start//

//golems display function start//

const updateGolemsTotal = () => {
	$(`#golems-total-display`).text(() => {
		return formatNumbers(game.current.resources.golems.total)
	});
	$(`#golems-total-working-display`).text(() => {
		return formatNumbers(game.current.resources.golems.total)
	});
};

const updateGolemsActiveAll = () => {
	resources.map((resource) => {
		$(`#${resource}-golem-count`).text(() => {
			return formatNumbers(game.current.resources.golems.types[resource])
		})
	});
	$('#golems-active-display').text(() => {
		return formatNumbers(game.current.resources.golems.active)
	})
};

const updateGolemsActiveSingle = (resource) => {
	$(`#${resource}-golem-count`).text(() => {
		return formatNumbers(game.current.resources.golems.types[resource])
	})
	$('#golems-active-display').text(() => {
		return formatNumbers(game.current.resources.golems.active)
	})
};

//golems display function end//

//golem build functions start//

const buildGolem = () => {
	if (game.current.combat.location != 'tower') {
		let canBuild = true;
		for (let i = 0; i < resources.length; i++) {
			let resource = resources[i];
			if (
				game.current.resources[resource].current <
				game.current.resources.golems.cost.totalCost
			) {
				canBuild = false;
				break;
			}
		}
		if (canBuild) {
			if (
				game.current.resources.golems.total <
				game.current.resources.golems.storage.storageTotal
			) {
				resources.map((resource) => {
					game.current.resources[resource].current -=
						game.current.resources.golems.cost.totalCost;
				});
				game.current.resources.golems.total += 1;
				game.current.resources.golems.inactive += 1;
				updateResourceAmount();
				updateGolemsTotal();
			}
		}
	}
};

//golem build functions end//

//golem assignment type functions start//

const golemAssignColors = (id) => {
	assignmentButtons.map((button) => {
		$(`#${button}`).removeClass(`${button}-active`);
	});
	$(`#golem-${id}`).addClass(`golem-${id}-active`);
};

const assignType = (id) => {
	game.current.resources.golems.assignmentType = id.replace('golem-', '');
	golemAssignColors(game.current.resources.golems.assignmentType);
};

//golem assignment type functions end//

//golem production update functions start//

const updateGolemProductionAll = () => {
	resources.map((resource) => {
		game.current.resources[resource].golemPerSec =
			game.current.resources.golems.types[resource] * 1;
		updateTotalProductionIndividual(resource);
	});
};

const updateGolemProductionSingle = (resource) => {
	game.current.resources[resource].golemPerSec =
		game.current.resources.golems.types[resource] * 1;
	updateTotalProductionIndividual(resource);
};

//golem production update functions end//

//golem assignment amounts functions start//

const golemActiveAssign = (resource, value) => {
	if (
		game.current.resources.golems.inactive < value &&
		game.current.resources.golems.inactive > 0
	) {
		game.current.resources.golems.inactive = 0;
		game.current.resources.golems.active +=
			game.current.resources.golems.inactive;
		game.current.resources.golems.types[resource] +=
			game.current.resources.golems.inactive;
	} else if (game.current.resources.golems.inactive >= value) {
		game.current.resources.golems.inactive -= value;
		game.current.resources.golems.active += value;
		game.current.resources.golems.types[resource] += value;
	}
	updateGolemsTotal();
	updateGolemsActiveSingle(resource);
	updateGolemProductionSingle(resource);
};

const golemActiveRemove = (resource, value) => {
	if (
		game.current.resources.golems.types[resource] < value &&
		game.current.resources.golems.types[resource] > 0
	) {
		game.current.resources.golems.types[resource] = 0;
		game.current.resources.golems.active -=
			game.current.resources.golems.types[resource];
		game.current.resources.golems.inactive +=
			game.current.resources.golems.types[resource];
	} else if (game.current.resources.golems.types[resource] >= value) {
		game.current.resources.golems.types[resource] -= value;
		game.current.resources.golems.active -= value;
		game.current.resources.golems.inactive += value;
	}
	updateGolemsTotal();
	updateGolemsActiveSingle(resource);
	updateGolemProductionSingle(resource);
};

//golem assignment amounts functions start//

//golem assignment functions start//

const golemAssign = (resource) => {
	let golemsAmountToAssign = 1;
	let assignType = game.current.resources.golems.assignmentType;
	if (assignType == 'remove') {
		golemActiveRemove(resource, golemsAmountToAssign);
	} else {
		golemActiveAssign(resource, golemsAmountToAssign);
	}
};

//golem assignment functions end//

//golems page functions end//

//Combat related functions start//



//Enemy Creation Functions start//

const chooseEnemyType = () => {
	return enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
};

const createEnemy = () => {
	let typeOfEnemy = chooseEnemyType();
	let enemyMultis = enemies[typeOfEnemy];
	let currentFloor = game.current.combat.floor;
	let currentRoom = game.current.combat.room;
	game.current.combat.enemy.name = typeOfEnemy;
	game.current.combat.enemy.healthMax = Math.ceil(
		10 *
			1.15 ** (currentFloor - 1) *
			1.01 ** (currentRoom - 1) *
			enemyMultis.healthMulti
	);
	game.current.combat.enemy.healthCurrent = game.current.combat.enemy.healthMax;
	game.current.combat.enemy.attack = Math.ceil(
		1 *
			1.15 ** (currentFloor - 1) *
			1.01 ** (currentRoom - 1) *
			enemyMultis.attackMulti
	);
	game.current.combat.enemy.defense = Math.ceil(
		(currentFloor - 1) *
			1.15 ** (currentFloor - 1) *
			1.01 ** (currentRoom - 1) *
			enemyMultis.attackMulti
	);
	game.current.combat.enemy.speed = 1 * enemyMultis.speedMulti;
	stats.map((stat) => {
		updateStat("enemy", stat);
		$("#enemy-name").text(game.current.combat.enemy.type)
	})
};

//Enemy Creation Functions end//

//Stats Display updating Functions start//

const updateStat = (person, stat) => {
	$(`#${person}-${stat}`).text(() => {
		if (stat != 'name') {
			return formatNumbers(game.current.combat[person][stat])
		} else {
			return game.current.combat[person][stat]
		}
		
	})
	if (stat == 'healthCurrent') {
		$(`#${person}-health-bar`).css({"width": `${Math.floor((game.current.combat[person].healthCurrent / game.current.combat[person].healthMax) * 100)}%`})
	}
}

const allStatUpdate = () => {
	people.map((person) => {
		stats.map((stat) => {
			updateStat(person, stat);
		})
	})
}



//Stats Display updating Functions end//

//Health Regen functions start//

const regenHealth = () => {
	setTimeout(() => {
		if (game.current.combat.player.healthCurrent < game.current.combat.player.healthMax && !game.current.combat.fighting ) {
			if (game.current.combat.player.healthCurrent + game.current.combat.spells.heal.powerBase > game.current.combat.player.healthMax) {
				game.current.combat.player.healthCurrent = gane.current.combat.player.healthMax
			} else {
				game.current.combat.player.healthCurrent += game.current.combat.spells.heal.powerBase
			}
			gainSpellExp('heal', 1)
			updateStat('player', 'healthCurrent')
			regenHealth()
		}}, 500)
}





//Health Regen functions end//


//floor and room changing functions start//

const roomChange = () => {
	if (game.current.combat.location == 'tower') {
		updateRoomDefeated(game.current.combat.room)
	if (game.current.combat.direction == 'up') {
		if (game.current.combat.room < 25) {
			game.current.combat.room += 1
		} else {
			game.current.combat.room = 1
			game.current.combat.floor += 1
			updateWholeFloor()
			floorDisplay()
		}
		if (game.current.combat.floor > game.current.stats.best.floor) {
			game.current.stats.best.floor = game.current.combat.floor
			game.current.stats.best.room = 0
		}
		if (game.current.stats.best.floor == game.current.combat.floor && game.current.combat.room > game.current.stats.best.room) {
			game.current.stats.best.room = game.current.combat.room
		}
		if (game.current.combat.floor > game.overallStats.best.floor) {
			game.overallStats.best.floor = game.current.combat.floor
			game.overallStats.best.room = 0
		}
		if (game.overallStats.best.floor == game.current.combat.floor && game.current.combat.room > game.overallStats.best.room) {
			game.overallStats.best.room = game.current.combat.room
		}
	} else if (game.current.combat.direction == 'down') {
		if (game.current.combat.room > 1) {
			game.current.combat.room -= 1
		} else if (game.current.combat.room == 1 && game.current.combat.floor > 1) {
			game.current.combat.room = 25
			game.current.combat.floor -= 1
			updateWholeFloor()
			floorDisplay()
		} else if (game.current.combat.room == 1 && game.current.combat.floor == 1) {
			game.current.combat.room = 0
			game.current.combat.floor = 0
			game.current.combat.location = 'town'
			game.current.combat.fighting = false
			game.current.combat.autoFighting = false
			updateWholeFloor()
			floorDisplay()
			allCombatButtons()
		}
	}
	if (game.current.combat.room > 0) {
		updateRoomFighting(game.current.combat.room)
	}
	roomDisplay()
	}
	
}



//floor and room changing functions end//

//Floor coloring functions start//

const updateWholeFloor = () => {
	const currentRoom = game.current.combat.room;
	for (let i = 1; i < 26; i++) {
		$(`#tower-cell-${i}`).removeClass('fighting upDefeated downDefeated')
	}
	if (game.current.combat.direction == 'up') {
		if (currentRoom == 0) {
			return;
		}
		if (currentRoom > 1) {
			for (let i = 1; i < currentRoom; i++) {
				updateRoomDefeated(i);
			}
		}
	} else if (game.current.combat.direction == 'down') {
		if (currentRoom == 0) {
			return;
		}
		if (currentRoom > 1) {
			for (let i = 1; i < currentRoom; i++) {
				updateRoomDefeated(i);
			}
		}
	}
	updateRoomFighting(currentRoom);
};

const updateRoomFighting = (roomNumber) => {
	$(`#tower-cell-${roomNumber}`).removeClass('upDefeated downDefeated').addClass('fighting')
};

const updateRoomDefeated = (roomNumber) => {
	$(`#tower-cell-${roomNumber}`).removeClass('fighting upDefeated downDefeated')
	if (game.current.combat.room >= roomNumber ) {
		$(`#tower-cell-${roomNumber}`).addClass('upDefeated');
	}
	if (game.current.combat.direction =='down' && game.current.combat.room <= roomNumber) {
		$(`#tower-cell-${roomNumber}`).addClass('downDefeated');
	}
	
};

const floorDisplay = () => {
	$(`#floor-display`).text(game.current.combat.floor)
}

const roomDisplay = () => {
	$(`#room-display`).text(game.current.combat.room)
}


//Floor coloring functions end//

//Combat buttons displays functions //

const allCombatButtons = () => {
	if (game.current.combat.location == 'tower') {
		$('#ascend-button').addClass('hidden')
		$('#fight-button').removeClass('hidden')
		if (game.current.combat.direction == 'up') {
			$('#descend-button').removeClass('hidden')
		} else {
			$('#descend-button').addClass('hidden')
		}
	} else {
		$('#ascend-button').removeClass('hidden')
		$('#fight-button').addClass('hidden')
		$('#descend-button').addClass('hidden')
	}
}

//Combat buttons displays functsions end//

//Fighting functions start//

const startAscending = () => {
	if (game.current.combat.location == 'town') {
		game.current.combat.location = 'tower'
		game.current.combat.direction = 'up'
		game.current.combat.floor = 1
		game.current.combat.room = 1
		if (game.current.stats.best.floor == 0) {
			game.current.stats.best.floor = 1
			game.current.stats.best.room = 1
		}
		if (game.overallStats.best.floor == 0) {
			game.overallStats.best.floor = 1
			game.overallStats.best.room = 1
		}
		startFighting()
		$('#ascend-button').addClass('hidden')
		$('#fight-button, #descend-button').removeClass('hidden')
		floorDisplay()
		roomDisplay()
		updateRoomFighting(game.current.combat.room)
		game.current.collecting = null
		updateTotalProductionAll()
		resourceColorReset()
	}
}

const startDescending = () => {
	if (game.current.combat.location == 'tower') {
		game.current.combat.direction = 'down'
	}
}

const startFighting = () => {
	if (game.current.combat.location =='tower' && game.current.combat.fighting == false && game.current.combat.player.healthCurrent > 0) {
		game.current.combat.fighting = true
		if (game.current.combat.enemy.healthCurrent > 0) {
			fight()
		} else {
			newFight()
		}
	}
}

const attack = (attacker, defender) => {
	setTimeout(() => {
		if (game.current.combat[defender].healthCurrent - game.current.combat[attacker].attack < 0) {
			game.current.combat[defender].healthCurrent = 0
		} else {
			game.current.combat[defender].healthCurrent -= game.current.combat[attacker].attack
		}
		updateStat(defender, 'healthCurrent')
		if (game.current.combat[defender].healthCurrent > 0) {
			if (game.current.combat[attacker].healthCurrent - game.current.combat[defender].attack < 0) {
				game.current.combat[attacker].healthCurrent = 0
			} else {
				game.current.combat[attacker].healthCurrent -= game.current.combat[defender].attack
			}
			updateStat(attacker, 'healthCurrent')
			if (game.current.combat[attacker].healthCurrent > 0) {
				attack(attacker, defender)
			} else {
				if (attacker == 'player') {
					console.log('you died')
					fightLose()
				} else {
					fightWin()
				}
				console.log(`${attacker} death`)
			}
			
		} else {
			if (defender == 'player') {
				console.log('you died')
				fightLose()
			} else {
				fightWin()
			}
			console.log(`${defender} death`)
		}
	}, 500)
	
}


const fight = () => {
	if (game.current.combat.enemy.speed > game.current.combat.player.speed) {
		
		attack('enemy', 'player')
	} else {
		attack('player', 'enemy')
	}
}


const newFight = () => {
	setTimeout(() => {
		createEnemy()
		fight()
	}, 500)
}

const autoFighting = () => {
	if (game.current.combat.autoFighting) {
		if (game.current.combat.player.healthCurrent == game.current.combat.player.healthMax && !game.current.combat.fighting ) {
			startFighting()
		}
		autoFighting()
	}
}

//Fight win/lose functions start//

const fightLose = () => {
	//Post into text that you lost fight
	game.current.combat.fighting = false
	regenHealth()
}


const fightWin = () => {
	//give reward drops if any
	enemyDrops()
	roomChange()
	if (game.current.combat.fighting && game.current.combat.location == 'tower') {
		newFight()
	}
}

//Fight win/lose functions end//

//Enemy resource drop functions start//

const enemyDrops = () => {
	if (game.current.stats.best.floor == 1 && game.current.stats.best.room == 1) {
		game.current.resources.souls.current += 1
	}
	let resourceDrop = Math.random()
	if (resourceDrop > 0.6) {
		let basicResource = resources[Math.floor(Math.random() * 5)]
		console.log(basicResource)
		let dropValue = Math.floor(((Math.random() * (26 - game.current.combat.room)) + game.current.combat.room) * (1.2 ** (game.current.combat.floor - 1)) * (game.current.resources[basicResource].activeProduction.activeProductionTotal ** .5))
		updateResourceAmountGain(basicResource, dropValue)
	} else if (resourceDrop < 0.125){
		console.log('souls')
		game.current.resources.souls.current += Math.floor(((Math.random() * (26 - game.current.combat.room)) + game.current.combat.room) * (1.2 ** (game.current.combat.floor - 1)))
	}
}

//Enemy resource drop functions end//

//Fighting functions end//


//Combat related functions end//

//functions for tooltips start//

const updateToolTip = (niche, type, resource) => {
	tooltips[niche][type][resource].updateText(resource);
	$('#purchaseTooltipName').text(tooltips[niche][type][resource].title)
	$('#purchaseTooltipInfo').text(tooltips[niche][type][resource].info)
	$('#purchaseTooltipCost').text(tooltips[niche][type][resource].cost)
};

const mousein = (event, niche, type, resource) => {
	updateToolTip(niche, type, resource);
	$(`#${niche}Tooltips`).css({"top": `${event.y - 200}px`, 'left':  `${event.x - 200}px`}).removeClass('hidden')
};

const mouseout = (event) => {
	$('#purchaseTooltips').addClass('hidden')
};

//functions for tooltips end//

//Saving and loading related functions start//

load();
autoSave();

//Saving and loading related functions end//
