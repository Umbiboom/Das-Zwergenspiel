import * as lvl1 from "./lvl1.js";
import * as lvl2 from "./lvl2.js";
import * as lvl3 from "./lvl3.js";

import {
  bindButton,
  safeArray,
  createLevel,
  handleTouch,
  handleTouchEnd
} from "./functions.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startScreen = document.getElementById("startScreen");
let started = false;


// ---------------------------------------------------
// Tastatur / Start
// ---------------------------------------------------

document.addEventListener("keydown", startGame);

startScreen.addEventListener("click", startGame);

startScreen.addEventListener("touchstart", startGame, {
  passive: false
});

document.addEventListener("keydown", e => {
  if (
    ![
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
      "KeyA",
      "KeyD",
      "Space"
    ].includes(e.code)
  ) {
    return;
  }

  document.body.classList.add("using-keyboard");
});


// ---------------------------------------------------
// Buttons
// ---------------------------------------------------

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const jumpBtn = document.getElementById("jumpBtn");
const keyBtn = document.getElementById("keyBtn");

const keys = {};

bindButton(leftBtn, "ArrowLeft", keys);
bindButton(rightBtn, "ArrowRight", keys);
bindButton(jumpBtn, "Space", keys);
bindButton(keyBtn, "ArrowUp", keys);


// ---------------------------------------------------
// Spielwerte
// ---------------------------------------------------

const gravity = 3;

const slowFactor = 2;
let frameCounter = 0;


// ---------------------------------------------------
// Levels
// ---------------------------------------------------

const levels = [
  lvl1,
  lvl2,
  lvl3
];

let currentLevelIndex = 0;


// ---------------------------------------------------
// Aktuelles Level
// ---------------------------------------------------

let currentLevel = createLevel(
  levels[currentLevelIndex]
);


// ---------------------------------------------------
// Input
// ---------------------------------------------------

document.addEventListener(
  "keydown",
  e => {
    keys[e.code] = true;
  }
);

document.addEventListener(
  "keyup",
  e => {
    keys[e.code] = false;
  }
);


// ---------------------------------------------------
// Touch Controls
// ---------------------------------------------------

canvas.addEventListener(
  "touchstart",
  handleTouch,
  { passive: false }
);

canvas.addEventListener(
  "touchend",
  handleTouchEnd,
  { passive: false }
);


// ---------------------------------------------------
// Spiel starten
// ---------------------------------------------------

export function startGame() {

  if (started) return;

  started = true;

  startScreen.style.display = "none";
}


// ---------------------------------------------------
// Nächstes Level laden
// ---------------------------------------------------

export function loadNextLevel() {

  const dwarf = currentLevel.dwarf;

  if (dwarf.isLoadingNextLevel) {
    return;
  }

  dwarf.isLoadingNextLevel = true;


  if (currentLevelIndex < levels.length - 1) {

    dwarf.nachricht = {
      n: "Level abgeschlossen!\nLade nächstes Level...",
      x: 30,
      y: 40,
      c: dwarf.nachricht?.c ?? "white"
    };

  } else {

    dwarf.finalMessage = true;
  }


  setTimeout(() => {

    currentLevelIndex++;


    if (currentLevelIndex < levels.length) {

      currentLevel = createLevel(
        levels[currentLevelIndex]
      );


      // Reset wichtige States
      currentLevel.dwarf.nachricht = {
        n: "",
        x: 30,
        y: 40,
        c: "white"
      };

      currentLevel.dwarf.isLoadingNextLevel = false;

    } else {

      dwarf.isLoadingNextLevel = false;
    }

  }, 1000);
}


// ---------------------------------------------------
// Game Loop
// ---------------------------------------------------

export function gameLoop() {

  if (!started) {

    requestAnimationFrame(gameLoop);
    return;
  }


  frameCounter++;


  if (frameCounter >= slowFactor) {

    const lvl =
      levels[currentLevelIndex];


    lvl.loop(

      ctx,
      canvas,

      currentLevel.dwarf,
      currentLevel.platforms,
      currentLevel.bubbles,

      currentLevel.door,

      currentLevel.king ?? null,

      currentLevel.key,

      keys,

      gravity,

      currentLevel.background,

      currentLevel.backgroundshapes,
      currentLevel.foregroundshapes,

      currentLevel.carriage,

      currentLevel.covers,

      // ------------------------------------------------
      // WICHTIG:
      // Monster an lvl2.js übergeben
      // ------------------------------------------------
      currentLevel.monster ?? null
    );


    // ------------------------------------------------
    // Levelwechsel
    // ------------------------------------------------

    if (
      currentLevel.dwarf.MoveOn &&
      !currentLevel.dwarf.isLoadingNextLevel
    ) {

      loadNextLevel();
    }


    frameCounter = 0;
  }


  requestAnimationFrame(gameLoop);
}


// ---------------------------------------------------
// Start
// ---------------------------------------------------

gameLoop();
