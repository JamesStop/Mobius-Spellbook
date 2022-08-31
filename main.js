//General Purpose Start//

const resources = ['herb', 'mythril', 'yew', 'crystal', 'arcana'];

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
    const displayId = id.replace('selector', 'display')
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
	const button = document.querySelector(`#${id}-button`).classList;
	button.remove('color-inactive');
	button.remove('color-active');
	button.add('color-active');
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
	})
}

const updateResourceAmountGain = (resource, value) => {
	const updating = game.current.resources[resource];
	if (updating.current != updating.storageMax) {
		if (updating.current + value > updating.storageMax) {
			updating.current += updating.storageMax - updating.current;
			updating.total += updating.storageMax - updating.current;
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





const mousein = (event) => {
	let tooltip = document.querySelector('#purchaseTooltips')
	let button = event.target
	tooltip.style.top = `${event.y - 200}px`;
	tooltip.style.left = `${event.x - 200}px`
	tooltip.classList.remove('hidden')
}

const mouseout = (event) => {
	let tooltip = document.querySelector('#purchaseTooltips').classList;
	tooltip.add('hidden');
}



load();

autoSave()