// This is the main game variable. Stores a majority of one's individual game information and settings//

let currentGameVersion = {
	general: {
		version: 0.0,
	},
	current: {
		collecting: null,
		resources: {
			herb: {
				current: 0,
				total: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionTotal: 1,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			mythril: {
				current: 0,
				total: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionTotal: 1,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			yew: {
				current: 0,
				total: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionTotal: 1,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			crystal: {
				current: 0,
				total: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionTotal: 1,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			arcana: {
				current: 0,
				total: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionTotal: 1,
				},
				golems: {
					golemsBase: 1,
					golemsTotal: 0,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			golems: {
				assignmentType: 'assign',
				inactive: 0,
				active: 0,
				total: 0,
				storage: {
					storageBase: 10,
					storageTotal: 10,
					storageUpgrades: 0,
					storageBaseCost: 50,
					storageCostIncrement: 2,
					storageBaseBonus: 5,
				},
				types: {
					herb: 0,
					mythril: 0,
					yew: 0,
					crystal: 0,
					arcana: 0,
				},
				cost: {
					baseCost: 100,
					totalCost: 100,
				},
			},
		},
		combat: {
			world: 0,
			floor: 0,
			room: 0,
			player: {
				healthMax: 10,
				healthCurrent: 10,
				manaMax: 0,
				manaCurrent: 0,
				attack: 1,
				speed: 1,
				defense: 0,
			},
			enemy: {
				type: '',
				healthMax: 100,
				healthCurrent: 100,
				manaMax: 0,
				manaCurrent: 0,
				attack: 1,
				speed: 1,
				defense: 0,
			},
		},
		upgrades: {
			repeatable: {
				storage: {
					tierOne: {
						herb: 0,
						mythril: 0,
						yew: 0,
						crystal: 0,
						arcana: 0,
					},
				},
				activeProduction: {
					tierOne: {
						herb: 0,
						mythril: 0,
						yew: 0,
						crystal: 0,
						arcana: 0,
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
			oneTime: {},
		},
	},
	best: {
		hello: 'red',
	},
};

let game = {};

let versionChangeGame = {};
