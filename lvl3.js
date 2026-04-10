

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



export const key = {x:520, y: 35};
// --- Level 1 Daten ---
export const dwarf = {
  x: 120,
  y: 200,
  w: 16,
  h: 50,
  vx: 0,
  vy: 0,
  speed: 7,
  jump: 15,
  direction: 1,
  onGround: false,
  frame: 0,
  schluessel: 0,
  MoveOn: false,
  disappear: false,
  nachricht: {n:"",x:30,y:40,c:"white"},
  nachrichtBubble1: {n:"'Oh du tapferer Zwerg,\n rette das Königreich\n vor den bösen Mächten'",x:king.x -110,y:king.y -100},
  nachrichtBubble2: {n:"",x:king.x -150,y:king.y -150},
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
  {x:50,y:75,w:50,h:100,c:"#5b3d00", type:"block",angle:0},
  {x:250,y:150,w:125,h:25,c:"#5b3d00", type:"platform",angle: -Math.PI/4},
  {x:300,y:100,w:25,h:125,c:"#5b3d00", type:"platform",angle: Math.PI/4},
  {x:250,y:75,w:50,h:100,c:"#5b3d00", type:"block",angle:0},
  {x:450,y:150,w:125,h:25,c:"#5b3d00", type:"platform",angle: -Math.PI/4},
  {x:500,y:100,w:25,h:125,c:"#5b3d00", type:"platform",angle: Math.PI/4},
  {x:450,y:75,w:50,h:100,c:"#5b3d00", type:"block",angle:0},


  {x:600,y:0,w:120,h:300,c:"#997300", type:"platform",angle:0},
  {x:600,y:0,w:10,h:200,c:"#5b3d00", type:"platform",angle:0},
  {x:710,y:0,w:10,h:200,c:"#5b3d00", type:"platform",angle:0},
  {x:600,y:200,w:120,h:150,c:"#5b3d00", type:"platform",angle:0},


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


  {x:50,y:75,w:50,h:275,c:"#5b3d00", type:"platform",angle:0},

  {x:250,y:75,w:50,h:275,c:"#5b3d00", type:"platform",angle:0},

  {x:450,y:75,w:50,h:275,c:"#5b3d00", type:"platform",angle:0},

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
// Array mit allen Formen
export const covers = [
    { type: "rect", x: 100, y: 200, w: 50, h: 50, color: "red" },
    { type: "triangle", x1: 200, y1: 200, x2: 250, y2: 200, x3: 225, y3: 150, color: "blue" }
];
