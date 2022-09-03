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
			updating.totalPerSec = updating.golemPerSec + updating.active.activeTotal;
		} else {
			updating.totalPerSec = updating.golemPerSec;
		}
		document.querySelector(`#${resource}-sec`).innerText = updating.totalPerSec;
	});
};

const updateTotalProductionIndividual = (resource) => {
	const updating = game.current.resources[resource];
	if (resource === game.current.collecting) {
		updating.totalPerSec = updating.golemPerSec + updating.active.activeTotal;
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
				game.current.resources[resource][type][`${type}Upgrades`];
		});
	});
};

const updateUpgradesDisplaySingle = (type, resource) => {
	document.querySelector(`#${resource}-${type}-level`).innerText =
		game.current.resources[resource][type][`${type}Upgrades`];
};

//Update upgrades level display functions start//

//Purchase upgrades functions start//

const purchaseUpgrade = (type, resource) => {
	let upgradeResource = game.current.resources[resource];
	let upgradeType = upgradeResource[type];
	let cost = Math.ceil(
		upgradeType[`${type}BaseCost`] *
			upgradeType[`${type}CostIncrement`] ** upgradeType[`${type}Upgrades`]
	);
	if (upgradeResource.current >= cost) {
		updateResourceAmountLoss(resource, cost);
		upgradeType[`${type}Upgrades`] += 1;
		updateUpgradesDisplaySingle(type, resource);
		if (type == 'storage') {
			upgradeType[`${type}Total`] = Math.floor(
				upgradeType[`${type}Base`] *
					upgradeType[`${type}BaseBonus`] ** upgradeType[`${type}Upgrades`]
			);
			updateStorageSingle(resource);
		}
		if (type == 'active') {
			upgradeType[`${type}Total`] =
				1 + upgradeType[`${type}BaseBonus`] * upgradeType[`${type}Upgrades`];
			updateTotalProductionIndividual(resource);
		}
		updateToolTip('purchase', type, resource);
	}
};

//Purchase upgrades functions end//

//golems page functions start//

//golems display function start//

const updateGolemsInactive = () => {
	document.querySelector(`#golems-inactive-display`).innerText =
		game.current.resources.golems.inactive;
};

const updateGolemsActiveAll = () => {
	resources.map((resource) => {
		document.querySelector(`#${resource}-golem-count`).innerText =
			game.current.resources.golems.types[resource];
	});
};

const updateGolemsActiveSingle = (resource) => {
	document.querySelector(`#${resource}-golem-count`).innerText =
		game.current.resources.golems.types[resource];
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
		resources.map((resource) => {
			game.current.resources[resource].current -=
				game.current.resources.golems.cost.totalCost;
		});
		game.current.resources.golems.current += 1;
		game.current.resources.golems.total += 1;
		game.current.resources.golems.inactive += 1;
		updateResourceAmount();
		updateGolemsInactive();
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
	updateGolemsInactive();
	updateGolemsActiveSingle(resource);
	updateGolemProductionSingle(resource);
}

const golemActiveRemove = (resource, value) => {
	
}

//golem assignment amounts functions start//

//golem assignment functions start//

const golemAssign = (resource) => {
	let golemsAmountToAssign = 1;
	let assignType = game.current.resources.golems.assignmentType;
	if (assignType == 'remove') {
	} else {
		golemActiveAssign(resource, golemsAmountToAssign);
	}
};

//golem assignment functions end//

//golems page functions end//

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
