const attackBtn = document.querySelector(".attackBtn");
const blockBtn = document.querySelector(".blockBtn");

let hpMainPokemon = document.querySelector("#hpBar")
let hpEnemyPokemon = document.querySelector("#hpBarEnemy")

const marker = document.querySelector(".marker");
const skillCheck = document.querySelector(".skillCheck");

const result = document.querySelector(".result");

let baseBlock = 10
let skillcheckStarted = false;
let blockStarted = false;

let currentEnemyPokemon
let currentPokemon

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

	currentEnemyPokemon = enemyPoke;
	currentPokemon = mainPoke;

	document.querySelector(".namePokemon").innerHTML = mainPoke.name.toUpperCase()
	document.querySelector(".namePokemonEnemy").innerHTML = enemyPoke.name.toUpperCase()
	document.querySelector(".typePokemon").innerHTML = mainPoke.type.toUpperCase()
	document.querySelector(".typePokemonEnemy").innerHTML = enemyPoke.type.toUpperCase()
	document.querySelector(".imgMain").src = mainPoke.img
	document.querySelector(".imgEnemy").src = enemyPoke.img
	document.querySelector("#hpBar").max = mainPoke.health
	document.querySelector("#hpBarEnemy").max = enemyPoke.health
	hpMainPokemon.value = mainPoke.health
	hpEnemyPokemon.value = enemyPoke.health
	document.querySelector(".hpPoint").innerHTML= mainPoke.health + " HP"
	document.querySelector(".hpPointEnemy").innerHTML = enemyPoke.health + " HP"
}

function enemyAttack() {
	let currentEnemyAttack = currentEnemyPokemon.dmg 
	let rnd = Math.random()
	if(rnd < 0.2){
		result.innerHTML = currentEnemyPokemon.name.toUpperCase() + " MISSED!"
	}else if(rnd < 0.7){
		hpMainPokemon.value -= (currentEnemyAttack*0.5)
		result.innerHTML = currentEnemyPokemon.name.toUpperCase() + " DEALS " + (currentEnemyAttack*0.5) + " DMG!" 
	}else if(rnd >= 0.7){
		hpMainPokemon.value -= currentEnemyAttack
		result.innerHTML = currentEnemyPokemon.name.toUpperCase() + " IS SUPER EFFECTIVE "
	}
	attackBtn.addEventListener("mousedown", skilcheckStartAttack)
	blockBtn.addEventListener("mousedown", skilcheckStartBlock)
	document.querySelector(".hpPoint").innerHTML = hpMainPokemon.value + " HP"
}

function skilcheckStartAttack() {

	skillcheckStarted = true
	marker.classList.toggle("visibleMarker");
	skillCheck.classList.toggle("skillCheckVisible");

}

function skilcheckStartBlock() {

	blockStarted = true
	marker.classList.toggle("visibleMarker");
	skillCheck.classList.toggle("skillCheckVisible");

}

function skilcheckFinish(target) {

	if(skillcheckStarted){
		let markerPos = (marker.offsetLeft * 100)/marker.parentElement.parentElement.offsetWidth
	
		marker.classList.toggle("visibleMarker");
		skillCheck.classList.toggle("skillCheckVisible");
		skillcheckStarted = false;

		let currentAttack = pikachu.dmg
		
		if(markerPos < 26.5 || markerPos> 72.5){
			//red zone
			currentAttack *= 0
			result.innerHTML = currentPokemon.name.toUpperCase() + " MISSED!"

		}else if(markerPos < 42 || markerPos > 57.1){
			//orange zone
			currentAttack *= 0.3
			hpEnemyPokemon.value -= currentAttack
			result.innerHTML = currentPokemon.name.toUpperCase() + " IS NOT VERY EFFECTIVE " 
			
		}else if(markerPos < 48 || markerPos > 51.1){
			//yellow zone
			currentAttack *= 0.5
			hpEnemyPokemon.value -= currentAttack
			result.innerHTML = currentPokemon.name.toUpperCase() + " DEALS " + currentAttack + " DMG!" 
		}else{
			//green zone
			currentAttack *= 1
			hpEnemyPokemon.value -= currentAttack
			result.innerHTML = currentPokemon.name.toUpperCase() + " IS SUPER EFFECTIVE "
		}
		document.querySelector(".hpPointEnemy").innerHTML = hpEnemyPokemon.value + " HP"
		attackBtn.removeEventListener("mousedown", skilcheckStartAttack)
		blockBtn.removeEventListener("mousedown", skilcheckStartBlock)
		setTimeout(enemyAttack, 2000);
	} else if(blockStarted){

		let markerPos = (marker.offsetLeft * 100)/marker.parentElement.parentElement.offsetWidth
	
		marker.classList.toggle("visibleMarker");
		skillCheck.classList.toggle("skillCheckVisible");
		blockStarted = false;

		let currentBlock = baseBlock

		if(markerPos < 26.5 || markerPos> 72.5){
			//red zone
			currentBlock *= 0
			
		}else if(markerPos < 42 || markerPos > 57.1){
			//orange zone
			currentBlock *= 0.5
		}else if(markerPos < 48 || markerPos > 51.1){
			//yellow zone
			currentBlock *= 1
		}else{
			//green zone
			currentBlock *= 1
			hpMainPokemon.value += 10
			result.innerHTML = currentPokemon.name.toUpperCase() + " BLOCK DMG, AND HEAL FOR 10HP"
		}
		
	}

}

let pikachu = new Pokemon("Pikachu", "Electric", 100, 25, "img/Pikachu.webp")
let bulbassaur = new Pokemon("Bulbassaur", "Grass", 100, 25, "img/bulbasaur.png")
let ivysaur = new Pokemon("Ivysaur", "Grass", 150, 35, "img/Ivysaur.webp")
let venusaur = new Pokemon("Venusaur", "Grass", 200, 40, "img/venusaur.png")

choosePokemons(pikachu, bulbassaur)

attackBtn.addEventListener("mousedown", skilcheckStartAttack)
blockBtn.addEventListener("mousedown", skilcheckStartBlock)
document.body.addEventListener("mouseup", skilcheckFinish)