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
  drawForegroundShapes
} from "./functions.js";




export const background = "#0080ff";

export const door = {x:645, y:300, w:30, h:50, c:"#6e4600", o:"#ea9a4a"};



export const key = {x:270, y: 310};
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
  
  nachricht3: {n:"",x:300,y:380,c:"white"},
  nachricht4: {n:"",x:300,y:380,c:"white"},
  isLoadingNextLevel: false,
  finalMessage: false,
  useOtherShape: true,
  m: false
};


export const platforms = [ 


  {x:0,y: canvas.height - 50,w:canvas.width,h:50,c:"#0b3400", type:"platform",angle:0}
];





export const bubbles = [ 
   ];




export const backgroundshapes = [ 







];
export const foregroundshapes = [


]
export const covers = [

];

export function loop(ctx, canvas, dwarf, platforms, bubbles, door, king, key, keys, gravity, background,backgroundshapes, foregroundshapes, carriage,covers) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    update(canvas, dwarf, platforms, keys, gravity);
    
    checkDoor(dwarf, door,keys["ArrowUp"]);
    drawBackgroundShapes(ctx, backgroundshapes);
    drawPlatforms(ctx, platforms);
    checkPlatformsCollision(dwarf, platforms, canvas);

    drawKey(ctx, dwarf, key);
    drawCovers(ctx, dwarf,covers);

    // --- Kutsche zeichnen und Fensterkoordinaten speichern ---
    const carriageWindows = drawCarriage(ctx, carriage, canvas);

    
    // König nur im Fenster anzeigen
    drawKingOnCarriage(ctx, king, carriage, carriageWindows);
    // Wenn die Kutsche fährt
    if (carriage.speed !== 0) {
        drawKingOnCarriage(ctx, king, dwarf, carriage, carriageWindows);
    } else {
        drawKingNextToCarriage(ctx, king, dwarf, carriage);
    }

    if(carriage.speed === 0 && dwarf.nachrichtBubble1){
      drawBubbles(ctx, bubbles);
      dwarf.m = true;
    }

    drawForegroundShapes(ctx,foregroundshapes);
    drawDoor(ctx, door);

    drawDwarf(ctx, dwarf);
  

    // Textanzeigen
    if (dwarf.nachricht) {textZeigen(ctx, dwarf.nachricht.n, dwarf.nachricht.x, dwarf.nachricht.y, dwarf.nachricht.c)};
    if (dwarf.finalMessage) {textZeigen(ctx, "Du hast alle\nLevels geschafft!", dwarf.nachricht.x, dwarf.nachricht.y, dwarf.nachricht.c)};
    if (dwarf.nachrichtBubble1 && dwarf.m) {
    textZeigen(ctx, dwarf.nachrichtBubble1.n, dwarf.nachrichtBubble1.x, dwarf.nachrichtBubble1.y, "black");

    // Nachricht nach 3 Sekunden verschwinden lassen
      setTimeout(() => {
          dwarf.nachrichtBubble1 = null;
          dwarf.m = false;
      }, 3000);
  }
    if (dwarf.nachrichtBubble2 && dwarf.m) {textZeigen(ctx, dwarf.nachrichtBubble2.n, dwarf.nachrichtBubble2.x, dwarf.nachrichtBubble2.y, "black")};
    if (dwarf.nachricht3) {textZeigen(ctx, dwarf.nachricht3.n, dwarf.nachricht3.x, dwarf.nachricht3.y, dwarf.nachricht3.c)};
    if (dwarf.nachricht4) {textZeigen(ctx, dwarf.nachricht4.n, dwarf.nachricht4.x, dwarf.nachricht4.y, dwarf.nachricht4.c)};
    
    playerMoveOn(dwarf, door, keys["ArrowUp"]);
};