const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");

const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");

const bg = document.getElementById("bg");

/* PARALLAX */
document.addEventListener("mousemove", (e)=>{
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    bg.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});

/* NEJ LOGIK */
let scale = 1;
let noClicks = 0;

const noMessages = [
    "Är du säker? 🤨",
    "Den känns lite feg…",
    "Ja blir större nu.",
    "Du vet vad som kommer hända",
    "Okej, nu tar Ja över!"
];

function typeWriter(text){
    noText.textContent = "";
    let i = 0;
    const interval = setInterval(()=>{
        noText.textContent += text[i];
        i++;
        if(i >= text.length) clearInterval(interval);
    }, 35);
}

noBtn.addEventListener("click", ()=>{
    scale += 0.25;
    yesBtn.style.transform = `scale(${scale})`;

    if(noClicks < noMessages.length){
        typeWriter(noMessages[noClicks]);
    }

    noClicks++;

    /* Nej flyr */
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * maxX + "px";
    noBtn.style.top = Math.random() * maxY + "px";

    if(navigator.vibrate) navigator.vibrate(30);

    /* Ja äter upp Nej */
    if(noClicks >= noMessages.length){
        yesBtn.style.transform = "scale(3)";
        setTimeout(()=> noBtn.style.opacity = "0", 300);
    }
});

/* JA LOGIK */
yesBtn.addEventListener("click", ()=>{
    if(navigator.vibrate) navigator.vibrate([40,20,40]);

    startConfetti();

    yesBtn.style.transition = "all 0.6s ease";
    yesBtn.style.width = "200vw";
    yesBtn.style.height = "200vh";
    yesBtn.style.fontSize = "8rem";
    yesBtn.style.borderRadius = "0";
    yesBtn.style.position = "fixed";
    yesBtn.style.left = "50%";
    yesBtn.style.top = "50%";
    yesBtn.style.transform = "translate(-50%, -50%)";

    setTimeout(()=>{
        section1.style.display = "none";
        section2.classList.remove("hidden");
    }, 700);
});

/* KONFETTI */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function startConfetti(){
    particles = [];
    for(let i=0;i<150;i++){
        particles.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height,
            r:Math.random()*6+4,
            dx:(Math.random()-0.5)*4,
            dy:Math.random()*4+2,
            color:`hsl(${Math.random()*360},80%,60%)`
        });
    }
    requestAnimationFrame(updateConfetti);
}

function updateConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
        p.x += p.dx;
        p.y += p.dy;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });

    particles = particles.filter(p=>p.y < canvas.height);

    if(particles.length > 0){
        requestAnimationFrame(updateConfetti);
    }
}

/* HJÄRTAN */
function spawnHeart(){
    const heart = document.createElement("div");
    heart.classList.add("heart");

    const size = Math.random() * 30 + 10;
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    heart.style.right = "-40px";
    heart.style.bottom = "-40px";
    heart.style.background = `hsla(${Math.random()*60+300}, 80%, 70%, 0.35)`;
    heart.style.animationDuration = (Math.random() * 10 + 12) + "s";

    document.body.appendChild(heart);
    setTimeout(()=> heart.remove(), 20000);
}

setInterval(spawnHeart, 900);
