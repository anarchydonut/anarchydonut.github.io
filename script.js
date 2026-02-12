const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");

let typingInterval;
let noClicks = 0;

const messages = [
    "Är du säker? 🥺",
    "Tänk efter lite till 💭",
    "Jag bjuder på fika ☕",
    "Och kanske en kyss 😌",
    "Okej… jag ger mig 💔"
];

function typeWriter(text){
    clearInterval(typingInterval);
    noText.textContent = "";

    let i = 0;
    typingInterval = setInterval(() => {
        noText.textContent += text[i];
        i++;

        if(i >= text.length){
            clearInterval(typingInterval);
        }
    }, 35);
}

/* 🙈 No button flyr */
noBtn.addEventListener("click", () => {

    if(noClicks < messages.length){
        typeWriter(messages[noClicks]);
    }

    noClicks++;

    const x = Math.random() * 200 - 100;
    const y = Math.random() * 60 - 30;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

/* 💘 Yes button */
yesBtn.addEventListener("click", () => {

    typeWriter("YAAAY!! 💖✨");

    yesBtn.style.position = "fixed";
    yesBtn.style.inset = "0";
    yesBtn.style.width = "100vw";
    yesBtn.style.height = "100vh";
    yesBtn.style.fontSize = "40px";
    yesBtn.style.borderRadius = "0";
});

/* 💖 Floating hearts */
function createHeart(){
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💖";

    heart.style.right = "-20px";
    heart.style.bottom = "-20px";
    heart.style.animationDuration = (6 + Math.random() * 6) + "s";

    document.getElementById("hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 900);
