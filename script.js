const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const crosshair = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20
};

const enemies = [];
const explosions = [];
let score = 0;

// Create enemy objects
function spawnEnemy() {
    const enemy = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 30
    };
    enemies.push(enemy);
}

setInterval(spawnEnemy, 1000);

// Draw crosshair
function drawCrosshair() {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(crosshair.x - crosshair.size, crosshair.y);
    ctx.lineTo(crosshair.x + crosshair.size, crosshair.y);
    ctx.moveTo(crosshair.x, crosshair.y - crosshair.size);
    ctx.lineTo(crosshair.x, crosshair.y + crosshair.size);
    ctx.stroke();
}

// Draw enemies
function drawEnemies() {
    enemies.forEach((enemy) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
    });
}

// Draw explosions
function drawExplosions() {
    explosions.forEach((explosion, index) => {
        ctx.fillStyle = 'orange';
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
        ctx.fill();

        explosion.radius += 2;
        if (explosion.radius > 30) {
            explosions.splice(index, 1);
        }
    });
}

// Update game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawEnemies();
    drawExplosions();
    drawCrosshair();

    requestAnimationFrame(update);
}

update();

// Move crosshair with mouse
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    crosshair.x = e.clientX - rect.left;
    crosshair.y = e.clientY - rect.top;
});

// Fire weapon
canvas.addEventListener('click', () => {
    explosions.push({ x: crosshair.x, y: crosshair.y, radius: 1 });

    // Check for enemy hits
    enemies.forEach((enemy, index) => {
        const dist = Math.hypot(enemy.x - crosshair.x, enemy.y - crosshair.y);
        if (dist < enemy.size / 2 + 20) {
            enemies.splice(index, 1);
            score += 1;
            console.log('Score:', score);
        }
    });
});
