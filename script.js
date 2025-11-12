const numbers = [
    { jp: "いち", en: 1, pron: "ichi" },
    { jp: "に", en: 2, pron: "ni" },
    { jp: "さん", en: 3, pron: "san" },
    { jp: "し", en: 4, pron: "shi" },
    { jp: "ご", en: 5, pron: "go" },
    { jp: "ろく", en: 6, pron: "roku" },
    { jp: "しち", en: 7, pron: "shichi" },
    { jp: "はち", en: 8, pron: "hachi" },
    { jp: "きゅう", en: 9, pron: "kyuu" },
    { jp: "じゅう", en: 10, pron: "juu" }
];

let currentPronunciation = {};
let lastThreeIndexes = [];
let score = 0;
let isHidden = false;

// Gera novo número aleatório
function getRandomNumber() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * numbers.length);
    } while (lastThreeIndexes.length >= 3 && lastThreeIndexes.includes(randomIndex));

    if (lastThreeIndexes.length >= 3) {
        lastThreeIndexes.shift();
    }
    lastThreeIndexes.push(randomIndex);

    currentPronunciation = numbers[randomIndex];
    
    const pronunciationEl = document.getElementById("pronunciation");
    
    // Animação de saída
    pronunciationEl.style.animation = 'none';
    pronunciationEl.offsetHeight; // Trigger reflow
    pronunciationEl.style.animation = 'bounceIn 0.6s ease-out';
    
    pronunciationEl.textContent = currentPronunciation.pron;
    document.getElementById("userInput").value = '';
    
    // Limpa feedback
    const feedback = document.getElementById("feedback");
    feedback.classList.remove('show', 'correct', 'error');
    feedback.textContent = '';
    
    const scoreAnim = document.getElementById("scoreAnimation");
    scoreAnim.classList.remove('show');
}

// Validação da resposta com feedback aprimorado
function validateAnswer() {
    const userAnswer = document.getElementById("userInput").value.trim();
    const feedback = document.getElementById("feedback");
    const scoreAnim = document.getElementById("scoreAnimation");

    if (!userAnswer) {
        showFeedback(feedback, "⚠️ Digite um número!", "error");
        return;
    }

    if (parseInt(userAnswer) === currentPronunciation.en) {
        // Resposta correta
        score += 1;
        updateScore();

        // Animação de sucesso
        scoreAnim.textContent = "+1 🎉";
        scoreAnim.style.color = "#38ef7d";
        scoreAnim.classList.add('show');
        
        showFeedback(feedback, `✓ Correto! ${currentPronunciation.jp} = ${currentPronunciation.en}`, "correct");
        
        // Efeito de confete visual (simulado com emojis)
        createConfetti();
        
    } else {
        // Resposta incorreta
        score = 0;
        updateScore();

        scoreAnim.textContent = "✗ ERRO";
        scoreAnim.style.color = "#f45c43";
        scoreAnim.classList.add('show');
        
        showFeedback(
            feedback, 
            `✗ A resposta é ${currentPronunciation.en}<br><small style="opacity:0.8">${currentPronunciation.jp} (${currentPronunciation.pron})</small>`, 
            "error"
        );
        
        // Shake animation no input
        const input = document.getElementById("userInput");
        input.style.animation = 'shake 0.5s';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }

    // Remove animação do score após delay
    setTimeout(() => {
        scoreAnim.classList.remove('show');
    }, 1500);

    // Próximo número após delay
    setTimeout(getRandomNumber, 2500);
}

// Atualiza pontuação com animação
function updateScore() {
    const scoreValue = document.getElementById("scoreValue");
    scoreValue.style.transform = 'scale(1.3)';
    scoreValue.textContent = score;
    
    setTimeout(() => {
        scoreValue.style.transform = 'scale(1)';
    }, 300);
}

// Exibe feedback com animação
function showFeedback(element, message, type) {
    element.innerHTML = message;
    element.classList.add('show', type);
}

// Cria efeito de confete
function createConfetti() {
    const emojis = ['🎉', '✨', '⭐', '🌟', '💫'];
    const container = document.querySelector('.pronunciation-display');
    
    for (let i = 0; i < 6; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.position = 'absolute';
        confetti.style.fontSize = '24px';
        confetti.style.pointerEvents = 'none';
        confetti.style.left = `${50 + (Math.random() - 0.5) * 100}%`;
        confetti.style.top = '50%';
        confetti.style.animation = `confettiFall ${0.8 + Math.random() * 0.4}s ease-out forwards`;
        
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1200);
    }
}

// Adiciona animação de confete ao CSS dinamicamente
if (!document.getElementById('confetti-animation')) {
    const style = document.createElement('style');
    style.id = 'confetti-animation';
    style.textContent = `
        @keyframes confettiFall {
            0% { 
                transform: translateY(0) rotate(0deg) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translateY(${-100 - Math.random() * 50}px) 
                           rotate(${360 * (Math.random() - 0.5)}deg) 
                           scale(1);
                opacity: 0;
            }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
}

// Toggle da seção de fixação
function toggleFixation() {
    const fixationSection = document.getElementById("fixation-section");
    const toggleButton = document.getElementById("toggleButton");
    const toggleText = document.getElementById("toggleText");
    const eyePath = document.getElementById("eyePath");
    const eyeCircle = document.getElementById("eyeCircle");
    
    isHidden = !isHidden;
    fixationSection.classList.toggle("hidden");
    
    if (isHidden) {
        toggleText.textContent = "Mostrar";
        eyePath.style.opacity = "0.3";
        eyeCircle.style.opacity = "0.3";
    } else {
        toggleText.textContent = "Ocultar";
        eyePath.style.opacity = "1";
        eyeCircle.style.opacity = "1";
    }
}

// Event listeners
document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        validateAnswer();
    }
});

// Adiciona hover effect nos cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.number-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique
        card.addEventListener('click', function() {
            const badge = this.querySelector('.number-badge');
            badge.style.animation = 'none';
            badge.offsetHeight; // Trigger reflow
            badge.style.animation = 'bounceIn 0.4s ease-out';
        });
    });
    
    // Inicia com primeiro número
    getRandomNumber();
});
