class OperatorButtons{

    static addEventListenerOnDivide(){
        let dOB = document.getElementById("divide-operator-button");
        dOB.addEventListener("click", function(e){
            let divisionQuestionsArray = DivQuestions.generateDivQuestions();
            let randomNum = Math.floor(Math.random() * divisionQuestionsArray.length);
            let divisionQuestion = divisionQuestionsArray[randomNum]
            console.log("divques:", divisionQuestion)
            divisionQuestion.renderQues();
            let answerField = document.querySelector("#user-answer");   
            divisionQuestion.addEventListenerOnCheck();       
        })
    }
    
    static addEventListenerOnPlus(){
        let pOB = document.getElementById("plus-operator-button");
        pOB.addEventListener("click", function(e){
             let num1 = Math.floor(Math.random() * 100) + 1;
             let num2 = Math.floor(Math.random() * 100) + 1;
             let operator = " + ";
             let additionQuestion = new Question(num1, operator, num2);
             additionQuestion.renderQues();
             additionQuestion.addEventListenerOnCheck();
        })
    }
    
    static addEventListenerOnMinus(){
        let mOB = document.getElementById("minus-operator-button");
        mOB.addEventListener("click", function(e){
            let num1 = Math.floor(Math.random() * 100) + 1;
            let num2 = Math.floor(Math.random() * num1) + 1;
            let operator = " - ";
            let minusQuestion = new Question(num1, operator, num2)
            minusQuestion.renderQues();
            minusQuestion.addEventListenerOnCheck();
        });
    }
    
    static addEventListenerOnTimes(){
        let tOB = document.getElementById("times-operator-button");
        tOB.addEventListener("click", function(e){
            let num1 = Math.floor(Math.random() * 10) + 1;
            let num2 = Math.floor(Math.random() * 10) + 1;
            let operator = " * ";
            let timesQuestion = new Question(num1, operator, num2);
            timesQuestion.renderQues();
            //debugger
            timesQuestion.addEventListenerOnCheck();
        })
    }
    

    static renderOperatorButtons(){
        let container = document.querySelector(".first-view");
        container.innerHTML =   `
            <h2 class="put-name-here"></h2>
            <br>   
            <br>
            <button type="button" id="plus-operator-button"><i class="fas fa-plus"></i></button>
            <button type="button" id="minus-operator-button"><i class="fas fa-minus"></i></button>
            <button type="button" id="times-operator-button"><i class="fas fa-times"></i></button>
            <button type="button" id="divide-operator-button"><i class="fas fa-divide"></i></button>
            <br>
            <br>
            <br>
        `;
        OperatorButtons.addEventListenerOnPlus();
        OperatorButtons.addEventListenerOnMinus();
        OperatorButtons.addEventListenerOnTimes();
        OperatorButtons.addEventListenerOnDivide();
    }

}