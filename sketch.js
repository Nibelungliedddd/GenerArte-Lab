let velocidad, tamano, colorBase, complejidad, aleatoriedad;
let t = 0;

function setup() {
  let canvas = createCanvas(windowWidth * 0.66, windowHeight - 80);
  canvas.parent("canvas-container");
  noStroke();
  frameRate(60);
}

function draw() {
  background(10, 10, 10, 25);

  velocidad = parseFloat(document.getElementById("velocidad").value);
  tamano = parseFloat(document.getElementById("tamano").value);
  colorBase = document.getElementById("color").value;
  complejidad = parseInt(document.getElementById("complejidad").value);
  aleatoriedad = parseFloat(document.getElementById("aleatoriedad").value);

  let c = color(colorBase);

  for (let i = 0; i < complejidad; i++) {
    let x = noise(i * 0.01, t * 0.01) * width;
    let y = noise(i * 0.02 + aleatoriedad * 0.01, t * 0.01) * height;
    fill(red(c), green(c), blue(c), 180);
    ellipse(x, y, tamano, tamano);
  }

  t += velocidad * 0.01;
}

function windowResized() {
  resizeCanvas(windowWidth * 0.66, windowHeight - 80);
}

// --- MODO ALEATORIO INTELIGENTE ---
document.getElementById("aleatorioBtn").addEventListener("click", () => {
  // Generar parámetros coherentes
  document.getElementById("velocidad").value = random(1, 6).toFixed(1);
  document.getElementById("tamano").value = random(10, 60).toFixed(0);
  document.getElementById("complejidad").value = random(20, 90).toFixed(0);
  document.getElementById("aleatoriedad").value = random(20, 150).toFixed(0);

  // Generar color balanceado (tendencia suave)
  const hue = random(0, 360);
  const sat = random(40, 80);
  const light = random(50, 90);
  const hsl = `hsl(${hue}, ${sat}%, ${light}%)`;

  document.getElementById("color").value = rgbToHex(hslToRgb(hue / 360, sat / 100, light / 100));
});

// Conversión de HSL a HEX
function hslToRgb(h, s, l) {
  let r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [r * 255, g * 255, b * 255];
}

function rgbToHex(rgb) {
  return (
    "#" +
    rgb
      .map((v) => {
        const hex = Math.round(v).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      })
      .join("")
  );
}
