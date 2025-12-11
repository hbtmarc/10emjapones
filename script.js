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

const NEXT_QUESTION_DELAY = 1500;

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
    
    document.getElementById("pronunciation").textContent = currentPronunciation.pron;
    document.getElementById("userInput").value = '';
    
    // Limpa feedback
    const feedback = document.getElementById("feedback");
    feedback.classList.remove('correct', 'error');
    feedback.textContent = '';
    
    const scoreAnim = document.getElementById("scoreAnimation");
    scoreAnim.textContent = '';
}

// Validação da resposta
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

        scoreAnim.textContent = "+1 🎉";
        scoreAnim.style.color = "#38ef7d";
        
        showFeedback(feedback, `✓ Correto! ${currentPronunciation.jp} = ${currentPronunciation.en}`, "correct");
        
    } else {
        // Resposta incorreta
        score = 0;
        updateScore();

        scoreAnim.textContent = "✗ ERRO";
        scoreAnim.style.color = "#f45c43";
        
        showFeedback(
            feedback, 
            `✗ A resposta é ${currentPronunciation.en}<br><small style="opacity:0.8">${currentPronunciation.jp} (${currentPronunciation.pron})</small>`, 
            "error"
        );
    }

    // Próximo número
    setTimeout(getRandomNumber, NEXT_QUESTION_DELAY);
}

// Atualiza pontuação
function updateScore() {
    document.getElementById("scoreValue").textContent = score;
}

// Exibe feedback
function showFeedback(element, message, type) {
    element.innerHTML = message;
    element.classList.add(type);
}

// Toggle da seção de fixação
function toggleFixation() {
    const fixationSection = document.getElementById("fixation-section");
    const toggleText = document.getElementById("toggleText");
    
    isHidden = !isHidden;
    fixationSection.classList.toggle("hidden");
    
    toggleText.textContent = isHidden ? "Mostrar" : "Ocultar";
}

// Event listeners
document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        validateAnswer();
    }
});

// Inicializa
document.addEventListener('DOMContentLoaded', () => {
    getRandomNumber();
});
