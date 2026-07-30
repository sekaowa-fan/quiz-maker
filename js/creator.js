// ==========================
// クイズ作成モード
// ==========================


const questionsArea = document.getElementById("questions");
const addButton = document.getElementById("addQuestion");

let questionCount = 0;


// 問題追加

addButton.addEventListener("click", () => {

    questionCount++;


    const question = document.createElement("div");

    question.className = "question";


    question.innerHTML = `

        <h3>問題 ${questionCount}</h3>


        <label>
            問題形式
        </label>

        <select class="type">

            <option value="choice">
                選択問題
            </option>

            <option value="text">
                記述問題
            </option>

        </select>



        <label>
            問題文
        </label>

        <textarea
        class="questionText"
        placeholder="問題文を入力">
        </textarea>



        <div class="choiceArea">

            <label>
                選択肢
            </label>


            <input 
            class="choice"
            placeholder="選択肢1">


            <input 
            class="choice"
            placeholder="選択肢2">


            <input 
            class="choice"
            placeholder="選択肢3">


            <input 
            class="choice"
            placeholder="選択肢4">



            <label>
                正解番号
            </label>


            <select class="answer">


                <option value="0">
                    選択肢1
                </option>


                <option value="1">
                    選択肢2
                </option>


                <option value="2">
                    選択肢3
                </option>


                <option value="3">
                    選択肢4
                </option>


            </select>


        </div>


    `;


    questionsArea.appendChild(question);



    const type =
    question.querySelector(".type");


    const choiceArea =
    question.querySelector(".choiceArea");



    type.addEventListener("change",()=>{


        if(type.value==="text"){

            choiceArea.style.display="none";

        }else{

            choiceArea.style.display="block";

        }


    });



});
// ==========================
// 保存ボタン
// ==========================


const saveButton = document.getElementById("saveQuiz");


saveButton.addEventListener("click", ()=>{


    const name =
    document.getElementById("quizName").value.trim();



    if(name === ""){

        alert("クイズ名を入力してください");

        return;

    }



    const cards =
    document.querySelectorAll(".question");



    if(cards.length === 0){

        alert("問題を追加してください");

        return;

    }




    const quiz = {

        title:name,

        questions:[]


    };




    cards.forEach(card=>{


        const type =
        card.querySelector(".type").value;



        const text =
        card.querySelector(".questionText").value;



        const choices =
        [...card.querySelectorAll(".choice")]
        .map(input=>input.value);



        const answer =
        Number(
            card.querySelector(".answer").value
        );



        quiz.questions.push({

            type:type,

            text:text,

            choices:choices,

            answer:answer

        });



    });




    saveQuizData(quiz);



    alert("保存しました！");



});
