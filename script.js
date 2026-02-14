const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");
const hearts = document.getElementById("hearts");
const confetti = document.getElementById("confetti");
const pling = document.getElementById("pling");

const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");

let noClicks = 0;
let yesScale = 1;
let typing = false;

const messages = [
    "Är du säker? 🥺",
    "Men tänk så mysigt 💞",
    "Jag fixar snacks 😌",
    "Pretty please? 💖",
    "🏆 Achievement unlocked:",
    "Stubborn Level 5 😏"
];

function typeWriter(text) {
    if (typing) return;
    typing = true;

    noText.textContent = "";
    let i = 0;

    const interval = setInterval(() => {
        if (i < text.length) {
            noText.textContent += text[i];
            i++;
        } else {
            clearInterval(interval);
            typing = false;
        }
    }, 30);
}

function spawnHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💖";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = Math.random() * 100 + "vh";
    heart.style.animationDuration = (6 + Math.random() * 6) + "s";

    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
}

setInterval(spawnHeart, 1200);

function heartBurst() {
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "💖";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = Math.random() * 100 + "vh";
        heart.style.animationDuration = (2 + Math.random() * 2) + "s";

        hearts.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
}

function confettiBurst() {
    for (let i = 0; i < 120; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = "-10px";
        piece.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        piece.style.animationDuration = (2 + Math.random()) + "s";

        confetti.appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
    }
}

/* 🙈 NO CLICK */
noBtn.addEventListener("click", () => {

    noClicks++;

    if (noClicks <= 4) {
        typeWriter(messages[noClicks - 1]);
    }

    if (noClicks === 5) {
        typeWriter(messages[4]);
        setTimeout(() => typeWriter(messages[5]), 600);
    }

    if (noClicks > 5) {
        noBtn.classList.add("shake");
        yesBtn.classList.add("boost");

        heartBurst();

        setTimeout(() => {
            noBtn.classList.remove("shake");
        }, 400);

        typeWriter("Hmm… den verkar inte vilja säga nej längre 🙈");
    }

    yesScale += 0.12;
    yesBtn.style.transform = `scale(${yesScale})`;

    moveNoButton();
});

/* 💨 Keep NO on right side */
function moveNoButton() {
    const wrapper = document.querySelector(".button-wrapper");

    const halfWidth = wrapper.clientWidth / 2;
    const maxX = wrapper.clientWidth - noBtn.clientWidth;
    const maxY = wrapper.clientHeight - noBtn.clientHeight;

    const x = halfWidth + Math.random() * (maxX - halfWidth);
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

/* 💘 YES CLICK */
yesBtn.addEventListener("click", () => {

    pling.currentTime = 0;
    pling.play().catch(() => {});

    confettiBurst();
    heartBurst();

    yesBtn.classList.add("expand");

    section1.classList.remove("active");
    section1.classList.add("hidden");

    setTimeout(() => {
        section2.classList.remove("hidden");
        section2.classList.add("active");
    }, 600);
});
