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
let currentBlock = 1

let currentEnemyPokemon
let currentPokemon

let fightNumber = 0

let gameLost = false

class Pokemon{

	constructor(name, type, health, dmg, img, color){
		this.name = "<span style='color:" + color + "'>" + name.toUpperCase() + "</span>"
		this.type = type;
		this.health = health;
		this.dmg = dmg;
		this.img = img;
		this.rawName = name;
	}

}

function choosePokemons(mainPoke, enemyPoke) {

	fightNumber++

	currentEnemyPokemon = enemyPoke;
	currentPokemon = mainPoke;

	document.querySelector(".namePokemon").innerHTML = mainPoke.rawName.toUpperCase()
	document.querySelector(".namePokemonEnemy").innerHTML = enemyPoke.rawName.toUpperCase()
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

	attackBtn.addEventListener("mousedown", skilcheckStartAttack)
	blockBtn.addEventListener("mousedown", skilcheckStartBlock)
}

function enemyAttack() {

	let currentEnemyAttack = currentEnemyPokemon.dmg 
	let rnd = Math.random()
	if(rnd < 0.2){
		result.innerHTML = currentEnemyPokemon.name.toUpperCase() + " MISSED!"
	}else if(rnd < 0.7){
		hpMainPokemon.value -= (currentEnemyAttack*0.5) * currentBlock
		result.innerHTML = currentEnemyPokemon.name.toUpperCase() + " DEALS " + (currentEnemyAttack * 0.5 * currentBlock) + " DMG!" 
	}else if(rnd >= 0.7){
		hpMainPokemon.value -= currentEnemyAttack * currentBlock
		if(currentBlock == 0){
			result.innerHTML = currentEnemyPokemon.name.toUpperCase() + " DEALS 0 DMG!" 
		}else{
			result.innerHTML = currentEnemyPokemon.name.toUpperCase() + " IS SUPER EFFECTIVE "}
	}
	currentBlock = 1;
	attackBtn.addEventListener("mousedown", skilcheckStartAttack)
	blockBtn.addEventListener("mousedown", skilcheckStartBlock)
	document.querySelector(".hpPoint").innerHTML = hpMainPokemon.value + " HP"

	if(hpMainPokemon.value <= 0){
		//Game Over
		gameLost = true;
		result.innerHTML = currentPokemon.name.toUpperCase() + " FAINTED!"
		blockBtn.removeEventListener("mousedown", skilcheckStartBlock)
		result.innerHTML = "<span style='color: white'>GAME OVER</span></br>CLICK ATTACK TO START AGAIN!"
	}
}

function skilcheckStartAttack() {

	if(gameLost){
		choosePokemons(pikachu, bulbassaur);
		result.innerHTML = ""
		gameLost = false
		blockBtn.addEventListener("mousedown", skilcheckStartBlock)
	}else{
		skillcheckStarted = true
		marker.classList.toggle("visibleMarker");
		skillCheck.classList.toggle("skillCheckVisible");
	}
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
			result.innerHTML = currentPokemon.name + " MISSED!"

		}else if(markerPos < 42 || markerPos > 57.1){
			//orange zone
			currentAttack *= 0.3
			hpEnemyPokemon.value -= currentAttack
			result.innerHTML = currentPokemon.name + " IS NOT VERY EFFECTIVE " 
			
		}else if(markerPos < 48 || markerPos > 51.1){
			//yellow zone
			currentAttack *= 0.5
			hpEnemyPokemon.value -= currentAttack
			result.innerHTML = currentPokemon.name + " DEALS " + currentAttack + " DMG!" 
		}else{
			//green zone
			currentAttack *= 1
			hpEnemyPokemon.value -= currentAttack
			result.innerHTML = currentPokemon.name + " IS SUPER EFFECTIVE "
		}

		if(checkIfAlive()) {
			document.querySelector(".hpPointEnemy").innerHTML = hpEnemyPokemon.value + " HP"
			attackBtn.removeEventListener("mousedown", skilcheckStartAttack)
			blockBtn.removeEventListener("mousedown", skilcheckStartBlock)
			setTimeout(enemyAttack, 2000);
		} else {
			result.innerHTML = currentEnemyPokemon.name + " FAINTED! </br> BUT HE EVOLVED!"
			attackBtn.removeEventListener("mousedown", skilcheckStartAttack)
			blockBtn.removeEventListener("mousedown", skilcheckStartBlock)
			if(fightNumber == 1){
				setTimeout(choosePokemons(pikachu, ivysaur), 3000)
			}else if(fightNumber == 2){
				setTimeout(choosePokemons(pikachu, venusaur), 3000)
			}
		}

		

	} else if(blockStarted){

		let markerPos = (marker.offsetLeft * 100)/marker.parentElement.parentElement.offsetWidth
	
		marker.classList.toggle("visibleMarker");
		skillCheck.classList.toggle("skillCheckVisible");
		blockStarted = false;

		if(markerPos < 26.5 || markerPos> 72.5){
			//red zone
			currentBlock *= 1
			result.innerHTML = currentPokemon.name + " FAILS TO BLOCK!"
			
		}else if(markerPos < 42 || markerPos > 57.1){
			//orange zone
			currentBlock *= 0.5
			result.innerHTML = currentPokemon.name + " BLOCKS DMG!"
		}else if(markerPos < 48 || markerPos > 51.1){
			//yellow zone
			currentBlock *= 0
			result.innerHTML = currentPokemon.name + " BLOCKS ALL DMG!"
		}else{
			//green zone
			currentBlock *= 0
			hpMainPokemon.value += 10
			result.innerHTML = currentPokemon.name + " BLOCKS DMG, AND HEAL FOR 10HP!"
		}
		setTimeout(enemyAttack, 2000);
		
	}

}

function checkIfAlive(){
	if(hpEnemyPokemon.value <= 0){
		return false;
	}
	return true;
}


let pikachu = new Pokemon("Pikachu", "Electric", 100, 25, "img/Pikachu.webp", "yellow")
let bulbassaur = new Pokemon("Bulbassaur", "Grass", 100, 25, "img/bulbasaur.png", "green")
let ivysaur = new Pokemon("Ivysaur", "Grass", 150, 35, "img/Ivysaur.webp", "green")
let venusaur = new Pokemon("Venusaur", "Grass", 200, 40, "img/venusaur.png", "green")

choosePokemons(pikachu, bulbassaur)

attackBtn.addEventListener("mousedown", skilcheckStartAttack)
blockBtn.addEventListener("mousedown", skilcheckStartBlock)
document.body.addEventListener("mouseup", skilcheckFinish)