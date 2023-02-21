const resources = ['herb', 'mythril', 'yew', 'crystal', 'arcana'];
const upgradeTypes = ['storage', 'activeProduction'];
const assignmentButtons = ['golem-assign', 'golem-remove'];
const stats = ['name', 'attack', 'defense', 'healthMax', 'healthCurrent', 'manaMax', 'manaCurrent'];
const people = ['player', 'enemy'];
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

const upgradeInfo = {
	repeatable: {
		storage: {
			tierOne: {
				herb: {
					baseCost: [{ herb: 50 }],
					costIncrement: 2,
					bonusIncrement: 2,
				},
				mythril: {
					baseCost: [{ mythril: 50 }],
					costIncrement: 2,
					bonusIncrement: 2,
				},
				yew: {
					baseCost: [{ yew: 50 }],
					costIncrement: 2,
					bonusIncrement: 2,
				},
				crystal: {
					baseCost: [{ crystal: 50 }],
					costIncrement: 2,
					bonusIncrement: 2,
				},
				arcana: {
					baseCost: [{ arcana: 50 }],
					costIncrement: 2,
					bonusIncrement: 2,
				},
			},
		},
		activeProduction: {
			tierOne: {
				herb: {
					baseCost: [{ herb: 100 }],
					costIncrement: 1.5,
					bonusIncrement: 1,
				},
				mythril: {
					baseCost: [{ mythril: 100 }],
					costIncrement: 1.5,
					bonusIncrement: 1,
				},
				yew: {
					baseCost: [{ yew: 100 }],
					costIncrement: 1.5,
					bonusIncrement: 1,
				},
				crystal: {
					baseCost: [{ crystal: 100 }],
					costIncrement: 1.5,
					bonusIncrement: 1,
				},
				arcana: {
					baseCost: [{ arcana: 100 }],
					costIncrement: 1.5,
					bonusIncrement: 1,
				},
			},
		},
		golemProduction: {
			tierOne: {
				herb: 0,
				mythril: 0,
				yew: 0,
				crystal: 0,
				arcana: 0,
			},
		},
	},
	oneTime: {
		spellbook: {
			baseCost: [{ herb: 50 }, { mythril: 50 }, { yew: 50 }, { crystal: 50 }, { arcana: 50 }],
		},
		fight: {
			baseCost: [{ herb: 250 }, { mythril: 250 }, { yew: 250 }, { crystal: 250 }, { arcana: 250 }],
		},
		fight: {
			baseCost: [{ herb: 1000 }, { mythril: 1000 }, { yew: 1000 }, { crystal: 1000 }, { arcana: 1000 }],
		}
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
						upgradeInfo.repeatable.storage.tierOne.herb.bonusIncrement.toString() +
						'x';
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.herb.baseCost[0].herb *
							upgradeInfo.repeatable.storage.tierOne.herb.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne.herb
					);
					this.cost = formatNumbers(costValue) + ' herbs';
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
						upgradeInfo.repeatable.storage.tierOne.mythril.bonusIncrement.toString() +
						'x';
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.mythril.baseCost[0].mythril *
							upgradeInfo.repeatable.storage.tierOne.mythril.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne.mythril
					);
					this.cost = formatNumbers(costValue) + ' mythril';
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
						upgradeInfo.repeatable.storage.tierOne.yew.bonusIncrement.toString() +
						'x';
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.yew.baseCost[0].yew *
							upgradeInfo.repeatable.storage.tierOne.yew.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne.yew
					);
					this.cost = formatNumbers(costValue) + ' yew';
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
						upgradeInfo.repeatable.storage.tierOne.crystal.bonusIncrement.toString() +
						'x';
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.crystal.baseCost[0].crystal *
							upgradeInfo.repeatable.storage.tierOne.crystal.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne.crystal
					);
					this.cost = formatNumbers(costValue) + ' crystals';
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
						upgradeInfo.repeatable.storage.tierOne.arcana.bonusIncrement.toString() +
						'x';
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.arcana.baseCost[0].arcana *
							upgradeInfo.repeatable.storage.tierOne.arcana.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne.arcana
					);
					this.cost = formatNumbers(costValue) + ' arcana';
				},
			},
		},
		activeProduction: {
			herb: {
				title: 'Herby Insight',
				infoBase:
					'Allows you to pick more valuable herbs. Increases active herb per second production by ',
				info: '',
				cost: '',
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.activeProduction.tierOne.herb.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.herb.baseCost[0]
							.herb *
							upgradeInfo.repeatable.activeProduction.tierOne.herb
								.costIncrement **
								game.current.upgrades.repeatable.activeProduction.tierOne.herb
					);
					this.cost = formatNumbers(costValue) + ' herbs';
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
						upgradeInfo.repeatable.activeProduction.tierOne.mythril.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.mythril.baseCost[0]
							.mythril *
							upgradeInfo.repeatable.activeProduction.tierOne.mythril
								.costIncrement **
								game.current.upgrades.repeatable.activeProduction.tierOne
									.mythril
					);
					this.cost = formatNumbers(costValue) + ' mythril';
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
						upgradeInfo.repeatable.activeProduction.tierOne.yew.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.yew.baseCost[0]
							.yew *
							upgradeInfo.repeatable.activeProduction.tierOne.yew
								.costIncrement **
								game.current.upgrades.repeatable.activeProduction.tierOne.yew
					);
					this.cost = formatNumbers(costValue) + ' yew';
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
						upgradeInfo.repeatable.activeProduction.tierOne.crystal.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.crystal.baseCost[0]
							.crystal *
							upgradeInfo.repeatable.activeProduction.tierOne.crystal
								.costIncrement **
								game.current.upgrades.repeatable.activeProduction.tierOne
									.crystal
					);
					this.cost = formatNumbers(costValue) + ' crystals';
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
						upgradeInfo.repeatable.activeProduction.tierOne.arcana.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.arcana.baseCost[0]
							.arcana *
							upgradeInfo.repeatable.activeProduction.tierOne.arcana
								.costIncrement **
								game.current.upgrades.repeatable.activeProduction.tierOne.arcana
					);
					this.cost = formatNumbers(costValue) + ' arcana';
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
					this.cost = formatNumbers(costValue) + ' of each resource';
				},
			},
		},
		individual: {
			spellbook: {
				title: 'Purchase a tower key',
				info: 'A spellbook containing basic combat spells. An aspiring mage\'s best friend',
				cost: '',
				updateText() {
					this.cost = '50 of each resource';
				},
			},
			fight: {
				title: 'Purchase a tower key',
				info: 'Allows access into the tower, where you can train your magic.',
				cost: '',
				updateText() {
					this.cost = '250 of each resource';
				},
			},
			golems: {
				title: 'Purchase a tower key',
				info: 'The bases for golemancy allowing passive production. Useful for when you\'re climbing that tower',
				cost: '',
				updateText() {
					this.cost = '1000 of each resource';
				},
			}
		}
	},
};

const purchasedUpgrade = {
	storageUpgrade(resource) {
		game.current.resources[resource].storage.storageTotal = Math.floor(
			game.current.resources[resource].storage.storageBase *
			upgradeInfo.repeatable.storage.tierOne[resource].bonusIncrement **
			game.current.upgrades.repeatable.storage.tierOne[resource]
		);
		updateStorageSingle(resource);
	},
	activeProductionUpgrade(resource) {
		game.current.resources[resource].activeProduction.activeProductionTotal = Math.floor(
			game.current.resources[resource].activeProduction.activeProductionBase +
			upgradeInfo.repeatable.activeProduction.tierOne[resource].bonusIncrement *
			game.current.upgrades.repeatable.activeProduction.tierOne[resource]
		)
		updateTotalProductionIndividual(resource);
	}, 
};

const unlocks = {
	spellbookUnlock() {
		if (game.current.unlocks.spellbook) {
			$(`#spellbook-selector`).removeClass('temp-hidden')
			$(`#fight-unlock`).removeClass('hidden')
			$(`#spellbook-unlock`).addClass('hidden')
		}
	},
	fightUnlock() {
		if (game.current.unlocks.fight) {
			$(`#combat-wrapper`).removeClass('hidden')
			$(`#fight-unlock`).addClass('hidden')
			$(`#golems-unlock`).remove('hidden')
		}
	},
	golemsUnlock() {
		if (game.current.unlocks.golems) {
			$(`#golems-selector`).removeClass('temp-hidden')
			$(`#golems-unlock`).addClass('hidden')
		}
	},
}





const formatNumbers = (number) => {
	if (number.toString().length >= 6) {
		if (number.toExponential(2).toString()[3] == '0') {
			if (number.toExponential(1).toString()[2] == '0') {
				return number.toExponential(0).toString().replace('+', '')
			} else {
				return number.toExponential(1).toString().replace('+', '')
			}
		} else {
			return number.toExponential(2).toString().replace('+', '')
		}
	} else {
		return number.toString()
	}
}