# plants-vs-zombies
### MVP
### Introduction
This is a simple version of action-strategy game Plants vs Zombies. The playing field includes only one horizontal lanes. a zombie is able to move only one horizontal direction towards the house. The plants are placed stationary on one lane and not able to move. The goal is to use plants to protect owner's house and stop a cohort of zombies from reaching it.
- Home owner can make money through collecting suns dropping on the lawn.
- Suns are falling on lawns randomly at a set time frame.
- Plants include peashooter, seeds, and walnut.
- Each plant has its unique offensive or defensive capability.
- peashooter is able to launch seeds/bullets to shoot zombies and decrease zombies' vitality.
- If all zombies are dead, you win the game. If any zombie breaches the house, game is lost.

###Specs and Planning
- setInterval to generate suns by createElement. The position is randomly distributed inside the lawn.
- addEventListener to the lawn and if click event's target is the same as sun's className, add money to the bank.
- select plants and placed the plant on lawn. deduct money from bank.
- setInterval to generate zombies.
- if collision happens, deduct the according vitality for either plants or zombies.
