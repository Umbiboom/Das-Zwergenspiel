import * as lvl1 from "./lvl1.js";
import * as lvl2 from "./lvl2.js";
import * as lvl3 from "./lvl3.js";
import { bindButton, safeArray, createLevel, handleTouch, handleTouchEnd } from "./functions.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const startScreen = document.getElementById("startScreen");
let started = false;


// Tastatur
document.addEventListener("keydown", startGame);

startScreen.addEventListener("click", startGame);

startScreen.addEventListener("touchstart", startGame, {
  passive: false
});


const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const jumpBtn = document.getElementById("jumpBtn");

const keys = {};

bindButton(leftBtn, "ArrowLeft", keys);
bindButton(rightBtn, "ArrowRight", keys);
bindButton(jumpBtn, "Space", keys);


const gravity = 3;

const slowFactor = 2;
let frameCounter = 0;

// --- Levels (Module) ---
const levels = [lvl1, lvl2, lvl3];
let currentLevelIndex = 0;

// --- Helper: Level sauber in Daten umwandeln ---


// --- aktuelles Level ---
let currentLevel = createLevel(levels[currentLevelIndex]);

// --- Input ---
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);
// --- TOUCH CONTROLS ---
canvas.addEventListener("touchstart", handleTouch, { passive: false });
canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

export function startGame() {
  if (started) return;
  started = true;
  startScreen.style.display = "none";
}

// --- Levelwechsel ---
export function loadNextLevel() {
  const dwarf = currentLevel.dwarf;

  if (dwarf.isLoadingNextLevel) return;
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
      currentLevel = createLevel(levels[currentLevelIndex]);

      // Reset wichtige States nach Levelwechsel
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

// --- Game Loop ---
export function gameLoop() {
  if (!started) {
    requestAnimationFrame(gameLoop);
    return;
  }
  frameCounter++;

  if (frameCounter >= slowFactor) {

    const lvl = levels[currentLevelIndex];

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
      currentLevel.covers
    );

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

// --- Start ---
gameLoop();