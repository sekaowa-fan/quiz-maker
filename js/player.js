// ==========================
// 回答モード
// ==========================


const quizSelect =
document.getElementById("quizSelect");


const startButton =
document.getElementById("startQuiz");


const quizArea =
document.getElementById("quizArea");


const resultArea =
document.getElementById("resultArea");


const questionNumber =
document.getElementById("questionNumber");


const questionText =
document.getElementById("questionText");


const answerArea =
document.getElementById("answerArea");


const submitButton =
document.getElementById("submitAnswer");


const scoreText =
document.getElementById("score");



let quizzes = [];

let currentQuiz;

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;



// 保存済みクイズ読み込み

function loadQuizList(){

    quizzes = getQuizzes();


    quizSelect.innerHTML="";


    if(quizzes.length===0){

        const option =
        document.createElement("option");

        option.textContent =
        "保存されたクイズがありません";

        quizSelect.appendChild(option);

        return;

    }



    quizzes.forEach((quiz,index)=>{


        const option =
        document.createElement("option");


        option.value=index;

        option.textContent=
        quiz.title;


        quizSelect.appendChild(option);


    });

}



loadQuizList();




// スタート

startButton.addEventListener("click",()=>{


    if(quizzes.length===0){

        return;

    }


    currentQuiz =
    quizzes[
        Number(quizSelect.value)
    ];


    currentQuestion=0;

    score=0;


    quizArea.classList.remove("hidden");

    resultArea.classList.add("hidden");


    showQuestion();


});





// 問題表示

function showQuestion(){


    selectedAnswer=null;


    const q =
    currentQuiz.questions[currentQuestion];



    questionNumber.textContent =

    `問題 ${currentQuestion+1} / ${currentQuiz.questions.length}`;



    questionText.textContent =
    q.text;



    answerArea.innerHTML="";



    if(q.type==="choice"){


        q.choices.forEach((choice,index)=>{


            const button =
            document.createElement("button");


            button.className=
            "answerButton";


            button.textContent=
            choice;


            button.addEventListener("click",()=>{


                document
                .querySelectorAll(".answerButton")
                .forEach(b=>
                    b.classList.remove("selected")
                );


                button.classList.add("selected");


                selectedAnswer=index;


            });



            answerArea.appendChild(button);


        });


    }else{


        const input =
        document.createElement("input");


        input.id="textAnswer";

        input.placeholder=
        "答えを入力";


        answerArea.appendChild(input);


    }


}




// 決定

submitButton.addEventListener("click",()=>{


    const q =
    currentQuiz.questions[currentQuestion];



    let correct=false;



    if(q.type==="choice"){


        correct =
        selectedAnswer === q.answer;


    }else{


        const input =
        document.getElementById("textAnswer");


        correct =
        input.value.trim()
        ===
        q.answer;


    }



    if(correct){

        score++;

    }



    currentQuestion++;



    if(currentQuestion <
    currentQuiz.questions.length){


        showQuestion();


    }else{


        endQuiz();


    }


});





function endQuiz(){


    quizArea.classList.add("hidden");


    resultArea.classList.remove("hidden");


    scoreText.textContent =

    `${currentQuiz.questions.length}問中 ${score}問正解！`;


                  }
