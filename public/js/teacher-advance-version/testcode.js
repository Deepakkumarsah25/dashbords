
const questions = window.questions || [];

let currentQuestion = 0;
let language = "en";
let timeLeft = (parseInt(window.testDuration, 10) || 60) * 60;

let timerInterval;
let quizStartTime = Date.now(); // ✅ ADD THIS


// ----------------- Load Question -----------------


function loadQuestion(index) {

    const q = questions[index];

    if (!q) return;

    // ✅ Question Text Support
    const questionText =
        q.question_en ||
        q.question_hi ||
        q.text ||
        "";

    // ✅ Options Support
    const options =
        q.options_en ||
        q.options_hi ||
        q.options ||
        [];

    // Question text
    document.getElementById("question").textContent =
        `Q${index + 1}. ${questionText}`;

    // Question counter
    document.getElementById("questionCounter").textContent =
        `Question ${index + 1} of ${questions.length}`;

    // Marks
    document.getElementById("questionMarks").textContent =
        "Marks: " + (q.points || 1);

    // Options
    const optionsElement =
        document.getElementById("options");

    optionsElement.innerHTML = "";

    options.forEach((opt, i) => {

        const optionText =
            typeof opt === "string"
                ? opt
                : (opt.text || "");

        const isSelected =
            q.selected === i;

        const div =
            document.createElement("div");

        div.className = "option-box";

        div.style = `
            border: 2px solid ${isSelected ? "#007bff" : "#ccc"};
            background-color: ${isSelected ? "#e7f1ff" : "white"};
            padding: 10px;
            border-radius: 8px;
            margin: 6px 0;
            cursor: pointer;
        `;

        div.innerHTML = `
            <input
                type="radio"
                name="option"
                value="${i}"
                ${isSelected ? "checked" : ""}
                style="margin-right:8px;"
            >

            ${optionText}
        `;

        div.addEventListener("click", () => {

            markAttempted(index, i);

            loadQuestion(index);

        });

        optionsElement.appendChild(div);

    });

    updateNavigation();
}


// ----------------- Attempt Mark -----------------
function markAttempted(index, selectedOptionIndex) {
    questions[index].attempted = true;
    questions[index].selected = selectedOptionIndex;
}


// ----------------- Next / Previous -----------------
function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion(currentQuestion);
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion(currentQuestion);
    }
}

function changeLanguage() {
    language = document.getElementById("languageSelect").value;
    loadQuestion(currentQuestion);
}

// ----------------- Final Submit -----------------
function submitQuiz() {

    // ===============================
    // CALCULATE REAL TIME TAKEN
    // ===============================
    const startTime =
        Number(localStorage.getItem("quizStartTime"));

    let timeTaken = "0 sec";

    if (startTime) {

        const endTime = Date.now();

        const diffSeconds =
            Math.floor((endTime - startTime) / 1000);

        timeTaken = diffSeconds + " sec";

        localStorage.setItem(
            "timeTaken",
            timeTaken
        );
    }

    // ===============================
    // IDS
    // ===============================
    const testId =
        document.getElementById("testId")?.value || "";

    const studentId =
        document.getElementById("studentId")?.value || "";

    let attempted = 0;
    let notAttempted = 0;
    let score = 0;

    // ===============================
    // SCORE + ANSWER SAVE
    // ===============================
    questions.forEach(q => {

        // ✅ SUPPORT ALL FORMATS
        const options =
            q.options ||
            q.options_en ||
            q.options_hi ||
            [];

        // ✅ FIND CORRECT ANSWER
        const correctOption =
            options.find(opt => opt.isCorrect);

        q.correctAnswer =
            typeof correctOption === "string"
                ? correctOption
                : (correctOption?.text || "");

        // ===========================
        // ATTEMPTED
        // ===========================
        if (q.attempted) {

            attempted++;

            const selectedOption =
                options[q.selected];

            // ✅ SAVE SELECTED ANSWER
            q.selectedAnswer =
                typeof selectedOption === "string"
                    ? selectedOption
                    : (selectedOption?.text || "");

            // ✅ CHECK CORRECT
            if (
                selectedOption &&
                selectedOption.isCorrect
            ) {

                score += (q.points || 1);

            }

        }

        // ===========================
        // NOT ATTEMPTED
        // ===========================
        else {

            notAttempted++;

            q.selectedAnswer =
                "Not Attempted";

        }

    });

    // ===============================
    // SAVE DATA
    // ===============================
    localStorage.setItem(
        "attempted",
        attempted
    );

    localStorage.setItem(
        "notAttempted",
        notAttempted
    );

    localStorage.setItem(
        "score",
        score
    );

    localStorage.setItem(
        "questions",
        JSON.stringify(questions)
    );

    localStorage.setItem(
        "timeTaken",
        timeTaken
    );

    console.log(
        "MODE:",
        studentId ? "STUDENT" : "TEACHER"
    );

    console.log({
        testId,
        studentId,
        score,
        attempted,
        notAttempted
    });

    // ===============================
    // 👨‍🏫 TEACHER PREVIEW MODE
    // ===============================
    if (!studentId) {

        localStorage.setItem(
            "previewMode",
            "teacher"
        );

        window.location.href =
            "/testsubmitedbyteacher/advance-submit-test.html";

        return;
    }

    // ===============================
    // 👨‍🎓 STUDENT REAL SUBMISSION
    // ===============================
    const confirmation =
        confirm(
            "Are you sure you want to submit the test?"
        );

    if (!confirmation) return;

    fetch("/student/submit-test", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            studentId,
            testId,
            score
        })

    })
        .then(res => res.text())

        .then(() => {

            window.location.href =
                "/TestSubmitedStudent/submit-student-test.html";

        })

        .catch(err => {

            console.error(
                "Submit Error:",
                err
            );

            alert("❌ Submit failed!");

        });
}
// ----------------- Navigation Circles -----------------
function updateNavigation() {
    const nav = document.getElementById("circleContainer");
    nav.innerHTML = "";

    questions.forEach((q, i) => {
        let color = "gray";
        if (i === currentQuestion) color = "blue";
        else if (q.attempted) color = "green";

        nav.innerHTML += `
            <div class="circle" style="background:${color};"
            onclick="jumpToQuestion(${i})">${i + 1}</div>
        `;
    });
}

function jumpToQuestion(index) {
    currentQuestion = index;
    loadQuestion(index);
}

// ----------------- Timer -----------------
function startTimer() {

    const timerElement = document.getElementById("timer");

    // ✅ Old timer clear
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {

        if (isNaN(timeLeft)) {
            console.error("⛔ timeLeft is NaN");
            clearInterval(timerInterval);
            return;
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
            return;
        }

        const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
        const seconds = String(timeLeft % 60).padStart(2, "0");

        timerElement.textContent =
            `Time Left: ${hours}:${minutes}:${seconds}`;

        timeLeft--;
    }, 1000);
}

// ----------------- Camera & Movement Detection -----------------
let videoStream;
let movementCount = 0;

function startCamera() {
    const container = document.createElement("div");
    container.id = "camera-container";
    container.style = `
        position:fixed; top:10px; left:10px; width:130px; height:130px;
        border-radius:50%; overflow:hidden; border:3px solid red; z-index:9999;
    `;

    document.body.appendChild(container);

    const video = document.createElement("video");
    video.autoplay = true;
    video.playsinline = true;
    video.style = "width:100%; height:100%; object-fit:cover;";
    container.appendChild(video);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            videoStream = stream;
            detectMovement(video);
        })
        .catch(() => alert("Camera access denied!"));
}

function detectMovement(video) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 160;
    canvas.height = 160;

    let lastData = null;

    setInterval(() => {
        ctx.drawImage(video, 0, 0, 160, 160);
        const data = ctx.getImageData(0, 0, 160, 160);

        if (lastData) {
            let diff = 0;
            for (let i = 0; i < data.data.length; i += 4) {
                diff += Math.abs(data.data[i] - lastData.data[i]);
            }

            if (diff > 1000000) {
                movementCount++;

                if (movementCount === 1) alert("⚠ Alert 1: No movement detected!");
                if (movementCount === 2) alert("⚠ Alert 2: Head not moving!");
                if (movementCount === 3) {
                    alert("⚠ Alert 3: Restarting test...");
                    restartTest();
                }
            }
        }
        lastData = data;

    }, 2000);
}

function restartTest() {
    if (videoStream) videoStream.getTracks().forEach(t => t.stop());

    const cam = document.getElementById("camera-container");
    if (cam) cam.remove();

    movementCount = 0;
    currentQuestion = 0;
    timeLeft = (parseInt(window.testDuration, 10) || 60) * 60;

    questions.forEach(q => {
        q.attempted = false;
        q.selected = null;
    });

    // reset timer start
    quizStartTime = Date.now();
    localStorage.setItem("quizStartTime", quizStartTime);

    loadQuestion(0);
    startTimer();
    startCamera();
}


// ----------------- Page Load -----------------
window.onload = function () {
    if (questions.length === 0) {
        alert("No Questions Loaded");
        return;
    }

    // ✅ Save quiz start time
    quizStartTime = Date.now();
    localStorage.setItem("quizStartTime", quizStartTime);

    loadQuestion(currentQuestion);
    startTimer();
    startCamera();
};
// ----------------- Tab Change Detection -----------------
let tabChangeCount = 0;

document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        tabChangeCount++;

        if (tabChangeCount === 1) {
            alert("⚠ Warning: Do not change tab during the test.");
        } 
        else if (tabChangeCount >= 2) {
            alert("❌ Tab changed again. Test is being submitted.");

            if (timerInterval) {
                clearInterval(timerInterval);
            }

            submitQuiz();
        }
    }
});


function backToTestService() {
    window.history.back();
}

// ----------------- Auto Submit on Page Exit -----------------
window.addEventListener("beforeunload", function (e) {

    // Agar already submit ho chuka hai to dobara mat karo
    if (localStorage.getItem("quizSubmitted") === "true") return;

    // Mark as submitted (duplicate submit avoid)
    localStorage.setItem("quizSubmitted", "true");

    // Timer stop
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Silent submit (without confirmation)
    submitQuiz();

    // Optional browser message (some browsers ignore this)
    e.preventDefault();
    e.returnValue = '';
});