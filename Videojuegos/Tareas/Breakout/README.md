# **Breakout Implementation** 

_Author: Mauricio Monroy - A01029647_
_Date: 12/marzo/2025_

---

## Accessing Game

1. In terminal `cmd` or GitBash:
    - Clone Construccion_de_Software repository to local: `$git clone ssh: ...`
    - `$pwd`, copy path displayed
2. In a new window of a web browser compatible with: _HTML5 & CSS & JavaScript_
    - `Ctrl+O` -> paste path displayed from "path of working directory"
    - Open `html` folder
    - Open `breakout.html` in browser
3. Press [Spacebar] to start the game
4. To restart, press `Ctrl+R`

---

## Interaction

| Action | KeyBinding |
|------------------|-----------------|
| Move Paddle Left  | `LeftArrow` / `a` |
| Move Paddle Right | `RightArrow` / `d` |
| Start Game | `Spacebar` |
| Continue Game | `s` |

---

## Rules & Objective

1. Break all Blocks by making the Ball bounce in different trajectories from the Paddle. When all Blocks are broken, the player wins and the game ends.
2. Move the Paddle sideways to preven tthe Ball from hitting the lower screen border (the upper and side margins are allowed, and the ball will bounce from them)
3. The player has 3 attempts to break all bricks without having the Ball touch the lower border. If said border is touched, an attemp twill be substracted