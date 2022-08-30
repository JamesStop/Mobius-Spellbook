//General Purpose Start//

const resources = ['herb', 'mythril', 'yew', 'crystal', 'arcana'];

//General Purpose End//

//Resource bar click functions start//

const colorReset = () => {
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

const setActiveColor = (id) => {
	const changeId = `#${id}-button`;
	const button = document.querySelector(`#${id}-button`).classList;
	button.remove('color-inactive');
	button.remove('color-active');
	button.add('color-active');
};

const setCollectingResource = (resource) => {
	game.current.collecting = resource;
};

const resourceBarClick = (resource) => {
	colorReset();
	setActiveColor(resource);
	setCollectingResource(resource);
	updateTotalProduction();
};

//Resource bar click functions end//

//Resource idle production update functions start//

const updateTotalProduction = () => {
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

//Resource idle production update functions end//

//Resource update value functions start//

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
