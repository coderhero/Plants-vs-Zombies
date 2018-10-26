
let gameState = {
  sunCount: 0,
  isZombieWin: false,
  isSunExist: true,
  plantArr: [],
  readyPlant: {},
  bullets: [],
  zombiesArr: []
}


let walnut = {
  cost: 50,
  defence: 5,
  attack: false
}
let peashooter = {
  cost: 100,
  defence: 2,
  attack: true
}
let Walnut = function() {
  this.cost = 50;
  this.defence = 5;
  this.attack = true;
}

let sunCountEle = document.querySelector('#suncount');
let backgroundEle = document.querySelector('.background');
let gameConsoleEle = document.querySelector('.game-console');
let peaConsoleEle = document.querySelector('#peashooter');
let walnutConsoleEle = document.querySelector('#walnut');
let sodPathEle = document.querySelector('.sod');

let createSuns = function() {
  let sunEle = document.createElement('img');
  sunEle.className = "sun";
  sunEle.src = "./assets/sun.gif";
  backgroundEle.appendChild(sunEle);
  gameState.isSunExist = true;
  let sunLeft = Math.floor(Math.random() * (backgroundEle.offsetWidth - sunEle.offsetWidth - 280) + 200);
  sunEle.style.left = sunLeft + 'px';
  let sunTop = Math.floor(Math.random() * (backgroundEle.offsetHeight - sunEle.offsetHeight - 100) + 50);
  sunEle.style.top = '10px';
  let sunFallTimer = setInterval(function() {
    if (sunEle.offsetTop > sunTop) {
      clearInterval(sunFallTimer);
      if (sunEle.offsetTop > 360 || sunEle.offsetTop < 240) {
        setTimeout(function() {
          if (gameState.isSunExist) {
            sunEle.style.left = "-60px";
            sunEle.style.top = "-60px";
            backgroundEle.removeChild(sunEle);
          }
        }, 3000);
      }
     }
     else {
       sunEle.style.top = sunEle.offsetTop + 16 + 'px';
     }
    }, 20);
  // sunEle.style.top = sunTop + 'px';
}

let createPlants = function() {
  let plant = document.createElement('img');
  plant.className = 'plant';
  plant.style.left = '0px';
  plant.style.top = '4px';
  return plant;
}
let selectPlant = function(evt) {
  if (gameState.sunCount < 50) {
    walnutConsoleEle.id = 'walnut';
    peaConsoleEle.id = 'peashooter';
  } else if(gameState.sunCount < 100) {
    walnutConsoleEle.id = 'walnut-active';
    peaConsoleEle.id = 'peashooter';
  } else if(gameState.sunCount >= 100) {
    peaConsoleEle.id = "peashooter-active";
    walnutConsoleEle.id = "walnut-active"
  }

  if (evt.target.id === "peashooter-active") {
    gameState.sunCount -= 100;
    sodPathEle.addEventListener('click',placePlant);
    gameState.readyPlant = createPlants();
    gameState.readyPlant.src = "./assets/peashooter.gif";
    gameState.readyPlant.dataset.attack = 2;
    gameState.readyPlant.dataset.speed = 50;
    sunCountEle.innerText = gameState.sunCount;
    if(gameState.sunCount < 50) {
      walnutConsoleEle.id = 'walnut';
      peaConsoleEle.id = "peashooter";
    }else if(gameState.sunCount < 100) {
      evt.target.id = "peashooter";
    }
  } else if (evt.target.id === 'walnut-active') {
    gameState.sunCount -= 50;
    sodPathEle.addEventListener('click', placePlant);
    gameState.readyPlant = createPlants();
    gameState.readyPlant.src = 'assets/plant-walnut.png'
    gameState.readyPlant.dataset.attack = 0;
    sunCountEle.innerText = gameState.sunCount;
    if (gameState.sunCount < 50) {
      evt.target.id = "walnut";
      peaConsoleEle.id = "peashooter";
    } else if(gameState.sunCount < 100) {
      peaConsoleEle.id = 'peashooter';
    }
  }
}

let collectSun = function(evt) {
  if(evt.target.className === "sun") {
    gameState.isSunExist = false;
    gameState.sunCount += 50;
    sunCountEle.innerText = gameState.sunCount;

    if (gameState.sunCount >= 100) {
        peaConsoleEle.id = "peashooter-active";
    } else if(gameState.sunCount >= 50) {
        walnutConsoleEle.id = "walnut-active";
    }
    let sunGoneTimer = setInterval(function() {
      if (evt.target.offsetLeft < 0 && evt.target.offsetTop < 0) {
        evt.target.parentNode.removeChild(evt.target);
        clearInterval(sunGoneTimer);
      } else {
        evt.target.style.left = evt.target.offsetLeft - 24 + 'px';
        evt.target.style.top = evt.target.offsetTop - 24 + 'px';
      }
    }, 20);
  }
}

let placePlant = function(evt) {
  if (evt.offsetX > 30 && evt.offsetX + 20 < this.offsetWidth) {
    if (gameState.readyPlant) {
      let plant = gameState.readyPlant;
      plant.style.left = evt.offsetX - 48 + 'px';
      sodPathEle.appendChild(plant);
      gameState.plantArr.push(plant);
      gameState.readyPlant.length = 0;
      sodPathEle.removeEventListener('click', placePlant);
      gameState.bullets.push(createBullet(50, event.offsetX, 1));
    }
  }
}


window.onload = function() {
  createSuns();
  let zombieCreateTimer = setInterval(createZombies, 4000);

  let sunCreateTimer = setInterval(createSuns, 6000);
  backgroundEle.addEventListener('click', collectSun);
//  gameConsoleEle.addEventListener('drag', dragPlant);
  gameConsoleEle.addEventListener('click', selectPlant);

}

function createBullet(speed, position, damage) {
  let bullet = document.createElement('img');
  bullet.className = 'bullet';
  bullet.dataset.speed = speed;
  bullet.style.left = position + 'px';
  bullet.dataset.damage = damage;
  bullet.src = "assets/plant-bullet.gif";
  sodPathEle.appendChild(bullet);
  return bullet;
}

let createZombies = function() {
  let zombie = document.createElement('img');
  zombie.className = "zombie";
  zombie.src = "assets/zombie-01.gif";
  gameState.zombiesArr.push(zombie);
  console.log(gameState.zombiesArr);
  zombie.style.left = '1100px'
  zombie.style.bottom = '14px';
  sodPathEle.appendChild(zombie);

  let zombieMoveTimer = setInterval(function() {
    for (var i = 0; i < gameState.zombiesArr.length; i++) {
      if(gameState.zombiesArr[i].offsetLeft < -50) {
        clearInterval(zombieMoveTimer);
        window.alert('Zombies Win')
      } else {
        gameState.zombiesArr[i].style.left = gameState.zombiesArr[i].offsetLeft - 6 + 'px';
      }
    }
  }, 500)
};


setInterval(function() {
  for(var i = 0; i < gameState.plantArr.length; i++) {
      if(parseInt(gameState.plantArr[i].dataset.attack) !== 0) {
          gameState.bullets.push(createBullet(gameState.plantArr[i].dataset.speed, gameState.plantArr[i].offsetLeft + 25, gameState.plantArr[i].dataset.attack));
        }
    }
  }, 9000);

setInterval(function() {
  for(var i = 0; i < gameState.bullets.length; i++) {
      gameState.bullets[i].style.left = gameState.bullets[i].offsetLeft + parseInt(gameState.bullets[i].dataset.speed) + "px";
      for(var j = 0; j < gameState.zombiesArr.length; j++) {
          if(gameState.bullets[i].offsetLeft + gameState.bullets[i].offsetWidth - 30 >= gameState.zombiesArr[j].offsetLeft) {
              if(gameState.bullets[i].offsetLeft - gameState.zombiesArr[j].offsetLeft - gameState.zombiesArr[j].offsetWidth < 5) {
              //  calcDamage(gameState.zombiesArr[j], gameState.bullets[i], 'gif')
              //  zombiesState(j, gameState.zombiesArr[j], gameState.zombiesArr)
                road.removeChild(gameState.bullets[i])
                    gameState.bullets.splice(i, 1);
                    break;
                }
                if(gameState.bullets[i].offsetLeft + gameState.bullets[i].offsetWidth > sodPathEle.offsetWidth) {
                    gameState.bullets[i].parentNode.removeChild(gameState.bullets[i]);
                    gameState.bullets.splice(i, 1);
                }
            }
        }
    }
  }, 200);
