const resources = ['herb', 'mythril', 'yew', 'crystal', 'arcana'];
const upgradeTypes = ['storage'];

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
						game.current.resources.herb.storage.storageBaseBonus.toString();
					let costValue =
						game.current.resources.herb.storage.storageBaseCost *
						2 ** game.current.resources.herb.storage.storageUpgrades;
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
						game.current.resources.mythril.storage.storageBaseBonus.toString();
					let costValue =
						game.current.resources.mythril.storage.storageBaseCost *
						2 ** game.current.resources.mythril.storage.storageUpgrades;
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
						game.current.resources.yew.storage.storageBaseBonus.toString();
					let costValue =
						game.current.resources.yew.storage.storageBaseCost *
						2 ** game.current.resources.yew.storage.storageUpgrades;
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
						game.current.resources.crystal.storage.storageBaseBonus.toString();
					let costValue =
						game.current.resources.crystal.storage.storageBaseCost *
						2 ** game.current.resources.crystal.storage.storageUpgrades;
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
						game.current.resources.arcana.storage.storageBaseBonus.toString();
					let costValue =
						game.current.resources.arcana.storage.storageBaseCost *
						2 ** game.current.resources.arcana.storage.storageUpgrades;
					this.cost = costValue.toString() + ' arcana';
				},
			},
		},
	},
};
