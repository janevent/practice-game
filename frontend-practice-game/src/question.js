class Question{
    constructor(firstNum, operator, secondNum, thirdNum){
        this.firstNum = firstNum;
        this.operator = operator;
        this.secondNum = secondNum; 
        this.thirdNum = thirdNum;
    }

    renderQues(){
        document.querySelector(".firstview").innerHTML += `
        <form id="question-form">${this.firstNum} ${this.operator} ${this.secondNum} = <input type="text" name="answer" id="users-answer><input type="submit" value="check"></form>
        `
    }

    
}

let divQuestions = [];

function generateDivQuestions(){
    for(let a = 1; a < 11; a++){
        for(let b = 1; b < 11; b++){
            let c = a * b;
            divQuestions.push(new Question(c, "/", a, b));
        }
    }
}
//eval("2/2")