# plants vs zombies
### MVP
### Introduction
This is a simple prototype of action-strategy game Plants vs Zombies. The playing field is a sterile lawn with one horizontal sod lanes. a zombie is able to move horizontally from the right side of the lawn towards the house. The plants are placed on the sod lane and they are stationary. The goal is to grow plants on lawn to protect owner's house and stop a cohort of zombies from reaching it.

### Gameplay
- Game starts with sun coins of zero and no plants or zombies on the lawn.
- Home owner can increase sun coins through collecting suns dropping on the lawn.
- Suns are falling on the lawn randomly at a set time frame.
- Plants include peashooter and walnut. Peashooter cost 100 sun coins, walnut cost 50 sun coins.
- Each plant has its unique offensive or defensive capability.
- Peashooter is able to launch bullets to shoot zombies and three bullets will kill a zombie.
- Walnut has a high defensive ability and able to stop the zombies for a period of time.
- User need to click to select the plant in the menu and place the plant on sod lane by clicking.
- Zombies are spawned from the right side of the screen and approaching to the house.
- If all zombies are dead, you win the game. If any zombie breaches the house, game is lost.

### Specs and Planning
- setInterval to generate suns. The position is randomly distributed inside the lawn.
- addEventListener to the lawn and if click event's target is the sun, add money to the bank.
- select plants on the console.
- place the plant on lawn. deduct money from bank.
- setInterval to generate zombies.
- each zombie is created with a factory function.
- if collision happens, deduct the according vitality/blood of either plants or zombies.
- when zombie kills all plants and reach the house, the game is over.

### Technologies
- HTML5 & CSS3
- Native Javascript
