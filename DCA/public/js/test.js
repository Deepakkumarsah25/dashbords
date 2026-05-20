function addTempQuestion() {
    const text = document.getElementById('questionText').value.trim();
    const optA = document.getElementById('optA').value.trim();
    const optB = document.getElementById('optB').value.trim();
    const optC = document.getElementById('optC').value.trim();
    const optD = document.getElementById('optD').value.trim();
    const correctLetter = document.getElementById('correctAnswer').value;

    if(!text || !optA || !optB || !optC || !optD) {
        showToast("Fill all fields");
        return;
    }

    let correctIndex = { A:0, B:1, C:2, D:3 }[correctLetter];

    const newQuestion = {
        text,
        options: [optA, optB, optC, optD],
        correctAnswer: correctLetter
    };

    // ✅ 1. Save in MongoDB (REAL-TIME)
    fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuestion)
    })
    .then(res => res.json())
    .then(data => console.log("Saved in DB:", data))
    .catch(err => console.error("DB error:", err));

    // ✅ 2. Save in temp (for test)
    tempQuestions.push({
        text,
        options: [optA, optB, optC, optD],
        correctIndex
    });

    // Reset inputs
    document.getElementById('questionText').value = '';
    document.getElementById('optA').value = '';
    document.getElementById('optB').value = '';
    document.getElementById('optC').value = '';
    document.getElementById('optD').value = '';

    renderTempQuestions();
    showToast("✅ Question saved to database");
}