class Question{
    constructor(firstNum, operator, secondNum, thirdNum){
        this.firstNum = firstNum;
        this.operator = operator;
        this.secondNum = secondNum; 
        this.thirdNum = thirdNum;
    }

    renderQues(){
        //debugger
        document.querySelector(".first-view").innerHTML += `
        <form id="question-form">${this.firstNum} ${this.operator} ${this.secondNum} = <input type="text" name="answer" id="users-answer><input type="submit" value="submit"></form>
        `
    }

    
}

//
//eval("2/2")