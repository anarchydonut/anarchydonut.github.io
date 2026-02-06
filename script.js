const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const hero = document.getElementById("hero");
const hiddenSection = document.getElementById("hiddenSection");
const noMessage = document.getElementById("noMessage");

let scale = 1;
let noClicks = 0;

const messages = [
    "Är du säker? 😏",
    "Den blir större för varje nej...",
    "Du kan inte vinna detta",
    "Plzzzzzz... "
];

// Nej → Ja växer + text
noBtn.addEventListener("click", () => {
    scale += 0.25;
    yesBtn.style.transform = `scale(${scale})`;

    noClicks++;
    noMessage.textContent =
        messages[Math.min(noClicks - 1, messages.length - 1)];
    noMessage.classList.add("show");
});

// Ja → transition + konfetti
yesBtn.addEventListener("click", () => {
    hero.classList.remove("active");

    setTimeout(() => {
        hiddenSection.classList.add("active");
    }, 400);

    launchConfetti();
});

// Konfetti
function launchConfetti() {
    for (let i = 0; i < 120; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";

        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor = randomColor();
        confetti.style.animationDuration =
            2 + Math.random() * 3 + "s";

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

function randomColor() {
    const colors = ["#ff5252", "#ffeb3b", "#4caf50", "#2196f3", "#e040fb"];
    return colors[Math.floor(Math.random() * colors.length)];
}
