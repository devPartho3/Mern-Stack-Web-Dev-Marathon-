document.addEventListener("DOMContentLoaded", () => {

    // ================= QUESTIONS BANK =================
    const questions = [

        // ===== CLASSIC LOGIC =====
        {
            question: "A bat and a ball cost $1.10 in total. The bat costs $1 more than the ball. How much does the ball cost?",
            choices: ["$0.05", "$0.10", "$0.15", "$0.01"],
            answer: "$0.05"
        },
        {
            question: "A farmer has 17 sheep and all but 9 die. How many sheep remain?",
            choices: ["8", "9", "17", "0"],
            answer: "9"
        },
        {
            question: "If you overtake the person in second place, what position are you in?",
            choices: ["First", "Second", "Third", "Last"],
            answer: "Second"
        },
        {
            question: "How many months have 28 days?",
            choices: ["1", "2", "6", "12"],
            answer: "12"
        },
        {
            question: "Which is heavier: a pound of feathers or a pound of bricks?",
            choices: ["Feathers", "Bricks", "Same weight", "Depends"],
            answer: "Same weight"
        },

        // ===== WORD & LATERAL =====
        {
            question: "What disappears the moment you say its name?",
            choices: ["Shadow", "Silence", "Breath", "Darkness"],
            answer: "Silence"
        },
        {
            question: "What comes once in a minute, twice in a moment, but never in a thousand years?",
            choices: ["Letter M", "Time", "Breath", "Second"],
            answer: "Letter M"
        },
        {
            question: "What can travel around the world while staying in a corner?",
            choices: ["Stamp", "Shadow", "Moon", "Cloud"],
            answer: "Stamp"
        },
        {
            question: "What has keys but no locks, space but no room?",
            choices: ["House", "Keyboard", "Map", "Book"],
            answer: "Keyboard"
        },
        {
            question: "What has a spine but no bones?",
            choices: ["Snake", "Book", "Leaf", "Fish"],
            answer: "Book"
        },

        // ===== RIDDLES =====
        {
            question: "I speak without a mouth and hear without ears. What am I?",
            choices: ["Echo", "Shadow", "Wind", "Fire"],
            answer: "Echo"
        },
        {
            question: "The more of me you take, the more you leave behind.",
            choices: ["Time", "Money", "Footsteps", "Memories"],
            answer: "Footsteps"
        },
        {
            question: "What gets wetter the more it dries?",
            choices: ["Sponge", "Towel", "Water", "Rain"],
            answer: "Towel"
        },
        {
            question: "What has hands but can’t clap?",
            choices: ["Robot", "Clock", "Mirror", "Statue"],
            answer: "Clock"
        },
        {
            question: "What has one eye but cannot see?",
            choices: ["Needle", "Storm", "Camera", "Blind man"],
            answer: "Needle"
        },

        // ===== HARDER =====
        {
            question: "The person who makes it sells it. The buyer never uses it. The user never knows. What is it?",
            choices: ["Coffin", "Medicine", "Will", "Bed"],
            answer: "Coffin"
        },
        {
            question: "I have cities with no houses, rivers with no water. What am I?",
            choices: ["Map", "Dream", "Painting", "Globe"],
            answer: "Map"
        },
        {
            question: "I grow when I eat, but die when I drink.",
            choices: ["Fire", "Rust", "Shadow", "Heat"],
            answer: "Fire"
        },
        {
            question: "You can keep it only after giving it away.",
            choices: ["Money", "Secret", "Promise", "Knowledge"],
            answer: "Promise"
        },
        {
            question: "What is always coming but never arrives?",
            choices: ["Tomorrow", "Future", "Time", "Death"],
            answer: "Tomorrow"
        },

        // ===== VERY HARD =====
        {
            question: "I exist only when there is light, but direct light kills me.",
            choices: ["Shadow", "Reflection", "Darkness", "Cloud"],
            answer: "Shadow"
        },
        {
            question: "I’m taken from a mine and locked in wood, used by everyone.",
            choices: ["Coal", "Diamond", "Pencil lead", "Gold"],
            answer: "Pencil lead"
        },
        {
            question: "The more you remove from me, the bigger I get.",
            choices: ["Hole", "Debt", "Shadow", "Darkness"],
            answer: "Hole"
        },
        {
            question: "I follow you all the time but never touch you.",
            choices: ["Shadow", "Time", "Thoughts", "Past"],
            answer: "Shadow"
        },
        {
            question: "What has a tongue but cannot taste and a bed but never sleeps?",
            choices: ["River", "Shoe", "Leaf", "Clock"],
            answer: "River"
        }

    ];

    // ================= DOM =================
    const startbtn = document.getElementById("start-btn");
    const nextbtn = document.getElementById("next-btn");
    const restartbtn = document.getElementById("restart-btn");
    const questioncontainer = document.getElementById("question-container");
    const questiontext = document.getElementById("question-text");
    const choicelist = document.getElementById("choiceslist");
    const resultcontainer = document.getElementById("result-container");
    const scoredisplay = document.getElementById("score");
    const feedback = document.getElementById("feedback");
    const timerDisplay = document.getElementById("timer");
    const progressDisplay = document.getElementById("progress");
    const difficultyDisplay = document.getElementById("difficulty");
    const difficultySelect = document.getElementById("difficulty-select");

    // ================= CONFIG =================
    const QUESTIONS_PER_GAME = 20;
    const TIME = { easy: 20, hard: 15, extreme: 10 };

    let gameQuestions = [];
    let index = 0;
    let score = 0;
    let timer;
    let timeLeft;
    let difficulty = "easy";

    // ================= HELPERS =================
    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

    function startTimer() {
        clearInterval(timer);
        timeLeft = TIME[difficulty];
        timerDisplay.textContent = `⏱ ${timeLeft}s`;

        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `⏱ ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                autoFail();
            }
        }, 1000);
    }

    function autoFail() {
        feedback.textContent = `⏰ Time up! Answer: ${gameQuestions[index].answer}`;
         lock();
        nextbtn.classList.remove("hidden");
    }

    function lock() {
        document.querySelectorAll("#choiceslist li")
            .forEach(li => li.style.pointerEvents = "none");
    }

    // ================= GAME =================
    startbtn.onclick = startQuiz;
    restartbtn.onclick = startQuiz;
    nextbtn.onclick = nextQuestion;

    function startQuiz() {
        difficulty = difficultySelect.value;
        difficultyDisplay.textContent = `Difficulty: ${difficulty.toUpperCase()}`;

        index = 0;
        score = 0;
        gameQuestions = shuffle(questions).slice(0, QUESTIONS_PER_GAME)
            .map(q => ({ ...q, choices: shuffle(q.choices) }));

        startbtn.classList.add("hidden");
        restartbtn.classList.add("hidden");
        resultcontainer.classList.add("hidden");
        questioncontainer.classList.remove("hidden");

        showQuestion();
    }

    function showQuestion() {
        clearInterval(timer);
        nextbtn.classList.add("hidden");
        feedback.textContent = "";

        const q = gameQuestions[index];
        questiontext.textContent = q.question;
        choicelist.innerHTML = "";
        progressDisplay.textContent = `Question ${index + 1} / ${gameQuestions.length}`;

        q.choices.forEach(choice => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.onclick = () => selectAnswer(choice, li);
            choicelist.appendChild(li);
        });

        startTimer();
    }

    function selectAnswer(choice, li) {
        clearInterval(timer);
        if (choice === gameQuestions[index].answer) {
            score++;
            feedback.textContent = "✔ Correct!";
        } else {
            feedback.textContent = `❌ Correct: ${gameQuestions[index].answer}`;
        }
        lock();
        nextbtn.classList.remove("hidden");
    }

    function nextQuestion() {
        index++;
        index < gameQuestions.length ? showQuestion() : endQuiz();
    }

    function endQuiz() {
        questioncontainer.classList.add("hidden");
        resultcontainer.classList.remove("hidden");

        const accuracy = Math.round((score / gameQuestions.length) * 100);
        const key = `best_${difficulty}`;
        const best = Math.max(score, localStorage.getItem(key) || 0);
        localStorage.setItem(key, best);

        scoredisplay.innerHTML = `
            Score: ${score}/${gameQuestions.length}<br>
            Accuracy: ${accuracy}%<br>
            Best (${difficulty}): ${best}
        `;

        restartbtn.classList.remove("hidden");
    }
});





