const resources = ['herb', 'mythril', 'yew', 'crystal', 'arcana'];
const upgradeTypes = ['storage', 'active'];
const assignmentButtons = ['golem-assign', 'golem-remove'];
const enemyTypes = [
	'skeleton',
	'slime',
	'goblin',
	'kobold',
	'witch',
	'imp',
	'zombie',
];

const enemies = {
	skeleton: {
		healthMulti: 0.8,
		attackMulti: 1.2,
		defenseMulti: 0.5,
		speedMulti: 0.9,
		resourceMulti: 0.8,
	},
	slime: {
		healthMulti: 1.1,
		attackMulti: 0.6,
		defenseMulti: 1.25,
		speedMulti: 0.5,
		resourceMulti: 1.5,
	},
	goblin: {
		healthMulti: 0.8,
		attackMulti: 1.2,
		defenseMulti: 1.1,
		speedMulti: 1.1,
		resourceMulti: 1.2,
	},
	kobold: {
		healthMulti: 0.9,
		attackMulti: 1.3,
		defenseMulti: 1,
		speedMulti: 1.2,
		resourceMulti: 0.8,
	},
	witch: {
		healthMulti: 0.5,
		attackMulti: 1.5,
		defenseMulti: 0.5,
		speedMulti: 1.5,
		resourceMulti: 0.5,
	},
	imp: {
		healthMulti: 0.7,
		attackMulti: 1.3,
		defenseMulti: 1.2,
		speedMulti: 2,
		resourceMulti: 1.3,
	},
	zombie: {
		healthMulti: 0.8,
		attackMulti: 0.8,
		defenseMulti: 1.1,
		speedMulti: 0.5,
		resourceMulti: 0.8,
	},
};

const tooltips = {
	purchase: {
		storage: {
			herb: {
				title: 'Apothecary Satchel',
				infoBase:
					'An expansion to your apothecary satchel. Increases your herb storage by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.herb.storage.storageBaseBonus.toString() +
						'x';
					let costValue = Math.ceil(
						game.current.resources.herb.storage.storageBaseCost *
							game.current.resources.herb.storage.storageCostIncrement **
								game.current.resources.herb.storage.storageUpgrades
					);
					this.cost = costValue.toString() + ' herbs';
				},
			},
			mythril: {
				title: 'Blacksmith Forge',
				infoBase:
					'An expansion on your blacksmith forge. Increases your mythril storage by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.mythril.storage.storageBaseBonus.toString() +
						'x';
					let costValue = Math.ceil(
						game.current.resources.mythril.storage.storageBaseCost *
							game.current.resources.mythril.storage.storageCostIncrement **
								game.current.resources.mythril.storage.storageUpgrades
					);
					this.cost = costValue.toString() + ' mythril';
				},
			},
			yew: {
				title: 'Lumber Hut',
				infoBase:
					'An expansion on your lumber hut. Increases your yew storage by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.yew.storage.storageBaseBonus.toString() +
						'x';
					let costValue = Math.ceil(
						game.current.resources.yew.storage.storageBaseCost *
							game.current.resources.yew.storage.storageCostIncrement **
								game.current.resources.yew.storage.storageUpgrades
					);
					this.cost = costValue.toString() + ' yew';
				},
			},
			crystal: {
				title: 'Apothecary Satchel',
				infoBase:
					'An expansion to your apothecary satchel. Increases your crystal storage by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.crystal.storage.storageBaseBonus.toString() +
						'x';
					let costValue = Math.ceil(
						game.current.resources.crystal.storage.storageBaseCost *
							game.current.resources.crystal.storage.storageCostIncrement **
								game.current.resources.crystal.storage.storageUpgrades
					);
					this.cost = costValue.toString() + ' crystals';
				},
			},
			arcana: {
				title: 'Library Shelves',
				infoBase:
					"An expansion to your library's shelves. Increases your arcana storage by ",
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.arcana.storage.storageBaseBonus.toString() +
						'x';
					let costValue = Math.ceil(
						game.current.resources.arcana.storage.storageBaseCost *
							game.current.resources.arcana.storage.storageCostIncrement **
								game.current.resources.arcana.storage.storageUpgrades
					);
					this.cost = costValue.toString() + ' arcana';
				},
			},
		},
		active: {
			herb: {
				title: 'Herby Insight',
				infoBase:
					'Allows you to pick more valuable herbs. Increases active herb per second production by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.herb.active.activeBaseBonus.toString();
					let costValue = Math.ceil(
						game.current.resources.herb.active.activeBaseCost *
							game.current.resources.herb.active.activeCostIncrement **
								game.current.resources.herb.active.activeUpgrades
					);
					this.cost = costValue.toString() + ' herbs';
				},
			},
			mythril: {
				title: 'Sharper Pickaxe',
				infoBase:
					'Allows you to mine mythril quicker. Increases active herb per second production by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.mythril.active.activeBaseBonus.toString();
					let costValue = Math.ceil(
						game.current.resources.mythril.active.activeBaseCost *
							game.current.resources.mythril.active.activeCostIncrement **
								game.current.resources.mythril.active.activeUpgrades
					);
					this.cost = costValue.toString() + ' mythril';
				},
			},
			yew: {
				title: 'Sturdy Axe',
				infoBase:
					'Allows you to chop yew trees more quickly. Increases active herb per second production by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.yew.active.activeBaseBonus.toString();
					let costValue = Math.ceil(
						game.current.resources.yew.active.activeBaseCost *
							game.current.resources.yew.active.activeCostIncrement **
								game.current.resources.yew.active.activeUpgrades
					);
					this.cost = costValue.toString() + ' yew';
				},
			},
			crystal: {
				title: 'Tuning Fork',
				infoBase:
					'Allows you sense more energetic crystals. Increases active crystal per second production by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.crystal.active.activeBaseBonus.toString();
					let costValue = Math.ceil(
						game.current.resources.crystal.active.activeBaseCost *
							game.current.resources.crystal.active.activeCostIncrement **
								game.current.resources.crystal.active.activeUpgrades
					);
					this.cost = costValue.toString() + ' crystals';
				},
			},
			arcana: {
				title: 'Arcane Glasses',
				infoBase:
					'Allows you to study magical theory more efficiently. Increases active arcana per second production by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						game.current.resources.arcana.active.activeBaseBonus.toString();
					let costValue = Math.ceil(
						game.current.resources.arcana.active.activeBaseCost *
							game.current.resources.arcana.active.activeCostIncrement **
								game.current.resources.arcana.active.activeUpgrades
					);
					this.cost = costValue.toString() + ' arcana';
				},
			},
		},
		golems: {
			construct: {
				title: 'Construct Magical Golem',
				info: 'Construct a magical construct that you can assign to collect resources.',
				cost: '',
				updateText() {
					let costValue = game.current.resources.golems.cost.totalCost;
					this.cost = costValue.toString() + ' of each resource';
				},
			},
		},
	},
};
