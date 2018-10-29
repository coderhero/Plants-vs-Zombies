
let backgroundEle = document.querySelector('.background');
let sodPathEle = document.querySelector('.sod');
let zombiesContainer = document.querySelector('.zombies-container');
let plantsContainer = document.querySelector('.plants-container');
let sunCountEle = document.querySelector('#suncount');
let gameConsoleEle = document.querySelector('.game-console');
let peaConsoleEle = document.querySelector('#peashooter');
let walnutConsoleEle = document.querySelector('#walnut');
let bgImageEle = document.querySelector('#bgImage');

let totalAmountOfZombies = 12;
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
// function to create a peashooter object
function Peashooter() {
  // peashooter initialization
  this.plant = this.init();
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
  plantsContainer.appendChild(peashooter);
}
// peashooter is the weapon to shoot pods
Peashooter.prototype.pod = function() {
  let pod = document.createElement('img');
  pod.src = 'assets/plant-bullet.gif';
  pod.className = "bullet";
  pod.style.left = this.plant.offsetLeft + 32 + 'px';
  pod.style.top = this.plant.offsetTop - 2 + 'px';
  zombiesContainer.appendChild(pod);
  return pod;
}
// shoot method is used to launch pods and kill zombies
Peashooter.prototype.shoot = function(zombiesG) {
  // store this into self for the use of different function scopes
  let self = this;
  // create the function of pod to kill zombies
  let generateShoot = function() {
    // if there is no zombie then don't shoot
    if (zombiesG.length < 1) {
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
      // this if statement is intended to check if there is no zombie on the peashooter's right side, then don't shoot
      // if there is zombie and peashooter
      // let tempOffSetLeft = zombiesG[i].zombie.offsetLeft;
      // zombiesOffSetArr.push(tempOffSetLeft);
    }
    // if ((Math.max.apply(null, zombieOnTheRightOffSetArr) + 35) < self.plant.offsetLeft - 75) return;
    let pod = self.pod();
    // this timer is used for pod flying/shooting animation
    pod.moveTimer = setInterval(function() {
      // increase the pod offsetLeft by 10px
      pod.style.left = pod.offsetLeft + 10 + 'px';
      // for loop to go through all zombies and shoot the immediate enemy
      for (var i = 0; i < zombiesG.length; i++) {
        let zombie = zombiesG[i];
        if (!zombie.zombie || !self.plant) continue;
        // when the zombie is at the left of the plant, stop shooting
        if ((zombie.zombie.offsetLeft + 34) < self.plant.offsetLeft - 74) continue;
        // when pod hits the zombie on the right side
        if (pod.offsetLeft > zombie.zombie.offsetLeft + 54) {
          clearInterval(pod.moveTimer);
          pod.moveTimer = null;
          pod.src = "assets/podHit.gif";
          setTimeout(function() {
            if (pod.parentNode != zombiesContainer) return;
            zombiesContainer.removeChild(pod);
          }, 280);
          if (zombie.vitality >= 0) {
            zombie.vitality -= 1;
          }
        }
        //when the zombie is at the right side of the peashooter
        // if ((zombie.zombie.offesetLeft + 32) > (self.plant.offsetLeft + self.plant.offsetWidth) &&
        //   zombie.vitality >= 0 && self.vitality >= 0) {
        if(zombie.vitality >= 0 && self.vitality >= 0 && (zombie.zombie.offsetLeft + 32) > (self.plant.offsetLeft + self.plant.offsetWidth)) {
        //  console.log('im inside zombie vitality ' + zombie.vitality)
          if (zombie.vitality == 2) {
            zombie.loseHead();
            zombie.stopWalk();
            zombie.noHeadWalk();
          } else if (zombie.vitality == 1) {
            zombie.fallDown();
          } else if (zombie.vitality == 0) {
            zombie.die(zombieDeadGroup);
            self.stopShoot();
            //delete dead zombie
            let index = zombiesG.indexOf(zombie);
            if (index != -1) {
                zombiesG.splice(index, 1);
            }
            newZombiesGroup = zombiesG;
            //all zombies dead and you win
            if (zombieDeadGroup.length >= totalAmountOfZombies) {
              if (totalAmountOfZombies < 18) {
                setTimeout(function() {
                  alert("success! You win! You can enter next level");
                  window.location.reload();
                }, 1000);
              } else {
                // gamePass();
              }
            }
            //shoot the remaining zombies
            self.shoot(newZombiesGroup);
          }
          return false;

        }else if (zombie.vitality >= 0 && self.vitality >= 0 && (zombie.zombie.offsetLeft + 14) <= (self.plant.offsetLeft + self.plant.offsetWidth)) {
          // zombie approach and start eating plants
          if (zombie.vitality > 0) {
            self.vitality = self.vitality - 1;
          //  console.log('plant vitality is ' + self.vitality)
          }
          // record the amount of zombies stopped walking
          zombieStoppedGroup.push(zombie);
          //delete the repeat count
          zombieStoppedGroup.unique();
          if (zombie.vitality > 2) {
          //  console.log('im eating the plant')
            zombie.eatPlant();
          } else if (zombie.vitality == 2) {
            zombie.loseHead();
            zombie.eatPlantWithoutHead();
          } else if (zombie.vitality == 1) {
            zombie.fallDown();
          } else if (zombie.vitality == 0) {
            zombie.die(zombieDeadGroup);
            self.stopShoot();
            let indexZ = zombiesG.indexOf(zombie);
            if (indexZ != -1) {
                zombiesG.splice(indexZ, 1);
            }
            newZombiesGroup = zombiesG;
            // all zombies dead and you win
            if (zombieDeadGroup.length >= totalAmountOfZombies) {
              if (totalAmountOfZombies < 18) {
                setTimeout(function() {
                    alert("you win! Go to the next level.");
                    window.location.reload();
                }, 1000);
              } else {
                // gamePass();
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
  //build another pod to shoot zombie after a period of time
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
  this.vitality = 6;
  // not sure why but the left setting is not working, I have to set it in CSS and then worked
  this.left = 900;
  // the smaller value, the faster walking
  this.walkSpeed = 40;
}

Zombie.prototype.init = function() {
  let zombieEle = document.createElement('div');
  zombieEle.className = "zombie";
  zombieEle.style.left = this.left + 'px';
  // the offsetLeft is not working
  // console.log(zombieEle.offsetLeft)
  zombieEle.innerHTML = "<img src='assets/zombie-01.gif'>";
  zombiesContainer.appendChild(zombieEle);
  return zombieEle;

}
// zombie walking function
Zombie.prototype.walk = function() {
  let self = this;
  self.zombieWalk = setInterval(function() {
    self.zombie.style.left = self.zombie.offsetLeft - 1 + "px";
    if (self.zombie.offsetLeft < -120) {
    //  console.log('the offsetLeft is ' + self.zombie.offsetLeft)
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
    if (self.zombie.offsetLeft < -120) {
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
  head.style.left = this.zombie.offsetLeft + "px";
  head.style.top = this.zombie.offsetTop + "px";
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
Zombie.prototype.fallDown = function() {
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
  endingMessage.src = "assets/gameOver.jpg";
  endingMessage.className = "ZombieWinsMessage";
  backgroundEle.appendChild(endingMessage);
  setTimeout(function() {
    alert('Game is Over, Zombie wins. Please try again!')
  }, 2800);
  setTimeout(function() {
    location.reload();
  }, 3000);
};


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
          if(sunEle.parentNode != backgroundEle) {
            // stop the removeChild function if sun is no longer in the child node
            return;
          }
          backgroundEle.removeChild(sunEle);
        }, 3000);
      }
    } else {
      sunEle.style.top = sunEle.offsetTop + 16 + 'px';
    }
  }, 20);
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
};

let selectPlant = function(evt) {

  if (evt.target.id === "peashooter-active") {
    sodPathEle.addEventListener('click', placePlant);
    gameState.readyPlant = "peashooter";

    if (gameState.sunCount < 50) {
      walnutConsoleEle.id = 'walnut';
      peaConsoleEle.id = "peashooter";
    } else if (gameState.sunCount < 100) {
      evt.target.id = "peashooter";
    }
  } else if (evt.target.id === 'walnut-active') {
    sodPathEle.addEventListener('click', placePlant);
    gameState.readyPlant = 'walnut';
    if (gameState.sunCount < 50) {
      evt.target.id = "walnut";
      peaConsoleEle.id = "peashooter";
    } else if (gameState.sunCount < 100) {
      peaConsoleEle.id = 'peashooter';
    }
  }
}
let updatePlantMenu = function() {
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
};

let gameState = {
  sunCount: 0,
  readyPlant: ''
}

let placePlant = function(evt) {
  if (evt.offsetX > 30 && evt.offsetX + 20 < this.offsetWidth) {
    let plant;
    if (gameState.readyPlant === "peashooter") {
      plant = new Peashooter;
      plant.shoot(zombiesGroup);
      gameState.sunCount -= 100;
    } else if (gameState.readyPlant === 'walnut') {
      plant = new Walnut;
      gameState.sunCount -= 50;
    }
  //  console.log(plant.plant);
    plant.plant.style.left = evt.offsetX - 48 + 'px';
    plantsContainer.appendChild(plant.plant);
    gameState.readyPlant = '';
    sodPathEle.removeEventListener('click', placePlant);
    updatePlantMenu();
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
        zombie.walk();
      }, 3000);

      setTimeout(function() {
        //if (totalAmountOfZombies < 2) return;
        //a wave of zombies
        //to create a flagship zombie
        // let flagZombie = new Zombie(12, 60, 830, "FlagZombie/FlagZombie");
        // zombiesGroup.push(flagZombie);
        // zombiesTotal.push(flagZombie);
        // flagZombie.walk();
        //if (totalAmountOfZombies < 3) return;
        let buildZombiesTimer = setInterval(function() {
          let zombie = new Zombie();
          zombiesGroup.push(zombie);
          zombiesTotal.push(zombie);
          zombie.walk();
          if (zombiesTotal.length >= totalAmountOfZombies) {
            clearInterval(buildZombiesTimer);
            buildZombiesTimer = null;
          }
        }, 5000);
      }, 25000);
    },
    4000);
};

function Walnut() {
  this.plant = this.init();
  this.vitality = 6;

}
Walnut.prototype.init = function() {
  let plant = document.createElement('div');
  plant.innerHTML = '<img src="assets/plant-walnut.png">'
  return plant;
}
// helper function to delete repeat in Array
Array.prototype.unique = function(){
    for(var i = 0; i < this.length; i++){
        var n = this[i];
        this.splice(i, 1, null);
        // if there is no repeat
        if(this.indexOf(n) < 0){
            this.splice(i, 1, n);
        }else{
          // if there is repeat
            this.splice(i, 1);
        }
    }
    return this;
};
