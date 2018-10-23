
let gameState = {
  sunCount: 0

}
let plant = {
  walnutCost: 50,
  peashooterCost: 100
}

let backgroundEle = document.querySelector('.background');

let createSuns = function() {
  let sunEle = document.createElement('img');
  sunEle.className = "sun";
  sunEle.src = "./assets/sun.gif"
  backgroundEle.appendChild(sunEle);
  let sunLeft = Math.floor(Math.random() * (backgroundEle.offsetWidth - sunEle.offsetWidth - 280) + 200);
  sunEle.style.left = sunLeft + 'px';
  let sunTop = Math.floor(Math.random() * (backgroundEle.offsetHeight - sunEle.offsetHeight - 100) + 50);

  // let sunFallTimer = setInterval(function() {
  //   if (sunEle.offsetTop < sunTop) {
  //      sunEle.style.top = sunEle.offsetTop + 16 + 'px';
  //    };
  //   }, 20);
  sunEle.style.top = sunTop + 'px';
    // if (sunEle.offsetTop >= backgroundEle.offsetTop - sunEle.offsetTop - 50 ||
    // sunEle.offsetLeft >= backgroundEle.offsetWidth) {
      // backgroundEle.removeChild(sunEle);
    }
}
//
// let selectPlant = function() {
//
// }
// let placePlant = function() {
//
// }



window.onload = function() {
  let sunCreateTimer = setInterval(createSuns, 4000);

  backgroundEle.addEventListener('click', function(evt) {
    if(evt.target.className === "sun") {
      gameState.sunCount += 50;
      evt.target.parentNode.removeChild(evt.target);
    }
  })
}
