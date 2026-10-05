import {
  update,
  checkDoor,
  drawBackgroundShapes,
  drawPlatforms,
  checkPlatformsCollision,
  drawKey,
  drawDwarf,
  drawDoor,
  textZeigen,
  playerMoveOn,
  drawForegroundShapes,
  drawMonster,
  updateMonster,
  checkMonsterCollision,
  drawCovers,
  restartLevel
} from "./functions.js";


// =====================================================
// LEVEL 2
// =====================================================

// ---------------- MONSTER ----------------

export const MONSTER_SPEED = 2.4;
export const MONSTER_ACTIVATION_RANGE = 260;

const MONSTER_OPTIONS = {
  speed: MONSTER_SPEED,
  activationRange: MONSTER_ACTIVATION_RANGE
};


// ---------------- HINTERGRUND ----------------

export const background = "#82c7ed";


// ---------------- TÜR ----------------
// Tür oben auf dem rechten Felsen

export const door = {
  x: 870,
  y: 170,
  w: 30,
  h: 50,
  c: "#70451f",
  o: "#e0a05a"
};


// ---------------- SCHLÜSSEL ----------------
// Schlüssel genau in der Mitte der Brücke

export const key = {
  x: 500,
  y: 285
};


// ---------------- ZWERG ----------------
// Start links auf dem Felsen

export const dwarf = {
  x: 70,
  y: 170,

  w: 16,
  h: 50,

  vx: 0,
  vy: 0,

  speed: 7,
  jump: 13,

  direction: 1,

  onGround: false,
  frame: 0,

  schluessel: 0,

  MoveOn: false,
  disappear: false,
  dead: false,

  restartAt: 0,

  nachricht: {
    n: "",
    x: 30,
    y: 40,
    c: "white"
  },

  nachricht3: {
    n: "",
    x: 300,
    y: 380,
    c: "white"
  },

  nachricht4: {
    n: "",
    x: 300,
    y: 380,
    c: "white"
  },

  isLoadingNextLevel: false,
  finalMessage: false
};


// =====================================================
// BRÜCKE
// =====================================================

// Die Brücke liegt tiefer als die beiden Felsen.

export const bridge = {
  x: 300,
  y: 300,
  w: 400,
  h: 25
};


// =====================================================
// MONSTER
// =====================================================

export const monster = {
  x: 560,
  y: 240,

  w: 42,
  h: 60,

  vx: 0,
  vy: 0,

  direction: -1,
  frame: 0,

  active: false,

  debugHitbox: false,

  // Das Monster bleibt auf der Brücke.
  bridge: bridge
};


// =====================================================
// PLATTFORMEN
// =====================================================

// Linker Felsen
// Rechter Felsen
// Brücke dazwischen

export const platforms = [

  { x: 0, y: 220, w: 300, h: 180, c: "#59636d"},
  { x: bridge.x, y: bridge.y, w: bridge.w, h: bridge.h, c: "#70472c"},
  { x: 700, y: 220, w: 300, h: 180, c: "#59636d"},
  { x: 820, y: 210, w: 180, h: 20, c: "#68737d"}
];



export const backgroundshapes = [

  {x: -50, y: 130, w: 400, h: 300, c: "#7192a0", type: "hill"},
  {x: 300, y: 120, w: 400, h: 310, c: "#62879f", type: "hill"},
  {x: 650, y: 130, w: 400, h: 300, c: "#7192a0", type: "hill"}
];



export const foregroundshapes = [

  {x: 300, y: 365,w: 400,h: 45,c: "#1986ad"},
  {x: 300, y: 380,w: 400,h: 25,c: "#14789c"}
];




export function loop(
  ctx,
  canvas,
  dwarf,
  platforms,
  bubbles,
  door,
  king,
  key,
  keys,
  gravity,
  background,
  backgroundshapes,
  foregroundshapes,
  carriage,
  covers
) {

  // ---------------- HINTERGRUND ----------------

  ctx.fillStyle = background;

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );


  // Berge
  drawBackgroundShapes(
    ctx,
    backgroundshapes
  );


  // ---------------- PLATTFORMEN ----------------

  drawPlatforms(
    ctx,
    platforms
  );


  // ---------------- WASSER ----------------

  // Wasser wird mit deiner vorhandenen
  // drawForegroundShapes()-Funktion gezeichnet.
  drawForegroundShapes(
    ctx,
    foregroundshapes
  );


  // ---------------- TOD ----------------

  if (dwarf.dead) {

    drawDwarf(
      ctx,
      dwarf
    );

    textZeigen(
      ctx,
      "Erwischt!",
      300,
      120,
      "red"
    );

    if (!dwarf.restartAt) {
      dwarf.restartAt = performance.now();
    }

    if (
      performance.now() -
      dwarf.restartAt >
      1100
    ) {

      dwarf.restartAt = 0;

      restartLevel(
        dwarf
      );
    }

    return;
  }


  // ---------------- ZWERG BEWEGEN ----------------

  update(
    canvas,
    dwarf,
    platforms,
    keys,
    gravity
  );


  const arrowUpPressed =
    !!keys["ArrowUp"];


  // ---------------- TÜR ----------------

  checkDoor(
    dwarf,
    door,
    arrowUpPressed
  );


  // ---------------- PLATTFORM-KOLLISION ----------------

  checkPlatformsCollision(
    dwarf,
    platforms,
    canvas
  );


  // ---------------- SCHLÜSSEL ----------------

  drawKey(
    ctx,
    dwarf,
    key
  );


  // ---------------- COVERS ----------------

  if (Array.isArray(covers)) {

    drawCovers(
      ctx,
      dwarf,
      covers
    );
  }


  // ---------------- MONSTER ----------------

  // Verhalten bleibt unverändert.
  // Es bewegt sich weiterhin nur auf der Brücke.

  updateMonster(
    monster,
    dwarf,
    canvas,
    MONSTER_OPTIONS
  );

  drawMonster(
    ctx,
    monster
  );


  // Monster trifft Zwerg
  if (
    checkMonsterCollision(
      dwarf,
      monster
    )
  ) {

    dwarf.dead = true;

    dwarf.vx = 0;
    dwarf.vy = 0;
  }


  // ---------------- TÜR ZEICHNEN ----------------

  drawDoor(
    ctx,
    door
  );


  // ---------------- ZWERG ZEICHNEN ----------------

  drawDwarf(
    ctx,
    dwarf
  );


  // ---------------- TEXTE ----------------

  if (dwarf.nachricht) {

    textZeigen(
      ctx,
      dwarf.nachricht.n,
      dwarf.nachricht.x,
      dwarf.nachricht.y,
      dwarf.nachricht.c
    );
  }

  if (dwarf.nachricht3) {

    textZeigen(
      ctx,
      dwarf.nachricht3.n,
      dwarf.nachricht3.x,
      dwarf.nachricht3.y,
      dwarf.nachricht3.c
    );
  }

  if (dwarf.nachricht4) {

    textZeigen(
      ctx,
      dwarf.nachricht4.n,
      dwarf.nachricht4.x,
      dwarf.nachricht4.y,
      dwarf.nachricht4.c
    );
  }


  // ---------------- LEVEL ABSCHLIESSEN ----------------

  playerMoveOn(
    dwarf,
    door,
    arrowUpPressed
  );
}
