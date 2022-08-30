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
	const resources = ['herb', 'mythril', 'yew', 'crystal', 'arcana'];
	resources.map((resource) => {
		const updating = game.current.resources[resource];
		if (resource === game.current.collecting) {
			updating.totalpersec = updating.golempersec + updating.activepersec;
		} else {
			updating.totalpersec = updating.golempersec;
		}
	});
};

//Resource idle production update functions end//

//Idle resource collection functions start//

window.setInterval(() => {});

//Idle resource collection functions end//
