const canvas = document.querySelector('#canvas');
const colorPicker = document.querySelector('#color-picker');
const saveBtn = document.querySelector('#save-btn');
const palette = document.querySelectorAll('.palette-color');
const randomizeBtn = document.querySelector('#randomize-btn');
const fillBtn = document.querySelector('#fill-btn');
let currentColor = '';
let paletteColors = ['#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#c0c0c0', '#800080'];

for (let i = 0; i < 32; i++) {
  for (let j = 0; j < 32; j++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    canvas.appendChild(pixel);
  }
}

let isDragging = false;

canvas.addEventListener('mousedown', () => {
  isDragging = true;
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
});

const pixels = document.querySelectorAll('.pixel');

pixels.forEach(pixel => {
  pixel.addEventListener('mousedown', () => {
    pixel.style.backgroundColor = colorPicker.value;
    isDragging = true;
  });

  pixel.addEventListener('mousemove', () => {
    if (isDragging) {
      pixel.style.backgroundColor = colorPicker.value;
    }
  });
});

function clearCanvas() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
      pixel.style.backgroundColor = '#fff';
    });
  }

  const clearBtn = document.querySelector('#clear-btn');

clearBtn.addEventListener('click', () => {
  clearCanvas('white');
});

  

colorPicker.addEventListener('change', () => {
    currentColor = colorPicker.value;
    document.querySelector('#color-picker').style.backgroundColor = currentColor;
  });
  

pixels.forEach(pixel => {
  pixel.addEventListener('mousedown', () => {
    pixel.style.backgroundColor = currentColor;
    isDragging = true;
  });

  pixel.addEventListener('mousemove', () => {
    if (isDragging) {
      pixel.style.backgroundColor = currentColor;
    }
  });
});

saveBtn.addEventListener('click', () => {
  html2canvas(canvas).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = imgData;
    link.click();
  });
});

palette.forEach((color, index) => {
  color.style.backgroundColor = paletteColors[index];
  color.addEventListener('click', () => {
    currentColor = paletteColors[index];
  });

  color.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    paletteColors[index] = currentColor;
    color.style.backgroundColor = currentColor;
  });
});

randomizeBtn.addEventListener('click', () => {
  pixels.forEach(pixel => {
    pixel.style.backgroundColor = generateRandomColor();
  });
});

fillBtn.addEventListener('click', () => {
  pixels.forEach(pixel => {
    pixel.style.backgroundColor = currentColor;
  });
});

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
