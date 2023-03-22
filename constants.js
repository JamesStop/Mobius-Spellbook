const normalSecond = 1000;
const gameTick = 100;
const resources = ["herb", "mythril", "yew", "crystal", "arcana"];
const specialResources = ["souls"];
const combatResources = ['tincture', 'dagger', 'staff', 'robes', 'boots'];
const upgradeTiers = ['tierOne'];
const upgradeTypes = ["storage", "activeProduction"];
const assignmentButtons = ["golem-assign", "golem-remove"];
const stats = [
	"name",
	"attack",
	"defense",
	"healthMax",
	"healthCurrent",
	"manaMax",
	"manaCurrent",
];
const people = ["player", "enemy"];
const enemyTypes = [
	"skeleton",
	"slime",
	"goblin",
	"kobold",
	"witch",
	"imp",
	"zombie",
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
		speedMulti: 1e100,
		resourceMulti: 1.3,
	},
	zombie: {
		healthMulti: 0.8,
		attackMulti: 0.8,
		defenseMulti: 1.1,
		speedMulti: 0,
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
		combat: {
			tierOne: {
				tincture: {
					baseCost: [{ souls: 100 }, { herb: 500 }],
					costIncrement: 2,
					bonusIncrement: 10,
				},
				dagger: {
					baseCost: [{ souls: 100 }, { mythril: 500 }],
					costIncrement: 2,
					bonusIncrement: 1,
				},
				staff: {
					baseCost: [{ souls: 100 }, { yew: 500 }],
					costIncrement: 2,
					bonusIncrement: .5,
				},
				robes: {
					baseCost: [{ souls: 100 }, { crystal: 500 }],
					costIncrement: 2,
					bonusIncrement: 1,
				},
				boots: {
					baseCost: [{ souls: 100 }, { arcana: 500 }],
					costIncrement: 2,
					bonusIncrement: 0.5,
				},
			},
		},
	},
	oneTime: {
		spellbook: {
			baseCost: [
				{ herb: 50 },
				{ mythril: 50 },
				{ yew: 50 },
				{ crystal: 50 },
				{ arcana: 50 },
			],
		},
		fight: {
			baseCost: [
				{ herb: 250 },
				{ mythril: 250 },
				{ yew: 250 },
				{ crystal: 250 },
				{ arcana: 250 },
			],
		},
		golems: {
			baseCost: [
				{ herb: 1000 },
				{ mythril: 1000 },
				{ yew: 1000 },
				{ crystal: 1000 },
				{ arcana: 1000 },
			],
		},
	},
};

const tooltips = {
	purchase: {
		storage: {
			herb: {
				title: "Apothecary Satchel",
				infoBase:
					"An expansion to your apothecary satchel. Increases your herb storage by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.storage.tierOne.herb.bonusIncrement.toString() +
						"x";
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.herb.baseCost[0]
							.herb *
							upgradeInfo.repeatable.storage.tierOne.herb
								.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne
									.herb
					);
					this.cost = formatNumbers(costValue) + " herbs";
				},
			},
			mythril: {
				title: "Blacksmith Forge",
				infoBase:
					"An expansion on your blacksmith forge. Increases your mythril storage by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.storage.tierOne.mythril.bonusIncrement.toString() +
						"x";
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.mythril
							.baseCost[0].mythril *
							upgradeInfo.repeatable.storage.tierOne.mythril
								.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne
									.mythril
					);
					this.cost = formatNumbers(costValue) + " mythril";
				},
			},
			yew: {
				title: "Lumber Hut",
				infoBase:
					"An expansion on your lumber hut. Increases your yew storage by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.storage.tierOne.yew.bonusIncrement.toString() +
						"x";
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.yew.baseCost[0]
							.yew *
							upgradeInfo.repeatable.storage.tierOne.yew
								.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne
									.yew
					);
					this.cost = formatNumbers(costValue) + " yew";
				},
			},
			crystal: {
				title: "Geode Tesseract",
				infoBase:
					"An expansion to your geode tesseract. Increases your crystal storage by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.storage.tierOne.crystal.bonusIncrement.toString() +
						"x";
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.crystal
							.baseCost[0].crystal *
							upgradeInfo.repeatable.storage.tierOne.crystal
								.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne
									.crystal
					);
					this.cost = formatNumbers(costValue) + " crystals";
				},
			},
			arcana: {
				title: "Library Shelves",
				infoBase:
					"An expansion to your library's shelves. Increases your arcana storage by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.storage.tierOne.arcana.bonusIncrement.toString() +
						"x";
					let costValue = Math.ceil(
						upgradeInfo.repeatable.storage.tierOne.arcana
							.baseCost[0].arcana *
							upgradeInfo.repeatable.storage.tierOne.arcana
								.costIncrement **
								game.current.upgrades.repeatable.storage.tierOne
									.arcana
					);
					this.cost = formatNumbers(costValue) + " arcana";
				},
			},
		},
		activeProduction: {
			herb: {
				title: "Herby Insight",
				infoBase:
					"Allows you to pick more valuable herbs. Increases active herb per second production by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.activeProduction.tierOne.herb.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.herb
							.baseCost[0].herb *
							upgradeInfo.repeatable.activeProduction.tierOne.herb
								.costIncrement **
								game.current.upgrades.repeatable
									.activeProduction.tierOne.herb
					);
					this.cost = formatNumbers(costValue) + " herbs";
				},
			},
			mythril: {
				title: "Sharper Pickaxe",
				infoBase:
					"Allows you to mine mythril quicker. Increases active herb per second production by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.activeProduction.tierOne.mythril.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.mythril
							.baseCost[0].mythril *
							upgradeInfo.repeatable.activeProduction.tierOne
								.mythril.costIncrement **
								game.current.upgrades.repeatable
									.activeProduction.tierOne.mythril
					);
					this.cost = formatNumbers(costValue) + " mythril";
				},
			},
			yew: {
				title: "Sturdy Axe",
				infoBase:
					"Allows you to chop yew trees more quickly. Increases active herb per second production by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.activeProduction.tierOne.yew.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.yew
							.baseCost[0].yew *
							upgradeInfo.repeatable.activeProduction.tierOne.yew
								.costIncrement **
								game.current.upgrades.repeatable
									.activeProduction.tierOne.yew
					);
					this.cost = formatNumbers(costValue) + " yew";
				},
			},
			crystal: {
				title: "Tuning Fork",
				infoBase:
					"Allows you sense more energetic crystals. Increases active crystal per second production by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.activeProduction.tierOne.crystal.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.crystal
							.baseCost[0].crystal *
							upgradeInfo.repeatable.activeProduction.tierOne
								.crystal.costIncrement **
								game.current.upgrades.repeatable
									.activeProduction.tierOne.crystal
					);
					this.cost = formatNumbers(costValue) + " crystals";
				},
			},
			arcana: {
				title: "Arcane Glasses",
				infoBase:
					"Allows you to study magical theory more efficiently. Increases active arcana per second production by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.activeProduction.tierOne.arcana.bonusIncrement.toString();
					let costValue = Math.ceil(
						upgradeInfo.repeatable.activeProduction.tierOne.arcana
							.baseCost[0].arcana *
							upgradeInfo.repeatable.activeProduction.tierOne
								.arcana.costIncrement **
								game.current.upgrades.repeatable
									.activeProduction.tierOne.arcana
					);
					this.cost = formatNumbers(costValue) + " arcana";
				},
			},
		},
		golems: {
			construct: {
				title: "Construct Magical Golem",
				info: "Construct a magical construct that you can assign to collect resources.",
				cost: "",
				updateText() {
					let costValue =
						game.current.resources.golems.cost.totalCost;
					this.cost = formatNumbers(costValue) + " of each resource";
				},
			},
		},
		combat: {
			tincture: {
				title: "Bitter Mixture",
				infoBase:
					"This sour tasting potion increases your maximum health and heals you for that change. Wow! Increases maximum health by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.combat.tierOne.staff.bonusIncrement.toString() +
						".";
					let costValue = [];
					upgradeInfo.repeatable.combat.tierOne.staff.baseCost.map(
						(cost) => {
							costValue.push(
								`${formatNumbers(
									Math.ceil(
										cost[Object.keys(cost)] *
											upgradeInfo.repeatable.combat
												.tierOne.staff.costIncrement **
												game.current.upgrades.repeatable
													.combat.tierOne.staff
									)
								)} ${Object.keys(cost)}`
							);
						}
					);
					this.cost = costValue.join(", ");
				},
			},
			dagger: {
				title: "Sharper Blade",
				infoBase:
					"A sharper blade cuts deeper and hurts your enemies more! Increases attack by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.combat.tierOne.staff.bonusIncrement.toString() +
						".";
					let costValue = [];
					upgradeInfo.repeatable.combat.tierOne.staff.baseCost.map(
						(cost) => {
							costValue.push(
								`${formatNumbers(
									Math.ceil(
										cost[Object.keys(cost)] *
											upgradeInfo.repeatable.combat
												.tierOne.staff.costIncrement **
												game.current.upgrades.repeatable
													.combat.tierOne.staff
									)
								)} ${Object.keys(cost)}`
							);
						}
					);
					this.cost = costValue.join(", ");
				},
			},
			staff: {
				title: "Yew Staff",
				infoBase:
					"Using the magical wood infused with souls as a means to channel your magic causes it to grow stronger. Increases spell power by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.combat.tierOne.staff.bonusIncrement.toString() +
						".";
					let costValue = [];
					upgradeInfo.repeatable.combat.tierOne.staff.baseCost.map(
						(cost) => {
							costValue.push(
								`${formatNumbers(
									Math.ceil(
										cost[Object.keys(cost)] *
											upgradeInfo.repeatable.combat
												.tierOne.staff.costIncrement **
												game.current.upgrades.repeatable
													.combat.tierOne.staff
									)
								)} ${Object.keys(cost)}`
							);
						}
					);
					this.cost = costValue.join(", ");
				},
			},
			robes: {
				title: "Crystal Decals",
				infoBase:
					"These decals somehow make you take less damage. Must be magic! Your defense is increased by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.combat.tierOne.robes.bonusIncrement.toString() +
						".";
					let costValue = [];
					upgradeInfo.repeatable.combat.tierOne.robes.baseCost.map(
						(cost) => {
							costValue.push(
								`${formatNumbers(
									Math.ceil(
										cost[Object.keys(cost)] *
											upgradeInfo.repeatable.combat
												.tierOne.robes.costIncrement **
												game.current.upgrades.repeatable
													.combat.tierOne.robes
									)
								)} ${Object.keys(cost)}`
							);
						}
					);
					this.cost = costValue.join(", ");
				},
			},
			boots: {
				title: "Speed Enchantment",
				infoBase:
					"Allows you to move faster than your enemies. Increases your speed by ",
				info: "",
				cost: "",
				updateText() {
					this.info =
						this.infoBase +
						upgradeInfo.repeatable.combat.tierOne.boots.bonusIncrement.toString() +
						".";
					let costValue = [];
					upgradeInfo.repeatable.combat.tierOne.boots.baseCost.map(
						(cost) => {
							costValue.push(
								`${formatNumbers(
									Math.ceil(
										cost[Object.keys(cost)] *
											upgradeInfo.repeatable.combat
												.tierOne.boots.costIncrement **
												game.current.upgrades.repeatable
													.combat.tierOne.boots
									)
								)} ${Object.keys(cost)}`
							);
						}
					);
					this.cost = costValue.join(", ");
				},
			},
		},
		individual: {
			spellbook: {
				title: "Purchase a tower key",
				info: "A spellbook containing basic combat spells. An aspiring mage's best friend",
				cost: "",
				updateText() {
					this.cost = "50 of each resource";
				},
			},
			fight: {
				title: "Purchase a tower key",
				info: "Allows access into the tower, where you can train your magic.",
				cost: "",
				updateText() {
					this.cost = "250 of each resource";
				},
			},
			golems: {
				title: "Purchase a tower key",
				info: "The bases for golemancy allowing passive production. Useful for when you're climbing that tower",
				cost: "",
				updateText() {
					this.cost = "1000 of each resource";
				},
			},
		},
	},
};

const purchasedUpgrade = {
	storageUpgrade(resource) {
		game.current.resources[resource].storage.storageTotal = Math.floor(
			game.current.resources[resource].storage.storageBase *
				upgradeInfo.repeatable.storage.tierOne[resource]
					.bonusIncrement **
					game.current.upgrades.repeatable.storage.tierOne[resource]
		);
		updateStorageSingle(resource);
	},
	activeProductionUpgrade(resource) {
		game.current.resources[
			resource
		].activeProduction.activeProductionTotal = Math.floor(
			game.current.resources[resource].activeProduction
				.activeProductionBase +
				upgradeInfo.repeatable.activeProduction.tierOne[resource]
					.bonusIncrement *
					game.current.upgrades.repeatable.activeProduction.tierOne[
						resource
					]
		);
		updateTotalProductionIndividual(resource);
	},
	combatUpgrade(resource) {
		console.log(resource);
		switch (resource) {
			case "tincture":
				game.current.combat.player.healthMax +=
					upgradeInfo.repeatable.combat.tierOne.tincture.bonusIncrement;
					updateStat('player', 'healthMax')
				game.current.combat.player.healthCurrent +=
					upgradeInfo.repeatable.combat.tierOne.tincture.bonusIncrement;
					updateStat('player', 'healthCurrent')
				break;

			case "dagger":
				game.current.combat.player.attack +=
					upgradeInfo.repeatable.combat.tierOne.dagger.bonusIncrement;
					updateStat('player', 'attack')
				break;

			case "staff":
				game.current.combat.player.spellPower +=
					upgradeInfo.repeatable.combat.tierOne.staff.bonusIncrement;
				break;

			case "robes":
				game.current.combat.player.defense +=
					upgradeInfo.repeatable.combat.tierOne.robes.bonusIncrement;
					updateStat('player', 'defense')
				break;

			case "boots":
				game.current.combat.player.speed +=
					upgradeInfo.repeatable.combat.tierOne.boots.bonusIncrement;
				break;
		}
	},
};

const unlocks = {
	spellbookUnlock() {
		if (game.current.unlocks.spellbook) {
			$(`#spellbook-selector`).removeClass("temp-hidden");
			$(`#fight-unlock`).removeClass("hidden");
			$(`#spellbook-unlock`).addClass("hidden");
		}
	},
	fightUnlock() {
		if (game.current.unlocks.fight) {
			$(`#fight-unlock`).addClass("hidden");
			$(
				`#golems-unlock, #enemy-wrapper, #player-wrapper, #tower-wrapper`
			).removeClass("hidden");
		}
	},
	golemsUnlock() {
		if (game.current.unlocks.golems) {
			$(`#golems-selector`).removeClass("temp-hidden");
			$(`#golems-unlock`).addClass("hidden");
		}
	},
	soulsUnlock() {
		if (
			game.current.stats.best.floor > 1 ||
			game.current.stats.best.room > 1
		) {
			$(`#souls-wrapper`).removeClass("hidden");
		}
	},
	combatShopUnlock() {
		if (game.current.unlocks.combatShop) {
			$(`#combatShop`).removeClass("hidden");
		}
	},
};

const specialTexts = {
	herb: (amount) => {
		let num = Math.floor(Math.random() * 5 + 1);
		switch (num) {
			case 1:
				return `That ${game.current.combat.enemy.name} dropped ${amount} herbs. They get transported back to your apothecary satchel at home.`;
			case 2:
				return `The ${game.current.combat.enemy.name} bursts into a cloud of ${amount} herbs upon death. They get transported back to your apothecary satchel at home.`;
			case 3:
				return `That ${game.current.combat.enemy.name} was guarding a chest filled with ${amount} herbs. You send the whole chest home to organize later.`;
			case 4:
				return `That ${game.current.combat.enemy.name} dissintegrates into a pile of ${amount} herbs. You gather them up and send them home.`;
			case 5:
				return `You found ${amount} herbs amoungst that ${game.current.combat.enemy.name}'s corpse. You send them back to your apothecary satchel at home.`;
		}
	},
	mythril: (amount) => {
		let num = Math.floor(Math.random() * 5 + 1);
		switch (num) {
			case 1:
				return `That ${game.current.combat.enemy.name} dropped ${amount} mythril. They get transported to your forge back home.`;
			case 2:
				return `The ${game.current.combat.enemy.name} bursts into a cloud of ${amount} mythril upon death. They get transported to your forge back home.`;
			case 3:
				return `That ${game.current.combat.enemy.name} was guarding a chest filled with ${amount} mythril. You send the whole chest home to organize later.`;
			case 4:
				return `That ${game.current.combat.enemy.name} dissintegrates into a pile of ${amount} mythril. You gather them up and send them home.`;
			case 5:
				return `You found ${amount} mythril amoungst that ${game.current.combat.enemy.name}'s corpse. You send them to your forge back home.`;
		}
	},
	yew: (amount) => {
		let num = Math.floor(Math.random() * 5 + 1);
		switch (num) {
			case 1:
				return `That ${game.current.combat.enemy.name} dropped ${amount} yew. They get transported to your lumber hut back at home.`;
			case 2:
				return `The ${game.current.combat.enemy.name} bursts into a cloud of ${amount} yew upon death. They get transported to your lumber hut back at home.`;
			case 3:
				return `That ${game.current.combat.enemy.name} was guarding a chest filled with ${amount} yew. You send the whole chest home to organize later.`;
			case 4:
				return `That ${game.current.combat.enemy.name} dissintegrates into a pile of ${amount} yew. You gather them up and send them home.`;
			case 5:
				return `You found ${amount} yew amoungst that ${game.current.combat.enemy.name}'s corpse. You send them to your lumber hut back at home.`;
		}
	},
	crystal: (amount) => {
		let num = Math.floor(Math.random() * 5 + 1);
		switch (num) {
			case 1:
				return `That ${game.current.combat.enemy.name} dropped ${amount} crystals. They get transported to your geode tesseract back home.`;
			case 2:
				return `The ${game.current.combat.enemy.name} bursts into a cloud of ${amount} crystals upon death. They get transported to your geode tesseract back home.`;
			case 3:
				return `That ${game.current.combat.enemy.name} was guarding a chest filled with ${amount} crystals. You send the whole chest home to organize later.`;
			case 4:
				return `That ${game.current.combat.enemy.name} dissintegrates into a pile of ${amount} crystals. You gather them up and send them home.`;
			case 5:
				return `You found ${amount} crystals amoungst that ${game.current.combat.enemy.name}'s corpse. You send them to your geode tesseract back home.`;
		}
	},
	arcana: (amount) => {
		let num = Math.floor(Math.random() * 5 + 1);
		switch (num) {
			case 1:
				return `That ${game.current.combat.enemy.name} dropped ${amount} arcana. They get transported to your library back home.`;
			case 2:
				return `The ${game.current.combat.enemy.name} bursts into a cloud of ${amount} arcana upon death. They get transported to your library back home.`;
			case 3:
				return `That ${game.current.combat.enemy.name} was guarding a chest filled with ${amount} arcana. You send the whole chest home to organize later.`;
			case 4:
				return `That ${game.current.combat.enemy.name} dissintegrates into a pile of ${amount} arcana. You gather them up and send them home.`;
			case 5:
				return `You found ${amount} arcana amoungst that ${game.current.combat.enemy.name}'s corpse. You send them to your library back home.`;
		}
	},
	souls: (amount) => {
		let num = Math.floor(Math.random() * 5 + 1);
		switch (num) {
			case 1:
				return `That ${game.current.combat.enemy.name} dropped ${amount} souls. You quickly cram them into your soul jar.`;
			case 2:
				return `The ${game.current.combat.enemy.name} bursts into a cloud of ${amount} souls upon death. You quickly cram them into your soul jar.`;
			case 3:
				return `That ${game.current.combat.enemy.name} was guarding a chest filled with ${amount} souls. You send the whole chest home to organize later.`;
			case 4:
				return `That ${game.current.combat.enemy.name} dissintegrates into a pile of ${amount} souls. They jump into your soul jar.`;
			case 5:
				return `You found ${amount} souls amoungst that ${game.current.combat.enemy.name}'s corpse. Your soul jar greedily sucks them up.`;
		}
	},
};

const formatNumbers = (number) => {
	if (Math.floor(number).toString().length >= 6) {
		if (number.toExponential(2).toString()[3] == "0") {
			if (number.toExponential(1).toString()[2] == "0") {
				return Math.floor(number)
					.toExponential(0)
					.toString()
					.replace("+", "");
			} else {
				return Math.floor(number)
					.toExponential(1)
					.toString()
					.replace("+", "");
			}
		} else {
			return Math.floor(number)
				.toExponential(2)
				.toString()
				.replace("+", "");
		}
	} else {
		return Math.floor(number).toString();
	}
};
