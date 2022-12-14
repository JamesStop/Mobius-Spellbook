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
		const button = document.querySelector(`#${id}`).classList;
		button.remove('nav-selected');
		button.remove('nav-unselected');
		button.add('nav-unselected');
	});
};

const setUpgradesNavActiveColor = (id) => {
	const button = document.querySelector(`#${id}`).classList;
	button.remove('nav-selected');
	button.remove('nav-unselected');
	button.add('nav-selected');
};

const upgradesDisplayHide = () => {
	const UpgradesDisplaysIds = [
		'upgrades-display',
		'golems-display',
		'spellbook-display',
		'something-display',
	];
	UpgradesDisplaysIds.map((id) => {
		const display = document.querySelector(`#${id}`).classList;
		display.remove('hidden');
		display.add('hidden');
	});
};

const upgradesDisplayShow = (id) => {
	const displayId = id.replace('selector', 'display');
	const display = document.querySelector(`#${displayId}`).classList;
	display.remove('hidden');
};

const upgradesNavBarClick = (id) => {
	upgradesNavColorReset();
	setUpgradesNavActiveColor(id);
	upgradesDisplayHide();
	upgradesDisplayShow(id);
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
		const button = document.querySelector(`#${id}`).classList;
		button.remove('color-inactive');
		button.remove('color-active');
		button.add('color-inactive');
	});
};

const setResourcesActiveColor = (id) => {
	if (id != null) {
		const button = document.querySelector(`#${id}-button`).classList;
		button.remove('color-inactive');
		button.remove('color-active');
		button.add('color-active');
	}
};

const setCollectingResource = (resource) => {
	game.current.collecting = resource;
};

const resourceBarClick = (resource) => {
	resourceColorReset();
	setResourcesActiveColor(resource);
	setCollectingResource(resource);
	updateTotalProductionAll();
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
		document.querySelector(`#${resource}-sec`).innerText = updating.totalPerSec;
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
	document.querySelector(`#${resource}-sec`).innerText = updating.totalPerSec;
};

//Resource idle production update functions end//

//Resource update value functions start//

const updateResourceAmount = () => {
	resources.map((resource) => {
		const updating = game.current.resources[resource];
		document.querySelector(`#${resource}-current`).innerText = updating.current;
	});
};

const updateResourceAmountSingle = (resource) => {
	const updating = game.current.resources[resource];
	document.querySelector(`#${resource}-current`).innerText = updating.current;
};

const updateResourceAmountGain = (resource, value) => {
	const updating = game.current.resources[resource];
	if (updating.current != updating.storage.storageTotal) {
		if (updating.current + value > updating.storage.storageTotal) {
			updating.current += updating.storage.storageTotal - updating.current;
			updating.total += updating.storage.storageTotal - updating.current;
		} else {
			updating.current += value;
			updating.total += value;
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
		document.querySelector(`#${resource}-storage-max`).innerText =
			game.current.resources[resource].storage.storageTotal;
	});
};

const updateStorageSingle = (resource) => {
	document.querySelector(`#${resource}-storage-max`).innerText =
		game.current.resources[resource].storage.storageTotal;
};

//Update storage max display functions start//

//Update upgrades level display functions start//

const updateUpgradesDisplayAll = () => {
	resources.map((resource) => {
		upgradeTypes.map((type) => {
			document.querySelector(`#${resource}-${type}-level`).innerText =
				game.current.upgrades.repeatable[type].tierOne[resource];
		});
	});
};

const updateUpgradesDisplaySingle = (type, resource) => {
	document.querySelector(`#${resource}-${type}-level`).innerText =
		game.current.upgrades.repeatable[type].tierOne[resource];
};

//Update upgrades level display functions start//

//Purchase upgrades functions start//

const purchaseUpgrade = (upgradeType, type, tier, resource) => {
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
		updateUpgradesDisplaySingle(type, resource);
		if (type == 'storage') {
			game.current.resources[resource][type][`${type}Total`] = Math.floor(
				game.current.resources[resource][type][`${type}Base`] *
					upgradeInfo[upgradeType][type][tier][resource].bonusIncrement **
						game.current.upgrades[upgradeType][type][tier][resource]
			);
			updateStorageSingle(resource);
		}
		if (type == 'activeProduction') {
			console.log('hi')
			game.current.resources[resource][type][`${type}Total`] =
				1 +
				upgradeInfo[upgradeType][type][tier][resource].bonusIncrement *
					game.current.upgrades[upgradeType][type][tier][resource];
			updateTotalProductionIndividual(resource);
		}
		updateToolTip('purchase', type, resource);
	}
};

//Purchase upgrades functions end//

//golems page functions start//

//golems display function start//

const updateGolemsTotal = () => {
	document.querySelector(`#golems-total-display`).innerText =
		game.current.resources.golems.total;
	document.querySelector(`#golems-total-working-display`).innerText =
		game.current.resources.golems.total;
};

const updateGolemsActiveAll = () => {
	resources.map((resource) => {
		document.querySelector(`#${resource}-golem-count`).innerText =
			game.current.resources.golems.types[resource];
	});
	document.querySelector('#golems-active-display').innerText =
		game.current.resources.golems.active;
};

const updateGolemsActiveSingle = (resource) => {
	document.querySelector(`#${resource}-golem-count`).innerText =
		game.current.resources.golems.types[resource];
	document.querySelector('#golems-active-display').innerText =
		game.current.resources.golems.active;
};

//golems display function end//

//golem build functions start//

const buildGolem = () => {
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
};

//golem build functions end//

//golem assignment type functions start//

const golemAssignColors = (id) => {
	assignmentButtons.map((button) => {
		document.querySelector(`#${button}`).classList.remove(`${button}-active`);
	});
	document.querySelector(`#golem-${id}`).classList.add(`golem-${id}-active`);
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

//floor and room changing functions start//

const floorChange = (value) => {
	game.current.combat.floor += value;
};

const roomChange = (value) => {
	game.current.combat.floor += value;
};

//floor and room changing functions end//

//Enemy Creation Functions start//

const chooseEnemyType = () => {
	return enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
};

const createEnemy = () => {
	let typeOfEnemy = chooseEnemyType();
	let enemyMultis = enemies[typeOfEnemy];
	let currentFloor = game.current.combat.floor;
	let currentRoom = game.current.combat.room;
	game.current.combat.enemy.type = typeOfEnemy;
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
	})

};

//Enemy Creation Functions end//

//Stats Display updating Functions start//

const updateStat = (person, stat) => {
	document.querySelector(`#${person}-${stat}`).innerText = game.current.combat[person][stat];
}

const allStatUpdate = () => {
	people.map((person) => {
		stats.map((stat) => {
			updateStat(person, stat);
		})
	})
}






//Stats Display updating Functions end//


//Floor coloring functions start//

const updateWholeFloor = () => {
	const currentRoom = game.current.combat.room;
	for (let i = 1; i < 26; i++) {
		let room = document.querySelector(`#tower-cell-${i}`).classList;
		room.remove('fighting');
		room.remove('defeated');
	}
	if (currentRoom == 0) {
		return;
	}
	if (currentRoom > 1) {
		for (let i = 1; i < currentRoom; i++) {
			updateRoomDefeated(i);
		}
	}
	updateRoomFighting(currentRoom);
};

const updateRoomFighting = (roomNumber) => {
	let room = document.querySelector(`#tower-cell-${roomNumber}`).classList;
	room.remove('fighting');
	room.remove('defeated');
	room.add('fighting');
};

const updateRoomDefeated = (roomNumber) => {
	let room = document.querySelector(`#tower-cell-${roomNumber}`).classList;
	room.remove('fighting');
	room.remove('defeated');
	room.add('defeated');
};

const floorDisplay = () => {
	document.querySelector(`#floor-display`).innerText = game.current.combat.floor;
}

const roomDisplay = () => {
	document.querySelector(`#room-display`).innerText = game.current.combat.room;
}


//Floor coloring functions start//

//Combat related functions end//

//functions for tooltips start//

const updateToolTip = (niche, type, resource) => {
	tooltips[niche][type][resource].updateText(resource);
	document.querySelector('#purchaseTooltipName').innerText =
		tooltips[niche][type][resource].title;
	document.querySelector('#purchaseTooltipInfo').innerText =
		tooltips[niche][type][resource].info;
	document.querySelector('#purchaseTooltipCost').innerText =
		tooltips[niche][type][resource].cost;
};

const mousein = (event, niche, type, resource) => {
	updateToolTip(niche, type, resource);
	let tooltip = document.querySelector(`#${niche}Tooltips`);
	tooltip.style.top = `${event.y - 200}px`;
	tooltip.style.left = `${event.x - 200}px`;
	tooltip.classList.remove('hidden');
};

const mouseout = (event) => {
	let tooltip = document.querySelector('#purchaseTooltips').classList;
	tooltip.add('hidden');
};

//functions for tooltips end//

//Saving and loading related functions start//

load();
autoSave();

//Saving and loading related functions end//
