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
  playerMoveOn
} from "./functions.js";


// --- Kutsche erstellen für Level 1 ---
export const carriage = {
  x: 800,          // Start rechts außerhalb des Canvas
  y: 225,          // Vertikale Position passend zum Boden/Hügel
  width: 200,
  height: 100,
  wheelAngle: 0,
  speed: 4  
};
export const king = {x:300,y:200};


export const background = "#0080ff";

export const door = {x:645, y:150, w:30, h:50, c:"#6e4600", o:"#ea9a4a"};



export const key = {x:70, y: 85};
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
  useOtherShape: true,
  m: false
};


export const platforms = [ 

  {x:50,y:150,w:125,h:25,c:"#5b3d00", type:"platform",angle: -Math.PI/4},
  {x:100,y:100,w:25,h:125,c:"#5b3d00", type:"platform",angle: Math.PI/4},
  {x:50,y:125,w:50,h:50,c:"#5b3d00", type:"block",angle:0},
  {x:250,y:150,w:125,h:25,c:"#5b3d00", type:"platform",angle: -Math.PI/4},
  {x:300,y:100,w:25,h:125,c:"#5b3d00", type:"platform",angle: Math.PI/4},
  {x:250,y:75,w:50,h:100,c:"#5b3d00", type:"block",angle:0},
  {x:450,y:150,w:125,h:25,c:"#5b3d00", type:"platform",angle: -Math.PI/4},
  {x:500,y:100,w:25,h:125,c:"#5b3d00", type:"platform",angle: Math.PI/4},
  {x:450,y:75,w:50,h:100,c:"#5b3d00", type:"block",angle:0},


  {x:600,y:-200,w:120,h:500,c:"#997300", type:"platform",angle:0},
  {x:600,y:-200,w:10,h:400,c:"#5b3d00", type:"platform",angle:0},
  {x:710,y:-200,w:10,h:400,c:"#5b3d00", type:"platform",angle:0},
  {x:600,y:200,w:120,h:100,c:"#5b3d00", type:"platform",angle:0},


  {x:650,y:250,w:170,h:50,c:"#8d0303", type:"hill",angle:0},
  {x:480,y:250,w:170,h:60,c:"#8d0303", type:"hill",angle:0}, 
  {x:550,y:250,w:170,h:70,c:"#6a2000", type:"hill",angle:0},
  {x:0,y: canvas.height - 50,w:canvas.width,h:50,c:"#0b3400", type:"platform",angle:0},

];





export const bubbles = [ 
  {x:king.x - 150,y:king.y -130 ,w:300,h:100,c:"#ffffff"},
  {x:king.x - 15,y:king.y - 25,w:40,h:25,c:"#ffffff"}
   ];




export const shapes = [ 


  {x:50,y:125,w:50,h:275,c:"#5b3d00", type:"platform",angle:0},

  {x:250,y:75,w:50,h:275,c:"#5b3d00", type:"platform",angle:0},

  {x:450,y:75,w:50,h:275,c:"#5b3d00", type:"platform",angle:0},
  {x:600,y:200,w:120,h:150,c:"#5b3d00", type:"platform",angle:0},


  {x:225,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:275,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:325,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:375,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:425,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:475,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:175,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:125,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:75,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:25,y:290,w:20,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:540,y:290,w:40,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:615,y:290,w:40,h:60,c:"#ffffff", type:"platform",angle:0},
  {x:715,y:290,w:40,h:60,c:"#ffffff", type:"platform",angle:0},



  {x:450,y:275,w:70,h:50,c:"#b79d6d", type:"hill",angle:0},
  {x:400,y:275,w:70,h:60,c:"#ab8244", type:"hill",angle:0}, 
  {x:300,y:275,w:70,h:55,c:"#b8995f", type:"hill",angle:0},
  {x:350,y:275,w:70,h:50,c:"#b69d6e", type:"hill",angle:0},
  {x:150,y:275,w:70,h:50,c:"#c6a872", type:"hill",angle:0},
  {x:100,y:275,w:70,h:60,c:"#aa8041", type:"hill",angle:0}, 
  {x:50,y:275,w:70,h:55,c:"#b09156", type:"hill",angle:0},
  {x:0,y:275,w:70,h:50,c:"#ad9569", type:"hill",angle:0},
  {x:250,y:275,w:70,h:60,c:"#ad8242", type:"hill",angle:0}, 
  {x:200,y:275,w:70,h:55,c:"#b89960", type:"hill",angle:0},




];
export const covers = [
    // Tannenbaum 1
    { type: "triangle", x1: 75, y1: -50, x2: -35, y2: 150, x3: 185, y3: 150, color: "#033100" },
    { type: "triangle", x1: 75, y1: 0, x2: -35, y2: 200, x3: 185, y3: 200, color: "#033100" },
    { type: "triangle", x1: 75, y1: 50, x2: -35, y2: 250, x3: 185, y3: 250, color: "#033100" },


    // Tannenbaum 2
    { type: "triangle", x1: 275, y1: -50, x2: 165, y2: 150, x3: 385, y3: 150, color: "#033100" },
    { type: "triangle", x1: 275, y1: 0, x2: 165, y2: 200, x3: 385, y3: 200, color: "#033100" },
    { type: "triangle", x1: 275, y1: 50, x2: 165, y2: 250, x3: 385, y3: 250, color: "#033100" },


    // Tannenbaum 3
    { type: "triangle", x1: 475, y1: -50, x2: 365, y2: 150, x3: 585, y3: 150, color: "#033100" },
    { type: "triangle", x1: 475, y1: 0, x2: 365, y2: 200, x3: 585, y3: 200, color: "#033100" },
    { type: "triangle", x1: 475, y1: 50, x2: 365, y2: 250, x3: 585, y3: 250, color: "#033100" },

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

    // --- Kutsche zeichnen und Fensterkoordinaten speichern ---
    const carriageWindows = drawCarriage(ctx, carriage, canvas);


    // König nur im Fenster anzeigen
    drawKingOnCarriage(ctx, king, carriage, carriageWindows);
    // Wenn die Kutsche fährt
    if (carriage.speed !== 0) {
        drawKingOnCarriage(ctx, king, carriage, carriageWindows);
    } else {
        drawKingNextToCarriage(ctx, king, carriage);
    }

    if(carriage.speed === 0 && dwarf.nachrichtBubble1){
      drawBubbles(ctx, bubbles);
      dwarf.m = true;
    }
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