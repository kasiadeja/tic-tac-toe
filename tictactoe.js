

const gridCells = document.querySelectorAll('[data-grid-cell]')
const nextPlayerText = document.querySelector('[data-next-player-text]')
const winSign = document.getElementById('win_sign')
const winText = document.querySelector('[data-win-text]')
const newGame = document.getElementById('new_game')

const circle = 'o'
const cross = 'x'

let circleTurn  /*true is circle , falce is cross*/


const winning= [

  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]

]






startPlaying()

newGame.addEventListener('click', startPlaying)


/*possible to click the cell, but only once*/

function startPlaying() {

circleTurn = false	

gridCells.forEach(cell => {
	cell.classList.remove(cross)
	cell.classList.remove(circle)
	cell.removeEventListener('click', ClickingCells)
	cell.addEventListener('click' , ClickingCells, { once: true})

})

winSign.classList.remove('active')

}

/* say if its circle or cross*/

function ClickingCells(e){
	 const cell = e.target
	 const currentSign = circleTurn ? circle : cross
     makeMove(cell, currentSign)

     if (checkIfWin(currentSign)){
     	gameOver(false)
     }
     else if (checkIfTie()){
     	gameOver(true)
     }
     else{
     changeTurn()
     changePlayer()
   }  
}


function gameOver(tie){
	if (tie){
		
	 winText.innerText = 'TIE'	
   
	}

	else{
   
     winText.innerText = `${circleTurn ? "o" : "x"} WINS!`
	
	}

	winSign.classList.add('active')
}



function checkIfTie() {
	return [...gridCells].every(cell => {
		return cell.classList.contains(cross) || cell.classList.contains(circle)
	})

}


/* make a move*/

function makeMove(cell, currentSign){
	cell.classList.add(currentSign)
}


/* changing turn o or x */

function changeTurn(){

  circleTurn = !circleTurn
}



function changePlayer(){
	if(circleTurn){
		nextPlayerText.innerText = '2: o' 
	}
	else{
		nextPlayerText.innerText = '1: x'
	}
}


/*check for winner*/

function checkIfWin(currentSign){
	return winning.some(combination => {
		return combination.every(index =>{
			return gridCells[index].classList.contains(currentSign)
		})

	})

}














