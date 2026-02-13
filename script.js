const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");

let noClicks = 0;

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
        noText.textContent += text[i];
        i++;
        if(i >= text.length) clearInterval(interval);
    }, 30);
}

/* 🙈 NO BUTTON FLYR */
noBtn.addEventListener("click", () => {

    if(noClicks < messages.length){
        typeWriter(messages[noClicks]);
    }

    noClicks++;

    const wrapper = document.querySelector(".button-wrapper");
    const maxX = wrapper.clientWidth - noBtn.clientWidth;
    const maxY = wrapper.clientHeight - noBtn.clientHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

/* 💘 YES BUTTON EXPANDS */
yesBtn.addEventListener("click", () => {

    typeWriter("YAAAY!! 💖✨");

    yesBtn.style.position = "fixed";
    yesBtn.style.top = "0";
    yesBtn.style.left = "0";
    yesBtn.style.width = "100vw";
    yesBtn.style.height = "100dvh";
    yesBtn.style.borderRadius = "0";
    yesBtn.style.fontSize = "42px";
    yesBtn.style.zIndex = "999";
});
