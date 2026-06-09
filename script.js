import * as lvl1 from "./lvl1.js";
import * as lvl2 from "./lvl2.js";
import * as lvl3 from "./lvl3.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


const startScreen = document.getElementById("startScreen");
let started = false;

function startGame() {
  if (started) return;
  started = true;
  startScreen.style.display = "none";
}

// Tastatur
document.addEventListener("keydown", startGame);

// Maus / Klick
document.addEventListener("click", startGame);

// Touch
document.addEventListener("touchstart", startGame, { passive: false });

const keys = {};
const gravity = 3;

const slowFactor = 2;
let frameCounter = 0;

// --- Levels (Module) ---
const levels = [lvl1, lvl2, lvl3];
let currentLevelIndex = 0;

// --- Helper: Level sauber in Daten umwandeln ---
function safeArray(v) {
  return Array.isArray(v) ? [...v] : [];
}

function createLevel(lvl) {
  return {
    dwarf: { ...lvl.dwarf },
    shapes: safeArray(lvl.shapes),
    platforms: safeArray(lvl.platforms),
    bubbles: safeArray(lvl.bubbles),
    covers: safeArray(lvl.covers),
    door: { ...lvl.door },
    king: lvl.king ? { ...lvl.king } : null,
    key: lvl.key ? { ...lvl.key } : { x: 500, y: 250 },
    carriage: { ...lvl.carriage },
    background: lvl.background
  };
}

// --- aktuelles Level ---
let currentLevel = createLevel(levels[currentLevelIndex]);

// --- Input ---
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);
// --- TOUCH CONTROLS ---
canvas.addEventListener("touchstart", handleTouch, { passive: false });
canvas.addEventListener("touchend", handleTouchEnd, { passive: false });

function handleTouch(e) {
  e.preventDefault();

  const touch = e.touches[0];
  const x = touch.clientX;
  const y = touch.clientY;

  const width = window.innerWidth;
  const height = window.innerHeight;

  // --- UNTEN = SPRINGEN ---
  if (y > height * 0.7) {
    keys["Space"] = true;
    return;
  }

  // --- OBEN LINKS = LINKS ---
  if (x < width / 2) {
    keys["ArrowLeft"] = true;
  }

  // --- OBEN RECHTS = RECHTS ---
  else {
    keys["ArrowRight"] = true;
  }
}

function handleTouchEnd() {
  keys["ArrowLeft"] = false;
  keys["ArrowRight"] = false;
  keys["Space"] = false;
}
// --- Levelwechsel ---
function loadNextLevel() {
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
function gameLoop() {
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
      currentLevel.shapes,
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