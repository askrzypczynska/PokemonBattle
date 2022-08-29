const attackBtn = document.querySelector(".attackBtn")
const blockBtn = document.querySelector(".blockBtn")

const hpBar = document.querySelector("#hpBar")
const hpBarEnemy = document.querySelector("#hpBarEnemy")

const marker = document.querySelector(".marker")
const skillCheck = document.querySelector(".skillCheck")

let skillcheckStarted = false

class Pokemon{

	health = 10;

	constructor(name, type){
		this.name = name;
		this.type = type;
	}

	attack(){
		console.log("Attack!");
	}
}

const pikachu = new Pokemon("Pikachu", "Electric")
const bulbassaur = new Pokemon("Bulbassaur", "Grass")

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

		
		if(markerPos < 26.5 || markerPos> 72.5){

		}else if(markerPos < 42 || markerPos > 57.1){
		
		}else if(markerPos < 48 || markerPos > 51.1){
			
		}else{
			
		}
	}
}


attackBtn.addEventListener("mousedown", skilcheckStart)
document.body.addEventListener("mouseup", skilcheckFinish)



// 13% start - czerwony 26.5%
// 26.6% orange - 42%   
// 42-48% yellow
//48-51.1 zielony
//51.1-57.1 yellow               
// 57.1-72.6 orange
// 72.5-86% czerw

// 
