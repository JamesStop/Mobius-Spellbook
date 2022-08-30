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

const resourceBarClick = (resource) => {
	colorReset();
	setActiveColor(resource);
};

//Resource bar click functions end//
