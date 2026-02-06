const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noText = document.getElementById("noText");

const section1 = document.getElementById("section1");
const section2 = document.getElementById("section2");

const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scale = 1;
let noClicks = 0;
let confettiParticles = [];

const noMessages = [
    "Är du säker? 🤨",
    "Pretty pleaaseee",
    "With a cherry on top!",
    "Why so meaaan",
    "Nu finns bara JA :)"
];

// Skriver ut text bokstav för bokstav
function typeWriter(text){
    noText.textContent = '';
    let i = 0;
    const interval = setInterval(()=>{
        noText.textContent += text[i];
        i++;
        if(i>=text.length) clearInterval(interval);
    },40);
}

// Nej knapp
noBtn.addEventListener("click", ()=>{
    // Ja blir större
    scale += 0.25;
    yesBtn.style.transform = `scale(${scale})`;

    // Nej-text
    if(noClicks < noMessages.length){
        typeWriter(noMessages[noClicks]);
    }

    noClicks++;

    // Flytta Nej-knappen till slumpad plats
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random()*maxX + "px";
    noBtn.style.top = Math.random()*maxY + "px";

    // Haptics
    if(navigator.vibrate) navigator.vibrate(30);

    // Om meddelandena slut → Ja "äter upp" Nej
    if(noClicks >= noMessages.length){
        yesBtn.style.transition = "all 0.5s ease";
        yesBtn.style.transform = "scale(3)";
        yesBtn.style.zIndex = "10";
        setTimeout(()=>{noBtn.style.opacity="0"},400);
    }
});

// Ja knapp
yesBtn.addEventListener("click", ()=>{
    // Haptics
    if(navigator.vibrate) navigator.vibrate([40,20,40]);

    // Konfetti
    startConfetti();

    // Ja exploderar fullscreen
    yesBtn.style.transition = "all 0.6s ease";
    yesBtn.style.width = "200vw";
    yesBtn.style.height = "200vh";
    yesBtn.style.fontSize = "8rem";
    yesBtn.style.borderRadius = "0";
    yesBtn.style.position = "fixed";
    yesBtn.style.left = "50%";
    yesBtn.style.top = "50%";
    yesBtn.style.transform = "translate(-50%, -50%)";

    // Efter explosion → sektion 2
    setTimeout(()=>{
        section1.style.display = "none";
        section2.classList.remove("hidden");
        section2.classList.add("active");
    },800);
});

// KONFETTI
function startConfetti(){
    confettiParticles = [];
    for(let i=0;i<150;i++){
        confettiParticles.push({
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
    confettiParticles.forEach(p=>{
        p.x+=p.dx;
        p.y+=p.dy;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color;
        ctx.fill();
    });
    confettiParticles = confettiParticles.filter(p=>p.y<canvas.height);
    if(confettiParticles.length>0) requestAnimationFrame(updateConfetti);
}
