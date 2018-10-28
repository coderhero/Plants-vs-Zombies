// let gameState = {
//   sunCount: 0,
//   isZombieWin: false,
//   isSunExist: true,
//   plantArr: [],
//   readyPlant: {},
//   bullets: [],
//   zombiesArr: []
// }
// function to create a peashooter object
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
Peashooter.prototype.locatePlant = function(left) {
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

Peashooter.prototype.shoot = function(zombiesG) {
  let self = this;
  // create the function of pod to kill zombies
  let generateShoot = function() {
    if (zombiesG < 1) {
      return;
    }
    let zombiesOffSetArr = [];
    for (let i in zombiesG) {
      if (zombiesG[i].zombie === false) {
        continue;
      }
      if (self.plant === false) {
        continue;
      }
      // if there is zombie and peashooter
      zombiesOffSetArr.push(zombiesG[i].zombie.offsetLeft);
    }
    // if there is no zombie on the peashooter's right side, then don't shoot
    // if ((Math.max.apply(null, zombieOnTheRightOffSetArr) + 35) < self.plant.offsetLeft - 75) return;
    let pod = self.pod();
    pod.moveTimer = setInterval(function() {
      // increase the pod offset by 10px
      pod.style.left = pod.offsetLeft + 10 + 'px';
      // for loop to go through all zombies
      for (var i = 0; i < zombiesG.length; i++) {
        let zombie = zombiesG[i];
        if (!zombie.zombie || !self.plant) continue;
        // when the zombie is at the left of the plant, stop shooting
        if ((zombie.zombie.offsetLeft + 34) < self.plant.offsetLeft - 74) continue;
        // when pod hits the zombie
        if (pod.offsetLeft > zombie.zombie.offsetLeft + 55) {
          clearInterval(pod.moveTimer);
          pod.moveTimer = null;
          pod.src = "assets/podHit.gif";
          setTimeout(function() {
            if (pod.parentNode != zombiesContainer) return;
            zombiesContainer.removeChild(pod);
          }, 260);
          if (zombie.vitality >= 0) {
            zombie.vitality -= 1;
          }
        }
        //when the zombie is at the right side of the peashooter
        if ((zombie.zombie.offesetLeft + 34) > (self.plant.offsetLeft + self.plant.offsetWidth) &&
          zombie.vitality >= 0 && self.vitality >= 0) {
          if (zombie.vitality == 2) {
            zombie.loseHead();
            zombie.stopWalk();
            zombie.noHeadWalk();
          } else if (zombie.vitality == 1) {
            zombie.down();
          } else if (zombie.vitality == 0) {
            zombie.die(zombieDeadGroup);
            self.stopShoot();
            //delete dead zombie
            zombiesG.remove(zombie);
            newZombiesGroup = zombiesG;
            //all zombies dead and you win
            if (zombieDeadGroup.length >= zombiesTotal) {
              if (zombiesTotal < 8) {
                setTimeout(function() {
                  alert("success you can enter next level");
                  // window.location.href = "game.html#" + (zombiesTotal + 1);
                  window.location.reload();
                }, 1000);
              } else {
                gamePass();
              }
            }
            //shoot the remaining zombies
            self.shoot(newZombiesGroup);
          }
          return false;

        } else if ((zombie.zombie.offsetLeft + 35) <= (self.plant.offsetLeft + self.plant.offsetWidth) && zombie.vitality >= 0 && zombie.vitality >= 0) {
          // zombie approach and start eating plants
          if (zombie.vitality > 0) {
            self.vitality -= 1;
          }
          // record the amount of zombies stopped walking
          zombieStoppedGroup.push(zombie);
          //delete the repeat count
          zombieStoppedGroup.distinct();
          if (zombie.vitality > 2) {
            zombie.eatPlant();
          } else if (zombie.vitality == 2) {
            zombie.loseHead();
            zombie.noHeadEatPlant();
          } else if (zombie.vitality == 1) {
            zombie.down();
          } else if (zombie.vitality == 0) {
            zombie.die(zombieDeadGroup);
            self.stopShoot();
            zombiesG.remove(zombie);
            newZombiesGroup = zombiesG;
            // all zombies dead and you win
            if (zombieDeadGroup.length >= zombiesTotal) {
              if (zombiesTotal < 8) {
                setTimeout(function() {
                  alert("you win! Go to the next level.");
                  window.location.reload();
                }, 1000);
              } else {
                gamePass();
              }
            }
            self.shoot(newZombiesGroup);

          }
          if (self.vitality == 0) {
            self.stopShoot();
            self.die();
            //let the stopped zombies walking
            for (let i in zombieStoppedGroup) {
              if (zombieStoppedGroup[i].vitality > 2) {
                zombieStoppedGroup[i].walk();
              }
              if (zombieStoppedGroup[i].vitality == 2) {
                zombieStoppedGroup[i].noHeadWalk();
              }
            }
            zombieStoppedGroup = [];
          }
        }
      }

    }, 30);
  };
  //build another pod after a period of time
  this.podFly = setInterval(generateShoot, self.shootTime);
};

// function to stop the peashooter from shooting
Peashooter.prototype.stopShoot = function() {
  clearInterval(this.podFly);
  this.podFly = null;
}
Peashooter.prototype.die = function() {
  this.stopShoot;
  plantsContainer.removeChild(this.plant);
};

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
  let zombieEle = document.createElement('div');
  zombieEle.style.left = this.left + 'px';
  zombieEle.innerHTML = `<img src='assets/zombie-01.gif'>`;
  zombiesContainer.appendChild(zombieEle);
  return zombieEle;

}
// zombie walking function
Zombie.prototype.walk = function() {
  let self = this;
  self.zombieWalk = setInterval(function() {
    self.zombie.style.left = self.zombie.offsetLeft - 1 + "px";
    if (self.zombie.offsetLeft < -100) {
      if (gameEnd) return;
      gameOver();
    }
  }, self.walkSpeed);
  let img = self.zombie.querySelector("img");
  img.src = "assets/zombie-01.gif";

};
Zombie.prototype.noHeadWalk = function() {
  let self = this;
  self.zombieWalk = setInterval(function() {
    self.zombie.style.left = self.zombie.offsetLeft - 1 + "px";
    if (self.zombie.offsetLeft < -100) {
      if (gameEnd) return;
      gameOver();
    }
  }, self.walkSpeed);
  let img = self.zombie.querySelector("img");
  img.src = "assets/zombieNoHeadWalk.gif";

};
Zombie.prototype.loseHead = function() {
  let head = document.createElement("img");
  head.src = "assets/zombie-01-head.gif";
  head.className = "zombieHead";
  head.style.left = self.zombie.offsetLeft + "px";
  head.style.top = self.zombie.offsetTop + "px";
  zombiesContainer.appendChild(head);
  setTimeout(function() {
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
// zombie wins
let gameEnd;
let gameOver = function() {
  gameEnd = true;
  let endingMessage = document.createElement('img');
  endingMessage.src = "assets/gameOver.jpg"
  endingMessage.className = "ZombieWinsMessage"
  background.appendChild(endingMessage);
  setTimeout(function() {
    window.alert('Game is Over, Zombie wins')
  }, 2800);
};


let backgroundEle = document.querySelector('.background');
let sodPathEle = document.querySelector('.sod');
let zombiesContainer = document.querySelector('.zombies-container');
let plantsContainer = document.querySelector('.plants-container');
let sunCountEle = document.querySelector('#suncount');
let gameConsoleEle = document.querySelector('.game-console');
let peaConsoleEle = document.querySelector('#peashooter');
let walnutConsoleEle = document.querySelector('#walnut');
let bgImageEle = document.querySelector('#bgImage');

let totalZombies = 12;
// let currentZombies = [];
// zombies already show
let zombiesGroup = [];
// all of zombies
let zombiesTotal = [];
// keep on updating the zombie states
let newZombiesGroup;
//record the zombies stopped walking
let zombieStoppedGroup = [];
// record dead zombies
let zombieDeadGroup = [];

function Sun() {
  this.sun = this.create();
  this.value = 50;
  this.existingTime = 3000;
}
Sun.prototype.create = function() {
  let sunEle = document.createElement('img');
  sunEle.className = 'sun';
  sunEle.src = "./assets/sun.gif";
  backgroundEle.appendChild(sunEle);
  return sunEle;
}

Sun.prototype.dropSun = function() {
  let sunEle = this.sun;
  let sunLeft = Math.floor(Math.random() * (backgroundEle.offsetWidth - sunEle.offsetWidth - 280) + 200);
  sunEle.style.left = sunLeft + 'px';
  let sunTop = Math.floor(Math.random() * (backgroundEle.offsetHeight - sunEle.offsetHeight - 100) + 50);
  sunEle.style.top = '0px';
  let sunFallTimer = setInterval(function() {
    if (sunEle.offsetTop > sunTop) {
      clearInterval(sunFallTimer);
      if (sunEle.offsetTop > 360 || sunEle.offsetTop < 240) {
        setTimeout(function() {
          sunEle.style.left = "-60px";
          sunEle.style.top = "-60px";
          backgroundEle.removeChild(sunEle);
        }, 3000);
      }
    } else {
      sunEle.style.top = sunEle.offsetTop + 16 + 'px';
    }
  }, 20);
}

let selectPlant = function(evt) {
  if (gameState.sunCount < 50) {
    walnutConsoleEle.id = 'walnut';
    peaConsoleEle.id = 'peashooter';
  } else if (gameState.sunCount < 100) {
    walnutConsoleEle.id = 'walnut-active';
    peaConsoleEle.id = 'peashooter';
  } else if (gameState.sunCount >= 100) {
    peaConsoleEle.id = "peashooter-active";
    walnutConsoleEle.id = "walnut-active"
  }

  if (evt.target.id === "peashooter-active") {
    plantsContainer.addEventListener('click', placePlant);
    gameState.readyPlant = "peashooter";

    if (gameState.sunCount < 50) {
      walnutConsoleEle.id = 'walnut';
      peaConsoleEle.id = "peashooter";
    } else if (gameState.sunCount < 100) {
      evt.target.id = "peashooter";
    }
  } else if (evt.target.id === 'walnut-active') {
    gameState.sunCount -= 50;
    plantsContainer.addEventListener('click', placePlant);
    gameState.readyPlant = 'walnut';
    sunCountEle.innerText = gameState.sunCount;
    if (gameState.sunCount < 50) {
      evt.target.id = "walnut";
      peaConsoleEle.id = "peashooter";
    } else if (gameState.sunCount < 100) {
      peaConsoleEle.id = 'peashooter';
    }
  }
}

let gameState = {
  sunCount: 0,
  readyPlant: ''
}

let collectSun = function(evt) {
  if (evt.target.className === "sun") {
    gameState.sunCount += 50;
    sunCountEle.innerText = gameState.sunCount;

    if (gameState.sunCount >= 100) {
      peaConsoleEle.id = "peashooter-active";
    } else if (gameState.sunCount >= 50) {
      walnutConsoleEle.id = "walnut-active";
    }
    let sunGoneTimer = setInterval(function() {
      if (evt.target.offsetLeft < 0 && evt.target.offsetTop < 0) {
        evt.target.parentNode.removeChild(evt.target);
        clearInterval(sunGoneTimer);
      } else {
        evt.target.style.left = evt.target.offsetLeft - 20 + 'px';
        evt.target.style.top = evt.target.offsetTop - 20 + 'px';
      }
    }, 20);
  }
}

let placePlant = function(evt) {
  if (evt.offsetX > 30 && evt.offsetX + 20 < this.offsetWidth) {
    let plant;
    if (gameState.readyPlant === "peashooter") {
      plant = new Peashooter;
      gameState.sunCount -= 100;
    } else if (gameState.readyPlant === 'walnut') {
      plant = new Walnut;
      gameState.sunCount -= 50;
    }
    plant.plant.style.left = evt.offsetX - 48 + 'px';
    plantsContainer.appendChild(plant);
    gameState.readyPlant = '';
    plantsContainer.removeEventListener('click', placePlant);
    sunCountEle.innerText = gameState.sunCount;
  }
}


window.onload = function() {
  gameBegin();
}

let gameBegin = function() {
  let sunCreateTimer = setInterval(function() {
    let sun = new Sun;
    sun.dropSun();
  }, 5000);
  backgroundEle.addEventListener('click', collectSun);
  //  gameConsoleEle.addEventListener('drag', dragPlant);
  gameConsoleEle.addEventListener('click', selectPlant);
  //use plants to fight zombies
  //generate zombies
  setTimeout(function() {
      setTimeout(function() {
        let zombie = new Zombie();
        zombiesGroup.push(zombie);
        zombiesTotal.push(zombie);
        console.log(zombie);
        zombie.walk();
      }, 3000);

      setTimeout(function() {
        //if (totalZombies < 2) return;
        //a wave of zombies
        //prepare.src = "img/LargeWave.gif";
        //prepare.style.visibility = "visible";
        // setTimeout(function() {
        //  prepare.style.visibility = "hidden";
        // }, 4000);
        //to create a flagship zombie
        // let flagZombie = new Zombie(12, 60, 830, "FlagZombie/FlagZombie");
        // zombiesGroup.push(flagZombie);
        // zombiesTotal.push(flagZombie);
        // flagZombie.walk();
        //if (totalZombies < 3) return;
        let buildZombies = setInterval(function() {
          var zombie = new Zombie();
          zombiesGroup.push(zombie);
          zombiesTotal.push(zombie);
          zombie.walk();
          if (zombiesTotal.length >= totalZombies) {
            clearInterval(buildZombies);
            buildZombies = null;
          }
        }, 5000);
      }, 25000);
    },
    4000);
};
