let currentIndex = 0;
let correctCount = 0;

const currentWordDiv = document.getElementById('currentWord');
const userInput = document.getElementById('userInput');
const scoreDiv = document.getElementById('score');
const responseDiv = document.getElementById('response');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayNextWord() {
    if (currentIndex < words.length) {
        currentWordDiv.innerHTML = `<p>${words[currentIndex].original}</p>`;
        userInput.value = '';
        userInput.disabled = false;
        document.querySelector('button').disabled = false;
        userInput.focus();
    } else {
        const percentage = (correctCount / words.length) * 100;
        scoreDiv.innerHTML = `You scored ${correctCount} out of ${words.length} (${percentage.toFixed(2)}%)`;
        currentWordDiv.style.display = 'none';
        userInput.style.display = 'none';
        document.querySelector('button').style.display = 'none';
    }
}

function submitAnswer() {
    const userAnswer = userInput.value.trim();
    userInput.disabled = true;
    document.querySelector('button').disabled = true;

    if (userAnswer === words[currentIndex].correct) {
        responseDiv.innerHTML = 'Correct';
        responseDiv.style.color = 'green';
        correctCount++;
    } else {
        responseDiv.innerHTML = `Incorrect. The correct word is "${words[currentIndex].correct}"`;
        responseDiv.style.color = 'red';
    }

    const percentage = (correctCount / (currentIndex + 1)) * 100;
    scoreDiv.innerHTML = `Score: ${correctCount} out of ${currentIndex + 1} (${percentage.toFixed(2)}%)`;

    responseDiv.classList.remove('hidden');
    setTimeout(() => {
        responseDiv.classList.add('hidden');
        currentIndex++;
        displayNextWord();
    }, 2000);
}

shuffleArray(words);
displayNextWord();

userInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        submitAnswer();
    }
});
