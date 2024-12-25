const crtGrid = document.getElementById("crt-grid");

const setupCRTGrid = () => {
  const cols = Math.floor(window.innerWidth / 20);
  const rows = Math.floor(window.innerHeight / 20);

  crtGrid.style.gridTemplateColumns = `repeat(${cols}, 20px)`;
  crtGrid.style.gridTemplateRows = `repeat(${rows}, 20px)`;

  crtGrid.textContent = "";

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const span = document.createElement("span");
      span.textContent = "•";
      crtGrid.appendChild(span);
    }
  }
};

const randomBlink = () => {
  const spans = crtGrid.querySelectorAll("span");
  spans.forEach((span) => {
    if (Math.random() < 0.08) {
      span.textContent = "*";
      setTimeout(() => {
        span.textContent = "•";
      }, 100);
    }
  });
};

const scanlineEffect = () => {
  const spans = crtGrid.querySelectorAll("span");
  const cols = Math.floor(window.innerWidth / 20);
  const rows = Math.floor(window.innerHeight / 20);
  let currentRow = 0;

  setInterval(() => {
    for (let i = 0; i < spans.length; i++) {
      const row = Math.floor(i / cols);
      spans[i].textContent = row === currentRow ? "-" : "•";
    }
    currentRow = (currentRow + 1) % rows;
  }, 100);
};

const toggleSubmenu = () => {
  const submenu = document.getElementById("fileMenu");
  submenu.style.display = submenu.style.display === "block" ? "none" : "block";
};

const snapToGrid = (value, gridSize) => Math.round(value / gridSize) * gridSize;

const spawnWindow = (type) => {
  const window = document.createElement("div");
  window.classList.add("window");
  window.style.top = `${snapToGrid(Math.random() * 50 + 50, 20)}px`;
  window.style.left = `${snapToGrid(Math.random() * 50 + 50, 20)}px`;
  window.style.width = "300px";
  window.style.height = "200px";

  const toolbar = document.createElement("div");
  toolbar.classList.add("toolbar");

  const title = document.createElement("span");
  title.textContent = type === "text" ? "Text Window" : "Image Window";

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-btn");
  closeButton.textContent = "X";
  closeButton.onclick = () => window.remove();

  toolbar.appendChild(title);
  toolbar.appendChild(closeButton);
  window.appendChild(toolbar);

  const content = document.createElement("div");
  content.classList.add("content");

  if (type === "text") {
    content.textContent =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  } else {
    const img = document.createElement("img");
    img.src = "tree.png";
    img.alt = "Placeholder Image";
    img.style.width = "100%";
    img.style.height = "100%";
    content.appendChild(img);
  }

  window.appendChild(content);
  document.body.appendChild(window);

  makeDraggable(window);
};

const makeDraggable = (window) => {
  const toolbar = window.querySelector(".toolbar");
  let isDragging = false;
  let offsetX, offsetY;

  toolbar.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - window.offsetLeft;
    offsetY = e.clientY - window.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const snappedLeft = snapToGrid(e.clientX - offsetX, 20);
      const snappedTop = snapToGrid(e.clientY - offsetY, 20);
      window.style.left = `${snappedLeft}px`;
      window.style.top = `${snappedTop}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
};

window.addEventListener("resize", setupCRTGrid);
setupCRTGrid();
setInterval(randomBlink, 200);
scanlineEffect();

// Initialize with one text window and one image window
spawnWindow("text");
spawnWindow("image");
