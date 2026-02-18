const clock = document.getElementById("clock");
const toggleBtn = document.getElementById("toggle");
const tickSound = document.getElementById("tick");

let is24Hour = true;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let ampm = "";

    if (!is24Hour) {
        ampm = hours >= 12 ? " PM" : " AM";
        hours = hours % 12 || 12;
    }

    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    clock.style.transform = "scale(0.9)";
    clock.style.opacity = "0.6";

    setTimeout(() => {
        clock.textContent =
            `${String(hours).padStart(2, "0")}:${minutes}:${seconds}${ampm}`;
        clock.style.transform = "scale(1)";
        clock.style.opacity = "1";
    }, 150);

    tickSound.currentTime = 0;
    tickSound.play();
}

toggleBtn.addEventListener("click", () => {
    is24Hour = !is24Hour;
    toggleBtn.textContent = is24Hour ?
        "Switch to 12H" :
        "Switch to 24H";
});

setInterval(updateClock, 1000);
updateClock();

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = "cyan";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();