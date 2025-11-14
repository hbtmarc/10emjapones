const numbers = [
    { jp: "いち", en: 1, pron: "ichi", kanji: "一" },
    { jp: "に", en: 2, pron: "ni", kanji: "二" },
    { jp: "さん", en: 3, pron: "san", kanji: "三" },
    { jp: "し", en: 4, pron: "shi", kanji: "四" },
    { jp: "ご", en: 5, pron: "go", kanji: "五" },
    { jp: "ろく", en: 6, pron: "roku", kanji: "六" },
    { jp: "しち", en: 7, pron: "shichi", kanji: "七" },
    { jp: "はち", en: 8, pron: "hachi", kanji: "八" },
    { jp: "きゅう", en: 9, pron: "kyuu", kanji: "九" },
    { jp: "じゅう", en: 10, pron: "juu", kanji: "十" }
];

let currentPronunciation = {};
let lastThreeIndexes = [];
let score = 0;
let isHidden = false;
let correctCount = 0;
let totalCount = 0;

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

    totalCount++;
    updateProgressStats();

    if (parseInt(userAnswer) === currentPronunciation.en) {
        // Resposta correta
        score += 1;
        correctCount++;
        updateScore();
        updateProgressStats();

        // Animação de sucesso
        scoreAnim.textContent = "+1 🎉";
        scoreAnim.style.color = "#38ef7d";
        scoreAnim.classList.add('show');
        
        showFeedback(feedback, `✓ Correto! ${currentPronunciation.jp} = ${currentPronunciation.en}`, "correct");
        
        // Efeito de confete visual (simulado com emojis)
        createConfetti();
        
        // Explosão de corações românticos
        createHeartBurst();
        
    } else {
        // Resposta incorreta
        score = 0;
        updateScore();
        updateProgressStats();

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

// Atualiza estatísticas de progresso
function updateProgressStats() {
    const accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    
    document.getElementById("correctCount").textContent = correctCount;
    document.getElementById("totalCount").textContent = totalCount;
    document.getElementById("accuracy").textContent = accuracy + "%";
    
    const progressFill = document.getElementById("progressFill");
    progressFill.style.width = accuracy + "%";
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
        confetti.style.zIndex = '1000';
        
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1200);
    }
}

// Cria explosão de corações românticos
function createHeartBurst() {
    const romanticEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '💞', '💘'];
    const burstContainer = document.getElementById('heartBurst');
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = romanticEmojis[Math.floor(Math.random() * romanticEmojis.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = '28px';
        heart.style.pointerEvents = 'none';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transform = 'translate(-50%, -50%)';
        
        const angle = (360 / 8) * i;
        const distance = 100 + Math.random() * 50;
        
        heart.style.animation = `heartBurst 1.2s ease-out forwards`;
        heart.style.setProperty('--angle', `${angle}deg`);
        heart.style.setProperty('--distance', `${distance}px`);
        
        burstContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1200);
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
        @keyframes heartBurst {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translate(
                    calc(-50% + cos(var(--angle)) * var(--distance)),
                    calc(-50% + sin(var(--angle)) * var(--distance))
                ) scale(1.2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Função para "falar" o número (simulação visual e sonora)
function speakNumber(number, pronunciation) {
    // Destacar a linha da tabela
    const row = document.querySelector(`.table-row[data-number="${number}"]`);
    if (row) {
        row.style.background = '#fff5e6';
        row.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            row.style.background = '';
            row.style.transform = '';
        }, 800);
    }
    
    // Usar Web Speech API se disponível
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(pronunciation);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    }
    
    // Feedback visual
    createMiniHeartBurst(event.target);
}

// Criar pequena explosão de corações no botão de áudio
function createMiniHeartBurst(button) {
    const hearts = ['💕', '💖'];
    
    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = '16px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const rect = button.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        
        const angle = (120 / 3) * i - 30;
        const distance = 40;
        
        heart.style.animation = 'miniHeartFloat 1s ease-out forwards';
        heart.style.setProperty('--mini-angle', `${angle}deg`);
        heart.style.setProperty('--mini-distance', `${distance}px`);
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// Adicionar animação mini heart
const miniHeartStyle = document.createElement('style');
miniHeartStyle.textContent = `
    @keyframes miniHeartFloat {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(-50% + cos(var(--mini-angle)) * var(--mini-distance)),
                calc(-50% + sin(var(--mini-angle)) * var(--mini-distance))
            ) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(miniHeartStyle);

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

// Adiciona hover effect nas linhas da tabela
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.table-row');
    
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Inicia com primeiro número
    getRandomNumber();
    
    // Anima emojis de fundo periodicamente
    setInterval(() => {
        const floatingEmojis = document.querySelectorAll('.floating-emoji');
        floatingEmojis.forEach((emoji, index) => {
            setTimeout(() => {
                emoji.style.animation = 'none';
                emoji.offsetHeight; // Trigger reflow
                emoji.style.animation = `floatEmoji 15s ease-in-out infinite`;
                emoji.style.animationDelay = `-${index * 3}s`;
            }, index * 200);
        });
    }, 15000);
});
