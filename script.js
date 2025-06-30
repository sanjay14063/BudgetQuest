// constant definitions
const setCategoryBudgetsBtn = document.getElementById('set-category-budgets-btn');
const categoryBudgetSettings = document.getElementById('category-budget-settings');
const categoryBudgetForm = document.getElementById('category-budget-form');
const closeBudgetsBtn = document.getElementById('close-budgets-btn');
const categorySummaryList = document.getElementById('category-summary-list');

const budgetFoodInput = document.getElementById('budget-food');
const budgetRentInput = document.getElementById('budget-rent');
const budgetTransportInput = document.getElementById('budget-transport');
const budgetUtilitiesInput = document.getElementById('budget-utilities');
const budgetEntertainmentInput = document.getElementById('budget-entertainment');
const budgetOtherInput = document.getElementById('budget-other');

const transactionForm = document.getElementById('transaction-form');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const categorySelect = document.getElementById('category');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const addTransactionBtn = document.getElementById('add-transaction-btn');
const dashboardHeading = document.getElementById('dashboard-heading');
const cityProgressDisplay = document.getElementById('city-progress-display');
const totalIncomeDisplay = document.getElementById('total-income');
const totalExpensesDisplay = document.getElementById('total-expenses');
const remainingBudgetDisplay = document.getElementById('remaining-budget');
const transactionsList = document.getElementById('transactions-list');

const gamePointsDisplay = document.getElementById('game-points');
const badgesContainer = document.getElementById('badges-container');
const financialCityImg = document.getElementById('financial-city-img');
const cityLevelDisplay = document.getElementById('city-level');
const userSetupSection = document.getElementById('user-setup-section');
const userSetupForm = document.getElementById('user-setup-form');
const userNameInput = document.getElementById('user-name');
const monthlyIncomeInput = document.getElementById('monthly-income');
const savingsGoalInput = document.getElementById('savings-goal');
const mainAppContent = document.getElementById('main-app-content');
const financialTipMessage = document.getElementById('financial-tip-message');
const takeQuizBtn = document.getElementById('take-quiz-btn');
const quizModal = document.getElementById('quiz-modal');
const closeQuizBtn = document.getElementById('close-quiz-btn');
const quizContainer = document.getElementById('quiz-container');
const quizQuestion = document.getElementById('quiz-question');
const quizOptions = document.getElementById('quiz-options');
const quizFeedback = document.getElementById('quiz-feedback');
const submitAnswerBtn = document.getElementById('submit-answer-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const quizResults = document.getElementById('quiz-results');
const quizScoreDisplay = document.getElementById('quiz-score');
const quizTotalQuestionsDisplay = document.getElementById('quiz-total-questions');
const retakeQuizBtn = document.getElementById('retake-quiz-btn');
const pointsHeading = document.getElementById('points-heading');
const badgesHeading = document.getElementById('badges-heading');
const financialHeading = document.getElementById('financial-city-heading');
const testKnowledge = document.getElementById('test-knowledge');

console.log('Quiz Question Element:', quizQuestion);
console.log('Quiz Options Element:', quizOptions);
// the fun stuff :)
let transactions = [];
let gameProgress = {
    points: 0,
    unlockedBadges: [],
    cityLevel: 1,
    transactionsLogged: 0
};

const LEARNING_TIPS = [
    {
        title: "Incomes, Expenses, and Saving",
        content: "An income is any money that you recieve, whether it be an allowance or a prize at a competition. However, an expense is any money that you spend. Savings is the amount of income that you have left after you have taken care of all of your expenses for the month. A good principle is to keep savings as high as possible. Keep in mind that your expenses should be kept below your budget, otherwise you won't meet your savings goal."
    },
    {
        title: "What is a Budget?",
        content: "A budget is a plan for how you'll spend and save your money. It helps you avoid overspending and save for times in need(when the new Nintendo comes out 😁) or even for retirement. A good monthly budget according to certain studies is around 20% of your income."
    },
    {
        title: "Difference Between Needs and Wants",
        content: "Needs are essentials like food and rent, things that you can't live without. Wants are extras like eating out or buying new gadgets. Budget for needs first, and maybe splurge(just a little) on wants once in a while."
    },
    {
        title: "Why Save Money?",
        content: "Saving helps you prepare for emergencies, future goals, and gives you peace of mind. Saving enough can help you work towards financial freedom to pursue your passions! Even small amounts add up!"
    },
    {
        title: "Track Your Expenses",
        content: "Logging all your expenses helps you stay in control and identify spending habits you can improve. It may seem hard at first, but once it becomes a habit it'll change your finances forever!"
    },
    {
        title: "Set a Savings Goal",
        content: "Setting a goal gives you a clear target and motivation. For example, save $500 for a trip or emergency fund."
    }
];

function renderLearningTips() {
    const tipsContainer = document.getElementById('tips-container');
    tipsContainer.innerHTML = ''; 

    LEARNING_TIPS.forEach((tip, index) => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card';
        tipCard.innerHTML = `
            <h4 class="tip-title">${tip.title}</h4>
            <p class="tip-content" style="display:none;">${tip.content}</p>
        `;
        tipsContainer.appendChild(tipCard);
    });
    document.querySelectorAll('.tip-title').forEach(title => {
        title.addEventListener('click', () => {
            const content = title.nextElementSibling;
            content.style.display = (content.style.display === 'none') ? 'block' : 'none';
        });
    });
}


const elementExplanations = {
    'total-income': {
        title: 'Total Income',
        text: 'This shows your total income for the month, including your expected monthly income and any extra income transactions you\'ve added.'
    },
    'total-expenses': {
        title: 'Total Expenses',
        text: 'This displays all the money you\'ve spent this month across all categories.'
    },
    'remaining-budget': {
        title: 'Remaining Budget',
        text: 'This is the money you have left to spend or save this month after accounting for your income, expenses, and savings goal. Aim for a positive number!'
    },
    'savings-goal': {
        title: 'Savings Goal',
        text: 'This shows your current savings goal. Every positive "Remaining Budget" amount contributes to reaching this goal.'
    },
    'city-level': {
        title: 'City Level',
        text: 'Your current Financial City level! Earn more points by correctly answering quiz questions to upgrade your city.'
    },
    'financial-city-img': {
        title: 'Your Financial City',
        text: 'This is your evolving Financial City! It grows and changes as you progress through the game.'
    },
    'take-quiz-btn': {
        title: 'Financial Quiz',
        text: 'Click here to take a quick quiz and earn points to grow your city and boost your financial literacy!'
    },
    'add-transaction-btn': {
        title: 'Add Transaction',
        text: 'Use this to record any money coming in (income) or going out (expense) in your daily life.'
    },
    'set-category-budgets-btn': {
        title: 'Set Budgets',
        text: 'Click this button to open the budget settings and allocate your income to different spending categories.'
    },
    'points-heading':{
        title: 'Points',
        text: 'This shows the total amount of points you have gained, through logging transactions, staying true to your budget, or saving a specific amount!'
    },
    'badges-heading':{
        title: 'Badges',
        text: 'These are your badges. Badges that show up transparent have not been unlocked yet, and those that are filled have been unlocked. You can earn badges by completing certain tasks/missions!'
    },
    'financial-city-heading':{
        title: 'Financial City',
        text: 'Your financial city grows as you gain points and stay true to your budget. You can see your progress in the graphic!'
    },
    'test-knowledge':{
        title: 'Quiz',
        text: 'Here you can take a quiz to see how much you know about budgeting!'
    }
};

// mascot logic
const mascotIcon = document.getElementById('mascot-icon');
const appContent = document.getElementById('main-app-content'); 


const inspectableElements = [
    document.getElementById('total-income'), 
    document.getElementById('total-expenses'), 
    document.getElementById('remaining-budget'), 
    document.getElementById('savings-goal'), 
    document.getElementById('city-level'),
    document.getElementById('financial-city-img'),
    document.getElementById('take-quiz-btn'),
    document.getElementById('add-transaction-btn'),
    document.getElementById('set-category-budgets-btn'),
    document.getElementById('points-heading'),
    document.getElementById('badges-heading'),
    document.getElementById('financial-city-heading'), 
    document.getElementById('test-knowledge')
].filter(Boolean); 

let draggedElement = null; 

mascotIcon.addEventListener('dragstart', (e) => {
    draggedElement = mascotIcon;
    e.dataTransfer.setData('text/plain', mascotIcon.id);
    mascotIcon.classList.add('is-dragging');
});

mascotIcon.addEventListener('dragend', () => {
    draggedElement = null;
    mascotIcon.classList.remove('is-dragging');
});

inspectableElements.forEach(element => {
    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (draggedElement === mascotIcon) { 
            element.classList.add('drop-target-active');
        }
    });

    element.addEventListener('dragleave', (e) => {
        if (draggedElement === mascotIcon) {
            element.classList.remove('drop-target-active');
        }
    });

    element.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedElement === mascotIcon) {
            element.classList.remove('drop-target-active');
            const targetId = e.currentTarget.id; 
            displayExplanation(targetId, e.clientX, e.clientY);
        }
    });
});

function displayExplanation(elementId, x, y) {
    const explanationData = elementExplanations[elementId]; 

    if (!explanationData) {
        console.warn(`No explanation data found for ID: ${elementId}`);
        return; 
    }

    let tooltip = document.getElementById('explanation-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'explanation-tooltip';
        document.body.appendChild(tooltip); 
    }

    tooltip.innerHTML = `
        <h3>${explanationData.title || 'Explanation'}</h3>
        <p>${explanationData.text}</p>
        <button class="close-tooltip-btn">Got it!</button>
    `;
    tooltip.style.left = `${x + 15}px`; 
    tooltip.style.top = `${y + 15}px`; 
    tooltip.style.display = 'block';
    tooltip.querySelector('.close-tooltip-btn').addEventListener('click', () => {
        tooltip.style.display = 'none';
        tooltip.remove(); 
    }, { once: true }); 
}
const FINANCIAL_QUIZ_QUESTIONS = [
    {
        question: "What is the primary purpose of creating a budget?",
        options: [
            "To know exactly how much money you can spend on anything you want.",
            "To gain control over your finances and make informed spending decisions.",
            "To make sure you spend all your income every month.",
            "To avoid paying taxes."
        ],
        correctAnswerIndex: 1,
        explanation: "Budgeting helps you understand your cash flow, allowing you to control where your money goes and work towards financial goals."
    },
    {
        question: "Which of the following is NOT typically considered an 'expense' in a budget?",
        options: [
            "Rent payment",
            "Grocery shopping",
            "Monthly salary",
            "Utility bills"
        ],
        correctAnswerIndex: 2,
        explanation: "A monthly salary is income, not an expense. Expenses are money you spend."
    },
    {
        question: "Why is an emergency fund important?",
        options: [
            "To buy luxury items impulsively.",
            "To cover unexpected costs like medical bills or job loss.",
            "To invest in the stock market.",
            "To go on vacation every year."
        ],
        correctAnswerIndex: 1,
        explanation: "An emergency fund provides a financial safety net for unexpected life events, preventing you from going into debt."
    },
    {
        question: "What does 'fixed expenses' mean in budgeting?",
        options: [
            "Expenses that change significantly each month.",
            "Expenses that are the same amount every month, like rent or loan payments.",
            "Expenses that you can easily cut out of your budget.",
            "Expenses that are paid in cash only."
        ],
        correctAnswerIndex: 1,
        explanation: "Fixed expenses are costs that remain constant each month, making them predictable parts of your budget."
    }
];

const QUIZ_DETAILED_EXPLANATIONS = [
    "Creating a budget(a fixed amount of money you can spend in a timeframe) helps you avoid unnecessary spending and reach your financial goals faster. A budget also reduces stress and helps prioritize needs over wants.",
    "A salary is money you earn, not spend. In budgeting, distinguishing income from expenses is essential for understanding cash flow.",
    "An emergency fund is an amount of money you set aside in case something goes wrong and you need a sum of money quickly. Having one prevents financial ruin from surprise events like job loss, accidents, or illness. It gives you stability and peace of mind.",
    "Fixed expenses are predictable, like rent or subscriptions. Recognizing them helps you plan for variable costs like food or entertainment."
];

let currentQuestionIndex = 0;
let userScore = 0;
const BADGES = [
    {
        id: 'first_transaction',
        name: '💸 First Tracker',
        description: 'Logged your very first transaction!',
        points: 20
    },
    {
        id: 'five_transactions',
        name: '📊 Transaction Enthusiast',
        description: 'Logged 5 transactions!',
        points: 50
    },
    {
        id: 'ten_transactions',
        name: '📈 Data Master',
        description: 'Logged 10 transactions!',
        points: 100
    },
    {
        id: 'budget_guru',
        name: '💰 Budget Guru',
        description: 'Logged an expense and successfully stayed within your budget!',
        points: 75
    },
];

const FINANCIAL_TIPS = [
    {
        id: 'overspending_warning',
        condition: (remainingBudget) => remainingBudget < 0,
        message: 'Warning: You are currently over budget! Review your recent expenses and consider cutting back where possible.',
        priority: 1 
    },
    {
        id: 'no_savings_goal',
        condition: (remainingBudget, userProfile) => userProfile.savingsGoal === 0 && userProfile.monthlyIncome > 0,
        message: 'Set a savings goal! Even a small amount saved consistently can grow significantly over time.',
        priority: 2
    },
    {
        id: 'low_savings_goal',
        condition: (remainingBudget, userProfile) => userProfile.savingsGoal > 0 && userProfile.savingsGoal < (userProfile.monthlyIncome * 0.05),
        message: 'Consider increasing your savings goal! Aim for at least 10-20% of your income if possible.',
        priority: 3
    },
    {
        id: 'budget_success',
        condition: (remainingBudget, userProfile) => remainingBudget >= 0 && userProfile.hasCompletedSetup && (transactions.length > 0 || userProfile.monthlyIncome > 0),
        message: 'You\'re staying within your budget! Keep up the great work and maintain those healthy spending habits.',
        priority: 4
    },
    {
        id: 'emergency_fund',
        condition: (remainingBudget, userProfile) => userProfile.monthlyIncome > 0 && userProfile.hasCompletedSetup, 
        message: 'Start building an emergency fund! Aim for 3-6 months of living expenses saved for unexpected events.',
        priority: 5
    },
    {
        id: 'track_everything',
        condition: (remainingBudget, userProfile) => transactions.length < 3,
        message: 'Log every transaction, no matter how small! Accurate tracking is key to understanding your money.',
        priority: 6
    },
    {
        id: 'general_welcome',
        condition: () => true, 
        message: 'Welcome to your Financial City! Keep tracking your finances to grow your wealth.',
        priority: 99 
    }
];

const CITY_LEVELS = [
    { level: 1, name: 'Village', pointsThreshold: 0, img: "./Images/download.jpeg" },
    { level: 2, name: 'Town', pointsThreshold: 50, img: "./Images/town.jpeg" },
    { level: 3, name: 'City', pointsThreshold: 150, img: "./Images/city .jpeg" },
    { level: 4, name: 'Metropolis', pointsThreshold: 300, img: "./Images/metropolix.jpeg" },
    { level: 5, name: 'Mega City', pointsThreshold: 500, img: "./Images/megacity.jpeg" }
];

let userProfile = {
    name: null,
    monthlyIncome: 0,
    savingsGoal: 0,
    hasCompletedSetup: false,
    categoryBudgets: {
        Food: 0,
        Rent: 0,
        Transport: 0,
        Utilities: 0,
        Entertainment: 0,
        Other: 0
    }
};

// Tutorial section starts
const tutorialOverlay = document.getElementById('tutorial-overlay');
const tutorialBox = document.getElementById('tutorial-box'); 
const tutorialText = document.getElementById('tutorial-text');
const tutorialNextBtn = document.getElementById('tutorial-next-btn');
const closeTutorialBtn = document.getElementById('close-tutorial-btn'); 
const tutorialSteps = [
    { text: "Welcome to BudgetQuest! Let's take a quick tour.", targetId: null },
    { text: "This is your dashboard, where you can see your income, expenses, and remaining budget.", targetId: 'dashboard-container' }, 
    { text: "Here's your total income. It's the foundation of your budget! It keeps track of your monthly fixed income, plus any other incomes you log, an income being any money that you recieve.", targetId: 'total-income' },
    { text: "These are your total expenses. An expense is any money that you spend, whether for rent or entertianment. Keep an eye on them, and make sure your expenses are less than your budget.", targetId: 'total-expenses' },
    { text: "This is your remaining budget. This is how much money you are allowed to spend in the rest of the month. A positive number means you're winning!", targetId: 'remaining-budget' },
    { text: "Click the 'Add Transaction' button to record any money you recieve or spend.", targetId: 'add-transaction-btn' },
    { text: "Set your category budgets here! Category budgets are limits on how much you can spend for each category of expense, for example: food, entertainment, rent, etc. This helps you cut down on spending in specific areas!", targetId: 'set-category-budgets-btn' },
    { text: "Your Financial City grows as you manage your money effectively. Watch it evolve as you log transactioins, stick to savings goals, and more!", targetId: 'financial-city-img' },
    { text: "Earn points and level up your city by exploring the Financial Quiz to test your knowledge on budgeting!", targetId: 'take-quiz-btn' },
    { text: "This section shows your unlocked badges which can be unlocked by achieving financial milestones.", targetId: 'badges-heading' },
    { text: "This section shows your 'points', which show your general progress, and can be earned by logging transactions and staying true to your budget.", targetId: 'points-heading'},
    { text: "We recommend going through this learning tips section at least once a week to refresh your knowledge on budgeting!", targetId: 'learning-heading1'},
    { text: "Last but definitely not least, this is our mascot, Savings Sprout, here on the bottom right! Drag him onto any heading and he'll explain it to you!", targetId: 'mascot-icon'}, 
    { text: "That’s it! You’re ready to start your quest! Good luck!", targetId: null }
];

let currentTutorialStep = 0;
let highlightedElement = null; 

function showTutorialStep(stepIndex) {
    if (!tutorialOverlay || !tutorialText) {
        console.error("Tutorial elements (overlay or text) not found in DOM.");
        return;
    }

    
    if (highlightedElement) {
        highlightedElement.classList.remove('tutorial-highlight');
        highlightedElement = null; 
    }

    const step = tutorialSteps[stepIndex]; 
    tutorialText.textContent = step.text; 

    // scrolling, highlighting tutorial steps
    if (step.targetId) {
        const targetElement = document.getElementById(step.targetId);
        if (targetElement) {

            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetElement.classList.add('tutorial-highlight');
            highlightedElement = targetElement; 
        } else {
            console.warn(`Tutorial target element not found for ID: '${step.targetId}' at step ${stepIndex}.`);
            highlightedElement = null;
        }
    } else {
        highlightedElement = null;
    }

    tutorialOverlay.classList.remove('tutorial-hidden');
    tutorialOverlay.classList.add('tutorial-visible');
}

if (tutorialNextBtn) { 
    tutorialNextBtn.addEventListener('click', () => {
        currentTutorialStep++;
        if (currentTutorialStep < tutorialSteps.length) {
            showTutorialStep(currentTutorialStep);
        } else {
            if (tutorialOverlay) {
                tutorialOverlay.classList.remove('tutorial-visible');
                tutorialOverlay.classList.add('tutorial-hidden');
                localStorage.setItem("budgetQuestTutorialSeen", "true");
                if (highlightedElement) {
                highlightedElement.classList.remove('tutorial-highlight');
                highlightedElement = null;
                }
            }
        }
    });
}

if (closeTutorialBtn) { 
    closeTutorialBtn.addEventListener('click', () => {
        if (tutorialOverlay) {
            tutorialOverlay.classList.remove('tutorial-visible');
            tutorialOverlay.classList.add('tutorial-hidden');
            localStorage.setItem("budgetQuestTutorialSeen", "true"); 
            if (highlightedElement) {
                highlightedElement.classList.remove('tutorial-highlight');
                highlightedElement = null;
            }
        }
    });
}

function checkAndShowTutorial() {
    if (userProfile?.hasCompletedSetup && localStorage.getItem("budgetQuestTutorialSeen") !== "true") {
        showTutorialStep(0);
    }
}

// storage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function loadData(key) {
    const dataString = localStorage.getItem(key);
    return dataString ? JSON.parse(dataString) : null;
}

function initializeApp() {

    const storedTransactions = loadData('transactions');
    if (storedTransactions) {
        transactions = storedTransactions;
    }

    const storedGameProgress = loadData('gameProgress');
    if (storedGameProgress) {
        gameProgress = storedGameProgress;
    }

    const storedUserProfile = loadData('userProfile');
    if (storedUserProfile) {
        userProfile = storedUserProfile;
    }

    if (!userProfile.hasCompletedSetup) {
        userSetupSection.style.display = 'flex'; 
        mainAppContent.style.display = 'none';   
    } else {
        userSetupSection.style.display = 'none'; 
        mainAppContent.style.display = 'block';  
        updateDashboard();
        renderTransactions();
        updateGameProgressUI();
        if (userProfile.name) {
            dashboardHeading.textContent = `${userProfile.name}'s Financial Summary`;
        } else {
            dashboardHeading.textContent = 'Your Financial Summary';
        }
    }
    renderLearningTips();
    checkAndShowTutorial();
}

// adding transactions
transactionForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    const category = categorySelect.value;
    const description = descriptionInput.value;
    const date = dateInput.value;

    if (isNaN(amount) || amount <= 0 || !category || !date) {
        alert('Please enter a valid amount, select a category, and choose a date.');
        return;
    }

    const newTransaction = {
        id: Date.now(),
        amount: amount,
        type: type,
        category: category,
        description: description,
        date: date
    };

    transactions.push(newTransaction);
    saveData('transactions', transactions);

    updateDashboard();
    renderTransactions();
    checkGameProgress(newTransaction);
    transactionForm.reset();
    amountInput.focus();
});


// updating dashboard
function updateDashboard() {
    
    let totalActualIncomeForMonth = userProfile.monthlyIncome; 
    let totalExpenses = 0;
    let currentSpendingPerCategory = {};

    for (const categoryName in userProfile.categoryBudgets) {
        currentSpendingPerCategory[categoryName] = 0;
    }

    for (const transaction of transactions) {
        if (transaction.type === 'expense') {
            totalExpenses += transaction.amount;
            if (currentSpendingPerCategory.hasOwnProperty(transaction.category)) {
                currentSpendingPerCategory[transaction.category] += transaction.amount;
            } else {
                currentSpendingPerCategory[transaction.category] = transaction.amount;
            }
        } else if (transaction.type === 'income') { 
            totalActualIncomeForMonth += transaction.amount; 
        }
    }

    const remainingBudget = totalActualIncomeForMonth - totalExpenses - userProfile.savingsGoal;
    totalIncomeDisplay.textContent = `$${totalActualIncomeForMonth.toFixed(2)}`;
    totalExpensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
    remainingBudgetDisplay.textContent = `$${remainingBudget.toFixed(2)}`;

    if (remainingBudget < 0) {
        remainingBudgetDisplay.style.color = '#dc3545'; 
    } else{
        remainingBudgetDisplay.style.color = '#28a745'; 
    }

    // category buddgets
    categorySummaryList.innerHTML = '';

    let hasDisplayedCategories = false;
    for (const categoryName in userProfile.categoryBudgets) {
        const budgetAmount = userProfile.categoryBudgets[categoryName];
        const spentAmount = currentSpendingPerCategory[categoryName] || 0;
        const remainingAmount = budgetAmount - spentAmount;

        if (budgetAmount > 0 || spentAmount > 0) {
            hasDisplayedCategories = true;
            const categoryItem = document.createElement('div');
            categoryItem.className = 'category-item';

            if (remainingAmount < 0) {
                categoryItem.classList.add('overbudget');
            }

            categoryItem.innerHTML = `
                <h4>${categoryName}</h4>
                <p>Budget: <span>$${budgetAmount.toFixed(2)}</span></p>
                <p>Spent: <span class="spent-amount">$${spentAmount.toFixed(2)}</span></p>
                <p>Remaining: <span class="remaining-amount">$${remainingAmount.toFixed(2)}</span></p>
            `;
            categorySummaryList.appendChild(categoryItem);
        }
    }

    if (!hasDisplayedCategories) {
        const placeholderLi = document.createElement('div');
        placeholderLi.className = 'category-item placeholder-category';
        placeholderLi.innerHTML = '<p>Set your budgets and add transactions to see them here!</p>';
        categorySummaryList.appendChild(placeholderLi);
    }
    displayFinancialTip();
}

// rendering transaction history
function renderTransactions() {
    transactionsList.innerHTML = '';
    const placeholder = document.querySelector('.placeholder-transaction');
    if (placeholder && transactions.length > 0) {
        placeholder.remove();
    }

    for (const transaction of transactions) {
        const listItem = document.createElement('li');
        const transactionClass = transaction.type === 'income' ? 'income-item' : 'expense-item';
        listItem.innerHTML = `
            <div>
                <strong>${transaction.description || transaction.category}</strong><br>
                <small>${new Date(transaction.date).toLocaleDateString()}</small>
            </div>
            <span class="${transactionClass}">$${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" data-id="${transaction.id}">X</button>
        `;
        transactionsList.prepend(listItem);
    }
    if (transactions.length === 0 && !document.querySelector('.placeholder-transaction')) {
        const placeholderLi = document.createElement('li');
        placeholderLi.className = 'placeholder-transaction';
        placeholderLi.textContent = 'Your transactions will appear here!';
        transactionsList.appendChild(placeholderLi);
    }
}

// displaying financial tipss
function displayFinancialTip() {
    const totalIncome = userProfile.monthlyIncome;
    let totalExpenses = 0;
    for (const transaction of transactions) {
        if (transaction.type === 'expense') {
            totalExpenses += transaction.amount;
        }
    }
    const currentRemainingBudget = totalIncome - totalExpenses - userProfile.savingsGoal;

    const activeTips = FINANCIAL_TIPS.filter(tip =>
        tip.condition(currentRemainingBudget, userProfile, transactions)
    );

    activeTips.sort((a, b) => a.priority - b.priority);

    if (activeTips.length > 0) {
        financialTipMessage.textContent = activeTips[0].message;
    } else {
        financialTipMessage.textContent = 'Keep building your Financial City!';
    }
}

function checkGameProgress(newTransaction) {
    let pointsEarnedThisTransaction = 0;
    pointsEarnedThisTransaction += 10;

    if (newTransaction.type === 'expense') {
        const currentRemainingBudget = parseFloat(remainingBudgetDisplay.textContent.replace('$', ''));
        if (currentRemainingBudget >= 0) {
            pointsEarnedThisTransaction += 20;
        } else {
            pointsEarnedThisTransaction -= 15;
            if (gameProgress.points + pointsEarnedThisTransaction < 0) {
                pointsEarnedThisTransaction = -gameProgress.points;
            }
        }
    } else if (newTransaction.type === 'income') {
        pointsEarnedThisTransaction += 15;
    }

    gameProgress.points += pointsEarnedThisTransaction;
    gameProgress.transactionsLogged++;

    BADGES.forEach(badge => {
        if (!gameProgress.unlockedBadges.includes(badge.id)) {
            let unlocked = false;
            switch (badge.id) {
                case 'first_transaction':
                    if (gameProgress.transactionsLogged >= 1) {
                        unlocked = true;
                    }
                    break;
                case 'five_transactions':
                    if (gameProgress.transactionsLogged >= 5) {
                        unlocked = true;
                    }
                    break;
                case 'ten_transactions':
                    if (gameProgress.transactionsLogged >= 10) {
                        unlocked = true;
                    }
                    break;
                case 'budget_guru':
                    if (newTransaction.type === 'expense' && parseFloat(remainingBudgetDisplay.textContent.replace('$', '')) >= 0) {
                        unlocked = true;
                    }
                    break;
            }

            if (unlocked) {
                gameProgress.unlockedBadges.push(badge.id);
                gameProgress.points += badge.points;
                alert(`Good job, ${userProfile.name || 'Budgeter'}! Achievement Unlocked: ${badge.name}! You earned ${badge.points} bonus points!`);
            }
        }
    });

    if (gameProgress.points < 0) {
        gameProgress.points = 0;
    }

    saveData('gameProgress', gameProgress);
    updateGameProgressUI();
}

function updateGameProgressUI() {
    gamePointsDisplay.textContent = gameProgress.points;

    let currentLevelDef = CITY_LEVELS[0]; 
    let nextLevelDef = null;

    for (let i = 0; i < CITY_LEVELS.length; i++) {
        
        if (gameProgress.points >= CITY_LEVELS[i].pointsThreshold) {
            currentLevelDef = CITY_LEVELS[i];
            if (i + 1 < CITY_LEVELS.length) {
                nextLevelDef = CITY_LEVELS[i + 1];
            } else {
                nextLevelDef = null; 
            }
        } else {
            if (nextLevelDef === null && i > 0) { 
                 nextLevelDef = CITY_LEVELS[i];
                 break; 
            } else if (nextLevelDef === null && i === 0 && gameProgress.points < CITY_LEVELS[0].pointsThreshold) {
                nextLevelDef = CITY_LEVELS[0];
                break;
            }
        }
    }

    gameProgress.cityLevel = currentLevelDef.level;
    cityLevelDisplay.textContent = gameProgress.cityLevel;
    financialCityImg.src = currentLevelDef.img;

    if (nextLevelDef && nextLevelDef.level > currentLevelDef.level) {
        const pointsNeeded = nextLevelDef.pointsThreshold - gameProgress.points;
        cityProgressDisplay.textContent = `Earn ${pointsNeeded} more points for a ${nextLevelDef.name}!`;
    } else if (nextLevelDef && nextLevelDef.level === currentLevelDef.level && gameProgress.points < currentLevelDef.pointsThreshold) {
        
        const pointsNeeded = currentLevelDef.pointsThreshold - gameProgress.points;
        cityProgressDisplay.textContent = `Earn ${pointsNeeded} more points to reach Level ${currentLevelDef.level} (${currentLevelDef.name})!`;
    }
    else {
        cityProgressDisplay.textContent = `You've reached the highest level: ${currentLevelDef.name}!`;
    }
// badges logic
    badgesContainer.innerHTML = ''; 

    gameProgress.unlockedBadges.forEach(badgeId => {
        const badgeDefinition = BADGES.find(b => b.id === badgeId);
        if (badgeDefinition) {
            const badgeElement = document.createElement('span');
            badgeElement.className = 'badge';
            badgeElement.title = badgeDefinition.description;
            badgeElement.textContent = badgeDefinition.name;
            badgesContainer.appendChild(badgeElement);
        }
    });

    BADGES.forEach(badgeDefinition => {
        if (!gameProgress.unlockedBadges.includes(badgeDefinition.id)) {
            const badgeElement = document.createElement('span');
            badgeElement.className = 'badge dimmed';
            badgeElement.title = `Locked: ${badgeDefinition.description}`;
            badgeElement.textContent = badgeDefinition.name;
            badgesContainer.appendChild(badgeElement);
        }
    });
}

// quiz logic
function displayQuizModal() {
    quizModal.style.display = 'flex'; 
    quizContainer.style.display = 'block';
    quizResults.style.display = 'none';
    currentQuestionIndex = 0; 
    userScore = 0; 
    loadQuestion();
}

function closeQuizModal() {
    quizModal.style.display = 'none';
}

function loadQuestion() {
    
    quizFeedback.textContent = '';
    quizFeedback.className = 'feedback-message'; 
    submitAnswerBtn.style.display = 'block';
    nextQuestionBtn.style.display = 'none';
    quizOptions.innerHTML = '';

    if (currentQuestionIndex < FINANCIAL_QUIZ_QUESTIONS.length) {
        const questionData = FINANCIAL_QUIZ_QUESTIONS[currentQuestionIndex];
        quizQuestion.textContent = questionData.question;

        questionData.options.forEach((option, index) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'quizOption';
            input.value = index;
            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            quizOptions.appendChild(label);
        });
    } else {
        showQuizResults();
    }
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quizOption"]:checked');
    if (!selectedOption) {
        quizFeedback.textContent = 'Please select an answer!';
        quizFeedback.className = 'feedback-message'; 
        return;
    }

    const userAnswerIndex = parseInt(selectedOption.value);
    const questionData = FINANCIAL_QUIZ_QUESTIONS[currentQuestionIndex];
    document.querySelectorAll('input[name="quizOption"]').forEach(radio => {
        radio.disabled = true;
    });

    if (userAnswerIndex === questionData.correctAnswerIndex) {
        userScore++;
        quizFeedback.textContent = 'Correct! 🎉 ' + questionData.explanation;
        quizFeedback.className = 'feedback-message correct';
    } else {
        quizFeedback.textContent = 'Incorrect. 😕 ' + questionData.explanation;
        quizFeedback.className = 'feedback-message incorrect';
        document.querySelector(`input[name="quizOption"][value="${questionData.correctAnswerIndex}"]`).closest('label').style.backgroundColor = '#d4edda'; // Light green highlight
    }

    submitAnswerBtn.style.display = 'none';
    nextQuestionBtn.style.display = 'block';
    const learnMoreBtn = document.createElement('button');
    learnMoreBtn.textContent = 'Learn More';
    learnMoreBtn.className = 'learn-more-btn';
    quizFeedback.appendChild(learnMoreBtn);
    learnMoreBtn.addEventListener('click', () => {
        showDetailedExplanation(currentQuestionIndex);
    });

}
// more detailed explanation for quiz questions
function showDetailedExplanation(index) {
    let tooltip = document.getElementById('detailed-explanation-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'detailed-explanation-tooltip';
        tooltip.className = 'explanation-popup';
        document.body.appendChild(tooltip);
    }

    tooltip.innerHTML = `
        <h3>Detailed Explanation</h3>
        <p>${QUIZ_DETAILED_EXPLANATIONS[index]}</p>
        <button class="close-tooltip-btn">Close</button>
    `;
    tooltip.style.display = 'block';

    tooltip.querySelector('.close-tooltip-btn').addEventListener('click', () => {
        tooltip.style.display = 'none';
    }, { once: true });
}


function showQuizResults() {
    quizContainer.style.display = 'none';
    quizResults.style.display = 'block';
    quizScoreDisplay.textContent = userScore;
    quizTotalQuestionsDisplay.textContent = FINANCIAL_QUIZ_QUESTIONS.length;
}

function loadCategoryBudgetForm() {
    const budgets = userProfile.categoryBudgets;
    budgetFoodInput.value = budgets.Food || '';
    budgetRentInput.value = budgets.Rent || '';
    budgetTransportInput.value = budgets.Transport || '';
    budgetUtilitiesInput.value = budgets.Utilities || '';
    budgetEntertainmentInput.value = budgets.Entertainment || '';
    budgetOtherInput.value = budgets.Other || '';
}

transactionsList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const button = event.target;
        const transactionIdToDelete = parseInt(button.dataset.id);

        if (!confirm('Are you sure you want to delete this transaction?')) {
            return;
        }

        transactions = transactions.filter(transaction => transaction.id !== transactionIdToDelete);
        saveData('transactions', transactions);

        renderTransactions();
        updateDashboard();
        updateGameProgressUI();
    }
});

setCategoryBudgetsBtn.addEventListener('click', function() {
    loadCategoryBudgetForm();
    categoryBudgetSettings.style.display = 'flex';
});

closeBudgetsBtn.addEventListener('click', function() {
    categoryBudgetSettings.style.display = 'none';
});

categoryBudgetForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const food = parseFloat(budgetFoodInput.value) || 0;
    const rent = parseFloat(budgetRentInput.value) || 0;
    const transport = parseFloat(budgetTransportInput.value) || 0;
    const utilities = parseFloat(budgetUtilitiesInput.value) || 0;
    const entertainment = parseFloat(budgetEntertainmentInput.value) || 0;
    const other = parseFloat(budgetOtherInput.value) || 0;

    userProfile.categoryBudgets = {
        Food: food,
        Rent: rent,
        Transport: transport,
        Utilities: utilities,
        Entertainment: entertainment,
        Other: other
    };

    saveData('userProfile', userProfile);

    let totalCategoryBudgets = 0;
    for (const category in userProfile.categoryBudgets) {
        totalCategoryBudgets += userProfile.categoryBudgets[category];
    }

    const totalAllocated = totalCategoryBudgets + userProfile.savingsGoal;

    if (totalAllocated > userProfile.monthlyIncome) {
        alert(
            `Warning: Your total allocated budget for categories ($${totalCategoryBudgets.toFixed(2)}) ` +
            `plus your savings goal ($${userProfile.savingsGoal.toFixed(2)}) ` +
            `exceeds your monthly income ($${userProfile.monthlyIncome.toFixed(2)}). ` +
            `You might find it challenging to stick to this budget.`
        );
    }
    alert('Category budgets saved successfully!');

    categoryBudgetSettings.style.display = 'none';
    updateDashboard();
});

userSetupForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const userName = userNameInput.value.trim();
    const monthlyIncome = parseFloat(monthlyIncomeInput.value);
    let savingsGoal = parseFloat(savingsGoalInput.value);

    if (!userName || isNaN(monthlyIncome) || monthlyIncome <= 0) {
        alert('Please enter your Name and a valid Monthly Income.');
        return;
    }

    if (isNaN(savingsGoal) || savingsGoal < 0) {
        savingsGoal = monthlyIncome * 0.20;
        alert(`No savings goal entered or invalid. Setting a default goal of $${savingsGoal.toFixed(2)} (20% of your income).`);
    }

    if (savingsGoal > monthlyIncome) {
        alert('Your savings goal cannot be more than your monthly income. Please adjust.');
        return;
    }

    userProfile.name = userName;
    userProfile.monthlyIncome = monthlyIncome;
    userProfile.savingsGoal = savingsGoal;
    userProfile.hasCompletedSetup = true;

    saveData('userProfile', userProfile);

    userSetupSection.style.display = 'none';
    mainAppContent.style.display = 'block';

    initializeApp();
    
});

takeQuizBtn.addEventListener('click', displayQuizModal);
closeQuizBtn.addEventListener('click', closeQuizModal);
submitAnswerBtn.addEventListener('click', checkAnswer);
nextQuestionBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});
retakeQuizBtn.addEventListener('click', displayQuizModal); 
initializeApp();