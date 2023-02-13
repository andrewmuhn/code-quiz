// ! Psuedo Code:
// create a starter HTML page  
// 


let timerEL = document.getElementById('countdown');
let scores = document.getElementById('scores');
let start = document.getElementById('start');

let timer = () => {
  let timeLeft = 75;

  let timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEL.textContent = `Time: ${timeLeft}`
      timeLeft--;
    } else {
      timerEL.textContent = `Time:  `
      clearInterval(timeInterval);
      //TODO: call function that ends quiz
    }
  }, 1000);
}

start.addEventListener('click', timer);