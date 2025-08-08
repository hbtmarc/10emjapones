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

function getRandomNumber() {
    // Garante que não será repetido mais de 3 vezes seguidas
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * numbers.length);
    } while (lastThreeIndexes.length >= 3 && lastThreeIndexes.includes(randomIndex));

    // Atualiza os índices de números recentemente usados
    if (lastThreeIndexes.length >= 3) {
        lastThreeIndexes.shift();  // Remove o primeiro elemento
    }
    lastThreeIndexes.push(randomIndex);

    currentPronunciation = numbers[randomIndex];
    document.getElementById("pronunciation").textContent = currentPronunciation.pron;
    document.getElementById("userInput").value = '';
    document.getElementById("feedback").textContent = '';
    document.getElementById("feedback").style.opacity = 0;  // Reset feedback opacity
}

// Função de validação com feedback animado
function validateAnswer() {
    const userAnswer = document.getElementById("userInput").value;
    const feedback = document.getElementById("feedback");

    if (parseInt(userAnswer) === currentPronunciation.en) {
    // Incrementa a pontuação
    score += 1;
    document.getElementById("scoreValue").textContent = score;

    // Animação de +1
    const scoreAnim = document.getElementById("scoreAnimation");
    scoreAnim.textContent = "+1";
    scoreAnim.style.opacity = 1;
    scoreAnim.style.transform = "scale(1.5)";
    setTimeout(() => {
        scoreAnim.style.opacity = 0;
        scoreAnim.style.transform = "scale(1)";
    }, 1000);

    // Usando innerHTML para permitir quebras de linha
    feedback.innerHTML = "Correto! <br> Próximo número...";
    feedback.classList.add("correct");
    feedback.classList.remove("error");
} else {
    // Zera a pontuação
    score = 0;
    document.getElementById("scoreValue").textContent = score;

    // Animação de erro
    const scoreAnim = document.getElementById("scoreAnimation");
    scoreAnim.textContent = "ERRO!";
    scoreAnim.style.opacity = 1;
    scoreAnim.style.transform = "scale(1.5)";
    scoreAnim.style.color = "red";
    setTimeout(() => {
        scoreAnim.style.opacity = 0;
        scoreAnim.style.transform = "scale(1)";
    }, 1000);

    // Usando innerHTML para permitir quebras de linha
    feedback.innerHTML = `Errado! <br> A resposta correta é ${currentPronunciation.en}`;
    feedback.classList.add("error");
    feedback.classList.remove("correct");
}

feedback.style.opacity = 1;  // Mostrar feedback
setTimeout(getRandomNumber, 2000);  // Avançar após 2 segundos se errar


    feedback.style.opacity = 1;  // Mostrar feedback
    setTimeout(getRandomNumber, 2000);  // Avançar após 2 segundos se errar
}

// Inicia com um número aleatório
getRandomNumber();

// Permitir validação com a tecla "Enter"
document.getElementById("userInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        validateAnswer();
    }
});

// Função para tornar a segunda seção translúcida e com desfoque
function toggleFixation() {
    const fixationSection = document.getElementById("fixation-section");
    fixationSection.classList.toggle("translucent");
}

