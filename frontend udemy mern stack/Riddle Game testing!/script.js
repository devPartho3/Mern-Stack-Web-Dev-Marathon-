document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const addPlayerBtn = document.getElementById("add-player");
    const restartBtn = document.getElementById("restart-btn");
    const setupContainer = document.getElementById("setup-container");
    const playerInputsContainer = document.getElementById("player-inputs");
    const questionContainer = document.getElementById("question-container");
    const resultContainer = document.getElementById("result-container");
    const leaderboard = document.getElementById("leaderboard");
    const questionText = document.getElementById("question-text");
    const choicesList = document.getElementById("choices-list");
    const turnIndicator = document.getElementById("turn-indicator");
    const nextBtn = document.getElementById("next-btn");
    const timerDisplay = document.getElementById("timer");
  
    const allQuestions = [/* ... (same question array as before) ... */];
  
    let players = [];
    let scores = {};
    let currentPlayerIndex = 0;
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 15;
    let assignedQuestions = [];
  
    addPlayerBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = `Player ${playerInputsContainer.children.length + 1} Name`;
      input.classList.add("player-name");
      playerInputsContainer.appendChild(input);
    });
  
    startBtn.addEventListener("click", () => {
      const inputs = document.querySelectorAll(".player-name");
      players = Array.from(inputs).map(input => input.value.trim()).filter(name => name !== "");
      if (players.length !== 2) {
        alert("Please enter exactly 2 players.");
        return;
      }
  
      players.forEach(player => scores[player] = 0);
      setupContainer.classList.add("hidden");
      questionContainer.classList.remove("hidden");
  
      // Shuffle questions
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      const half = Math.floor(shuffled.length / 2);
      assignedQuestions = [
        ...shuffled.slice(0, half).map(q => ({ ...q, player: players[0] })),
        ...shuffled.slice(half).map(q => ({ ...q, player: players[1] }))
      ];
  
      currentQuestionIndex = 0;
      showQuestion();
    });
  
    restartBtn.addEventListener("click", () => {
      location.reload();
    });
  
    nextBtn.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < assignedQuestions.length) {
        showQuestion();
      } else {
        showResult();
      }
    });
  
    function showQuestion() {
      clearInterval(timer);
      timeLeft = 15;
      updateTimer();
      timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
          clearInterval(timer);
          selectAnswer(null);
        }
      }, 1000);
  
      nextBtn.classList.add("hidden");
      const question = assignedQuestions[currentQuestionIndex];
      questionText.textContent = question.question;
      choicesList.innerHTML = "";
      turnIndicator.textContent = `🎯 ${question.player}'s turn`;
  
      question.choices.forEach(choice => {
        const li = document.createElement("li");
        li.textContent = choice;
        li.classList.add("choice");
        li.addEventListener("click", () => selectAnswer(choice, li));
        choicesList.appendChild(li);
      });
    }
  
    function updateTimer() {
      timerDisplay.textContent = `⏳ ${timeLeft}s`;
    }
  
    function selectAnswer(choice, selectedLi = null) {
      clearInterval(timer);
      const question = assignedQuestions[currentQuestionIndex];
      const correctAnswer = question.answer;
      const allChoices = document.querySelectorAll(".choice");
  
      allChoices.forEach(li => {
        li.classList.add("disabled");
        if (li.textContent === correctAnswer) li.classList.add("correct");
        if (li === selectedLi && choice !== correctAnswer) li.classList.add("wrong");
      });
  
      if (choice === correctAnswer) {
        scores[question.player]++;
      }
  
      nextBtn.classList.remove("hidden");
    }
  
    function showResult() {
      questionContainer.classList.add("hidden");
      resultContainer.classList.remove("hidden");
  
      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      leaderboard.innerHTML = "<h3>🏆 Leaderboard</h3>" + sorted.map(([name, score], i) => 
        `<p>${i + 1}. ${name} — ${score} points</p>`).join("");
    }
  });
  