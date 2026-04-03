// ===== SECTION SWITCHING =====
const sections = document.querySelectorAll('.container');
const controls = document.querySelectorAll('.control');

controls.forEach(control => {
    control.addEventListener('click', () => {
        const targetId = control.getAttribute('data-id');

        // Remove active from all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Remove active-btn from all controls
        controls.forEach(btn => {
            btn.classList.remove('active-btn');
        });

        // Activate the clicked control
        control.classList.add('active-btn');

        // Activate the matching section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// ===== GAME LOGIC =====
let buildScore = 0;
let timeLeft = 20;
let isBuilding = false;
let timerInterval;
let spawnInterval;

function startBuild() {
    if (isBuilding) return;
    isBuilding = true;
    buildScore = 0;
    timeLeft = 20;
    
    document.getElementById('build-score').innerText = buildScore;
    document.getElementById('build-btn').style.display = 'none';

    // Start the clock
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('build-timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            clearInterval(spawnInterval);
            endBuild();
        }
    }, 1000);

    // Spawn items
    spawnInterval = setInterval(spawnItem, 700);
}

function spawnItem() {
    const field = document.getElementById('game-field');
    const item = document.createElement('div');
    const isBug = Math.random() > 0.8;
    
    item.className = 'resource';
    item.innerHTML = isBug ? '🐞' : '🤖';
    
    // Random horizontal start
    const startX = Math.random() * (field.clientWidth - 50);
    item.style.left = startX + 'px';
    item.style.top = "-50px";
    
    field.appendChild(item);

    // Click handler
    item.addEventListener('mousedown', function() {
        if (isBug) {
            buildScore -= 10;
            this.innerHTML = '🔥'; // Bug caught!
        } else {
            buildScore += 20;
            this.innerHTML = '✅'; // Android caught!
        }
        document.getElementById('build-score').innerText = buildScore;
        
        // Remove after a tiny delay so user sees the feedback
        setTimeout(() => item.remove(), 100);
    });

    // Animation
    let currentY = -50;
    const fall = setInterval(() => {
        currentY += 5; // Speed of falling
        item.style.top = currentY + 'px';

        // Remove if it leaves the bottom
        if (currentY > field.clientHeight) {
            clearInterval(fall);
            if (item.parentNode) item.remove();
        }
        
        // Stop falling if it was clicked (removed from DOM)
        if (!item.parentNode) clearInterval(fall);
    }, 20);
}

function endBuild() {
    isBuilding = false;
    
    // Clear out remaining emojis
    const resources = document.querySelectorAll('.resource');
    resources.forEach(r => r.remove());

    const buildBtn = document.getElementById('build-btn');
    if (buildBtn) {
        buildBtn.style.display = 'block';
        buildBtn.innerText = "Re-run Build";
    } else {
        // Fallback just in case the button was removed entirely
        document.getElementById('game-field').innerHTML = '<button id="build-btn" onclick="startBuild()">Re-run Build</button>';
    }
}
