class Question{
    constructor(firstNum, operator, secondNum, thirdNum){
        this.firstNum = firstNum;
        this.operator = operator;
        this.secondNum = secondNum; 
        this.thirdNum = thirdNum;
    }

    checkAnswer(answer){
        debugger
        if(eval(`${this.firstNum} ${this.operator}`) === parseInt(answer)){
            return true;
        } else {
            return false;
        }
    }

    renderQues(){
        //debugger
        document.querySelector(".first-view").innerHTML += `
        <form id="question-form">${this.firstNum} ${this.operator} ${this.secondNum} = <input type="text" name="answer" id="user-answer"><input type="submit" id="check-answer" value="check"></form>
    
        `
        //this.checkAnswer();
    }

    
}

//
//eval("2/2")