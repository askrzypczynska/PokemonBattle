class Pokemon{

	health = 10;

	constructor(name, type){
		this.name = name;
		this.type = type;
	}

	attack(){
		console.log("Attack!");
		this.health = this.health - 2
	}
}

const pikachu = new Pokemon("Pikachu", "Electric")
const bulbassaur = new Pokemon("Bulbassaur", "Grass")