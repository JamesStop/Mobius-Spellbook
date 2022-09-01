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
			updating.totalPerSec = updating.golemPerSec + updating.activePerSec;
		} else {
			updating.totalPerSec = updating.golemPerSec;
		}
		document.querySelector(`#${resource}-sec`).innerText = updating.totalPerSec;
	});
};

const updateTotalProductionIndividual = (resource) => {
	const updating = game.current.resources[resource];
	if (resource === game.current.collecting) {
		updating.totalPerSec = updating.golemPerSec + updating.activePerSec;
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

const updateResourceAmountGain = (resource, value) => {
	const updating = game.current.resources[resource];
	if (updating.current != updating.storage.storageMax) {
		if (updating.current + value > updating.storage.storageMax) {
			updating.current += updating.storage.storageMax - updating.current;
			updating.total += updating.storage.storageMax - updating.current;
		} else {
			updating.current += value;
			updating.total += value;
		}
		document.querySelector(`#${resource}-current`).innerText = updating.current;
	}
};

const updateResourceAmountLoss = (resource, value) => {
	const updating = game.current.resources[resource];
	if (updating.current - value < 0) {
		updating.current = 0;
	} else {
		updating.current += value;
		updating.total += value;
	}
	document.querySelector(`#${resource}-current`).innerText = updating.current;
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
			game.current.resources[resource].storage.storageMax;
	});
};

const updateStorageSingle = (resource) => {
	document.querySelector(`#${resource}-storage-max`).innerText =
		game.current.resources[resource].storage.storageMax;
};

//Update storage max display functions start//

//Purchase upgrades functions start//

const purchaseUpgrade = (type, resource) => {
	let upgradeResource = game.current.resources[resource];
	let upgradeType = upgradeResource[type];
	if (
		upgradeResource.current >=
		upgradeType[`${type}BaseCost`] *
			upgradeType[`${type}CostIncrement`] ** upgradeType[`${type}Upgrades`]
	) {
		upgradeResource.current -=
			upgradeType[`${type}BaseCost`] *
			upgradeType[`${type}CostIncrement`] ** upgradeType[`${type}Upgrades`];
		upgradeType[`${type}Upgrades`] += 1;
		upgradeType[`${type}Max`] =
			upgradeType[`${type}Base`] *
			upgradeType[`${type}BaseBonus`] ** upgradeType[`${type}Upgrades`];
		updateToolTip('purchase', type, resource);
		updateStorageSingle(resource)
	}
};

//Purchase upgrades functions end//

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

const mousein = (event, type, resource) => {
	updateToolTip('purchase', type, resource);
	let tooltip = document.querySelector('#purchaseTooltips');
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
