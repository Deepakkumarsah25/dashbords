
// State management
const state = {
    paymentCompleted: false,
    tests: [],
    templates: [],
    questions: [],
    currentTestQuestions: [],
    students: [],
    currentSection: 'payment-section',
    selectedColor: "#e34f26",
    dashboardAnimationsPlayed: false,
    profilePhoto: null,
    editingQuestionId: null,
    editingTestId: null
};

// Course Data
const coursesData = [

];

// Test Services Data for each course
const testServicesData = {
};
// DOM Elements
const paymentSection = document.getElementById('payment-section');
const dashboardSection = document.getElementById('dashboard-section');
const createTestSection = document.getElementById('create-test-section');
const testServicesSection = document.getElementById('test-services-section');
const templatesSection = document.getElementById('templates-section');
const pythonServiceSection = document.getElementById('python-service-section');
const analyticsSection = document.getElementById('analytics-section');
const settingsSection = document.getElementById('settings-section');
const researchSection = document.getElementById('research-section');
const notesSection = document.getElementById('notes-section');
const previousSection = document.getElementById('previous-section');
const syllabusSection = document.getElementById('syllabus-section');
const navSyllabus = document.getElementById('nav-syllabus');
const syllabusLock = document.getElementById('syllabus-lock');
const gotoPaymentFromSyllabus = document.getElementById('goto-payment-from-syllabus');
const calculatorSection = document.getElementById('calculator-section');
const calendarSection = document.getElementById('calendar-section');
const alertsSection = document.getElementById('alerts-section');
const navAlerts = document.getElementById('nav-alerts');
const alertsLock = document.getElementById('alerts-lock');
const gotoPaymentFromAlerts = document.getElementById('goto-payment-from-alerts');
const sendEmailBtn = document.getElementById('send-email-btn');
const navCalendar = document.getElementById('nav-calendar');
const calendarLock = document.getElementById('calendar-lock');
const gotoPaymentFromCalendar = document.getElementById('goto-payment-from-calendar');
const navCalculator = document.getElementById('nav-calculator');
const calculatorLock = document.getElementById('calculator-lock');
const gotoPaymentFromCalculator = document.getElementById('goto-payment-from-calculator');
const navPrevious = document.getElementById('nav-previous');
const previousLock = document.getElementById('previous-lock');
const gotoPaymentFromPrevious = document.getElementById('goto-payment-from-previous');
const navNotes = document.getElementById('nav-notes');
const notesLock = document.getElementById('notes-lock');
const gotoPaymentFromNotes = document.getElementById('goto-payment-from-notes');
const navResearch = document.getElementById('nav-research');
const researchLock = document.getElementById('research-lock');
const gotoPaymentFromResearch = document.getElementById('goto-payment-from-research');
const navPayment = document.getElementById('nav-payment');
const navDashboard = document.getElementById('nav-dashboard');
const navTests = document.getElementById('nav-tests-sidebar');
const navTemplates = document.getElementById('nav-templates-sidebar');
const navPython = document.getElementById('nav-python-sidebar');
const navTestServices = document.getElementById('nav-test-services');
const navStudents = document.getElementById('nav-students');
const studentsSection = document.getElementById('students-section');
const studentsLock = document.getElementById('students-lock');
const navAnalytics = document.getElementById('nav-analytics');
const navSettings = document.getElementById('nav-settings');
const makePaymentBtn = document.getElementById('make-payment');
const testForm = document.getElementById('test-creation-form');
const accountStatus = document.getElementById('account-status');
const currentStatus = document.getElementById('current-status');
const settingsAccountType = document.getElementById('settings-account-type');
// Test Services Elements
const coursesContainer = document.getElementById('courses-container');
const testServicesMainDashboard = document.getElementById('test-services-main-dashboard');
const testServicesPage = document.getElementById('test-services-page');
const testServicesContainer = document.getElementById('test-services-container');
const backToDashboardBtn = document.getElementById('back-to-dashboard');
const serviceTitle = document.getElementById('service-title');
const serviceDescription = document.getElementById('service-description');
const serviceIcon = document.getElementById('service-icon');
const serviceHeader = document.getElementById('service-header');
const servicePageTitle = document.getElementById('service-page-title');
const serviceFooterText = document.getElementById('service-footer-text');
// Lock overlays
const dashboardLock = document.getElementById('dashboard-lock');
const createTestLock = document.getElementById('create-test-lock');
const testServicesLock = document.getElementById('test-services-lock');
const templatesLock = document.getElementById('templates-lock');
const pythonServiceLock = document.getElementById('python-service-lock');
const analyticsLock = document.getElementById('analytics-lock');
const settingsLock = document.getElementById('settings-lock');
// Go to payment buttons
const gotoPaymentFromDashboard = document.getElementById('goto-payment-from-dashboard');
const gotoPaymentFromTests = document.getElementById('goto-payment-from-tests');
const gotoPaymentFromTestServices = document.getElementById('goto-payment-from-test-services');
const gotoPaymentFromTemplates = document.getElementById('goto-payment-from-templates');
const gotoPaymentFromPython = document.getElementById('goto-payment-from-python');
const gotoPaymentFromAnalytics = document.getElementById('goto-payment-from-analytics');
const gotoPaymentFromSettings = document.getElementById('goto-payment-from-settings');
const gotoPaymentFromStudents = document.getElementById('goto-payment-from-students');
// Statistics elements
const totalTestsElement = document.getElementById('total-tests');
const totalQuestionsElement = document.getElementById('total-questions');
const activeTemplatesElement = document.getElementById('active-templates');
const templateTestCountElement = document.getElementById('template-test-count');
const templateQuestionCountElement = document.getElementById('template-question-count');
const templateSubjectCountElement = document.getElementById('template-subject-count');
// New elements for Create Test Card feature
const createTestCardBtn = document.getElementById('create-test-card-btn');
const totalCoursesCountElement = document.getElementById('total-courses-count');
const footerCoursesCountElement = document.getElementById('footer-courses-count');
// Quick create elements
const quickTestNameInput = document.getElementById('quick-test-name');
const quickSubjectInput = document.getElementById('quick-subject');
const quickCreateBtn = document.getElementById('quick-create-btn');
const colorOptions = document.getElementById('color-options');
// Translator elements
const translatorFromLang = document.getElementById('translator-from-lang');
const translatorToLang = document.getElementById('translator-to-lang');
const translatorInputText = document.getElementById('translator-input-text');
const translatorOutputText = document.getElementById('translator-output-text');
const translatorVoiceBtn = document.getElementById('translator-voice-btn');
const translatorSpeakBtn = document.getElementById('translator-speak-btn');
const translatorTranslateBtn = document.getElementById('translator-translate-btn');
const translatorSwapBtn = document.getElementById('translator-swap-btn');
const translatorClearBtn = document.getElementById('translator-clear-btn');
const translatorHistoryList = document.getElementById('translator-history-list');
// Question management elements
const manageQuestionsBtn = document.getElementById('manage-questions-btn');
const questionCountElement = document.getElementById('question-count');
const addStudentBtn = document.getElementById('add-student-btn');
const addStudentModal = document.getElementById('addStudentModal');
const addStudentForm = document.getElementById('add-student-form');
const studentsTableBody = document.getElementById('students-table-body');
const studentSearchInput = document.getElementById('student-search');
const studentFirstNameInput = document.getElementById('student-first-name');
const studentLastNameInput = document.getElementById('student-last-name');
const studentEmailInput = document.getElementById('student-email-input');
const studentClassInput = document.getElementById('student-class');
const studentRollInput = document.getElementById('student-roll');
const studentParentContactInput = document.getElementById('student-parent-contact');
const questionPreviewElement = document.getElementById('question-preview');
const createTestModal = document.getElementById('createTestModal');
const questionListElement = document.getElementById('questionList');
const questionTypeElement = document.getElementById('questionType');
const questionTextElement = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const optionsList = document.getElementById('optionsList');
const addOptionBtn = document.getElementById('addOptionBtn');
const questionPointsElement = document.getElementById('questionPoints');
const addQuestionBtn = document.getElementById('addQuestionBtn');
const saveQuestionsBtn = document.getElementById('saveQuestionsBtn');
const questionDifficultyElement = document.getElementById('questionDifficulty');
// Dashboard Animation Elements
const testsProgress = document.getElementById('tests-progress');
const questionsProgress = document.getElementById('questions-progress');
const templatesProgress = document.getElementById('templates-progress');
const testsProgressValue = document.getElementById('tests-progress-value');
const questionsProgressValue = document.getElementById('questions-progress-value');
const templatesProgressValue = document.getElementById('templates-progress-value');
const testsProgressText = document.getElementById('tests-progress-text');
const questionsProgressText = document.getElementById('questions-progress-text');
const templatesProgressText = document.getElementById('templates-progress-text');
const activityChart = document.getElementById('activity-chart');
// Settings elements
const profileImage = document.getElementById('profile-image');
const avatarIcon = document.getElementById('avatarIcon');
const userAvatar = document.getElementById('userAvatar');
const uploadProfileBtn = document.getElementById('uploadProfileBtn');
const profilePhotoInput = document.getElementById('profile-photo-input');
const saveProfileBtn = document.getElementById('save-profile-btn');
// Mobile sidebar elements
const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

// Initialize the app
function initApp() {
    // Check if payment was previously completed
    const savedPayment = localStorage.getItem('teacherPaymentCompleted');
    if (savedPayment === 'true') {
        state.paymentCompleted = true;
        unlockAllFeatures();
        showDashboard();
    } else {
        lockAllFeatures();
        showPaymentSection();
    }

    // Load saved templates
    const savedTemplates = localStorage.getItem('teacherTemplates');
    if (savedTemplates) {
        state.templates = JSON.parse(savedTemplates);
    }

    // Load saved questions
    const savedQuestions = localStorage.getItem('teacherQuestions');
    if (savedQuestions) {
        state.questions = JSON.parse(savedQuestions);
    }

    // Load students passed from server
    if (typeof initialStudents !== 'undefined') {
        state.students = initialStudents.map(student => ({
            ...student,
            className: student.class || student.className || ''
        }));
    }

    // Load profile photo
    const savedProfilePhoto = localStorage.getItem('profilePhoto');
    if (savedProfilePhoto) {
        state.profilePhoto = savedProfilePhoto;
        updateProfilePhoto(savedProfilePhoto);
    }

    // Initialize test services
    renderCourses();

    // Set up event listeners
    setupEventListeners();

    // Initialize question management
    initializeQuestionManagement();

    // Initialize chart
    renderActivityChart();

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Initialize mobile sidebar
    setupMobileSidebar();

    // ✅ IMPORTANT: Load tests from database
    loadTestsFromDB();

    // ✅ ADD THESE TWO LINES HERE (theme system)
    loadSavedTheme();
    setupThemeControls();
    attachTranslatorEvents();
}


// Update profile photo
function updateProfilePhoto(photoData) {
    if (photoData) {
        profileImage.src = photoData;
        profileImage.style.display = 'block';

        // Update user avatar in header
        const avatarImg = document.createElement('img');
        avatarImg.src = photoData;
        avatarImg.alt = 'Profile Photo';

        // Clear existing content
        userAvatar.innerHTML = '';
        userAvatar.appendChild(avatarImg);
        avatarIcon.style.display = 'none';
    }
}

// Setup mobile sidebar functionality
function setupMobileSidebar() {
    if (toggleBtn && sidebar && sidebarOverlay) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('show');
            sidebarOverlay.classList.toggle('show');
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('show');
            sidebarOverlay.classList.remove('show');
        });
    }


    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('show');
        sidebarOverlay.classList.remove('show');
    });

    // Close sidebar when clicking on a nav item (mobile)
    document.querySelectorAll('.nav-item a').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
                sidebarOverlay.classList.remove('show');
            }
        });
    });
}

// Handle window resize
function handleResize() {
    // Re-render chart on resize
    if (state.currentSection === 'dashboard-section') {
        renderActivityChart();
    }

    // Close sidebar on desktop
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
        sidebarOverlay.classList.remove('show');
    }
}

// Initialize question management
// function initializeQuestionManagement() {
//     state.currentTestQuestions = [];
//     updateQuestionPreview();
// }

function initializeQuestionManagement(isEdit = false) {
    if (!isEdit) {
        state.currentTestQuestions = [];
    }
}



// Render activity chart
function renderActivityChart() {
    // Sample data for the chart
    const chartData = [
        { month: 'Jan', value: 12 },
        { month: 'Feb', value: 19 },
        { month: 'Mar', value: 8 },
        { month: 'Apr', value: 15 },
        { month: 'May', value: 22 },
        { month: 'Jun', value: 18 },
        { month: 'Jul', value: 25 }
    ];

    // Find max value for scaling
    const maxValue = Math.max(...chartData.map(item => item.value));

    activityChart.innerHTML = '';

    chartData.forEach((item, index) => {
        // Calculate height as percentage of max value
        const heightPercentage = (item.value / maxValue) * 100;

        const chartBar = document.createElement('div');
        chartBar.className = 'chart-bar';
        chartBar.style.height = `${heightPercentage}%`;
        chartBar.style.animationDelay = `${index * 0.1}s`;

        chartBar.innerHTML = `
                    <div class="chart-value">${item.value}</div>
                    <div class="chart-label">${item.month}</div>
                `;

        activityChart.appendChild(chartBar);
    });
}

// Lock all features (payment not completed)
function lockAllFeatures() {
    // Update UI to show locked state
    accountStatus.textContent = "Free Account";
    currentStatus.textContent = "Free Account (Limited Features)";
    settingsAccountType.textContent = "Free Account";
    currentStatus.style.color = "#e74c3c";

    // Show lock overlays
    if (dashboardLock) dashboardLock.style.display = 'flex';
    if (createTestLock) createTestLock.style.display = 'flex';
    if (testServicesLock) testServicesLock.style.display = 'flex';
    if (templatesLock) templatesLock.style.display = 'flex';
    if (pythonServiceLock) pythonServiceLock.style.display = 'flex';
    if (analyticsLock) analyticsLock.style.display = 'flex';
    if (studentsLock) studentsLock.style.display = 'flex';
    if (settingsLock) settingsLock.style.display = 'flex';
    if (notesLock) notesLock.style.display = 'flex';
    if (previousLock) previousLock.style.display = 'flex';
    if (syllabusLock) syllabusLock.style.display = 'flex';
    if (calculatorLock) calculatorLock.style.display = 'flex';
    if (calendarLock) calendarLock.style.display = 'flex';
    if (alertsLock) alertsLock.style.display = 'flex';

    // Disable all form elements
    disableFormElements();

    // Update navigation items to show locked state
    document.querySelectorAll('.nav-item:not(#nav-payment)').forEach(item => {
        item.classList.add('locked');
        const lockIcon = item.querySelector('.lock-icon');
        if (lockIcon) lockIcon.style.display = 'block';
    });

    // Enable only payment navigation
    navPayment.classList.remove('locked');
    navPayment.classList.add('active');
}

// Unlock all features (payment completed)
function unlockAllFeatures() {
    // Update UI to show unlocked state
    accountStatus.textContent = "Premium Account";
    accountStatus.style.color = "#27ae60";
    currentStatus.textContent = "Premium Account (All Features Unlocked)";
    settingsAccountType.textContent = "Premium Account";
    currentStatus.style.color = "#27ae60";

    // Hide lock overlays
    if (dashboardLock) dashboardLock.style.display = 'none';
    if (createTestLock) createTestLock.style.display = 'none';
    if (testServicesLock) testServicesLock.style.display = 'none';
    if (templatesLock) templatesLock.style.display = 'none';
    if (pythonServiceLock) pythonServiceLock.style.display = 'none';
    if (analyticsLock) analyticsLock.style.display = 'none';
    if (studentsLock) studentsLock.style.display = 'none';
    if (settingsLock) settingsLock.style.display = 'none';
    if (researchLock) researchLock.style.display = 'none';
    if (notesLock) notesLock.style.display = 'none';
    if (previousLock) previousLock.style.display = 'none';
    if (syllabusLock) syllabusLock.style.display = 'none';
    if (calculatorLock) calculatorLock.style.display = 'none';
    if (calendarLock) calendarLock.style.display = 'none';
    if (alertsLock) alertsLock.style.display = 'none';

    // Enable all form elements
    enableFormElements();

    // Update navigation items to show unlocked state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('locked');
        const lockIcon = item.querySelector('.lock-icon');
        if (lockIcon) lockIcon.style.display = 'none';
    });

    // Show success notification
    // showNotification('All features unlocked successfully!', 'success');
}

// Disable all form elements
function disableFormElements() {
    // Disable test form inputs
    document.querySelectorAll('#test-creation-form input, #test-creation-form select, #test-creation-form textarea').forEach(el => {
        el.disabled = true;
    });

    // Disable quick create inputs
    quickTestNameInput.disabled = true;
    quickSubjectInput.disabled = true;
    quickCreateBtn.disabled = true;
    quickCreateBtn.classList.add('disabled');

    // Disable buttons
    document.querySelectorAll('#test-creation-form button, #refresh-tests, #view-all-tests').forEach(btn => {
        btn.disabled = true;
        btn.classList.add('disabled');
    });

    // Disable settings elements
    uploadProfileBtn.disabled = true;
    document.querySelectorAll('#settings-section input, #settings-section select').forEach(el => {
        el.disabled = true;
    });
    saveProfileBtn.disabled = true;
}

// Enable all form elements
function enableFormElements() {
    // Enable test form inputs
    document.querySelectorAll('#test-creation-form input, #test-creation-form select, #test-creation-form textarea').forEach(el => {
        el.disabled = false;
    });

    // Enable quick create inputs
    quickTestNameInput.disabled = false;
    quickSubjectInput.disabled = false;
    quickCreateBtn.disabled = false;
    quickCreateBtn.classList.remove('disabled');

    // Enable buttons
    document.querySelectorAll('#test-creation-form button, #refresh-tests, #view-all-tests').forEach(btn => {
        btn.disabled = false;
        btn.classList.remove('disabled');
    });

    // Enable question management button
    manageQuestionsBtn.disabled = false;
    manageQuestionsBtn.style.backgroundColor = '#3498db';
    manageQuestionsBtn.style.color = 'white';
    manageQuestionsBtn.onclick = openQuestionModal;

    // Enable settings elements
    uploadProfileBtn.disabled = false;
    document.querySelectorAll('#settings-section input, #settings-section select').forEach(el => {
        el.disabled = false;
    });
    saveProfileBtn.disabled = false;
}

// Set up all event listeners
function setupEventListeners() {
    // Navigation - with payment check
    navPayment.addEventListener('click', () => showPaymentSection());

    navDashboard.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showDashboard();
        } else {
            alert('Please complete payment first to access the dashboard.');
            showPaymentSection();
        }
    });

    navTests.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showCreateTestSection();
        } else {
            alert('Please complete payment first to create tests.');
            showPaymentSection();
        }
    });

    navTestServices.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showTestServicesSection();
        } else {
            alert('Please complete payment first to access Test Services.');
            showPaymentSection();
        }
    });

    navStudents.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showStudentsSection();
        } else {
            alert('Please complete payment first to access Students.');
            showPaymentSection();
        }
    });

    navTemplates.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showTemplatesSection();
        } else {
            alert('Please complete payment first to access templates.');
            showPaymentSection();
        }
    });

    navPython.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showPythonServiceSection();
        } else {
            alert('Please complete payment first to access Python Test Service.');
            showPaymentSection();
        }
    });

    navAnalytics.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showAnalyticsSection();
        } else {
            alert('Please complete payment first to access Analytics.');
            showPaymentSection();
        }
    });

    navSettings.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showSettingsSection();
        } else {
            alert('Please complete payment first to access Settings.');
            showPaymentSection();
        }
    });
    navResearch.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showResearchSection();
        } else {
            alert('Please complete payment first to access Research Papers.');
            showPaymentSection();
        }
    });
    navNotes.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showNotesSection();
        } else {
            alert('Please complete payment first to access Notes.');
            showPaymentSection();
        }
    });
    navPrevious.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showPreviousSection();
        } else {
            alert('Please complete payment first to access Previous Papers.');
            showPaymentSection();
        }
    });
    navSyllabus.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showSyllabusSection();
        } else {
            alert('Please complete payment first.');
            showPaymentSection();
        }
    });

    navCalculator.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showCalculatorSection();
        } else {
            alert('Please complete payment first.');
            showPaymentSection();
        }
    });
    navCalendar.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showCalendarSection();
        } else {
            alert('Please complete payment first.');
            showPaymentSection();
        }
    });
    navAlerts.addEventListener('click', () => {
        if (state.paymentCompleted) {
            showAlertsSection();
        } else {
            alert('Please complete payment first.');
            showPaymentSection();
        }
    });
    const topNavAlerts = document.getElementById('top-nav-alerts');

    if (topNavAlerts) {
        topNavAlerts.addEventListener('click', (e) => {
            e.preventDefault();
            navAlerts.click();
        });
    }


    gotoPaymentFromAlerts.addEventListener('click', showPaymentSection);
    gotoPaymentFromCalendar.addEventListener('click', showPaymentSection);
    gotoPaymentFromSyllabus.addEventListener('click', showPaymentSection);
    gotoPaymentFromCalculator.addEventListener('click', showPaymentSection);
    gotoPaymentFromPrevious.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromNotes.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromResearch.addEventListener('click', () => showPaymentSection());
    // Payment
    makePaymentBtn.addEventListener('click', processPayment);
    // Go to payment buttons
    gotoPaymentFromDashboard.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromTests.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromTestServices.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromTemplates.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromPython.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromAnalytics.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromSettings.addEventListener('click', () => showPaymentSection());
    gotoPaymentFromStudents.addEventListener('click', () => showPaymentSection());

    addStudentBtn.addEventListener('click', () => {
        if (state.paymentCompleted) {
            addStudentModal.style.display = 'flex';
        } else {
            alert('Please complete payment first to add students.');
            showPaymentSection();
        }
    });

    addStudentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (state.paymentCompleted) {
            handleAddStudent();
        } else {
            alert('Please complete payment first to add students.');
            showPaymentSection();
        }
    });

    studentSearchInput?.addEventListener('input', filterStudentsTable);

    // Test form - only if payment completed
    testForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (state.paymentCompleted) {
            createTest(e);
        } else {
            alert('Please complete payment first to create tests.');
            showPaymentSection();
        }
    });

    document.getElementById('reset-form').addEventListener('click', function () {
        if (state.paymentCompleted) {
            resetTestForm();
        } else {
            alert('Please complete payment first to use this feature.');
        }
    });

    // Create Test Card button
    createTestCardBtn.addEventListener('click', function () {
        if (state.paymentCompleted) {
            createTestCardFromForm();
        } else {
            alert('Please complete payment first to create test cards.');
            showPaymentSection();
        }
    });

    // Quick Create button
    quickCreateBtn.addEventListener('click', function () {
        if (state.paymentCompleted) {
            createQuickTestCard();
        } else {
            alert('Please complete payment first to create test cards.');
            showPaymentSection();
        }
    });

    // Color selection
    colorOptions.addEventListener('click', function (e) {
        if (e.target.classList.contains('color-option')) {
            // Remove selected class from all color options
            document.querySelectorAll('.color-option').forEach(option => {
                option.classList.remove('selected');
            });

            // Add selected class to clicked option
            e.target.classList.add('selected');

            // Update selected color
            state.selectedColor = e.target.getAttribute('data-color');
        }
    });

    // Test Services back button
    backToDashboardBtn.addEventListener('click', function () {
        testServicesMainDashboard.style.display = 'block';
        testServicesPage.style.display = 'none';
    });

    // Test Services details buttons (event delegation)
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-test-icon')) {
            const testId = e.target.dataset.id;

            if (!confirm("Delete this test?")) return;

            fetch(`/teacher-tests/delete/${testId}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {

                        // 🔥 FULL RELOAD (BEST)
                        loadTestsFromDB();

                        showNotification("Test deleted", "success");
                    }
                });
        }
        const editBtn = e.target.closest('.edit-btn');

        if (editBtn) {
            const testId = editBtn.dataset.id;

            console.log("Edit Clicked:", testId);

            fetch(`/teacher-tests/api/${testId}`)
                .then(res => res.json())
                .then(test => {
                    openTestForEdit(test);
                });
        }

        if (e.target.classList.contains('details-btn') || e.target.closest('.details-btn')) {
            if (!state.paymentCompleted) {
                alert('Please complete payment first to access Test Services.');
                showPaymentSection();
                return;
            }

            const button = e.target.classList.contains('details-btn') ? e.target : e.target.closest('.details-btn');
            const courseName = button.getAttribute('data-course');
            showTestServicesPage(courseName);
        }

        // View button
        if (e.target.classList.contains('view-btn') || e.target.closest('.view-btn')) {
            const button = e.target.classList.contains('view-btn')
                ? e.target
                : e.target.closest('.view-btn');

            const testId = button.getAttribute('data-id');
            window.location.href = `/teacher-tests/view/${testId}`;
        }

        // Enroll buttons
        if (e.target.classList.contains('enroll-btn') || e.target.closest('.enroll-btn')) {
            const button = e.target.classList.contains('enroll-btn') ? e.target : e.target.closest('.enroll-btn');
            const card = button.closest('.test-service-card');
            const testName = card.querySelector('.test-service-name').textContent;

        }
        // View button
        if (e.target.classList.contains('view-btn') || e.target.closest('.view-btn')) {
            const button = e.target.classList.contains('view-btn')
                ? e.target
                : e.target.closest('.view-btn');

            const testId = button.getAttribute('data-id');
            window.location.href = `/teacher-tests/view/${testId}`;
        }

        // ✅ RESULT BUTTON (ADD THIS HERE)
        // RESULT BUTTON → open analytics section
        if (e.target.classList.contains('result-btn') || e.target.closest('.result-btn')) {
            const button = e.target.closest('.result-btn');
            const testId = button.dataset.id;

            // analytics section open karo
            showAnalyticsSection();

            // analytics load karo specific test ke liye
            loadAnalyticsCards();

            // optionally testId store kar lo
            state.currentAnalyticsTest = testId;
        }


    });

    // Question Management
    addQuestionBtn.addEventListener('click', addQuestion);
    // ✅ Desktop click
// Desktop
function handleSaveAll(e) {

    e.preventDefault();
    e.stopPropagation();

    if (saveQuestionsBtn.dataset.loading === "true") return;

    saveQuestionsBtn.dataset.loading = "true";

    saveQuestionsBtn.disabled = true;

    // SAVE QUESTIONS
    saveQuestions();

    // ✅ FORCE CLOSE MODAL
    const modal = document.getElementById('createTestModal');

    modal.style.display = "none";
    modal.classList.remove("show");

    document.body.style.overflow = "auto";

    // ✅ BACK TO FIRST PAGE
    hideAllSections();

    createTestSection.classList.remove("hidden");

    state.currentSection = 'create-test-section';

    // ✅ SCROLL TOP
    window.scrollTo(0, 0);

    // ENABLE AGAIN
    setTimeout(() => {

        saveQuestionsBtn.disabled = false;

        delete saveQuestionsBtn.dataset.loading;

    }, 1000);
}

// EVENTS
saveQuestionsBtn.onclick = handleSaveAll;

saveQuestionsBtn.addEventListener("touchend", function (e) {

    e.preventDefault();

    handleSaveAll(e);

}, { passive: false });

// ✅ IMPORTANT
saveQuestionsBtn.addEventListener("click", handleSaveAll);

saveQuestionsBtn.addEventListener("touchend", handleSaveAll, {
    passive: false
});

    addOptionBtn.addEventListener('click', addOption);
    questionTypeElement.addEventListener('change', handleQuestionTypeChange);

    // Profile photo upload
    uploadProfileBtn.addEventListener('click', () => {
        profilePhotoInput.click();
    });

    profilePhotoInput.addEventListener('change', handleProfilePhotoUpload);
    saveProfileBtn.addEventListener('click', saveProfileSettings);

    // Modal close on outside click
    window.addEventListener('click', function (e) {
        if (e.target === createTestModal) {
            closeModal('createTestModal');
        }
    });

    // Top navbar elements
    const topNavTests = document.getElementById('top-nav-tests');
    const topNavTemplates = document.getElementById('top-nav-templates');
    const topNavPython = document.getElementById('top-nav-python');
    const topNavResearch = document.getElementById('top-nav-research');
    const topNavCalculator = document.getElementById('top-nav-calculator');
    const topNavBirthday = document.getElementById('top-nav-birthday');

    // Same actions as sidebar
    if (topNavTests) {
        topNavTests.addEventListener('click', (e) => {
            e.preventDefault();
            navTests.click();
        });
    }

    if (topNavTemplates) {
        topNavTemplates.addEventListener('click', (e) => {
            e.preventDefault();
            navTemplates.click();
        });
    }

    if (topNavPython) {
        topNavPython.addEventListener('click', (e) => {
            e.preventDefault();
            navPython.click();
        });
    }

    if (topNavResearch) {
        topNavResearch.addEventListener('click', (e) => {
            e.preventDefault();
            navResearch.click();
        });
    }

    if (topNavCalculator) {
        topNavCalculator.addEventListener('click', (e) => {
            e.preventDefault();
            navCalculator.click();
        });
    }

    if (topNavBirthday) {
        topNavBirthday.addEventListener('click', (e) => {
            e.preventDefault();
            const birthdayLink = document.querySelector('#nav-birthday a');
            if (birthdayLink) {
                birthdayLink.click();
            } else {
                window.location.href = '/rts/birthday-software';
            }
        });
    }

}
if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', async () => {
        const studentEmail = document.getElementById('student-email').value;
        const subject = document.getElementById('email-subject').value;
        const message = document.getElementById('email-message').value;

        if (!studentEmail || !subject || !message) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ studentEmail, subject, message })
            });

            const data = await res.json();

            if (data.success) {
                alert("Email sent successfully!");
                document.getElementById('student-email').value = "";
                document.getElementById('email-subject').value = "";
                document.getElementById('email-message').value = "";
            } else {
                alert("Email failed.");
            }
        } catch (err) {
            console.error(err);
            alert("Server error.");
        }
    });
}



// Handle profile photo upload
function handleProfilePhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image.*')) {
        alert('Please select an image file.');
        return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
        const photoData = event.target.result;
        state.profilePhoto = photoData;

        // Update UI
        updateProfilePhoto(photoData);

        // Save to localStorage
        localStorage.setItem('profilePhoto', photoData);

        showNotification('Profile photo updated successfully!', 'success');
    };

    reader.readAsDataURL(file);
}

// Save profile settings
function saveProfileSettings() {
    // In a real app, you would send this to a server
    showNotification('Profile settings saved successfully!', 'success');
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
                <div style="position: fixed; top: 80px; right: 20px; left: 20px; background-color: ${type === 'success' ? '#27ae60' : '#3498db'}; color: white; padding: 12px 15px; border-radius: 5px; box-shadow: 0 3px 10px rgba(0,0,0,0.2); z-index: 1000; display: flex; align-items: center; gap: 10px; font-size: 0.9rem;">
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Show payment section
function showPaymentSection() {
    hideAllSections();
    paymentSection.classList.remove('hidden');
    updateActiveNav('nav-payment');
    state.currentSection = 'payment-section';
}

// Show dashboard section with animations
function showDashboard() {
    hideAllSections();
    dashboardSection.classList.remove('hidden');
    updateActiveNav('nav-dashboard');
    state.currentSection = 'dashboard-section';

    // ✅ Real DB stats load karo
    loadDashboardStats();

    if (!state.dashboardAnimationsPlayed) {
        setTimeout(() => {
            animateDashboard();
            state.dashboardAnimationsPlayed = true;
        }, 300);
    }
}

// Show create test section
function showCreateTestSection() {
    hideAllSections();
    createTestSection.classList.remove('hidden');
    updateActiveNav('nav-tests');
    state.currentSection = 'create-test-section';
}

// Show test services section
function showTestServicesSection() {
    hideAllSections();
    testServicesSection.classList.remove('hidden');
    updateActiveNav('nav-test-services');
    state.currentSection = 'test-services-section';

    // Ensure test services dashboard is visible
    testServicesMainDashboard.style.display = 'block';
    testServicesPage.style.display = 'none';
}

// Show templates section
function showTemplatesSection() {
    hideAllSections();
    templatesSection.classList.remove('hidden');
    updateActiveNav('nav-templates');
    state.currentSection = 'templates-section';
}

// Show Python service section
function showPythonServiceSection() {
    hideAllSections();
    pythonServiceSection.classList.remove('hidden');
    updateActiveNav('nav-python-sidebar');
    state.currentSection = 'python-service-section';
}

// Show analytics section
function showAnalyticsSection() {
    hideAllSections();
    analyticsSection.classList.remove('hidden');
    updateActiveNav('nav-analytics');
    state.currentSection = 'analytics-section';

    loadAnalyticsCards(); // ye zaroor hona chahiye
}

function showStudentsSection() {
    hideAllSections();
    studentsSection.classList.remove('hidden');
    updateActiveNav('nav-students');
    state.currentSection = 'students-section';
    renderStudentsTable();
}

function renderStudentsTable(filter = '') {
    const students = state.students.filter(student => {
        if (!filter) return true;
        const value = filter.toLowerCase();
        return [student.name, student.className, student.roll, student.email, student.parentContact]
            .filter(Boolean)
            .some(text => text.toLowerCase().includes(value));
    });

    if (!studentsTableBody) return;
    studentsTableBody.innerHTML = '';

    if (students.length === 0) {
        studentsTableBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; color:#7f8c8d; padding:20px;">
                    No students added yet.
                </td>
            </tr>
        `;
        return;
    }

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.className || '-'}</td>
            <td>${student.roll || '-'}</td>
            <td>${student.email || '-'}</td>
            <td>${student.parentContact || '-'}</td>
            <td>
                <!-- VIEW -->
    <button class="btn btn-sm btn-info" onclick="viewStudent('${student._id}')">
        <i class="fas fa-eye"></i>
    </button>

    <!-- EDIT -->
    <button class="btn btn-sm btn-outline edit-student-btn" onclick="editStudent('${student._id}')">
        <i class="fas fa-edit"></i>
    </button>

    <!-- DELETE -->
    <button class="btn btn-sm btn-danger delete-student-btn" onclick="deleteStudent('${student._id}')">
        <i class="fas fa-trash"></i>
    </button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
}

async function handleAddStudent() {
    const firstName = studentFirstNameInput.value.trim();
    const lastName = studentLastNameInput.value.trim();
    const email = studentEmailInput.value.trim();
    const className = studentClassInput.value.trim();
    const roll = studentRollInput.value.trim();
    const parentContact = studentParentContactInput.value.trim();

    if (!firstName || !lastName) {
        alert('Please enter student first and last name.');
        return;
    }

    const isEditing = addStudentModal.dataset.editingId;
    const url = isEditing ? `/teacher/update-student/${isEditing}` : '/teacher/add-student';
    const method = isEditing ? 'PUT' : 'POST';



    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                className,
                roll,
                parentContact
            })
        });

        const result = await response.json();
        if (!result.success) {
            alert(`Unable to ${isEditing ? 'update' : 'add'} student. Please try again.`);
            return;
        }

        if (isEditing) {
            // Update existing student in state
            const index = state.students.findIndex(s => s._id === isEditing);
            if (index !== -1) {
                state.students[index] = {
                    ...state.students[index],
                    name: `${firstName} ${lastName}`,
                    email,
                    className,
                    roll,
                    parentContact
                };
            }
        } else {
            // Add new student to state
            const savedStudent = result.student;
            state.students.push({
                ...savedStudent,
                className: savedStudent.class || savedStudent.className || ''
            });
        }

        renderStudentsTable(studentSearchInput?.value || '');
        closeModal('addStudentModal');
        addStudentForm.reset();

        // Reset modal state
        delete addStudentModal.dataset.editingId;
        const modalTitle = addStudentModal.querySelector('h2');
        const submitBtn = addStudentModal.querySelector('.btn-primary');
        if (modalTitle) modalTitle.textContent = 'Add Student';
        if (submitBtn) submitBtn.textContent = 'Add Student';

        showNotification(`Student ${isEditing ? 'updated' : 'added'} successfully!`, 'success');
    } catch (err) {
        console.error(`${isEditing ? 'Update' : 'Add'} student failed:`, err);
        alert(`An error occurred while ${isEditing ? 'updating' : 'saving'} student.`);
    }
}

function filterStudentsTable(e) {
    renderStudentsTable(e.target.value);
}

async function editStudent(studentId) {
    const student = state.students.find(s => s._id === studentId);
    if (!student) return;

    // Populate the modal with student data
    const parts = student.name.split(' ');
    studentFirstNameInput.value = parts[0] || '';
    studentLastNameInput.value = parts.slice(1).join(' ') || '';
    studentEmailInput.value = student.email || '';
    studentClassInput.value = student.className || '';
    studentRollInput.value = student.roll || '';
    studentParentContactInput.value = student.parentContact || '';

    // Set editing mode
    addStudentModal.dataset.editingId = studentId;
    addStudentModal.style.display = 'flex';

    // Update modal title and button
    const modalTitle = addStudentModal.querySelector('h2');
    const submitBtn = addStudentModal.querySelector('.btn-primary');
    if (modalTitle) modalTitle.textContent = 'Edit Student';
    if (submitBtn) submitBtn.textContent = 'Update Student';
}

async function deleteStudent(studentId) {
    if (!confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
        return;
    }

    try {
        const response = await fetch(`/teacher/delete-student/${studentId}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        if (result.success) {
            // Remove from state
            state.students = state.students.filter(s => s._id !== studentId);
            renderStudentsTable(studentSearchInput?.value || '');
            showNotification('Student deleted successfully!', 'success');
        } else {
            alert('Unable to delete student. Please try again.');
        }
    } catch (err) {
        console.error('Delete student failed:', err);
        alert('An error occurred while deleting student.');
    }
}


// Show settings section
function showSettingsSection() {
    hideAllSections();
    settingsSection.classList.remove('hidden');
    updateActiveNav('nav-settings');
    state.currentSection = 'settings-section';
}

// Hide all sections
function hideAllSections() {
    paymentSection.classList.add('hidden');
    dashboardSection.classList.add('hidden');
    createTestSection.classList.add('hidden');
    testServicesSection.classList.add('hidden');
    templatesSection.classList.add('hidden');
    pythonServiceSection.classList.add('hidden');
    analyticsSection.classList.add('hidden');
    studentsSection.classList.add('hidden');
    settingsSection.classList.add('hidden');
    researchSection.classList.add('hidden');
    notesSection.classList.add('hidden');
    previousSection.classList.add('hidden');
    syllabusSection.classList.add('hidden');
    calculatorSection.classList.add('hidden');
    calendarSection.classList.add('hidden');
    alertsSection.classList.add('hidden');
}

// Update active navigation item
function updateActiveNav(activeId) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to current nav item
    const activeNav = document.getElementById(activeId);
    if (activeNav) {
        activeNav.classList.add('active');
    }

    // Update top navbar active state
    document.querySelectorAll('.top-navbar a').forEach(link => {
        link.classList.remove('active');
    });

    // Find and activate corresponding top navbar link
    const topNavId = activeId === 'nav-python-sidebar' ? 'top-nav-python' : activeId.replace('nav-', 'top-nav-');
    const topNavLink = document.getElementById(topNavId);
    if (topNavLink) {
        topNavLink.classList.add('active');
    }
}

function attachTranslatorEvents() {
    if (!translatorTranslateBtn) return;

    translatorTranslateBtn.addEventListener('click', translatorTranslate);
    translatorVoiceBtn?.addEventListener('click', translatorStartVoice);
    translatorSpeakBtn?.addEventListener('click', translatorSpeak);
    translatorSwapBtn?.addEventListener('click', translatorSwapLang);
    translatorClearBtn?.addEventListener('click', translatorClearInputs);

    loadTranslatorHistory();
}

function translatorDetectLanguage(text) {
    const hindiRegex = /[\u0900-\u097F]/;
    const hinglishWords = [
        'aaj', 'kya', 'kaise', 'mera', 'tera', 'hai', 'nahi', 'kyu', 'kaam', 'bahut', 'acha', 'haan'
    ];

    if (hindiRegex.test(text)) return 'hi';

    let score = 0;
    hinglishWords.forEach(word => {
        if (text.toLowerCase().includes(word)) score++;
    });

    return score >= 2 ? 'hi' : 'en';
}

async function translatorTranslate() {
    const text = translatorInputText?.value.trim();
    if (!text) return alert('Enter text to translate.');

    const source = translatorFromLang?.value === 'auto' ? translatorDetectLanguage(text) : translatorFromLang?.value;
    const target = translatorToLang?.value || 'en';

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        const translated = data?.responseData?.translatedText || '';
        if (translatorOutputText) translatorOutputText.value = translated;
        saveTranslatorHistory(text, translated);
    } catch (err) {
        console.error(err);
        alert('Translation error.');
    }
}

function translatorStartVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Voice input not supported in this browser.');

    const recognition = new SpeechRecognition();
    recognition.lang = 'hi-IN';
    recognition.start();
    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        if (translatorInputText) translatorInputText.value = transcript;
    };
}

function translatorSpeak() {
    if (!translatorOutputText?.value) return;
    const msg = new SpeechSynthesisUtterance(translatorOutputText.value);
    msg.lang = translatorToLang?.value === 'hi' ? 'hi-IN' : 'en-US';
    speechSynthesis.speak(msg);
}

function saveTranslatorHistory(src, res) {
    if (!src || !res) return;
    const history = JSON.parse(localStorage.getItem('translatorHistory') || '[]');
    history.unshift({ src, res });
    localStorage.setItem('translatorHistory', JSON.stringify(history.slice(0, 10)));
    loadTranslatorHistory();
}

function loadTranslatorHistory() {
    if (!translatorHistoryList) return;
    const history = JSON.parse(localStorage.getItem('translatorHistory') || '[]');
    if (!history.length) {
        translatorHistoryList.innerHTML = '<p style="color:#7f8c8d; margin:0;">No history yet.</p>';
        return;
    }
    translatorHistoryList.innerHTML = history.slice(0, 5).map(item =>
        `<div class="history-item" style="background:#fff; padding:10px; border-radius:8px; border:1px solid #e2e8f0;"><strong>${item.src}</strong><br>→ ${item.res}</div>`
    ).join('');
}

function translatorSwapLang() {
    if (!translatorFromLang || !translatorToLang) return;
    const fromValue = translatorFromLang.value;
    translatorFromLang.value = translatorToLang.value;
    translatorToLang.value = fromValue;
    const inputValue = translatorInputText?.value || '';
    const outputValue = translatorOutputText?.value || '';
    if (translatorInputText) translatorInputText.value = outputValue;
    if (translatorOutputText) translatorOutputText.value = inputValue;
}

function translatorClearInputs() {
    if (translatorInputText) translatorInputText.value = '';
    if (translatorOutputText) translatorOutputText.value = '';
}

// Animate dashboard elements
function animateDashboard() {
    // Update progress bars with animation
    const testsCount = state.tests.length;
    const questionsCount = state.tests.reduce((total, test) => total + (test.questions ? test.questions.length : 0), 0);
    const templatesCount = state.templates.length;

    // Set target values for progress bars
    const testsTarget = 50;
    const questionsTarget = 200;
    const templatesTarget = 10;

    // Calculate percentages
    const testsPercentage = Math.min((testsCount / testsTarget) * 100, 100);
    const questionsPercentage = Math.min((questionsCount / questionsTarget) * 100, 100);
    const templatesPercentage = Math.min((templatesCount / templatesTarget) * 100, 100);

    // Animate progress bars
    animateProgressBar(testsProgress, testsPercentage, testsProgressValue, testsProgressText);
    animateProgressBar(questionsProgress, questionsPercentage, questionsProgressValue, questionsProgressText);
    animateProgressBar(templatesProgress, templatesPercentage, templatesProgressValue, templatesProgressText);

    // Animate stat numbers
    animateCounter(totalTestsElement, testsCount);
    animateCounter(totalQuestionsElement, questionsCount);
    animateCounter(activeTemplatesElement, templatesCount);
}

// Animate progress bar
function animateProgressBar(progressBar, percentage, valueElement, textElement) {
    // Set CSS custom property for animation
    progressBar.style.width = `${percentage}%`;

    // Update text elements
    valueElement.textContent = `${Math.round(percentage)}%`;
    textElement.textContent = `${Math.round(percentage)}%`;

    // Trigger animation
    progressBar.style.transition = 'width 1.5s ease-in-out';
}

// Animate counter
function animateCounter(element, targetValue) {
    const duration = 1500; // ms
    const step = targetValue / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Process payment
function processPayment() {
    // Simulate payment processing
    makePaymentBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
    makePaymentBtn.disabled = true;

    setTimeout(() => {
        // Payment successful
        state.paymentCompleted = true;
        localStorage.setItem('teacherPaymentCompleted', 'true');

        makePaymentBtn.innerHTML = '<i class="fas fa-check"></i> Payment Successful!';
        makePaymentBtn.style.background = 'linear-gradient(90deg, #27ae60, #2ecc71)';

        // Unlock all features
        unlockAllFeatures();

        // Directly show dashboard
        showDashboard();

    }, 1500);
}


// Open question modal
function openQuestionModal() {
    createTestModal.style.display = 'flex';
    renderQuestionList();
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';

        // Reset student modal edit state
        if (modalId === 'addStudentModal') {
            delete modal.dataset.editingId;
            const modalTitle = modal.querySelector('h2');
            const submitBtn = modal.querySelector('.btn-primary');
            if (modalTitle) modalTitle.textContent = 'Add Student';
            if (submitBtn) submitBtn.textContent = 'Add Student';
            addStudentForm.reset();
        }
    }
}

// Handle question type change
function handleQuestionTypeChange() {
    const questionType = questionTypeElement.value;

    if (questionType === 'multiple-choice') {
        optionsContainer.style.display = 'block';

        // Reset to default 4 options
        optionsList.innerHTML = `
                    <div class="question-option-input">
                        <input type="radio" name="correctOption" value="0">
                        <input type="text" class="form-control" placeholder="Option 1">
                    </div>
                    <div class="question-option-input">
                        <input type="radio" name="correctOption" value="1">
                        <input type="text" class="form-control" placeholder="Option 2">
                    </div>
                    <div class="question-option-input">
                        <input type="radio" name="correctOption" value="2">
                        <input type="text" class="form-control" placeholder="Option 3">
                    </div>
                    <div class="question-option-input">
                        <input type="radio" name="correctOption" value="3">
                        <input type="text" class="form-control" placeholder="Option 4">
                    </div>
                `;
    }

    else if (questionType === 'true-false') {
        optionsContainer.style.display = 'block';
        optionsList.innerHTML = `
                    <div class="question-option-input">
                        <input type="radio" name="correctOption" value="true">
                        <input type="text" class="form-control" value="True" readonly>
                    </div>
                    <div class="question-option-input">
                        <input type="radio" name="correctOption" value="false">
                        <input type="text" class="form-control" value="False" readonly>
                    </div>
                `;
    }

    else {
        optionsContainer.style.display = 'none';
    }
}

// Add option for MCQ
function addOption() {
    const optionCount = optionsList.children.length;
    const optionNumber = optionCount + 1;

    const optionDiv = document.createElement('div');
    optionDiv.className = 'question-option-input';
    optionDiv.innerHTML = `
                <input type="radio" name="correctOption" value="${optionCount}">
                <input type="text" class="form-control" placeholder="Option ${optionNumber}">
                <button type="button" class="btn btn-sm" onclick="removeOption(this)" style="background-color: #e74c3c; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-times"></i>
                </button>
            `;

    optionsList.appendChild(optionDiv);
}

// Remove option
function removeOption(button) {
    const optionDiv = button.parentElement;

    // Minimum 2 options required
    if (optionsList.children.length > 2) {
        optionDiv.remove();

        // Reassign values and placeholders
        Array.from(optionsList.children).forEach((div, index) => {
            const radio = div.querySelector('input[type="radio"]');
            radio.value = index;

            const input = div.querySelector('input[type="text"]');
            input.placeholder = `Option ${index + 1}`;
        });
    } else {
        alert('At least 2 options are required for MCQ questions.');
    }
}
// Add question
function addQuestion() {

    const questionText = questionTextElement.value.trim();
    const questionType = questionTypeElement.value;
    const points = parseInt(questionPointsElement.value);
    const difficulty = questionDifficultyElement.value;

    if (!questionText) {
        alert('Please enter question text.');
        return;
    }

    // 🔥 MongoDB type fix
    let mongoType = "MCQ";

    if (questionType === "true-false") {
        mongoType = "TF";
    }

    // 🔴 IMPORTANT: keep same ID while editing
    let questionId = state.editingQuestionId
        ? state.editingQuestionId
        : Date.now();

    let question = {
        id: questionId,
        text: questionText,
        type: mongoType,
        points,
        difficulty
    };

    // ===== MCQ =====
    if (questionType === 'multiple-choice') {

        const options = [];
        const optionInputs = optionsList.querySelectorAll('input[type="text"]');

        const correctOption =
            document.querySelector('input[name="correctOption"]:checked');

        if (!correctOption) {
            alert('Please select the correct answer.');
            return;
        }

        optionInputs.forEach((input, index) => {

            if (input.value.trim()) {

                options.push({
                    id: index,
                    text: input.value.trim(),
                    isCorrect: index === parseInt(correctOption.value)
                });

            }
        });

        if (options.length < 2) {
            alert('At least 2 options required.');
            return;
        }

        question.options = options;
        question.correctAnswer = parseInt(correctOption.value);
    }

    // ===== TRUE/FALSE =====
    else if (questionType === 'true-false') {

        const correctOption =
            document.querySelector('input[name="correctOption"]:checked');

        if (!correctOption) {
            alert('Select True or False.');
            return;
        }

        question.correctAnswer = correctOption.value === 'true';

        question.options = [
            {
                id: 0,
                text: 'True',
                isCorrect: correctOption.value === 'true'
            },
            {
                id: 1,
                text: 'False',
                isCorrect: correctOption.value === 'false'
            }
        ];
    }

    // ===== UPDATE or ADD =====
    if (state.editingQuestionId) {

        const index = state.currentTestQuestions.findIndex(
            q => String(q.id) === String(state.editingQuestionId)
        );

        if (index !== -1) {
            state.currentTestQuestions[index] = question;
        }

        showNotification('Question updated successfully!', 'success');

    } else {

        state.currentTestQuestions.push(question);

        showNotification('Question added successfully!', 'success');
    }

    // RESET
    state.editingQuestionId = null;

    addQuestionBtn.innerHTML =
        '<i class="fas fa-plus"></i> Add Question';

    renderQuestionList();
    updateQuestionPreview();

    questionTextElement.value = '';
    questionPointsElement.value = '1';
    questionTypeElement.value = 'multiple-choice';

    handleQuestionTypeChange();
}

// Render question list
function renderQuestionList() {
    if (state.currentTestQuestions.length === 0) {
        questionListElement.innerHTML = `
            <div class="empty-state" style="padding: 20px;">
                <i class="fas fa-question-circle"></i>
                <p>No questions added yet. Add your first question below.</p>
            </div>
        `;
        return;
    }

    questionListElement.innerHTML = '';

    state.currentTestQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';

        questionDiv.innerHTML = `
            <div class="question-header">
                <div class="question-text">
                    Q${index + 1}: ${question.text}
                </div>
                <div class="question-type">
                    ${question.type.toUpperCase()}
                </div>
            </div>

            ${question.options ? `
                <div class="question-options">
                    ${question.options.map(option => `
                        <div class="question-option ${option.isCorrect ? 'correct' : ''}">
                            ${String.fromCharCode(65 + option.id)}. ${option.text}
                            ${option.isCorrect ?
                '<i class="fas fa-check" style="color:#27ae60; margin-left:6px;"></i>'
                : ''
            }
                        </div>
                    `).join('')}
                </div>
            ` : ''}

            <div class="question-marks">
                Marks: ${question.points} | Difficulty: ${question.difficulty}
            </div>

            <div style="margin-top:10px; display:flex; gap:8px;">
                
                <!-- Edit Button -->
                <button onclick="editQuestion('${question.id}')"
    style="background:#f39c12; color:white; border:none; padding:6px 12px; border-radius:5px; cursor:pointer; font-size:0.9rem;">
    <i class="fas fa-edit"></i> Edit
</button>


                <!-- Delete Button -->
                <button onclick="removeQuestion(${question.id})"
                    style="background:#e74c3c; color:white; border:none; padding:6px 12px; border-radius:5px; cursor:pointer; font-size:0.9rem;">
                    <i class="fas fa-trash"></i> Remove
                </button>

            </div>
        `;

        questionListElement.appendChild(questionDiv);
    });
}

// edit question
function editQuestion(questionId) {
    const question = state.currentTestQuestions.find(
        q => String(q.id) === String(questionId)
    );

    if (!question) return;

    state.editingQuestionId = question.id;

    questionTextElement.value = question.text;
    questionTypeElement.value = question.type;
    questionPointsElement.value = question.points;
    questionDifficultyElement.value = question.difficulty;

    handleQuestionTypeChange();

    if (question.options && question.type === 'multiple-choice') {
        optionsList.innerHTML = '';
        question.options.forEach((opt, index) => {
            optionsList.innerHTML += `
                <div class="question-option-input">
                    <input type="radio" name="correctOption" value="${index}" ${opt.isCorrect ? 'checked' : ''}>
                    <input type="text" class="form-control" value="${opt.text}">
                </div>
            `;
        });
    }

    addQuestionBtn.innerHTML = '<i class="fas fa-save"></i> Update Question';
}




// Remove question
function removeQuestion(questionId) {
    if (!confirm("Remove this question?")) return;

    state.currentTestQuestions =
        state.currentTestQuestions.filter(q => q.id !== questionId);

    renderQuestionList();
    updateQuestionPreview();

    showNotification('Question removed.', 'info');
}


// Update question preview
function updateQuestionPreview() {
    const count = state.currentTestQuestions.length;
    questionCountElement.textContent = count;

    if (count === 0) {
        questionPreviewElement.innerHTML = '<p style="color: #7f8c8d; text-align: center;">No questions added yet.</p>';
        return;
    }

    let previewHTML = '';
    state.currentTestQuestions.slice(0, 3).forEach((question, index) => {
        previewHTML += `
                    <div style="margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #eee;">
                        <strong>Q${index + 1}:</strong> ${question.text.substring(0, 50)}${question.text.length > 50 ? '...' : ''}
                        <div style="font-size: 0.8rem; color: #7f8c8d;">
                            Type: ${question.type} | Marks: ${question.points}
                        </div>
                    </div>
                `;
    });

    if (count > 3) {
        previewHTML += `<div style="text-align: center; color: #3498db; font-weight: 600;">
                    +${count - 3} more questions
                </div>`;
    }

    questionPreviewElement.innerHTML = previewHTML;
}

// Save questions
function saveQuestions() {

    if (state.currentTestQuestions.length === 0) {
        alert('Please add at least one question before saving.');
        return;
    }

    // save
    localStorage.setItem(
        'currentTestQuestions',
        JSON.stringify(state.currentTestQuestions)
    );

    // update preview
    updateQuestionPreview();

    // close modal directly
    const modal = document.getElementById('createTestModal');

    if (modal) {
        modal.style.display = 'none';
    }

    // mobile repaint fix
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        document.body.style.overflow = 'auto';
    }, 50);

    showNotification(
        `Saved ${state.currentTestQuestions.length} questions successfully!`,
        'success'
    );
}
// Create a new test
async function createTest(e) {

    e.preventDefault();

    try {

        const data = {
            name: document.getElementById("test-name").value.trim(),
            subject: document.getElementById("test-subject").value.trim(),
            duration: Number(document.getElementById("test-duration").value),
            description: document.getElementById("test-description").value.trim(),
            questions: state.currentTestQuestions
        };

        // ✅ Validation
        if (!data.name || !data.subject) {
            alert("Please enter test name and subject.");
            return;
        }

        if (data.questions.length === 0) {
            alert("Please add at least one question.");
            return;
        }

        // ✅ Route
        let url = "/teacher-tests/api/create-test";
        let method = "POST";

        // ✅ Edit Mode
        if (state.editingTestId) {
            url = `/teacher-tests/update/${state.editingTestId}`;
            method = "PUT";
        }

        // ✅ API Call
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        console.log("Server Response:", result);

        // ❌ Failed
        if (!result.success) {
            alert(result.error || "Failed to save test.");
            return;
        }

        // ✅ Success
        alert(
            state.editingTestId
                ? "Test Updated Successfully!"
                : "Test Created Successfully!"
        );

        // ✅ Reset
        state.editingTestId = null;

        resetTestForm();

        state.currentTestQuestions = [];

        // reload
        try {
            await loadTestsFromDB();
        } catch (e) {
            console.log("load ignored");
        }

        // ✅ DIRECT CLICK TEST CATEGORY
        const testCategoryBtn =
            document.getElementById("nav-test-services");

        if (testCategoryBtn) {
            testCategoryBtn.click();
        }

    } catch (err) {

        console.error("CREATE TEST ERROR:", err);

        alert("Server error while creating test.");
    }
}

// Create test card from form data
function createTestCardFromForm() {
    const testName = document.getElementById('test-name').value;
    const testSubject = document.getElementById('test-subject').value;
    const testDuration = document.getElementById('test-duration').value;
    const testDifficulty = document.getElementById('test-difficulty').value;
    const testDescription = document.getElementById('test-description').value;

    if (!testName || !testSubject) {
        alert('Please fill in test name and subject.');
        return;
    }

    // Create test object
    const test = {
        id: Date.now(),
        name: testName,
        subject: testSubject,
        duration: testDuration,
        difficulty: testDifficulty,
        description: testDescription,
        questions: state.currentTestQuestions,
        totalQuestions: state.currentTestQuestions.length,
        totalMarks: state.currentTestQuestions.reduce((sum, q) => sum + q.points, 0)
    };

    createTestCardFromTest(test);
}

// Create test card from test object
function createTestCardFromTest(test) {
    // ❌ This function is no longer needed
    // because cards are created from database

    console.log("Card creation handled by DB loader");
}

// Create quick test card
function createQuickTestCard() {
    alert("Quick create is disabled. Please create full test so it saves in database.");
}


function findCourseBySubject(subject) {
    return coursesData.find(course =>
        course.title.toLowerCase() === subject.toLowerCase()
    );
}


// Get random color
function getRandomColor() {
    const colors = [
        "#e34f26", "#1572b6", "#f7df1e", "#339933",
        "#3776ab", "#777bb4", "#4479a1", "#47a248",
        "#9b59b6", "#e74c3c", "#1abc9c", "#3498db",
        "#f39c12", "#d35400", "#c0392b", "#8e44ad"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Get icon for subject
function getIconForSubject(subject) {
    // Check if subject matches any predefined ones
    const subjectLower = subject.toLowerCase();
    if (subjectLower.includes('html')) return 'fab fa-html5';
    if (subjectLower.includes('css')) return 'fab fa-css3-alt';
    if (subjectLower.includes('javascript') || subjectLower.includes('js')) return 'fab fa-js';
    if (subjectLower.includes('python')) return 'fab fa-python';
    if (subjectLower.includes('php')) return 'fab fa-php';
    if (subjectLower.includes('mysql')) return 'fas fa-database';
    if (subjectLower.includes('node')) return 'fab fa-node-js';
    if (subjectLower.includes('mongo')) return 'fas fa-server';
    if (subjectLower.includes('math')) return 'fas fa-calculator';
    if (subjectLower.includes('science')) return 'fas fa-flask';
    if (subjectLower.includes('history')) return 'fas fa-landmark';
    if (subjectLower.includes('english')) return 'fas fa-book';
    if (subjectLower.includes('computer')) return 'fas fa-laptop-code';

    // Default icon
    return 'fas fa-file-alt';
}

// Get level class for difficulty
function getLevelClass(difficulty) {
    const levelMap = {
        'Beginner': 'level-beginner',
        'Intermediate': 'level-intermediate',
        'Advanced': 'level-advanced'
    };

    return levelMap[difficulty] || 'level-intermediate';
}

// Update course count
function updateCourseCount() {
    const count = coursesData.length;
    totalCoursesCountElement.textContent = count;
    footerCoursesCountElement.textContent = count;
}

// Reset the test form
function resetTestForm() {

    if (!state.paymentCompleted) {
        return;
    }

    testForm.reset();

    // duration reset
    const durationInput =
        document.getElementById('test-duration');

    if (durationInput) {
        durationInput.value = 60;
    }

    // difficulty reset safely
    const difficultyInput =
        document.getElementById('test-difficulty');

    if (difficultyInput) {
        difficultyInput.value = 'Intermediate';
    }

    // reset questions
    state.currentTestQuestions = [];

    // reset preview
    renderQuestionList();

    updateQuestionPreview();
}

// Update dashboard
function updateDashboard() {
    // Update statistics
    totalTestsElement.textContent = state.tests.length;

    const totalQuestions = state.tests.reduce((total, test) => total + (test.questions ? test.questions.length : 0), 0);
    totalQuestionsElement.textContent = totalQuestions;

    const activeTemplates = state.templates.filter(t => t.active).length;
    activeTemplatesElement.textContent = activeTemplates;

    // Update dashboard animations if dashboard is visible
    if (state.currentSection === 'dashboard-section') {
        animateDashboard();
    }
}

// Render all courses
function renderCourses() {
    coursesContainer.innerHTML = '';

    coursesData.forEach(course => {

        // Get real sub card  count from services
        let testCount = 0;
        if (testServicesData[course.title]) {
            testCount = testServicesData[course.title].length;
        }

        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';

        courseCard.innerHTML = `
            <div class="course-card-header" style="background: linear-gradient(135deg, ${course.color}, #2c3e50); position: relative;">
    <div class="card-icon">
        <i class="${course.icon}"></i>
    </div>

    <i class="fas fa-trash delete-course-icon" data-course="${course.title}"
       style="position:absolute; top:10px; right:10px; cursor:pointer; background:rgba(0,0,0,0.3); padding:6px; border-radius:50%; color:white;">
    </i>

    <h2 class="card-title">${course.title}</h2>
    
</div>

            <div class="course-card-body">
                <div class="viewers-count">
                    <i class="fas fa-eye"></i>
                    <span>Updated Viewers: ${course.viewers}</span>
                </div>
                <div class="level-badge ${course.levelClass}">
                    ${course.level}
                </div>
                <p style="color: #7f8c8d; text-align: center; line-height: 1.5;">
                    ${course.description}
                </p>
                <div class="test-questions">
                    <i class="fas fa-file-alt"></i>
                    ${testCount} Tests Cards
                </div>

            </div>
            <div class="course-card-footer">
                <button class="details-btn" data-course="${course.title}">
                    <i class="fas fa-info-circle"></i> More Details
                </button>
            </div>
           

        `;

        coursesContainer.appendChild(courseCard);
    });

    updateCourseCount();
}

// Render test services for a specific course
function renderTestServices(courseName) {
    testServicesContainer.innerHTML = '';

    const services = testServicesData[courseName];

    if (!services || services.length === 0) {
        testServicesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>No Test Services Available</h3>
                <p>There are currently no test services for ${courseName}.</p>
                <p>Check back soon for updates!</p>
            </div>
        `;
        return;
    }

    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'test-service-card';

        serviceCard.innerHTML = `
       <div class="test-service-header" style="background: linear-gradient(135deg, ${service.color}, #2980b9);">
           <i class="fas fa-trash delete-test-icon"
           data-id="${service.id}"
          style="position:absolute; top:10px; right:10px; cursor:pointer; background:rgba(0,0,0,0.3); padding:6px; border-radius:50%; color:white;">
          </i>

           <div class="card-icon">
             <i class="${service.icon}"></i>
            </div>

              <h2 class="test-service-name">${service.name}</h2>
        </div>


            <div class="test-service-body">
                <div class="test-service-level ${service.levelClass}">
                    ${service.level} Level
                </div>
                <p class="test-service-description">
                    ${service.description}
                </p>

                <div class="test-service-stats">
                    <div class="stat-item">
                        <div class="stat-value">${service.questions || 0}</div>
                        <div class="stat-label">Questions</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${service.duration}</div>
                        <div class="stat-label">Duration</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${service.students}</div>
                        <div class="stat-label">Students</div>
                    </div>
                </div>
            </div>

            <div class="test-service-footer">
                <button class="enroll-btn" style="background: linear-gradient(90deg, #27ae60, #2ecc71);">
                    <i class="fas fa-paper-plane"></i> Send
                </button>

                <button class="enroll-btn view-btn" 
                        data-id="${service.id}"
                        style="background: linear-gradient(90deg, #3498db, #2980b9);">
                    <i class="fas fa-eye"></i> View
                </button>

                <button class="enroll-btn edit-btn" 
                        data-id="${service.id}"
                        style="background: linear-gradient(90deg, #f39c12, #e67e22);">
                    <i class="fas fa-edit"></i><span>Edit</span>
                </button>

               <button class="enroll-btn result-btn"
        data-id="${service.id}"
        style="background: linear-gradient(90deg, #9b59b6, #8e44ad);">
    <i class="fas fa-chart-bar"></i> Result
</button>
 
            </div>
        `;

        testServicesContainer.appendChild(serviceCard);
    });

    // Update footer text
    serviceFooterText.textContent = `${services.length} Test Services for ${courseName}`;
}

// Show test services page for a specific course
function showTestServicesPage(courseName) {
    // Find course data
    const course = coursesData.find(c => c.title === courseName);

    if (!course) return;

    // Update page content
    // serviceTitle.textContent = `${courseName} Test Services`;
    // serviceDescription.textContent = `Explore all ${testServicesData[courseName]?.length || 0} test services available for ${courseName}. From beginner to advanced level tests.`;
    // serviceIcon.innerHTML = `<i class="${course.icon}"></i>`;
    // serviceHeader.style.background = `linear-gradient(135deg, ${course.color}, #8e44ad)`;
    servicePageTitle.textContent = `${courseName} Test Services`;

    // Render test services
    renderTestServices(courseName);

    // Show test services page, hide main dashboard
    testServicesMainDashboard.style.display = 'none';
    testServicesPage.style.display = 'block';

    // Scroll to top on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('.page-content-wrapper').scrollTop = 0;
    }
}


// Universal translator (question + all options)
async function translateAuto() {
    const questionText = questionTextElement.value.trim();
    const optionInputs = optionsList.querySelectorAll('input[type="text"]');

    if (!questionText && optionInputs.length === 0) {
        alert("Nothing to translate.");
        return;
    }

    // Detect Hindi or English
    function detectLanguage(text) {
        const hindiRegex = /[\u0900-\u097F]/; // Hindi unicode range
        return hindiRegex.test(text) ? "hi" : "en";
    }

    async function translateText(text, from, to) {
        const res = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
        );
        const data = await res.json();

        if (data && data.responseData && data.responseData.translatedText) {
            return data.responseData.translatedText;
        }
        return text;
    }

    try {
        if (questionText) {
            const fromLang = detectLanguage(questionText);
            const toLang = fromLang === "en" ? "hi" : "en";

            const lines = questionText.split("\n");
            const translatedLines = [];

            for (let line of lines) {
                if (line.trim() === "") {
                    translatedLines.push("");
                    continue;
                }
                const translated = await translateText(line, fromLang, toLang);
                translatedLines.push(translated);
            }

            questionTextElement.value = translatedLines.join("\n");

            // Translate options also
            for (let input of optionInputs) {
                const text = input.value.trim();
                if (!text) continue;

                const translated = await translateText(text, fromLang, toLang);
                input.value = translated;
            }
        }

    } catch (error) {
        console.error(error);
        alert("Translation error. Check internet connection.");
    }
}
async function loadTestsFromDB() {
    try {
        const res = await fetch("/teacher-tests/api/my-tests");
        const tests = await res.json();

        // RESET
        coursesData.length = 0;
        Object.keys(testServicesData).forEach(k => delete testServicesData[k]);

        const subjectsMap = {};

        tests.forEach(test => {

            // 👉 अगर subject नहीं है तो new main card बनाओ
            if (!subjectsMap[test.subject]) {
                subjectsMap[test.subject] = {
                    id: Date.now() + Math.random(),
                    title: test.subject,
                    icon: getIconForSubject(test.subject),
                    color: getRandomColor(),
                    viewers: 1,
                    level: test.difficulty,
                    levelClass: getLevelClass(test.difficulty),
                    description: test.description || `Test for ${test.subject}`
                };

                coursesData.push(subjectsMap[test.subject]);
                testServicesData[test.subject] = [];
            }

            // 👉 sub card add
            testServicesData[test.subject].push({
                id: test._id,
                name: test.name,
                icon: getIconForSubject(test.subject),
                level: test.difficulty,
                levelClass: getLevelClass(test.difficulty),
                description: test.description,
                duration: test.duration + " min",
                students: 0,
                color: subjectsMap[test.subject].color
            });
        });

        // 🔥 IMPORTANT: अगर कोई subject empty है → remove
        Object.keys(testServicesData).forEach(subject => {
            if (testServicesData[subject].length === 0) {
                delete testServicesData[subject];

                const index = coursesData.findIndex(c => c.title === subject);
                if (index !== -1) {
                    coursesData.splice(index, 1);
                }
            }
        });

        renderCourses();
        updateCourseCount();

    } catch (err) {
        console.error("Error loading tests:", err);
    }
}


function openRequestModal() {
    const modal = document.getElementById("requestModal");
    modal.style.display = "flex"; // 🔥 IMPORTANT
}

function closeRequestModal() {
    document.getElementById("requestModal").style.display = "none";
}

// outside click close
window.addEventListener("click", function (e) {
    const modal = document.getElementById("requestModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});



// Reserch papper
function showResearchSection() {
    hideAllSections();
    researchSection.classList.remove('hidden');
    updateActiveNav('nav-research');
    state.currentSection = 'research-section';
}
// notes upload and sheres
function showNotesSection() {
    hideAllSections();
    notesSection.classList.remove('hidden');
    updateActiveNav('nav-notes');
    state.currentSection = 'notes-section';
}
// previous year papers 
function showPreviousSection() {
    hideAllSections();
    previousSection.classList.remove('hidden');
    updateActiveNav('nav-previous');
    state.currentSection = 'previous-section';
}
function showSyllabusSection() {
    hideAllSections();
    syllabusSection.classList.remove('hidden');
    updateActiveNav('nav-syllabus');
    state.currentSection = 'syllabus-section';
}

// show calculater function
function showCalculatorSection() {
    hideAllSections();
    calculatorSection.classList.remove('hidden');
    updateActiveNav('nav-calculator');
    state.currentSection = 'calculator-section';
}
// calculater codes
function calc(val) {
    document.getElementById('calc-display').value += val;
}

function calculate() {
    const display = document.getElementById('calc-display');
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function clearCalc() {
    document.getElementById('calc-display').value = "";
}
// calendar parts 
function showCalendarSection() {
    hideAllSections();
    calendarSection.classList.remove('hidden');
    updateActiveNav('nav-calendar');
    state.currentSection = 'calendar-section';
    renderCalendar();
}
let currentDate = new Date();
let events = JSON.parse(localStorage.getItem("calendarEvents") || "{}");

function renderCalendar() {
    const grid = document.getElementById("calendar-grid");
    const monthLabel = document.getElementById("calendar-month");

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    monthLabel.textContent =
        currentDate.toLocaleString("default", { month: "long" }) +
        " " + year;

    grid.innerHTML = "";

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    // Days
    for (let day = 1; day <= totalDays; day++) {
        const key = `${year}-${month}-${day}`;
        const hasEvent = events[key];

        const cell = document.createElement("div");
        cell.style.padding = "10px";
        cell.style.background = hasEvent ? "#27ae60" : "#ecf0f1";
        cell.style.color = hasEvent ? "white" : "#333";
        cell.style.borderRadius = "8px";
        cell.style.textAlign = "center";
        cell.style.cursor = "pointer";
        cell.textContent = day;

        cell.onclick = () => addEvent(year, month, day);

        grid.appendChild(cell);
    }

    renderEventList();
}

function addEvent(year, month, day) {
    const key = `${year}-${month}-${day}`;
    const text = prompt("Enter event for this date:");

    if (!text) return;

    events[key] = text;
    localStorage.setItem("calendarEvents", JSON.stringify(events));
    renderCalendar();
}

function renderEventList() {
    const list = document.getElementById("event-list");
    list.innerHTML = "";

    const keys = Object.keys(events);

    if (keys.length === 0) {
        list.innerHTML = `<p style="color:#7f8c8d;">No events added.</p>`;
        return;
    }

    keys.forEach(key => {
        const div = document.createElement("div");
        div.style.padding = "10px";
        div.style.borderBottom = "1px solid #eee";
        div.textContent = `${key}: ${events[key]}`;
        list.appendChild(div);
    });
}

// Month controls
document.addEventListener("click", function (e) {
    if (e.target.id === "prev-month") {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    }
    if (e.target.id === "next-month") {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    }
});

// gmail alerts system 
function showAlertsSection() {
    hideAllSections();
    alertsSection.classList.remove('hidden');
    updateActiveNav('nav-alerts');
    state.currentSection = 'alerts-section';
}

let editingTestId = null;

function openTestForEdit(test) {

    state.editingTestId = test._id;

    // ✅ FORM SECTION OPEN (backup)
    showCreateTestSection();

    // ✅ FILL FORM
    document.getElementById("test-name").value = test.name || "";
    document.getElementById("test-subject").value = test.subject || "";
    document.getElementById("test-duration").value = test.duration || 60;
    document.getElementById("test-description").value = test.description || "";

    // ✅ QUESTIONS LOAD
    state.currentTestQuestions = test.questions || [];

    initializeQuestionManagement(true);
    updateQuestionPreview();

    // ❌ REMOVE THIS IF EXISTS
    // openQuestionModal();

    // ✅ BUTTON CHANGE
    document.querySelector("#test-creation-form button[type='submit']")
        .innerText = "Update Test";
}
// ===== QR SHARE SYSTEM =====
let currentShareUrl = "";

// Send button click
document.addEventListener("click", function (e) {
    const sendBtn = e.target.closest(".enroll-btn");

    if (sendBtn && sendBtn.innerText.includes("Send")) {
        const card = sendBtn.closest(".test-service-card");
        const viewBtn = card.querySelector(".view-btn");

        if (!viewBtn) return;

        const testId = viewBtn.dataset.id;
        openQrPopup(testId);
    }
});

function updateQuestionPreview() {
    const preview = document.getElementById("question-preview");
    preview.innerHTML = "";

    if (!state.currentTestQuestions.length) {
        preview.innerHTML = "<p>No questions added</p>";
        return;
    }

    state.currentTestQuestions.forEach((q, i) => {
        const div = document.createElement("div");
        div.innerHTML = `<b>Q${i + 1}:</b> ${q.text}`;
        preview.appendChild(div);
    });
}

function openQrPopup(testId) {
    const modal = document.getElementById("qrModal");
    const canvas = document.getElementById("qrCanvas");
    const linkInput = document.getElementById("testLink");

    const url = `${window.location.origin}/teacher-tests/open/${testId}`;

    currentShareUrl = url;

    linkInput.value = url;

    QRCode.toCanvas(canvas, url, { width: 200 }, function (error) {
        if (error) console.error(error);
    });

    modal.style.display = "flex";
}

// Close
document.getElementById("closeQrBtn").onclick = () => {
    document.getElementById("qrModal").style.display = "none";
};

// Copy
document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(currentShareUrl);
    alert("Link copied!");
};

// Download QR
document.getElementById("downloadBtn").onclick = () => {
    const canvas = document.getElementById("qrCanvas");
    const link = document.createElement("a");
    link.download = "test-qr.png";
    link.href = canvas.toDataURL();
    link.click();
};

// WhatsApp send
document.getElementById("whatsappBtn").onclick = () => {
    const text = encodeURIComponent(
        "Take this test:\n" + currentShareUrl
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
};
// AI Ask toggle
const aiBtn = document.getElementById("aiAskBtn");
const aiBox = document.getElementById("aiAskBox");
const closeAi = document.getElementById("closeAiAsk");

if (aiBtn) {
    aiBtn.onclick = () => {
        aiBox.style.display = "flex";
    };
}

if (closeAi) {
    closeAi.onclick = () => {
        aiBox.style.display = "none";
    };
}

// Real AI message
const aiSend = document.getElementById("aiSend");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

if (aiSend) {
    aiSend.onclick = async () => {
        const text = aiInput.value.trim();
        if (!text) return;

        // user message
        const userMsg = document.createElement("div");
        userMsg.className = "ai-msg";
        userMsg.textContent = "You: " + text;
        aiMessages.appendChild(userMsg);

        aiInput.value = "";

        // call backend
        try {
            const res = await fetch("/ai/ask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ question: text })
            });

            const data = await res.json();

            const botMsg = document.createElement("div");
            botMsg.className = "ai-msg";
            botMsg.textContent = "AI: " + data.answer;
            aiMessages.appendChild(botMsg);

        } catch (err) {
            const botMsg = document.createElement("div");
            botMsg.className = "ai-msg";
            botMsg.textContent = "AI: Server error.";
            aiMessages.appendChild(botMsg);
        }

        aiMessages.scrollTop = aiMessages.scrollHeight;
    };
}
async function loadAnalyticsCards() {
    try {
        const res = await fetch("/api/teacher/analytics/tests-summary", {
            credentials: "include"
        });
        const data = await res.json();

        const container = document.getElementById("analytics-cards-container");
        if (!container) return;

        if (!data.length) {
            container.innerHTML =
                "<tr><td colspan='7'>No analytics yet</td></tr>";
            return;
        }

        container.innerHTML = "";

        data.forEach((test, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${test.testName}</td>
                <td>${test.subject || "-"}</td>
                <td>${test.students} Students</td>
                <td>${test.avgScore}%</td>
                <td>${test.lastTime || "-"}</td>
                <td>
                    <button onclick="openAnalytics('${test.testId}')">
                        Details
                    </button>
                </td>
            `;

            container.appendChild(row);
        });

    } catch (err) {
        console.error("Analytics load error", err);

        const container = document.getElementById("analytics-cards-container");
        if (container) {
            container.innerHTML =
                "<tr><td colspan='7'>Error loading analytics</td></tr>";
        }
    }
}

function openAnalytics(testId) {
    window.location.href = `/teacher-tests/analytics?testId=${testId}`;
}

// Update progress bars for dashboard stats
function updateProgress(type, current, max) {
    const percentage = Math.min((current / max) * 100, 100);

    const progressElement = document.getElementById(`${type}-progress`);
    const progressValueElement = document.getElementById(`${type}-progress-value`);
    const progressTextElement = document.getElementById(`${type}-progress-text`);

    if (progressElement) {
        progressElement.style.width = percentage + '%';
    }

    if (progressValueElement) {
        progressValueElement.textContent = Math.round(percentage) + '%';
    }

    if (progressTextElement) {
        progressTextElement.textContent = Math.round(percentage) + '%';
    }
}

// test count system 
async function loadDashboardStats() {
    try {
        if (!TEACHER_ID) {
            console.error("Teacher ID missing");
            return;
        }

        const res = await fetch(`/dashboard/stats/${TEACHER_ID}`);
        const data = await res.json();

        console.log("Dashboard data:", data);

        const totalTests = data.totalTests || 0;
        const totalAttempts = data.totalAttempts || 0;
        const totalStudents = data.totalStudents || 0;
        const totalTemplates = data.totalTemplates || 0;

        const studentCountToShow =
            totalAttempts > 0 ? totalAttempts : totalStudents;

        document.getElementById("total-tests").textContent = totalTests;
        document.getElementById("total-questions").textContent = studentCountToShow;
        document.getElementById("active-templates").textContent = totalTemplates;

        updateProgress("tests", totalTests, 50);
        updateProgress("questions", studentCountToShow, 200);
        updateProgress("templates", totalTemplates, 20);

    } catch (err) {
        console.error("Dashboard load error:", err);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    initApp();
    loadDashboardStats();
});
// ===== THEME SYSTEM =====
// ===== THEME SYSTEM =====
function applyTheme(theme) {
    const body = document.body;

    if (theme === "dark") {
        body.classList.add("dark-theme");
    } else if (theme === "light") {
        body.classList.remove("dark-theme");
    } else if (theme === "auto") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        body.classList.toggle("dark-theme", prefersDark);
    }

    localStorage.setItem("dashboardTheme", theme);
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem("dashboardTheme") || "light";
    applyTheme(savedTheme);

    const radio = document.querySelector(`input[name="theme"][value="${savedTheme}"]`);
    if (radio) radio.checked = true;
}

// Theme radio change listener
function setupThemeControls() {
    const themeRadios = document.querySelectorAll('input[name="theme"]');

    themeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            applyTheme(radio.value);
        });
    });
}

//=================================================research papper sections 

function addResearchCard(data) {
    const container = document.getElementById("research-cards-container");
    if (!container) return;

    const card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
        <div class="card mb-3 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">${data.title || "Research Paper"}</h5>
                <p class="card-text">
                    <strong>Author:</strong> ${data.author || "-"}<br>
                    <strong>Year:</strong> ${data.year || "-"}<br>
                    <strong>Subject:</strong> ${data.subject || "-"}
                </p>
                <a href="${data.fileUrl}" target="_blank" class="btn btn-primary btn-sm">
                    View Paper
                </a>
            </div>
        </div>
    `;

    container.prepend(card);
}
async function research() {
    const subject = document.getElementById("research-subject").value.trim();
    const title = document.getElementById("research-title").value.trim();
    const author = document.getElementById("research-author").value.trim();
    const year = document.getElementById("research-year").value.trim();
    const journal = document.getElementById("research-journal").value.trim();
    const access = document.getElementById("research-access").value;
    const fileInput = document.getElementById("research-file");

    if (!subject || !title || !author || !year) {
        alert("Please fill all required fields.");
        return;
    }

    if (!fileInput.files.length) {
        alert("Please select a PDF file.");
        return;
    }

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("year", year);
    formData.append("journal", journal);
    formData.append("access", access);
    formData.append("file", fileInput.files[0]);

    try {
        const res = await fetch("/api/research/upload", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (data.success) {
            alert("Research paper uploaded successfully!");
            window.location.href = "/research-papper";
        } else {
            alert(data.message || "Upload failed");
        }
    } catch (err) {
        console.error("Upload error:", err);
        alert("Server error");
    }
}
function previous() {
    window.location.href = "/previous-year-paper";
}

const generateLinkBtn = document.getElementById('generate-link-btn');

if (generateLinkBtn) {
    generateLinkBtn.addEventListener('click', () => {

        const link = `${window.location.origin}/student-register/${TEACHER_ID}`;

        prompt("Copy this link and send to students:", link);
    });
}


let inviteLink = "";

// Open Modal
function openInviteModal() {
    inviteLink = `${window.location.origin}/student-register/${TEACHER_ID}`;

    document.getElementById("inviteLinkInput").value = inviteLink;

    // QR Generate
    QRCode.toCanvas(document.getElementById("qrCanvas"), inviteLink);

    document.getElementById("inviteModal").style.display = "flex";
}

// Close Modal
function closeInviteModal() {
    document.getElementById("inviteModal").style.display = "none";
}

// Copy Link
function copyInviteLink() {
    navigator.clipboard.writeText(inviteLink);
    alert("Link copied ✅");
}

// WhatsApp Share
function shareWhatsApp() {
    const text = encodeURIComponent("Register here:\n" + inviteLink);
    window.open(`https://wa.me/?text=${text}`, "_blank");
}

// Download QR
function downloadQR() {
    const canvas = document.getElementById("qrCanvas");
    const link = document.createElement("a");
    link.download = "invite-qr.png";
    link.href = canvas.toDataURL();
    link.click();
}
window.addEventListener("click", function (e) {
    const modal = document.getElementById("inviteModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});


function viewStudent(studentId) {
    const student = state.students.find(s => s._id === studentId);

    if (!student) {
        alert("Student not found");
        return;
    }

    const modal = document.getElementById("viewStudentModal");
    const details = document.getElementById("studentDetails");

    details.innerHTML = `
        <p><b>Name:</b> ${student.name}</p>
        <p><b>Class:</b> ${student.className || '-'}</p>
        <p><b>Roll:</b> ${student.roll || '-'}</p>
        <p><b>Email:</b> ${student.email || '-'}</p>
        <p><b>Parent Contact:</b> ${student.parentContact || '-'}</p>
    `;

    modal.style.display = "flex";
}

function closeViewStudent() {
    document.getElementById("viewStudentModal").style.display = "none";
}