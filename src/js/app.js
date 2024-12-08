
let scoreJoueur = document.getElementById("ScoreValue");
let productValue = document.getElementById("ProductValue");
let RateProduct = 0;
const clickerValue = document.querySelector(".click-btn");
const audioFond = new Audio("../../assets/sounds/soda.mp3");

// Fonction pour afficher des notifications
function Notif(message, valeur) {
    const divNotification = document.querySelector('.Notification');
    const notif = document.createElement('div');
    const progressBar = document.createElement('div');
    const audioSucces = new Audio("../../assets/sounds/tada.mp3");
    const audioEchec = new Audio("../../assets/sounds/fail.mp3");

    notif.classList.add('notifmessage');
    notif.textContent = message;
    divNotification.appendChild(notif);
    progressBar.classList.add('progress-bar');
    notif.appendChild(progressBar);

    if (valeur === true) {
        progressBar.classList.add('valide');
        audioSucces.play();
    } else {
        progressBar.classList.add('echoue');
        audioEchec.play();
        audioEchec.volume = 0.3;
    }

    setTimeout(() => {
        notif.classList.add('show');
    }, 100);

    setTimeout(() => {
        notif.classList.remove('show');
    }, 5000);

    setTimeout(() => {
        notif.remove();
    }, 5300);
}

// Animation des deux section
window.addEventListener('load', () => {
    const left = document.querySelector('.left');
    const right = document.querySelector('.upgrades');

    setTimeout(() => {
        left.classList.add('animate-right');
    });

    setTimeout(() => {
        right.classList.add('animate-left');
    });

    audioFond.play();
    audioFond.volume = 0.;
});

// Gestion des clicks
clickerValue.addEventListener("click", (e) => {
    const audio = new Audio("../../assets/sounds/coinsound.wav");
    let score = parseInt(scoreJoueur.innerHTML, 10);
    scoreJoueur.innerHTML = score + 1;
    console.log(scoreJoueur);

    const coin = document.createElement("div");
    coin.innerHTML = "+1 <img src='../../assets/images/coin.webp'> ";
    coin.classList.add("coinEvent");
    coin.style.left = e.clientX + "px";
    coin.style.top = e.clientY + "px";
    audio.play();
    document.body.appendChild(coin);

    setTimeout(() => {
        coin.style.transform = "translateY(-100px)";
        coin.style.opacity = "0";
    }, 50);

    setTimeout(() => {
        coin.remove();
    }, 10000);
});

// Mise à jour automatique du score
function MiseAjour() {
    setInterval(() => {
        let score = parseInt(scoreJoueur.innerHTML, 10);
        productValue.innerHTML = RateProduct;
        scoreJoueur.innerHTML = score + RateProduct;
    }, 1000);
}

MiseAjour();

// Gestion du bouton d'amélioration
const upgradeBtn = document.querySelectorAll(".upgrade-btn");
upgradeBtn.forEach((button) => {
    button.addEventListener("click", () => {
        let cost = parseInt(button.querySelector(".upgrade-cost").innerHTML, 10);
        let score = parseInt(scoreJoueur.innerHTML, 10);
        let possesseValue = button.closest('.upgrade-info').querySelector('.Poss');
        let poss = parseInt(possesseValue.innerHTML, 10);
        let costValue = button.querySelector(".upgrade-cost");

        if (score >= cost) {
            if (poss < 10) {
                scoreJoueur.innerHTML = score - cost;
                Notif("Bravo, vous avez débloqué cette amélioration !", true);
                let newCost = Math.round(cost * 1.6);
                costValue.innerHTML = newCost;
                poss += 1;
                RateProduct += 1;
                possesseValue.innerHTML = poss;
                if (poss === 10) {
                    button.disabled = true;
                    button.style.backgroundColor = 'gray';
                    button.style.opacity = '0.7';
                }
            }
        } else {
            Notif("Vous n'avez pas assez d'argent pour cette amélioration !", false);
        }
    });
});