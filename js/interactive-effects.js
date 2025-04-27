/* Interactive Features and Components */
/* Called by main.js */

// Initialize interactive timeline - HOVER/CLICK only (visibility handled by main.js)
function initTimelineInteraction() {
    const timelineItems = document.querySelectorAll('.timeline-item-interactive');
    if (!timelineItems.length) return;

    timelineItems.forEach(item => {
        // Add hover effect for z-index
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10'; // Bring to front on hover
        });
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });

        // Add click event to expand content (if needed - currently no expandable content)
        const dot = item.querySelector('.timeline-dot-interactive');
        const content = item.querySelector('.timeline-content-interactive');
        if (dot && content && content.scrollHeight > content.clientHeight) { // Check if content overflows
             // Example: Toggle expand class on click
             dot.addEventListener('click', function() {
                 content.classList.toggle('expanded');
                 // Add CSS rule for .expanded { max-height: ... }
             });
        }
    });

    // Scroll listener for animation is REMOVED - handled by IntersectionObserver in main.js
}

// Initialize hover effects for tech cards
function initHoverEffects() {
    const hoverCards = document.querySelectorAll('.hover-card');
    if (!hoverCards.length) return;

    hoverCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
}

// Initialize page transitions (for non-anchor links)
function initPageTransitions() {
    const transitionElement = document.querySelector('.page-transition');
    if (!transitionElement) return;

    // Target links that DON'T start with '#' or are mailto/tel
    const pageLinks = document.querySelectorAll('a:not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');

    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only apply transition for internal links or known external if needed
            if (href && href !== '#' && !href.startsWith('http')) { // Basic check for internal
                e.preventDefault();
                transitionElement.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Match transition duration
            }
             // Allow default behavior for external links, mailto, tel, etc.
        });
    });
}

// Initialize quiz functionality - REVISED
function initQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    // Ensure all necessary elements exist before proceeding
    const questionEl = document.getElementById('question');
    const optionsWrapper = quizContainer.querySelector('.mb-4'); // The direct parent of question and options
    const feedbackEl = document.getElementById('feedback');
    const submitBtn = document.getElementById('submit-answer');
    const nextBtn = document.getElementById('next-question');
    const restartBtn = document.getElementById('restart-quiz');
    const resultsContainer = document.getElementById('quiz-results');
    const scoreDisplay = document.getElementById('score');

    if (!questionEl || !optionsWrapper || !feedbackEl || !submitBtn || !nextBtn || !restartBtn || !resultsContainer || !scoreDisplay) {
        console.error("Quiz elements missing! Cannot initialize quiz.");
        // Optionally hide the whole container if setup is broken
        // quizContainer.style.display = 'none';
        return;
    }

     // Create a dedicated div for options if it doesn't exist (robustness)
     let optionsContainer = optionsWrapper.querySelector('.quiz-options-container');
     if (!optionsContainer) {
         optionsContainer = document.createElement('div');
         optionsContainer.className = 'quiz-options-container mt-3'; // Add class and margin
         // Insert after the question h4
         questionEl.parentNode.insertBefore(optionsContainer, questionEl.nextSibling);
     }


    const questions = [
        { question: 'ما هو الهدف المستهدف لحصة الطاقة المتجددة في قطر بحلول عام 2030؟', options: ['5%', '10%', '20%', '30%'], answer: 2 },
        { question: 'متى تم افتتاح محطة الخرسعة للطاقة الشمسية؟', options: ['2020', '2021', '2022', '2023'], answer: 2 },
        { question: 'كم تبلغ القدرة الإنتاجية لمحطة الخرسعة للطاقة الشمسية؟', options: ['400 ميجاواط', '600 ميجاواط', '800 ميجاواط', '1000 ميجاواط'], answer: 2 },
        { question: 'ما هي نسبة خفض انبعاثات الكربون المستهدفة في قطر بحلول 2030؟', options: ['10%', '15%', '20%', '25%'], answer: 3 },
        { question: 'في أي عام تم اكتشاف حقل الشمال للغاز الطبيعي في قطر؟', options: ['1960', '1971', '1982', '1995'], answer: 1 }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    function displayQuestion() {
        answered = false;
        resultsContainer.style.display = 'none'; // Hide results when showing question
        questionEl.style.display = 'block'; // Ensure question is visible
        optionsContainer.style.display = 'block'; // Ensure options container is visible

        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question; // Set question text

        optionsContainer.innerHTML = ''; // Clear previous options
        currentQuestion.options.forEach((option, index) => {
            const optionId = `option${index + 1}`;
            const div = document.createElement('div');
            div.className = 'form-check mb-2';
            // Note: value should be the index (0-based) matching the answer key
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="quiz" id="${optionId}" value="${index}">
                <label class="form-check-label" for="${optionId}">${option}</label>
            `;
            optionsContainer.appendChild(div);
        });

        feedbackEl.style.display = 'none'; // Hide feedback
        feedbackEl.className = 'alert mt-3'; // Reset feedback class
        submitBtn.style.display = 'inline-block'; // Show submit button
        nextBtn.style.display = 'none'; // Hide next button
    }

    submitBtn.addEventListener('click', function() {
        if (answered) return;
        const selectedOption = optionsContainer.querySelector('input[name="quiz"]:checked');

        if (!selectedOption) {
            feedbackEl.textContent = 'الرجاء اختيار إجابة';
            feedbackEl.className = 'alert alert-warning mt-3'; // Use Bootstrap class
            feedbackEl.style.display = 'block';
            return;
        }

        answered = true;
        const selectedAnswer = parseInt(selectedOption.value); // value is the index
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (selectedAnswer === correctAnswer) {
            feedbackEl.textContent = 'إجابة صحيحة!';
            feedbackEl.className = 'alert alert-success mt-3';
            score++;
        } else {
            feedbackEl.textContent = `إجابة خاطئة. الإجابة الصحيحة هي: ${questions[currentQuestionIndex].options[correctAnswer]}`;
            feedbackEl.className = 'alert alert-danger mt-3';
        }

        feedbackEl.style.display = 'block';
        submitBtn.style.display = 'none'; // Hide submit

        if (currentQuestionIndex < questions.length - 1) {
            nextBtn.style.display = 'inline-block'; // Show next
        } else {
            showResults(); // Show final results
        }
    });

    nextBtn.addEventListener('click', function() {
        currentQuestionIndex++;
        displayQuestion();
    });

    restartBtn.addEventListener('click', function() {
        currentQuestionIndex = 0;
        score = 0;
        displayQuestion();
    });

    function showResults() {
        questionEl.style.display = 'none'; // Hide question element
        optionsContainer.style.display = 'none'; // Hide options container
        feedbackEl.style.display = 'none'; // Hide feedback
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        scoreDisplay.textContent = `${score} / ${questions.length}`;
        resultsContainer.style.display = 'block'; // Show results section
    }

    // Initial setup
    displayQuestion();
}


// Initialize energy savings calculator
function initCalculator() {
    const calculatorBtn = document.getElementById('calculateSavings');
    if (!calculatorBtn) return;

    const consumptionInput = document.getElementById('currentConsumption');
    const percentageSlider = document.getElementById('renewablePercentage');
    const percentageValue = document.getElementById('percentageValue');
    const savingsResults = document.getElementById('savingsResults');
    const co2Savings = document.getElementById('co2Savings');
    const fuelSavings = document.getElementById('fuelSavings');
    const treesEquivalent = document.getElementById('treesEquivalent');

    if (!consumptionInput || !percentageSlider || !percentageValue || !savingsResults || !co2Savings || !fuelSavings || !treesEquivalent) {
        console.error("Calculator elements missing!");
        return;
    }

    percentageSlider.addEventListener('input', function() {
        percentageValue.textContent = this.value + '%';
    });

    calculatorBtn.addEventListener('click', function() {
        const consumption = parseFloat(consumptionInput.value) || 0;
        const percentage = parseFloat(percentageSlider.value) / 100;

        if (consumption <= 0 || isNaN(consumption)) {
            alert('الرجاء إدخال قيمة صحيحة للاستهلاك الشهري');
            consumptionInput.focus();
            savingsResults.style.display = 'none'; // Hide previous results
            return;
        }

        // Constants (Approximate values, adjust as needed)
        const KG_CO2_PER_KWH = 0.5; // kg CO2 per kWh (example value)
        const BARRELS_OIL_PER_KWH = 0.0015; // Barrels of oil equivalent per kWh
        const KG_CO2_PER_TREE_YEAR = 21; // kg CO2 absorbed per tree per year

        const renewableKWh = consumption * percentage;
        const co2ReductionKg = renewableKWh * KG_CO2_PER_KWH;
        const fuelReductionBarrels = renewableKWh * BARRELS_OIL_PER_KWH;
        // Calculate equivalent trees needed for one month's savings
        const trees = (co2ReductionKg / KG_CO2_PER_TREE_YEAR) * 12;


        co2Savings.textContent = (co2ReductionKg / 1000).toFixed(2); // Convert kg to tons
        fuelSavings.textContent = fuelReductionBarrels.toFixed(2);
        treesEquivalent.textContent = Math.round(trees);

        savingsResults.style.display = 'flex'; // Use flex for row layout
        savingsResults.classList.add('animate__animated', 'animate__fadeIn'); // Add animation if using Animate.css

        // Re-apply 3D effect to results cards if needed (already has card-3d class)
        // const resultCards = savingsResults.querySelectorAll('.card-3d');
        // resultCards.forEach(card => { /* Add specific animation or effect */ });
    });
}

// Initialize animated underlines
function initAnimatedUnderlines() {
    const elements = document.querySelectorAll('.animated-underline');
     if (!elements.length) return;

    elements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        element.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
}

// Note: initSmoothScroll is REMOVED - handled globally in main.js