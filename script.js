
const messagesGrid = document.getElementById("messagesGrid");

/* SCROLL BUTTON */

window.scrollToMessages = function () {
  document.getElementById("messages").scrollIntoView({
    behavior: "smooth"
  });
};

/* LOAD BIRTHDAY MESSAGES */

async function loadMessages() {

  try {

    const response = await fetch(
      "messages.json?t=" + new Date().getTime()
    );

    if (!response.ok) {
      throw new Error("Could not load messages.");
    }

    const messages = await response.json();

    messagesGrid.innerHTML = "";

    messages.forEach((item, index) => {

      const card = document.createElement("div");

      card.className = "message-card";

      card.style.animationDelay =
        `${index * 0.12}s`;

      card.innerHTML = `
        <h3>${item.name}</h3>

        <p class="river-word">
          I think River is
          <span>${item.riverIs}</span>.
        </p>

        <p>${item.message}</p>
      `;

      messagesGrid.appendChild(card);

    });

  }

  catch (error) {

    console.error(error);

    messagesGrid.innerHTML = `
      <p class="error-message">
        Messages could not be loaded right now.
      </p>
    `;

  }

}

/* =========================
   RANDOM MEMORY SLIDESHOW
========================= */

/* HOW MANY PHOTOS EXIST */

const totalImages = 34;

/* AUTO GENERATE IMAGE ARRAY */

const memoryImages = [];

for (let i = 1; i <= totalImages; i++) {

  memoryImages.push(`images/${i}.jpg`);

}

/* SHUFFLE IMAGES */

function shuffleArray(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const randomIndex =
      Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] =
      [array[randomIndex], array[i]];

  }

}

shuffleArray(memoryImages);

/* SLIDESHOW VARIABLES */

let currentSlide = 0;

const memorySlide =
  document.getElementById("memorySlide");

const slideDots =
  document.getElementById("slideDots");

/* SHOW SLIDE */

function showSlide(index) {

  if (!memorySlide) return;

  currentSlide =
    (index + memoryImages.length)
    % memoryImages.length;

  memorySlide.style.opacity = 0;

  setTimeout(() => {

    memorySlide.src =
      memoryImages[currentSlide];

    memorySlide.style.opacity = 1;

  }, 180);

  document
    .querySelectorAll(".slide-dot")
    .forEach((dot, i) => {

      dot.classList.toggle(
        "active",
        i === currentSlide
      );

    });

}

/* NEXT/PREV BUTTONS */

window.changeSlide = function(direction) {

  showSlide(currentSlide + direction);

};

/* CREATE DOTS */

function createDots() {

  if (!slideDots) return;

  slideDots.innerHTML = "";

  memoryImages.forEach((image, index) => {

    const dot =
      document.createElement("div");

    dot.className = "slide-dot";

    dot.onclick = () =>
      showSlide(index);

    slideDots.appendChild(dot);

  });

}

/* START */

createDots();

showSlide(0);

loadMessages();
