
export function textZeigen(ctx, text, x, y, colour = "white", lineHeight = 27){
  
  ctx.fillStyle = colour;
  ctx.font = "20px Arial";

  const lines = text.split("\n");
  lines.forEach((line, i) => {
    ctx.fillText(line, x, y + i * lineHeight);
  });
}
export function update(canvas, dwarf, platforms, keys, gravity){
  if(dwarf.disappear){
  return;
  }
  dwarf.vx = 0;

  if(keys["ArrowLeft"] || keys["KeyA"]){
    dwarf.vx = -dwarf.speed;
    dwarf.vy += 1;
    dwarf.direction = -1;
  }



  if(keys["ArrowRight"] || keys["KeyD"]){
    dwarf.vx = dwarf.speed;
    dwarf.vy += 1;
    dwarf.direction = 1;
  }


  if(keys["Space"] && dwarf.onGround){
    dwarf.vy = -dwarf.jump*2;
    dwarf.onGround = false;
  }

  if(dwarf.vy > 0){
    dwarf.vy += gravity;
  }else{
    dwarf.vy += gravity;
  }


  dwarf.x += dwarf.vx;
  dwarf.y += dwarf.vy;

  // --- Begrenzung im horizontalen Bereich ---
  const minX = 50;             // linke Grenze
  const maxX = canvas.width - 50 - dwarf.w; // rechte Grenze
  if(dwarf.x < minX) dwarf.x = minX;
  if(dwarf.x > maxX) dwarf.x = maxX;

  dwarf.onGround = false;




  dwarf.frame+= 3.5;

}

// Zeichnet den Zwerg korrekt mit Füßen unten
export function drawDwarf(ctx, dwarf){
  const p = 4; // Pixelgröße
  const drawX = dwarf.direction === -1 ? dwarf.x + dwarf.w : dwarf.x;

  ctx.save();
  ctx.translate(dwarf.direction === -1 ? drawX : dwarf.x, dwarf.y);
  if(dwarf.direction === -1){
      ctx.scale(-1,1);
  }

  // --- Animation Beine: Rotation ---
  let legAmplitude = 0.5; // Maximalwinkel in Radiant (~30°)
  let legSpeed = 0.3;

  let leftLegAngle = 0;
  let rightLegAngle = 0;

  if (!dwarf.onGround) {
      // Springen, beine auseinander 
      leftLegAngle = 0.3;
      rightLegAngle = -0.3;
  } else if (dwarf.vx !== 0) {
      // Laufen: Beine schwingen abwechselnd
      leftLegAngle = Math.sin(dwarf.frame * legSpeed) * legAmplitude;
      rightLegAngle = Math.sin(dwarf.frame * legSpeed + Math.PI) * legAmplitude;
  } else {
      // Stehen: Beine gerade
      leftLegAngle = 0;
      rightLegAngle = 0;
  }

  // --- Beine zeichnen mit Rotation ---
  ctx.fillStyle = "#7e5c01";

  // linker Hüftpunkt relativ zum Körper
  ctx.save();
  ctx.translate(0, 10.5*p);       // Hüfte links
  ctx.rotate(leftLegAngle);     // Bein um Hüfte rotieren
  ctx.fillRect(0, -p, 2*p, 3*p);
  ctx.restore();

  // rechter Hüftpunkt relativ zum Körper
  ctx.save();
  ctx.translate(2*p, 10.5*p);     // Hüfte rechts
  ctx.rotate(rightLegAngle);    // Bein um Hüfte rotieren
  ctx.fillRect(0, -p, 2*p, 3*p);
  ctx.restore();

  // --- Körper ---
  ctx.fillStyle = "#aa6d03";
  ctx.fillRect(0,6*p,4*p,5*p)
  ctx.beginPath();
  ctx.moveTo(2*p, 2*p);
  ctx.lineTo(-0.5*p, 10.5*p);
  ctx.lineTo(4.5*p, 10.5*p);
  ctx.closePath();
  ctx.fill();


  // --- Arme ---
  ctx.save();
  ctx.fillStyle = "#c68503";
  ctx.translate(2*p, 7*p);       // Hüfte links
  ctx.rotate(leftLegAngle);     // Bein um Hüfte rotieren
  ctx.fillRect(-0.75*p, 0*p, 1.5*p, 3*p);
  ctx.restore();
  

  // --- Kopf ---
  ctx.fillStyle = "#f8b654";
  ctx.fillRect(0,2*p,4*p,4*p);

  // --- Hut ---
  ctx.fillStyle = "#8b5d01";
  ctx.beginPath();
  ctx.moveTo(-0.5*p, 3*p);
  ctx.lineTo(4.5*p, 3*p);
  ctx.lineTo(1*p, -2*p);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(3, 1*p);
  ctx.lineTo(1*p, -2*p);
  ctx.lineTo(-1*p, -3*p);
  ctx.closePath();
  ctx.fill();

  // Auge 
  ctx.fillStyle = "#000";
  ctx.fillRect(2.5*p,3.5*p,p,0.5*p)

  // Nase 
  ctx.fillStyle = "#a86303"; 
  ctx.beginPath(); 
  ctx.moveTo(4*p,2*p); 
  ctx.lineTo(4*p, 4.5*p); 
  ctx.lineTo(5*p, 4.5*p); 
  ctx.closePath(); 
  ctx.fill();

  //Bart 
  ctx.fillStyle = "#983500"
  ctx.beginPath(); 
  ctx.moveTo(4*p,4.5*p);
  ctx.lineTo(1*p, 5*p); 
  ctx.lineTo(5*p, 8*p); 
  ctx.closePath(); 
  ctx.fill()

  ctx.restore();
}

export function drawKing(ctx, king){

  const p = 4;
  ctx.save();
  ctx.translate(king.x, king.y);

  // Körper
  ctx.fillStyle = "#aa0303";
  ctx.fillRect(0,2*p,4*p,10.5*p);


  ctx.fillStyle = "#aa0303";
  ctx.beginPath();
  ctx.moveTo(2*p,-2*p);
  ctx.lineTo(3*p,12.5*p);
  ctx.lineTo(6.5*p,12.5*p);
  ctx.closePath();
  ctx.fill();

  // Kopf
  ctx.fillStyle = "#f8b654";
  ctx.fillRect(0,-2*p,4*p,4*p);

  // Krone
  ctx.fillStyle = "gold";
  ctx.beginPath();
  ctx.moveTo(-0.5*p,-2*p);
  ctx.lineTo(1*p,-6*p);
  ctx.lineTo(2*p,-3*p);
  ctx.lineTo(3*p,-6*p);
  ctx.lineTo(4.5*p,-2*p);
  ctx.closePath();
  ctx.fill();

  //Bart 
  ctx.fillStyle = "#ffffff"
  ctx.beginPath(); 
  ctx.moveTo(3*p,0.5*p);
  ctx.lineTo(0*p, 1*p); 
  ctx.lineTo(-0.5*p, 8*p); 
  ctx.closePath(); 
  ctx.fill()

  // Auge 
  ctx.fillStyle = "#000";
  ctx.fillRect(0.3*p,-0.5*p,p,0.5*p)

  // Nase 
  ctx.fillStyle = "#a86303"; 
  ctx.beginPath(); 
  ctx.moveTo(0*p,-1*p); 
  ctx.lineTo(0*p, 1.5*p); 
  ctx.lineTo(-1*p, 1.5*p); 
  ctx.closePath(); 
  ctx.fill();

  ctx.restore();
}


export function drawKey(ctx, dwarf, key){
  if (!key) return;
  const p = 4;
  ctx.save();
  ctx.translate(key.x, key.y);

  // schlüssl
  ctx.fillStyle = "gold";
  ctx.fillRect(0,0,1*p,6*p);
  ctx.fillRect(-1*p,0,3*p,1*p);
  ctx.fillRect(-1*p,-12,3*p,1*p);
  ctx.fillRect(-2*p,1*p,1*p,-4*p);
  ctx.fillRect(2*p,1*p,1*p,-4*p);
  ctx.fillRect(0,5*p,2*p,3*p);


  ctx.restore();

  if (
    dwarf.x < key.x + 4*p &&
    dwarf.x + dwarf.w > key.x &&
    dwarf.y < key.y + 6*p &&
    dwarf.y + dwarf.h > key.y
  ){
    dwarf.schluessel++;
    key.x = -100; key.y = 0; // Schlüssel verschwindet
    console.log("Du hast einen Schlüssel eingesammelt");

  }

  if (!dwarf.isLoadingNextLevel && !dwarf.finalMessage){
      dwarf.nachricht = {
      n: "Schlüssel: " + dwarf.schluessel,
      x: dwarf.nachricht.x,
      y: dwarf.nachricht.y,
      c: dwarf.nachricht.c
    };
  }

}


export function drawDoor(ctx, door){
  let p = 4;
  ctx.fillStyle = door.c;
  ctx.fillRect(door.x,door.y,door.w,door.h);
  ctx.fillStyle = "gold";
  ctx.fillRect(door.x + 1*p,door.y + 6*p,2*p,2*p);

  ctx.fillStyle = door.o;
  if(door.doorOpen){
    
    ctx.fillRect(door.x, door.y, door.w, door.h);
    ctx.fillStyle = door.c;
    ctx.fillRect(door.x + door.w, door.y, door.w, door.h);
  }
}
// Plattformen/Hügel zeichnen 
export function drawPlatforms(ctx, platforms){

  platforms.forEach(p => {

    const angle = p.angle || 0;

    const cx = p.x + p.w/2;
    const cy = p.y + p.h/2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.fillStyle = p.c;

    if(p.type === "hill"){

      ctx.beginPath();

      // links unten
      ctx.moveTo(-p.w/2, p.h/2);

      ctx.quadraticCurveTo(
        0,          // Mitte
        -p.h * 1.5, // Hügelhöhe
        p.w/2,
        p.h/2
      );

      ctx.lineTo(-p.w/2, p.h/2);
      ctx.closePath();
      ctx.fill();

    } else {

      ctx.fillRect(
        -p.w/2,
        -p.h/2,
        p.w,
        p.h
      );

    }

    ctx.restore();

  });

}
export function drawBackgroundShapes(ctx, shapes){
  if (!Array.isArray(shapes)) return; 

  shapes.forEach(p => {

    const angle = p.angle || 0;

    const cx = p.x + p.w/2;
    const cy = p.y + p.h/2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    ctx.fillStyle = p.c;

    if(p.type === "hill"){

      ctx.beginPath();

      // links unten
      ctx.moveTo(-p.w/2, p.h/2);

      ctx.quadraticCurveTo(
        0,          // Mitte
        -p.h * 1.5, // Hügelhöhe
        p.w/2,
        p.h/2
      );

      ctx.lineTo(-p.w/2, p.h/2);
      ctx.closePath();
      ctx.fill();

    } else {

      ctx.fillRect(
        -p.w/2,
        -p.h/2,
        p.w,
        p.h
      );

    }

    ctx.restore();

  });

}
export function rotatePoint(px, py, cx, cy, angle){
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const dx = px - cx;
    const dy = py - cy;

    return {
        x: dx * cos - dy * sin + cx,
        y: dx * sin + dy * cos + cy
    };
}

export function checkPlatformsCollision(dwarf, platforms, canvas){
    dwarf.onGround = false;

    platforms.forEach(p => {
        if(!p) return;

        // ---------------- BLOCK ----------------
        if(p.type === "block"){


        const angle = p.angle || 0;
        const cx = p.x + p.w / 2;
        const cy = p.y + p.h / 2;

        // rotierte Block-Ecken
        const leftTop = rotatePoint(p.x, p.y, cx, cy, angle);
        const rightTop = rotatePoint(p.x + p.w, p.y, cx, cy, angle);
        const rightBottom = rotatePoint(p.x + p.w, p.y + p.h, cx, cy, angle);
        const leftBottom = rotatePoint(p.x, p.y + p.h, cx, cy, angle);

        // Fußpunkte Zwerg
        const dwarfFootX = dwarf.x + dwarf.w; 
        const dwarfFootY = dwarf.y + dwarf.h;
        const previousFootY = dwarfFootY - dwarf.vy;

        // --- Obere Plattformkante (wie bei Plattform) ---
        if (dwarfFootX >= Math.min(leftTop.x, rightTop.x) && dwarfFootX <= Math.max(leftTop.x, rightTop.x)) {
            const platformY = leftTop.y + (dwarfFootX - leftTop.x) * (rightTop.y - leftTop.y) / (rightTop.x - leftTop.x);

            // Landung von oben
            if (dwarf.vy >= 0 && previousFootY <= platformY && dwarfFootY >= platformY) {
                dwarf.y = platformY - dwarf.h;
                dwarf.vy = 0;
                dwarf.onGround = true;
            }

            // Hochlaufen: auf Block halten
            if (dwarf.vy < 0 && dwarfFootY >= platformY && previousFootY <= platformY + 5) {
                dwarf.y = platformY - dwarf.h;
                dwarf.vy = 0;
                dwarf.onGround = true;
            }
        }

        // --- Untere Kante: abprallen ---
        if (dwarfFootX >= Math.min(leftBottom.x, rightBottom.x) && dwarfFootX <= Math.max(leftBottom.x, rightBottom.x)) {
            const platformY = leftBottom.y + (dwarfFootX - leftBottom.x) * (rightBottom.y - leftBottom.y) / (rightBottom.x - leftBottom.x);
            if (dwarf.vy < 0 && dwarf.y <= platformY && dwarfFootY >= platformY - 5) {
                dwarf.vy = dwarf.speed; // zurückstoßen
            }
        }

    // --- Seitliche Kollisionen ---
    const dwarfTopY = dwarf.y;
    const dwarfLeftX = dwarf.x;
    const dwarfRightX = dwarf.x + dwarf.w;

    // linke Seite des Blocks
    if (dwarfRightX >= leftTop.x && dwarfLeftX < leftTop.x && dwarfTopY + dwarf.h > leftTop.y && dwarfTopY < leftBottom.y) {
        dwarf.x = leftTop.x - dwarf.w;
        dwarf.vx = 0;
    }

    // rechte Seite des Blocks
    if (dwarfLeftX <= rightTop.x && dwarfRightX > rightTop.x && dwarfTopY + dwarf.h > rightTop.y && dwarfTopY < rightBottom.y) {
        dwarf.x = rightTop.x;
        dwarf.vx = 0;
    }

    return;
}


// ---------------- PLATFORM (rotierbar, stabil) ----------------
if(p.type !== "block" && p.type !== "hill") {
    const angle = p.angle || 0;
    const cx = p.x + p.w / 2;
    const cy = p.y + p.h / 2;

    // obere Ecken der Plattform
    const leftTop = rotatePoint(p.x, p.y, cx, cy, angle);
    const rightTop = rotatePoint(p.x + p.w, p.y, cx, cy, angle);

    const dwarfFootX = dwarf.x + dwarf.w; // rechter Fuß
    const dwarfFootY = dwarf.y + dwarf.h;

    // horizontal prüfen
    if(dwarfFootX >= Math.min(leftTop.x, rightTop.x) && dwarfFootX <= Math.max(leftTop.x, rightTop.x) && dwarf.vy>0) {
        // Plattformlinie interpolieren
        const platformY = leftTop.y + (dwarfFootX - leftTop.x) * (rightTop.y - leftTop.y) / (rightTop.x - leftTop.x);

        const slope = Math.abs(rightTop.y - leftTop.y) / (rightTop.x - leftTop.x);
        const slopePercent = Math.min(slope / 0.5 * 100, 100);

        const tolerance = 10;  // ↑ vergrößert, damit er etwas „reinrutschen“ darf

        // Zwerg "klebt" auf Plattform, solange er horizontal drüber steht
        if(dwarfFootY >= platformY - tolerance && dwarfFootY <= platformY + 40) {  // obere Grenze unverändert
            // Wenn zu steil, Vy blockieren
            if(slopePercent > 70) {
                dwarf.y = platformY - dwarf.h;
                dwarf.vy = 0;
                dwarf.onGround = true;
            } else {
                // sanft auf Linie setzen, auch beim Hochlaufen
                dwarf.y = Math.min(dwarf.y, platformY - dwarf.h ); // ↑ leicht reinrutschen lassen
                if(dwarf.vy >= 0) dwarf.vy = 0; // nur Vy stoppen, wenn fällt
                dwarf.onGround = true;
            }
        }
    }
}


        // ---------------- HILL ----------------
        if(p.type === "hill"){
            const cx = p.x + p.w / 2; // Hügel-Mittelpunkt X
            const cy = p.y + p.h;     // Hügel-Basis Y
            const a = p.w / 2;        // Halbe Breite
            const b = p.h;            // Höhe des Hügels

            const footPoints = [
                dwarf.x,
                dwarf.x + dwarf.w / 2,
                dwarf.x + dwarf.w
            ];

            let maxHillY = -Infinity;

            footPoints.forEach(px => {
                const dx = px - cx;
                if(Math.abs(dx) <= a){
                    const hillY = cy - b * Math.sqrt(1 - (dx*dx)/(a*a));
                    if(hillY > maxHillY) maxHillY = hillY;
                }
            });

            // Neue Bedingung: nur Kontakt, wenn dwarf.y + dwarf.h <= cy
            if(maxHillY !== -Infinity && 
              dwarf.y + dwarf.h >= maxHillY - 2 && 
              dwarf.y + dwarf.h <= cy && // <-- hier die obere Grenze
              dwarf.vy >= 0){
                dwarf.y = maxHillY - dwarf.h;
                dwarf.vy = 0;
                dwarf.onGround = true;
            }
        }
    });

    // Boden
    if(dwarf.y + dwarf.h > canvas.height){
        dwarf.y = canvas.height - dwarf.h;
        dwarf.vy = 0;
        dwarf.onGround = true;
    }
}

export function drawBubbles(ctx, bubbles){

  bubbles.forEach(b => {

    const topX = b.x + b.w/2;
    const topY = b.y;

    const rightX = b.x + b.w;
    const rightY = b.y + b.h/2;

    const bottomX = b.x + b.w/2;
    const bottomY = b.y + b.h;

    const leftX = b.x;
    const leftY = b.y + b.h/2;

    ctx.fillStyle = b.c;
    ctx.beginPath();

    // oben starten
    ctx.moveTo(topX, topY);

    // oben → rechts
    ctx.quadraticCurveTo(b.x + b.w, b.y, rightX, rightY);

    // rechts → unten
    ctx.quadraticCurveTo(b.x + b.w, b.y + b.h, bottomX, bottomY);

    // unten → links
    ctx.quadraticCurveTo(b.x, b.y + b.h, leftX, leftY);

    // links → oben
    ctx.quadraticCurveTo(b.x, b.y, topX, topY);

    ctx.closePath();
    ctx.fill();

  });

}

export function checkDoor(dwarf, door,arrowUpPressed){
  if (
    dwarf.x < door.x + door.w &&
    dwarf.x + dwarf.w > door.x &&
    dwarf.y < door.y + door.h &&
    dwarf.y + dwarf.h > door.y &&
    !dwarf.MoveOn
  ){
    if(dwarf.schluessel > 0 ){
      dwarf.nachricht3 = {n:"Du hast die Tür geöffnet!",x:dwarf.nachricht3.x,y:dwarf.nachricht3.y,c:dwarf.nachricht3.c};
      door.doorOpen = true

    } else if(arrowUpPressed){
      dwarf.nachricht4 = {n:"Du brauchst\n einen\n Schlüssel,\n um die Tür\n zu öffnen.",x:(door.x - door.w),y: door.y - 100 ,c:dwarf.nachricht4.c};
    }
  }

}

export function playerMoveOn(dwarf, door, arrowUpPressed){
  if(dwarf.x < door.x + door.w &&
  dwarf.x + dwarf.w > door.x &&
  dwarf.y < door.y + door.h &&
  dwarf.y + dwarf.h > door.y &&
  door.doorOpen === true && 
  arrowUpPressed){
    dwarf.MoveOn = true;
    dwarf.nachricht3 = {n:"Level abgeschlossen!",x:dwarf.nachricht3.x,y:dwarf.nachricht3.y,c:dwarf.nachricht3.c};
    dwarf.x = -100;
    dwarf.y = -100;
    dwarf.vy = 0;
    dwarf.disappear = true;
    dwarf.onGround = true;
    // Tür wieder zu
    door.doorOpen = false;
    // Taste nicht mehr gedrückt
 
    dwarf.nachrichtBubble1 = {n:"",x:170,y:90};
    dwarf.nachrichtBubble2 = {n:dwarf.bubble2,x: dwarf.nachrichtBubble2.x,y:dwarf.nachrichtBubble2.y};

  }



}

export function drawCarriage(ctx, carriage, canvas) {
    if (!carriage) return;

    const { x, y, width, height, wheelAngle } = carriage;

    // --- Fahrgestell / Unterkörper ---
    const underHeight = height * 0.4;
    ctx.fillStyle = "#ffc115";
    ctx.fillRect(x, y + height - underHeight, width, underHeight);

    // --- Räder ---
    const wheelRadius = 25;
    const wheelY = y + height; 
    const wheelCenters = [x + 40, x + width - 40];

    wheelCenters.forEach(cx => {
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(cx, wheelY, wheelRadius, 0, Math.PI * 2);
        ctx.fill();

        // Speichen
        ctx.strokeStyle = "#DAA520";
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            const angle = wheelAngle +i * Math.PI / 4;
            const xEnd = cx + wheelRadius * Math.cos(angle);
            const yEnd = wheelY + wheelRadius * Math.sin(angle);
            ctx.beginPath();
            ctx.moveTo(cx, wheelY);
            ctx.lineTo(xEnd, yEnd);
            ctx.stroke();
        }

        // Radnabe
        ctx.fillStyle = "#a0942d";
        ctx.beginPath();
        ctx.arc(cx, wheelY, 6, 0, 2 * Math.PI);
        ctx.fill();
    });

    // --- Kabine ---
    const cabinWidth = width * 0.6;
    const cabinHeight = height * 0.6;
    const cabinX = x + width - cabinWidth;
    const cabinY = y + height - underHeight - cabinHeight;

    ctx.fillStyle = "#ffc115";
    ctx.fillRect(cabinX, cabinY, cabinWidth, cabinHeight);

    // Dach
    ctx.fillStyle = "#ffd500";
    ctx.beginPath();
    ctx.moveTo(cabinX, cabinY);
    ctx.lineTo(cabinX + cabinWidth / 2, cabinY - cabinHeight * 0.4);
    ctx.lineTo(cabinX + cabinWidth, cabinY);
    ctx.closePath();
    ctx.fill();

    // Fenster links (für König sichtbar)
    const leftWindowX = cabinX + cabinWidth * 0.2;
    const windowY = cabinY + cabinHeight * 0.1;
    const windowWidth = cabinWidth * 0.6;
    const windowHeight = cabinHeight * 0.7;

    ctx.fillStyle="#d4ad00";
    ctx.fillRect(leftWindowX, windowY, windowWidth, windowHeight);


    // --- Bewegung nach links, Stop in der Mitte ---
    const carriageCenter = x + width / 2;
    if (carriageCenter+10 > canvas.width / 2) {
        carriage.x -= carriage.speed;
        carriage.wheelAngle -= 0.05*carriage.speed;
    } else {
        carriage.speed = 0; // Kutsche stoppt
    }

    return { leftWindowX, windowY, windowWidth, windowHeight };
}

export function drawKingOnCarriage(ctx, king, carriage, windows) {
    if (!king || !carriage || !windows) return;

    // König nur zeichnen, wenn Kutsche fährt
    if (carriage.speed <= 0) return;

    const { leftWindowX, windowY, windowWidth, windowHeight } = windows;

    ctx.save();
    ctx.beginPath();
    ctx.rect(leftWindowX, windowY, windowWidth, windowHeight);
    ctx.clip();

    const kingSize = 16;
    const offsetY = 6;
    const kingX = leftWindowX + (windowWidth - kingSize) / 2;
    const kingY = windowY + (windowHeight - kingSize) / 2 + offsetY;

    drawKing(ctx, { ...king, x: kingX, y: kingY, w: kingSize, h: kingSize });

    ctx.restore();
}
export function drawKingNextToCarriage(ctx, king, carriage) {
    if (!king || !carriage) return;

    ctx.save();

    // König etwas neben die Kutsche setzen
    const kingX = carriage.x+10; // rechts von der Kutsche
    const kingY = carriage.y +10; // Boden ausrichten

    const kingBody = { ...king, x: kingX, y: kingY, w: 16, h: 16 };
    drawKing(ctx, kingBody);

    ctx.restore();
}


// Hilfsfunktion: Prüft, ob ein Punkt innerhalb eines Dreiecks liegt
function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
    const areaOrig = Math.abs((x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))/2);
    const area1 = Math.abs((px*(y2-y3) + x2*(y3-py) + x3*(py-y2))/2);
    const area2 = Math.abs((x1*(py-y3) + px*(y3-y1) + x3*(y1-py))/2);
    const area3 = Math.abs((x1*(y2-py) + x2*(py-y1) + px*(y1-y2))/2);
    return (area1 + area2 + area3) <= areaOrig + 0.1; // kleine Toleranz
}

export function drawCovers(ctx, dwarf, covers) {
    for (let i = covers.length - 1; i >= 0; i--) {
        const cover = covers[i];

        if (cover.type === "rect") {
            ctx.fillStyle = cover.color;
            ctx.fillRect(cover.x, cover.y, cover.w, cover.h);

            if (dwarf.x + dwarf.w > cover.x &&
                dwarf.x < cover.x + cover.w &&
                dwarf.y + dwarf.h > cover.y &&
                dwarf.y < cover.y + cover.h) {

                // Cover entfernen und nach 1 Sekunde wieder hinzufügen
                const removedCover = covers.splice(i, 1)[0];
                setTimeout(() => {
                    covers.push(removedCover);
                }, 1000);
            }
        } 
        else if (cover.type === "triangle") {
            ctx.fillStyle = cover.color;
            ctx.beginPath();
            ctx.moveTo(cover.x1, cover.y1);
            ctx.lineTo(cover.x2, cover.y2);
            ctx.lineTo(cover.x3, cover.y3);
            ctx.closePath();
            ctx.fill();

            if (pointInTriangle(dwarf.x, dwarf.y + dwarf.h, cover.x1, cover.y1, cover.x2, cover.y2, cover.x3, cover.y3) ||
                pointInTriangle(dwarf.x + dwarf.w, dwarf.y + dwarf.h, cover.x1, cover.y1, cover.x2, cover.y2, cover.x3, cover.y3)) {

                // Cover entfernen und nach 1 Sekunde wieder hinzufügen
                const removedCover = covers.splice(i, 1)[0];
                setTimeout(() => {
                    covers.push(removedCover);
                }, 1000);
            }
        }
    }
}

