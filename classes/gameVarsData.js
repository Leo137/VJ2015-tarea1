var GameVarsData = new function(){

    this.loadFile = function(){
		//En rigor lo que es de levelData deberia irse a otro lado, pero meh por ahora
		this.loader = new Phaser.Loader(game);
		
		this.loader.json('gameVarsData','assets/config/gameVarsData.json',true);
		
		this.loader.onFileComplete.add(function(){
			if(this.configTable == null){
				this.configTable = game.cache.getJSON('gameVarsData');
				game.cache.addJSON('customerTypeData', "", game.cache.getJSON("gameVarsData").Customers);
			}
		},this);
		this.loader.start();
    };
    this.loadLevelConstants = function(levelNumber){
		game.load.json('levelData','assets/levels/'+levelNumber+'/levelData.json',true);
    };
	this.loadLevelConstantsTable = function(){
		this.constantTable = game.cache.getJSON('levelData').Constantes;
	}
    this.checkFile = function(){

		if(this.configTable == null){
			this.configTable = game.cache.getJSON('gameVarsData');
		}

    };

    this.getConstantProperty = function(constantKey){
		this.checkFile();
		if(this.constantTable == null)return null;
		return this.constantTable[constantKey]
    };

    this.getBuildingProperty = function(buildingType,key){

		this.checkFile();
		if(this.configTable["buildingData"] == null)return null;
		if(this.configTable["buildingData"][buildingType] == null)return null;
		return this.configTable["buildingData"][buildingType][key];

    };

    this.getStandProperty = function(standType,key){

		this.checkFile();
		if(this.configTable["standData"] == null)return null;
		if(this.configTable["standData"][standType] == null)return null;
		return this.configTable["standData"][standType][key];

    };
    this.getRecipeProperty = function(recipeType,key){
		this.checkFile();
		if(this.configTable["Recetas"] == null)return null;
		if(this.configTable["Recetas"][recipeType] == null)return null;
		return this.configTable["Recetas"][recipeType][key];
    }
    this.getTileIndex = function(tileType){
		this.checkFile();
		if(this.configTable["Tiles"] == null)return null;
		if(this.configTable["Tiles"][tileType] == null)return null;
		return this.configTable["Tiles"][tileType].index + 1;
    }
    this.getAllEndings = function(){
		//Devuelve todos los endings que se encuentran
		this.checkFile();
		if(this.configTable["Finales"] == null)return null;
		return this.configTable["Finales"];
    }
	this.getNextHouseTier = function(tier){
		//Obtiene el tier que sigue al actual, con todos sus datos
		this.checkFile();
		if(this.configTable["TiersCasa"] == null)return null;
		if(this.configTable["TiersCasa"][tier+1] == null)return null;
		return this.configTable["TiersCasa"][tier+1];
	}
	this.getCurrentHouseTier = function(tier){
		//Obtiene el tier que actual, con todos sus datos
		this.checkFile();
		if(this.configTable["TiersCasa"] == null)return null;
		if(this.configTable["TiersCasa"][tier] == null)return null;
		return this.configTable["TiersCasa"][tier];
	} 

}
