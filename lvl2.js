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



// --- Monster erstellen für Level 2 ---
export const MONSTER_SPEED = 2.4;
export const MONSTER_ACTIVATION_RANGE = 260;

const MONSTER_OPTIONS = {
  speed: MONSTER_SPEED,
  activationRange: MONSTER_ACTIVATION_RANGE
};


// --- Level 2 Daten ---
export const background = "#82c7ed";

export const door = {
  x: 740,
  y: 170,
  w: 30,
  h: 50,
  c: "#70451f",
  o: "#e0a05a"
};

export const key = {
  x: 500,
  y: 245
};


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
  startpointX: 70,
  startpointY: 170,
  frame: 0,
  schluessel: 0,
  MoveOn: false,
  disappear: false,
  dead: false,
  restartAt: 0,
  nachricht: {n:"",x:30,y:40,c:"white"},
  nachricht3: {n:"",x:300,y:380,c:"white"},
  nachricht4: {n:"",x:300,y:380,c:"white"},
  isLoadingNextLevel: false,
  finalMessage: false
};


// --- Brücke ---
export const bridge = {
  x: 200,
  y: 280,
  w: 510,
  h: 25
};


// --- Monster ---
export const monster = {
  x: 560,
  y: 220,
  w: 42,
  h: 60,
  vx: 0,
  vy: 0,
  direction: -1,
  frame: 0,
  active: false,
  debugHitbox: false,
  bridge: bridge
};


// --- Plattformen ---
export const platforms = [

  // Linker Felsen
  {x:0,y:220,w:200,h:180,c:"#59636d",type: "block"},

  // Brücke
  {x:bridge.x,y:bridge.y,w:bridge.w,h:bridge.h,c:"#70472c",type: "platform"},

  // Rechter Felsen
  {x:700,y:220,w:300,h:180,c:"#59636d", type: "block"}
  
];


// --- Hintergrundformen ---
export const backgroundshapes = [

  {x:-50,y:130,w:400,h:300,c:"#7192a0",type:"hill",angle:0},
  {x:300,y:120,w:400,h:310,c:"#62879f",type:"hill",angle:0},
  {x:650,y:130,w:400,h:300,c:"#7192a0",type:"hill",angle:0}

];


// --- Vordergrundformen ---
export const foregroundshapes = [

  {x:200,y:365,w:500,h:45,c:"#1986ad",type:"platform",angle:0},
  {x:200,y:380,w:500,h:25,c:"#14789c",type:"platform",angle:0}

];


// --- Covers ---
export const covers = [];


// --- Level Loop ---
export function loop(ctx, canvas, dwarf, platforms, bubbles, door, king, key, keys, gravity, background, backgroundshapes, foregroundshapes, carriage, covers) {

  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  // Hintergrund
  drawBackgroundShapes(ctx, backgroundshapes);


  // Plattformen
  drawPlatforms(ctx, platforms);


  // Wasser / Vordergrund
  drawForegroundShapes(ctx, foregroundshapes);


  // --- Tod ---
  if (dwarf.dead) {

    drawDwarf(ctx, dwarf);

    textZeigen(ctx, "Erwischt!", 300, 120, "red");

    if (!dwarf.restartAt) {
      dwarf.restartAt = performance.now();
    }

    if (performance.now() - dwarf.restartAt > 1100) {

      dwarf.restartAt = 0;

      restartLevel(dwarf);
    }

    return;
  }


  // --- Zwerg bewegen ---
  update(canvas, dwarf, platforms, keys, gravity);


  const arrowUpPressed = !!keys["ArrowUp"];


  // --- Tür überprüfen ---
  checkDoor(dwarf, door, arrowUpPressed);


  // --- Plattform-Kollision ---
  checkPlatformsCollision(dwarf, platforms, canvas);


  // --- Schlüssel ---
  drawKey(ctx, dwarf, key);


  // --- Covers ---
  if (Array.isArray(covers)) {
    drawCovers(ctx, dwarf, covers);
  }


  // --- Monster ---
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
  if (checkMonsterCollision(dwarf, monster)) {

    dwarf.dead = true;

    dwarf.vx = 0;
    dwarf.vy = 0;
  }


  // --- Tür zeichnen ---
  drawDoor(ctx, door);


  // --- Zwerg zeichnen ---
  drawDwarf(ctx, dwarf);


  // --- Textanzeigen ---
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


  // --- Level abschließen ---
  playerMoveOn(
    dwarf,
    door,
    arrowUpPressed
  );

}