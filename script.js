const messagesGrid = document.getElementById("messagesGrid");

async function loadMessages() {

  try {

    const response = await fetch("messages.json");

    if (!response.ok) {
      throw new Error("Could not load messages.");
    }

    const messages = await response.json();

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

function scrollToMessages() {

  document
    .getElementById("messages")
    .scrollIntoView({
      behavior: "smooth"
    });

}

loadMessages();
