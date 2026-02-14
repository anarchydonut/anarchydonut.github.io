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
let typingInterval;   // ✅ glitch fix

const messages = [
    "Är du säker? 🥺",
    "Men tänk så mysigt 💞",
    "Jag fixar snacks 😌",
    "Pretty please? 💖",
    "Okej… jag ger mig 💔"
];

function typeWriter(text){
    clearInterval(typingInterval);   // ✅ stoppa gammal animation
    noText.textContent = "";

    let i = 0;
    typingInterval = setInterval(() => {
        if(i < text.length){
            noText.textContent += text[i++];
        } else {
            clearInterval(typingInterval);
        }
    }, 30);
}

/* 💖 Ambient hearts (diagonal drift) */
function spawnHeart(){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💖";

    heart.style.left = Math.random()*100 + "vw";
    heart.style.top = Math.random()*100 + "vh";
    heart.style.fontSize = (14 + Math.random()*22) + "px";
    heart.style.animationDuration = (6 + Math.random()*6) + "s";

    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
}

setInterval(spawnHeart, 900);

/* 🎉 Confetti */
function confettiBurst(){
    for(let i=0;i<120;i++){
        const piece = document.createElement("div");
        piece.className = "confetti";

        const size = 6 + Math.random()*10;

        piece.style.width = size + "px";
        piece.style.height = size + "px";
        piece.style.left = Math.random()*100 + "vw";
        piece.style.top = Math.random()*100 + "vh";

        piece.style.background = `hsl(${Math.random()*360},100%,70%)`;
        piece.style.animationDuration = (2.2 + Math.random()*1.6) + "s";

        confetti.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
    }
}

/* 💖 Heart rain */
function heartRain(){
    for(let i=0;i<45;i++){
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "💖";

        heart.style.left = Math.random()*100 + "vw";
        heart.style.top = "-40px";
        heart.style.fontSize = (18 + Math.random()*28) + "px";
        heart.style.animation = `confettiFall ${2.4 + Math.random()}s ease-out forwards`;

        hearts.appendChild(heart);
        setTimeout(() => heart.remove(), 2800);
    }
}

/* 🙈 NO */
noBtn.addEventListener("click", () => {

    if(noClicks < messages.length){
        typeWriter(messages[noClicks]);
    }

    noClicks++;

    yesScale += 0.12;
    yesBtn.style.transform = `scale(${yesScale})`;

    const wrapper = document.querySelector(".button-wrapper");
    const maxX = wrapper.clientWidth - noBtn.clientWidth;
    const maxY = wrapper.clientHeight - noBtn.clientHeight;

    noBtn.style.left = `${Math.random()*maxX}px`;
    noBtn.style.top = `${Math.random()*maxY}px`;
    noBtn.style.right = "auto";
});

/* 💘 YES */
yesBtn.addEventListener("click", () => {

    pling.currentTime = 0;
    pling.play().catch(()=>{});

    confettiBurst();
    setTimeout(heartRain, 150);

    yesBtn.classList.add("expand");

    section1.classList.remove("active");
    section1.classList.add("hidden");

    setTimeout(() => {
        section2.classList.remove("hidden");
        section2.classList.add("active");
    }, 650);
});
