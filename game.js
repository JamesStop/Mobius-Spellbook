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
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionBase: 1,
					activeProductionTotal: 1,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			mythril: {
				current: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionBase: 1,
					activeProductionTotal: 1,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			yew: {
				current: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionBase: 1,
					activeProductionTotal: 1,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			crystal: {
				current: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionBase: 1,
					activeProductionTotal: 1,
				},
				golemPerSec: 0,
				totalPerSec: 0,
			},
			arcana: {
				current: 0,
				storage: {
					storageBase: 250,
					storageTotal: 250,
				},
				activeProduction: {
					activeProductionBase: 1,
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
			souls: {
				current: 0,
				storage: {
					storageTotal: Infinity,
				},
			}
		},
		combat: {
			world: 0,
			floor: 0,
			room: 0,
			fighting: false,
			autoFighting: false,
			location: 'town',
			direction: 'up',
			spellCurrent: 'manaBolt',
			player: {
				name: '',
				healthMax: 10,
				healthCurrent: 10,
				manaMax: 10,
				manaCurrent: 0,
				manaRegen: 0,
				attack: 1,
				speed: 1,
				defense: 0,
				spellPower: 1,
			},
			enemy: {
				name: '',
				healthMax: 100,
				healthCurrent: 0,
				manaMax: 0,
				manaCurrent: 0,
				attack: 1,
				speed: 1,
				defense: 0,
			},
			spells: {
				heal: {
					level: 1,
					powerBase: 1,
					expCurrent: 0,
					expMax: 25,
					manaCost: 0,
					spellGrowth: 1,
					costGrowth: 1.25,
				},
				manaBolt: {
					level: 1,
					powerBase: 1,
					expCurrent: 0,
					expMax: 50,
					manaCost: 1,
					spellGrowth: 1,
					costGrowth: 1.6,
				}
			}
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
		},
		unlocks: {
			golems: false,
			spellbook: false,
			fight: false,
		}, 
		stats: {
			best: {
				floor: 0,
				room: 0
			}
		}
	},
	overallStats: {
		total: {

		},
		best: {
			floor: 0,
			room: 0,
		},
	},
};

let game = {};

let versionChangeGame = {};
