

var SaveManager = new function(){



	this.saveGame = function(){
		console.log("SAVING GAME");
		localStorage.setItem('SweetTrip_save', JSON.stringify(this.SaveData));

	};


	this.continueGame = function(){
		if(this.hasData()){
			console.log("CONTINUING GAME");
			this.SaveData = JSON.parse(localStorage.getItem('SweetTrip_save'));
		}

	};

	this.resetSave = function(){

		localStorage.setItem('SweetTrip_save', null);
		this.SaveData = null;

	};

	this.hasData = function(){
		return localStorage.getItem('SweetTrip_save') != null
		 && localStorage.getItem('SweetTrip_save') != "null";
	};

	this.saveLevelCleared = function(number,stats){
		/*

			'stats' contents:
				cleared
				stars
				moneyFinal
				locked
				...

		*/

		if(!this.hasData()){
			this.SaveData = new Array();
		}
		if(this.SaveData[number] != null){
			if(this.SaveData[number].moneyFinal > stats.moneyFinal){
				console.log("SAVE HAS BETTER LEVEL CLEAR");
				return;
			}
		}
		this.SaveData[number] = stats;

		this.saveGame();
	};

	this.getLevelCleared = function(number){
		if(this.SaveData != null){
			if(number in this.SaveData){
				return this.SaveData[number];
			}
		}
		return null;
	};

	this.getTotalRecollectedMoney = function(){
		var value = 0;
		if(this.SaveData != null){
			this.SaveData.forEach(function(level){
				if(level != null && level.cleared){
					value += level.moneyFinal;
				}
			});
		}
		value -= this.getUpgradeMoney();
		return value;
	};
	this.setUpgradeMoney = function(value){
		//Setea el dinero gastado en upgrades
		//Asume que no existe un level 0, por lo que lo ocupa para guardar esto
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			this.SaveData[0].value = value;
		}
		this.saveGame();
	};
	this.modUpgradeMoney = function(value){
		//Sube o baja el dinero gastado en upgrade en el valor dado por value
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			if(this.SaveData[0].value == undefined){
				this.SaveData[0].value = value;
			}
			else{
				this.SaveData[0].value = this.SaveData[0].value + value;
			}
		}
		this.saveGame();
	}
	this.getUpgradeMoney = function(value){
		//Obtiene el dinero gastado en upgrades
		//Asume que el level 0 es usado para guardar solo lo referente a upgrades
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined || this.SaveData[0].value == undefined){
				return 0;
			}
			return this.SaveData[0].value;
		}
	};
	this.setUpgradeTier = function(tier){
		//Setea el tier de casa en el cual se encuentra el jugador
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined){
				this.SaveData[0] = {};
			}
			this.SaveData[0].tier = tier;
		}
		this.saveGame();
	};
	this.getUpgradeTier = function(){
		//Obtiene el tier de casa en el cual se encuentra el jugador
		if(this.SaveData != null){
			if(this.SaveData[0] == undefined || this.SaveData[0].tier == undefined){
				return 0;
			}
			return this.SaveData[0].tier;
		}
	}

}
