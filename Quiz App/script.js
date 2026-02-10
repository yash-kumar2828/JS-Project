const questions=[
    {
        question: "What is JavaScript?",
        answers:[
            {text:"JavaScript is a scripting language used to make the website interactive", correct: true},
            {text:"JavaScript is an assembly language used to make the website interactive", correct: false},
            {text:"JavaScript is a compiled language used to make the website interactive", correct: false},
            {text:"None of the mentioned", correct: false}
        ]
    },
    {
       question: " Which of the following is correct about JavaScript?",
        answers:[
            {text:"JavaScript is an Object-Based language", correct: true},
            {text:" JavaScript is Assembly-language", correct: false},
            {text:"JavaScript is an Object-Oriented language", correct: false},
            {text:" JavaScript is a High-level language", correct: false}
        ] 
    }
];


const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn"); 
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn=e.target;
    const isCorrect=selectBtn.dataset.correct==="true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
