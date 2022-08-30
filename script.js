const attackBtn = document.querySelector(".attackBtn");
const blockBtn = document.querySelector(".blockBtn");

const marker = document.querySelector(".marker");
const skillCheck = document.querySelector(".skillCheck");

let baseAttack = 10;
let baseBlock = 10
let skillcheckStarted = false;
let blockStarted = false;

class Pokemon{

	constructor(name, type, health, dmg, img){
		this.name = name;
		this.type = type;
		this.health = health;
		this.dmg = dmg;
		this.img = img;
	}

}

function choosePokemons(mainPoke, enemyPoke) {
	document.querySelector(".namePokemon").innerHTML = mainPoke.name.toUpperCase()
	document.querySelector(".namePokemonEnemy").innerHTML = enemyPoke.name.toUpperCase()
	document.querySelector(".typePokemon").innerHTML = mainPoke.type.toUpperCase()
	document.querySelector(".typePokemonEnemy").innerHTML = enemyPoke.type.toUpperCase()
	document.querySelector(".imgMain").src = mainPoke.img
	document.querySelector(".imgEnemy").src = enemyPoke.img
	document.querySelector("#hpBar").max = mainPoke.health
	document.querySelector("#hpBarEnemy").max = enemyPoke.health
	document.querySelector("#hpBar").value = mainPoke.health
	document.querySelector("#hpBarEnemy").value = enemyPoke.health
	document.querySelector(".hpPoint").innerHTML= mainPoke.health + " HP"
	document.querySelector(".hpPointEnemy").innerHTML = enemyPoke.health + " HP"
}

function skilcheckStart() {

	skillcheckStarted = true
	marker.classList.toggle("visibleMarker");
	skillCheck.classList.toggle("skillCheckVisible");

}

function skilcheckFinish(target) {

	if(skillcheckStarted){
		let markerPos = (marker.offsetLeft * 100)/marker.parentElement.parentElement.offsetWidth
		console.log(markerPos);
	
		marker.classList.toggle("visibleMarker");
		skillCheck.classList.toggle("skillCheckVisible");
		skillcheckStarted = false;

		let currentAttack = baseAttack
		let currentBlock = baseBlock
		
		if(markerPos < 26.5 || markerPos> 72.5){
			//red zone
			currentAttack *= 0
		}else if(markerPos < 42 || markerPos > 57.1){
			//orange zone
			currentAttack *= 0.3
		}else if(markerPos < 48 || markerPos > 51.1){
			//yellow zone
			currentAttack *= 0.5
		}else{
			//green zone
			currentAttack *= 1
		}
	} else if(blockStarted){

		if(markerPos < 26.5 || markerPos> 72.5){
			currentBlock *= 0
			//red zone
			
		}else if(markerPos < 42 || markerPos > 57.1){
			//orange zone
			currentBlock *= 0.5
		}else if(markerPos < 48 || markerPos > 51.1){
			//yellow zone
			currentBlock *= 1
		}else{
			//green zone
			currentBlock *= 1
			pikachu.health += 10
		}
	}
}

let pikachu = new Pokemon("Pikachu", "Electric", 100, 1, "img/Pikachu.webp")
let bulbassaur = new Pokemon("Bulbassaur", "Grass", 100, 1, "img/bulbasaur.png")
let ivysaur = new Pokemon("Ivysaur", "Grass", 150, 2, "img/Ivysaur.webp")
let venusaur = new Pokemon("Venusaur", "Grass", 200, 2.5, "img/venusaur.png")

choosePokemons(pikachu, bulbassaur)

attackBtn.addEventListener("mousedown", skilcheckStart)
blockBtn.addEventListener("mousedown", skilcheckStart)
document.body.addEventListener("mouseup", skilcheckFinish)