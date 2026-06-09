import {
  update,
  checkDoor,
  drawBackgroundShapes,
  drawPlatforms,
  checkPlatformsCollision,
  drawKey,
  drawCovers,
  drawCarriage,
  drawKingOnCarriage,
  drawKingNextToCarriage,
  drawBubbles,
  drawDoor,
  drawDwarf,
  textZeigen,
  playerMoveOn,
  drawKing
} from "./functions.js";



export const king = {x:300,y:200};


export const background = "#002346";

export const door = {x:645, y:350, w:30, h:50, c:"#6e4600", o:"#ea9a4a"};



export const key = {x:70, y: 285};
// --- Level 1 Daten ---
export const dwarf = {
  x: 120,
  y: 200,
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
  nachricht: {n:"",x:30,y:40,c:"white"},
  nachrichtBubble1: {n:"'Oh du tapferer Zwerg,\n rette das Königreich\n vor den bösen Mächten'",x:king.x -110,y:king.y -100},
  nachrichtBubble2: {n:"",x:king.x -110,y:king.y -100},
  bubble2: "So mögen die Schlüssel\n dich leiten",

  nachricht3: {n:"",x:300,y:380,c:"white"},
  nachricht4: {n:"",x:300,y:380,c:"white"},
  isLoadingNextLevel: false,
  finalMessage: false,
};


export const platforms = [ 

  

];





export const bubbles = [ 
]



export const shapes = [ 





];
export const covers = [

];

export function loop(ctx, canvas, dwarf, platforms, bubbles, door, king, key, keys, gravity, background, shapes, carriage,covers) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    update(canvas, dwarf, platforms, keys, gravity);
    
    checkDoor(dwarf, door,keys["ArrowUp"]);
    drawBackgroundShapes(ctx, shapes);
    drawPlatforms(ctx, platforms);
    checkPlatformsCollision(dwarf, platforms, canvas);

    drawKey(ctx, dwarf, key);
    drawCovers(ctx, dwarf,covers);


    drawDoor(ctx, door);

    drawDwarf(ctx, dwarf);
  

    // Textanzeigen
    if (dwarf.nachricht) {textZeigen(ctx, dwarf.nachricht.n, dwarf.nachricht.x, dwarf.nachricht.y, dwarf.nachricht.c)};
    if (dwarf.finalMessage) {textZeigen(ctx, "Du hast alle\nLevels geschafft!", dwarf.nachricht.x, dwarf.nachricht.y, dwarf.nachricht.c)};
    if (dwarf.nachricht3) {textZeigen(ctx, dwarf.nachricht3.n, dwarf.nachricht3.x, dwarf.nachricht3.y, dwarf.nachricht3.c)};
    if (dwarf.nachricht4) {textZeigen(ctx, dwarf.nachricht4.n, dwarf.nachricht4.x, dwarf.nachricht4.y, dwarf.nachricht4.c)};
    playerMoveOn(dwarf, door, keys["ArrowUp"]);
};