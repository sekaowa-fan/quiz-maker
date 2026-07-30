// ==========================
// クイズ保存システム
// ==========================


function getQuizzes(){

    const data = localStorage.getItem("quizzes");

    if(!data){

        return [];

    }


    return JSON.parse(data);

}




function saveQuizData(quiz){

    const quizzes = getQuizzes();


    quizzes.push(quiz);


    localStorage.setItem(
        "quizzes",
        JSON.stringify(quizzes)
    );

}




function deleteQuiz(index){

    const quizzes = getQuizzes();


    quizzes.splice(index,1);


    localStorage.setItem(
        "quizzes",
        JSON.stringify(quizzes)
    );

}
