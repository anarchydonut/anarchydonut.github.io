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

const messages = [
    "Är du säker? 🥺",
    "Men tänk så mysigt 💞",
    "Jag fixar snacks 😌",
    "Pretty please? 💖",
    "Okej… jag ger mig 💔"
];

function typeWriter(text){
    noText.textContent = "";
    let i = 0;

    const interval = setInterval(() => {
        if(i < text.length){
            noText.textContent += text[i];
            i++;
        } else clearInterval(interval);
    }, 32);
}

/* 💖 Floating hearts ambient */
function spawnHeart(){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "💖";

    heart.style.left = Math.random()*100 + "vw";
    heart.style.top = Math.random()*100 + "vh";
    heart.style.animationDuration = (6 + Math.random()*4) + "s";

    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}

setInterval(spawnHeart, 1200);

/* 💖 Heart rain – cinematic & spread */
function heartRain(){
    for(let i=0;i<40;i++){
        const heart = document.createElement("div");
        heart.className = "heart";
        heart.textContent = "💖";

        heart.style.left = Math.random()*100 + "vw";
        heart.style.top = "-30px";
        heart.style.fontSize = (18 + Math.random()*26) + "px";
        heart.style.animation = `confettiFall ${2.2 + Math.random()}s ease-out forwards`;

        hearts.appendChild(heart);
        setTimeout(() => heart.remove(), 2600);
    }
}

/* 🎉 Confetti – slower & full screen */
function confettiBurst(){
    for(let i=0;i<90;i++){
        const piece = document.createElement("div");
        piece.className = "confetti";

        piece.style.left = Math.random()*100 + "vw";
        piece.style.top = "-10px";
        piece.style.background = `hsl(${Math.random()*360},100%,70%)`;

        confetti.appendChild(piece);
        setTimeout(() => piece.remove(), 2600);
    }
}

/* 🙈 NO click */
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

/* 💘 YES click */
yesBtn.addEventListener("click", () => {

    pling.currentTime = 0;
    pling.play().catch(()=>{});

    confettiBurst();
    setTimeout(heartRain, 180);

    yesBtn.classList.add("expand");

    section1.classList.remove("active");
    section1.classList.add("hidden");

    setTimeout(() => {
        section2.classList.remove("hidden");
        section2.classList.add("active");
    }, 650);
});
