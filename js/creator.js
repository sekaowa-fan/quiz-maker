// ======================================
// creator.js Part1
// クイズメーカー 作成画面
// ======================================

const questionsArea = document.getElementById("questions");
const addButton = document.getElementById("addQuestion");
const saveButton = document.getElementById("saveQuiz");
const quizNameInput = document.getElementById("quizName");

let questions = [];

function updateNumbers() {
    document.querySelectorAll(".question").forEach((card, index) => {
        card.querySelector(".questionTitle").textContent =
            `問題 ${index + 1}`;
    });
}

function createQuestion(data = null) {

    const question = document.createElement("div");
    question.className = "question";

    question.innerHTML = `
        <div class="questionHeader">

            <h3 class="questionTitle"></h3>

            <div class="questionButtons">

                <button type="button" class="copyQuestion">
                    📄 コピー
                </button>

                <button type="button" class="deleteQuestion">
                    🗑 削除
                </button>

            </div>

        </div>

        <label>問題形式</label>

        <select class="type">

            <option value="choice">選択問題</option>

            <option value="text">記述問題</option>

        </select>

        <label>問題文</label>

        <textarea
            class="questionText"
            placeholder="問題文を入力"></textarea>

        <div class="choiceArea">

            <label>選択肢1</label>
            <input class="choice">

            <label>選択肢2</label>
            <input class="choice">

            <label>選択肢3</label>
            <input class="choice">

            <label>選択肢4</label>
            <input class="choice">

            <label>正解</label>

            <select class="answer">
                <option value="0">選択肢1</option>
                <option value="1">選択肢2</option>
                <option value="2">選択肢3</option>
                <option value="3">選択肢4</option>
            </select>

        </div>

        <div class="textAnswerArea">

            <label>記述問題の答え</label>

            <input class="textAnswer">

        </div>
    `;

    questionsArea.appendChild(question);

    const title = question.querySelector(".questionTitle");
    const type = question.querySelector(".type");
    const choiceArea = question.querySelector(".choiceArea");
    const textAnswerArea =
        question.querySelector(".textAnswerArea");

    function refreshType() {

        if (type.value === "choice") {

            choiceArea.style.display = "block";
            textAnswerArea.style.display = "none";

        } else {

            choiceArea.style.display = "none";
            textAnswerArea.style.display = "block";

        }

    }

    refreshType();

    type.addEventListener("change", refreshType);

    const deleteButton =
        question.querySelector(".deleteQuestion");

    deleteButton.addEventListener("click", () => {

        if (!confirm("この問題を削除しますか？")) return;

        question.remove();

        updateNumbers();

    });

    const copyButton =
        question.querySelector(".copyQuestion");

    copyButton.addEventListener("click", () => {

        const copyData = getQuestionData(question);

        createQuestion(copyData);

        updateNumbers();

    });

    if (data) {

        type.value = data.type;

        refreshType();

        question.querySelector(".questionText").value =
            data.text;

        if (data.type === "choice") {

            const inputs =
                question.querySelectorAll(".choice");

            data.choices.forEach((choice, index) => {

                if (inputs[index]) {

                    inputs[index].value = choice;

                }

            });

            question.querySelector(".answer").value =
                data.answer;

        } else {

            question.querySelector(".textAnswer").value =
                data.answer;

        }

    }

    updateNumbers();

}

function getQuestionData(question) {

    const type =
        question.querySelector(".type").value;

    const text =
        question.querySelector(".questionText").value;

    if (type === "choice") {

        return {

            type,

            text,

            choices: [...question.querySelectorAll(".choice")]
                .map(input => input.value),

            answer:
                Number(
                    question.querySelector(".answer").value
                )

        };

    }

    return {

        type,

        text,

        answer:
            question.querySelector(".textAnswer").value

    };

}

// ======================================
// creator.js Part3
// 問題追加・保存
// ======================================

addButton.addEventListener("click", () => {

    createQuestion();

});

saveButton.addEventListener("click", () => {

    const title = quizNameInput.value.trim();

    if (title === "") {

        alert("クイズ名を入力してください。");
        return;

    }

    const questionCards =
        document.querySelectorAll(".question");

    if (questionCards.length === 0) {

        alert("問題を1問以上追加してください。");
        return;

    }

    const quiz = {

        title,

        questions: []

    };

    questionCards.forEach(card => {

        quiz.questions.push(
            getQuestionData(card)
        );

    });

    let quizzes = [];

    try {

        quizzes =
            JSON.parse(
                localStorage.getItem("quizzes")
            ) || [];

    } catch {

        quizzes = [];

    }

    quizzes.push(quiz);

    localStorage.setItem(
        "quizzes",
        JSON.stringify(quizzes)
    );

    alert("保存しました！");

});


// 最初の1問を作成
createQuestion();
