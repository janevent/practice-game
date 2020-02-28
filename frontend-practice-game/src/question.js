class Question{
    constructor(firstNum, operator, secondNum, thirdNum){
        this.firstNum = firstNum;
        this.operator = operator;
        this.secondNum = secondNum; 
        this.thirdNum = thirdNum;
    }

    checkAnswer(answer){
        if(eval(`${this.firstNum} ${this.operator} ${this.secondNum}`) === parseInt(answer)){
            return true;
        } else {
            return false;
        }
    }

    renderQues(){
        let qf = document.querySelector(".question-form");
        qf.innerHTML = `
        <br>
        <form id="question-form">${this.firstNum} ${this.operator} ${this.secondNum} = <input type="text" name="answer" id="user-answer"><input type="submit" id="check-answer" value="check"></form>
        `
    }

    
}

//
//eval("2/2")