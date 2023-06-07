let screenWelcome = document.getElementById("welcomescreen");
let screenQuestion = document.getElementById("questionscreen");
let screenResult = document.getElementById("resultscreen");

function Quiz() {
    this.questions = [];
    this.nbCorrects = 0;
    this.indexCurrentQuestion = 0;

    this.addQuestion = function(question) {
         this.questions.push(question);
    }

    this.showCurrentQuestion = function() {

        if(this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion+1, this.questions.length
                );
        }
        else {
            screenQuestion.classList.add("hidden");

            let elNbCorrects = document.querySelector("#nbcorrects");
            elNbCorrects.textContent = quiz.nbCorrects;

            screenResult.style.display = "block";
        }
    }
}


function Question(title, answers, answerCorrect) {
    this.title = title;
    this.answers = answers;
    this.answerCorrect = answerCorrect;

    this.getElement = function (indexQuestion, nbQuestions) {
        let questionNumber = document.createElement("h2");
        questionNumber.classList.add("quiz__subtitle");
        questionNumber.textContent = "Question "+ indexQuestion + "/" + nbQuestions;
        console.log(questionNumber);

        screenQuestion.append(questionNumber);

        let questionTitle = document.createElement("h3");
        questionTitle.textContent= this.title;
        screenQuestion.append(questionTitle);

        let questionAnswers = document.createElement("ul");
        questionAnswers.classList.add("questions__answers");

        this.answers.forEach((answer,index) => {
            let elAnswer = document.createElement("li");
            elAnswer.classList.add("answer");
            elAnswer.textContent = answer;
            elAnswer.id = index+1;
            elAnswer.addEventListener("click", this.checkAnswer);
    
            questionAnswers.append(elAnswer);
        })

        screenQuestion.append(questionAnswers);
    }

    this.addAnswer = function(answer) {
        // this.answers[this.answers.length] = answer;
        this.answers.push(answer);
    },

    this.checkAnswer = (event) => {
        console.log(event.target);
        let answerSelected = event.target;
        console.log(this.answerCorrect);

        if(this.isCorrectAnswer(answerSelected.id)) {
            answerSelected.classList.add("answer--correct");
            quiz.nbCorrects++;
        }
        else {
            // Dans le cas où la réponse n'est pas correcte
            answerSelected.classList.add("answer--wrong");

            let elRightAnswer = document.getElementById(this.answerCorrect);
            elRightAnswer.classList.add("answer--correct");
        }

        setTimeout(function() {
            screenQuestion.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.showCurrentQuestion();
        }, 1000);
    }

    this.isCorrectAnswer = function(answerUser) {
        if(answerUser == this.answerCorrect) {
            return true;
        }
        else {
            return false;
        }
    }
};

let quiz = new Quiz();

let question1 = new Question( "Que signifie HTTP", 
    ["HyperText Transfer Protocol", "HyperTransfer Text Protocol", "HyperTranslate Text Protocol"], 1);
quiz.addQuestion(question1);

let question2 = new Question("Que signifie RSS", 
    ["Rolling Syndication Simple", "Real Sophistiqued Syndication", "Really Simplen Syndication"], 3);
quiz.addQuestion(question2);


let question3 = new Question("Qu'est ce qu'un octet?", 
    ["Un ensemble ordonné de huit éléments binaires traités comme un tout", "Une unité de mesures informatiques créée avec Internet", "Un ensemble de données binaires correspondant à un poids virtuel"], 1);
quiz.addQuestion(question3);

let question4 = new Question("Qu’est-ce que le phishing ?", 
    ["Des emails non sollicités qui envahissent une boite de réception", "Une collecte frauduleuse d’informations personnelles via une usurpation d’identité", "Une technique de piratage d'un smartphone"], 2);
quiz.addQuestion(question4);

let question5 = new Question("Comment savoir si un site est sécurisé ?", 
    ["Un logo l'indique dans le bas de la page", "L'URL devient verte", "Un cadenas s’affiche à côté de l’adresse du site"], 3);
quiz.addQuestion(question5);

console.log(quiz);



// quiz.lauch();


// let elNbCorrects = document.getElementById("nbcorrects");
let elNbCorrects = document.querySelector("#nbcorrects");
console.log(elNbCorrects);

console.log(elNbCorrects.textContent);
// elNbCorrects.textContent = 1;
elNbCorrects.textContent = quiz.nbCorrects;

// let elNbQuestions = document.getElementsByClassName("nbquestions");
let elNbQuestions = document.querySelectorAll(".nbquestions");
console.log(elNbQuestions);

// for(let i=0; i<elNbQuestions.length; i++) {
//     elNbQuestions[i].textContent = quiz.questions.length;
// }

elNbQuestions.forEach(function(elNbQuestion) {
    elNbQuestion.textContent = quiz.questions.length;
});


function seeFirstQuestion() {

    // screenWelcome.style.display = "none";
    screenWelcome.classList.add('hidden');

    screenQuestion.style.display = "block";

    quiz.showCurrentQuestion();
}

let welcomebtn = document.getElementById('welcomebtn');
welcomebtn.addEventListener("click", seeFirstQuestion);