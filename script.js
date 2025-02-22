let score = 0;
let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let scoreDisplay = document.getElementById('score');

// Position initiale
let playerPositionX = 180;
let playerPositionY = 20;
let obstaclePositionY = -30;
let obstaclePositionX = Math.random() * 360;
let playerSpeed = 20;
let obstacleSpeed = 3;
let speedIncreaseRate = 0.05; // L'augmentation de la vitesse

// Fonction pour déplacer le joueur à gauche ou à droite
function movePlayer(direction) {
    if (direction === "left" && playerPositionX > 0) {
        playerPositionX -= playerSpeed;
    } else if (direction === "right" && playerPositionX < 360) {
        playerPositionX += playerSpeed;
    }
    player.style.left = playerPositionX + 'px';
}

// Fonction pour faire tomber l'obstacle
function moveObstacle() {
    obstaclePositionY += obstacleSpeed;
    obstacle.style.top = obstaclePositionY + 'px';

    // Réinitialiser l'obstacle quand il atteint le bas
    if (obstaclePositionY >= 600) {
        obstaclePositionY = -30;
        obstaclePositionX = Math.random() * 360;
        obstacle.style.left = obstaclePositionX + 'px';
        score++;
        // Augmenter progressivement la vitesse de l'obstacle
        obstacleSpeed += speedIncreaseRate;
    }

    // Vérifier si l'obstacle touche le joueur
    if (obstaclePositionY >= 560 && obstaclePositionY <= 600 &&
        playerPositionX < obstaclePositionX + 40 && playerPositionX + 40 > obstaclePositionX) {
        gameOver();
    }
}

// Fonction de fin de jeu
function gameOver() {
    alert("Game Over! Score: " + score);
    score = 0;
    obstaclePositionY = -30;
    obstacleSpeed = 3; // Réinitialiser la vitesse
}

// Fonction pour mettre à jour le score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Gestion des événements clavier pour déplacer le joueur
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") {
        movePlayer("left");
    } else if (e.key === "ArrowRight") {
        movePlayer("right");
    }
});

// Boucle du jeu
function gameLoop() {
    moveObstacle();
    updateScore();
    requestAnimationFrame(gameLoop);
}


// Démarrer le jeu
gameLoop();

document.addEventListener("DOMContentLoaded", () => {
    const bgMusic = document.getElementById("bgMusic");

    function playMusic(song) {
        if (!bgMusic) {
            console.error("L'élément audio n'a pas été trouvé !");
            return;
        }
        bgMusic.src = song;
        bgMusic.volume = 0.5;
        bgMusic.play().catch(error => {
            console.log("Erreur de lecture automatique : " + error);
            alert("Clique une première fois sur un bouton pour activer l'audio !");
        });
    }

    function stopMusic() {
        if (!bgMusic) return;
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    // Rendre les fonctions accessibles globalement
    window.playMusic = playMusic;
    window.stopMusic = stopMusic;
});
