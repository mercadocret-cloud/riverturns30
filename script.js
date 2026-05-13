const messagesGrid = document.getElementById("messagesGrid");

/* BUTTON FUNCTIONS NEED TO BE GLOBAL */
window.scrollToMessages = function () {
  document.getElementById("messages").scrollIntoView({
    behavior: "smooth"
  });
};

window.changeSlide = function (direction) {
  showSlide(currentSlide + direction);
};

/* LOAD BIRTHDAY MESSAGES */

async function loadMessages() {
  try {
    const response = await fetch("messages.json?t=" + new Date().getTime());

    if (!response.ok) {
      throw new Error("Could not load messages.");
    }

    const messages = await response.json();

    messagesGrid.innerHTML = "";

    messages.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "message-card";
      card.style.animationDelay = `${index * 0.12}s`;

      card.innerHTML = `
        <h3>${item.name}</h3>

        <p class="river-word">
          I think River is <span>${item.riverIs}</span>.
        </p>

        <p>${item.message}</p>
      `;

      messagesGrid.appendChild(card);
    });
  } catch (error) {
    console.error(error);

    messagesGrid.innerHTML = `
      <p class="error-message">
        Messages could not be loaded right now.
      </p>
    `;
  }
}

/* RANDOM MEMORY SLIDESHOW */

const memoryImages = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg",
  "images/9.jpg",
  "images/10.jpg",
  "images/11.jpg",
  "images/12.jpg",
  "images/13.jpg",
  "images/14.jpg",
  "images/15.jpg",
  "images/16.jpg",
  "images/17.jpg",
  "images/18.jpg",
  "images/19.jpg",
  "images/20.jpg",
  "images/21.jpg",
  "images/22.jpg",
  "images/23.jpg",
  "images/24.jpg",
  "images/25.jpg",
  "images/26.jpg",
  "images/27.jpg",
  "images/28.jpg",
  "images/29.jpg"
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}

shuffleArray(memoryImages);

let currentSlide = 0;

const memorySlide = document.getElementById("memorySlide");
const slideDots = document.getElementById("slideDots");

function showSlide(index) {
  if (!memorySlide) return;

  currentSlide = (index + memoryImages.length) % memoryImages.length;

  memorySlide.style.opacity = 0;

  setTimeout(() => {
    memorySlide.src = memoryImages[currentSlide];
    memorySlide.style.opacity = 1;
  }, 180);

  document.querySelectorAll(".slide-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

/* CREATE DOTS ONLY IF SLIDESHOW EXISTS */

if (memorySlide && slideDots) {
  slideDots.innerHTML = "";

  memoryImages.forEach((image, index) => {
    const dot = document.createElement("div");
    dot.className = "slide-dot";
    dot.onclick = () => showSlide(index);
    slideDots.appendChild(dot);
  });

  showSlide(0);
}

loadMessages();
