const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");

const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");

let scale = 1;
let noClicks = 0;

const noMessages = [
    "Är du säker? 🤨",
    "Den känns lite feg…",
    "Ja blir större nu.",
    "Du gör det värre för dig själv 😅"
];

noBtn.addEventListener("click", () => {
    noClicks++;
    scale += 0.25;
    yesBtn.style.transform = `scale(${scale})`;

    noText.textContent = noMessages[Math.min(noClicks - 1, noMessages.length - 1)];
});

yesBtn.addEventListener("click", () => {
    startConfetti();

    section1.classList.add("hidden");

    setTimeout(() => {
        section1.style.display = "none";
        section2.classList.remove("hidden");
        section2.classList.add("active");
    }, 800);
});

/* KONFETTI */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 6 + 4,
            dx: (Math.random() - 0.5) * 4,
            dy: Math.random() * 4 + 2,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`
        });
    }

    requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });

    confetti = confetti.filter(p => p.y < canvas.height);

    if (confetti.length > 0) {
        requestAnimationFrame(updateConfetti);
    }
}
