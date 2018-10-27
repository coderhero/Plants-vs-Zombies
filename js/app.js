
let gameState = {
  sunCount: 0,
  isZombieWin: false,
  isSunExist: true,
  plantArr: [],
  readyPlant: {},
  bullets: [],
  zombiesArr: []
}


function Peashooter() {
  // peashooter initialization
  this.plant = this.init();
  let plantsContainer = document.querySelector('.plants-container');
  let zombiesContainer = document.querySelector('.zombies-container');
  this.vitality = 3;
  this.shootTime = 3000;

}
// peashooter prototype initialization
Peashooter.prototype.init = function() {
    let peashooter = document.createElement("div");
    peashooter.innerHTML = '<img src="assets/peashooter.gif">';
    return peashooter;
};
// place the plant in which position
Peashooter.prototype.placePlant = function(left) {
  let peashooter = this.plant;
  peashooter.style.left = (left || 480) + 'px';
  peashooter.style.top = 250 + 'px';
  plants.appendChild(peashooter);
}
Peashooter.prototype.pod = function() {
  let pod = document.createElement('img');
  pod.src = 'assets/plant-bullet.gif';
  pod.className = "bullet";
  pod.style.left = this.plant.offsetLeft + 32 + 'px';
  pod.style.top = this.plant.offsetTop - 2 + 'px';
  zombiesContainer.appendChild(pod);
  return pod;
}

// Peashooter.prototype.shoot = function(zombiesG) {
//   let self = this;
//   // create the function of pod to kill zombies
//   let generateShoot = function() {
//     if(zombiesG < 1) {
//       return;
//     }
//     let zombieOnTheRightOffSetArr = [];
//     for(let i in zombiesG) {
//       if(zombiesG[i].zombie === false) {
//         continue;
//       }
//       if(self.plant === false) {
//         continue;
//       }
//       zombieOnTheRightOffSetArr.push(zombiesG[i].zombie.offseLeft);
//     }
//     let pod = self.pod();
//     pod.moveTimer = setInterval(function() {
//       pod.style.left = pod.offsetLeft + 10 + 'px';
//
//       for (var i = 0; i < zombiesG.length; i++) {
//         let zombie = zombiesG[i];
//         if(!zombie.zombie || !self.plant) continue;
//         // when the zombie is at the left of the plant, stop shooting
//         if ((zombie.zombie.offsetLeft + 34) < self.plant.offsetLeft - 74) continue;
//         // when pod hits the zombie
//         if (bullet.offsetLeft > js.zombie.offsetLeft + 55) {
//             clearInterval(pod.moveTimer);
//             pod.moveTimer = null;
//             bullet.src = "assets/podHit.gif";
//             setTimeout(function () {
//                 if (bullet.parentNode != zombiesContainer) return;
//                 zombiesContainer.removeChild(bullet);
//             }, 260);
//             if (zombie.vitality >= 0) {
//               zombie.vitality -= 1;
//             }
//        }
//        //when the zombie is at the right side of the peashooter
//        if ((zombie.zombie.offesetLeft + 34) > (self.plant.offsetLeft + self.plant.offsetWidth)
//        && zombie.vitality >= 0 && self.vitality >= 0) {
//          if (zombie.vitality == 2) {
//              zombie.lostHead();
//              zombie.stopWalk();
//              zombie.noHeadWalk();
//          }else if (zombie.vitality == 1) {
//              zombie.down();
//          }else if (zombie.vitality == 0) {
//              zombie.die(zombieDeadGroup);
//           //   self.stopShoot();
//              //delete dead zombie
//              zombiesG.remove(zombie);
//              newZombiesGroup = zombiesG;
//              //all zombies dead and you win
//              if (zombieDeadGroup.length >= zombiesTotal) {
//                  if (zombiesTotal < 8) {
//                      setTimeout(function () {
//                          alert("success you can enter next");
//                         // window.location.href = "game.html#" + (jsAll + 1);
//                          window.location.reload();
//                      }, 1000);
//                  }else {
//                      gamePass();
//                  }
//              }
//              //shoot the remaining zombies
//              self.shoot(newZombiesGroup);
//          }
//          return false;
//
//        }else if((zombie.zombie.offsetLeft + 35) <= (self.plant.offsetLeft + self.plant.offsetWidth) && zombie.blood >= 0 && zombie.blood >= 0) {
//       // zombie approach and eat plants
//       if (zombie.blood > 0) {
//           self.blood -= 1;
//       }
//       // record the zombie stopped walking
//       zombieStoppedGroup.push(zombie);
//       //delete the repeat count
//       zombieStoppedGroup.distinct();
//       if (zombie.blood > 2) {
//           zombie.eatPlant();
//       }else if (zombie.blood == 2) {
//           zombie.lostHead();
//           zombie.noHeadEatPlant();
//       }else if (zombie.blood == 1) {
//           zombie.down();
//       }else if (zombie.blood == 0) {
//           zombie.die(zombieDeadGroup);
//         //  self.stopShoot();
//           zombiesG.remove(zombie);
//           newZombiesGroup = zombiesG;
//           // all zombies dead and you win
//           if (zombieDeadGroup.length >= zombiesTotal) {
//               if (zombiesTotal < 8) {
//                   setTimeout(function () {
//                       alert("you win!");
//                     //  window.location.reload();
//                   }, 1000);
//               }else {
//                   gamePass();
//               }
//           }
//           self.shoot(newZombiesGroup);
//
//       }
//       if (self.vitality == 0) {
//           self.stopShoot();
//           self.die();
//           //let the stopped zombies walking
//           for (let i in zombieStoppedGroup) {
//               if (zombieStoppedGroup[i].vitality > 2) {
//                   zombieStoppedGroup[i].walk();
//               }
//               if (zombieStoppedGroup[i].vitality == 2 ) {
//                   zombieStoppedGroup[i].noHeadWalk();
//               }
//           }
//           zombieStoppedGroup = [];
//         }
//       }
//     }
//
//   },  30)
// };
// to create the Zombie Object
function Zombie() {
  let zombiesContainer = document.querySelector('.zombies-container');
  this.zombie = this.init();
  // this.category = "zombie";
  this.vitality = 6;
  this.left = 900;
  this.walkSpeed = 70;

}
Zombie.prototype.init = function() {
  let zombie = document.createElement('div');
  zombie.style.left = this.left + 'px';
  zombie.innerHTML = `<img src='assets/zombie-01.gif'>`;
  zombiesContainer.appendChild(zombie);
  return zombie;

}
// zombie walking function
Zombie.prototype.walk = function() {
  let self = this;
  self.zombieWalk = setInterval(function () {
      self.zombie.style.left = self.zombie.offsetLeft - 1 + "px";
      if (self.zombie.offsetLeft < -100) {
          if (gameEnd) return;
          gameOver();
      }
  }, self.walkSpeed);
  let img = self.zombie.querySelector("img");
  img.src = "assets/zombie-01.gif";

};
Zombie.prototype.noHeadWalk = function () {
    let self = this;
    self.zombieWalk = setInterval(function () {
        self.zombie.style.left = self.zombie.offsetLeft - 1 + "px";
        if (self.zombie.offsetLeft < -100) {
            if (gameEnd) return;
            gameOver();
        }
    }, self.walkSpeed);
    let img = self.zombie.querySelector("img");
    img.src = "assets/zombieLoseHead.gif";

};
Zombie.prototype.loseHead = function () {
    let head = document.createElement("img");
    head.src = "assets/zombie-01-head.gif";
    head.className = "zombieHead";
    head.style.left = self.zombie.offsetLeft + "px";
    head.style.top = self.zombie.offsetTop + "px";
    zombiesContainer.appendChild(head);
    setTimeout(function () {
        zombiesContainer.removeChild(head);
    }, 1000);
};
// zombie stop walking
Zombie.prototype.stopWalk = function() {
  clearInterval(this.zombieWalk);
}
// eat the plants
Zombie.prototype.eatPlant = function() {
  this.stopWalk();
  let img = this.zombie.querySelector('img');
  img.src = "assets/zombieAttack.gif"
}
Zombie.prototype.eatPlantWithoutHead = function() {
  this.stopWalk();
  let img = this.zombie.querySelector('img');
  img.src = "assets/zombieNoHeadAttack.gif"
}
// zombie is dying
Zombie.prototype.getDown = function() {
  this.stopWalk();
  let img = this.zombie.querySelector('img');
  img.src = 'assets/zombieDying.gif'
}
// zombie is dead
Zombie.prototype.die = function(zombieDeadGroup) {
  zombieDeadGroup.push(true);
  zombiesContainer.removeChild(this.zombie);
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
      gameState.bullets.push(createBullet(10, event.offsetX, 1));
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
      //  window.alert('Zombies Win')
      } else {
        gameState.zombiesArr[i].style.left = gameState.zombiesArr[i].offsetLeft - 1 + 'px';
      }
    }
  }, 10)
};


setInterval(function() {
  for(var i = 0; i < gameState.plantArr.length; i++) {
      if(parseInt(gameState.plantArr[i].dataset.attack) !== 0) {
          gameState.bullets.push(createBullet(gameState.plantArr[i].dataset.speed, gameState.plantArr[i].offsetLeft + 25, gameState.plantArr[i].dataset.attack));
        }
    }
  }, 3000);

setInterval(function() {
  for(var i = 0; i < gameState.bullets.length; i++) {
      gameState.bullets[i].style.left = gameState.bullets[i].offsetLeft + parseInt(gameState.bullets[i].dataset.speed) + "px";
      for(var j = 0; j < gameState.zombiesArr.length; j++) {
          if(gameState.bullets[i].offsetLeft + gameState.bullets[i].offsetWidth - 30 >= gameState.zombiesArr[j].offsetLeft) {
              if(gameState.bullets[i].offsetLeft - gameState.zombiesArr[j].offsetLeft - gameState.zombiesArr[j].offsetWidth < 5) {
              //  calcDamage(gameState.zombiesArr[j], gameState.bullets[i], 'gif')
              //  zombiesState(j, gameState.zombiesArr[j], gameState.zombiesArr)
              gameState.zombiesArr[j].remove();
                gameState.zombiesArr.splice(j, 1);
                sodPathEle.removeChild(gameState.bullets[i])
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
