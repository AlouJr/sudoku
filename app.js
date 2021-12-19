const puzzleBoard = document.querySelector('#puzzle')
const solveBtn = document.querySelector('#solve-btn')
const solutionDisplay = document.querySelector('#solution-txt')
const squares = 81
let submission = []

for(let i = 0; i< squares; i++) {
    const InputElement = document.createElement('input')
    InputElement.setAttribute('type', 'number')
    InputElement.setAttribute('min', 1)
    InputElement.setAttribute('max', 9)
    puzzleBoard.appendChild(InputElement)
}

//Grab all the inputs values from the puzzle 

const getValues = () => {
   const inputs = document.querySelectorAll('input')
   inputs.forEach(element => {
       if(element.value) {
           submission.push(element.value)
       }else{
           submission.push('.')
       }
   });
}

//verifying if our puzzle is sovable within the SUDOKU API

   const solvaBility = (isSolvable, solution) => {
       const inputs = document.querySelectorAll('input')
       if(isSolvable && solution) {
           inputs.forEach((input, i) =>{
               input.value = solution[i]
           })
           solutionDisplay.innerHTML = 'This is the solution'
       }else {
           solutionDisplay.innerHTML = 'This is not solvable'
       }
   }

//solve the sudoku game with the SUDOKU API

const solve = () => {
    getValues()
    const data = {umbers: submission.join('')}
    fetch('http://localhost:8000/solve', {
        method:'POST',
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(data)
        
    }) .then(response => response.json())
       .then(data => {
           solvaBility(data.isSolvable, data.solution)
           submission = []
       })
       .catch((error) => {
           console.error('Error', error)
       })

}

solveBtn.addEventListener('click', solve)