
let gameState = {
  sunCount: 0,
  isZombieWin: false,
  isSunExist: true,
  plantArr: [],
  readyPlant: {}
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
    gameState.readyPlant.src = "./assets/peashooter/attack_00.png";
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
      gameState.readyPlant.length = 0;
      sodPathEle.removeEventListener('click', placePlant);
    }
  }
  console.log(sodPathEle);
}

let createZombies = function() {

}

window.onload = function() {
  createSuns();
  createZombies();

  let sunCreateTimer = setInterval(createSuns, 6000);
  backgroundEle.addEventListener('click', collectSun);
//  gameConsoleEle.addEventListener('drag', dragPlant);
  gameConsoleEle.addEventListener('click', selectPlant);

}


// sodPathEle.onclick = function(evt) {
//   if(evt.offsetX > 244 && evt.offsetX + 54 < this.offsetWidth) {
//       if(gameState.readyPlant && event.target.className !== "action plant") {
//           plant.style.left = event.offsetX - 25 + 'px';
//           setStar(-plant.dataset.star);
//           this.appendChild(plant);
//           plantArr.push(plant);
//           if(parseInt(plant.dataset.damage) !== 0) {
//               bullet.push(createBullet(plant.dataset.speed, plant.dataset.damage, event.offsetX + 25));
//           }
//           clearStyle();
//           plant = null;
//             }
//         }
//       }

function createBullet(speed, position, damage) {
  let bullet = document.createElement('img');
  bullet.className = 'bullet';
  bullet.dataset.speed = speed;
  bullet.style.positionX = positionX + 'px';
  bullet.dataset.damage = damage;
  bullet.src = "assets/plant-bullet.gif";
  sodPathEle.appendChild(bullet);
  return bullet;
}


// setInterval(function() {
//     for(var i = 0; i < plantArr.length; i++) {
//         if(parseInt(plantArr[i].dataset.damage) !== 0) {
//             bullet.push(createBullet(plantArr[i].dataset.speed, plantArr[i].dataset.damage, plantArr[i].offsetLeft + 25));
//             }
//         }
//     }, 9000);
//
// setInterval(function() {
//     for(var i = 0; i < bullet.length; i++) {
//         bullet[i].style.left = bullet[i].offsetLeft + parseInt(bullet[i].dataset.speed) + "px";
//         for(var j = 0; j < zombiesArr.length; j++) {
//             if(bullet[i].offsetLeft + bullet[i].offsetWidth - 30 >= zombiesArr[j].offsetLeft) {
//                 if(bullet[i].offsetLeft - zombiesArr[j].offsetLeft - zombiesArr[j].offsetWidth < 5) {
//                     calcDamage(zombiesArr[j], bullet[i], '11.gif')
//                     zombiesState(j, zombiesArr[j], zombiesArr)
//                     road.removeChild(bullet[i])
//                         bullet.splice(i, 1);
//                         break;
//                     }
//                     if(bullet[i].offsetLeft + bullet[i].offsetWidth > road.offsetWidth) {
//                         bullet[i].parentNode.removeChild(bullet[i]);
//                         bullet.splice(i, 1);
//                     }
//                 }
//             }
//         }
//     }, 20);
