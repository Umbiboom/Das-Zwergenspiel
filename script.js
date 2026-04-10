import { loop } from "./functions.js";

import * as lvl1 from "./lvl1.js";
import * as lvl2 from "./lvl2.js";
import * as lvl3 from "./lvl3.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const keys = {};
const gravity = 3;

const slowFactor = 2;
let frameCounter = 0;

// --- Levels Array ---
const levels = [lvl1, lvl2, lvl3];
let currentLevelIndex = 0;

// Aktuelles Level initial laden
let currentLevel = {
  dwarf: { ...levels[currentLevelIndex].dwarf },
  shapes: [...levels[currentLevelIndex].shapes],
  platforms: [...levels[currentLevelIndex].platforms],
  bubbles: [...levels[currentLevelIndex].bubbles],
  door: { ...levels[currentLevelIndex].door },
  king: { ...levels[currentLevelIndex].king },
  key: { ...levels[currentLevelIndex].key },
  carriage: { ...levels[currentLevelIndex].carriage },
  background: levels[currentLevelIndex].background,
  covers: [...levels[currentLevelIndex].covers]
};


// --- Event Listener für Tasten ---
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// --- Levelwechsel-Funktion ---
function loadNextLevel() {
  const dwarf = currentLevel.dwarf;
  if (dwarf.isLoadingNextLevel) return;
  dwarf.isLoadingNextLevel = true;

  if (currentLevelIndex < levels.length - 1) {
    dwarf.nachricht = {
      n: "Level abgeschlossen!\nLade nächstes Level...",
      x: 30,
      y: 40,
      c: dwarf.nachricht.c
    };
  } else {
    dwarf.finalMessage = true;
  }

  setTimeout(() => {
    currentLevelIndex++;

    if (currentLevelIndex < levels.length) {
      const lvl = levels[currentLevelIndex];

      currentLevel = {
        dwarf: { ...lvl.dwarf, nachricht: { n: "", x: 30, y: 40, c: "white" }, isLoadingNextLevel: false },
        shapes: [...lvl.shapes],
        platforms: [...lvl.platforms],
        bubbles: [...lvl.bubbles],
        door: { ...lvl.door },
        king: { ...lvl.king },
        key: { ...lvl.key },
        carriage: { ...lvl.carriage },
        background: lvl.background,
        covers: [...lvl.covers]
      };
    } else {
      dwarf.isLoadingNextLevel = false;
    }
  }, 1000);
}

// --- Hauptspiel-Schleife ---
function gameLoop() {

  frameCounter++;

  if (frameCounter >= slowFactor) {

    loop(
      ctx,
      canvas,
      currentLevel.dwarf,
      currentLevel.platforms,
      currentLevel.bubbles,
      currentLevel.door,
      currentLevel.king,
      currentLevel.key,
      keys,
      gravity,
      currentLevel.background,
      currentLevel.shapes,
      currentLevel.carriage,
      currentLevel.covers
    );

    if (currentLevel.dwarf.MoveOn && !currentLevel.dwarf.isLoadingNextLevel) {
      loadNextLevel();
    }

    frameCounter = 0;
  }

  requestAnimationFrame(gameLoop);
}

// --- Spiel starten ---
gameLoop();
